<?php

namespace App\Http\Controllers;

use App\Models\RouteRequirementsMapping;

use Illuminate\Http\Request;

class RouteRequirementsMappingController extends Controller
{

    protected $routeRequirementsMapping;

    public function __construct(
        RouteRequirementsMapping $routeRequirementsMapping
    ) {
        $this->routeRequirementsMapping  = $routeRequirementsMapping;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $travelRouteId
     * @return \Illuminate\Http\Response
     */
    public function travelableRouteRequirements(Request $request)
    {
        return response()->json($this->routeRequirementsMapping->getRequirementsByRouteId($request->route_id));
    }
}
