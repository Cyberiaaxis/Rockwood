<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Spatie\Permission\Models\{Role, Permission};

class RolesController extends Controller
{
    /**
     * Display a listing of the roles.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = Role::with('permissions')->orderBy('name')->get();

        if($request->ajax())
        {
            return RoleResource::collection($roles);
        }

    return view('staff.roles.role');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created role with save assign permissions in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required','unique:roles,name'],  'description' => ['required'],  'status' => ['required','integer']
        ]);
        $role = Role::create([  'name' => $request->name,
                                'description' => $request->description,
                                'status' => $request->status,
                                'updated_at' => now(),
                                'created_at' => now()

                            ]);
        $role->syncPermissions($request->permissions);
    return response()->json(['success' => true, 'status' => true, 'msg' => 'Role has been created successfully','role' => $role]);
    }

    /**
     * Display the specified role.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing.
     * @param  Request $request, Role $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Role $role)
    {
        $permissions = Permission::orderBy('name')->get();
    return view('staff.roles.edit', ['permissions' => $permissions, 'role' => $role]);
    }

    /**
     * Update the specified role in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  Request $request, int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
             'name' => ['required','exists:roles,name'],
             'description' => ['required'],
             'status' => ['nullable','integer'],
             'permissions' => ['required','array']
         ]);
        $role = Role::findorFail($id);
        $input = $request->except(['url', 'method', 'csrfToken','permissions']);
        $input['status'] = $request->input('status',0);
        $role->fill($input)->save();
        $role->syncPermissions($request->permissions);
    return response()->json(['success' => true,'msg' => 'Role has been updated']);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::findorFail($id);
        $role->delete($id);
    return response()->json(['success' => true, 'msg' => 'Role has been deleted']);
    }
}
