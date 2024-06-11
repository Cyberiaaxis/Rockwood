<?php

namespace App\Models;

/**
 * Represents the Route Transportation model.
 */
class RouteTransportation extends GameBaseModel
{
    /**
     * The table associated with the RouteTransportation.
     *
     * @var string
     */
    protected $table = 'route_transportations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'route_id',
        'transportation_type_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'route_id' => 'integer',
        'transportation_type_id' => 'integer',
    ];

    /**
     * Find a route transportation by its ID.
     *
     * Retrieves the route transportation record associated with the provided ID.
     *
     * @param int $id The ID of the route transportation record.
     * @return array|null The route transportation record if found, otherwise null.
     */
    public function getRouteTransportationByRouteId(int $routeId)
    {
        return $this->pdoWhere('route_id', $routeId)->pdoGet();
    }


    /**
     * Add a new route transportation record.
     *
     * Inserts a new route transportation record into the database.
     *
     * @param array $data The data to be inserted.
     * @return int The ID of the last inserted route transportation record.
     */
    public function addRouteTransportation(array $data): int
    {
        return $this->db->insertGetId($data);
    }

    /**
     * Update a route transportation record.
     *
     * Updates the route transportation record with the provided ID.
     *
     * @param int $routeTransportationId The ID of the route transportation record to be updated.
     * @param array $attributes The attributes to be updated.
     * @return bool True if the update was successful, false otherwise.
     */
    public function updateRouteTransportation(int $routeTransportationId, array $attributes): bool
    {
        return $this->db->where('id', $routeTransportationId)->update($attributes);
    }
}
