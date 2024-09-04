<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAchievementsController extends Controller
{
    protected $eventHandlers = [
        'login' => 'Login',
        'attack' => 'Battle',
        'crime' => 'Crime',
        'travel' => 'Travel',
        'mission' => 'Mission',

        // Add more event types and their handlers here
    ];

    /**
     * Determine if a user qualifies for an achievement based on an event and criteria.
     *
     * @param int $userId
     * @param string $event
     * @param array $criteria
     * @return bool
     */
    public function isQualifiesForAchievement($request) {
        
    }

    /**
     * Evaluate and award an achievement to a user based on an event and criteria.
     *
     * @param int $userId
     * @param string $event
     * @param array $criteria
     * @return \Illuminate\Http\JsonResponse
     */
    public function evaluateAndAward(Request $request)
    {
        // Validate request data
        $data  = $this->requestValidator($request);
        // If the user qualifies, award the achievement
        if ($this->isQualifiesForAchievement($data)) {
            return $this->awardAchievement($request);
        } else {
            // Handle the case where the user does not qualify
            return response()->json(['message' => 'User does not qualify for this achievement based on the event.'], 400);
        }
    }
    public function requestVaildator($request)
    {
        return $request->validate([
            'event_type' => ['required', 'string', 'in:login,attack,crime,travel,mission'],
        ]);
    }

    /**
     * Award an achievement to a user based on an event and criteria.
     *
     * @param int $userId
     * @param string $event
     * @param array $criteria
     * @return \Illuminate\Http\JsonResponse
     */
    public function awardAchievement() {}
}
