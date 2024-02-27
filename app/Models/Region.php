<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends GameBaseModel
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'region_id', 'avatar', 'description'
    ];
    /**
     * get a Area name instance. region_id
     * @param  $id INT
     * @return name string
     */
    public function getRegionNameById(int $id)
    {
        // return "getRegionNameById===". $id;
        return $this->db->where(['id' => $id])->get('name');   
    }
}
