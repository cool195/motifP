<!-- banner -->
@include('header', ['title' => 'MOTIF | Daily Exclusive Accessory Designs From Your Favorite Instagrammers & YouTubers', 'page' => 'daily'])
<section>
    <div class="bannerSwiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" >
                <a href="/topic/186">
                    <img src="{{config('runtime.Image_URL')}}/images/banner/banluxeedit.jpg" alt="">
                </a>
            </div>

            <div class="swiper-slide" >
                <a href="designer/99">
                    <img src="{{config('runtime.Image_URL')}}/images/banner/ban_rae.jpg" alt="">
                </a>
            </div>
            <div class="swiper-slide" >
                <a href="/topic/187">
                    <img src="{{config('runtime.Image_URL')}}/images/banner/ban_runwayRibbons.jpg" alt="">
                </a>
            </div>
        </div>
        <div class="container banner-container">
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
        <ul class="tiles-wrap animated daily-content" id="daily-wookmark">
            @foreach($list as $daily)
                {{--<li class="isHidden">--}}
                <li>
                    @if(3 == $daily['type'])
                        <div class="daily-item">
                            <div class="designer-media bg-white">
                                <div class="player-item" data-playid="{{$daily['videoId']}}">
                                    <div id="{{$daily['videoId']}}" class="ytplayer" data-playid="{{$daily['videoId']}}"></div>
                                    <div class="bg-player">
                                        <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/{{$daily['imgPath']}}" alt="">
                                        <div class="btn-beginPlayer designer-beginPlayer">
                                            <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                 srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                 alt="" width="50" height="50">
                                        </div>
                                    </div>
                                    <div class="btn-morePlayer" hidden>
                                        <a class="text-white font-size-xs video-formore"
                                           data-impr='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"type":{{$daily['type']}},"skipType":{{$daily['skipType']}},"skipId":{{$daily['skipId']}},"sortNo":{{$daily['sortNo']}},"expid":0,"index":1,"version":"1.0.1","src":"PC"}'
                                           data-clk='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"type":{{$daily['type']}},"skipType":{{$daily['skipType']}},"skipId":{{$daily['skipId']}},"sortNo":{{$daily['sortNo']}},"expid":0,"index":1,"version":"1.0.1","src":"PC"}'
                                           href="@if(1 == $daily['skipType'])/detail/@elseif(2==$daily['skipType'])/designer/@elseif(3==$daily['skipType'])/topic/@elseif(4==$daily['skipType'])/shopping/@else{{""}}@endif{{ $daily['skipId'] }}">
                                            <strong>Click for More</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @else
                        <div class="daily-item player-media">
                            <a data-impr='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"type":{{$daily['type']}},"skipType":{{$daily['skipType']}},"skipId":{{$daily['skipId']}},"sortNo":{{$daily['sortNo']}},"expid":0,"index":1,"version":"1.0.1","src":"PC"}'
                               data-clk='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"type":{{$daily['type']}},"skipType":{{$daily['skipType']}},"skipId":{{$daily['skipId']}},"sortNo":{{$daily['sortNo']}},"expid":0,"index":1,"version":"1.0.1","src":"PC"}'
                               href="@if(1 == $daily['skipType'])/detail/@elseif(2==$daily['skipType'])/designer/@elseif(3==$daily['skipType'])/topic/@elseif(4 == $daily['skipType'])/shopping/@else{{""}}@endif{{ $daily['skipId'] }}">
                                <img data-original="{{config('runtime.CDN_URL')}}/n2/{{$daily['imgPath']}}"
                                     src="/images/product/bg-product@336.png"
                                     class="img-fluid img-daily img-lazy" style="width: 252px; height: {{252/$daily['weight']*$daily['height']}}px">
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
                    @endif
            </li>
            @endforeach
        </ul>
    @endif
    <div class="clearfix"></div>
        <div class="text-center m-y-30x seeMore-info">
            <div class="dailyList-seeMore" style="display: none;">
                <a class="btn btn-gray btn-lg btn-380 btn-seeMore-dailyList">VIEW MORE</a>
            </div>
            <div class="loading daily-loading" style="display: none">
                <div class="loader"></div>
                <div class="text-center p-l-15x">Loading...</div>
            </div>
        </div>
