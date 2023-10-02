<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginationResource;
use App\Http\Resources\ForumListResource;
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
        $forumsData = $forums->select([
            'id', 'title'
        ])->where('is_cat', 1)->with('subForums')->get();
        return response()->json(ForumListResource::collection($forumsData));
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
