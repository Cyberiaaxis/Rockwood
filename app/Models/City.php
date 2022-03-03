<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class City extends Model
{
    /**
     * get city name by id from storage.
     * @param  variable $id INT
     * @return string name
     */
    public function getCityById(int $id): string
    {
        return $this->find($id)->value('name');
    }
}
