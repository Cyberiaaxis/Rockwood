<?php

namespace App\Models;

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

    public function getUserTravelHistoryByUserIdAndStatus(int $userId, bool $status = true): ?array
    {
        // dd($status);
        return $this->db->where(['user_id' => $userId, 'status' => $status])->get()->toArray();
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
}
