<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransportationTypeRequest;
use App\Http\Requests\UpdateTransportationTypeRequest;
use App\Models\TransportationType;

class TransportationTypeController extends Controller
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
     * @param  \App\Http\Requests\StoreTransportationTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTransportationTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransportationType  $transportationType
     * @return \Illuminate\Http\Response
     */
    public function show(TransportationType $transportationType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TransportationType  $transportationType
     * @return \Illuminate\Http\Response
     */
    public function edit(TransportationType $transportationType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTransportationTypeRequest  $request
     * @param  \App\Models\TransportationType  $transportationType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTransportationTypeRequest $request, TransportationType $transportationType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransportationType  $transportationType
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransportationType $transportationType)
    {
        //
    }
}
