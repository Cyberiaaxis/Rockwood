<?php

namespace App\Models;

use DateTime;

use Illuminate\Database\Eloquent\Model;

class UserTravelHistory extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "user_travel_histories";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'city_id',
        'status',
    ];

    /**
     * Retrieve all user travel history records.
     *
     * @return array|null
     */
    public function getAllUserTravelHistory(): ?array
    {
        return $this->db->all();
    }

    public function getUserCurrentLocationByUserIdAndStatus(int $userId, bool $isAtLocation = true): ?int
    {
        return $this->Where('user_id', $userId)
            ->Where('isAtLocation', $isAtLocation)
            ->value('city_id');
    }

    public function getUserTravelHistoryCountByUserIdAndCityId(int $userId, int $city_id)
    {
        return $this->db->Where('user_id', $userId)
            ->Where('city_id', $city_id)
            ->count();
    }

    /**
     * Retrieve user travel history by user ID.
     *
     * @param  int  $userId
     * @return array|null
     */
    public function getUserTravelHistoryByUserId(int $userId): ?array
    {
        return $this->db->where('user_id', $userId)->get()->toArray();
    }

    /**
     * Add a new user travel history record.
     *
     * @param  array  $attributes
     * @return int|null The ID of the newly created user travel history record, or null on failure
     */
    public function addUserTravelHistory(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing user travel history record.
     *
     * @param  int  $id
     * @param  array  $data
     * @return int The number of rows affected by the update
     */
    public function modifyUserTravelHistory(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }

    public function getUserTravelDetailsWithLocation(int $userId)
    {
        // return $date;
        return $this->db->select(
            'cities.name as city_name',
            'regions.name as region_name',
            'countries.name as country_name',
            'user_travel_histories.created_at as visited',
            $this->db->raw('COUNT(*) as travel_count'),
            $this->db->raw("CASE WHEN MAX(user_travel_histories.created_at) > now() THEN 'active' ELSE 'inactive' END as status")
        )
            ->join('cities', 'user_travel_histories.city_id', '=', 'cities.id')
            ->join('regions', 'cities.region_id', '=', 'regions.id')
            ->join('countries', 'regions.country_id', '=', 'countries.id')
            ->where('user_travel_histories.user_id', $userId)
            ->groupBy('user_travel_histories.city_id')
            ->groupBy('user_travel_histories.created_at')
            ->orderBy('user_travel_histories.created_at', 'desc')
            ->get()
            ->toArray();
    }
}
