<?php

namespace App\Models;

class Gang extends GameBaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'description', 'status'
    ];

    /**
     * get total posts
     */
    public function getGangNames()
    {
        return  $this->take(10)->orderBy('name')->pluck('name');
    }
}
