<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <title>{{$title or 'Exclusive Fashion Accessories Designed by the World’s Top Fashion Bloggers, Instagrammers and Digital Influencers'}} @if('daily' != $page)
            | MOTIF @endif</title>
    <meta property="og:image"
          content="{{$ogimage or config('runtime.Image_URL').'/images/logo/logo.png'}}{{config('runtime.V')}}">
    <meta name="description"
          content="{{$description or 'Your style is unique and cutting edge - your fashion should be too.Exclusive, limited edition accessories designed by the world’s top fashion bloggers, Instagrammers and digital influencers.'}}">
    <meta name="keywords"
          content="{{$keywords or 'fashion,style,shop,accessory,jewelry,watch,blogger,Instagram,designer,limited,edition,ecommerce,buy'}}">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon"
          href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css{{config('runtime.V')}}">
    @if (env('APP_ENV') == 'production')
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:350201,hjsv:5};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
        </script>
        <script type='text/javascript'>
            var _vwo_code=(function(){
                var account_id=266886,
                        settings_tolerance=2000,
                        library_tolerance=2500,
                        use_existing_jquery=false,
                /* DO NOT EDIT BELOW THIS LINE */
                        f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
        </script>
    @endif
</head>
<body>
{{--@if(!isset($CartCheck))--}}
    <div class="download-info p-t-40x p-b-15x">
        <div class="container">
            <div class="row text-white avenirMedium">
                <div class="col-md-6">
                    <span>ORDER BY DEC 10 TO RECEIVE BY DEC 24</span>
                </div>
                <div class="col-md-6 text-right">
                    <span>FREE SHIPPING TO 30+ COUNTRIES</span>
                </div>
            </div>
        </div>
    </div>
{{--@endif--}}
<!-- 头部 -->
<header class="main-header">
    <div class="container bigNoodle font-size-lx p-t-30x">
        <nav class="navbar-left">
            <ul class="nav navbar-primary clearfix">
                <li class="nav-item"><a
                            class="nav-link border-b p-x-10x @if(isset($page) && 'daily' == $page) active @endif"
                            href="/daily">TRENDING</a></li>
                <li class="nav-item"><a
                            class="nav-link border-b p-x-10x @if(isset($page) && 'designer' == $page) active @endif"
                            href="/designer">COLLECTIONS</a></li>
                <li class="nav-item {{$page}} @if('shopping' != $page) shop-dropdown @endif">
                    @inject('Category', 'App\Http\Controllers\ShoppingController')
                    <a href="/shopping"
                       class="nav-link p-x-10x @if('shopping' == $page) border-b active @endif" @if(!$Shopping) @endif>SHOP</a>
                    <div class="dropdown-menu p-t-20x p-l-10x">
                        <div class="pull-left">SHOP ALL</div>
                        <ul class="figure">
                            <li>SHOP BY CATEGORY</li>
                            @foreach($Category->getShoppingCategoryList() as $category)
                                <li class="font-size-md avenirRegular @if('shopping' == $page && $cid == $category['category_id']) active @endif">
                                    <a href="{{$category['category_id']==0 ? '/shopping' : '/shopping/'.$category['category_id']}}">{{$category['category_name']}}</a>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                </li>
            </ul>
        </nav>
        <div class="logo">
            <a href="/home">
                <img class="img-fluid"
                     src="{{config('runtime.Image_URL')}}/images/logo/motif-logo@3x.png{{config('runtime.V')}}"
                     alt="logo">
                {{--srcset="{{config('runtime.Image_URL')}}/images/logo/motif-logo@3x.png{{config('runtime.V')}} 2x"--}}
            </a>
        </div>
        <nav class="navbar-right">
            <ul class="nav navbar-primary clearfix">
                @if(Session::has('user'))
                    <li class="nav-item p-x-10x header-img" id="logged-user">
                        <a href="/user/changeprofile"
                           class="nav-link name bigNoodle">{{Session::get('user.nickname')}}</a>
                        <!--个人中心下拉框-->
                        <div class="dropdown-img">
                            <span class="triangle-up"></span>
                            <ul class="nav p-y-20x dropdown-nav-hover">
                                <li class="@if('Orders' == $title || 'Order Detail' == $title) active @endif"><a
                                            href="/order/orderlist">Orders</a></li>
                                <li class="@if('wishlist' == $title) active @endif "><a href="/wish">Wishlist</a></li>
                                <li class="@if('following' == $title) active @endif "><a href="/following">Following</a>
                                </li>
                                <li class="@if('Promotions' == $title) active @endif "><a
                                            href="/promocode">Promotions</a></li>
                                <li class="@if('Change Profile' == $title) active @endif "><a
                                            href="/user/changeprofile">Settings</a></li>
                                <li><a href="/signout">Sign Out</a></li>
                            </ul>
                        </div>
                    </li>

                    <!-- get off -->
                    <li class="nav-item p-x-10x">
                        <a href="/invitefriends" class="text-green">GET 15% OFF</a>
                    </li>
                    <!-- 搜索 -->
                    <li class="nav-item p-l-10x p-r-0 header-search">
                        <a href="javascript:void(0)" class="p-t-5x flex flex-alignCenter btn-search">
                            {{--<i class="iconfont icon-search font-size-lxx"></i>--}}
                            <i class="iconfont font-size-lxx"></i>
                        </a>
                        <div class="avenirRegular font-size-sm search-bar">
                            <input type="text" placeholder="Search Motif">
                            <a href="#"><i class="iconfont icon-search font-size-lxx"></i></a>
                        </div>
                    </li>
                    <!-- 收藏商品 -->
                    <li class="nav-item p-l-15x p-r-0">
                        <a href="/wish" class="p-t-5x flex flex-alignCenter">
                                <i class="iconfont icon-heart2 font-size-lxx"></i>
                                @if(Session::get('user.nickname'))
                                    {{--收藏商品数量 注入服务--}}
                                    @inject('wishlist', 'App\Http\Controllers\UserController')
                                    <span class="text-link avenirRegular font-size-sm headerWish"
                                          data-num="{{count($wishlist->wishlist())}}">{{count($wishlist->wishlist())}}</span>
                                @endif
                        </a>
                    </li>

                    <!-- 购物车商品 -->
                    <li class="nav-item p-l-15x p-r-10x">
                        <a href="/cart" class="p-t-5x flex flex-alignCenter">
                                <i class="iconfont icon-shop2 font-size-lxx"></i>
                                {{--购物车数量 注入服务--}}
                                @inject('Cart', 'App\Http\Controllers\CartController')
                                <span class="text-link avenirRegular font-size-sm headerCart"
                                      data-num="{{$Cart->getCartAmount()['data']['skusAmout']}}">{{$Cart->getCartAmount()['data']['skusAmout']}}</span>

                        </a>
                    </li>
                @else
                    <li class="nav-item p-x-10x"><a class="nav-link btn-loginModal" data-referer="{{$_SERVER['REQUEST_URI']}}">SIGN IN</a></li>
                    <li class="nav-item p-x-10x"><a class="nav-link text-green btn-loginModal"  data-referer="/invitefriends">GET 15% OFF</a></li>
                    <li class="nav-item p-l-10x p-r-0">
                        <a data-url="/wish" class="p-t-5x flex flex-alignCenter btn-loginModal">
                            <i class="iconfont icon-search font-size-lxx"></i>
                        </a>
                    </li>
                    <li class="nav-item p-l-15x p-r-0">
                        <a data-referer="/wish" class="p-t-5x flex flex-alignCenter btn-loginModal">
                                <i class="iconfont icon-heart2 font-size-lxx"></i>
                                <span class="text-link avenirRegular font-size-sm">0</span>
                        </a>
                    </li>
                    <li class="nav-item p-l-15x p-r-10x">
                        <a href="/cart" class="p-t-5x flex flex-alignCenter">
                                <i class="iconfont icon-shop2 font-size-lxx"></i>
                                {{--购物车数量 注入服务--}}
                                @inject('Cart', 'App\Http\Controllers\CartController')
                                <span class="text-link avenirRegular font-size-sm headerCart"
                                      data-num="{{$Cart->getCartAmount()['data']['skusAmout']}}">{{$Cart->getCartAmount()['data']['skusAmout']}}</span>
                        </a>
                    </li>
                @endif
            </ul>
        </nav>
    </div>
</header>