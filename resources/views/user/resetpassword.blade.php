<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Reset Password</title>
  <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png">

  <link rel="stylesheet" href="/styles/vendor.css">

  <link rel="stylesheet" href="/styles/common.css">
</head>
<body>

<!-- 头部 -->
<header class="">
  <div class="container">
    <nav class="navbar-left">
      <ul class="nav navbar-primary">
        <li class="nav-item nav-logo"><a href="#">
          <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/logo/logo.png" alt="logo"></a></li>
      </ul>
    </nav>
    <nav class="navbar-right">
      <ul class="nav navbar-primary">
        <li class="nav-item p-x-10x"><a href="#" class="nav-link">Sign up</a></li>
      </ul>
    </nav>
  </div>
</header>
<hr class="hr-common m-a-0">
<!-- 内容 -->
<section class="bg-white">
  <div class="helve login-title text-center text-main p-y-20x">Reset Password</div>
  <div class="register-container">
    <div class="register-content">
      <form id="reset">
        <fieldset class="p-t-15x login-text">
          <div class="login-text">
            <input type="password" class="input-login form-control contrlo-lg text-primary" name="pw" placeholder="New Password">
            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
          </div>
          <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
            <span class="font-size-base">Please select size !</span>
          </div>
        </fieldset>
        <fieldset class="p-t-15x login-text">
          <div class="login-text">
            <input type="password" class="input-login form-control contrlo-lg text-primary" name="lastpw" placeholder="Confirm New Password">
            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
          </div>
          <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
            <span class="font-size-base">Please select size !</span>
          </div>
        </fieldset>
        <input hidden name="tp" value="{{$tp}}">
        <input hidden name="sig" value="{{$sig}}">
      </form>
      <div class="p-t-30x">
        <div class="btn btn-primary btn-lg btn-block" data-role="reset-submit">Submit</div>
      </div>
    </div>
  </div>
</section>

<footer class="login-footer">
  <div class="container p-x-40x">
    <div class="text-center p-t-20x m-b-40x"><a href="#" class="text-link">Contact Us</a></div>
    <div class="text-center p-t-10x m-b-10x text-primary font-size-xs">Copyright © 2016 MOTIF Inc. All rights reserved.</div>
  </div>
</footer>

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
