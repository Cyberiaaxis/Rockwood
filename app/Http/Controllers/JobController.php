<?php

namespace App\Http\Controllers;

use App\Models\ {Job, UserDetail,ItemType, Inventory };
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function join(Job $job)
    {
        if($job->jobNotExists(auth()->id())){
             $job = $job->saveNewJob(auth()->id(), $job->id);
             return "Congratulations for new joining";
        }

    return "You are not unemployed";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function leave()
    {
        $job = new Job();
        $job->jobLeave(auth()->id());

    return "Now, you are unemployed";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function getJobBenefit()
    {
        $job = new Job();
        $foods = $job->getFoods();
        $itemTypeAtrributes = $job->getTypeAttributes($foods);
        $items = $job->getItems($itemTypeAtrributes);
        $arr = new Arr();
        $random = $arr->random($items->toArray());
        $userItem = new Inventory();
        dd($userItem->incrementItem(auth()->user()->id, $random['id']));
    }


}
