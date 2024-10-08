<?php

namespace App\Http\Controllers;

use Illuminate\Support\Arr;

use App\Models\City;
use App\Models\Country;
use App\Models\Inventory;
use App\Models\TravelRoute;
use App\Models\UserTravel;
use App\Models\Item;
use App\Models\RouteRequirementsMapping;
use App\Models\RouteTransportation;
use App\Models\TransportationType;


use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TravelRoutesController extends Controller
{
    protected $city;
    protected $country;
    protected $travelRoute;
    protected $userTravel;
    protected $item;
    protected $routeRequirementsMapping;
    protected $inventory;
    protected $routeTransportation;
    protected $transportationType;

    public function __construct(
        City $city,
        Country $country,
        TravelRoute $travelRoute,
        UserTravel $userTravel,
        Item $item,
        Inventory $inventory,
        RouteRequirementsMapping $routeRequirementsMapping,
        RouteTransportation $routeTransportation,
        TransportationType $transportationType
    ) {
        $this->city = $city;
        $this->country = $country;
        $this->travelRoute = $travelRoute;
        $this->userTravel = $userTravel;
        $this->item = $item;
        $this->inventory = $inventory;
        $this->routeRequirementsMapping  = $routeRequirementsMapping;
        $this->routeTransportation = $routeTransportation;
        $this->transportationType = $transportationType;
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
        $userCurrentCity =  $this->userTravel->getUserCurrentLocationByUserIdAndStatus(auth()->id());
        $currentLocations = $this->travelRoute->getTravelRoutesWithCityToRegionToCountry($userCurrentCity);

        foreach ($currentLocations as $currentLocation) {

            foreach ($this->routeRequirementsMapping->getItemIdByRouteId($currentLocation->RouteId) as $id) {
                $currentLocation->recurements[] = [
                    "itemName" => $this->item->getItemNameById($id['item_id']),
                    "status" => $this->inventory->getItemStatusByUserAndItemId(auth()->id(), $id['item_id']),
                ];
            }

            foreach ($this->routeTransportation->getRouteTransportationByRouteId($currentLocation->RouteId) as $routeId) {
                $currentLocation->transportations[] = [
                    "transporateId" => $routeId['id'],
                    "transporateName" => $this->transportationType->getTransportationNameById($routeId['transportation_type_id']),
                    "transporateDuration" => $routeId['duration'],
                ];
            }
        }

        return $currentLocations;
    }
    // getTransportationNameById
    // getRouteTransportationByRouteId
    /**
     * Display the specified resource.
     *
     * @param  int  $travelRouteId
     * @return \Illuminate\Http\Response
     */
    // public function travelledHistory()
    // {
    //     $userCurrentCity =  $this->userTravel->getUserTravelHistoryByUserIdAndStatus(auth()->id());

    //     return $this->travelRoute->getTravelRoutesWithCityToRegionToCountryWithReuireItems(true, $userCurrentCity);
    // }
}
