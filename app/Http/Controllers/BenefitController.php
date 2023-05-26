<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BenefitController extends Controller
{
    /**
     * Display a listing of the roles.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $role = new Role();
        $role_list = $role->getRoles();
        $roleResource = new RoleResource($role_list);
        $roles = $roleResource->collection($role_list);
        return response()->json(['roles' => $roles]);
    }

    /**
     * Store request and sync it as well with a resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Feed(StorePostRequest $request)
    {
        $data = $this->handleData($request);
        $role = new Role();
        // dd($data);
        $roleSaved = $role->storeRole($data);
        $roleSaved->syncPermissions($data['permissions']);

        return response()->json([
            'data' => $roleSaved,
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
            'id' => $request->id,
            'name' => $request->name,
            'status' => $request->status,
            'permissions' => explode(",", $request->permissions),
        ];

        return $data;
    }
}
