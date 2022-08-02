<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

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
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'avatar' => 'string',
            'status' => 'boolean',

        ]);

        return $this->store($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        dd($request->file());
        $rank = new Rank([
            'name' => $request->name,
            'image' => $request->avatar,
            'status' => $request->status,
        ]);

        $rank->save();

        return response()->json([
            'status' => true,
            'message' => 'Successfully created rank!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Rank  $rank
     * @return \Illuminate\Http\Response
     */
    public function show(Rank $rank)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Rank  $rank
     * @return \Illuminate\Http\Response
     */
    public function edit(Rank $rank)
    {
    }

 /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        dd($_FILES);
        $input = $request->only(['id', 'description', 'status']);
        $fileExists = $request->hasFile('image');
        $image = null;

        if ($fileExists) {
            $file = $request->file('image');
            $image = [
                'name' => $file->getClientOriginalName(),
                'mime' => $file->getClientMimeType(),
                'size' => $file->getSize(),
                'path' => $file->getPath(),
            ];
        }

        $input[] = ['hasFile' => $fileExists, 'image' => $image];
	return response()->json($input);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Rank  $rank
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rank $rank)
    {
        //
    }
}
