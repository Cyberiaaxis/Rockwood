<?php

namespace App\Models;

use App\Forum;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{

    protected $table = 'threads';

// Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

}
