<?php

namespace App\Models;
/**
 * Class Region
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string|null $avatar
 * @property string|null $description
 * @property int|null $coordinateX
 * @property int|null $coordinateY
 */
class Region extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "regions";
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'avatar', 
        'country_id',
        'description', 
        'coordinateX', 
        'coordinateY'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'coordinateX' => 'integer',
        'country_id' => 'integer',
        'coordinateY' => 'integer',
    ];
    
    /**
     * Retrieve all regions.
     *
     * @return null|array
     */
    public function getAllRegions(): ?array
    {
        return $this->db->all();
    }

    /**
     * Retrieve region name by ID.
     *
     * @param  int  $id
     * @return string|null
     */
    public function getRegionNameById(int $id): ?string
    {
        return $this->db->find($id)->name;
    }

    /**
     * Add a new region.
     *
     * @param array $attributes
     * @return int|null The ID of the newly created region, or null on failure
     */
    public function addRegion(array $attributes): ?int
    {
        return  $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing region.
     *
     * @param int $id The ID of the region to modify
     * @param array $data The updated data for the region
     * @return int The number of rows affected by the update
     */
    public function modifyRegion(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
