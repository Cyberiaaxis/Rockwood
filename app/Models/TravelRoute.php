<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class TravelRoute extends Model
{
    /**
     * get travelling lists from storage.
     * @param
     * @return array()
     */
    public function getTravelList()
    {
        return $this->all();
    }

    // /**
    //  * Create a new userDetails instance after a valid registration.
    //  *
    //  * @param  array  $userIda
    //  * @return \App\User
    //  */
    // public function getTravelRoute($origin, $destination)
    // {
    //     try {
    //         return $this->where(['origin' => $origin, 'destination'=> $destination])->get('id');
    //     } catch (Throwable $e) {
    //         $e->getMessage();
    //         report($e);
    //     }
    // }

}
