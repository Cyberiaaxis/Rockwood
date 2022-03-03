<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStats extends Model
{
    /**
     * off the datetime via this property.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'strength', 'defense', 'agility', 'endurance',  'hp', 'max_hp', 'energy', 'max_energy', 'max_nerve', 'will', 'max_will'
    ];

    /**
     * Create a new userstats instance.
     *
     * @param  $userId
     * @return \App\User
     */
    public function addUserStats($userId)
    {
        return $this->create([
            'user_id' => $userId,
            'strength' => 100,
            'defense' => 100,
            'agility' => 100,
            'endurance' => 100,
            'hp' => 100,
            'max_hp' => 100,
            'energy' => 10,
            'max_energy' => 10,
            'nerve' => 10,
            'max_nerve' => 10,
            'will' => 100,
            'max_will' => 100,
        ]);
    }

    /**
     * doing decrement of nerve of a user.
     * @param  int $userId, int $userNerve
     * @return query result in boolean
     */
    public function decrementNerve(int $userId, int $newNerve)
    {
        return $this->where('user_id', $userId)->update(['nerve' => $newNerve]);
    }

    /**
     * Decrement of bustExperince.
     * @param  int $userId, $bustExperience
     * @return query result in boolean
     */
    public function decrementBustExperince(int $userId, string $bustExperience)
    {
        return  $this->where(['user_id' => $userId])->decrement(['bust_experience', $bustExperience]);
    }


    /**
     * increment bust experince.
     * @param  int $userId, string $bustExperience
     * @return query result in boolean
     */
    public function incrementBustExperince(int $userId, string $bustExperience)
    {
        return  $this->where(['user_id' => $userId])->increment(['bust_experience', $bustExperience]);
    }

    /**
     * update max will.
     * @param  int $userId, string $will
     * @return update query output as boolean
     */
    public function changeWill(int $userId, string $will)
    {
        return $this->where('user_id', $userId)->update(['max_will' => $will]);
    }

    /**
     * get the user nerve .
     * @param  int  $userId
     * @return int nerve
     */
    public function haveNerve(int $userId): int
    {
        return $this->where('user_id', $userId)->value('nerve');
    }

    /**
     * get max nerve of user.
     * @param  int $userId
     * @return int max_nerve
     */
    public function maxNerve(int $userId): int
    {
        return $this->where('user_id', $userId)->value('max_nerve');
    }

    /**
     * get hp of user.
     * @param  int $userId
     * @return hp
     */
    public function getHp(int $userId): int
    {
        return $this->where('user_id', $userId)->value('hp');
    }

    /**
     * get hp of user.
     * @param  int $userId
     * @return max hp
     */
    public function getMaxHp(int $userId): int
    {
        return $this->where('user_id', $userId)->value('max_hp');
    }

    /**
     * get energy of user.
     * @param  int $userId
     * @return int energy
     */
    public function getEnergy($userId): int
    {
        return $this->where('user_id', $userId)->value('energy');
    }

    /**
     * get max energy of user.
     * @param  int $userId
     * @return max hp
     */
    public function getMaxEnergy(int $userId): int
    {
        return $this->where('user_id', $userId)->value('max_energy');
    }

    /**
     * get defence of user.
     * @param  int $userId
     * @return string defence
     */
    public function getDefense(int $userId): string
    {
        return $this->where('user_id', $userId)->value('defense');
    }

    /**
     * get agility of user.
     * @param  int $userId
     * @return string agility
     */
    public function getAgility(int $userId): string
    {
        return $this->where('user_id', $userId)->value('agility');
    }

    /**
     * get strength of user.
     * @param  int $userId
     * @return string strength
     */
    public function getStrength(int $userId): string
    {
        return $this->where('user_id', $userId)->value('strength');
    }

    /**
     * decrement hp of user.
     * @param  int $userId, new hp
     * @return boolean
     */
    public function decrementHP(int $userId, $newHP)
    {
        return $this->where('user_id', $userId)->decrement('hp', $newHP);;
    }

    /**
     * decrement enegry of user.
     * @param  int $userId, new hp
     * @return boolean
     */
    public function decrementEnergy(int $userId, $newEnergy)
    {
        return $this->where('user_id', $userId)->decrement('energy', $newEnergy);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function userStats(int $userId)
    {
        return $this->where('user_id', $userId)->first();
    }

    /**
     * get endurance of user.
     * @param  int $userId
     * @return boolean
     */
    public function getEndurance(int $userId)
    {
        return $this->where('user_id', $userId)->value('endurance');
    }

    /**
     * get endurance of user.
     * @param  int $userId
     * @return boolean
     */
    public function getWill(int $userId) : int
    {
        return $this->where('user_id', $userId)->value('will');
    }

    /**
     * get endurance of user.
     * @param  int $userId
     * @return boolean
     */
    public function incermentStats(int $userId, $field, $totalgain, $newenergy, $will)
    {
        return $this->where(['user_id' => $userId])->increment($field, $totalgain, ['energy' => $newenergy, 'will' => $will]);
    }

}