</div>

<template id="tpl-daily">
    @{{ each list }}
    @{{ if $value.type == "3" }}
    <li>
        <div class="daily-item">
            <div class="designer-media bg-white">
                <div class="player-item" data-playid="@{{$value.videoId}}">
                    <div id="@{{$value.videoId}}" class="ytplayer" data-playid="@{{$value.videoId}}"></div>
                    <div class="bg-player">
                        <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/@{{ $value.imgPath }}" alt="">
                        <div class="btn-beginPlayer designer-beginPlayer">
                            <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                 alt="" width="50" height="50">
                        </div>
                    </div>
                    <div class="btn-morePlayer" hidden>
                        <a class="text-white font-size-xs video-formore"
                           data-impr='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{ Session::get('user.uuid') }}&v={"action":"0","type":"@{{ $value.type }}","imgtexttype":"@{{ $value.imgtextType }}","skiptype":"@{{ $value.skipType }}","skipid":"@{{ $value.skipId }}","sortno":"@{{ $value.sortNo }}","expid":0,"index": 1,"version":"1.0.1", "ver":"9.2", "src":"PC"}'
                           data-clk='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{ Session::get('user.uuid') }}&v={"action":"1","type":"@{{ $value.type }}","imgtexttype":"@{{ $value.imgtextType }}","skiptype":"@{{ $value.skipType }}","skipid":"@{{ $value.skipId }}","sortno":"@{{ $value.sortNo }}","expid":0,"index": 1,"version":"1.0.1", "ver":"9.2", "src":"pc"}'
                           href="@{{ if $value.skipType == 1 }}/detail/@{{ else if $value.skipType == 2 }}/designer/@{{ else if $value.skipType == 3 }}/topic/@{{ else if $value.skipType == 4 }}/shopping/@{{ else }}@{{ /if }}@{{ $value.skipId }}"><strong>Click for More</strong></a>
                    </div>
                </div>
            </div>
        </div>
    </li>
    @{{ /if }}

    @{{ if $value.type == "1" || $value.type == "2" }}
    <li>
        <div class="daily-item">
            <a data-impr='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{ Session::get('user.uuid') }}&v={"action":"0","type":"@{{ $value.type }}","skipType":"@{{ $value.skipType }}","skipId":"@{{ $value.skipId }}","sortNo":"@{{ $value.sortNo }}","expid":0,"index": 1,"version":"1.0.1", "ver":"9.2", "src":"PC"}'
               data-clk='http://clk.motif.me/log.gif?t=daily.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{ Session::get('user.uuid') }}&v={"action":"1","type":"@{{ $value.type }}","skipType":"@{{ $value.skipType }}","skipId":"@{{ $value.skipId }}","sortNo":"@{{ $value.sortNo }}","expid":0,"index": 1,"version":"1.0.1", "ver":"9.2", "src":"PC"}'
               href="@{{if $value.skipType == 1}}/detail/@{{ else if $value.skipType == 2 }}/designer/@{{ else if $value.skipType == 3 }}/topic/@{{ else if $value.skipType == 4}}/shopping/@{{ else }}@{{ /if }}@{{ $value.skipId }}">
                <img data-original="{{config('runtime.CDN_URL')}}/n2/@{{ $value.imgPath }}"
                     src="/images/product/bg-product@336.png"
                     class="img-fluid img-daily img-lazy" style="width: 252px; height: {{ number_format((252/$value.weight * $value.height), 2) }}px">
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
    @{{ /if }}
    @{{ /each }}
</template>

@include('footer')

