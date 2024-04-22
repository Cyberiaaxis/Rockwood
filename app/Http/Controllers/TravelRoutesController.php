<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Country;
use App\Models\TravelRoute;
use App\Models\UserTravelHistory;
use App\Models\Item;
use App\Models\RouteRequirementsMapping;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TravelRoutesController extends Controller
{
    protected $city;
    protected $country;
    protected $travelRoute;
    protected $userTravelHistory;
    protected $item;
    protected $routeRequirementsMapping;

    public function __construct(
        City $city,
        Country $country,
        TravelRoute $travelRoute,
        UserTravelHistory $userTravelHistory,
        Item $item,
        RouteRequirementsMapping $routeRequirementsMapping
    ) {
        $this->city = $city;
        $this->country = $country;
        $this->travelRoute = $travelRoute;
        $this->userTravelHistory = $userTravelHistory;
        $this->item = $item;
        $this->routeRequirementsMapping  = $routeRequirementsMapping;
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
        // Validate the incoming request data
        $validated = (array) $this->validateTravelRoute($request);

        // Extract keys that are not needed for the item creation
        $keysToRemove = [
            'item_id',
        ];

        // Remove keys not needed for the item creation from the validated data
        $validatedExcluded = array_diff_key($validated, array_flip($keysToRemove));

        // Add the travel route using the filtered validated data
        $addTravelRouteId = $this->travelRoute->addTravelRoute($validatedExcluded);

        return $this->routeRequirementsMapping->addRouteRequirement([
            'route_id' => $addTravelRouteId,
            'item_id' => $validated['item_id']
        ]);
    }


    /**
     * Validate the request data for creating or updating a travel route.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validateTravelRoute($request): array
    {
        return $request->validate([
            'from_city_id' => 'required|numeric|unique:travel_routes,from_city_id,NULL,id,to_city_id,' . $request->to_city_id,
            'to_city_id' => 'required|numeric|unique:travel_routes,to_city_id,NULL,id,from_city_id,' . $request->from_city_id,
            'duration' => 'required|numeric', // Example validation rules for 'duration'
            'cost' => 'required|numeric', // Example validation rules for 'cost'
            'status' => 'required|boolean', // Example validation rules for 'status'
            'coordinateX' => 'required|numeric', // Example validation rules for 'duration'
            'coordinateY' => 'required|numeric', // Example validation rules for 'duration'
            'item_id' => 'required|numeric', // Example validation rules for 'duration'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $travelRouteId
     * @return \Illuminate\Http\Response
     */
    public function travelableRoutes()
    {
        $userCurrentCity =  $this->userTravelHistory->getUserCurrentLocationByUserIdAndStatus(auth()->id());
        $currentLocations = $this->travelRoute->getTravelRoutesWithCityToRegionToCountry($userCurrentCity);

        foreach ($currentLocations as $currentLocation) {
            $currentLocation->recurements =
                $this->routeRequirementsMapping->getItemIdByRouteId($currentLocation->RouteId);
        }

        dd($currentLocations);
        // dd($this->routeRequirementsMapping->getRequirementByRouteId($userCurrentCity[0]->route_id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $travelRouteId
     * @return \Illuminate\Http\Response
     */
    // public function travelledHistory()
    // {
    //     $userCurrentCity =  $this->userTravelHistory->getUserTravelHistoryByUserIdAndStatus(auth()->id());

    //     return $this->travelRoute->getTravelRoutesWithCityToRegionToCountryWithReuireItems(true, $userCurrentCity);
    // }
}
