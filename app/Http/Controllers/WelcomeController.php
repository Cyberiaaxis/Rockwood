<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Gang;
use App\Models\User;
// use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $user = new User();
        $event = new Event();
        $gangs = new Gang();
        return response()->json([
            "players" => $user->getTopPlayers(),
            "images" => $this->images(),
            "events" => $event->getEvents(),
            "gangs" => $gangs->getGangNames()
        ]);
    }

    private function images()
    {
        $imageDirname = "images/";
        $mediaPath = public_path($imageDirname);
        $filesInFolder = glob($mediaPath . "/*.{jpg,jpeg,png,gif,webp,svg}", GLOB_BRACE);
        $allMedia = [];
        try {
            foreach ($filesInFolder as $path) {
                $files = pathinfo($path);
                $allMedia[] = $imageDirname . '/' . $files['basename'];
            }
        } catch (\Exception $e) {
            $allMedia = [];
        }
        return $allMedia;
    }
}
