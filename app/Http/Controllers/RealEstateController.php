<?php

namespace App\Http\Controllers;

use App\Models\{RealEstate, UserDetail, UserRealEstate, UserStats};
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\RealEstateResource;
use App\Services\StoreService;

class RealEstateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $realEstate = new RealEstate();
        $realEstate_list = $realEstate->getrealEstate();
        $realEstateResource = new RealEstateResource($realEstate_list);
        $realEstates = $realEstateResource->collection($realEstate_list);
        return response()->json(['real_estates' => $realEstates]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(StorePostRequest $request)
    {
        $data = $this->handleData($request);
        // dd($data);
        $realEstate = new RealEstate();
        $realEstateSaved = $realEstate->realEstateStore($data);
        return response()->json([
            'data' => $realEstateSaved,
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
            'id' => $request->id,
            'name' => $request->name,
            'description' => $request->description,
            // 'status' => $request->status,
        ];

        if ($imageName) {
            $data['image'] =  $imageName;
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function buy(RealEstate $realEstate)
    {
        $userRealEstate = new UserRealEstate();
        $userRealEstate->addUserRealEstate(auth()->user()->id, $realEstate->id);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function activeRealEstate(RealEstate $realEstate)
    {
        $userRealEstate = new UserRealEstate();

        if ($userRealEstate->isUserRealEstate(auth()->user()->id, $realEstate->id) === false) {
            throw new Exception("you don't have this property");
        }

        $userDetails = new UserDetail();
        $userDetails->setActiveEstate(auth()->user()->id, $realEstate->id);
        $userStats = new UserStats();
        $userStats->changeWill(auth()->user()->id, $realEstate->will);
    }
}
