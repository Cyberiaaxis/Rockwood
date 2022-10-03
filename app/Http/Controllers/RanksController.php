<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use App\Http\Requests\StorePostRequest;

class RanksController extends Controller
{
    /**
     * Display a listing of the ranks.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rank = new Rank();
        return response()->json(['ranks' => $rank->getRanks()]);
    }

    /**
     * Show the form for creating a new rank.
     * @param  \App\Http\Requests\StorePostRequest;  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(StorePostRequest $request)
    {
        $data = $this->handleData($request);
        $rank = new Rank();
        $rankStored = $rank->storeRank($request->id, $data);
        return response()->json([
            'status' => (($rankStored->status === "1") ? true : false),
            'data' => $rankStored,
        ], 201);
    }

    /**
     * asign inputs.
     * @param  \App\Http\Requests\StorePostRequest;  $request
     * @return Array data
     */
    public function handleData($request): array
    {
        $data =  [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ];
        return $data;
    }
}
