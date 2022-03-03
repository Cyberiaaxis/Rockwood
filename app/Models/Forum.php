<?php

namespace App\Models;


use App\Model\Thread;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{

    protected $table = 'forums';
    protected $appends = ['poster'];



    public function threads()
    {
        return $this->hasMany(Thread::class);
    }


    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function users()
    {
        return $this->belongsTo("User");
    }

    public function latestPost()
    {
         return $this->hasOne('App\Models\Post')->latest();
    }

}
