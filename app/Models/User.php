<?php

namespace App\Models;

use Hash;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasRoles, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'gender', 'type'
    ];

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

    /**
    * get total posts
    */
    public function getTotalPostsAttribute()
    {
         return $this->posts()->count();
    }

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
         return $this->course()->where('course_id',$course_id)->exists();
    }

    /**
     * regiration of new player's in storage.
     * @param  int $course_id
     * @return boolean
     */
    public function addUser($request)
    {
        return $this->create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);
    }

    /**
     * get player's name by id from storage.
     * @param  int $userId
     * @return string
     */
    public function getUserNameById(int $userId) :string
    {
        return $this->where('id', $userId)->value('name');
    }

    /**
     * get player's total age from storage.
     * @param  int $userId
     * @return string
     */
    public function getAge(int $userId) : string
    {
        return  $this->where(['id' => $userId])->value('created_at');
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

}

