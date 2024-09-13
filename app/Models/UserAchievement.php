<?php

namespace App\Models;

class UserAchievement extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_achievements';

    // Indicates if the model should be timestamped.
    public $timestamps = true; // Use default timestamps for created_at and updated_at

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'achievement_id',
        'achievement_date',
        'progress',
        'last_achieved_stage',
    ];

    /**
     * Retrieve all user achievements.
     *
     * @return array|null
     */
    public function getAllUserAchievements(): ?array
    {
        return $this->db->all()->toArray();
    }

    /**
     * Get achievements for a specific user.
     *
     * @param int $userId
     * @return array|null
     */
    public function getUserAchievementsByUserId(int $userId)
    {
        return $this->db->select('achievement_id', 'last_achieved_stage')->where('user_id', $userId)->whereNotNull("next_criteria_id")->orderBy('last_achieved_stage', 'DESC')->get()->toArray();
    }

    /**
     * Count achievements for a user for a specific achievement ID.
     *
     * @param int $userId
     * @param int $achievementId
     * @return int
     */
    public function getUserAchievementCountByUserIdAndAchievementId(int $userId, int $achievementId): int
    {
        return $this->db->where('user_id', $userId)
            ->where('achievement_id', $achievementId)
            ->count();
    }

    /**
     * Add a new user achievement record.
     *
     * @param array $attributes
     * @return int|null The ID of the newly created user achievement record, or null on failure
     */
    public function addUserAchievement(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing user achievement record.
     *
     * @param int $id
     * @param array $data
     * @return int The number of rows affected by the update
     */
    public function modifyUserAchievement(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }

    /**
     * Retrieve user achievement details with associated criteria.
     *
     * @param int $userId
     * @return array
     */
    public function getUserAchievementsWithDetails(int $userId): array
    {
        return $this->db->select(
            'criteria.name as achievement_name',
            'user_achievements.achievement_date',
            'user_achievements.progress',
            'user_achievements.last_achieved_stage'
        )
            ->join('criteria', 'user_achievements.achievement_id', '=', 'criteria.id')
            ->where('user_achievements.user_id', $userId)
            ->orderBy('user_achievements.achievement_date', 'desc')
            ->get()
            ->toArray();
    }
}
