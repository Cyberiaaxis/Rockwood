<?php

namespace App\Http\Controllers;

use App\Models\UserEvent;
use Illuminate\Http\Request;


class UserEventController extends Controller
{
    protected $userEvent;


    public function __construct(UserEvent $userEvent)
    {
        $this->userEvent = $userEvent;   
    }
// auth()->id()
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function userEvents()
    {
        return $this->userEvent->getUserEventsById(auth()->id());
    }

}

