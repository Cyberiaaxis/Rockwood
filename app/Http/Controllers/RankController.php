<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use App\Http\Requests\StorePostRequest;
use App\Services\StoreService;

class RankController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rank = new Rank();
        return response()->json(['ranks' => $rank->all()]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(StorePostRequest $request)
    {
        $data = $this->handleData($request);
        $job = (new StoreService($request))->store(new Rank(), $data);
        return response()->json([
            'status' => (($job->status === "1") ? true : false),
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
}
