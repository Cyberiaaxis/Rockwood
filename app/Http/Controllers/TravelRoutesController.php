<?php

namespace App\Http\Controllers;

use App\Models\{Area, City, Country, TravelRoute};
use Illuminate\Http\Request;

class TravelRoutesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function travelRoutes()
    {
        $travel = new TravelRoute();
        $travelRoutesLists = $travel->getTravelList();
    return $this->routeDetails($travelRoutesLists);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function routeDetails($travelRoutesList)
    {
        $area = new Area();
        $city = new City();
        $country = new Country();
        $travelRouteList =  [];

        foreach ($travelRoutesList as $travelList)
        {
            $originAreaDetails = $area->getAreaById($travelList->origin);
            $originCityDetails = $city->getCityById($originAreaDetails['city_id']);
            $originCountryDetails = $country->getCountryById($originCityDetails['country_id']);
            $destinationAreaDetails = $area->getAreaById($travelList->destination);
            $destinationCityDetails = $city->getCityById($destinationAreaDetails['city_id']);
            $destinationCountryDetails = $country->getCountryById($destinationCityDetails['country_id']);
            $travelRouteList[] = [
                'originArea' => $originAreaDetails,
                'originCity' => $originCityDetails->name,
                'originCountry' => $originCountryDetails->name,
                'destinationArea'=> $destinationAreaDetails,
                'destinationCity' => $destinationCityDetails->name,
                'destinationCountry' => $destinationCountryDetails->name
            ];
        }

    return $travelRouteList;
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
     * @param  \App\Model\TravelRoutes  $travelRoutes
     * @return \Illuminate\Http\Response
     */
    public function show(TravelRoute $travelRoutes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\TravelRoutes  $travelRoutes
     * @return \Illuminate\Http\Response
     */
    public function edit(TravelRoute $travelRoutes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\TravelRoutes  $travelRoutes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TravelRoute $travelRoutes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\TravelRoutes  $travelRoutes
     * @return \Illuminate\Http\Response
     */
    public function destroy(TravelRoute $travelRoutes)
    {
        //
    }
}
