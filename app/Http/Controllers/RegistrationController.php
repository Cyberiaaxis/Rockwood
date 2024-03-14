<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserStats;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RegistrationController extends Controller
{
    protected $user;
    protected $userStats;

    /**
     * Constructor.
     *
     * @param  User  $user
     * @param  UserStats  $userStats
     */
    public function __construct(User $user, UserStats $userStats)
    {
        $this->user = $user;
        $this->userStats = $userStats;
    }

    /**
     * Handle user registration.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(Request $request)
    {
        $validatedData = $this->validateRequestData($request);

        $userStored = $this->user->addUser($validatedData);
        $this->userStats->addUserStats($userStored);

        return response()->json([
            'status' => true,
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Validate registration request data.
     *
     * @param  Request  $request
     * @return array
     */
    protected function validateRequestData($request)
    {
        return $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'confirmed', 'min:6', 'max:100']
        ]);
    }
}
