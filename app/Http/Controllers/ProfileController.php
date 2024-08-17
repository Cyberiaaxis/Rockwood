<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Gang, Level, Rank, User, UserDetail};

class ProfileController extends Controller
{
    /**
     * Retrieve the details of a player by their ID.
     *
     * @param \Illuminate\Http\Request $request The current request instance.
     * @return \Illuminate\Http\JsonResponse The player details or an error message.
     */
    public function getPlayerDetails(Request $request)
    {
        // Extract the player ID from the request
        // dd($request);

        // Initialize model instances
        $user = new User();
        $userDetail = new UserDetail();
        $rank = new Rank();
        $level = new Level();
        $gang  = new Gang();

        // Retrieve player details
        $userName = $user->getUserNameById($request->playerId);
        $userRank = $rank->getRankById($userDetail->getRankId($request->playerId));
        $gangName = $gang->getGangNameById($userDetail->getGangId($request->playerId));
        $userLevel = $level->getLevelById($userDetail->getLevelId($request->playerId));
        $userAge = $user->getAge($request->playerId);

        // Return the player details as JSON
        return response()->json([
            'userName' => $userName,
            'rank' => $userRank,
            'gang_name' => $gangName,
            'level' => $userLevel,
            'age' => $userAge,
        ]);
    }
}
