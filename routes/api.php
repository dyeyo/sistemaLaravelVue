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

Auth::routes();

Route::group([
    //'prefix' => 'api', 
    'namespace'=>'Admin'],
    //'middleware' => 'auth'], 
function () {

    Route::get('/users', 'UserController@index')->name('users.list');
    Route::post('/users/register', 'UserController@store')->name('users.store');
    Route::put('/users/update/{id}', 'UserController@update')->name('users.list');
    Route::delete('/users/delete/{id}', 'UserController@destroy')->name('users.destroy');

});



