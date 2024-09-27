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
        'require_stage',
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
     * @example
     * $criteria = new Criteria();
     * $allCriteria = $criteria->getAllCriteria();
     * foreach ($allCriteria as $criterion) {
     *     echo $criterion->name;
     * }
     */
    public function getAllCriteria()
    {
        return $this->db->get()->toArray();
    }

    /**
     * Retrieve the name of a criteria by its ID.
     *
     * @param int $criteriaId The ID of the criteria.
     * @return string|null The name of the criteria, or null if not found.
     * @example
     * $criteria = new Criteria();
     * $criteriaName = $criteria->getCriteriaDetailsById(1);
     * echo $criteriaName; // Output: "Criteria 1"
     */
    public function getCriteriaById(int $criteriaId)
    {
        return $this->db->table('criteria')  // Specify the table name
            ->where('id', $criteriaId)  // Use 'where' to filter by the criteria ID
            ->get()  // Retrieve the records
            ->toArray();  // Convert the result to an array
    }

    public function getNextCriterionByIds(array $criteriaIds)
    {
        return $this->db // Specify the table name
            ->whereIn('id', $criteriaIds)  // Filter records where the id is in the array of IDs
            ->orderBy('next_criteria_id', 'asc')  // Order the results by the specified column and direction
            ->select('next_criteria_id')
            ->get()  // Retrieve the records
            ->toArray();  // Convert the result to an array
    }


    public function getCriteriaExculdedByProvidedIds(array $criteriaId)
    {
        return  $this->db->whereNotIn('id', $criteriaId)->get()->toArray();
    }

    /**
     * Add a new criteria.
     *
     * @param array $attributes The attributes to be used for the new criteria.
     * @return int|null The ID of the newly created criteria, or null on failure.
     * @example
     * $criteria = new Criteria();
     * $attributes = [
     *     'name' => 'New Criteria',
     *     'description' => 'This is a new criteria',
     * ];
     * $newCriteriaId = $criteria->addCriteria($attributes);
     * echo $newCriteriaId; // Output: 10
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
     * @example
     * $criteria = new Criteria();
     * $id = 1;
     * $data = [
     *     'name' => 'Updated Criteria',
     * ];
     * $affectedRows = $criteria->modifyCriteria($id, $data);
     * echo $affectedRows; // Output: 1
     */
    public function modifyCriteria(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
