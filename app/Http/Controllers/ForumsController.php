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
        $request->validate(['content' => 'unique:posts,content']);
        $post = new Post();
        $post->create([
            'forum_id' => $request->forum_id,
            'thread_id' => $request->thread_id,
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);
    }

    /**
     * Post Create
     */
    public function postModify(Request $request)
    {
        // dd($request);
        $post = new Post();
        $post->findorFail($request->id)->update(['content' => $request->content]);
        return response()->json($request->content);
    }

    /**
     * Post Create
     */
    public function quotePost(Request $request)
    {

        $posts = new Post();
        $post = $posts->find($request->id);

        $post->create([
            'forum_id' => $post->forum_id,
            'thread_id' => $post->thread_id,
            'user_id' => auth()->id(),
            'parent_id' => $request->id,
            'content' => $request->content,
        ]);
    }

    /**
     * get add like
     */
    public function addLike(Request $request)
    {
        $request->validate([
            'post_id' => ['required', 'integer', 'exists:posts,id']
        ]);

        $post = new Post();
        $post = $post->where('id', $request->post_id);
        $liked = $post->increment('like');
        $liked = $post->value('like');

        return response()->json($liked);
    }

    /**
     * get add like
     */
    public function addDisLike(Request $request)
    {

        $request->validate([
            'post_id' => ['required', 'integer', 'exists:posts,id']
        ]);

        $post = new Post();
        $post = $post->where('id', $request->post_id);
        $liked = $post->increment('dislike');
        $liked = $post->value('dislike');

        return response()->json($liked);
    }
}
