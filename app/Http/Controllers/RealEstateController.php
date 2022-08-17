<?php

namespace App\Http\Controllers;

use App\Models\{RealEstate, UserDetail, UserRealEstate, UserStats};
use Illuminate\Http\Request;
use Throwable;

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
        return response()->json(['real_estates' => $realEstate->all()]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(Request $request)
    {
        // return $request;
        $this->dataValidate($request);
        $imageName = $this->imageUpload($request);
        $realEstate = $this->store($request, $imageName);
        return response()->json([
            'status' => true,
            'message' => 'Successfully saved real estate!',
            'data' => $realEstate,
        ], 201);
    }

    /**
     * validattion of inputs.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return validation result
     */
    public function dataValidate($request)
    {
        try {
            return $request->validate([
                'name' =>  ['required', 'unique:ranks,name'],
                'image' => ['nullable', 'sometimes', 'mimes:jpg,jpeg,bmp,png'],
                'status' => 'boolean',
                'description' => ['nullable', 'sometimes', 'string']
            ]);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
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
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function store($request, $imageName = null)
    {
        // dd($request->status);
        try {
            $realEstate = new RealEstate();

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }
            // dd($data);
            return $realEstate->updateOrCreate([
                'id' => $request->id
            ], $data);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
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
