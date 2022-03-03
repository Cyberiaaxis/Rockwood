<?php

namespace App\Http\Controllers;

use App\Models\{Inventory, Item, ItemEffect, ItemType};
use Illuminate\Http\Request;
use Validator;

class InventoryController extends Controller
{
    protected $consumableTypes = ['food', 'drug', 'medicine'];
    protected $consumable = false;
    protected $equipTypes = ['weapon'];
    protected $equip = false;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return auth()->user()->items;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    function useItem(Item $item, Request $request )
    {

        $userItem = new Inventory();

        // if($userItem->getUserInventory(auth()->user()->id, $item->id) === false){
        //     return "You don't have this item";
        // }

        $typeAttribute = $userItem->getTypeAttribute($item->type_attribute_id);
        $itemType = $userItem->getItemType($typeAttribute->type_id);
        $isUsable = $this->isUsable($itemType->name);
        $isEquipable = $this->isEquipable($itemType->name);

        // dd($isEuipble);
        if($isUsable){
            return  $userItem->apply(auth()->user()->id, $userItem->getItemEffect($typeAttribute->item_effect_id));
        }

        if($isEquipable){
            return $userItem->equip($request);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function tradeItem(Request $request)
    {
        $this->validation($request);
        $this->sender(auth()->id(), 1);
        $this->receiver(60, 1);
    return "Trade done";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sender($userId, $itemId)
    {
        $userItem = new Inventory();
    return $userItem->discardItem($userId, $itemId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function receiver($userId, $itemId)
    {
        $userItem = new Inventory();
    return  $userItem->incrementItem($userId, $itemId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function validation($inputs)
    {
        $validate = Validator::make($inputs->all(), [
            'quantity' => 'required|min:0',
        ]);

        if ($validate->fails()) {
            return "You dont have this item";
        }

    return $inputs;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function isUsable($itemType)
    {
        $itemType = strtolower($itemType);
        if (in_array($itemType ,  $this->consumableTypes, true ))
        {
              $this->consumable =  true;
        }

    return $this->consumable;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function isEquipable($itemType)
    {
        $itemType = strtolower($itemType);
        if (in_array($itemType, $this->equipTypes, true)) {
            $this->equip =  true;
        }

    return $this->equip;
    }

}

// function tradeItem()
// {
//     //query for change (decrement quantity from sender and incerment of reciver)
// }

// function useItem()
// {
//     itemEffect();
//     removeItem();
// }

// function discardItem()
// {
//     removeItem();
// }

// function removeItem()
// {
//     // update query quantity from user_items
// }

// function itemEffect()
// {
//     // decided benefits give to user
// }
