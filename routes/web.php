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
    $router->get('/events/popular', 'EventController@showPopular');
    $router->post('/search/events', 'EventController@showByKeyword');
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

        // logout
        $router->post('/logout', 'AuthController@logout');
    });
});
