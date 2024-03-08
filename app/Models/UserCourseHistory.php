<?php

namespace App\Models;

/**
 * Represents the User Course History model.
 */
class UserCourseHistory extends GameBaseModel
{
    /**
     * The table associated with the UserCourseHistory.
     *
     * @var string
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
     * Get the ID of the current course for the given user ID and today's date.
     *
     * This method retrieves the ID of the current course associated with the provided user ID
     * for a course that is scheduled to be completed after today's date.
     *
     * @param int    $userId     The ID of the user.
     * @param string $todayDate  The current date (YYYY-MM-DD format).
     *
     * @return int|null The ID of the current course if found, otherwise null.
     */
    public function getUserCurrentCourseById(int $userId, string $todayDate): ?int
    {
        // Retrieve the course ID based on user ID and today's date
        return $this->db->where('user_id', $userId)
                        ->where('completion_date', '>', $todayDate)
                        ->value('course_id');
    }

    /**
     * Get the ID of the completed course for the given user ID.
     *
     * This method retrieves the ID of the completed course associated with the provided user ID.
     *
     * @param int    $userId     The ID of the user.
     * @param string $todayDate  The current date (YYYY-MM-DD format).
     *
     * @return int|null The ID of the completed course if found, otherwise null.
     */
    public function getUserCompletedCoursesById(int $userId, string $todayDate): ?int
    {
        // Retrieve the course ID based on user ID and completion date
        // Note: Adjust the completion date condition as needed
        return $this->db->where('user_id', $userId)
                        ->where('completion_date', '<', $todayDate) // Assuming $todayDate is defined elsewhere
                        ->value('course_id');
    }

    /**
     * Get the total number of courses for the given user ID.
     *
     * This method retrieves the total number of courses associated with the provided user ID.
     *
     * @param int $userId The ID of the user.
     *
     * @return int The total number of courses for the user.
     */
    public function getUserTotalCoursesById(int $userId): int
    {
        // Retrieve the total number of courses based on user ID
        return $this->db->where('user_id', $userId)->count();
    }

    /**
     * Add a new user course.
     *
     * This method inserts a new user course record into the database and returns the ID of the last inserted record.
     *
     * @param int    $userId         The ID of the user.
     * @param int    $courseId       The ID of the course.
     * @param string $completionDate The completion date of the course (YYYY-MM-DD format).
     * @param string $grade          The grade of the user for the course.
     *
     * @return int The ID of the last inserted user course record.
     */
    public function addUserCourse(int $userId, int $courseId, string $completionDate, string $grade): int
    {
        return $this->db->insertGetId([
            'user_id' => $userId,
            'course_id' => $courseId,
            'completion_date' => $completionDate,
            'grade' => $grade,
        ]);
    }

    /**
     * Update the completion date of a user's course.
     *
     * This method updates the completion date of a user's course in the user course history.
     *
     * @param int    $userId             The ID of the user.
     * @param int    $courseId           The ID of the course.
     * @param string $newCompletionDate  The new completion date of the course (YYYY-MM-DD format).
     *
     * @return bool True if the update was successful, false otherwise.
     */
    public function updateUserCourseCompletionDate(int $userId, int $courseId, string $newCompletionDate): bool
    {
        return $this->db->where('user_id', $userId)
                    ->where('course_id', $courseId)
                    ->update(['completion_date' => $newCompletionDate]);
    }

    /**
     * Get the courses completed by the given user ID.
     *
     * This method retrieves the courses completed by the provided user ID.
     *
     * @param int $userId The ID of the user.
     *
     * @return array An array of completed courses for the user.
     */
    public function getUserCoursesById(int $userId): array
    {
        // Retrieve the courses completed by the user based on user ID
        $userCourses = $this->db->where('user_id', $userId)
                                ->get()
                                ->toArray();
        
        return $userCourses;
    }

    /**
     * Get the ID and completion date of the last completed course for the given user ID.
     *
     * This method retrieves the ID and completion date of the last completed course associated with the provided user ID.
     *
     * @param int $userId The ID of the user.
     *
     * @return array|null An associative array containing 'course_id' and 'completion_date' keys representing the last completed course if found, otherwise null.
     */
    public function getLastCourseById(int $userId): ?array
    {
        // Retrieve the ID and completion date of the last completed course based on user ID
        return $this->db->where('user_id', $userId)
                            ->orderByDesc('completion_date')
                            ->select('course_id', 'completion_date')
                            ->first();
    }

}
