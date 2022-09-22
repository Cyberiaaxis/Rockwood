<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\{Role, Permission};
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
        $role_list = $role->with('permissions')->get();
        $roleResource = new RoleResource($role_list);
        $roles = $roleResource->collection($role_list);
        return response()->json(['roles' => $roles]);
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
        $role = (new StoreService($request))->store(new Role(), $data);
        $permissions =  explode(",", $request->permissions);
        $role->syncPermissions($permissions);
        return response()->json([
            'status' => (($role->status === "1") ? true : false),
            'data' => $role,
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
        $imageName = $this->imageUpload($request);
        $data =  [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ];

        if ($imageName) {
            $data['avatar'] =  $imageName;
        }
        return $data;
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
