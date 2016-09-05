<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <title>{{$title or 'Exclusive Fashion Accessories Designed by the World’s Top Fashion Bloggers, Instagrammers and Digital Influencers'}}</title>
    <meta name="description"
          content="{{$description or 'Your style is unique and cutting edge - your fashion should be too.Exclusive, limited edition accessories designed by the world’s top fashion bloggers, Instagrammers and digital influencers.'}}">
    <meta name="keywords"
          content="{{$keywords or 'fashion,style,shop,accessory,jewelry,watch,blogger,Instagram,designer,limited,edition,ecommerce,buy'}}">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css">
</head>
<body>
<!-- 头部 -->
<header class="">
    <div class="container">
        <nav class="navbar-left">
            <ul class="nav navbar-primary">
                <li class="nav-item nav-logo"><a href="/daily">
                    <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/logo/logo.png" alt="logo"></a>
                </li>
                <li class="nav-item"><a class="nav-link @if('daily' == $title) active @endif" href="/daily">Daily</a></li>
                <li class="nav-item"><a class="nav-link @if('designer' == $title) active @endif" href="/designer">DESIGNER</a></li>
                <li class="nav-item dropdown">
                    @inject('Category', 'App\Http\Controllers\ShoppingController')
                    <a href="javascript:void(0)" class="dropdown-toggle nav-link @if('shopping' == $title) active @endif" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHOPPING</a>
                    <ul class="dropdown-menu dropdown-nav-hover">
                        @foreach($Category->getShoppingCategoryList() as $category)
                            <li class="dropdown-item @if('shopping' == $title && $cid == $category['category_id']) active @endif"><a href="/shopping/{{$category['category_id']}}">{{$category['category_name']}}</a></li>
                        @endforeach
                    </ul>
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary clearfix">
                @if(Session::has('user'))
                <li class="nav-item p-x-10x">
                    <a href="/user/profile" class="nav-link name">{{Session::get('user.nickname')}}</a>
                </li>
                <li class="nav-item p-x-10x header-img">
                    <a href="/user/profile" class="nav-link">
                        <img class="img-circle img-border-white img-lazy"
                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                             data-original="@if(Session::has('user')){{config('runtime.CDN_URL').'/n1/'.Session::get('user.icon')}}@else{{config('runtime.Image_URL').'/images/icon/apple-touch-icon.png'}}@endif"
                             width="40" height="40" alt="">
                    </a>
                    <!--个人中心下拉框-->
                    <div class="dropdown-img">
                        <span class="triangle-up"></span>
                        <ul class="nav p-t-5x p-b-10x dropdown-nav-hover">
                            <li class="@if('Orders' == $title || 'Order Detail' == $title) active @endif"><a href="/orderlist">Orders</a></li>
                            {{--<li class="@if('Cart' == $title) active @endif "><a href="/cart">My Bag</a></li>--}}
                            <li class="@if('wishlist' == $title) active @endif "><a href="/wish">Wishlist</a></li>
                            <li class="@if('following' == $title) active @endif "><a href="/following">Following</a></li>
                            <li class="@if('Change Profile' == $title) active @endif "><a href="/user/profile">Settings</a></li>
                            <li><a href="/signout">Log out</a></li>
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
                    <li class="nav-item p-x-10x"><a class="nav-link" href="/login">LOGIN</a></li>
                    <li class="nav-item p-x-10x"><a class="nav-link" href="/register">REGISTER</a></li>
                @endif
            </ul>
        </nav>
    </div>
</header>