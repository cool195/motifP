<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Download</title>
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png">

    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css">
</head>
<body class="bg-white">
<!-- 内容 -->
<div class="motif-download">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 p-t-40x">
                <img src="/images/logo/motif-logo.png" alt="motif logo" class="m-y-20x">
                <div class="text-left font-size-llxx text-main p-y-40x">
                    Exclusive Fashion Accessories<br/>
                    Designed by the World’s Top Fashion Bloggers,<br/>
                    Instagrammers and Digital Influencers
                </div>

                <div class="p-t-20x text-left">
                    <a href="https://itunes.apple.com/us/app/id1125850409" class="m-r-20x">
                        <img src="{{config('runtime.Image_URL')}}/images/guide/app1@1x.png{{config('runtime.V')}}"
                             srcset="{{config('runtime.Image_URL')}}/images/guide/app1@2x.png{{config('runtime.V')}} 2x">
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=me.motif.motif">
                        <img src="{{config('runtime.Image_URL')}}/images/guide/goo1@1x.png"
                             srcset="{{config('runtime.Image_URL')}}/images/guide/goo1@2x.png{{config('runtime.V')}} 2x">
                    </a>
                </div>
                {{--<div class="p-y-40x text-left">
                    <a href="https://www.facebook.com/motifme" class="m-r-20x p-a-5x btn btn-black"><i class="iconfont icon-facebook-o text-white font-size-llxx" ></i></a>
                    --}}{{--<a href="#" class="m-r-20x p-a-5x btn btn-black"><i class="iconfont icon-google-o text-white font-size-llxx" ></i></a>--}}{{--
                    <a href="https://www.instagram.com/motifme/" class="m-r-20x p-a-5x btn btn-black"><i class="iconfont icon-instagram1 text-white font-size-lxx" style="padding: 4px 3px"></i></a>
                    <a href="https://www.pinterest.com/motifme/" class="m-r-20x p-a-5x btn btn-black"><i class="iconfont icon-pinterest1 text-white font-size-llxx" ></i></a>
                </div>
                --}}
            </div>
            <div class="col-lg-6 col-md-6">
                <span class="download-img">
                  <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/sizeguild/download-phone.png" srcset="{{config('runtime.Image_URL')}}/images/sizeguild/download-phone@2x.png 2x, {{config('runtime.Image_URL')}}/images/sizeguild/download-phone@3x.png 3x">
                </span>
            </div>
        </div>
    </div>
</div>

<footer>
    <div class="container p-t-40x">
        <div class="row footer-row">
            <div class="col-md-3 verticalHr">
                <div class="bigNoodle font-size-lx m-b-5x">CONNECT WITH US</div>
                <div>
                    <a href="https://www.facebook.com/motifme" target="_blank" class="p-r-10x text-primary">
                        <i class="iconfont icon-facebook2 footer-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/motifme/" target="_blank" class="p-r-10x text-primary">
                        <i class="iconfont icon-ins2 footer-icon"></i>
                    </a>
                    <a href="https://www.pinterest.com/motifme/" target="_blank" class="p-r-10x text-primary">
                        <i class="iconfont icon-pin2 footer-icon"></i>
                    </a>
                </div>
            </div>
            <div class="col-md-3 p-l-40x">
                <div class="bigNoodle font-size-lx m-b-5x">MOTIF</div>
                <ul class="list-group">
                    <li class="list-group-item font-size-sm"><a href="/aboutmotif">ABOUT MOTIF</a></li>
                    <li class="list-group-item font-size-sm"><a href="/privacynotice">PRIVACY NOTICE</a></li>
                    <li class="list-group-item font-size-sm"><a href="/termsconditions">TERMS & CONDITIONS</a></li>
                </ul>
            </div>
            <div class="col-md-2">
                <div class="bigNoodle font-size-lx m-b-5x">HELP</div>
                <ul class="list-group">
                    <li class="list-group-item font-size-sm"><a href="/contactus">CONTACT US</a></li>
                    <li class="list-group-item font-size-sm"><a href="/faq">FAQ</a></li>
                    <li class="list-group-item font-size-sm"><a href="/pservice">SHIPPING & RETURNS</a></li>

                </ul>
            </div>
            <div class="col-md-4">
                <div class="text-right">
                    <form class="form" method="post" name="searchFrom" action="/search">
                        <input class="text-primary input-search font-size-sm" name="kw" placeholder="Looking for something specific?" type="text">
                        <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                        <button class="btn btn-primary bigNoodle font-size-lx btn-footerSearch" type="submit">SEARCH</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>
</html>
