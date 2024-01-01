<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FightClub extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'clubName', 'icon', 'bgimage', 'area_id'
    ];
    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function userFightClub()
    {
        return $this->belongsToMany(User::class, 'fight_club_players', 'user_id', 'fight_club__id');
    }
    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_stats');
    }

    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    // public function getFightClubNameById(int $fightClubId): string
    // {
    //     return $this->where('id', $fightClubId)->get(['clubName']);
    // }
    public function getFightClubNameById()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    // public function getFightClubNameById(int $fightClubId): string
    // {
    //     return $this->where('id', $fightClubId)->get(['clubName']);
    // }
    public function userStats()
    {
        return $this->belongsTo(UserStats::class);
    }
}
