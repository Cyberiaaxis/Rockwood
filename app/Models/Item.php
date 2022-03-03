<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description','item_type_id',  'buyPrice',  'sellPrice',  'locationId',  'expiry',  'updated_at',  'created_at'
    ];

    protected $appends = ['item_type_name'];

    public function itemeffects()
    {
        return $this->HasOne(ItemEffect::class);
    }

    public function itemTypes()
    {
         return $this->belongsTo(ItemType::class);
    }

    public function user()
    {
         return $this->belongsToMany(User::class,'userItems','user_id');
    }

    /**
     * get Item Category Name
     */
    public function getItemCategoryNameAttribute()
    {
        return $this->itemCategories()->value('name');
    }

        /**
     * get Item Type Name
     */
    public function getItemTypeNameAttribute()
    {
        return $this->itemTypes()->value('name');
    }

    /**
     * get Item Type Name
     */
    public function typeAttribute()
    {
        return $this->belongsTo(TypeAttribute::class);
    }

    /**
     * get Item Type Name
     */
    public function getWeaponNameById(int $itemId)
    {
        return $this->find($itemId)->value('name');
    }
    /**
     * get Item Type Name
     */
    public function getItemAttributeById(int $itemId)
    {
        return $this->find($itemId)->value('type_attribute_id');
    }

}

