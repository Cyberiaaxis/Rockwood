<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Gang;
use App\Models\User;

class WelcomeController extends Controller
{
    /**
     * Get the welcome data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $users = (new User())->getTopPlayers();
        $images = $this->getImages();
        $events = (new Event())->getEvents();
        $gangs = (new Gang())->getGangNames();

        return response()->json([
            "players" => $users,
            "images" => $images,
            "events" => $events,
            "gangs" => $gangs
        ]);
    }

    /**
     * Get the images from the public directory.
     *
     * @return array
     */
    private function getImages()
    {
        $imageDirname = "images/welcome";
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
