<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/v1'], function () use ($router) {
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');

    $router->get('/events', 'EventController@showAll');
    $router->get('/events/latest', 'EventController@showLatestLimit');
    $router->get('/events/search', 'EventController@showByKeyword');
    $router->get('/events/{id}', 'EventController@showById');
    $router->get('/categories', 'CategoryController@showAll');
    $router->get('/events/category/{id}', 'EventController@showByIdCategory');


    // harus login
    $router->group(['middleware' => ['auth']], function () use ($router) {
        // categories
        $router->get('/categories/{id}', 'CategoryController@showById');
        $router->post('/categories', 'CategoryController@store');
        $router->put('/categories/{id}', 'CategoryController@update');
        $router->delete('/categories/{id}', 'CategoryController@destroy');

        // events
        $router->get('/events/user/{id}', 'EventController@showByIdUser');
        $router->post('/events', 'EventController@store');
        $router->put('/events/{id}', 'EventController@update');
        $router->delete('/events/{id}', 'EventController@destroy');

        // profile
        $router->get('/user', 'UserController@showProfile');
        $router->put('/user', 'UserController@updateProfile');
        $router->put('/user/changepassword', 'UserController@changePassword');

        // favorite
        $router->get('/favorite', 'FavoriteController@showAllFavoriteUser');
        $router->get('/favorite/{event_id}', 'FavoriteController@showFavoriteUser');
        $router->post('/favorite', 'FavoriteController@addFavorite');
        $router->delete('/favorite/{event_id}', 'FavoriteController@destroy');

        $router->group(['prefix' => '/admin'], function () use ($router) {
            // users
            $router->get('/users', 'AdminController@showAllUsers');
            $router->get('/users/{id}', 'AdminController@showDetailUser');
            $router->put('/users/role/{id}', 'AdminController@changeRole');
            $router->delete('/users/{id}', 'AdminController@deleteUser');

            // events
            $router->get('/events', 'AdminController@showAllEvents');
            $router->put('/events/{id}/status', 'AdminController@changeStatusEvent');
            $router->delete('/events/{id}', 'AdminController@deleteEvent');
        });

        // logout
        $router->post('/logout', 'AuthController@logout');
    });
});
