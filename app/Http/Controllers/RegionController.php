<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    protected $region;

    /**
     * Constructor for RegionController.
     *
     * @param Region $region The Region model instance
     */
    public function __construct(Region $region)
    {
        $this->region = $region;
    }

    /**
     * Create a new region.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeRegion(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload avatar if present and store path in database
        $avatarPath = $this->uploadAvatar($request);

        // Add avatar path to validated data
        if ($avatarPath) {
            $validatedData['avatar'] = $avatarPath;
        }

        // Create a new region record
        $this->region->addRegion($validatedData);

        // Return a response indicating success
        return response()->json([
            'message' => 'Region with name ' . $validatedData['name'] . ' created successfully',
            'region' => $validatedData
        ], 201);
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return array
     */
    private function validateAndVerifyRequestData(Request $request): array
    {
        // Define validation rules
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'country_id' => ['required', 'integer'],
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

        // Return the validated data
        return $validatedData;
    }

    /**
     * Retrieve all regions.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return \Illuminate\Http\JsonResponse
     */
    public function regions(Request $request)
    {
        $regions = $this->region->getAllRegions();
        // Return the organized locations
        return response()->json($regions);
    }

    /**
     * Amend a region.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return \Illuminate\Http\JsonResponse
     */
    public function amendRegion(Request $request)
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

        // Modify the region using 'id' and other data
        return $this->region->modifyRegion($id['id'], $remainingData);
    }

    /**
     * Upload and store the avatar.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
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
