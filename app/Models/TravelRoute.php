<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class TravelRoute extends Model
{
    public $timestamps = true;
    protected $fillable = [
        'from_country_id', 
        'from_city_id', 
        'from_area_id', 
        'to_country_id', 
        'to_city_id', 
        'to_area_id',
        'cost',
        'status',
        'duration' 
    ];

    /**
     * get travelling lists from storage.
     * @param
     * @return array()
     */
    public function getTravelList()
    {
        return $this->all();
    }

    public function routeCreate(array $data) 
    {
        $this->insert($data);
    }

    public function getUserCurrentRuote()
    {
        $this->insert($data);
    }
}
