<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTravelHistory;
use App\Models\City;

class UserTravelHistoryController extends Controller
{
    protected $userTravelHistory;
    protected $city;

    /**
     * Create a new instance of UserTravelHistoryController.
     *
     * @param  \App\Models\UserTravelHistory  $userTravelHistory
     * @return void
     */
    public function __construct(UserTravelHistory $userTravelHistory, City $city)
    {
        $this->userTravelHistory = $userTravelHistory;
        $this->city = $city;
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
    public function getUserTravel()
    {
        // Get the user's currently ongoing travel
        $userCurrentlyTravelling = $this->userTravelHistory->getUserTravelHistoryByUserIdAndStatus(auth()->id());

        // Get the user's completed travel history
        return  $userTravelHistory = $this->userTravelHistory->getUserTravelHistoryByUserIdAndStatus(auth()->id(), false);
        // dd($userTravelHistory);
        // $userTravelHistory;
        // $userCurrentlyTravelling[0]->city_id;
        $locationDetails = $this->city->getCityRegionCountryById(
            $userTravelHistory
        );
        // dd($userCurrentlyTravelling['city_id'] || $userTravelHistory['city_id']);

        // Return the data in a JSON response
        return response()->json([
            // 'current_travel' => $userCurrentlyTravelling, // Currently ongoing travel
            'completed_travels' => $userTravelHistory // Completed travel history
        ]);
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
