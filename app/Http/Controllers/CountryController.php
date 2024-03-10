<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    protected $country;

    /**
     * Create a new instance of CountryController.
     *
     * @param  \App\Models\Country  $country
     * @return void
     */
    public function __construct(Country $country)
    {
        $this->country = $country;
    }

    /**
     * Create a new country.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeCountry(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload avatar if present and store path in database
        $avatarPath = $this->uploadAvatar($request);

        // Add avatar path to validated data
        if ($avatarPath) {
            $validatedData['avatar'] = $avatarPath;
        }

        // Create a new country record
        $this->country->addCountry($validatedData);

        // Return a response indicating success
        return response()->json([
            'message' => 'Country with name ' . $validatedData['name'] . ' created successfully',
            'country' => $validatedData
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
     * Retrieve all countries.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountries(Request $request)
    {
        $countries = $this->country->getAllCountries();
        // Return the organized countries
        return response()->json($countries);
    }

    /**
     * Amend a country.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function amendCountry(Request $request)
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

        // Modify the country using 'id' and other data
        return $this->country->modifyCountry($id['id'], $remainingData);
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
