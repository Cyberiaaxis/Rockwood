<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;

class ForumsController extends Controller
{
    /**
     * Forum List
     */
    public function index()
    {
        $forums = new Forum();
        $forumsCount = $forums->withCount(['threads', 'posts'])->get();
        // dd($forumsCount);
        return view('player.forums.index',['forums' => $forumsCount]);
    }

    /**
     * Forum List
     */
    public function show(Forum $forum)
    {
        return view('player.forums.show', ['forum' => $forum]);
    }

    // /**
    //  * Forum List
    //  */
    // public function create()
    // {
    //     return view('player.forums.create');
    // }

    /**
     * Forum List
     */
    public function store(Request $request)
    {

    }

}
