<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use Spatie\Permission\Models\{Permission};
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Arr;

class RolesController extends Controller
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
        $roleSaved = $role->storeRole(Arr::except($data, 'permissions'));
        $roleSaved->syncPermissions($data['permissions']);

        $roleResource = new RoleResource($roleSaved);

        return response()->json(['data' => $roleResource], 201);
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
