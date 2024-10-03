<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\{User, UserStats, UserDetail, Attack, UserTravel};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Class RegistrationController
 *
 * Handles user registration and the creation of associated records in the application.
 * This controller manages the entire signup process, including input validation,
 * user data storage, and the initialization of user-related statistics and details.
 */
class RegistrationController extends Controller
{
    protected User $user;
    protected UserStats $userStats;
    protected UserDetail $userDetail;
    protected Attack $attack;
    protected UserTravel $userTravel;

    /**
     * RegistrationController constructor.
     *
     * Initializes the controller with the necessary model dependencies.
     *
     * @param User $user Instance of the User model for user-related operations.
     * @param UserStats $userStats Instance of the UserStats model for managing user statistics.
     * @param UserDetail $userDetail Instance of the UserDetail model for user details.
     * @param Attack $attack Instance of the Attack model for managing attack records.
     * @param UserTravel $userTravel Instance of the UserTravel model for managing user travel data.
     */
    public function __construct(
        User $user,
        UserStats $userStats,
        UserDetail $userDetail,
        Attack $attack,
        UserTravel $userTravel
    ) {
        $this->user = $user;
        $this->userStats = $userStats;
        $this->userDetail = $userDetail;
        $this->attack = $attack;
        $this->userTravel = $userTravel;
    }

    /**
     * Handles user registration.
     *
     * Validates the incoming request data, hashes the password, and creates
     * the user along with their associated records (stats, details, attacks, and travel).
     *
     * @param Request $request The incoming HTTP request containing user data.
     * @return \Illuminate\Http\JsonResponse JSON response indicating success or failure.
     * @throws \Illuminate\Validation\ValidationException If validation fails.
     */
    public function signup(Request $request): \Illuminate\Http\JsonResponse
    {
        // Validate incoming request data to ensure all required fields are present and correctly formatted
        $validatedData = $this->validateRequestData($request);

        // Hash the user's password for security before storing it
        $validatedData['password'] = Hash::make($validatedData['password']);

        // Create user and their associated records, returning the newly created user's ID
        $userId = $this->createUserWithAssociatedRecords($validatedData);

        // Return a successful JSON response with user information
        return response()->json([
            'success' => true,
            'message' => 'User created successfully!',
            'user_id' => $userId, // Optionally return the newly created user ID
        ], 201);
    }

    /**
     * Validates the registration request data.
     *
     * Ensures that the provided name, email, and password meet the required constraints.
     *
     * @param Request $request The incoming HTTP request containing user data.
     * @return array An associative array of validated data.
     * @throws \Illuminate\Validation\ValidationException If validation fails.
     */
    protected function validateRequestData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'], // Name is required and cannot exceed 255 characters
            'email' => ['required', 'string', 'email', 'unique:users,email'], // Email must be unique and properly formatted
            'password' => ['required', 'string', 'confirmed', 'min:6', 'max:100'], // Password must be confirmed and meet length requirements
        ]);
    }

    /**
     * Creates a new user along with their associated records.
     *
     * This method orchestrates the creation of user statistics, details, attack records,
     * and travel data in addition to the user itself.
     *
     * @param array $validatedData The validated user data.
     * @return int The ID of the newly created user.
     */
    protected function createUserWithAssociatedRecords(array $validatedData): int
    {
        // Store the new user in the database and retrieve their ID
        $userId = $this->user->addUser($validatedData);

        // Create associated user statistics
        $this->userStats->addUserStats($this->initializeUserStats($userId));
        // Create associated user details
        $this->userDetail->addUserDetails($this->initializeUserDetails($userId));
        // Create associated attack records
        $this->attack->addAttackRecords($this->initializeAttackRecord($userId));
        // Create associated travel data
        $this->userTravel->addUserTravel($this->initializeUserTravel($userId));

        return $userId; // Return the newly created user's ID
    }

    /**
     * Initializes user statistics.
     *
     * Sets default values for a new user's statistics upon registration.
     *
     * @param int $userId The ID of the newly created user.
     * @return array An associative array containing user statistics.
     */
    protected function initializeUserStats(int $userId): array
    {
        return [
            'user_id' => $userId,
            'strength' => 100,
            'defense' => 100,
            'agility' => 100,
            'endurance' => 100,
            'hp' => 100,
            'max_hp' => 100,
            'energy' => 10,
            'max_energy' => 10,
            'nerve' => 10,
            'max_nerve' => 10,
            'will' => 100,
            'max_will' => 100,
            'forum_rank_id' => 1,
            'area_id' => 1,
            'fight_club_id' => 0,
        ];
    }

    /**
     * Initializes user details.
     *
     * Sets default values for a new user's details upon registration.
     *
     * @param int $userId The ID of the newly created user.
     * @return array An associative array containing user details.
     */
    protected function initializeUserDetails(int $userId): array
    {
        return [
            'user_id' => $userId,
            'money' => 100, // Starting money
            'points' => 10, // Starting points
            'rank_id' => 1, // Default rank
            'level_id' => 1, // Default level
            'gang_id' => 0, // Default gang
            'realestate_id' => 1, // Default real estate
            'location_id' => 1, // Default location
        ];
    }

    /**
     * Initializes attack records for the new user.
     *
     * Sets default values for attack-related metrics upon user registration.
     *
     * @param int $userId The ID of the newly created user.
     * @return array An associative array containing attack records.
     */
    protected function initializeAttackRecord(int $userId): array
    {
        return [
            'user_id' => $userId,
            'attacks' => 0, // Number of attacks made
            'attacks_success' => 0, // Number of successful attacks
            'defenses' => 0, // Number of defenses made
            'defenses_success' => 0, // Number of successful defenses
            'settlement_attacker' => 0, // Settlements won as attacker
            'settlement_defender' => 0, // Settlements won as defender
            'escaped_attacker' => 0, // Escaped from attackers
            'escaped_defender' => 0, // Escaped from defenders
        ];
    }

    /**
     * Initializes user travel data.
     *
     * Sets default values for the user's travel data upon registration.
     *
     * @param int $userId The ID of the newly created user.
     * @return array An associative array containing user travel data.
     */
    protected function initializeUserTravel(int $userId): array
    {
        return [
            'user_id' => $userId,
            'city_id' => 1, // Default city
            'isAtLocation' => 1, // Indicates if the user is at the location
            'route_id' => 1, // Default route
        ];
    }
}
