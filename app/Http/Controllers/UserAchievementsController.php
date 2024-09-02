<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAchievementsController extends Controller
{
    protected $eventHandlers = [
        'level_up' => 'checkLevelUp',
        'achievement_complete' => 'checkAchievementComplete',
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
    public function isQualifiesForAchievement($request)
    {
        // Example logic: Check if user qualifies for the achievement based on the event and criteria
        $user = DB::table('users')->where('id', $userId)->first();

        if ($event === 'level_up') {
            // Custom logic for level up event
            if ($user->level >= $criteria['level']) {
                return true;
            }
        }
        // Add more event-based logic here
        return false;
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
        // If the user qualifies, award the achievement
        if ($this->isQualifiesForAchievement($request)) {
            return $this->awardAchievement($request);
        } else {
            // Handle the case where the user does not qualify
            return response()->json(['message' => 'User does not qualify for this achievement based on the event.'], 400);
        }
    }

    /**
     * Award an achievement to a user based on an event and criteria.
     *
     * @param int $userId
     * @param string $event
     * @param array $criteria
     * @return \Illuminate\Http\JsonResponse
     */
    public function awardAchievement($request)
    {
        // Find or create an achievement based on criteria and event
        $achievement = DB::table('achievements')
            ->where($criteria)
            ->where('event', $event)
            ->first();

        if (!$achievement) {
            // If no matching achievement exists, create a new one
            $achievementId = DB::table('achievements')->insertGetId(
                array_merge($criteria, ['event' => $event])
            );
        } else {
            $achievementId = $achievement->id;
        }

        // Attach the achievement to the user
        DB::table('user_achievements')->insert([
            'user_id' => $userId,
            'achievement_id' => $achievementId,
        ]);

        // Optionally, add logic to update user stats, notify the user, etc.
        return response()->json(['message' => 'Achievement successfully awarded based on the event.'], 200);
    }
}
