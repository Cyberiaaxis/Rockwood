<?php

namespace App\Http\Controllers;

// use App\Model\House;
use App\Model\Houses;
use Illuminate\Http\Request;

class HousesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Houses  $houses
     * @return \Illuminate\Http\Response
     */
    public function show(Houses $houses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Houses  $houses
     * @return \Illuminate\Http\Response
     */
    public function edit(Houses $houses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Houses  $houses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Houses $houses)
    {
        new House()
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Houses  $houses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Houses $houses)
    {
        //
    }
}
