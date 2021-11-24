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

    // categories
    $router->get('/categories', 'CategoryController@showAll');
    $router->get('/categories/{id}', 'CategoryController@showById');
    $router->post('/categories', 'CategoryController@store');
    $router->put('/categories/{id}', 'CategoryController@update');
    $router->delete('/categories/{id}', 'CategoryController@destroy');

    // events
    $router->get('/events', 'EventController@showAll');
    $router->post('/events', 'EventController@store');
    $router->post('/logout', 'AuthController@logout');
});
