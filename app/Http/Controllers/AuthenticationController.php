<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// https://laravel.com/docs/5.7/authentication#authenticating-users
class AuthenticationController extends Controller
{
    public function signin(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // fetch our user
            $user = User::where('email', $request['email'])->firstOrFail();

            return response()->json([
                'status' => 'success',
                'data' => [
                    /**
                     * We only need the user name and id, don't response with
                     * all their personal information unnecessarily.
                     * Let's only grab their publically available info.
                     */
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                    ]
                ]
            ]);
        }

        return response()->json([
            'status' => 'fail',
            'data' => [
                'email' => 'The provided credentials do not match our records.',
            ]
        ]);
    }
}
