<?php

namespace App\Http\Controllers;

use App\Models\{RealEstate, UserDetail, UserRealEstate, UserStats};
use Exception;
use Illuminate\Http\Request;

class RealEstateController extends Controller
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
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function show(RealEstate $realEstate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function edit(RealEstate $realEstate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RealEstate $realEstate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\RealEstate  $realEstate
     * @return \Illuminate\Http\Response
     */
    public function destroy(RealEstate $realEstate)
    {
        //
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

        if($userRealEstate->isUserRealEstate(auth()->user()->id, $realEstate->id) === false)
        {
            throw new Exception("you don't have this property");
        }

        $userDetails = new UserDetail();
        $userDetails->setActiveEstate(auth()->user()->id, $realEstate->id);
        $userStats = new UserStats();
        $userStats->changeWill(auth()->user()->id, $realEstate->will);
    }


}
