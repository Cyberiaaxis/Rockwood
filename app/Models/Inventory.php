<?php

namespace App\Models;

/**
 * Represents the Inventory model.
 */
class Inventory extends GameBaseModel
{
    /**
     * The table associated with the Inventory model.
     *
     * @var string
     */
    protected $table = 'inventories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'user_id',
        'item_id',
        'quantity',
    ];

    /**
     * Retrieve all items in the inventory belonging to a user.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserInventoryItems(int $userId): ?array
    {
        return $this->db->where('user_id', $userId)->get()->toArray();
    }

    /**
     * Retrieve all items in the inventory belonging to a user.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemInventoryByUserId(int $userId): ?array
    {
        return $this->db->where('user_id', $userId)->get()->toArray();
    }

    /**
     * Add a new item to the user's inventory.
     *
     * @param array $attributes The attributes of the new inventory item.
     * @return Inventory The newly created inventory item.
     */
    public function addItemToUserInventory(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing item in the user's inventory.
     *
     * @param int $id The ID of the item in the inventory.
     * @param array $attributes The updated attributes of the inventory item.
     * @return bool True if the inventory item was successfully modified, false otherwise.
     */
    public function modifyUserInventoryItem(int $userId, int $itemId, array $attributes)
    {
        return $this->db->where(['user_id' => $userId, 'item_id' => $itemId])->update($attributes);
    }
}
