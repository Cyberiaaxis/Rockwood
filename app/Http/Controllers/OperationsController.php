<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\{Permission, Role};


class OperationsController extends Controller

{

    /**
     * Show Role & Permissions
     */
    public function show(Request $request, $id)
    {

        $role = Role::findorFail($id);

        if ($request->ajax()) {
            return $role->permissions;
        }

        return view('operations.operations', ['role' => $role]);
    }
    /**

     * Create Permissions for Role

     */

    public function createPermission(Request $request,$id)

    {
        $request->validate([
            'permissions' => ['required', 'array'],
            //'permissions.*' => ['unique:permissions,name']
        ]);
        $role = Role::findorFail($id);
        $role->syncPermissions($request->permissions);
        return response()->json(['success' => true, 'msg' => 'Permissions has been attached to role.']);
    }

    /**
     * Remove Permissions
     */
    public function removePermission(Request $request, $id)
    {
        $role = Role::findorFail($id);
        $request->validate([
            'name' => ['required', 'exists:permissions,name']
        ]);
        $permission = $request->input('name');
        $permission = Permission::findByName($permission);
        $role->revokePermissionTo($permission);
        return response()->json(['success' => true, 'msg' => 'Permission has been revoked from Role']);
    }

}
