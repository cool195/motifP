<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{$title}}</title>
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png{{config('runtime.V')}}">

    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">

    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css{{config('runtime.V')}}">

</head>
<body class="bg-white">

<!-- 头部 -->
<header class="login-header">
    <div class="container">
        <nav class="navbar-left">
            <ul class="nav navbar-primary">
                <li class="nav-item nav-logo">
                    <a href="/trending">
                        <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/logo/logo.png{{config('runtime.V')}}" alt="logo" srcset="{{config('runtime.Image_URL')}}/images/logo/motif-logo.png{{config('runtime.V')}} 2x">
                    </a>
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary">
                @if('Register' == $title)
                    <li class="nav-item p-x-10x"><a href="/login" class="nav-link">Sign in</a></li>
                @else
                    <li class="nav-item p-x-10x"><a href="/register" class="nav-link">Sign up</a></li>
                @endif
            </ul>
        </nav>
    </div>
</header>
<hr class="hr-common m-a-0">