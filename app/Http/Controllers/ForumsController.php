<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginationResource;
use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Arr;

class ForumsController extends Controller
{
    /**
     * Forum List
     */
    public function index()
    {
        $forums = new Forum();
        $forumsCount = $forums->whereNull('parent_id')->with('latestPost')->withCount(['threads', 'posts'])->get();
        // dd($forumsCount);
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
