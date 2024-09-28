<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Gang;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

/**
 * Class WelcomeController
 *
 * This controller handles the retrieval of welcome data for the application,
 * including top players, images, events, and gang names.
 */
class WelcomeController extends Controller
{
    /**
     * Invoke the welcome data retrieval.
     *
     * This method returns a JSON response containing the following:
     * - players: The top players retrieved from the User model.
     * - images: A list of image paths from the public directory.
     * - events: The events retrieved from the Event model.
     * - gangs: The gang names retrieved from the Gang model.
     *
     * @return JsonResponse The JSON response with welcome data.
     */
    public function __invoke(): JsonResponse
    {
        $users = (new User())->getTopPlayers();
        $images = $this->getImages();
        $events = (new Event())->getEvents();
        $gangs = (new Gang())->getGangNames();

        return response()->json([
            'players' => $users,
            'images' => $images,
            'events' => $events,
            'gangs' => $gangs,
        ]);
    }

    /**
     * Retrieve the images from the public directory.
     *
     * This method scans the specified directory for image files (JPEG, PNG, GIF, WEBP, SVG)
     * and returns an array of image paths.
     *
     * @return array Array of image paths relative to the public directory.
     */
    private function getImages(): array
    {
        $imageDirname = 'images/welcome';
        $mediaPath = public_path($imageDirname);
        $filesInFolder = glob($mediaPath . '/*.{jpg,jpeg,png,gif,webp,svg}', GLOB_BRACE);
        $allMedia = [];

        try {
            foreach ($filesInFolder as $path) {
                $files = pathinfo($path);
                $allMedia[] = $imageDirname . '/' . $files['basename'];
            }
        } catch (\Exception $e) {
            // Optionally log the exception
            \Log::error('Error retrieving images: ' . $e->getMessage());
            $allMedia = [];
        }

        return $allMedia;
    }
}
