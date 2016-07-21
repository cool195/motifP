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


//Shopping Start
Route::get('/category', 'ShoppingController@getShoppingCategoryList');

Route::get('/products', 'ShoppingController@getShoppingProductList');

//Shopping End


//Product Start
Route::get('/products/{spu}', 'ProductController@getProductDetail')->where(['spu' => '[0-9]+']);
//Product End


//Cart Start
Route::get('/cart', 'CartController@index');

Route::get('/cart/amount', 'CartController@getCartAmount');

Route::get('/cart/list', 'CartController@getCartList');

Route::get('/cart/accountlist', 'CartController@getCartAccountList');

Route::get('/cart/savelist', 'CartController@getCartSaveList');

Route::match(['get', 'post'], '/cart/add', 'CartController@addCart');

Route::match(['get', 'post'], '/cart/proBuy', 'CartController@promptlyBuy');

Route::match(['get', 'post'], '/cart/addBatch', 'CartController@addBatchCart');

Route::match(['get', 'post'], '/cart/alterQtty', 'CartController@alterCartProQtty');

Route::match(['get', 'post'], '/cart/operate', 'CartController@operateCartProduct');

Route::match(['get', 'post'], '/cart/verifycoupon', 'CartController@verifyCoupon');
//Cart End


//Order Start

//Order End


//User Start
Route::match(['get', 'post'], '/rsynclogin', 'UserController@rsyncLogin');

Route::match(['get', 'post'], '/login', 'UserController@login');

Route::match(['get', 'post'], '/logincheck', 'UserController@loginCheck');

Route::match(['get', 'post'], '/signup', 'UserController@signup');

Route::match(['get', 'post'], '/signout', 'Usercontroller@signout');

Route::get('/user/detail', 'UserController@getUserDetailInfo');

Route::post('/user/modifyUserPwd', 'UserController@modifyUserPwd');

Route::match(['get', 'post'], '/user/modifyUserInfo', 'UserController@modifyUserInfo');

Route::post('/user/uploadicon', 'UserController@uploadIcon');
//User End



























