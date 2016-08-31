@include('header')

        <!-- banner -->
<section>
    <div class="bannerSwiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide daily-banner" style="background-image:url({{config('runtime.Image_URL')}}/images/banner/banner1.jpg)"></div>
            {{--<div class="swiper-slide daily-banner" style="background-image:url({{config('runtime.Image_URL')}}/images/banner/banner1.jpg)"></div>--}}
            {{--<div class="swiper-slide daily-banner" style="background-image:url({{config('runtime.Image_URL')}}/images/banner/banner1.jpg)"></div>--}}
        </div>
        <div class="container banner-container dailyBanner-btn">
            <!-- banner 按钮 -->
            <div class="swiper-button-next">
                <i class="iconfont icon-arrow-right text-white"></i>
            </div>
            <div class="swiper-button-prev">
                <i class="iconfont icon-arrow-left text-white"></i>
            </div>
        </div>
    </div>
</section>
<div class="clearfix"></div>

<!-- 列表内容 -->
<div class="container m-y-40x" role="main" id="dailyList-container" data-pagenum="1" data-loading="false">
    @if(!empty($list))
        <ul class="tiles-wrap animated row" id="daily-wookmark">
            @foreach($list as $daily)
            <li class="isHidden">
                <div class="daily-item">
                    <a href="@if(1 == $daily['skipType'])/product/@elseif(2==$daily['skipType'])/designer/@elseif(3==$daily['skipType'])/topic/@else/shopping/@endif{{ $daily['skipId'] }}">
                        <img src="{{config('runtime.CDN_URL')}}/n2/{{$daily['imgPath']}}" class="img-fluid img-daily img-lazy">
                    </a>
                        @if(!empty($daily['title'] || !empty($daily['subTitle'])))
                        <div class="daily-info p-a-10x text-left">
                            <div>
                                <h6 class="text-main helveBold font-size-md m-b-5x">{{$daily['title']}}</h6>
                                <p class="text-primary m-b-0">{{ $daily['subTitle'] }}</p>
                            </div>
                        </div>
                        @endif
                            {{--<hr class="hr-base m-y-10x">--}}
                        {{--<div class="flex flex-fullJustified flex-alignCenter">--}}
                            {{--<div class="flex flex-alignCenter">--}}
                                {{--<img src="{{config('runtime.Image_URL')}}/images/daily/daily.jpg" class="img-circle" width="30" height="30">--}}
                                {{--<span class="p-l-15x">--}}
                                    {{--<h6 class="text-main font-size-sm helveBold">Street Art</h6>--}}
                                    {{--<a class="text-primary font-size-sm" href="#">facebook.com</a>--}}
                                {{--</span>--}}
                            {{--</div>--}}
                            {{--<i class="iconfont icon-follow font-size-lx"></i>--}}
                        {{--</div>--}}
                </div>
            </li>
            @endforeach
        </ul>
    @endif
        <div class="text-center m-y-30x dailyList-seeMore">
            <a class="btn btn-gray btn-lg btn-380 btn-seeMore-dailyList">See more of all</a>
        </div>
        <div class="loading daily-loading" style="display: none">
            <div class="loader"></div>
            <div class="text-center p-t-5x p-l-10x">Loading...</div>
        </div>
</div>

<template id="tpl-daily">
    @{{ each list }}
    <li class="isHidden">
        <div class="daily-item">
            <a href="@{{if $value.skipType == 1}}/product/@{{ else if $value.skipType == 2 }}/designer/@{{ else if $value.skipType == 3 }}/topic/@{{ else if $value.skipType == 4}}/shopping/@{{ /if }}@{{ $value.skipId }}">
                <img src="{{config('runtime.CDN_URL')}}/n2/@{{ $value.imgPath }}" class="img-fluid img-daily">
            </a>

            @{{ if undefined !== ( $value.title || $value.subTitle ) }}
                <div class="daily-info p-a-10x text-left">
                    <div>
                        <h6 class="text-main helveBold font-size-md m-b-5x">@{{ $value.title }}</h6>
                        <p class="text-primary m-b-0">@{{ $value.subTitle }}</p>
                    </div>
                </div>
            @{{ /if }}
        </div>
    </li>
    @{{ /each }}
</template>

@include('footer')

