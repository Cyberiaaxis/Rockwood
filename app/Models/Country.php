<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'avatar', 'description'
    ];

    /**
     * get country name by this method.
     * @param  INT  $id
     * @return string country name
     */
    public function getCountryById(int $id): string
    {
        return $this->find($id)->value('name');
    }
}
