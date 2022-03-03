<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Resources\ItemCategoryResource;
use App\Models\ItemCategory;

class ItemCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemcategories = ItemCategory::all();

        if($request->ajax())
        {
            return ItemCategoryResource::collection($itemcategories);
        }

    return view('staff.categories.categories');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        echo "create";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required','unique:categories,name'],  'description' => ['required']
        ]);
        $itemCategory = ItemCategory::create([  'name' => $request->name,
                                'description' => $request->description,
                                'updated_at' => now(),
                                'created_at' => now()
                            ]);
    return response()->json(['success' => true, 'msg' => 'Item category has been created successfully','category' => $category]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\ItemCategory  $ItemCategory
     * @return \Illuminate\Http\Response
     */
    public function show(ItemCategory $itemCategory)
    {
         return $itemCategory->itemTypes;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    // public function edit(category $category)
    // {
    //     //
    // }

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
             'name' => ['required'],
         ]);
        }elseif(($request->description)){
            $request->validate([
             'description' => ['required'],
         ]);
        }
        $category = ItemCategory::findorFail($id);
        $inputs = $request->except(['url', 'method', 'csrfToken']);
        $category->fill($inputs)->save();
    return response()->json(['success' => true,'msg' => 'Category has been updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ItemCategory  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = ItemCategory::findorFail($id);
        $category->delete($id);
    return response()->json(['success' => true, 'msg' => 'Category has been deleted']);
    }
}
