<?php

namespace App\Http\Controllers;

use App\Models\Attack;
use App\Models\AttackLog;
use App\Models\User;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    /**
     * Display a listing of the users.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function rightList()
    {
        $user = new User();
        $data = ["data" => $user->getTopPlayers()];
    return response()->json($data);
    }

        /**
     * Display a listing of the users.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function leftList()
    {
        $user = new User();
        $data = ["data" => $user->getTopPlayers()];
    return response()->json($data);
    }

    /**
     * Display a listing of the users.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function events()
    {
        $attackLog = new AttackLog();
        return response()->json($attackLog->attackEvents());
    }
}
