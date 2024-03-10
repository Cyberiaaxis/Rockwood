<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Models\UserTravelHistory;
use Illuminate\Http\Request;

class UserTravelHistoryController extends Controller
{
    protected $userTravelHistory;

    /**
     * Create a new instance of UserTravelHistoryController.
     *
     * @param  \App\Models\UserTravelHistory  $userTravelHistory
     * @return void
     */
    public function __construct(UserTravelHistory $userTravelHistory)
    {
        $this->userTravelHistory = $userTravelHistory;
    }

    /**
     * Add a new user travel history record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeUserTravelHistory(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Add a new user travel history record
        $this->userTravelHistory->addUserTravelHistory($validatedData);

        // Return a response indicating success
        return response()->json([
            'message' => 'User travel history record added successfully',
            'user_travel_history' => $validatedData
        ], 201);
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function validateAndVerifyRequestData(Request $request): array
    {
        // Define validation rules
        $rules = [
            'user_id' => ['required', 'integer'],
            'city_id' => ['required', 'integer'],
            'status' => ['required', 'boolean'],
        ];

        // Validate incoming request data
        $validatedData = $request->validate($rules);

        // Return the validated data
        return $validatedData;
    }

    /**
     * Retrieve all user travel history records.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserTravelHistory(Request $request)
    {
        $userTravelHistory = $this->userTravelHistory->getUserTravelHistoryByUserId(auth()->id());
        // Return the organized user travel history records
        return response()->json($userTravelHistory);
    }

    /**
     * Retrieve the current user's travel history records.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCurrentUserTravelHistory(Request $request)
    {
        $userTravelHistory = $this->userTravelHistory->getUserTravelHistoryByUserIdAndStatus(auth()->id(), true);
        // Return the organized user travel history records
        return response()->json($userTravelHistory);
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
        return $this->userTravelHistory->modifyUserTravelHistory($validatedData['id'], $validatedData);
    }
}
