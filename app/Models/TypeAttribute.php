<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeAttribute extends Model
{

    /**
     * get item's effect id from storage.
     * @param  INT $typeId
     * @return int
     */
    public function getEffectsId(int $typeId) : int
    {
        return $this->where('type_id', $typeId)->value('item_effect_id');
    }
}
