<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <title>{{$title or 'Exclusive Fashion Accessories Designed by the World’s Top Fashion Bloggers, Instagrammers and Digital Influencers'}}</title>
    <meta name="description" content="{{$description or 'Your style is unique and cutting edge - your fashion should be too.Exclusive, limited edition accessories designed by the world’s top fashion bloggers, Instagrammers and digital influencers.'}}">
    <meta name="keywords" content="{{$keywords or 'fashion,style,shop,accessory,jewelry,watch,blogger,Instagram,designer,limited,edition,ecommerce,buy'}}">
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
                <li class="nav-item"><a class="nav-link active" href="/daily">DAILY</a></li>
                <li class="nav-item"><a class="nav-link" href="/designer">DESIGNER</a></li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHOPPING</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item"><a href="#">Rings</a></li>
                        <li class="dropdown-item"><a href="#">Necklaces</a></li>
                        <li class="dropdown-item"><a href="#">Bracelets</a></li>
                        <li class="dropdown-item"><a href="#">Earrings</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary">
                <li class="nav-item p-x-10x"><a href="#" class="nav-link">{{Session::get('user.nickname')}}</a></li>
                <li class="nav-item p-x-10x"><a href="#" class="nav-link">
                        <img class="img-circle" src="@if(Session::has('user')) {{config('runtime.CDN_URL')}}/n1/{{Session::get('user.icon')}} @else {{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png @endif" width="40" height="40" alt="">
                </li>
                <li class="nav-item p-x-20x"><a href="/cart" class="nav-link"><i class="iconfont icon-shopbag font-size-lg text-primary"></i></a></li>
            </ul>
        </nav>
    </div>
</header>