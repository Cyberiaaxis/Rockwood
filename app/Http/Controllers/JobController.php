<?php

namespace App\Http\Controllers;

use App\Models\ {Job, UserDetail,ItemType, Inventory };
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Throwable;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $job = new Job();
        return response()->json(['jobs' => $job->all()]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(Request $request)
    {
        // return $request;
        $this->dataValidate($request);
        $imageName = $this->imageUpload($request);
        $job = $this->store($request, $imageName);
        return response()->json([
            'status' => true,
            'message' => 'Successfully saved rank!',
            'data' => $job,
        ], 201);
    }

    /**
     * validattion of inputs.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return validation result
     */
    public function dataValidate($request)
    {
        try {
            return $request->validate([
                'name' =>  ['required', 'unique:ranks,name'],
                'image' => ['nullable', 'sometimes', 'mimes:jpg,jpeg,bmp,png'],
                'status' => 'boolean',
                'description' => ['nullable', 'sometimes', 'string']
            ]);
        } catch (Throwable $e) {
            report($e);
            return false;
        }
    }

    /**
     * upload the file.
     * @param  \Illuminate\Http\Request  $request
     * @return string as images name
     */
    public function imageUpload($request)
    {
        $fileExists = $request->hasFile('image');

        if ($fileExists) {
            $file = $request->file('image');
            $fileName = $file->getClientOriginalName();
            $ext = $file->extension();
            $path =  $file->storeAs('images', $request->id . '.' . $ext);
            return $path;
        }

        return false;
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function store($request, $imageName = null)
    {

        try {
            $job = new Job();

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }

            return $job->updateOrCreate([
                'id' => $request->id
            ], $data);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
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
