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
        'id',
        'route_id',
        'item_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'route_id' => 'integer',
        'item_id' => 'integer',
    ];

    /**
     * Retrieve requirements by route ID.
     *
     * @param int $routeId The route ID.
     *
     * @return array|null The requirements or null if not found.
     */
    public function getItemIdByRouteId(int $routeId): ?array
    {
        return $this->db->where('route_id', $routeId)->get('item_id')->toArray();
    }

    /**
     * Add route requirements.
     *
     * @param array $attributes The attributes to be inserted.
     *
     * @return int The inserted record ID.
     */
    public function addRouteRequirement(array $attributes): int
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

    public function getRequirementsByRouteId(int $routeId)
    {
        return $this->db->select('items.*')
            ->join('items', 'route_requirements_mappings.item_id', '=', 'items.id')
            ->where('route_requirements_mappings.route_id', $routeId)
            ->get()
            ->toArray();
    }
}
