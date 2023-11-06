<?php

namespace App\Http\Controllers;

use App\Http\Resources\ForumListResource;
use App\Http\Resources\PaginationResource;
use App\Http\Resources\PostsPaginationResource;
use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\Post;
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
        $forumsCount = $forums->select(['id', 'title'])->where('is_cat', 1)->with('subForums')->get();

        return response()->json(ForumListResource::collection($forumsCount));
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
        return [
            'id' => $thread->id,
            'title' => $thread->title,
            'description' => $thread->description,
            'forum_id' => $thread->forum_id,
            'user_id' => $thread->user_id,
            "sticky" => $thread->sticky,
            "locked" =>  $thread->locked,
            'posts' => new PostsPaginationResource($thread->posts()->paginate(30)),
        ];
    }

    /**
     * Thread Create
     */
    public function threadCreate(Request $request)
    {

        $request->validate([
            'forum_id' => ['integer', 'exists:forums,id', 'required'],
            'title' => ['string', 'required', 'unique:threads,title'],
            'content' => ['string', 'required']
        ]);

        $thread = new Thread();
        $threadFetched = $thread->firstOrCreate([
            'title' => $request->title
        ], [
            'forum_id' => $request->forum_id,
            'user_id' => auth()->id(),
            'title' => $request->title,
        ]);



        $post = new Post();

        $post->create([
            'forum_id' => $request->forum_id,
            'thread_id' => $threadFetched->id,
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);


        return $request->all();
    }

    /**
     * Post Create
     */
    public function postCreate(Request $request)
    {

        $post = new Post();
        $post->create([
            'forum_id' => $request->forum_id,
            'thread_id' => $request->thread_id,
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);
    }
}
