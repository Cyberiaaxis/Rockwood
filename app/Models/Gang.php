<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gang extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'description', 'status'
    ];
}
