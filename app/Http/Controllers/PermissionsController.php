<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\{Permission};
use App\Http\Requests\StorePostRequest;
use App\Services\StoreService;
use Laravel\Sanctum\Guard as SanctumGuard;
use Spatie\Permission\Guard;

class PermissionsController extends Controller
{
    /**
     * Display a listing of the permissions.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permission = new Permission();
        return response()->json(['permissions' => $permission->all()]);
    }

    /**
     * Show the form for creating a new resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(StorePostRequest $request)
    {
        $data = $this->handleData($request);
        $data["guard_name"] = "web";
        $permission = (new StoreService($request))->store(new Permission(), $data);
        return response()->json([
            'status' => (($permission->status === "1") ? true : false),
            'data' => $permission,
        ], 201);
    }

    /**
     * validattion of inputs.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return validation result
     */
    public function handleData($request)
    {
        $data =  [
            'name' => $request->name,
            'status' => $request->status,
        ];

        return $data;
    }

    /**
     * Store newly created permissions in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified permission in storage.
     * @param  int  $id \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified permission from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
