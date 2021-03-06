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
Route::group(['middleware' => 'pcguide'], function() {

    Route::get('/', 'DailyController@home');

    Route::get('/daily', 'DailyController@index');

    Route::get('/trending', 'DailyController@index');

    Route::get('/topic/{id}', 'DailyController@show');//专题动态模版

    Route::get('/service/{id}', 'DailyController@service')->where(['id' => '[0-9]+']);//商品详情服务动态模版

    Route::get('/template/{id}', 'DailyController@staticShow')->where(['id' => '[0-9]+']);

    Route::post('/subscribe', 'DailyController@subscribe');

});
//Daily End


//Designer Start
Route::get('/collection', 'DesignerController@index')->middleware(['pcguide']);

Route::get('/designer', 'DesignerController@designer')->middleware(['pcguide']);

Route::get('/collection/{id}', 'DesignerController@show')->middleware(['pcguide']);

Route::get('/designer/{id}', 'DesignerController@show')->middleware(['pcguide']);

Route::group(['middleware' => ['pcguide', 'loginCheck']], function () {

    Route::get('/following', 'DesignerController@following');

    Route::get('/followlist', 'DesignerController@followList');

    Route::get('/follow/{id}', 'DesignerController@follow')->where(['id' => '[0-9]+']);

});

//Designer End


//Shopping Start
Route::group(['middleware' => 'pcguide'], function() {

    Route::get('/shopping', 'ShoppingController@index');

    Route::get('/shop', 'ShoppingController@index');

    Route::get('/shop/{cid}', 'ShoppingController@index');

    Route::get('/shopping/{cid}', 'ShoppingController@index');

    Route::get('/category', 'ShoppingController@getShoppingCategoryList');

    Route::get('/products', 'ShoppingController@getShoppingProductList');

    Route::post('/checkStock', 'ShoppingController@checkStock');

    Route::post('/search', 'ShoppingController@search');

    Route::get('/search', 'ShoppingController@search');

    Route::get('/producturl', 'ShoppingController@productUrl');

    //未登录添加购物车
    Route::get('/cart/amount', 'CartController@getCartAmount');
    Route::get('/cart', 'CartController@cart');
    Route::post('/cart/add', 'CartController@addCart');
    Route::post('/cart/alterQtty', 'CartController@alterCartProQtty');
    Route::post('/cart/operate', 'CartController@operateCartProduct');
    Route::get('/cart/list', 'CartController@getCartList');

});

//Shopping End


//Product Start
//Route::get('/detail/{spu}', 'ProductController@detail')->middleware(['pcguide'])->where(['spu' => '[0-9]+']);

Route::get('/detail/{spuTitle}', 'ProductController@product')->middleware(['pcguide']);

//Product End


//Cart Start
Route::group(['middleware' => ['loginCheck', 'pcguide']], function () {



    Route::get('/cart/ordercheckout', 'CartController@checkout');

    Route::get('/cart/accountlist', 'CartController@getCartAccountList');

    Route::get('/getshiplist','CartController@getshiplist');

    Route::get('/cart/savelist', 'CartController@getCartSaveList');

    Route::put('/cart/add', 'CartController@promptlyBuy');

    Route::post('/cart/proBuy', 'CartController@promptlyBuy');

    Route::post('/cart/addBatch', 'CartController@addBatchCart');

});
//Cart End


//Order Start
Route::group(['middleware' => ['loginCheck', 'pcguide']], function () {

    Route::post('/order', 'OrderController@orderSubmit');

    Route::post('/payorder', 'OrderController@payOrder');

    Route::get('/order/orderlist', 'OrderController@orderList');

    Route::get('/order/orderdetail/{subno}', 'OrderController@orderDetail')->where(['subno' => '[0-9]+']);

    Route::get('/success', 'OrderController@orderConfirmed');
});
//Order End


//Paypal Start
Route::group(['middleware' => ['loginCheck', 'pcguide']], function () {

    Route::get('/paypal', 'PaypalController@index');

    Route::get('/paypalStatus', 'PaypalController@paypal');
});
//Paypal End

//wordpay Start
Route::group(['middleware' => ['loginCheck', 'pcguide']], function () {

    Route::get('/wordpay/paylist', 'WordpayController@getPayList');

    Route::post('/wordpay/addCard', 'WordpayController@addCreditCard');

    Route::get('/wordpay/selAddr/{aid}', 'WordpayController@selAddr');

    Route::post('/wordpay/delCard', 'WordpayController@delCreditCard');

    Route::get('/wordpay/selship', 'WordpayController@selShip');

    Route::get('/wordpay/paywith/{type}/{cardid}', 'WordpayController@paywith');

    Route::post('/wordpay/selCode/{bindid}', 'WordpayController@selCode');
});


//wordpay End


