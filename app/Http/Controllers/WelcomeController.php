<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
// use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $user = new User();
        $event = new Event();
        return response()->json([
            "players" => $user->getTopPlayers(),
            "images" => $user->getTopPlayers(),
            "events" => $event->getEvents()
        ]);
    }
}
