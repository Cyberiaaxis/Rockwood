<?php

namespace App\Http\Controllers;

use App\Http\Resources\FightClubResource;
use App\Models\FightClub;
use App\Models\FightClubPlayer;
use App\Models\User;
use App\Models\UserStats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FightClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userStats = new UserStats();
        $areaId = $userStats->where('user_id', auth()->id())->value('area_id');
        $fightclub = new FightClub();
        return response()->json($fightclub->where('area_id', $areaId)->with('userFightClub')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getClubPlayerList(Request $request)
    {
        $userStats = new UserStats();
        $userStats->updateFightClubID((int)  auth()->id(), (int) $request->fightClubId);
        $fightClub = new FightClub();
        $users = $fightClub->with('users')->where('id', $request->fightClubId)->firstOrFail();
        return $club = new FightClubResource($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FightClub  $fightClub
     * @return \Illuminate\Http\Response
     */
    public function show(FightClub $fightClub)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FightClub  $fightClub
     * @return \Illuminate\Http\Response
     */
    public function edit(FightClub $fightClub)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FightClub  $fightClub
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FightClub $fightClub)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FightClub  $fightClub
     * @return \Illuminate\Http\Response
     */
    public function destroy(FightClub $fightClub)
    {
        //
    }
}
