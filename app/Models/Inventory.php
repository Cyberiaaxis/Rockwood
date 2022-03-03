<?php

namespace App\Models;

use App\{Item, ItemEffect,  UserStats };
use App\Model\{TypeAttribute, UserDetail, UserSlot, WeaponAttribute, ItemType};
use Illuminate\Database\Eloquent\Model;
use Throwable;

class Inventory extends Model
{
    protected $table = 'user_items';
    protected $fillable = ['user_id', 'item_id'];
    public $timestamps = false;
    protected $slot = 'secondary_slot';

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function incrementItem($userId, $itemId)
    {
        try {
            $details = ['user_id' => $userId, 'item_id' => $itemId];
            $this->updateOrCreate($details)->increment('quantity');
            return true;
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function decrementItem($userId, $itemId)
    {
        try {
            $details = ['user_id' => $userId, 'item_id' => $itemId];
            $this->where($details)->decrement('quantity');
            return true;
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function discardItem($userId, $itemId)
    {
        try {
            $details = ['user_id' => $userId, 'item_id' => $itemId];

            if ($this->where($details)->where('quantity', '<=', 0)->exists())
            {
                return $this->removeItem($userId, $itemId);
            }

        return $this->decrementItem($userId, $itemId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function removeItem($userId, $itemId)
    {
        try {
            $details = ['user_id' => $userId, 'item_id' => $itemId];
            $this->where($details)->delete();
            return true;
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTypes()
    {
        try {
            $itemtypes = new ItemType();
            return $this->all();
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUserInventory($userId, $itemId)
    {
     try {
            return  $this->where(['user_id' => $userId, 'item_id' => $itemId])->exists();
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getItem($itemId)
    {
        try {
            $item = new Item();
            return $item->find($itemId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getItemType($typeId)
    {
        try {
            $itemType = new ItemType();
            return $itemType->find($typeId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getWeaponAttributes($attributeId)
    {
        try {
            $weaponAttribute = new WeaponAttribute();
            return $weaponAttribute->find($attributeId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTypeAttribute($typeAttributeId)
    {
        try {
            $typeAttribute = new TypeAttribute();
            return $typeAttribute->find($typeAttributeId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getItemEffect($itemEffectId)
    {
        try {
            $itemEffect = new ItemEffect();
            return $itemEffect->find($itemEffectId);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function apply($userId, $effect)
    {
        try {
                $userStats = new UserStats();
                $userdetails = new UserDetail();
                $builder = $this->getConnection()->getSchemaBuilder();

                if ($builder->hasColumn($userdetails->getTable(), $effect->effect_type))
                {

                    return $userdetails->where('user_id', $userId)->update([$effect->effect_type => $effect->qty]);
                }

                if ($builder->hasColumn($userStats->getTable(), $effect->effect_type))
                {

                    return $userStats->where('user_id', $userId)->update([$effect->effect_type => $effect->qty]);
                }

        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }

    }

    public function equip($request)
    {
        try {
            $userSlot = new UserSlot();
            if($request->primary)
            {
                $this->slot = 'primary_slot';
            }

            $userSlot->where('user_id', auth()->user()->id)->update([$this->slot => $request->weaponId]);
            $this->where('user_id', auth()->user()->id)->where('item_id', $request->weaponId)->update(['active' => true]);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    public function unEquip($request)
    {
        try {
            $userSlot = new UserSlot();

            if ($request->primary) {
                $this->slot = 'primary_slot';
            }

            $userSlot->where('user_id', auth()->user()->id)->update([$this->slot => 1]);
            $this->where('user_id', auth()->user()->id)->where('item_id', $request->weaponId)->update(['active' => false]);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }
}
