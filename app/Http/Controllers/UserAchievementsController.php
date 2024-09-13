<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Criteria, UserAchievement};
use Illuminate\Support\Facades\Auth;

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

    protected $criteria; // Property to hold criteria object   
    protected $userAchievement; // Property to hold userAchievement object       

    /**
     * Create a new controller instance.
     *
     * @param array $criteria
     * @return void
     */
    public function __construct(
        Criteria $criteria,
        UserAchievement $userAchievement
    ) {
        $this->criteria = $criteria;
        $this->userAchievement = $userAchievement;
    }

    /**
     * Determine if a user qualifies for an achievement based on an event and criteria.
     *
     * @param array $data
     * @return bool
     */
    public function isQualifiesForAchievement()
    {
        $playerAchievements =  $this->userAchievement->getUserAchievementsByUserId(Auth::user()->id);
        dd($playerAchievements);

        // Use $this->criteria to evaluate whether the user qualifies
        // Implement logic based on $data and $this->criteria
        // Example:
        // if (isset($this->criteria[$data['event_type']]) && /* some condition */) {
        //     return true;
        // }
        // return false;
    }

    /**
     * Evaluate and award an achievement to a user based on an event and criteria.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function evaluateAndAward(Request $request)
    {
        // Validate request data
        $data = $this->requestValidator($request);

        // If the user qualifies, award the achievement
        if ($this->isQualifiesForAchievement($data)) {
            return $this->awardAchievement();
        } else {
            // Handle the case where the user does not qualify
            return response()->json(['message' => 'User does not qualify for this achievement based on the event.'], 400);
        }
    }

    /**
     * Validate request data.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function requestValidator(Request $request)
    {
        return $request->validate([
            'event_type' => ['required', 'string', 'in:login,attack,crime,travel,mission'],
            // Add additional validation rules if needed
        ]);
    }

    /**
     * Award an achievement to a user based on an event and criteria.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function awardAchievement()
    {
        // Implement the logic to award an achievement
        // Example:
        // return response()->json(['message' => 'Achievement awarded successfully.'], 200);
    }
}
