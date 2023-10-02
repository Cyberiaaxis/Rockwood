<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    protected $fillable = ['title', 'description', 'is_cat', 'parent_id'];

    public function subForums()
    {
        return $this->hasMany(Forum::class, 'parent_id')
            ->with('latestPost')
            ->withCount(['threads', 'posts']);
    }

    public function threads()
    {
        return $this->hasMany(Thread::class)->with('latestPost');
    }


    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function latestPost()
    {
        return $this->hasOne(Post::class)->latest();
    }
}
