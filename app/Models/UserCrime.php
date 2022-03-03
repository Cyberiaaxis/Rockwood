<?php

namespace  App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCrime extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'crime_id', 'success', 'fail'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $timestamps = false;

    /**
     * add or update player's crime count in storage.
     * @param  INT $userId
     * @return int
     */
    public function addCrimeRecords(int $userId)
    {
        return $this->create(
            [
                'user_id' => $userId,
                'crime_id' => 0,
                'fail' => 0,
                'sucess' => 0,
            ]
        );
    }

    /**
     * add or update player's crime count in storage.
     * @param  INT $userId
     * @return int
     */
    public function addCrime(int $user, int $statusKey){
        return $this->updateOrCreate($user)->increment($statusKey);
    }

    /**
     * get player's success crimes sum from storage.
     * @param  INT $userId
     * @return int
     */
    public function getSuccessCrimes(int $userId): int
    {
        return $this->where('user_id', $userId)->sum('success');
    }

    /**
     * get player's failed crimes sum from storage.
     * @param  INT $userId
     * @return int
     */
    public function getFailCrimes(int $userId): int
    {
        return $this->where('user_id', $userId)->sum('fail');
    }
}
