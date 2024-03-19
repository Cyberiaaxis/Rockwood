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


// $router->get('rightList', 'LandingPageController@rightList');
// $router->get('leftList', 'LandingPageController@leftList');
$router->get('welcomelist', 'WelcomeController');
$router->post('auth/login', 'LoginController@login');
$router->post('/register', 'RegistrationController@signup');
// dd();
// $router->prefix('staff')->namespace('Staff')->middleware(['auth:sanctum', 'role:admin|editor'])->group(function ($router) {
//     // $router->get('/', 'DashboardController');
//     // $router->post('/login', 'LoginController@login');
//     });  php artisan make:model ItemCategory

$router->group(['middleware' => 'auth:sanctum'], function ($router) {
    $router->get('/auth/logout', 'LoginController@logout');
    $router->get('/home', 'HomeController@index');
    $router->get('/userevents', 'UserEventController@userEvents');
    $router->post('/addLocation', 'LocationController@makeLocation');
    $router->get('/composeMail', 'MailController@composeMail');
    $router->post('/mailSent', 'MailController@mailSent');
    $router->get('/getItems', 'ItemController@getItemLists');
    $router->post('/addItem', 'ItemController@createItem');
    $router->post('/modifyItem', 'ItemController@updateItem');
    $router->get('/routes', 'TravelRoutesController@routes');
    $router->post('/addRoute', 'TravelRoutesController@configureRoute'); 
    $router->post('/amendLocation', 'LocationController@amendLocation');
    // i think the 'ping' should go here? so it only works when authenticated
    $router->get('/ping', 'LoginController@ping');
    $router->get('/saccess', 'UsersController@AddSaccessStatus');
    $router->get('/rsaccess', 'UsersController@RemoveSaccessStatus');
    $router->get('/users', 'UsersController@index');
    $router->post('/saveRank', 'RanksController@feed');
    $router->get('/ranks', 'RanksController@index');
    $router->get('/header', 'HomeController@headerStats');
    $router->get('/roles', 'RolesController@index');
    $router->get('/jobs', 'JobController@index');
    $router->get('/real_estates', 'RealEstateController@index');
    $router->post('/saveRealEstate', 'RealEstateController@feed');
    $router->post('/saveJob', 'JobController@feed');
    // $router->post('/saveRank', 'RankController@update');`
    // $router->post('/saveUsers', 'UsersController@Feed');
    $router->post('/saveRole', 'RolesController@Feed');
    $router->get('/shops', 'ShopsController@index');
    $router->post('/saveShop', 'ShopsController@feed');
    $router->get('/gangs', 'ShopsController@index');
    $router->post('/saveGang', 'ShopsController@feed');
    $router->get('/courses', 'ShopsController@index');
    $router->post('/saveCourse', 'ShopsController@feed');
    $router->get('/permissions', 'PermissionsController@index');
    $router->post('/savePermission', 'PermissionsController@feed');
    $router->get('/roleWithPermissions', 'RolesController@getAllPermissionOfRole');
    $router->post('/saveRolePermissions', 'RolesController@permissionsToRole');
    $router->get('/rolesPermissions', 'RolesController@permissionsAndRoles');
    $router->get('/cities', 'CityController@index');
    $router->post('/saveCity', 'ShopsController@feed');
    $router->get('/countries', 'CountryController@index');
    $router->post('/saveCountry', 'ShopsController@feed');
    // $router->get('/', 'ForumController@index')->name('forums.list');
    $router->get('/forum/{forum}', 'ForumsController@threadList')->name('forums.show')->where('forum', '[0-9]+');
    $router->get('/thread/{thread}', 'ForumsController@postList')->name('forums.thread')->where('thread', '[0-9]+');
    $router->post('/savePost', 'ForumsController@postCreate')->name('forums.savePost');
    $router->post('/modifyPost', 'ForumsController@postModify')->name('forums.modifyPost');
    $router->post('/quotePost', 'ForumsController@quotePost')->name('forums.quotePost');
    $router->post('/thread/create', 'ForumsController@threadCreate')->name('forums.thread.create')->where('thread', '[0-9]+');
    $router->get('/forums', 'ForumsController@index')->name('forums.list');
    $router->post('/addLike', 'ForumsController@addLike')->name('forums.addLike');
    $router->post('/addDislike', 'ForumsController@addDislike')->name('forums.addDislike');
    $router->get('/fetchCLubs', 'FightClubController@index')->name('fightClubs');
    $router->post('/fetchCLubMembers', 'FightClubController@getClubPlayerList')->name('fetchCLubMembers');
});
// fetchCLubMembers
