<?php

namespace App\Models;

use App\City;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class UserDetail extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'jail', 'money',  'hospital',  'points', 'rates', 'rank_id', 'level_id', 'location_id', 'gang_id',  'active_course', 'course_started', 'job'
    ];


    public function getRouteKeyName()
    {
        return 'user_id';
    }


    public function location()
    {
        return $this->belongsTo(City::class, 'location_id');
    }

    /**
     * get Location Name
     */
    public function getCurrentLocationAttribute()
    {
        return $this->location()->value('name');
    }

    public function rank()
    {

        return $this->belongsTo(Rank::class);
    }

    public function level()
    {

        return $this->belongsTo(Level::class);
    }

    public function gang()
    {
        return $this->belongsTo(Gang::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'active_course');
    }


    /**
     * adding new datails a player from storage.
     * @param  INT $userId
     * @return boolean
     */
    public function addUserDetails(int $userId)
    {
        return $this->create([
            'user_id' => $userId,
            'money' => 100,
            'points' => 10,
            'rank_id' => 1,
            'level_id' => 1,
            'realestate' => 1,
            'location_id'  => 1,
        ]);
    }

    /**
     * get player's money from storage.
     * @param  INT $userId
     * @return int
     */
    public function getUserMoney(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('money');
    }

    /**
     * get player's point from storage.
     * @param  INT $userId
     * @return int
     */
    public function getUserPoints(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('points');
    }

    /**
     * decrement the player's money from storage.
     * @param  INT $userId int $money
     * @return boolean
     */
    public function decrementMoney(int $userId, int $money)
    {
        return  $this->where(['user_id' => $userId])->decrement('money', $money);
    }

    /**
     * update player's current tavel status from storage.
     * @param  int $userId, int $location, string $startedAt = NULL
     * @return boolean
     */
    public function changeTravelStatus(int $userId, int $location, string $startedAt = NULL)
    {
        return  $this->where(['user_id' => $userId])->update(['location_id' => $location, 'travel_started' => $startedAt]);
    }

    /**
     * get player's current location status from storage.
     * @param  int $userId
     * @return int
     */
    public function getLocation(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('location_id');
    }

    /**
     * get player's current level id from storage.
     * @param  int $userId
     * @return int
     */
    public function getLevelId(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('level_id');
    }

    /**
     * get player's current tavel started time from storage.
     * @param  int $userId
     * @return string
     */
    public function getReaminTravelTime(int $userId)
    {
        return  $this->where(['user_id' => $userId])->value('travel_started');
    }

    /**
     * get player's current real estate from storage.
     * @param  int $userId
     * @return int
     */
    public function getActiveEstate(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('realestate');
    }

    /**
     * set player's current real estate from storage.
     * @param  int $userId
     * @return int
     */
    public function setActiveEstate(int $userId, int $realEstateId)
    {
        return  $this->where(['user_id' => $userId])->update(['realestate' => $realEstateId]);
    }

    /**
     * get player's jail time from storage.
     * @param  int $userId
     * @return string
     */
    public function getJailTime(int $bustingId)
    {
        return $this->where(['user_id' => $bustingId])->value('jail');
    }

    /**
     * get player's current hospital time from storage.
     * @param  int $userId
     * @return int
     */
    public function getHospitalTime(int $userId)
    {
        return $this->where(['user_id' => $userId])->value('hospital');
    }

    /**
     * set player's current hospital time from storage.
     * @param  int $userId
     * @return int
     */
    public function addHospitalTime(int $userId, $newHospitalTime)
    {
        return $this->where(['user_id' => $userId])->update(['hospital' => $newHospitalTime]);
    }

    /**
     * set player's busted times from storage.
     * @param  int $userId
     * @return int
     */
    public function busted(int $busterId)
    {
        return  $this->where(['user_id' => $busterId])->update(['jail' => Null]);
    }

    /**
     * update player's failed as buster from storage.
     * @param  int $userId, string $datetime
     * @return boolean
     */
    public function failbuster(int $bustedId, string $datetime)
    {
        return $this->where(['user_id' => $bustedId])->update(['jail', $datetime]);
    }

    /**
     * get rank id from storage.
     * @param  int $userId
     * @return int
     */
    public function getRankId(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('rank_id');
    }
}
