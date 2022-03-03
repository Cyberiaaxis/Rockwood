<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PermissionResource;
use Spatie\Permission\Models\{Permission};

class PermissionsController extends Controller
{
    /**
     * Display a listing of the permissions.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
         $permissions = Permission::orderBy('name')->get();

         if($request->ajax())
         {
             return PermissionResource::collection($permissions);
         }

    return view('staff.permissions.permissions');
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
     * Store newly created permissions in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([ 'permissions' => ['required','array'] ]);

        foreach($request->permissions as $permissionName)
        {
            Permission::firstorCreate(['name' => $permissionName]);
        }

    return response()->json(['success' => true,'msg' => 'Permissions has been created.']);
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
        $request->validate([
            'name' => ['required','unique:permissions,name']
        ]);

        $permission = Permission::findorFail($id);
        $permission->name = $request->input('name');
        $permission->save();
    return response()->json(['success' => true,'msg' => 'Permission has been updated']);
    }

    /**
     * Remove the specified permission from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = Permission::findorFail($id);
        $permission->delete($id);
    return response()->json(['success' => true, 'msg' => 'Permission has been deleted']);
    }
}
