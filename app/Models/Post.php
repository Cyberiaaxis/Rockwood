<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'posts';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "title", "user_id", "forum_id", "thread_id", "content", "like", "dislike"
    ];

    /**
     * Get all posts from the database.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllPosts()
    {
        return $this->all();
    }

    /**
     * Get information about the user who posted a specific post.
     *
     * @param  int  $userId
     * @return \App\User|null
     */
    public function getPosterInfo(int $userId)
    {
        $user = new User();
        return $user->select(['id', 'name', 'avatar'])->find($userId);
    }

    /**
     * Get the posts associated with a specific user.
     *
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserPosts(int $userId)
    {
        return $this->where('user_id', $userId)->get();
    }

    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name', 'avatar']);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    /**
     * get User Name
     */
    public function getPosterAttribute()
    {
        return $this->user()->value('name');
    }
}
