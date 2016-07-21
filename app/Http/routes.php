<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Daily Start
Route::get('/', 'DailyController@index');

Route::get('/daily', 'DailyController@index');

Route::get('/topic/{id}', 'DailyController@show');//专题动态模版

Route::get('service/{id}', 'DailyController@service');//商品详情服务动态模版
//Daily End