<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Support\Facades\DB;
use Illuminate\Database\DatabaseManager;

class Country extends GameBaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'avatar', 'description'
    ];

    // /**
    //  * get country name by this method.
    //  * @param  INT  $id
    //  * @return string country name
    //  */
    // public function getCountryById(int $id): string
    // {
    //     return $this->find($id)->value('name');
    // }

    /**
     * get country name by this method.
     * @param  INT  $id
     * @return string country name
     */
    public function getAllCountries()
    {
        return $this->db->where(['name'=> "Demo Country 2"])->get('id');
    }

    /**
     * get country name by this method.
     * @param  INT  $id
     * @return string country name
     */
    public function getCountryNameById(int $id) 
    {
        return $this->db->where(['id' => $id])->get('name');        
    }

}
