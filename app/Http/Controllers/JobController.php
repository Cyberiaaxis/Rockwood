<?php

namespace App\Http\Controllers;

use App\Models\{Job, UserDetail, ItemType, Inventory};
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Arr;
use App\Services\StoreService;
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
    public function Feed(StorePostRequest $request)
    {
        $imageName = $this->imageUpload($request);
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ];

        if ($imageName) {
            $data['avatar'] =  $imageName;
        }

        $service = new StoreService($request);
        $service->setModel(new Job());
        $job = $service->store($data);

        return response()->json([
            'status' => (($job->status === "1") ? true : false),
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
        return $request->validate([
            'name' =>  ['required',  'unique:jobs,name,' . $request->id],
            'image' => ['nullable', 'sometimes', 'mimes:jpg,jpeg,bmp,png'],
            'status' => 'integer',
            'description' => ['nullable', 'sometimes', 'string']
        ]);
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function join(Job $job)
    {
        if ($job->jobNotExists(auth()->id())) {
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
