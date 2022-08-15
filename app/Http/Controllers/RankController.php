<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use Illuminate\Http\Request;
use Throwable;

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
    public function Feed(Request $request)
    {
        // return $request;
        $this->dataValidate($request);
        $imageName = $this->imageUpload($request);
        $rank = $this->store($request, $imageName);
        return response()->json([
            'status' => true,
            'message' => 'Successfully saved rank!',
            'data' => $rank,
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
            return false;
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

        try {
            $rank = new Rank();

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }

            return $rank->updateOrCreate([
                'id' => $request->id
            ], $data);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }
}
