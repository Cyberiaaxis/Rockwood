<?php

namespace App\Models;

/**
 * Class Country
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string|null $avatar
 * @property string|null $description
 * @property int|null $coordinateX
 * @property int|null $coordinateY
 */
class Threshold extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "thresholds";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'criteria_id',
        'threshold_type',
        'threshold_value',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'threshold_value' => 'integer',

    ];

    /**
     * Retrieve all countries.
     *
     * @return null|array
     */
    public function getAllThresholds(): ?array
    {
        return $this->db->all();
    }

    /**
     * Retrieve three name by ID.
     *
     * @param  int  $idp
     * @return string|null
     */
    public function getThresholdsByCriteriaId(int $id)
    {
        return $this->db->find($id);
    }

    /**
     * Retrieves thresholds based on an array of criteria IDs.
     *
     * This method fetches records from the thresholds table and joins with the criteria table.
     * It checks if reward_id, award_id, and honor_id are not null, returning boolean values
     * indicating their presence.
     *
     * @param array $criteriaIds An array of criteria IDs to filter the results.
     * 
     * @return array An array of results containing threshold and criteria information.
     */
    public function getThresholdsByCriteriaIds(array $criteriaIds)
    {
        // Fetch records where the id is in the array of criteria IDs
        return $this->db->join('criteria as c', 'c.id', '=', 'thresholds.criteria_id')
            ->whereIn('c.id', $criteriaIds)
            ->select(
                'c.from_city_id as requiredCity',
                $this->db->raw('CASE WHEN c.reward_id IS NOT NULL THEN true ELSE false END as isReward'),
                $this->db->raw('CASE WHEN c.award_id IS NOT NULL THEN true ELSE false END as isAward'),
                $this->db->raw('CASE WHEN c.honor_id IS NOT NULL THEN true ELSE false END as isHonor'),
                'thresholds.id as threshold_id',
                'thresholds.threshold_type as thresholdType',
                'thresholds.threshold_value as thresholdValue'
            )
            ->get()
            ->toArray(); // Convert collection to array
    }

    /**
     * Add a new country.
     *
     * @param array $attributes
     * @return int|null The ID of the newly created threshold, or null on failure
     */
    public function addThreShold(array $attributes): ?int
    {
        return  $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing country.
     *
     * @param int $id The ID of the country to modify
     * @param array $data The updated data for the country
     * @return int The number of rows affected by the update
     */
    public function modifyThreshold(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
