<?php

namespace App\Models;

/**
 * Represents the TravelRoute model.
 */
class TravelRoute extends GameBaseModel
{
    /**
     * The table associated with the TravelRoute model.
     *
     * @var string
     */
    protected $table = 'travel_routes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'from_location_id',
        'to_location_id',
        'duration',
        'cost',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
    ];

    /**
     * Retrieve travel routes by status.
     *
     * @param bool $status The status of the travel routes to retrieve.
     * @return array An array of travel routes.
     */
    public function getTravelRoutesByStatus(bool $status): array
    {
        return $this->db->where('status', $status)->get()->toArray();
    }

    /**
     * Get all travel routes starting from the current location.
     *
     * @param int $currentLocationId The ID of the current location.
     * @return array An array of travel routes.
     */
    public function getTravelRoutesFromCurrentLocation(int $currentLocationId): array
    {
        return $this->db->where('from_location_id', $currentLocationId)->get()->toArray();
    }

    /**
     * Retrieve a travel route by its ID.
     *
     * @param int $id The ID of the travel route.
     * @return TravelRoute|null The travel route if found, or null otherwise.
     */
    public function getTravelRoute(int $id): ?string
    {
        return $this->db->find($id);
    }

    /**
     * Get travel routes between specific locations.
     *
     * @param int $originId The ID of the origin location.
     * @param int $destinationId The ID of the destination location.
     * @return array An array of travel routes.
     */
    public function getTravelRoutesBetweenLocations(int $originId, int $destinationId): array
    {
        return $this->db->where('from_location_id', $originId)
            ->where('to_location_id', $destinationId)
            ->get()->toArray();
    }

    /**
     * Add a new travel route with the specified attributes.
     *
     * @param array $attributes The attributes of the new travel route.
     * @return int The ID of the newly created travel route.
     */
    public function addTravelRoute(array $attributes): int 
    {
        // Insert the travel route data into the database and get the ID of the newly inserted record
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing travel route with the specified attributes.
     *
     * @param int $id The ID of the travel route to modify.
     * @param array $attributes The updated attributes of the travel route.
     * @return bool True if the travel route was successfully modified, false otherwise.
     */
    public function modifyTravelRoute(int $id, array $attributes): bool
    {
        // Update the travel route with the provided data
        return $this->db->where('id', $id)->update($attributes);
    }
}
