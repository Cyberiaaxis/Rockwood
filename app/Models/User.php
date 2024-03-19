<?php

namespace App\Models;

use Hash;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash as FacadesHash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\UserStats;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasRoles, HasApiTokens, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

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
        'name', 'email', 'password', 'gender', 'type', 'avatar'
    ];

    protected $guard_name = 'web';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'last_seen'];


    // /**  
    //  *Forum Posts
    //  */
    // public function getuserPosts()
    // {
    //     $post = new Post();
    //     return $post->all();
    // }

    // /**
    //  * get total posts
    //  */
    // public function getTotalPostsAttribute()
    // {
    //     // return $this->posts()->count();
    // }

    public function course()
    {
        return $this->belongsToMany(Course::class, 'user_courses');
    }

    /**
     * get player's current course status.
     * @param  int $course_id
     * @return boolean
     */
    public function doneCourse(int $course_id)
    {
        return $this->course()->where('course_id', $course_id)->exists();
    }

    /**
     * regiration of new player's in storage.
     * @param  int $course_id
     * @return boolean
     */
    public function addUser(array $data): int
    {
        return $this->insertGetId($data);
    }

        /**
     * regiration of new player's in storage.
     * @param  int $course_id
     * @return boolean
     */
    public function getUsers(): array
    {
        return $this->all()->toArray();
    }

    /**
     * get player's name by id from storage.
     * @param  int $userId
     * @return string
     */
    public function getUserNameById(int $userId): string
    {
        return $this->where('id', $userId)->value('name');
    }

    /**
     * get player's total age from storage.
     * @param  int $userId
     * @return string
     */
    public function getAge(int $userId): string
    {
        return  $this->where(['id' => $userId])->value('created_at');
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function realEstateStore(array $data)
    {
        return $this->updateOrCreate([
            'id' => $data['id'],
        ], $data);
    }

    /**
     * get user from storage.
     * @param  string username and password
     * @return int UserId
     */
    public function getUserId(string $username, string $password): int
    {
        return  $this->where(['username' => $username, 'password' => $password])->value('id');
    }

    /**
     * get user from storage.
     * @param  string username and password
     * @return int UserId
     */
    public function getTopPlayers()
    {
        return  $this->take(5)->orderBy('name')->pluck('name');
    }

    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function getUserRoles()
    {
        return $this->getRoleNames();
    }


    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function getUserStatsForumRankId()
    {
        $userStat = new UserStats();
        return $userStat->where(['user_id' => $this->id])->value('forum_rank_id');
    }


    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function getUserForumRankName()
    {
        $forumRanks =  new ForumRank();
        return $forumRanks->where('id', $this->getUserStatsForumRankId())->value('rankName');
    }

    /**
     * get user from storage.
     * @param
     * @return a collection
     */
    public function getSaccessAttribute()
    {
    }

    public function getUserIdsByFightClubId(int $fightClubId)
    {
        $userStats =  new UserStats();
        return $userStats->where('fight_club_id', $fightClubId)->get(['user_id']);
    }

    public function userStats()
    {
        return $this->hasOne(UserStats::class);
    }

    public function honors()
    {
        return $this->belongsToMany(Honor::class, 'user_honors');
    }

    public function rewards()
    {
        return $this->belongsToMany(Reward::class, 'user_rewards');
    }
}
