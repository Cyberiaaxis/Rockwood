<?php

namespace App\Http\Controllers;

use App\Models\{UserDetail, UserStats};
use Illuminate\Http\Request;

class SidebarController extends Controller
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $user,
              $userDetails,
              $userStats;

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
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarMaxEnergy($userId)
    {
        return $this->userStats->getMaxEnergy($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarEnergy($userId)
    {
        return $this->userStats->getEnergy($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarEnergyfill($userId)
    {
        return ($this->userBarEnergy($userId) / $this->userBarMaxEnergy($userId) * 100);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function energyBar($userId)
    {

        $userMaxEnergy = $this->userBarMaxEnergy($userId);
        $userEnergy = $this->userBarEnergy($userId);
        $userEnergyfill = $this->userBarEnergyfill($userId);
        return ['userMaxEnergy' => $userMaxEnergy, 'userEnergy' => $userEnergy, 'userEnergyfill' => $userEnergyfill];
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarMaxHP($userId)
    {
        return $this->userStats->getMaxHp($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarHP($userId)
    {
        return $this->userStats->getHp($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarHpfill($userId)
    {
        return ($this->userBarHP($userId) / $this->userBarMaxHP($userId) * 100);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function hpBar($userId)
    {

        $userMaxHp = $this->userBarMaxHp($userId);
        $userHp = $this->userBarHp($userId);
        $userHpfill = $this->userBarHpfill($userId);
    return ['userMaxHp' => $userMaxHp, 'userHp' => $userHp, 'userHpfil' => $userHpfill];
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarMaxNerve($userId)
    {
        return $this->userStats->maxNerve($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarNerve($userId)
    {
        return $this->userStats->haveNerve($userId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function userBarNervefill($userId)
    {
        return ($this->userBarNerve($userId) / $this->userBarMaxNerve($userId) * 100);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function nerveBar($userId)
    {

        $userMaxNerve = $this->userBarMaxNerve($userId);
        $userNerve = $this->userBarNerve($userId);
        $userNervefill = $this->userBarNervefill($userId);
    return ['userMaxNerve' => $userMaxNerve, 'userNerve' => $userNerve, 'userNervefil' => $userNervefill];
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function bars()
    {
        $energyBar  = $this->energyBar($this->user->id);
        $nerveBar = $this->nerveBar($this->user->id);
        $hpBar = $this->hpBar($this->user->id);
        $money = $this->money();
        $points = $this->points();
        $bars = [
            'energyBar' => $energyBar,
            'nerveBar' => $nerveBar,
            'hpBar' => $hpBar,
            'money' => $money,
            'points' => $points];
    return response()->json(['html' => view('ajax.bars',$bars)->render()]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function money()
    {
        return $this->userDetails->getUserMoney($this->user->id);
    }

        /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function points()
    {
        return $this->userDetails->getUserPoints($this->user->id);
    }


}


