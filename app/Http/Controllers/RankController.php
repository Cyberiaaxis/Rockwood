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
        $rank = new Rank();
        $this->dataValidate($request);
        $imageName = $this->imageUpload($request);
        $data = $rank->rankStore($request, $imageName);
        return response()->json([
            'status' => (($data->status === "1") ? true : false),
            'message' => 'Successfully saved rank!',
            'data' => $data,
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
        return $request->validate([
            'name' =>  ['required', 'unique:ranks,name'],
            'image' => ['nullable', 'sometimes', 'mimes:jpg,jpeg,bmp,png'],
            'status' => 'integer',
            'description' => ['nullable', 'sometimes', 'string']
        ]);
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