//User Start
Route::group(['middleware' => 'pcguide'], function () {

    Route::match(['get', 'post'], '/rsynclogin', 'UserController@rsyncLogin');

    Route::get('/login', 'UserController@login');

    Route::post('/signin', 'UserController@signin');

    Route::get('/register', 'UserController@register');

    Route::post('/signup', 'UserController@signup');

    Route::get('/signout', 'UserController@signout');

    Route::post('/forget', 'UserController@forgetPassword');

    Route::post('/reset', 'UserController@reset');

    Route::get('/forgetpwd', 'UserController@reset');

    Route::get('/forgetpassword', 'UserController@forgetpwd');

});

Route::group(['middleware' => ['loginCheck', 'pcguide']], function () {

    Route::get('/user/detail', 'UserController@getUserDetailInfo');

    Route::post('/user/modifyUserPwd', 'UserController@modifyUserPwd');

    Route::match(['get', 'post'], '/user/modifyUserInfo', 'UserController@modifyUserInfo');

    Route::post('/user/modify', 'UserController@modifyUserInfo');

    Route::post('/user/uploadicon', 'UserController@uploadIcon');

    Route::get('/wish', 'UserController@wish');

    Route::get('/wishlist/{spu}', 'UserController@updateWishList')->where(['spu' => '[0-9]+']);

    Route::get('/user/changepassword', 'UserController@password');

    Route::get('/user/shippingaddress', 'UserController@address');

    Route::get('/user/changeprofile', 'UserController@profile');

    Route::get('/user/setting', 'UserController@profile');

    Route::get('/user/payment', 'UserController@payment');

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

Route::group(['middleware' => 'pcguide'], function () {

    Route::post('/qianhai', 'QianhaiController@checkStatus');

    Route::get('noteaction', 'UserController@noteAction');

    Route::get('/d/invite/{code}', 'UserController@invite');

    Route::get('/d/invite', 'UserController@invite');

});

//User End


//第三方登录Start
Route::group(['middleware' => 'pcguide'], function () {

    Route::post('/googlelogin', 'AuthController@googleLogin');

    Route::post('/facebooklogin', 'AuthController@facebookLogin');

    Route::get('/addFacebookEmail', 'AuthController@addFacebookEmail');

    Route::get('/facebookstatus/{trdid}', 'AuthController@faceBookAuthStatus');

});
//第三方登录End


//Address Start
Route::group(['middleware' => 'pcguide'], function () {

    Route::resource('/address','AddressController');

    Route::get('/statelist/{id}','AddressController@getState');

});
//Address End



// Page Start
Route::group(['middleware' => 'pcguide'], function () {

    Route::get('/aboutmotif', 'PageController@aboutMotif');

    Route::get('/cancellation', 'PageController@cancellation');

    Route::get('/contactus', 'PageController@contactUs');

    Route::get('/payments', 'PageController@payment');

    Route::get('/faq', 'PageController@faq');

    Route::get('/privacynotice', 'PageController@privacyPolicy');

    Route::get('/sizeGuide', 'PageController@sizeGuide');

    Route::get('/termsconditions', 'PageController@termsService');

    Route::get('/userAgreement', 'PageController@userAgreement');

    Route::get('/saleinfo', 'PageController@saleinfo');

    Route::get('/download', 'PageController@download');

    Route::get('/pservice', 'PageController@pservice');

});

// Page End

//Sns Start
Route::get('/sendsnsmessage', 'SnsController@sendMessage');

Route::get('/updatemessagestatus', 'SnsController@updateMessageStatus');


//Sns End


// Ask Start
Route::group(['middleware' => ['loginCheck', 'pcguide']], function() {

    Route::get('/askshopping', 'AskController@show');

    Route::post('/askshopping', 'AskController@install');

    Route::post('/askshoppings', 'AskController@installs');

});


Route::get('error',function (){
    abort(404);
});
// Ask End


//网红落地路由
Route::get('/rae', 'NetworkRedsController@index');
Route::get('/cassandra', 'NetworkRedsController@index');
Route::get('/melodee', 'NetworkRedsController@index');
Route::get('/fashionbyday', 'NetworkRedsController@index');
Route::get('/lavendascloset', 'NetworkRedsController@index');

Route::get('/test', 'PageController@test');

Route::get('/banner', 'DailyController@banner');

Route::get('/empowered', 'DailyController@empowered');

//此路由必须放最后一个
Route::get('/{dsearch}', 'NetworkRedsController@dsearch');

//手动404
Route::get('/{title1}/{title2}',function(){
    abort(404);
});

Route::get('/{title1}/{title2}/{title3}',function(){
    abort(404);
});

Route::get('/{title1}/{title2}/{title3}/{title4}',function(){
    abort(404);
});
//end 手动404




















