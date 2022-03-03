<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRealEstate extends Model
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
        'user_id', 'real_estate_id', 'total'
    ];

    /**
     * add player property in storage.
     * @param  INT $userId int $realEstateId
     * @return boolean
     */
    public function addUserRealEstate(int $user, int $realEstateId)
    {
        return $this->updateOrCreate(['user_id' => $user, 'real_estate_id' => $realEstateId])->increment('total', 1);
    }

    /**
     * verify players properties from storage.
     * @param  INT $userId int $realEstateId
     * @return boolean
     */
    public function isUserRealEstate(int $user, int $realEstateId)
    {
        return $this->where(['user_id' => $user, 'real_estate_id' => $realEstateId])->exists();
    }

}
