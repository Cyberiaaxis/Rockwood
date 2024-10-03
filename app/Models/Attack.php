<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class Attack extends Model
{

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'attacks',
        'attacks_success',
        'defenses',
        'defenses_success',
        'settlement_attacker',
        'settlement_defender',
        'escaped_attacker',
        'escaped_defender',
    ];

    /**
     * add or update player's crime count in storage.
     * @param  INT $userId
     * @return int
     */
    public function addAttackRecords(array $attackRecord)
    {
        return $this->create($attackRecord);
    }

    /**
     * get attacks (attackers total attack number) from storage.
     * @param  $userId INT
     * @return attacks INT
     */
    public function getAttacks(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('attacks');
    }

    /**
     * get attackwon from storage.
     * @param  $userId INT
     * @return attacks_success INT
     */
    public function getAttackSuccess(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('attacks_success');
    }

    /**
     * got number of fight as a defender from storage.
     * @param  $userId INT
     * @return defenses INT
     */
    public function getDefenses(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('defenses');
    }

    /**
     * got number of fight as a defender won from storage.
     * @param  $userId INT
     * @return defenses_success INT
     */
    public function getDefenseSuccess(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('defenses_success');
    }

    /**
     * got number of fight as a attacker settlement from storage.
     * @param  $userId INT
     * @return settlement_attacker INT
     */
    public function getSettlementAttacker(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('settlement_attacker');
    }

    /**
     * got number of fight as a defender settlement from storage.
     * @param  $userId INT
     * @return settlement_defender INT
     */
    public function getSettlementDefender(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('settlement_defender');
    }

    /**
     * got number of fight as a attacker escaped from storage.
     * @param  $userId INT
     * @return escaped_attacker INT
     */
    public function getEscapedAttacker(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('escaped_attacker');
    }

    /**
     * got number of fight as a defender escaped from storage.
     * @param  $userId INT
     * @return escaped_defender INT
     */
    public function getEscapedDefender(int $userId): int
    {
        return  $this->where(['user_id' => $userId])->value('escaped_defender');
    }
}
