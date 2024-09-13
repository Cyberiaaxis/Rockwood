<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * Class EventType
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $icon
 */
class EventType extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'event_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'icon',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        // Add casts if necessary
    ];

    /**
     * Retrieve all event types.
     *
     * @return Collection
     */
    public function getAllEventTypes(): Collection
    {
        return $this->db->all();
    }

    /**
     * Retrieve event type name by ID.
     *
     * @param int $id The ID of the event type.
     * @return string|null The name of the event type, or null if not found.
     */
    public function getEventTypeNameById(int $id): ?string
    {
        return $this->db->find($id)?->name;
    }

    /**
     * Add a new event type.
     *
     * @param array $attributes The attributes for the new event type.
     * @return int|null The ID of the newly created event type, or null on failure.
     */
    public function addEventType(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing event type.
     *
     * @param int $id The ID of the event type to modify.
     * @param array $data The updated data for the event type.
     * @return int The number of rows affected by the update.
     */
    public function modifyEventType(int $id, array $data): int
    {
        return $this->db->where('id', $id)->update($data);
    }
}
