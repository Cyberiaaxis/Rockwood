<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class StaffsController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index(Request $request)
    {

        if($request->ajax())
        {
            return response()->json(['role' => Role::orderBy('name')->get()]);
        }

    return view('staff.dashboard');
    }
}