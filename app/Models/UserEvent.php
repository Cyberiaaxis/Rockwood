<?php

namespace App\Models;

/**
 * Represents the UserEvent model.
 * 
 * This model represents user events related to travel routes.
 */
class UserEvent extends GameBaseModel
{
    /**
     * The table associated with the UserEvent model.
     *
     * @var string
     */
    protected $table = 'user_events';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'event',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'updated_id' => 'datetime',
        'created_id' => 'datetime',
    ];

    /**
     * Retrieve user events by user ID.
     *
     * @param int $userId The ID of the user.
     * @return array An array of user events.
     */
    public function getUserEventsById(int $userId): array
    {
        return $this->db->where('user_id', $userId)->get()->toArray();
    }

    /**
     * Add a new user event with the specified attributes.
     *
     * @param array $attributes The attributes of the new user event.
     * @return int The ID of the newly created user event.
     */
    public function addUserEvent(array $attributes): int 
    {
        // Insert the user event data into the database and get the ID of the newly inserted record
        return $this->db->insertGetId($attributes);
    }
}
