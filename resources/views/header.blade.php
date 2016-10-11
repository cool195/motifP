<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <title>{{$title or 'Exclusive Fashion Accessories Designed by the World’s Top Fashion Bloggers, Instagrammers and Digital Influencers'}}</title>
    <meta property="og:image" content="{{$ogimage or config('runtime.Image_URL').'/images/logo/logo.png'}}{{config('runtime.V')}}">
    <meta name="description"
          content="{{$description or 'Your style is unique and cutting edge - your fashion should be too.Exclusive, limited edition accessories designed by the world’s top fashion bloggers, Instagrammers and digital influencers.'}}">
    <meta name="keywords"
          content="{{$keywords or 'fashion,style,shop,accessory,jewelry,watch,blogger,Instagram,designer,limited,edition,ecommerce,buy'}}">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css{{config('runtime.V')}}">

    <script type='text/javascript'>
        var _vds = _vds || [];
        window._vds = _vds;
        (function(){
            _vds.push(['setAccountId', '94d5fde2c5246fe8']);
            (function() {
                var vds = document.createElement('script');
                vds.type='text/javascript';
                vds.async = true;
                vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(vds, s);
            })();})();
    </script>

</head>
<body>

<!-- 下载提示 -->
<div class="download-info" hidden>
    <div class="container">
        <div class="row flex flex-alignCenter">
            <div class="col-md-6">
                <i class="iconfont icon-cross text-primary btn-closeDownload icon-size-xm p-l-10x"></i>
                <span class="text-main font-size-base p-l-15x">Use our free app for 20% off your first purchase!</span>
            </div>
            <div class="col-md-6 text-right">
                <a href="https://itunes.apple.com/us/app/id1125850409" class="btn btn-black m-r-20x p-x-10x p-y-5x">
                    <img class="img-fluid m-x-auto" src="{{config('runtime.Image_URL')}}/images/icon/icon-appStore.png{{config('runtime.V')}}" srcset="{{config('runtime.Image_URL')}}/images/icon/icon-appStore@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/icon/icon-appStore@3x.png{{config('runtime.V')}} 3x">
                </a>
                <a href="https://play.google.com/store/apps/details?id=me.motif.motif" class="btn btn-black p-x-10x p-y-5x">
                    <img class="img-fluid m-x-auto" src="{{config('runtime.Image_URL')}}/images/icon/icon-googlePlay.png{{config('runtime.V')}}" srcset="{{config('runtime.Image_URL')}}/images/icon/icon-googlePlay@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/icon/icon-googlePlay@3x.png{{config('runtime.V')}} 3x">
                </a>
            </div>
        </div>
    </div>
</div>
<!-- 头部 -->
<header class="">
    <div class="container">
        <nav class="navbar-left">
            <ul class="nav navbar-primary clearfix">
                <li class="nav-item nav-logo"><a href="/daily">
                    <img class="img-fluid" src="/images/logo/logo.png{{config('runtime.V')}}" alt="logo" srcset="/images/logo/motif-logo@3x.png{{config('runtime.V')}} 2x"></a>
                </li>
                <li class="nav-item"><a class="nav-link border-b p-x-10x sanBold @if('daily' == $title) active @endif" href="/daily">DAILY</a></li>
                <li class="nav-item"><a class="nav-link border-b p-x-10x sanBold @if('designer' == $title) active @endif" href="/designer">DESIGNERS</a></li>
                <li class="nav-item dropdown">
                    @inject('Category', 'App\Http\Controllers\ShoppingController')
                    <a href="javascript:void(0)" class="dropdown-toggle nav-link border-b p-x-10x sanBold @if('shopping' == $title) active @endif" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHOPPING</a>
                    <ul class="dropdown-menu dropdown-nav-hover">
                        @foreach($Category->getShoppingCategoryList() as $category)
                            <li class="dropdown-item @if('shopping' == $title && $cid == $category['category_id']) active @endif"><a href="/shopping/{{$category['category_id']}}">{{$category['category_name']}}</a></li>

                        @endforeach
                    </ul>
                    {{--<li class="nav-item dropdown-shopping">--}}
                    {{--@inject('Category', 'App\Http\Controllers\ShoppingController')
                    <a href="javascript:void(0)" class="nav-link dropdown-toggle sanBold @if('shopping' == $title) active @endif">SHOPPING</a>
                    <ul class="nav-shopping-hover bg-white p-x-20x box-shadow">
                        @foreach($Category->getShoppingCategoryList() as $category)
                            <li class="text-center @if('shopping' == $title && $cid == $category['category_id']) active @endif">
                                <a href="/shopping/{{$category['category_id']}}" class="p-x-30x m-y-10x">{{$category['category_name']}}
                                    <span class="triangle-up"></span>
                                </a>
                            </li>
                        @endforeach
                    </ul>--}}
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary clearfix">
                <li class="nav-item p-x-10x">
                    <a href="/invitefriends" class="nav-link sanBold text-red">GET $20 OFF</a>
                </li>
                @if(Session::has('user'))
                <li class="nav-item p-x-10x">
                    <a href="/user/changeprofile" class="nav-link name sanBold">{{Session::get('user.nickname')}}</a>
                </li>
                <li class="nav-item p-x-10x header-img">
                    <a href="/user/changeprofile" class="nav-link">
                        <img class="img-circle img-border-white img-lazy"
                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png{{config('runtime.V')}}"
                             data-original="@if(Session::has('user.icon')){{config('runtime.CDN_URL').'/n1/'.Session::get('user.icon')}}@else{{config('runtime.Image_URL').'/images/icon/apple-touch-icon.png'}}{{config('runtime.V')}}@endif"
                             width="40" height="40" alt="">
                    </a>
                    <!--个人中心下拉框-->
                    <div class="dropdown-img">
                        <span class="triangle-up"></span>
                        <ul class="nav p-t-5x p-b-10x dropdown-nav-hover">
                            <li class="@if('Orders' == $title || 'Order Detail' == $title) active @endif"><a href="/order/orderlist">Orders</a></li>
                            <li class="@if('wishlist' == $title) active @endif "><a href="/wish">Wishlist</a></li>
                            <li class="@if('following' == $title) active @endif "><a href="/following">Following</a></li>
                            <li class="@if('Promotions' == $title) active @endif "><a href="/promocode">Promotions</a></li>
                            <li><a href="/invitefriends">Invite Friends</a></li>
                            <li class="@if('Change Profile' == $title) active @endif "><a href="/user/changeprofile">Settings</a></li>
                            <li><a href="/signout">Sign Out</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item p-x-20x">
                    <a href="/cart">
                        <div class="nav-shoppingCart">
                            <i class="iconfont icon-iconshoppingbag font-size-lxx text-primary"></i>
                            @if(Session::get('user.nickname'))
                                {{--购物车数量 注入服务--}}
                                @inject('Cart', 'App\Http\Controllers\CartController')
                                <span class="shoppingCart-number @if($Cart->getCartAmount()['data']['skusAmout'] <= 0){{'hidden'}}@endif">{{$Cart->getCartAmount()['data']['skusAmount']}}</span>
                            @else
                                <span class="shoppingCart-number hidden"></span>
                            @endif

                        </div>
                    </a>
                </li>
                @else
                    <li class="nav-item p-x-10x"><a class="nav-link" href="/login">SIGN IN</a></li>
                    <li class="nav-item p-x-10x"><a class="nav-link" href="/register">REGISTER</a></li>
                @endif
            </ul>
        </nav>
    </div>
</header>