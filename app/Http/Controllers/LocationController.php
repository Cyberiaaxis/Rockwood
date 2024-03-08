<?php

namespace App\Http\Controllers;

use App\Models\{
Location
};

use Illuminate\Http\Request;

class LocationController extends Controller
{
    
    // Function to create a new location
    public function makeLocation(Request $request)
    {


        $data = $request->validate([
            "name" => ['required', 'string'],
            "type" => ['required', 'string'],
            "parent_id" => ['required', 'integer'],
            "coordinateX" => ['required', 'integer'],
            "coordinateY" => ['required', 'integer']
        ]);

        $location = new Location();

        $location->insertGetId($data);

        return response()->json([
            "success" => true,
            "message" => "Location has been added successfully!"
        ]);
    }
}
