<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessRefill;
use App\Models\{UserStats, UserDetail};
use Illuminate\Http\Request;

class GymController extends Controller
{

    /**
     * The attributes that are assignable.
     *
     * @var
     */
    protected   $user,
                $userDetails,
                $userStats;

    /**
     * Instantiate a new AttacksController instance.
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            return $next($request);
        });

        $this->userDetails = new UserDetail();
        $this->userStats = new UserStats();
    }

    /**
     * Show the profile for the given user.
     *
     * @param
     * @return
     */
    public function index()
    {
        dispatch((new ProcessRefill)->onQueue('high'));
        return view('player.gym');
    }

    /**
     * Show the profile for the given user.
     *
     * @param
     * @return
     */
    public function store(Request $request)
    {
        $playerEnergy = $this->userStats->getEnergy($this->user->id);

        if($this->energy($playerEnergy) === false)
        {
            return response()->json(['success' => false, 'message' => "You've no more enegry to train"]);
        }

        $getTrain = $this->canTrain($request);
        $updatedenergy = (int) $playerEnergy - $getTrain['gymtimes'];
        $totalgain = 0; $will = 0;

        for ($i = 0; $i <= $getTrain['gymtimes'] && $playerEnergy > 0; $i++)
        {
            $gain = rand(1, 3) / rand(800, 1000) * rand(800, 1000)
                * (($this->userStats->getWill($this->user->id) + 20) / 150);
            $totalgain += $gain;
            $willrandom = (int) (rand(1, 3));

            if ($this->userStats->getWill($this->user->id) >= $willrandom)
            {
                $will = $this->userStats->getWill($this->user->id) - $willrandom;
            }
        }

        $this->userStats->incermentStats($this->user->id, $getTrain['field'], $totalgain, $updatedenergy,  $will);
    return response()->json(['success' => true, 'message' => "You've successfully gained ". $getTrain['field'] . " " . $totalgain ]);
    }

    /**
     * Show the profile for the given user.
     *
     * @param
     * @return
     */
    public function canTrain($request){

        $gymtimes = $field = null;
        $energy = $this->userStats->getEnergy($this->user->id);

        if ($request->has('strength')) {
            $request->validate(['strength' => ['required', 'integer', 'min:1']]);
            $gymtimes = ($request->strength > $energy) ?  (int)  $energy : (int) $request->strength;
            $field = 'strength';
        }

        if ($request->has('agility')) {
            $request->validate(['agility' => ['required', 'integer', 'min:1']]);
            $gymtimes = ($request->agility > $energy) ? (int) $energy : (int) $request->agility;
            $field = 'agility';
        }

        if ($request->has('endurance')) {
            $request->validate(['endurance' => ['required', 'integer', 'min:1']]);
            $gymtimes = ($request->endurance > $energy) ? (int) $energy : (int) $request->endurance;
            $field = 'endurance';
        }

        if ($request->has('defense')) {
            $request->validate(['defense' => ['required', 'integer', 'min:1']]);
            $gymtimes = ($request->defense > $energy) ? (int) $energy : (int) $request->defense;
            $field = 'defense';
        }

    return ['gymtimes' => $gymtimes, 'field' => $field];
    }

    public function energy($energy)
    {
        if ($energy <= 0)
        {
            return false;
        }
    }

}
