<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends GameBaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'description', 'status'
    ];

    public $timestamps = false;



    public function getCourseNameById(int $courseId)
    {
        return $this->find($courseId)->name;
    }

    // public function scopeSubCourses($query)
    // {
    //     return $query->whereNull('is_parent')->where('parent_id', $this->id);
    // }

    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}
