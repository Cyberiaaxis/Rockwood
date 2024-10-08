<?php

namespace App\Models;

/**
 * Class City
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string|null $avatar
 * @property string|null $description
 * @property int|null $coordinateX
 * @property int|null $coordinateY
 */
class City extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "cities";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'avatar',
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
        'coordinateY' => 'integer',
    ];

    /**
     * Retrieve all cities.
     *
     * @return null|array
     */
    public function getAllCities(): ?array
    {
        return $this->db->all();
    }

    /**
     * Retrieve city name by ID.
     *
     * @param  int  $id
     * @return string|null
     */
    public function getCityNameById(int $cityId): ?string
    {
        return $this->db->find($cityId)->value('name');
    }

    /**
     * Get the name of the city by its ID and region ID.
     *
     * @param int $cityId The ID of the city.
     * @param int $regionId The ID of the region associated with the city.
     * @return string|null The name of the city, or null if not found.
     */
    /**
     * Get the name, region ID, and region name of the city by its ID.
     *
     * @param int $cityId The ID of the city.
     * @return array|null An array containing the city name, region ID, and region name, or null if not found.
     */
    public function getCityRegionCountryById($cityIds)
    {
        // Convert $cityIds to an array if it's not already
        $cityIds = (array) $cityIds;
        return $this->db->join('regions as r1', 'cities.region_id', '=', 'r1.id')
            ->join('countries', 'r1.country_id', '=', 'countries.id')
            ->select('cities.name as city_name', 'r1.name as region_name', 'countries.name as country_name')
            ->whereIn('cities.id', $cityIds)
            ->get()
            ->toArray();
    }

    /**
     * Add a new city.
     *
     * @param array $attributes
     * @return int|null The ID of the newly created city, or null on failure
     */
    public function addCity(array $attributes): ?int
    {
        return  $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing city.
     *
     * @param int $id The ID of the city to modify
     * @param array $data The updated data for the city
     * @return int The number of rows affected by the update
     */
    public function modifyCity(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
