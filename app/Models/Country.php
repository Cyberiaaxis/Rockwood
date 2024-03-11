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
class Country extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "countries";
    
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
     * Retrieve all countries.
     *
     * @return null|array
     */
    public function getAllCountries(): ?array
    {
        return $this->db->all();
    }

    /**
     * Retrieve country name by ID.
     *
     * @param  int  $id
     * @return string|null
     */
    public function getCountryNameById(int $id): ?string
    {
        return $this->db->find($id)->name;
    }

    /**
     * Retrieves city, region, and country information based on the city ID.
     *
     * @param int $cityId The ID of the city.
     * @return mixed Returns an object containing city, region, and country information.
     */
    public function getCountriesRegionsCities()
    {
        return $this->db->select('countries.name as country_name', 'regions.name as region_name', 'cities.name as city_name', 'cities.id as city_id')
            ->join('regions', 'countries.id', '=', 'regions.country_id')
            ->join('cities', 'regions.id', '=', 'cities.region_id')
            ->get();
    }



    /**
     * Add a new country.
     *
     * @param array $attributes
     * @return int|null The ID of the newly created country, or null on failure
     */
    public function addCountry(array $attributes): ?int
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
    public function modifyCountry(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
