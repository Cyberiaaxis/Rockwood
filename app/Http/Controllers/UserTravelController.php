<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTravel;
use App\Models\City;
use App\Models\User;
use Carbon\Carbon;
// $this->user->getUserNameById
class UserTravelController extends Controller
{
    protected $userTravel;
    protected $city;
    protected $user;
    protected $carbon;

    /**
     * Create a new instance of UserTravelController.
     *
     * @param  \App\Models\UserTravel  $userTravel
     * @return void
     */
    public function __construct(UserTravel $userTravel, City $city, User $user, Carbon $carbon)
    {
        $this->userTravel = $userTravel;
        $this->city = $city;
        $this->user = $user;
        $this->carbon = $carbon;
    }

    /**
     * Add a new user travel history record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeUserTravel(Request $request)
    {
        // dd($request);
        $request->merge([
            'user_id' => auth()->id(),
            'isAtLocation' => 1,
            'created_at' => $this->carbon->now(),
        ]);

        // dd($userTravelData);
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Add a new user travel history record
        $this->userTravel->addUserTravel($validatedData);

        // Return a response indicating success
        return response()->json([
            'message' => 'User travel record added successfully',
            'user_travel' => $validatedData
        ], 201);
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function validateAndVerifyRequestData($request)
    {
        // dd($request);
        return $request->validate([
            'route_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'city_id' => ['required', 'integer'],
            'isAtLocation' => ['required', 'integer'],
            'created_at' => ['nullable', 'date'],
        ]);
    }

    /**
     * Retrieve all user travel history records.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserTravelHistory(Request $request)
    {
        $userTravelHistory = $this->userTravel->getUserTravelHistoryByUserId(auth()->id());
        // Return the organized user travel history records
        return response()->json($userTravelHistory);
    }


    /**
     * Retrieve user travel details and return as JSON response.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserTravel()
    {
        // Retrieve user travel details with location using UserTravelHistory service
        $userTravels = $this->userTravel
            ->getUserTravelDetailsWithLocation(auth()->id());

        // Return user travel details as JSON response
        return response()->json($userTravels);
    }



    /**
     * Amend a user travel history record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function amendUserTravelHistory(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Modify the user travel history record using 'id' and other data
        return $this->userTravel->modifyUserTravelHistory($validatedData['id'], $validatedData);
    }
}
