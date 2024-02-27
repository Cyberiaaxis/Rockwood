<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class City extends GameBaseModel
{
    /**
     * get city name by id from storage.
     * @param  variable $id INT
     * @return string name
     */
    public function getCityById(int $id): string
    {
        return $this->db->where('id', $id)->pluck('name')->first();
    }

    /**
     * get country name by this method.
     * @param  INT  $id
     * @return string country name
     */
    public function getCityNameById(int $id)
    {
        return $this->db->where(['id' => $id])->get('name');
    }

}
