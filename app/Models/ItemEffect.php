<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemEffect extends Model
{
    protected $table = 'item_effects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'effect_type', 'qty' ];


    // public function items()
    // {
    //    return $this->belongsTo(Item::class);
    // }

    // public function itemTypes()
    // {
    //      return $this->belongsTo(ItemType::class);
    // }

    // public static function getEffect($item_id)
    // {
    //     return $this->where('item_id', $item_id);
    // }

    // public function scopeGetEffect(Builder $query, $item_id)
    // {
    //     return $query->where('item_id', $item_id)->get();
    // }

    /**
     * get Item Type Name
     */
    public function getEffectsById($attributeId)
    {
        return $this->find($attributeId);
    }


}


