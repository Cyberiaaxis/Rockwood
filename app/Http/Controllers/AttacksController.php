<?php

namespace App\Http\Controllers;

use App\Models\{ AttackLog, User, Item, UserDetail,  UserSlot, UserStats, WeaponAttribute};
use Carbon\Carbon;
use Illuminate\Http\Request;


class AttacksController extends Controller
{

    /**
     * The attributes that are assignable.
     *
     * @var
     */
    protected  $attacker,
               $defender,
               $userDetails,
               $userStats,
               $weaponAttributes,
               $userSlots,
               $attackLog,
               $items,
               $hitresult,
               $carbon;

    /**
     * Instantiate a new AttacksController instance.
     */
    public function __construct(){
        $this->middleware(function ($request, $next) {
            $this->attacker = auth()->user();
        return $next($request);
        });

        $this->userDetails = new UserDetail();
        $this->userStats = new UserStats();
        $this->items = new Item();
        $this->weaponAttributes = new WeaponAttribute();
        $this->userSlots = new UserSlot();
        $this->attackLog = new AttackLog();
        $this->items = new Item();
        $this->carbon = new Carbon();
    }

    /**
     * invoke for attack
     * @param  Request $request, User $defender
     * @return \Illuminate\Http\Response player.attack with $array
     */
     public function __invoke(Request $request, User $defender) {
        $this->defender = $defender;
        return view('player.attack', [
             'attacker' => $this->attacker,
             'defender' => $this->defender,
             'defenderEquipped' => $this->equippedWeapons($this->defender->id),
             'attackerEquipped' => $this->equippedWeapons($this->attacker->id)
        ]);
     }

    /**
     * both player preparation for an Attack
     * @param  Request $request
     * @return \Illuminate\Http\Response $array
     */
    public function preparationForAttack($request) {
        $this->canAttack();
        $nextTurnAssignment = $this->turn();
        // dd($nextTurnAssignment);
        if((int)$nextTurnAssignment === 1)
        {
            $this->consumeEnergy($this->attacker->id);
        }

        $turnOwner = $this->doTurn($nextTurnAssignment);
        $selectedAttackerWeapon = $this->selectedWeaponName($this->attacker->id, $request->weaponId );
        $defenderWeaponId = $this->equippedWeapons($this->defender->id);
        $selectedDefenderWeapon = $this->selectedWeaponName($this->defender->id, $defenderWeaponId['primaryWeaponId']);
        $selectedAttackerWeaponAttributes = $this->equippedWeaponAttributes($request->weaponId);
        $selectedDefenderWeaponAttributes = $this->equippedWeaponAttributes($defenderWeaponId['primaryWeaponId']);
        $attackerStats = $this->getFightStats($this->attacker->id);
        $defenderStats = $this->getFightStats($this->defender->id);
        return [
            'turnNumber' => $nextTurnAssignment,
            'turnOwner' => $turnOwner,
            'attackerStats' => $attackerStats,
            'defenderStats' => $defenderStats,
            'selectedAttackerWeapon' => $selectedAttackerWeapon,
            'selectedDefenderWeapon' =>   $selectedDefenderWeapon,
            'selectedAttackerWeaponAttributes' => $selectedAttackerWeaponAttributes,
            'selectedDefenderWeaponAttributes' => $selectedDefenderWeaponAttributes
        ];
    }

    /**
     * attack preformance responsible
     * @param  Request $request, User $defender
     * @return \Illuminate\Http\Response $method
     */
    public function attack(Request $request, User $defender) {
        $this->defender = $defender;
        $preparedForAttack = $this->preparationForAttack($request);
        $singleHitResult = $this->attackPerform($preparedForAttack);
        $this->hitresult .= $singleHitResult;
    return $singleHitResult;
    }

    /**
     * generate attack step event
     * @param  $preparedForAttack, $damage
     * @return \Illuminate\Http\Response string
     */
    public function generateAttackStepEvent($preparedForAttack, $damage = 'missed') {
        $weaponName =  ($preparedForAttack['turnNumber'] % 2) ? $preparedForAttack['selectedDefenderWeapon'] : $preparedForAttack['selectedAttackerWeapon'];
        return [
            'turnNumber' => $preparedForAttack['turnNumber'],
            'message' => $preparedForAttack['turnNumber'] . " " . $preparedForAttack['turnOwner'] . " " . $weaponName . " " . $damage . " " . date('Y-m-d H:i:s')
        ] ;
    }


    /**
     * consume the energy for attack
     * @param  $userId
     * @return \Illuminate\Http\Response string
     */
    public function consumeEnergy($userId) {
        $consumeEnergyValue  = (int) ($this->userStats->getMaxEnergy($userId) / 3);
        $this->userStats->decrementEnergy($userId, $consumeEnergyValue);
    }

