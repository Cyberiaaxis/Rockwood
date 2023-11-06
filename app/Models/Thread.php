<?php

namespace App\Models;

use App\Forum;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{

    protected $table = 'threads';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'forum_id', 'user_id'
    ];

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

    public function latestPost()
    {
        return $this->hasOne(Post::class)
            ->select(['id', 'thread_id', 'user_id', 'created_at'])
            ->with('user')
            ->latest();
    }
}
