<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FightClubPlayer extends Model
{
    protected $primaryKey = [
        'user_id', 'fight_club_id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'fight_club_id'
    ];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public function entry(int $userId, int $fightClubId)
    {
        $data = [
            'user_id' => $userId,
            'fight_club__id' => $fightClubId
        ];
        dd($data);

        $this->updateOrCreate(
            ['user_id'   => $userId],
            ['fight_club__id' => $fightClubId]
        );
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public function users(int $fightClubId)
    {
        return $this->where('fight_club__id', $fightClubId)->get();
    }
}
