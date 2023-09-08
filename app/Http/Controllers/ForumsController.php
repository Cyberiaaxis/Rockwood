<?php

namespace App\Http\Controllers\Forums;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaginationResource;
use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Arr;

class ForumController extends Controller
{
    /**
     * Forum List
     */
    public function index()
    {
        $forums = new Forum();
        $forumsCount = $forums->with('latestPost')->withCount(['threads', 'posts'])->get();
        return response()->json($forumsCount);
    }

    /**
     * Thread List
     */
    public function threadList(Forum $forum)
    {

        $forum->loadCount(['threads', 'posts']);

        $threads = $forum->threads()->paginate(30);

        $forum->threads = new PaginationResource($threads);

        return $forum;
    }

    /**
     * Posts List
     */
    public function postList(Thread $thread)
    {

        $posts = $thread->posts()->paginate(30);

        $thread->posts = new PaginationResource($posts);

        return $thread;
    }
}
