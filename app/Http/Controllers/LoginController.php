<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'ping']);
    }

    public function login(Request $request)
    {
        $this->validateInputs($request);


        if ($this->attemptLogin($request)) {
            $user = auth()->user();
            $role = $user->getUserRoles();
            return response()->json(["userId" => $user->id, "userName" => $user->name, "userRole" => $role]);
        }


        return $this->sendFailedLoginResponse($request);
    }

    public function validateInputs($request)
    {
        $request->validate([
            'email' => ['email', 'required'],
            'password' => ['required']
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        return Auth::attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only('email', 'password');
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function getUser($user)
    {
        return response()->json($user);
    }

    /**
     * Get the failed login response instance.
     *
     * @return loggedIn user session.
     *
     */
    public function ping()
    {
        $user = auth()->user();
        $role = $user->getUserRoles();
        $status = (session("saccess_status")) ? session("saccess_status") : false;
        return response()->json(["userId" => $user->id, "userName" => $user->name, "userRoles" => $role, "status" => $status]);
    }

    /**
     * Get the failed login response instance.
     *
     * @return Logout user session.
     *
     */
    public function logout()
    {
        auth()->guard('web')->logout();
        return response()->json(["messageOut" => "You are logout successfully"]);
    }
}
