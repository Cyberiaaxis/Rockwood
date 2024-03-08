<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Create a new location.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeLocation(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->verifyData($request);
        // dd($validatedData);

        // Create a new location record
        $location = new Location();
        $location->addLocation($validatedData);

        // Return a response indicating success
        return response()->json(['message' => $validatedData['type'] . ' with name ' . $validatedData['name'] . ' created successfully', 'location' => $validatedData], 201);
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function verifyData(Request $request): array
    {
        // Validate incoming request data
        $finalValidatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:locations,id'], // Ensure parent_id exists in locations table
            'coordinateX' => ['required', 'integer'],
            'coordinateY' => ['required', 'integer']
        ]);

        // Perform additional unique validation for name, type, and parent_id
        $uniqueRule = Rule::unique('locations')->where(function ($query) use ($finalValidatedData) {
            return $query->where('name', $finalValidatedData['name'])
                        ->where('type', $finalValidatedData['type'])
                        ->where('parent_id', $finalValidatedData['parent_id']);
        });

        // Return the validated data including the result of unique validation
        $request->validate([
            'name' => $uniqueRule,
        ]);
        return $finalValidatedData;
    }
}
