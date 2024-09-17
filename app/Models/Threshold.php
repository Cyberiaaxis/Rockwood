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
     * @param  int  $id
     * @return string|null
     */
    public function getThresholdsByCriteriaId(int $id)
    {
        return $this->db->find($id);
    }

    public function getThresholdByCriteriaIds(array $criteriaIds)
    {
        // Fetch records where the id is in the array of criteria IDs
        return $this->db->whereIn('criteria_id', $criteriaIds)  // Filter records where the id is in the array of IDs
            ->get()  // Retrieve the records   
            ->toArray();  // Convert the result to an array
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
