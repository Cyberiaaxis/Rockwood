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
        // Validate incoming request data
       $data =  $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'parentId' => ['nullable', 'exists:locations,id',] // Ensure parentId exists in locations table
       
        ]);

        // Create a new location record
        $location = new Location();
        $location->addLocation($data);

        // Return a response indicating success
        return response()->json(['message' => $data['type'] .'with name'. $data['type'] . 'created successfully', 'location' => $data['type']], 201);
    }
}
