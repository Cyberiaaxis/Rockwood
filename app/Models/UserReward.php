<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class UserReward extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Awards
     */
    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    /**
     * Medals
     */
    public function medal()
    {
        return $this->belongsTo(Medal::class);
    }

    /**
     * get total number of rewards credit to player from storage.
     * @param  INT $userId
     * @return int
     */
    public function getTotalRewards(int $userId): int
    {
        return  $this->where('user_id', $userId)->count();
    }
}
