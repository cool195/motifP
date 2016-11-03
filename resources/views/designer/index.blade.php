
@include('header', ['title' => 'Designer', 'page' => 'designer'])
<!-- 内容 -->
<section class="m-t-40x" id="designerIndex" data-show="true">
    <!-- 设计师列表 -->
    <div id="designerContainer" class="container m-b-40x" data-start="{{$start}}" data-loading="false">
        @foreach($list as $key => $designer)
        @if( 0 == $key % 2 )
        <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
            <div class="row designer-item">
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="p-r-30x">
                        <div class="product-bigImg player-media">
                            @if(isset($designer['listVideoPath']))
                                <div class="designer-media bg-white">
                                    <div class="player-item" data-playid="{{$designer['listVideoId']}}">
                                        <div id="{{$designer['listVideoId']}}" class="ytplayer" data-playid="{{$designer['listVideoId']}}"></div>
                                        <div class="bg-player">
                                            <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/{{$designer['listImg']}}" alt="">
                                            <div class="btn-beginPlayer designer-beginPlayer">
                                                <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                     srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                     alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                   href="/designer/{{ $designer['designerId'] }}">
                                    <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/{{$designer['listImg']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png">
                                </a>
                            @endif

                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"{{ $designer['spus'] }}","expid":0,"version":"1.0.1","src":"PC"}'>
                                @foreach($designer['products']  as $k => $product)
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"{{$product['spu']}}","expid":0,"version":"1.0.1","src":"PC"}'
                                       href="/detail/{{$product['spu']}}">
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/{{$product['mainImage']}}" width="110" height="110">
                                        {{--售完--}}
                                        @if($product['sale_type'] ==1 && ($product['stockStatus'] == 0 || $product['isPutOn'] == 0))
                                            <div class="bg-soldout"></div>
                                        @endif
                                    </a>
                                </div>
                                @endforeach
                            </div>
                            <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                            <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="text-center">
                        <div class="m-b-10x">
                            <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               href="/designer/{{ $designer['designerId'] }}" >
                                <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               href="/designer/{{ $designer['designerId'] }}">{{ $designer['nickName'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <div class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif"
                                   data-did="{{$designer['designerId']}}">@if($designer['isFollowed']){{'Following'}}@else{{'Follow'}}@endif</div>
                            @else
                                <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow" data-actiondid="{{$designer['designerId']}}">Follow</a>
                            @endif
                        </div>
                        <div class="p-t-15x">{{  mb_substr($designer['describe'], 0, 150) }}</div>
                        @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                            <div class="p-t-20x p-l-15x font-size-lxx">
                                @endif
                                @if(!empty($designer['instagram_link']))
                                    <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                                @endif
                                @if(!empty($designer['snapchat_link']))
                                    <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                                @endif
                                @if(!empty($designer['youtube_link']))
                                    <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                                @endif
                                @if(!empty($designer['facebook_link']))
                                    <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                                @endif
                                @if(!empty($designer['blog_link']))
                                    <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                                @endif
                                @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
        @else
        <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
            <div class="row designer-item">
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="text-center">
                        <div class="m-b-10x">
                            <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               href="/designer/{{ $designer['designerId'] }}" >
                                <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               href="/designer/{{ $designer['designerId'] }}" >{{ $designer['nickName'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <div class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif"
                                   data-did="{{$designer['designerId']}}">@if($designer['isFollowed']){{'Following'}}@else{{'Follow'}}@endif</div>
                            @else
                                <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow" data-actiondid="{{$designer['designerId']}}">Follow</a>
                            @endif
                        </div>
                        <div class="p-t-15x">{{ mb_substr($designer['describe'], 0, 150) }}</div>
                        @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                            <div class="p-t-20x p-l-15x font-size-lxx">
                                @endif
                                @if(!empty($designer['instagram_link']))
                                    <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                                @endif
                                @if(!empty($designer['snapchat_link']))
                                    <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                                @endif
                                @if(!empty($designer['youtube_link']))
                                    <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                                @endif
                                @if(!empty($designer['facebook_link']))
                                    <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                                @endif
                                @if(!empty($designer['blog_link']))
                                    <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                                @endif
                                @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                            </div>
                        @endif
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="p-l-30x">
                        <div class="product-bigImg">
                            @if(isset($designer['listVideoPath']))
                                <div class="designer-media bg-white">
                                    <div class="player-item" data-playid="{{$designer['listVideoId']}}">
                                        <div id="{{$designer['listVideoId']}}" class="ytplayer" data-playid="{{$designer['listVideoId']}}"></div>
                                        <div class="bg-player">
                                            <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/{{$designer['listImg']}}" alt="">
                                            <div class="btn-beginPlayer designer-beginPlayer">
                                                <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                     srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                     alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                                   href="/designer/{{ $designer['designerId'] }}" >
                                    <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/{{$designer['listImg']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="商品的名称">
                                </a>
                            @endif
                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"{{$designer['spus']}}","expid":0,"version":"1.0.1","src":"PC"}'>
                                @foreach($designer['products'] as $k => $product)
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"{{$product['spu']}}","expid":0,"version":"1.0.1","src":"PC"}'
                                       href="/detail/{{$product['spu']}}" >
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/{{$product['mainImage']}}" width="110" height="110" alt="商品图片">
                                        {{--售完--}}
                                        @if($product['sale_type'] ==1 && ($product['stockStatus'] == 0 || $product['isPutOn'] == 0))
                                            <div class="bg-soldout"></div>
                                        @endif
                                    </a>
                                </div>
                                @endforeach
                            </div>
                            <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                            <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif
        @endforeach
    </div>

    <div class="text-center m-y-30x seeMore-info">
        <div class="designerList-seeMore" style="display: none;">
            <a class="btn btn-gray btn-lg btn-380" href="javascript:void(0)">VIEW MORE</a>
        </div>
        <div class="loading designer-loading" style="display: none">
            <div class="loader"></div>
            <div class="text-center p-l-15x">Loading...</div>
        </div>
    </div>

</section>

<!-- designer list 模版 -->
<template id="tpl-designerList-even">
    @{{each list as value index}}

    @{{ if 0 == index % 2 }}
    <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-r-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                            <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                               href="/designer/@{{ value.designerId }}" >
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                            </a>
                        @{{ else }}
                            <div class="designer-media bg-white">
                                <div class="player-item" data-playid="@{{value.listVideoId}}">
                                    <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                    <div class="bg-player">
                                        <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" alt="">
                                        <div class="btn-beginPlayer designer-beginPlayer">
                                            <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                 srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                 alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                                <div class="productImg-item swiper-slide m-r-10x" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"@{{ $value.spus }}","expid":0,"version":"1.0.1","src":"PC"}'>
                                    <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"@{{ $value.spu }}","expid":0,"version":"1.0.1","src":"PC"}'
                                       href="/detail/@{{$value.spu}}" >
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/@{{ value.mainImage }}" width="110" height="110" alt="">
                                        @{{ if $value.sale_type == 1  }}
                                        @{{ if $value.stockStatus == 0 || $value.isPutOn == 0 }}
                                        <div class="bg-soldout"></div>
                                        @{{ /if }}
                                        @{{ /if }}
                                    </a>
                                </div>
                            @{{ /each }}
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}"
                               data-did="@{{ value.designerId }}">@{{ if value.isFollowed }}Following@{{ else }}Follow@{{ /if }}</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.describe }}</div>
                    @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                        <div class="p-t-20x p-l-15x font-size-lxx">
                    @{{ /if }}
                    @{{ if  value.instagram_link != undefined }}
                            <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                    @{{ /if }}
                    @{{ if  value.snapchat_link != undefined }}
                            <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                    @{{ /if }}
                    @{{ if  value.youtube_link != undefined }}
                            <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                    @{{ /if }}
                    @{{ if  value.facebook_link != undefined}}
                            <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                    @{{ /if }}
                    @{{ if  value.blog_link != undefined}}
                            <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                    @{{ /if }}
                    @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                        </div>
                    @{{ /if }}
                </div>
            </div>
        </div>
    </div>
    @{{ else }}
    <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}"
                               data-did="@{{ value.designerId }}">@{{ if value.isFollowed }}Following@{{ else }}Follow@{{ /if }}</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.describe }}</div>
                    @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    <div class="p-t-20x p-l-15x font-size-lxx">
                        @{{ /if }}
                        @{{ if  value.instagram_link != undefined }}
                        <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                        @{{ /if }}
                        @{{ if  value.snapchat_link != undefined }}
                        <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                        @{{ /if }}
                        @{{ if  value.youtube_link != undefined }}
                        <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                        @{{ /if }}
                        @{{ if  value.facebook_link != undefined}}
                        <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                        @{{ /if }}
                        @{{ if  value.blog_link != undefined}}
                        <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                        @{{ /if }}
                        @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    </div>
                    @{{ /if }}
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"0","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                             srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                                <div class="productImg-item swiper-slide m-r-10x" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"@{{ $value.spus }}","expid":0,"version":"1.0.1","src":"PC"}'>
                                    <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"@{{ $value.spu }}","expid":0,"version":"1.0.1","src":"PC"}'
                                       href="/detail/@{{$value.spu}}" >
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/@{{ value.mainImage }}" width="110" height="110" alt="">
                                        @{{ if $value.sale_type == 1  }}
                                        @{{ if $value.stockStatus == 0 || $value.isPutOn == 0 }}
                                        <div class="bg-soldout"></div>
                                        @{{ /if }}
                                        @{{ /if }}
                                    </a>
                                </div>
                            @{{ /each }}
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @{{ /if }}

    @{{ /each }}
