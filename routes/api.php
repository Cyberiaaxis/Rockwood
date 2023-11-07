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
$router->get('welcomelist', 'App\Http\Controllers\WelcomeController');
$router->post('auth/login', 'App\Http\Controllers\LoginController@login');
$router->post('/register', 'App\Http\Controllers\RegistrationController@signup');
// dd();
// $router->prefix('staff')->namespace('Staff')->middleware(['auth:sanctum', 'role:admin|editor'])->group(function ($router) {
//     // $router->get('/', 'DashboardController');
//     // $router->post('/login', 'App\Http\Controllers\LoginController@login');
//     });

$router->group(['middleware' => 'auth:sanctum'], function ($router) {
    $router->get('/auth/logout', 'App\Http\Controllers\LoginController@logout');
    $router->get('/home', 'App\Http\Controllers\HomeController@index');
    // i think the 'ping' should go here? so it only works when authenticated
    $router->get('/ping', 'App\Http\Controllers\LoginController@ping');
    $router->get('/saccess', 'App\Http\Controllers\UsersController@AddSaccessStatus');
    $router->get('/rsaccess', 'App\Http\Controllers\UsersController@RemoveSaccessStatus');
    $router->get('/users', 'App\Http\Controllers\UsersController@index');
    $router->post('/saveRank', 'App\Http\Controllers\RanksController@feed');
    $router->get('/ranks', 'App\Http\Controllers\RanksController@index');
    $router->get('/roles', 'App\Http\Controllers\RolesController@index');
    $router->get('/jobs', 'App\Http\Controllers\JobController@index');
    $router->get('/real_estates', 'App\Http\Controllers\RealEstateController@index');
    $router->post('/saveRealEstate', 'App\Http\Controllers\RealEstateController@feed');
    $router->post('/saveJob', 'App\Http\Controllers\JobController@feed');
    // $router->post('/saveRank', 'App\Http\Controllers\RankController@update');`
    $router->post('/saveUsers', 'App\Http\Controllers\UsersController@Feed');
    $router->post('/saveRole', 'App\Http\Controllers\RolesController@Feed');
    $router->get('/shops', 'App\Http\Controllers\ShopsController@index');
    $router->post('/saveShop', 'App\Http\Controllers\ShopsController@feed');
    $router->get('/gangs', 'App\Http\Controllers\ShopsController@index');
    $router->post('/saveGang', 'App\Http\Controllers\ShopsController@feed');
    $router->get('/courses', 'App\Http\Controllers\ShopsController@index');
    $router->post('/saveCourse', 'App\Http\Controllers\ShopsController@feed');
    $router->get('/permissions', 'App\Http\Controllers\PermissionsController@index');
    $router->post('/savePermission', 'App\Http\Controllers\PermissionsController@feed');
    $router->get('/roleWithPermissions', 'App\Http\Controllers\RolesController@getAllPermissionOfRole');
    $router->post('/saveRolePermissions', 'App\Http\Controllers\RolesController@permissionsToRole');
    $router->get('/rolesPermissions', 'App\Http\Controllers\RolesController@permissionsAndRoles');
    $router->get('/cities', 'App\Http\Controllers\CitiesController@index');
    $router->post('/saveCity', 'App\Http\Controllers\ShopsController@feed');
    $router->get('/countries', 'App\Http\Controllers\CountryController@index');
    $router->post('/saveCountry', 'App\Http\Controllers\ShopsController@feed');
    // $router->get('/', 'ForumController@index')->name('forums.list');
    $router->get('/forum/{forum}', 'App\Http\Controllers\ForumsController@threadList')->name('forums.show')->where('forum', '[0-9]+');
    $router->get('/thread/{thread}', 'App\Http\Controllers\ForumsController@postList')->name('forums.thread')->where('thread', '[0-9]+');
    $router->post('/savePost', 'App\Http\Controllers\ForumsController@postCreate')->name('forums.savePost');
    $router->post('/thread/create', 'App\Http\Controllers\ForumsController@threadCreate')->name('forums.thread.create')->where('thread', '[0-9]+');
    $router->get('/forums', 'App\Http\Controllers\ForumsController@index')->name('forums.list');
});
