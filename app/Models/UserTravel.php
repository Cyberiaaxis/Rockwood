<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class UserTravel extends Model
{
    /**
     * off the datetime via this property.
     */
    public $timestamps = false;

    /**
     * get weapon's attribute by id from storage.
     * @array
     */
    protected $fillable = [
        'user_id', 'location', 'travelled'
    ];

    /**
     * get weapon's attribute by id from storage.
     * @param  INT $id INT
     * @return boolean
     */
    public function addUserTravel(int $user, int $destination)
    {
        return $this->updateOrCreate(['user_id' => $user, 'location' => $destination])->increment('travelled', 1);
    }
}
