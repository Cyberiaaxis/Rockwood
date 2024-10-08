<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\{Role, Permission};
use Hash;
use Carbon\Carbon;
use App\Http\Resources\UserResource;
use App\Models\{UserTravel, TravelRoute, UserDetail, User, UserStats};
use Exception;
use Illuminate\Support\Arr;


class UsersController extends Controller
{

    private $nerveRequired;

    /**
     * Instantiate a new UserController instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the users.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = new User();
        $user_list = $users->with('roles')->orderBy('name')->get();
        $roleResource = new UserResource($user_list);
        $user_list = $roleResource->collection($user_list);

        return response()->json(['users' => $user_list]);
    }

    /**
     * Display a listing of the users.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function getUsers()
    // {
    //     $users = new User();
    //     $usersList = $users->all();
    //     return response()->json(['users' => $usersList]);
    // }


    /**
     * Store request and sync it as well with a resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function feed(Request $request)
    {

        $request->validate([
            'id' => ['required'],
            'name' => ['required', 'string'],
            'roles' => ['string'],
        ]);

        $data = $this->handleData($request);
        $user = new user();

        $userStored = $user->updateOrCreate([
            'id' => $data['id'],
        ], Arr::except($data, 'roles'));

        $msg = 'No Changes were made.';

        if ($userStored) {

            $userStored->syncRoles($data['roles']);

            $msg = "new changes were applied";
        }

        $userResource = new UserResource($user->findOrFail($data['id']));

        return response()->json(["message" => $msg, 'data' => $userResource], 201);
    }


    /**
     * validation of inputs.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return array
     */
    public function handleData($request)
    {
        $data =  [
            'id' => $request->id,
            'name' => $request->name,
            'status' => $request->has('status') ? true : false,
            'roles' => explode(",", $request->roles),
        ];
        // dd($request->hasFile('image'));
        if ($request->hasFile('image')) {

            try {
                $extension = $request->file('image')->extension();
                $path = $request->file('image')->storeAs('images', $request->id . '.' . $extension);

                $data['avatar'] = $path;
            } catch (\Exception $e) {
                return $e->getMessage();
            }
        }
        // dd($data);
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:120',
            'gender' => 'required',
            'type' => 'required',
            'password' => 'required',
            'email' => 'required|email|unique:users,email',
            'roles' => "required|array",
        ]);
        $password = Hash::make($request->password);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password,
            'gender' => $request->gender,
            'type' => $request->type,
        ]);
        $user->syncRoles($request->roles);
        return response()->json(['success' => true, 'msg' => 'User has been created.']);
    }

    /**
     * Display the specified resource.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $profile)
    {
        $now =  Carbon::now();
        return view('player.profile', ['user' => $profile, 'currentdatetime' => $now]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $roles = Role::all();
        $user = User::findorFail($id);
        return view('staff.users.edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request, int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:120',
            'email' => 'required|email|exists:users,email',
            'roles' => "required|array",
            'type' => 'required',
            'gender' => 'required',
        ]);
        $user = User::findorFail($id);
        $input = $request->except(['url', 'method', 'csrfToken', 'roles']);
        $user->fill($input)->save();
        $user->syncRoles($request->roles);
        return response()->json(['success' => true, 'msg' => 'User has been updated']);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['success' => true, 'msg' => 'User has been deleted']);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUser($id) {}

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addTravel($travelroute)
    {
        $userTravel = new UserTravel();
        $userTravel->addUserTravel(auth()->user()->id, $travelroute->destination);
        $userDetails = new UserDetail();
        $userDetails->changeTravelStatus(auth()->user()->id, $travelroute->destination);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function startTravel(TravelRoute $travelroute)
    {
        $userDetails = new UserDetail();

        if ($userDetails->getLocation(auth()->user()->id) === $travelroute->destination) {
            return "You are already on destination";
        }

        $newTime = $this->addTravelTime($travelroute->duration);
        return $userDetails->changeTravelStatus(auth()->user()->id, $travelroute->destination, $newTime);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function endTravel(TravelRoute $travelroute)
    {
        $carbon = new Carbon();
        $userDetails = new UserDetail();
        $this->verifyReaminTravelTime($userDetails, $carbon);
        $this->addTravel($travelroute);
        return $userDetails->changeTravelStatus(auth()->user()->id, $travelroute->destination);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addTravelTime($duration)
    {
        $carbon = new Carbon();
        return $carbon->now();
        return $carbon->now()->addMinutes($duration);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function verifyReaminTravelTime($userDetails, $carbon)
    {
        if ($userDetails->getReaminTravelTime(auth()->user()->id) > $carbon->now()) {
            return true;
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function bust(UserDetail $userDetails)
    {
        $carbon = new Carbon();
        $user = new User();
        $userStats = new UserStats();
        $this->canBust($userStats, $userDetails);
        $addDuration = $carbon->now()->addMinutes(mt_rand(0, 60));
        return  $this->chanceBust($userDetails, $user, $userStats, $carbon, $experince = 100);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function chanceBust($userDetails, $user, $userStats, $addDuration, $experince)
    {
        $randomChance = mt_rand(0, 100);

        if ($randomChance >= 0 && $randomChance <= 25) {
            $this->successBust($userDetails, $userStats, $experince);
            return "You bust successfully " . $user->getUserNameById($userDetails->user_id);
        }

        if ($randomChance >= 26 && $randomChance <= 50) {
            $this->failBust($userDetails, $userStats, $experince, $addDuration);
            return "You failed in bust to " . $user->getUserNameById($userDetails->user_id);
        }

        return "You missed in bust to " . $user->getUserNameById($userDetails->user_id);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function failBust($userDetails, $userStats, $experince, $datetime)
    {
        $userDetails->failbuster(auth()->user()->id, $datetime);
        $userStats->decrementBustExperince(auth()->user()->id, $experince);
    }


    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function successBust($userDetails, $userStats, $experince)
    {
        $userDetails->busted($userDetails->user_id);
        $userStats->incrementBustExperince(auth()->user()->id, $experince);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function canBust($userStats, $userDetails)
    {
        $haveNerve = $userStats->haveNerve(auth()->user()->id);
        $requireNerve = (int) round($userStats->maxNerve(auth()->user()->id) / 2);

        if ($userDetails->getJailTime($userDetails->user_id) === NULL) {
            throw new Exception("You can't bust a non jailed player");
        }

        if ($haveNerve < $requireNerve) {
            throw new Exception("You don't have enough nerve to bust any");
        }

        return $userStats->decrementNerve(auth()->user()->id, $requireNerve);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function AddSaccessStatus()
    {
        session()->put('saccess_status', true);
        return true;
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function RemoveSaccessStatus()
    {
        session()->put('saccess_status', false);
        return 'false';
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function OnlinePlayers(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'timeData' => ['required', 'integer', 'min:1', 'max:1440'], // Ensure timeData is a required integer greater than or equal to 1
        ]);
        $timeData = $validated['timeData'];
        $futureDateTime = Carbon::now()->subMinutes($timeData);
        $futureDateTimeString = $futureDateTime->toDateTimeString();

        // Fetch users based on the calculated time
        $user = new User();
        $usersList = $user->getUsersOnlineTimeBasis($futureDateTimeString);

        // Define the mapping for activity status
        $statusMapping = [
            'online'  => 15,   // Online if last seen within the last 15 minutes
            'idle'    => 60,   // Idle if last seen within the last hour
        ];

        // Add timeUnit and status to each user record
        $formattedData = array_map(function ($user) use ($statusMapping) {
            $lastSeenDiffInMinutes = Carbon::parse($user['last_seen'])->diffInMinutes();

            // Determine the user's activity status
            $user['activity_status'] = $lastSeenDiffInMinutes <= $statusMapping['online'] ? 'Online' : ($lastSeenDiffInMinutes <= $statusMapping['idle'] ? 'Idle' : 'Offline');

            // Format the 'last_seen' field to be human-readable
            $user['last_seen'] = Carbon::parse($user['last_seen'])->diffForHumans();
            return $user;
        }, $usersList);

        return response()->json($formattedData);
    }



    // public function heal(UserDetail $userDetails)
    // {
    //     $carbon = new Carbon();
    //     $user = new User();
    //     $userStats = new UserStats();
    //     $this->canHeal($userStats, $userDetails);
    //     $addDuration = $carbon->now()->addMinutes(mt_rand(0, 60));
    //     return  $this->chanceBust($userDetails, $user, $userStats, $carbon, $experince = 100);
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function canHeal($userStats, $userDetails)
    // {
    //     $haveNerve = $userStats->haveNerve(auth()->user()->id);
    //     $requireNerve = (int) round($userStats->maxNerve(auth()->user()->id) / 2);

    //     if ($userDetails->hospitalTime($userDetails->user_id) === NULL) {
    //         throw new Exception("You can't bust a non jailed player");
    //     }

    //     //other conditions after get more information
    //     // if ($haveNerve < $requireNerve) {
    //     //     throw new Exception("You don't have enough nerve to bust any");
    //     // }

    //     // return $userStats->decrementNerve(auth()->user()->id, $requireNerve);
    // }


}
