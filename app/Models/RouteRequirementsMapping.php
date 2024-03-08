<?php

namespace App\Models;

/**
 * Represents the RouteRequirementsMapping model.
 */
class RouteRequirementsMapping extends GameBaseModel
{
    /**
     * The table associated with the RouteRequirementsMapping model.
     *
     * @var string
     */
    protected $table = 'route_requirements_mappings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'route_id',
        'requirement_type',
        'requirement_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'route_id' => 'integer',
        'requirement_type' => 'string',
        'requirement_id' => 'integer',
    ];

    /**
     * Retrieve requirements by route ID.
     *
     * @param int $routeId The route ID.
     *
     * @return array|null The requirements or null if not found.
     */
    public function getRequirementsByRouteId(int $routeId): ?array
    {
        return $this->db->where('route_id', $routeId)->get();
    }

    /**
     * Add route requirements.
     *
     * @param array $attributes The attributes to be inserted.
     *
     * @return int The inserted record ID.
     */
    public function addRouteRequirements(array $attributes): int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify requirements by route ID.
     *
     * @param int   $id         The ID of the requirement to be modified.
     * @param array $attributes The new attributes.
     *
     * @return bool True if modification is successful, false otherwise.
     */
    public function modifyRequirementsByRouteId(int $id, array $attributes): bool
    {
        return $this->db->where('id', $id)->update($attributes);
    }
}
