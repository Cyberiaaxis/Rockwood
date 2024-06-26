<?php

namespace App\Models;

/**
 * Represents the Item model.
 */
class ItemCategory extends GameBaseModel
{
    /**
     * The table associated with the Item model.
     *
     * @var string
     */
    protected $table = 'item_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'category_name',
    ];

    /**
     * Retrieve an item by its ID.
     *
     * @param int $id The ID of the item.
     * @return Item|null The item if found, or null otherwise.
     */
    public function getItemcategories()
    {
        return $this->db->get();
    }

    /**
     * Retrieve an item by its ID.
     *
     * @param int $id The ID of the item.
     * @return Item|null The item if found, or null otherwise.
     */
    public function getItemCategoryNameById(int $id): ?int
    {
        return $this->db->where('id', $id)->value('name');
    }

    /**
     * Add a new item with the specified attributes.
     *
     * @param array $attributes The attributes of the new item.
     * @return int The ID of the newly created item.
     */
    public function addItemCategory(array $attributes): int 
    {
        // Insert the item data into the database and get the ID of the newly inserted record
        return $this->db->insertGetId($attributes);
    }

    /**
     * Modify an existing item with the specified attributes.
     *
     * @param int $id The ID of the item to modify.
     * @param array $attributes The updated attributes of the item.
     * @return bool True if the item was successfully modified, false otherwise.
     */
    public function modifyItemCategory(int $id, array $attributes): bool
    {
        // Update the item with the provided data
        return $this->db->where('id', $id)->update($attributes);
    }
}
