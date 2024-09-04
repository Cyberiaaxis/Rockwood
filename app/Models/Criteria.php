<?php

namespace App\Models;

/**
 * Class Criteria
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $event_type
 * @property int|null $award_id
 * @property int|null $reward_id
 * @property int|null $honor_id
 * @property string|null $threshold_type
 * @property float|null $threshold_value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Criteria extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "criteria";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'from_city_id',
        'event_type_id',
        'award_id',
        'reward_id',
        'honor_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Retrieve all criteria.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllCriteria()
    {
        return $this->db->all();
    }

    /**
     * Retrieve the name of a criteria by its ID.
     *
     * @param int $criteriaId The ID of the criteria.
     * @return string|null The name of the criteria, or null if not found.
     */
    public function getCriteriaNameById(int $criteriaId): ?string
    {
        return $this->db->find($criteriaId)->value('name');
    }

    /**
     * Add a new criteria.
     *
     * @param array $attributes The attributes to be used for the new criteria.
     * @return int|null The ID of the newly created criteria, or null on failure.
     */
    public function addCriteria(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing criteria.
     *
     * @param int $id The ID of the criteria to modify.
     * @param array $data The updated data for the criteria.
     * @return int The number of rows affected by the update.
     */
    public function modifyCriteria(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
