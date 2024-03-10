<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload avatar if present and store path in database
        $avatarPath = $this->uploadAvatar($request);

        // Add avatar path to validated data
        if ($avatarPath) {
            $validatedData['avatar'] = $avatarPath;
        }

        // Create a new location record
        $location = new Location();
        $location->addLocation($validatedData);

        // Return a response indicating success
        return response()->json([
            'message' => $validatedData['type'] . ' with name ' . $validatedData['name'] . ' created successfully',
            'location' => $validatedData
        ], 201);
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function validateAndVerifyRequestData(Request $request): array
    {
        // Define validation rules
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:locations,id'], // Ensure parent_id exists in locations table
            'coordinateX' => ['required', 'integer'],
            'coordinateY' => ['required', 'integer']
        ];

        // Check if the request has 'id' field, add validation rule if present
        if ($request->has('id')) 
        {
            $rules['id'] = ['nullable', 'integer', 'exists:locations'];
        }

        if ($request->has('description')) 
        {
            $rules['description'] = ['nullable', 'string'];
        }

        if ($request->hasFile('avatar')) 
        {
            $rules['avatar'] = ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'];
        }

        // Validate incoming request data
        $validatedData = $request->validate($rules);

        // Perform additional unique validation for name, type, and parent_id
        $uniqueRule = Rule::unique('locations')->where(function ($query) use ($validatedData) {
            return $query->where('name', $validatedData['name'])
                ->where('type', $validatedData['type'])
                ->where('parent_id', $validatedData['parent_id']);
        });

        // Apply unique validation rule for the 'name' field
        $request->validate([
            'name' => $uniqueRule,
        ]);

        // Return the validated data
        return $validatedData;
    }

    /**
     * Retrieve all locations.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function locations(Request $request)
    {
        $location = new Location();
        return $location->getLocations();
    }

    /**
     * Amend a location.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function amendLocation(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload avatar if present and store path in database
        $avatarPath = $this->uploadAvatar($request);

        // Separate 'id' from other validated data
        $id = ['id' => $validatedData['id']];
        $remainingData = array_diff_key($validatedData, $id);

        // If an avatar was uploaded, include its path in the data to be stored or updated
        if ($avatarPath) {
            $remainingData['avatar'] = $avatarPath;
        }

        // Modify the location using 'id' and other data
        $location = new Location();
        return $location->modifyLocation($id['id'], $remainingData);
    }

    /**
     * Upload and store the avatar.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    private function uploadAvatar($validatedData): ?string
    {
        if ($validatedData->hasFile('avatar')) {
            $avatar = $validatedData->file('avatar');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('locationImage', $filename); // Store in storage/app/avatars
            return "locationImage" . DIRECTORY_SEPARATOR . $filename;
        }

        return null;
    }
}