    /**
     * add attack log in storage                                                    \
     * @param
     * @return \Illuminate\Http\Response boolean
     */
    public function attackLog($hitResult) {
        return $this->attackLog->addLog($hitResult);
    }

    /**
     * cheack the eligibility for attack of both player
     * @param
     * @return \Illuminate\Http\Response throw expection
     */
    public function canAttack() {
        // dd($this->defender);
        $haveEnergy = (int) $this->userStats->getEnergy($this->defender->id) < (int) ($this->userStats->getMaxEnergy($this->defender->id)/2);
        $notSameLocation = $this->userDetails->getLocation($this->defender->id) !== $this->userDetails->getLocation($this->attacker->id);
        $defenderHospitalized = $this->userDetails->getHospitalTime($this->defender->id);
        $defenderJailed = $this->userDetails->getJailTime($this->defender->id);
        $selfAttack = $this->defender->id === $this->attacker->id;

        if ($selfAttack) {
            abort(403, "You can't attack yourself.");
        }elseif($haveEnergy) {
            abort(403, "You don't have enough energy.");
        } elseif ($notSameLocation) {
            abort(403, "Player isn't on same location.");
        } elseif ($defenderHospitalized) {
            abort(403, "Player already is hospitalized.");
        } elseif ($defenderJailed) {
            abort(403, "Player already is Jailed.");
        }
    }

    /**
     * turn creator for attack
     * @param
     * @return \Illuminate\Http\Response session
     */
    public function turn() {
        $turn = session('oldTurnNumber', 0);
        $countturn = $turn+1;
        session()->put('oldTurnNumber', $countturn);
    return $countturn;
    }

    /**
     * assign the turn to players for attack
     * @param $nextTurnAssignment
     * @return \Illuminate\Http\Response string
     */
    public function doTurn($nextTurnAssignment) {

        if($nextTurnAssignment%2 == 0)
        {
            return $this->defender->name;
        }

    return $this->attacker->name;
    }

    /**
     * attack performer
     * @param $preparedForAttack
     * @return \Illuminate\Http\Response string or JSON
     */
    public function attackPerform($preparedForAttack){
        $userId = ($preparedForAttack['turnNumber'] % 2) ? $this->defender->id : $this->attacker->id;

        if($this->isChanceSuccess($preparedForAttack))
        {
            $damageCalculation = $this->damageCalculation($preparedForAttack);
            $this->doHPDown($userId, $damageCalculation);
            $isrHpDown = $this->isHP($userId);

            if($isrHpDown <= 0)
            {
                $attacker = ['attackerId' => $this->attacker->id];
                $defender = ['defenderId' => $this->defender->id];
                $userData = ($userId === $this->attacker->id)? $attacker: $defender;
            return response()->json([$userData]);
            }

        return $this->generateAttackStepEvent($preparedForAttack, $damageCalculation)['message'];
        }

    return $this->generateAttackStepEvent($preparedForAttack)['message'];
    }

    /**
     * defender hospitalize
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function hospitalize($userId) {
        $number = mt_rand(1,5);
        $duration = $this->carbon->now()->addHours($number);
        session()->forget('oldTurnNumber');
    return $this->userDetails->addHospitalTime($userId, $duration);
    }

    /**
     * defender hospitalize
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function settlement($userId)
    {
        $number = mt_rand(1, 5);
        $duration = $this->carbon->now()->addHours($number);
        $this->hitresult['message'] .= "You successfully done settlement";
        session()->forget('oldTurnNumber');
    return $this->attackLog($this->hitresult);
    }

    /**
     * runway in between the attack
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function runaway($userId)
    {
        $number = mt_rand(1, 5);
        $message = "You successfully managed runaway";

        if($number === 3)
        {
            $duration = $this->carbon->now()->addHours($number);
            $this->userDetails->addHospitalTime($userId, $duration);
            $message = "You failed to manage the runaway";
        }

        $this->hitresult['message'] .= $message;
        session()->forget('oldTurnNumber');
    return $this->attackLog($this->hitresult);
    }

    /**
     * defender  hospitalize
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function leave($userId) {
        $number = mt_rand(20,30);
        $duration = $this->carbon->now()->addMinutes($number);
        $this->userDetails->addHospitalTime($userId, $duration);
        session()->forget('oldTurnNumber');
    return $this->attackLog($this->hitresult['message']);
    }

    /**
     * defender  hospitalize
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function mug($userId) {
        $number = mt_rand(20, 25);
        $duration = $this->carbon->now()->addMinutes($number);
        $this->userDetails->addHospitalTime($userId, $duration);
        session()->forget('oldTurnNumber');
    return $this->attackLog($this->hitresult['message']);
    }

    /**
     * attacker hospitalize
     * @param $userId
     * @return \Illuminate\Http\Response boolean
     */
    public function lost($userId) {
        $number = mt_rand(10, 20);
        $duration = $this->carbon->now()->addMinutes($number);
        $this->userDetails->addHospitalTime($userId, $duration);
        session()->forget('oldTurnNumber');
    return $this->attackLog($this->hitresult['message']);
    }

