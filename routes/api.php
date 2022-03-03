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

// Route::post('/signin', [AuthenticationController::class, 'signin']);

// /**
//  * Tests
//  */
//  Route::get('/test0', function (Request $request) {
//      return [
//          'status' => 'success',
//          'data' => [
//              'hello' => 'This is the a basic test ZERO'
//          ]
//      ];
//  });

//  Route::post('/test1', function (Request $request) {
//      return [
//          'status' => 'success',
//          'data' => [
//              'hello' => 'This is the FIRST test'
//          ]
//      ];
//  });

// Route::middleware('auth:sanctum')->get('/test2', function (Request $request) {
//     return [
//         'status' => 'success',
//         'data' => [
//             'hello' => 'This is the SECOND test. We do not need this'
//         ]
//     ];
// });

// Route::middleware('auth:sanctum')->post('/test3', function (Request $request) {
//     return [
//         'status' => 'success',
//         'data' => [
//             'hello' => 'This is the THIRD test'
//         ]
//     ];
// });

// Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
//     return $request->user();
// });
// dd($router);
$router->get('rightList', 'App\Http\Controllers\LandingPageController@rightList');
$router->get('leftList', 'App\Http\Controllers\LandingPageController@leftList');
$router->post('auth/login', 'App\Http\Controllers\LoginController@login');
$router->post('/register', 'App\Http\Controllers\RegistrationController@signup');
$router->get('/ping', 'App\Http\Controllers\LoginController@ping');


$router->group(['middleware' => ['auth:sanctum']], function($router){
    $router->get('/home', 'App\Http\Controllers\HomeController@index');
});
