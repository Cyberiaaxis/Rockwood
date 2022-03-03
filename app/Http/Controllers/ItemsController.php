<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\{Item, ItemCategory, ItemType};

class ItemsController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Item::with(['itemTypes', 'itemCategories'])->get();

        if($request->ajax())
        {
            return ItemResource::collection($items);
        }

    return view('staff.items.items');
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
    public function store(Request $request)
    {
        // return $request;
        $request->validate([
             'name' => 'required|unique:items,name,itemCategoryId'. $request->itemcategory, 'itemTypeId'. $request->itemtype,
            'description' => 'required'
        ]);
        $item = Item::create([
                            'itemCategoryId' => $request->itemcategory,
                            'itemTypeId' => $request->itemtype,
                            'name' => $request->name,
                            'description' => $request->description,
                            'buyPrice' => $request->buyPrice,
                            'sellPrice'=> $request->sellPrice,
                            ]);
    return response()->json(['success' => true, 'msg' => 'Category has been created successfully','item' => $item]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($request->name){
            $request->validate([
                'name' => 'required|unique:items,name',
            ]);
        }

        $item = Item::findorFail($id);
        $inputs = $request->except(['url', 'method', 'csrfToken']);
        $item->update($inputs);
    return response()->json(['success' => true,'msg' => 'Item has been updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = ItemCategory::findorFail($id);
        $item->delete($id);
    return response()->json(['success' => true, 'msg' => 'Category has been deleted']);
    }
}
