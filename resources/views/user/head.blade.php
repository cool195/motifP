<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{$title}}</title>
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png">

    <link rel="stylesheet" href="/styles/vendor.css">

    <link rel="stylesheet" href="/styles/common.css">

</head>
<body>

<!-- 头部 -->
<header class="login-header">
    <div class="container">
        <nav class="navbar-left">
            <ul class="nav navbar-primary">
                <li class="nav-item nav-logo">
                    <a href="/daily">
                        <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/logo/logo.png" alt="logo">
                    </a>
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary">
                <li class="nav-item p-x-10x"><a href="/register" class="nav-link">Sign up</a></li>
            </ul>
        </nav>
    </div>
</header>
<hr class="hr-common m-a-0">