<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Services\StoreService;

class CitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cities = new City();
        return response()->json(['jobs' => $cities->all()]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(Request $request)
    {
        $data = $this->handleData($request);
        $city = (new StoreService($request))->store(new City(), $data);
        return response()->json([
            'status' => (($city->status === "1") ? true : false),
        ], 201);
    }

    /**
     * validattion of inputs.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return validation result
     */
    public function handleData($request)
    {
        $imageName = $this->imageUpload($request);
        $data =  [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ];

        if ($imageName) {
            $data['avatar'] =  $imageName;
        }
        return $data;
    }

    /**
     * upload the file.
     * @param  \Illuminate\Http\Request  $request
     * @return string as images name
     */
    public function imageUpload($request)
    {
        $fileExists = $request->hasFile('image');

        if ($fileExists) {
            $file = $request->file('image');
            $fileName = $file->getClientOriginalName();
            $ext = $file->extension();
            $path =  $file->storeAs('images', $request->id . '.' . $ext);
            return $path;
        }

        return false;
    }

    /**
     * Chceck items in market
     */
    public function itemsMarket()
    {
        $item = new Item();
    return $item->all();
    }
}
