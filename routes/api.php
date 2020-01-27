<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('pizza', 'Api\PizzaController@index');
Route::get('pizza/{id}', 'Api\PizzaController@show');

Route::post('order', ['uses' => 'Api\OrderController@show', 'https']);
Route::get('order/{id}', 'Api\OrderController@show');

