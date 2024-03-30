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
        'from_city_id',
        'to_city_id',
        'duration',
        'cost',
        'status',
        'coordinateX',
        'coordinateY'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
    ];



    public function getTravelRoutesByStatusAndCityId(bool $status, int  $cityId): array
    {
        return $this->db->where('status', $status)->where('from_city_id', $cityId)->get()->toArray();
    }

    /**
     * Get all travel routes starting from the current location.
     *
     * @param int $currentLocationId The ID of the current location.
     * @return array An array of travel routes.
     */
    // public function getTravelRoutesFromCurrentLocation(int $currentLocationId): array
    // {
    //     return $this->db->where('from_city_id', $currentLocationId)->get()->toArray();
    // }

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
        return $this->db->where('from_city_id', $originId)
            ->where('to_city_id', $destinationId)
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



    /**
     * Retrieve travel routes with requirements and city-to-country names based on the provided starting city ID.
     *
     * @param int $fromCityId The ID of the starting city for which travel routes are to be retrieved.
     *
     * @return array Array containing travel routes with their associated requirements and city-to-country names.
     */
    public function getTravelRoutesWithRequirementsAndCityToCountryNames(int $fromCityId): array
    {
        return $this->db->select(
            'travel_routes.coordinateY as TravelRoutesCoordinateY',
            'travel_routes.coordinateX as TravelRoutesCoordinateX',
            'travel_routes.duration as TravelDuration',
            'items.name as ItemName',
            'items.id as ItemId',
            'from_cities.name as FromCityName',
            'from_cities.id as FromCityId',
            'from_regions.name as FromRegionName',
            'from_regions.id as FromRegionId',
            'from_countries.name as FromCountryName',
            'from_countries.id as FromCountryId',
            'to_cities.id as ToCityId',
            'to_regions.name as ToRegionName',
            'to_regions.id as ToRegionId',
            'to_countries.name as ToCountryName',
            'to_countries.id as ToCountryId'
        )
            ->join('cities as from_cities', 'travel_routes.from_city_id', '=', 'from_cities.id')
            ->join('regions as from_regions', 'from_cities.region_id', '=', 'from_regions.id')
            ->join('countries as from_countries', 'from_regions.country_id', '=', 'from_countries.id')
            ->join('cities as to_cities', 'travel_routes.to_city_id', '=', 'to_cities.id')
            ->join('regions as to_regions', 'to_cities.region_id', '=', 'to_regions.id')
            ->join('countries as to_countries', 'to_regions.country_id', '=', 'to_countries.id')
            ->join('route_requirements_mappings', 'travel_routes.id', '=', 'route_requirements_mappings.route_id')
            ->join('items', 'items.id', '=', 'route_requirements_mappings.item_id')
            ->where('travel_routes.from_city_id', '=', $fromCityId)
            ->where('travel_routes.status', '=', 1)
            ->get()
            ->toArray();
    }
}