</template>

<template id="tpl-designerList-odd">
    @{{each list as value index}}

    @{{ if 0 == index % 2 }}
    <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.describe }}</div>
                    @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    <div class="p-t-20x p-l-15x font-size-lxx">
                        @{{ /if }}
                        @{{ if  value.instagram_link != undefined }}
                        <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                        @{{ /if }}
                        @{{ if  value.snapchat_link != undefined }}
                        <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                        @{{ /if }}
                        @{{ if  value.youtube_link != undefined }}
                        <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                        @{{ /if }}
                        @{{ if  value.facebook_link != undefined}}
                        <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                        @{{ /if }}
                        @{{ if  value.blog_link != undefined}}
                        <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                        @{{ /if }}
                        @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    </div>
                    @{{ /if }}
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"0","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                             srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                            <div class="productImg-item swiper-slide m-r-10x" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"@{{ $value.spus }}","expid":0,"version":"1.0.1","src":"PC"}'>
                                <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"@{{ $value.spu }}","expid":0,"version":"1.0.1","src":"PC"}'
                                   href="/detail/@{{$value.spu}}" >
                                    <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/@{{ value.mainImage }}" width="110" height="110" alt="">
                                    @{{ if $value.sale_type == 1  }}
                                    @{{ if $value.stockStatus == 0 || $value.isPutOn == 0 }}
                                    <div class="bg-soldout"></div>
                                    @{{ /if }}
                                    @{{ /if }}
                                </a>
                            </div>
                            @{{ /each }}
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @{{ else }}
    <div class="p-a-20x bg-white designerList-item box-shadow m-b-20x">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-r-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"0","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n2/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                             srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper" data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"@{{ $value.spus }}","expid":0,"version":"1.0.1","src":"PC"}'>
                            @{{ each value.products }}
                            <div class="productImg-item swiper-slide m-r-10x">
                                <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"@{{ $value.spu }}","expid":0,"version":"1.0.1","src":"PC"}'
                                   href="/detail/@{{$value.spu}}" >
                                    <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n3/@{{ value.mainImage }}" width="110" height="110" alt="">
                                    @{{ if $value.sale_type == 1  }}
                                    @{{ if $value.stockStatus == 0 || $value.isPutOn == 0 }}
                                    <div class="bg-soldout"></div>
                                    @{{ /if }}
                                    @{{ /if }}
                                </a>
                            </div>
                            @{{ /each }}
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n3/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?t=designer.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           href="/designer/@{{ value.designerId }}" >@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.describe }}</div>
                    @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    <div class="p-t-20x p-l-15x font-size-lxx">
                        @{{ /if }}
                        @{{ if  value.instagram_link != undefined }}
                        <a href="{{$designer['instagram_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-instagram1"></i></a>
                        @{{ /if }}
                        @{{ if  value.snapchat_link != undefined }}
                        <a href="{{$designer['snapchat_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-snapchat"></i></a>
                        @{{ /if }}
                        @{{ if  value.youtube_link != undefined }}
                        <a href="{{$designer['youtube_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-youtube1"></i></a>
                        @{{ /if }}
                        @{{ if  value.facebook_link != undefined}}
                        <a href="{{$designer['facebook_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-facebook1"></i></a>
                        @{{ /if }}
                        @{{ if  value.blog_link != undefined}}
                        <a href="{{$designer['blog_link']}}" target="_blank" class="m-r-20x"><i class="iconfont icon-blog"></i></a>
                        @{{ /if }}
                        @{{ if value.instagram_link != undefined || value.snapchat_link != undefined || value.youtube_link != undefined || value.facebook_link != undefined || value.blog_link != undefined }}
                    </div>
                    @{{ /if }}
                </div>
            </div>
        </div>
    </div>
    @{{ /if }}

    @{{ /each }}
</template>

@include('footer')