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
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'ping']);
    }

    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $this->validateInputs($request);

        if ($this->attemptLogin($request)) {
            $user = auth()->user();
            $user->last_seen = now();
            $user->save();

            return response()->json(['userId' => auth()->id()]);
        }

        return $this->sendFailedLoginResponse($request);
    }



    /**
     * Validate user input.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function validateInputs(Request $request)
    {
        $request->validate([
            'email' => ['email', 'required', 'exists:users'],
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
     * Get the logged-in user details.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser($user)
    {
        return response()->json($user);
    }

    /**
     * Ping to check the user's authentication status.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ping()
    {
        $user = auth()->user();
        $user->last_seen = now();
        $user->save();
        $role = $user->getUserRoles();
        $status = (session("saccess_status")) ? session("saccess_status") : false;
        return response()->json(["userId" => $user->id, "userName" => $user->name, "lastSeen" => $user->last_seen, "userRoles" => $role, "status" => $status]);
    }

    /**
     * Logout the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->guard('web')->logout();
        return response()->json(["messageOut" => "You have been logged out successfully"]);
    }
}
