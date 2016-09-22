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

Route::group(['middleware' => 'loginCheck'], function () {

    Route::get('/following', 'DesignerController@following');

    Route::get('/followlist', 'DesignerController@followList');

    Route::get('/follow/{id}', 'DesignerController@follow')->where(['id' => '[0-9]+']);

});

//Designer End


//Shopping Start
Route::get('/shopping', 'ShoppingController@index');

Route::get('/shopping/{cid}', 'ShoppingController@index')->where(['cid' => '[0-9]+']);

Route::get('/category', 'ShoppingController@getShoppingCategoryList');

Route::get('/products', 'ShoppingController@getShoppingProductList');

Route::post('/checkStock', 'ShoppingController@checkStock');
//Shopping End


//Product Start
Route::get('/detail/{spu}', 'ProductController@product')->where(['spu' => '[0-9]+']);
//Product End


//Cart Start
Route::group(['middleware' => 'loginCheck'], function () {

    Route::get('/cart', 'CartController@cart');

    Route::get('/checkout', 'CartController@checkout');

    Route::get('/cart/amount', 'CartController@getCartAmount');

    Route::get('/cart/list', 'CartController@getCartList');

    Route::get('/cart/accountlist', 'CartController@getCartAccountList');

    Route::get('/getshiplist','CartController@getshiplist');

    Route::get('/cart/savelist', 'CartController@getCartSaveList');

    Route::post('/cart/add', 'CartController@addCart');

    Route::put('/cart/add', 'CartController@promptlyBuy');

    Route::post('/cart/proBuy', 'CartController@promptlyBuy');

    Route::post('/cart/addBatch', 'CartController@addBatchCart');

    Route::post('/cart/alterQtty', 'CartController@alterCartProQtty');

    Route::post('/cart/operate', 'CartController@operateCartProduct');

});
//Cart End


//Order Start
Route::group(['middleware' => 'loginCheck'], function () {

    Route::post('/order', 'OrderController@orderSubmit');

    Route::get('/orderlist', 'OrderController@orderList');

    Route::get('/orderdetail/{subno}', 'OrderController@orderDetail')->where(['subno' => '[0-9]+']);
    
    Route::get('/success', 'OrderController@orderConfirmed');
});
//Order End


//Paypal Start
Route::group(['middleware' => 'loginCheck'], function () {

    Route::get('/paypal', 'PaypalController@index');

    Route::get('/paypalStatus', 'PaypalController@paypal');
});
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


Route::group(['middleware' => 'loginCheck'], function () {

    Route::get('/user/detail', 'UserController@getUserDetailInfo');

    Route::post('/user/modifyUserPwd', 'UserController@modifyUserPwd');

    Route::match(['get', 'post'], '/user/modifyUserInfo', 'UserController@modifyUserInfo');

    Route::post('/user/modify', 'UserController@modifyUserInfo');

    Route::post('/user/uploadicon', 'UserController@uploadIcon');

    Route::get('/wish', 'UserController@wish');

    Route::get('/wishlist/{spu}', 'UserController@updateWishList')->where(['spu' => '[0-9]+']);

    Route::get('/user/password', 'UserController@password');

    Route::get('/user/address', 'UserController@address');

    Route::get('/user/profile', 'UserController@profile');

    Route::get('/invitefriends', 'UserController@inviteFriends');

    Route::get('/promocode', 'UserController@promotions');

    Route::get('payagain/{orderid}/{paytype}','OrderController@orderPayInfo');
    //钱海
    Route::get('/qianhai', 'QianhaiController@index');

    //结算
    Route::get('/coupon','UserController@coupon');
    //个人中心
    Route::get('/usercoupon','UserController@userCoupon');
    //添加coupon
    Route::post('/coupon', 'UserController@verifyCoupon');
});
//钱海
Route::post('/qianhai', 'QianhaiController@checkStatus');

Route::get('noteaction', 'UserController@noteAction');

Route::get('/d/invite/{code}', 'UserController@invite');

Route::get('/d/invite', 'UserController@invite');



//User End


//第三方登录Start
Route::post('/googlelogin', 'AuthController@googleLogin');

Route::post('/facebooklogin', 'AuthController@facebookLogin');

Route::get('/addFacebookEmail', 'AuthController@addFacebookEmail');

Route::get('/facebookstatus/{trdid}', 'AuthController@faceBookAuthStatus');
//第三方登录End


//Address Start
Route::resource('/address','AddressController');
Route::get('/statelist/{id}','AddressController@getState');
//Address End



// Page Start
Route::get('/about', 'PageController@about');

Route::get('/cancellation', 'PageController@cancellation');

Route::get('/contactus', 'PageController@contactUs');

Route::get('/description', 'PageController@description');

Route::get('/faq', 'PageController@faq');

Route::get('/privacyPolicy', 'PageController@privacyPolicy');

Route::get('/sizeGuide', 'PageController@sizeGuide');

Route::get('/termsService', 'PageController@termsService');

Route::get('/userAgreement', 'PageController@userAgreement');

Route::get('/saleinfo', 'PageController@saleinfo');
// Page Start


// Ask Start
Route::group(['middleware' => 'loginCheck'], function() {

    Route::get('/askshopping', 'AskController@show');

    Route::post('/askshopping', 'AskController@install');
});
// Ask End





















