<?php

namespace App\Models;

/**
 * Represents the Course model.
 * 
 * @extends GameBaseModel
 */
class Course extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'courses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name', 
        'avatar', 
        'description', 
        'status'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Retrieves the name of the course by its ID.
     *
     * @param  int  $courseId The ID of the course.
     * @return string|null The name of the course if found, otherwise null.
     */
    public function getCourseNameById(int $courseId): ?string
    {
        // Assumes there's a method in the parent or this class for retrieving a single record by ID.
         return $this->db->where('id', $courseId)->value('name');
    }

    /**
     * Adds a new course with the specified attributes.
     *
     * @param  array $attributes The attributes of the new course.
     * @return int The ID of the newly created course. 
     */
    public function addNewCourse(array $attributes): int
    {
        // Direct database manipulation should be replaced with Eloquent methods if using Laravel
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modifies an existing course with the specified attributes.
     *
     * @param  int   $courseId   The ID of the course to modify.
     * @param  array $attributes The updated attributes of the course.
     * @return bool True if the course was successfully modified, false otherwise.
     */
    public function modifyCourse(int $courseId, array $attributes): bool
    {
        $affected = $this->db->where([id,$courseId ])
                        ->update($attributes);
        return $affected > 0;
    }
}
