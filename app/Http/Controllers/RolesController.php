<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use Spatie\Permission\Models\{Permission};
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\RoleResource;
use App\Services\StoreService;

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
            'permissions' => explode(",", $request->permissions),
        ];

        return $data;
    }

    /**
     * Display the specified role.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAllPermissionOfRole()
    {
        $role = new Role();
        return $role->with(['permissions' => function ($q) {
            return $q->pluck('name');
        }])->get(['id', 'name']);
    }

    /**
     * Show the form for editing.
     * @param  Request $request, Role $role
     * @return \Illuminate\Http\Response
     */
    public function permissionsToRole(Request $request, Role $role, Permission $permissions)
    {
        $role->syncPermissions($request->permissions);
        $permissions->syncRoles($request->roles);
    }


    /**
     * Show the form for editing.
     * @param  Request $request, Role $role
     * @return \Illuminate\Http\Response
     */
    public function permissionsAndRoles()
    {
        $role = new Role();
        $roles = $role->all(['id', 'name']);
        $permission = new Permission();
        $permissions = $permission->all(['id', 'name']);
        return response()->json(['rolePermission' => $roles, 'permissions' => $permissions]);
    }

    /**
     * Update the specified role in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  Request $request, int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