    /**
     * equipped weapons of both players for attack
     * @param $userId
     * @return \Illuminate\Http\Response array
     */
    public function equippedWeapons($userId) {
        $weapons = $this->userSlots->getUserWeaponsById($userId);
        $primaryWeaponName = $this->items->getWeaponNameById($weapons->primary_slot);
        $secondaryWeaponName = $this->items->getWeaponNameById($weapons->secondary_slot);
        return [
            'primaryWeaponId' => $weapons->primary_slot,
            'primaryWeaponName' => $primaryWeaponName,
            'secondaryWeaponId' => $weapons->secondary_slot,
            'secondaryWeaponName' => $secondaryWeaponName
        ];
    }

    /**
     * hitting chance of attacker
     * @param $preparedForAttack
     * @return \Illuminate\Http\Response boolean
     */
    public function isChanceSuccess($preparedForAttack) {
        $genrateRandom = mt_rand(1, 100);
        $hitRatio = (int) $this->hitRatio($preparedForAttack);
    return $genrateRandom <= (int) $hitRatio;
    }

    /**
     * decrement the HP of loser of hit in attack
     * @param $userId, $damageCalculation
     * @return \Illuminate\Http\Response boolean
     */
    public function doHPDown($userId, $damageCalculation) {
        return $this->userStats->decrementHP($userId, $damageCalculation);
    }

    /**
     * select weapon for attack by both player for attack
     * @param $userId, $weaponId
     * @return \Illuminate\Http\Response boolean or throw expection
     */
    public function selectedWeaponName($userId, $weaponId) {
        $weapons = $this->equippedWeapons($userId);
        $correctWeaponSelected = (int) $weapons['primaryWeaponId']  === (int) $weaponId || (int) $weapons['secondaryWeaponId']  === (int) $weaponId;

        if($correctWeaponSelected){
            return $this->items->getWeaponNameById($weaponId);
        }

    abort(403, "This weapon isn't selectable");
    }

    /**
     * as per weapon selection get attributes of weapon
     * @param $itemId
     * @return \Illuminate\Http\Response array
     */
    public function equippedWeaponAttributes($itemId) {
        $weaponAtrributeId = $this->items->getItemAttributeById($itemId);
    return $this->weaponAttributes->getattributesById($weaponAtrributeId);
    }

    /**
     * calculation of damage
     * @param $preparedForAttack
     * @return \Illuminate\Http\Response int
     */
    public function damageCalculation($preparedForAttack) {

        if ($preparedForAttack['turnNumber'] % 2)
        {
            return (int) ($preparedForAttack['selectedDefenderWeaponAttributes']['damage'] * $preparedForAttack['defenderStats']['strength'] /
                $preparedForAttack['attackerStats']['defense']) * (rand(8000, 12000) / 10000);
        }

    return (int) ($preparedForAttack['selectedAttackerWeaponAttributes']['damage'] * $preparedForAttack['attackerStats']['strength'] /
        $preparedForAttack['defenderStats']['defense']) * (rand(8000, 12000) / 10000);
    }

    /**
     * calculation of hitratio
     * @param $preparedForAttack
     * @return \Illuminate\Http\Response float
     */
    public function hitRatio($preparedForAttack) {
        return min(50 * $preparedForAttack['attackerStats']['agility'] / $preparedForAttack['defenderStats']['agility'] , 95);
    }

    /**
     * calculation of cirital hit
     * @param $hitRatio
     * @return \Illuminate\Http\Response float
     */
    public function ciritalHit($hitRatio) {
        return ($hitRatio + $this->attacker->level / 2) / 10;
    }

    /**
     * for get the players fighting stats
     * @param $userId
     * @return \Illuminate\Http\Response array
     */
    public function getFightStats($userId) {
        $strength = $this->userStats->getStrength($userId);
        $agility = $this->userStats->getAgility($userId);
        $defense = $this->userStats->getDefense($userId);
        $hp = $this->userStats->getHp($userId);
    return ['strength' => $strength, 'agility' => $agility, 'defense' => $defense, 'HP' => $hp];
    }

    /**
     * check the hp of player
     * @param $userId
     * @return \Illuminate\Http\Response string
     */
    public function isHP($userId) {
        return $this->userStats->getHp($userId);
    }
}
