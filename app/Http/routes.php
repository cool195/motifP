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
Route::get('/shopping', 'ShoppingController@index');

Route::get('/category', 'ShoppingController@getShoppingCategoryList');

Route::get('/products', 'ShoppingController@getShoppingProductList');

Route::post('/checkStock', 'ShoppingController@checkStock');
//Shopping End


//Product Start
Route::get('/product/{spu}', 'ProductController@product')->where(['spu' => '[0-9]+']);

//todo delete
Route::get('/detail/{spu}', 'ProductController@getProductDetail')->where(['spu' => '[0-9]+']); //test
//Product End


//Cart Start
Route::get('/cart', 'CartController@cart');

Route::get('/checkout', 'CartController@checkout');

Route::get('/cart/amount', 'CartController@getCartAmount');


//todo delete
Route::get('/cart/list', 'CartController@getCartList');

Route::get('/cart/accountlist', 'CartController@getCartAccountList');

Route::get('/cart/savelist', 'CartController@getCartSaveList');

Route::post('/cart/add', 'CartController@addCart');

Route::post('/cart/proBuy', 'CartController@promptlyBuy');

Route::post('/cart/addBatch', 'CartController@addBatchCart');

Route::post('/cart/alterQtty', 'CartController@alterCartProQtty');

Route::post('/cart/operate', 'CartController@operateCartProduct');

Route::post('coupon','CartController@verifyCoupon');
//Cart End

//Order Start
Route::post('/order', 'OrderController@orderSubmit');
//Order End

//Paypal Start
Route::get('/paypal', 'PaypalController@index');
Route::get('/paypalStatus', 'PaypalController@paypal');
//Paypal End

//User Start
Route::match(['get', 'post'], '/rsynclogin', 'UserController@rsyncLogin');

Route::get('/login', 'UserController@login');

Route::post('/signin', 'UserController@signin');

Route::get('/register', 'UserController@register');

Route::post('/signup', 'UserController@signup');

Route::get('/signout', 'UserController@signout');

Route::post('/forget', 'UserController@forgetPassword');

Route::match(['get', 'post'], '/reset', 'UserController@reset');

Route::get('/user/detail', 'UserController@getUserDetailInfo');

Route::post('/user/modifyUserPwd', 'UserController@modifyUserPwd');

Route::match(['get', 'post'], '/user/modifyUserInfo', 'UserController@modifyUserInfo');

Route::post('/user/uploadicon', 'UserController@uploadIcon');

Route::get('/wishlist/{spu}', 'UserController@updateWishList')->where(['spu' => '[0-9]+']);

Route::get('/user/password', 'UserController@password');

Route::get('/user/address', 'UserController@address');
//User End

//第三方登录Start
Route::post('/googlelogin', 'AuthController@googleLogin');

Route::post('/facebooklogin', 'AuthController@facebookLogin');

Route::get('/addFacebookEmail', 'AuthController@addFacebookEmail');

//第三方登录End

//Address Start
Route::resource('/address','AddressController');
//Address End


//Order Start
Route::get('/orderlist', 'OrderController@getOrderList');

Route::get('/orderdetail/{subno}', 'OrderController@orderDetail')->where(['subno' => '[0-9]+']);
//Order End

























