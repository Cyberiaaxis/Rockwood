<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// ['middleware' => ['auth:sanctum', 'role:admin|editor']],


$router->get('rightList', 'App\Http\Controllers\LandingPageController@rightList');
$router->get('leftList', 'App\Http\Controllers\LandingPageController@leftList');
$router->post('auth/login', 'App\Http\Controllers\LoginController@login');
$router->post('/register', 'App\Http\Controllers\RegistrationController@signup');
// dd();
// $router->prefix('staff')->namespace('Staff')->middleware(['auth:sanctum', 'role:admin|editor'])->group(function ($router) {
//     // $router->get('/', 'DashboardController');
//     // $router->post('/login', 'App\Http\Controllers\LoginController@login');
//     });

$router->group(['middleware' => 'auth:sanctum'], function($router){
    $router->get('/auth/logout', 'App\Http\Controllers\LoginController@logout');
    $router->get('/home', 'App\Http\Controllers\HomeController@index');
    // i think the 'ping' should go here? so it only works when authenticated
    $router->get('/ping', 'App\Http\Controllers\LoginController@ping');
    $router->get('/saccess', 'App\Http\Controllers\UsersController@AddSaccessStatus');
    $router->get('/rsaccess', 'App\Http\Controllers\UsersController@RemoveSaccessStatus');

    //i am can do anthing if i got login form for login first
    //lets try
//lets compile and see what happens now
//ok

});
