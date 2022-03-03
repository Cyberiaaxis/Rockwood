<?php
namespace App\Models;

use App\Forum;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $table = 'posts';

    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
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
