<?php

namespace App\Models;


class UserCourseHistory extends GameBaseModel
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'user_course_history';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'course_id', 'completion_date', 'grade'
    ];

    /**
     * get country name by this method.
     * @param  INT  $id
     * @return string country name
     */
    public function getUserCourseById(int $userId, string $todayDate )
    {
        return $this->db->where('user_id', $userId)
                    ->where('completion_date',  '>', $todayDate)
                    ->value('course_id');
    }
}
