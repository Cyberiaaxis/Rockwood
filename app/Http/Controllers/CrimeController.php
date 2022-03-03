<?php

namespace App\Http\Controllers;

use App\Models\{Crime, UserStats, CrimeMessage, UserCrime, UserDetail};
use Illuminate\Http\Request;

class CrimeController extends Controller
{

    protected $mode = ['easy', 'medium', 'hard'];
    protected $chances = [
        'easy' => ['success' => 70, 'fail' => 15, 'missed' => 15],
        'medium' => ['success' => 50, 'fail' => 20, 'missed' => 30],
        'hard' => ['success' => 25, 'fail' => 50, 'missed' => 25]
    ];

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $crime,
              $usercrime,
              $crimeMessage,
              $user,
              $userStats,
              $userDetails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            return $next($request);
        });

        $this->crime = new Crime();
        $this->usercrime =  new UserCrime();
        $this->crimeMessage = new CrimeMessage();
        $this->userStats = new UserStats();
        $this->userDetails = new UserDetail();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function crimes()
    {
        $userLevel = $this->userDetails->getLevelId($this->user->id);
        $locationId = $this->userDetails->getLocation($this->user->id);
        $crimes = $this->crime->crimesList($locationId, $userLevel);
    return response()->json(['crimes' => $crimes]);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([ 'crime_id' => ['required','int'] ]);
        $nerve = $this->userStats->haveNerve($this->user->id);
        if(!$this->canDoCrime($nerve, $request->crime_id))
        {
            return response()->json(['error' => "You don't have enough nerve"]);
        }

        // return $this->getDifficulty($request->crime_id);
        $successRate = mt_rand (5 , 50);
        $statusKey = 'fail';
        $statusType = 'bg-danger';

        if($successRate < 13 && $successRate > 10  ){
            $statusKey = 'success';
            $statusType = 'bg-success';
        } else if ($successRate < 10 && $successRate > 5) {
            $statusKey = 'missed';
            $statusType = 'bg-warning';
        }

        $crimeMessage = $this->crimeMessage->message($statusKey, $request->crime_id);

        if($statusKey ==! 'missed') {
            $user = ['user_id' => $this->user->id, 'crime_id' => $request->crime_id];
            $this->userCrime->addCrime($user, $statusKey);

        }

        $consumedNerve = $nerve - $this->crime->getNerve($request->crime_id);
        // dd($consumedNerve);
        $this->userStats->decrementNerve($this->user->id, $consumedNerve);

    return response()->json(['statusKey' => $statusKey, 'statusType' => $statusType, 'message' => $crimeMessage]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Crime  $crime;
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Crime $crime)
    {
        $exists = $crime->subCrimes($crime->id)->exists();

        if ($exists) {
            $data = ['crimes' => $crime->subCrimes($crime->id)->get()];
        } else {
            $data = ['done_crime' => $crime];
        }

    return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Crime  $crime;
     * @return \Illuminate\Http\Response
     */
    public function getDifficulty($crimeId)
    {
        $crime = new Crime();

        // echo (($iq * mt_rand($min, $max)) / $nerve) + ($level / 4) ?? 0;
// <newbie-chan> Player damage formula:  (attackers_attack + attackers_level) - (defenders_defense + difficulty_variable) + (random_number + (attackers_luck))
        // dd($this->mode);
        // $difficulty = array_rand($this->mode, 1);

        // return current($this->mode[$difficulty]);


        // $chance = mt_rand(1,100);

        // if($chance <  && $chance ){
        //     $color = 'bg-success';
        // } else if ($chance   && $chance ) {
        //     $color = 'bg-warning';
        // } else if ($chance   && $chance ) {
        //     $color = 'bg-danger';
        // }

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Crime  $crime;
     * @return \Illuminate\Http\Response
     */
    public function canDoCrime($userNerve, $crimeId)
    {
        $getRequiredNerve =  $this->crime->getNerve($crimeId);
    return $userNerve >= $getRequiredNerve;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Crime  $crime
     * @return \Illuminate\Http\Response
     */
    public function edit(Crime $crime)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Crime  $crime
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Crime $crime)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Crime  $crime
     * @return \Illuminate\Http\Response
     */
    public function destroy(Crime $crime)
    {
        //
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
}
