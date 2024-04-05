<?php

namespace App\Models;

/**
 * Represents the Transportation Type model.
 */
class TransportationType extends GameBaseModel
{
    /**
     * The table associated with the TransportationType.
     *
     * @var string
     */
    protected $table = 'transportation_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    /**
     * Find a transportation type by its ID.
     *
     * Retrieves the transportation type record associated with the provided ID.
     *
     * @param int $id The ID of the transportation type record.
     * @return array|null The transportation type record if found, otherwise null.
     */
    public function findTransportationTypeById(int $id): ?array
    {
        return $this->db->where('id', $id)->get()->toArray();
    }

    /**
     * Find a transportation type by its name.
     *
     * Retrieves the transportation type record associated with the provided name.
     *
     * @param string $name The name of the transportation type.
     * @return array|null The transportation type record if found, otherwise null.
     */
    public function findTransportationTypeByName(string $name): ?array
    {
        return $this->db->where('name', $name)->get()->toArray();
    }

    /**
     * Add a new transportation type record.
     *
     * Inserts a new transportation type record into the database.
     *
     * @param array  $attributes The data to be inserted.
     * @return int The ID of the last inserted transportation type record.
     */
    public function addTransportationType(array $attributes): int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Update a transportation type record.
     *
     * Updates the transportation type record with the provided ID.
     *
     * @param int $transportationTypeId The ID of the transportation type record to be updated.
     * @param array $attributes The attributes to be updated.
     * @return bool True if the update was successful, false otherwise.
     */
    public function updateTransportationType(int $transportationTypeId, array $attributes): bool
    {
        return $this->db->where('id', $transportationTypeId)->update($attributes);
    }
}
