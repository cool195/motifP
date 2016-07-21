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

Route::get('/topic/{id}', 'DailyController@show')->where(['id' => '[0-9]+']);//专题动态模版

Route::get('service/{id}', 'DailyController@service')->where(['id' => '[0-9]+']);//商品详情服务动态模版
//Daily End

//Designer Start
Route::get('/designer', 'DesignerController@index');

Route::get('/designer/{id}', 'DesignerController@show')->where(['id' => '[0-9]+']);

Route::get('/follow/{id}', 'DesignerController@follow')->where(['id' => '[0-9]+']);
//Designer End