<?php

namespace App\Http\Controllers;

use App\Models\{
    Course,
    UserCourseHistory,
    UserReward,
    UserDetail,
    UserCrime,
    User,
    Rank,
    Attack,
    Region,
    Level,
    RealEstate,
    UserStats,
    Country,
    City,
    Gang,
    UserTravelHistory
};
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Get the authenticated user ID.
     *
     * @return int|null The ID of the authenticated user, or null if no user is authenticated.
     */
    protected function getAuthenticatedUserId()
    {
        if (Auth::check()) {
            return Auth::user()->id;
        }
        return null;
    }

    /**
     * Assignable attributes for the controller.
     *
     * These attributes represent various dependencies and properties
     * used within the controller's methods.
     *
     * @var Region         $area               The instance of the Area model.
     * @var Attack        $attack             The instance of the Attack model.
     * @var UserDetail    $userDetails        The instance of the UserDetail model.
     * @var UserStats     $userStats          The instance of the UserStats model.
     * @var UserRank      $userRank           The instance of the UserRank model.
     * @var UserCrime     $userCrime          The instance of the UserCrime model.
     * @var RealEstate    $realEstate         The instance of the RealEstate model.
     * @var UserReward    $userReward         The instance of the UserReward model.
     * @var Rank          $rank               The instance of the Rank model.
     * @var User          $user               The instance of the User model.
     * @var Level         $level              The instance of the Level model.
     * @var Carbon        $carbon             The Carbon instance for date/time handling.
     * @var int           $authenticatedUserId    The ID of the authenticated user.
     * @var Country       $country            The instance of the Country model.     
     * @var Region        $region             The instance of the Region model.
     * @var City          $country            The instance of the City model.
     * @var Gang          $gang               The instance of the gang model.
     * @var UserTravelHistory          $userTravelHistory               The instance of the UserTravelHistory model.
     */
    protected $region,
        $attack,
        $userDetails,
        $userStats,
        $userRank,
        $userCrime,
        $realEstate,
        $userReward,
        $rank,
        $country,
        $city,
        $user,
        $level,
        $carbon,
        $gang,
        $authenticatedUserId,
        $course,
        $userCourseHistory,
        $userTravelHistory;

    /**
     * Create a new controller instance.
     *
     * Initializes a new instance of the controller with necessary dependencies injected.
     *
     * @param Region $area The area model instance.
     * @param Attack $attack The attack model instance.
     * @param Level $level The level model instance.
     * @param Rank $rank The rank model instance.
     * @param User $user The user model instance.
     * @param UserDetail $userDetail The user detail model instance.
     * @param UserCrime $userCrime The user crime model instance.
     * @param UserStats $userStats The user stats model instance.
     * @param Carbon $carbon The Carbon instance for handling date/time.
     * @param RealEstate $realEstate The real estate model instance.
     * @param UserReward $userReward The user reward model instance.
     * @param Country $country The country model instance.
     * @param City $city The city model instance.
     * @param Region $region The region model instance.
     * @param Gang $gang The gang model instance.
     * @param Course $course The gang model instance. 
     * @param UserCourseHistory $userCourseHHistory The gang model instance. 
     * @param UserTravelHistory $userTravelHistory The UserTravelHistory model instance. 
     * @return void 
     */
    public function __construct(
        Region $region,
        Attack $attack,
        Level $level,
        Rank $rank,
        User $user,
        UserDetail $userDetail,
        UserCrime $userCrime,
        UserStats $userStats,
        Carbon $carbon,
        RealEstate $realEstate,
        UserReward $userReward,
        Country $country,
        City $city,
        Gang $gang,
        Course $course,
        UserCourseHistory $userCourseHistory,
        UserTravelHistory $userTravelHistory
    ) {
        $this->authenticatedUserId = auth()->user(); // Set the authenticated user ID
        $this->region = $region;
        $this->level = $level;
        $this->rank = $rank;
        $this->user = $user;
        $this->userDetails = $userDetail;
        $this->userCrime = $userCrime;
        $this->userStats = $userStats;
        $this->carbon = $carbon;
        $this->realEstate = $realEstate;
        $this->userReward = $userReward;
        $this->attack = $attack;
        $this->country = $country;
        $this->city = $city;
        $this->gang = $gang;
        $this->course = $course;
        $this->userCourseHistory = $userCourseHistory;
        $this->authenticatedUserId = $this->getAuthenticatedUserId(); // Retrieve and set the authenticated user ID
        $this->userTravelHistory = $userTravelHistory;
    }

    /**
     * Display the main dashboard data.
     *
     * This method retrieves various details about the player, attack statistics,
     * and battle statistics. It constructs an array containing these details
     * and returns them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing player, attack, and battle statistics.
     */
    public function index()
    {
        $details = [
            // "countries" => $this->countries(),
            "playerInfo" => $this->getPlayerInfo(),
            "attackStats" => $this->getAttackStats(),
            "battleStats" => $this->getBattleStats(),
        ];
        return response()->json($details);
    }

    /**
     * Retrieve the name of the authenticated user.
     *
     * This method calls the 'getUserNameById' method of the user model
     * to fetch and return the name of the authenticated user.
     *
     * @return string|null The name of the authenticated user, or null if user is not found.
     */
    public function name()
    {
        return $this->user->getUserNameById($this->authenticatedUserId);
    }

    /**
     * Retrieve the rank of the authenticated user.
     *
     * This method obtains the rank ID of the authenticated user
     * using the 'getRankId' method of the user details model.
     * Then, it fetches and returns the rank information by calling
     * the 'getRankById' method of the rank model.
     *
     * @return \App\Models\Rank|null The rank of the authenticated user, or null if user is not found.
     */
    public function rank()
    {
        $rankId = $this->userDetails->getRankId($this->authenticatedUserId);
        return $this->rank->getRankById($rankId);
    }

    /**
     * Retrieve the level information for the authenticated user.
     *
     * This method fetches the level ID of the authenticated user and then
     * retrieves the corresponding level information using the Level model.
     *
     * @return mixed The level information of the authenticated user.
     */
    public function level()
    {
        return $this->level->getLevelById(
            $this->userDetails->getLevelId($this->authenticatedUserId)
        );
    }

    /**
     * Get the current course for the authenticated user.
     *
     * This method retrieves the current course for the authenticated user.
     * It first fetches the course ID from the user's course history for today's date.
     * If the user has a current course, it retrieves and returns the name of the course.
     * If the user doesn't have a current course, it returns "none".
     *
     * @return string The name of the current course or "none" if no course is found.
     */
    public function currentCourse()
    {
        // Get the user's current course for today's date
        $userCurrentCourse = $this->userCourseHistory->getLastCourseById(
            $this->authenticatedUserId
        );
        // Get the user's course history for today's date
        // $userCourseHistory = $this->userCourseHistory->getUserCurrentCourseById(
        //     $this->authenticatedUserId,
        //     $this->carbon->now()->toDateString()
        // );

        // Check if the user has a current course
        if ($userCurrentCourse === null) {
            // If the user doesn't have a current course, return "none"
            return "none";
        }

        // Retrieve and return the name of the current course
        return $this->course->getCourseNameById($userCourseHistory);
    }

    /**
     * Retrieve the level information for the authenticated user.
     *
     * This method fetches the level ID of the authenticated user and then
     * retrieves the corresponding level information using the Level model.
     *
     * @return mixed The level information of the authenticated user.
     */
    public function currentGang()
    {
        // dd($this->userDetails->getGangId($this->authenticatedUserId));
        return  $this->gang->getGangNameById($this->userDetails->getGangId($this->authenticatedUserId));
    }

    /**
     * Retrieve the active house information for the authenticated user.
     *
     * This method fetches the ID of the active house of the authenticated user
     * using the UserDetail model and then retrieves the corresponding house
     * information using the RealEstate model.
     *
     * @return mixed The active house information of the authenticated user.
     */
    public function activeHouse()
    {
        $houseId = $this->userDetails->getActiveEstate(
            $this->authenticatedUserId
        );
        return $this->realEstate->getHouseById($houseId);
    }


    public function contries()
    {

        // return $this->realEstate->getHouseById($houseId);
    }

    // public function activeHouse(){

    // }

    /**
     * Retrieve the area information for the authenticated user.
     *
     * This method fetches the ID of the area where the authenticated user is located
     * using the UserDetail model and then retrieves the corresponding area information
     * using the Area model.
     *
     * @return mixed The area information of the authenticated user.
     */
    public function currentLocation()
    {
        $userTravelHistoryId = $this->userTravelHistory
            ->getUserTravelHistoryByUserIdAndStatus(
                $this->authenticatedUserId
            );
        return $this->city->getCityRegionCountryById(
            $userTravelHistoryId[0]->city_id
        );
    }

    /**
     * Retrieve the area information for the authenticated user.
     *
     * This method fetches the ID of the area where the authenticated user is located
     * using the UserDetail model and then retrieves the corresponding area information
     * using the Area model.
     *
     * @return mixed The area information of the authenticated user.
     */
    public function headerStats()
    {
        return response()->json([
            "countries" => $this->currentLocation(),
            "barStats" => $this->userStats->getMultipleStats($this->authenticatedUserId),
            "money" => $this->money(),
            "points" => $this->points(),
            "awards" => $this->totalAwards(),
        ]);
    }

    /**
     * Retrieve the total awards earned by the authenticated user.
     *
     * This method calculates and returns the total awards earned by the authenticated user
     * by using the UserReward model to fetch the total rewards associated with the user ID.
     *
     * @return int The total awards earned by the authenticated user.
     */
    public function totalAwards()
    {
        return $this->userReward->getTotalRewards($this->authenticatedUserId);
    }

    /**
     * Retrieve the total number of crimes committed by the authenticated user.
     *
     * This method calculates and returns the total number of crimes committed by the authenticated user
     * by summing up the count of successful crimes and failed crimes using the UserCrime model.
     *
     * @return int The total number of crimes committed by the authenticated user.
     */
    public function totalCrimes()
    {
        return $this->userCrime->getSuccessCrimes($this->authenticatedUserId) +
            $this->userCrime->getFailCrimes($this->authenticatedUserId);
    }

    /**
     * Retrieve the total number of attacks performed by the authenticated user.
     *
     * This method retrieves and returns the total count of attacks performed by the authenticated user
     * using the Attack model.
     *
     * @return int The total number of attacks performed by the authenticated user.
     */
    public function totalAttacks()
    {
        return $this->attack->getAttacks($this->authenticatedUserId);
    }

    /**
     * Calculate the total number of attacks lost by the authenticated user as an attacker.
     *
     * This method calculates and returns the total number of attacks lost by the authenticated user
     * when acting as an attacker by subtracting the number of successful attacks, settlements, and escapes
     * from the total number of attacks performed.
     *
     * @return int The total number of attacks lost by the authenticated user as an attacker.
     */
    public function asAttackerLost()
    {
        $totalAttacks = $this->totalAttacks();
        $asAttackerWon = $this->asAttackerWon();
        $asAttackerSettlement = $this->asAttackerSettlement();
        $asAttackerEscaped = $this->asAttackerEscaped();
        return $totalAttacks -
            ($asAttackerWon + $asAttackerSettlement + $asAttackerEscaped);
    }

    /**
     * Calculate the total number of battles lost by the authenticated user.
     *
     * This method calculates and returns the total number of battles lost by the authenticated user
     * by summing up the number of battles lost as an attacker and as a defender.
     *
     * @return int The total number of battles lost by the authenticated user.
     */
    public function totalLost()
    {
        $asAttackerLost = $this->asAttackerLost();
        $asDefenderLost = $this->asDefenderLost();
        return $asAttackerLost + $asDefenderLost;
    }

    /**
     * Calculate the total number of battles won by the authenticated user.
     *
     * This method calculates and returns the total number of battles won by the authenticated user
     * by summing up the number of battles won as an attacker and as a defender.
     *
     * @return int The total number of battles won by the authenticated user.
     */
    public function totalWon()
    {
        $asAttackerWon = $this->asAttackerWon();
        $asDefenderWon = $this->asDefenderWon();
        return $asAttackerWon + $asDefenderWon;
    }

    /**
     * Get the count of battles won by the authenticated user as an attacker.
     *
     * This method retrieves and returns the count of battles won by the authenticated user
     * while acting as an attacker.
     *
     * @return int The count of battles won by the authenticated user as an attacker.
     */
    public function asAttackerWon()
    {
        return $this->attack->getAttackSuccess($this->authenticatedUserId);
    }

    /**
     * Get the number of settlements where the authenticated user acted as an attacker.
     *
     * This method retrieves and returns the count of settlements where the authenticated user
     * acted as an attacker using the attack service.
     *
     * @return int The number of settlements where the authenticated user acted as an attacker.
     */
    public function asAttackerSettlement()
    {
        return $this->attack->getSettlementAttacker($this->authenticatedUserId);
    }

    /**
     * Get the number of times the authenticated user escaped as an attacker.
     *
     * This method retrieves and returns the count of times the authenticated user escaped
     * as an attacker in attacks using the attack service.
     *
     * @return int The number of times the authenticated user escaped as an attacker.
     */
    public function asAttackerEscaped()
    {
        return $this->attack->getEscapedAttacker($this->authenticatedUserId);
    }

    /**
     * Get the number of times the authenticated user succeeded as a defender.
     *
     * This method retrieves and returns the count of times the authenticated user succeeded
     * as a defender in attacks using the attack service.
     *
     * @return int The number of times the authenticated user succeeded as a defender.
     */
    public function asDefenderWon()
    {
        return $this->attack->getDefenseSuccess($this->authenticatedUserId);
    }

    /**
     * Get the number of times the authenticated user lost as a defender.
     *
     * This method calculates and returns the count of times the authenticated user acted
     * as a defender and lost, considering various scenarios like being won, in settlement, or escaped.
     *
     * @return int The total number of times the authenticated user lost as a defender.
     */
    public function asDefenderLost()
    {
        $totalDefender = $this->totalDefender();
        $asDefenderWon = $this->asDefenderWon();
        $asDefenderSettlement = $this->asDefenderSettlement();
        $asDefenderEscaped = $this->asDefenderEscaped();
        return $totalDefender -
            ($asDefenderWon + $asDefenderSettlement + $asDefenderEscaped);
    }

    /**
     * Get the total number of times the authenticated user acted as a defender.
     *
     * This method retrieves and returns the total count of times the authenticated user
     * acted as a defender in attacks using the attack service.
     *
     * @return int The total number of times the authenticated user acted as a defender.
     */
    public function totalDefender()
    {
        return $this->attack->getDefenses($this->authenticatedUserId);
    }

    /**
     * Get the number of times the authenticated user escaped as a defender.
     *
     * This method retrieves and returns the count of times the authenticated user escaped
     * as a defender in attacks using the attack service.
     *
     * @return int The number of times the authenticated user escaped as a defender.
     */
    public function asDefenderEscaped()
    {
        return $this->attack->getEscapedDefender($this->authenticatedUserId);
    }

    /**
     * Get the total number of escapes for the authenticated user.
     *
     * This method calculates and returns the total number of escapes for the authenticated user
     * by summing up the escapes as a defender and as an attacker.
     *
     * @return int The total number of escapes for the authenticated user.
     */
    public function totalEscaped()
    {
        return $this->asDefenderEscaped() + $this->asAttackerEscaped();
    }

    /**
     * Get the number of settlements where the authenticated user acted as a defender.
     *
     * This method retrieves and returns the count of settlements where the authenticated user
     * acted as a defender using the attack service.
     *
     * @return int The number of settlements where the authenticated user acted as a defender.
     */
    public function asDefenderSettlement()
    {
        return $this->attack->getSettlementDefender($this->authenticatedUserId);
    }

    /**
     * Get the total number of settlements for the authenticated user.
     *
     * This method calculates and returns the total number of settlements for the authenticated user
     * by summing up the settlements where the user acted as a defender and as an attacker.
     *
     * @return int The total number of settlements for the authenticated user.
     */
    public function totalSettlement()
    {
        return $this->asDefenderSettlement() + $this->asAttackerSettlement();
    }

    /**
     * Get the strength stat of the authenticated user.
     *
     * This method calculates and returns the strength stat of the authenticated user
     * using the userStats service.
     *
     * @return float The strength stat of the authenticated user, rounded to 3 decimal places.
     */
    public function strength()
    {
        return round(
            $this->userStats->getStrength($this->authenticatedUserId),
            3
        );
    }

    /**
     * Get the agility stat of the authenticated user.
     *
     * This method calculates and returns the agility stat of the authenticated user
     * using the userStats service.
     *
     * @return float The agility stat of the authenticated user, rounded to 3 decimal places.
     */
    public function agility()
    {
        return round(
            $this->userStats->getAgility($this->authenticatedUserId),
            3
        );
    }

    /**
     * Get the endurance stat of the authenticated user.
     *
     * This method calculates and returns the endurance stat of the authenticated user
     * using the userStats service.
     *
     * @return float The endurance stat of the authenticated user, rounded to 3 decimal places.
     */
    public function endurance()
    {
        return round(
            $this->userStats->getEndurance($this->authenticatedUserId),
            3
        );
    }

    /**
     * Get the defense stat of the authenticated user.
     *
     * This method calculates and returns the defense stat of the authenticated user
     * using the userStats service.
     *
     * @return float The defense stat of the authenticated user, rounded to 3 decimal places.
     */
    public function defense()
    {
        return round(
            $this->userStats->getDefense($this->authenticatedUserId),
            3
        );
    }

    /**
     * Get the age of the authenticated user.
     *
     * This method calculates and returns the age of the authenticated user based on their
     * date of birth using Carbon for date/time handling.
     *
     * @return string The age of the authenticated user in hours, days, or months, depending on the difference.
     */
    public function age()
    {
        $start = $this->carbon->parse(
            $this->user->getAge($this->authenticatedUserId)
        );
        $end = $this->carbon->parse($this->carbon->now());

        // Calculate the difference in hours and days
        $diffInHours = $end->diffInHours($start);
        $diffInDays = $end->diffInDays($start);
        $diffInMonths = $end->diffInMonths($start);

        // Determine the appropriate format based on the difference
        if ($diffInHours < 24) {
            return $diffInHours . " hours";
        } elseif ($diffInDays < 30) {
            return $diffInDays . " days";
        } else {
            return $diffInMonths . " months";
        }
    }

    /**
     * Get the amount of money owned by the authenticated user.
     *
     * This method retrieves and returns the amount of money owned by the authenticated user.
     *
     * @return int The amount of money owned by the authenticated user.
     */
    public function money()
    {
        return $this->userDetails->getUserMoney($this->authenticatedUserId);
    }

    /**
     * Get the points accumulated by the authenticated user.
     *
     * This method retrieves and returns the points accumulated by the authenticated user.
     *
     * @return int The points accumulated by the authenticated user.
     */
    public function points()
    {
        return $this->userDetails->getUserPoints($this->authenticatedUserId);
    }

    /**
     * Retrieve battle statistics for the character.
     *
     * This method returns an associative array containing various battle statistics
     * such as strength, agility, defense, and endurance for the character.
     *
     * @return array An associative array containing battle stats.
     */
    public function getBattleStats()
    {
        return [
            "strength" => $this->strength(), // Get strength stat using the strength() method
            "agility" => $this->agility(), // Get agility stat using the agility() method
            "defense" => $this->defense(), // Get defense stat using the defense() method
            "endurance" => $this->endurance(), // Get endurance stat using the endurance() method
        ];
    }

    /**
     * Retrieve attack statistics for the battle.
     *
     * This method returns an associative array containing various attack statistics,
     * such as the number of times the character acted as an attacker and lost,
     * acted as a defender and lost, total losses, acted as an attacker and won,
     * acted as a defender and won, total wins, acted as an attacker in settlements,
     * acted as a defender in settlements, total settlements, acted as an attacker
     * and escaped, acted as a defender and escaped, and total escapes.
     *
     * @return array An associative array containing attack statistics.
     */
    public function getAttackStats()
    {
        return [
            "asAttackerLost" => $this->asAttackerLost(), // Get the count of times the character acted as an attacker and lost
            "asDefenderLost" => $this->asDefenderLost(), // Get the count of times the character acted as a defender and lost
            "totalLost" => $this->totalLost(), // Get the total count of losses
            "asAttackerWon" => $this->asAttackerWon(), // Get the count of times the character acted as an attacker and won
            "asDefenderWon" => $this->asDefenderWon(), // Get the count of times the character acted as a defender and won
            "totalWon" => $this->totalWon(), // Get the total count of wins
            "asAttackerSettlement" => $this->asAttackerSettlement(), // Get the count of times the character acted as an attacker in settlements
            "asDefenderSettlement" => $this->asDefenderSettlement(), // Get the count of times the character acted as a defender in settlements
            "totalSettlement" => $this->totalSettlement(), // Get the total count of settlements
            "asAttackerEscaped" => $this->asAttackerEscaped(), // Get the count of times the character acted as an attacker and escaped
            "asDefenderEscaped" => $this->asDefenderEscaped(), // Get the count of times the character acted as a defender and escaped
            "totalEscaped" => $this->totalEscaped(), // Get the total count of escapes
        ];
    }

    /**
     * Retrieve player information.
     *
     * This method returns an associative array containing various information about the player,
     * such as their name, rank, level, active house, area, total awards, total crimes, age,
     * money, and points.
     *
     * @return array An associative array containing player information.
     */
    public function getPlayerInfo()
    {
        return [
            "name" => $this->name(), // Get player's name using the name() method
            "rank" => $this->rank(), // Get player's rank using the rank() method
            "level" => $this->level(), // Get player's level using the level() method
            "activeHouse" => $this->activeHouse(), // Get player's active house using the activeHouse() method
            "location" => $this->currentLocation(), // Get player's area using the area() method
            "totalAwards" => $this->totalAwards(), // Get player's total awards using the totalAwards() method
            "totalCrimes" => $this->totalCrimes(), // Get player's total crimes using the totalCrimes() method
            "age" => $this->age(), // Get player's age using the age() method
            "money" => $this->money(), // Get player's money using the money() method
            "points" => $this->points(), // Get player's points using the points() method
            "gang" => $this->currentGang(), // 
            "course" => $this->currentCourse() // 
        ];
    }
}
