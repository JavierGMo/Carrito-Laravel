<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

Route::view('/', 'home')->name('home');

//Rutas para productos
Route::get('product', 'ProductController@index')->name('producto');
Route::get('product/{id}', 'ProductController@show')->name('producto');
Route::post('product', 'ProductController@store')->name('producto');

//Rutas productos vendidos

Route::get('soldproducts', 'SoldProductsController@index');
Route::get('soldproducts/{id}', 'SoldProductsController@show');
Route::delete('soldproducts/{id}', 'SoldProductsController@destroy');

//Rutas para panel de usuario
Route::get('userpanel', 'UserPanelController@index')->name('user');
Route::put('userpanel/{id}', 'UserPanelController@update');
Route::delete('userpanel/{id}', 'UserPanelController@destroy');

//Rutas de compras
Route::post('buy', 'BuyController@store')->name('buy');
Route::get('buy', 'BuyController@index');

