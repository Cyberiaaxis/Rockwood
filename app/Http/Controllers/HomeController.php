<?php

namespace App\Http\Controllers;

use App\Models\{UserReward, UserDetail, UserCrime, User, Rank, Attack, Area, Level, RealEstate, UserStats};
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * The attributes that are assignable.
     *
     * @var
     */
    protected   $area,
        $attack,
        $userDetails,
        $userStats,
        $userRank,
        $userCrime,
        $realEstate,
        $userReward,
        $carbon;


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->loginUser = auth()->user();
            return $next($request);
        });

        $this->area = new Area();
        $this->level = new Level();
        $this->rank = new Rank();
        $this->user = new User();
        $this->userDetails = new UserDetail();
        $this->userCrime = new UserCrime();
        $this->userStats = new UserStats();
        $this->carbon = new Carbon();
        $this->realEstate = new RealEstate();
        $this->userReward = new UserReward();
        $this->attack = new Attack();
        $this->carbon = new Carbon();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $name = $this->name();
        $rank = $this->rank();
        $activeHouse = $this->activeHouse();
        $area = $this->area();
        $totalAwards = $this->totalAwards();
        $level = $this->level();
        $totalCrimes = $this->totalCrimes();
        $asAttackerLost = $this->asAttackerLost();
        $asDefenderLost = $this->asDefenderLost();
        $totalLost = $this->totalLost();
        $asAttackerWon = $this->asAttackerWon();
        $asDefenderWon = $this->asDefenderWon();
        $totalWon = $this->totalWon();
        $asAttackerSettlement = $this->asAttackerSettlement();
        $asDefenderSettlement = $this->asDefenderSettlement();
        $totalSettlement = $this->totalSettlement();
        $strength = $this->strength();
        $agility = $this->agility();
        $defense = $this->defense();
        $endurance = $this->endurance();
        $asAttackerEscaped = $this->asAttackerEscaped();
        $asDefenderEscaped = $this->asDefenderEscaped();
        $totalEscaped = $this->totalEscaped();
        $age = $this->age();
        $money = $this->money();
        $points = $this->points();
        $details =  [
            "name" => $name,
            "rank" => $rank,
            "level" => $level,
            "activeHouse" => $activeHouse,
            "area" => $area,
            "totalAwards" => $totalAwards,
            "totalCrimes" => $totalCrimes,
            "asAttackerLost" => $asAttackerLost,
            "asDefenderLost" => $asDefenderLost,
            "totalLost" => $totalLost,
            "asAttackerWon" => $asAttackerWon,
            "asDefenderWon" => $asDefenderWon,
            "totalWon" => $totalWon,
            "asAttackerSettlement" => $asAttackerSettlement,
            "asDefenderSettlement" => $asDefenderSettlement,
            "totalSettlement" => $totalSettlement,
            "strength" => $strength,
            "agility" => $agility,
            "defense" => $defense,
            "endurance" => $endurance,
            "asAttackerEscaped" => $asAttackerEscaped,
            "asDefenderEscaped" => $asDefenderEscaped,
            "totalEscaped" => $totalEscaped,
            "age" => $age,
            "money" => $money,
            "points" => $points,
        ];
    return response()->json($details);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function name()
    {
        return $this->user->getUserNameById($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function rank()
    {
        $rankId = $this->userDetails->getRankId($this->loginUser->id);
        return $this->rank->getRankById($rankId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function level()
    {
        $levelId = $this->userDetails->getLevelId($this->loginUser->id);
        return $this->level->getLevelById($levelId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function activeHouse()
    {
        $houseId = $this->userDetails->getActiveEstate($this->loginUser->id);
        return $this->realEstate->getHouseById($houseId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function area()
    {
        $areaId = $this->userDetails->getLocation($this->loginUser->id);
        return $this->area->getAreaById($areaId);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalAwards()
    {
        return $this->userReward->getTotalRewards($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalCrimes()
    {
        return $this->userCrime->getSuccessCrimes($this->loginUser->id) + $this->userCrime->getFailCrimes($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalAttacks()
    {
        return $this->attack->getAttacks($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asAttackerLost()
    {
        $totalAttacks = $this->totalAttacks();
        $asAttackerWon = $this->asAttackerWon();
        $asAttackerSettlement = $this->asAttackerSettlement();
        $asAttackerEscaped = $this->asAttackerEscaped();
        return $totalAttacks - ($asAttackerWon + $asAttackerSettlement + $asAttackerEscaped);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalLost()
    {
        $asAttackerLost = $this->asAttackerLost();
        $asDefenderLost = $this->asDefenderLost();
        return ($asAttackerLost + $asDefenderLost);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalWon()
    {
        $asAttackerWon = $this->asAttackerWon();
        $asDefenderWon = $this->asDefenderWon();
        return ($asAttackerWon + $asDefenderWon);
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asAttackerWon()
    {
        return $this->attack->getAttackSuccess($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asAttackerSettlement()
    {
        return $this->attack->getSettlementAttacker($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asAttackerEscaped()
    {
        return $this->attack->getEscapedAttacker($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asDefenderWon()
    {
        return $this->attack->getDefenseSuccess($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asDefenderLost()
    {
        $totalDefender = $this->totalDefender();
        $asDefenderWon = $this->asDefenderWon();
        $asDefenderSettlement = $this->asDefenderSettlement();
        $asDefenderEscaped = $this->asDefenderEscaped();
        return $totalDefender - ($asDefenderWon + $asDefenderSettlement + $asDefenderEscaped);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalDefender()
    {
        return $this->attack->getDefenses($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asDefenderEscaped()
    {
        return $this->attack->getEscapedDefender($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalEscaped()
    {
        return $this->asDefenderEscaped() + $this->asAttackerEscaped();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function asDefenderSettlement()
    {
        return $this->attack->getSettlementDefender($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalSettlement()
    {
        return $this->asDefenderSettlement() + $this->asAttackerSettlement();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function strength()
    {
        return round($this->userStats->getStrength($this->loginUser->id), 3);
    }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function agility()
    {
        return round($this->userStats->getAgility($this->loginUser->id), 3);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function endurance()
    {
        return round($this->userStats->getEndurance($this->loginUser->id), 3);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function defense()
    {
        return round($this->userStats->getDefense($this->loginUser->id), 3);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function age()
    {
        return $this->carbon->parse($this->user->getAge($this->loginUser->id))->diffForHumans($this->carbon->now());
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function money()
    {
        return $this->userDetails->getUserMoney($this->loginUser->id);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function points()
    {
        return $this->userDetails->getUserPoints($this->loginUser->id);
    }
}
