<?php

namespace App\Http\Controllers;

use App\Models\Gang;
use Illuminate\Http\Request;

class GangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gangs = Gang::all();
        return view('player.gang', ['gangs' => $gangs]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Gang  $gang
     * @return \Illuminate\Http\Response
     */
    public function show(Gang $gang)
    {
        return view('player.gangprofile', ['gangs' => $gang]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Gang  $gang
     * @return \Illuminate\Http\Response
     */
    public function edit(Gang $gang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Gang  $gang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gang $gang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Gang  $gang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gang $gang)
    {
        //
    }
}
