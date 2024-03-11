<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Country;
use App\Models\TravelRoute;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TravelRoutesController extends Controller
{
    protected $city;
    protected $country;
    protected $travelRoute;

    public function __construct(City $city, Country $country, TravelRoute $travelRoute)
    {
        $this->city = $city;
        $this->country = $country;
        $this->travelRoute = $travelRoute;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function routes()
    {
        return $this->country->getCountriesRegionsCities();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function configureRoute(Request $request)
    {
        $validated = $this->validateTravelRoute($request);
       return $this->travelRoute->addTravelRoute($validated);
    }

        /**
     * Validate the request data for creating or updating a travel route.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validateTravelRoute($request)
    {
        return $request->validate([
                'from_city_id' => 'required|numeric|unique:travel_routes,from_city_id,NULL,id,to_city_id,' . $request->to_city_id,
                'to_city_id' => 'required|numeric|unique:travel_routes,to_city_id,NULL,id,from_city_id,' . $request->from_city_id,
                'duration' => 'required|numeric', // Example validation rules for 'duration'
                'cost' => 'required|numeric', // Example validation rules for 'cost'
                'status' => 'required|boolean', // Example validation rules for 'status'
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $travelRouteId
     * @return \Illuminate\Http\Response
     */
    public function travelableRoutes(int $travelRouteId)
    {
        // Fetch travel route details
        $travelRoute = $this->travelRoute->findOrFail($travelRouteId);

        // Implement logic to find travelable routes based on the given travel route

        return response()->json($travelableRoutes);
    }
}
