<?php

namespace App\Models;

/**
 * Represents the Location model.
 */
class Location extends GameBaseModel
{
    /**
     * The table associated with the Location model.
     *
     * @var string
     */
    protected $table = 'locations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'parent_id',
        'coordinateX',
        'coordinateY',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'parent_id' => 'integer',
        'coordinateX' => 'integer',
        'coordinateY' => 'integer',
    ];

    /**
     * Get the name of the location by its ID.
     *
     * @param int $locationId The ID of the location.
     * @return string|null The name of the location if found, otherwise null.
     */
    public function getLocationNameById(int $locationId): ?string
    {
        // Retrieve the name of the location by its ID
        return $this->db->where('id', $locationId)->value('name');
    }

    /**
     * Get locations by their type.
     *
     * @param string $type The type of the locations (country, region, or city).
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLocationsByType(string $type)
    {
        // Retrieve locations by their type
        return $this->db->where('type', $type)->get();
    }

    /**
     * Get locations by their parent ID.
     *
     * @param int $parentId The ID of the parent location.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLocationsByParentId(int $parentId)
    {
        // Retrieve locations by their parent ID
        return $this->db->where('parent_id', $parentId)->get();
    }

    /**
     * Get locations by their ID and type.
     *
     * @param int $locationId The ID of the location.
     * @param string $type The type of the location.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLocationsByIdAndType(int $locationId, string $type)
    {
        // Retrieve locations by their ID and type
        return $this->db->where('id', $locationId)
                        ->where('type', $type)
                        ->get();
    }

    /**
     * Add a new location with the specified attributes.
     *
     * @param array $locationData The attributes of the new location.
     * @return int The ID of the newly created location.
     */
    public function addLocation(array $locationData): array 
    {
        // Insert the location data into the database and get the ID of the newly inserted record
        return $this->db->insertGetId($locationData);
    }

    /**
     * Modify an existing location with the specified attributes.
     *
     * @param int $locationId The ID of the location to modify.
     * @param array $locationData The updated attributes of the location.
     * @return bool True if the location was successfully modified, false otherwise.
     */
    public function modifyLocation(int $locationId, array $locationData): bool
    {
        // Update the location with the provided data
        return $this->db->where('id', $locationId)->update($locationData);
    }
}
