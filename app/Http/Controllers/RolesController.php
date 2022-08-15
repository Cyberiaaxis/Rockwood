<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\{Role, Permission};

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
        return response()->json(['roles' => $role->all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $role = new Role();
        $this->validateInputs($request);
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ];
        $result = $role->updateOrCreate([
            'id' => $request->id
        ], $data);

        return response()->json([
            'status' => true,
            'message' => 'Successfully saved role!',
            'data' => $result,
        ], 201);
    }

    /**
     * Store a newly created role with save assign permissions in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validateInputs($request)
    {
        $id = (int)$request->id;

        $name = ($id > 0) ? ['required', 'min:3'] : ['required', 'min:3', 'unique:roles' ];
        return $request->validate([
            'name' =>  $name,
            'status' => 'boolean',
            'description' => ['nullable', 'sometimes', 'string'],
        ]);
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
