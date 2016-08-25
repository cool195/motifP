
@include('header')
<!-- 内容 -->
<section class="m-t-40x">
    <!-- 设计师列表 -->
    <div id="designerContainer" class="container m-b-40x" data-start="{{$start}}" data-loading="false">
        @foreach($list as $key => $designer)
        @if( 0 == $key % 2 )
        <div class="p-a-20x bg-white designerList-item">
            <div class="row designer-item">
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="p-r-30x">
                        <div class="product-bigImg player-media">
                            <a href="/designer/{{ $designer['designerId'] }}">
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" src="/images/product/bg-product@750.png" alt="商品的名称">
                            </a>

                            {{--<div class="designer-media bg-white">--}}
                                {{--<div class="player-item" data-playid="M7lc1UVf-VE">--}}
                                    {{--<div id="M7lc1UVf-VE" class="ytplayer" data-playid="M7lc1UVf-VE"></div>--}}
                                    {{--<div class="bg-player">--}}
                                        {{--<img class="img-fluid bg-img" src="/images/daily/daily1.jpg" alt="">--}}
                                        {{--<div class="btn-beginPlayer designer-beginPlayer">--}}
                                            {{--<img src="/images/daily/icon-player.png"--}}
                                                 {{--srcset="/images/daily/icon-player@2x.png 2x,/images/daily/icon-player@3x.png 3x"--}}
                                                 {{--alt="">--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
                                    {{--<div class="btn-morePlayer">--}}
                                        {{--<a class="text-white font-size-sm" href=""><strong>Click for More</strong></a>--}}
                                    {{--</div>--}}
                                {{--</div>--}}
                            {{--</div>--}}

                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper">
                                @foreach($designer['products']  as $k => $product)
                                <div class="productImg-item swiper-slide p-r-10x">
                                    <a href="/product/{{$product['spu']}}">
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['mainImage']}}" width="110" height="110" alt="商品图片">
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
                            <a href="/designer/{{ $designer['designerId'] }}">
                                <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a href="/designer/{{ $designer['designerId'] }}">{{ $designer['name'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif" data-did="{{$designer['designerId']}}">Follow</a>
                            @else
                                <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                            @endif
                        </div>
                        <div class="p-t-15x">{{  $designer['intro'] }}</div>
                        {{--<div class="p-t-15x">
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-fac.png"></a>
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-pin.png"></a>
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-ins.png"></a>
                        </div>--}}
                    </div>
                </div>
            </div>
        </div>
        @else
        <div class="p-a-20x bg-common designerList-item">
            <div class="row designer-item">
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="text-center">
                        <div class="m-b-10x">
                            <a href="/designer/{{ $product['designerId'] }}">
                                <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a href="/designer/{{ $product['designerId'] }}">{{ $designer['name'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif" data-did="{{$designer['designerId']}}">Follow</a>
                            @else
                                <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                            @endif
                        </div>
                        <div class="p-t-15x">{{ $designer['intro'] }}</div>
                        {{--<div class="p-t-15x">
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-fac.png"></a>
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-pin.png"></a>
                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-ins.png"></a>
                        </div>--}}
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="p-l-30x">
                        <div class="product-bigImg">
                            <a href="/designer/{{$designer['designerId']}}">
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" src="/images/product/bg-product@750.png" alt="商品的名称">
                            </a>
                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper">
                                @foreach($designer['products'] as $k => $product)
                                <div class="productImg-item swiper-slide p-r-10x">
                                    <a href="/product/{{$product['spu']}}">
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['mainImage']}}" width="110" height="110" alt="商品图片">
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

    <div class="text-center m-y-30x">
        <a class="btn btn-block btn-gray btn-lg btn-380 designerList-seeMore" href="javascript:void(0)">See more of all</a>

        <div class="loading designer-loading" style="display: none">
            <div class="loader"></div>
            <div class="text-center p-t-5x p-l-10x">Loading...</div>
        </div>
    </div>

</section>

<!-- designer list 模版 -->
<template id="tpl-designerList-even">
    @{{each list as value index}}

    @{{ if 0 == index % 2 }}
    <div class="p-a-20x bg-white designerList-item">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-r-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                            <a href="/designer/@{{ value.designerId }}">
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="/images/product/bg-product@750.png" alt="@{{ value.name }}">
                            </a>
                        @{{ else }}
                            <div class="designer-media bg-white">
                                <div class="player-item" data-playid="@{{value.listVideoId}}">
                                    <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                    <div class="bg-player">
                                        <img class="img-fluid bg-img" src="{{env('APP_Api_Image')}}/n1/@{{ value.listImg }}" alt="">
                                        <div class="btn-beginPlayer designer-beginPlayer">
                                            <img src="/images/daily/icon-player.png"
                                                 srcset="/images/daily/icon-player@2x.png 2x,/images/daily/icon-player@3x.png 3x"
                                                 alt="">
                                        </div>
                                    </div>
                                    <div class="btn-morePlayer">
                                        <a class="text-white font-size-sm" href="/designer/@{{value.designerId}}"><strong>Click for More</strong></a>
                                    </div>
                                </div>
                            </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                                <div class="productImg-item swiper-slide p-r-10x">
                                    <a href="/product/@{{$value.spu}}">
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
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
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a href="/designer/@{{ value.designerId }}">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</a>
                        @else
                            <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
        </div>
    </div>
    @{{ else }}
    <div class="p-a-20x bg-common designerList-item">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a href="/designer/@{{ value.designerId }}">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</a>
                        @else
                            <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{env('APP_Api_Image')}}/n1/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="/images/daily/icon-player.png"
                                             srcset="/images/daily/icon-player@2x.png 2x,/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                                <div class="btn-morePlayer">
                                    <a class="text-white font-size-sm" href="/designer/@{{value.designerId}}"><strong>Click for More</strong></a>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                                <div class="productImg-item swiper-slide p-r-10x">
                                    <a href="/product/@{{$value.spu}}">
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
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
    <div class="p-a-20x bg-common designerList-item">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="text-center">
                    <div class="m-b-10x">
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a href="/designer/@{{ value.designerId }}">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</a>
                        @else
                            <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{env('APP_Api_Image')}}/n1/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="/images/daily/icon-player.png"
                                             srcset="/images/daily/icon-player@2x.png 2x,/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                                <div class="btn-morePlayer">
                                    <a class="text-white font-size-sm" href="/designer/@{{value.designerId}}"><strong>Click for More</strong></a>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                            <div class="productImg-item swiper-slide p-r-10x">
                                <a href="/product/@{{$value.spu}}">
                                    <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
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
    <div class="p-a-20x bg-white designerList-item">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-r-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{env('APP_Api_Image')}}/n1/@{{ value.listImg }}" alt="">
                                    <div class="btn-beginPlayer designer-beginPlayer">
                                        <img src="/images/daily/icon-player.png"
                                             srcset="/images/daily/icon-player@2x.png 2x,/images/daily/icon-player@3x.png 3x"
                                             alt="">
                                    </div>
                                </div>
                                <div class="btn-morePlayer">
                                    <a class="text-white font-size-sm" href="/designer/@{{value.designerId}}"><strong>Click for More</strong></a>
                                </div>
                            </div>
                        </div>
                        @{{ /if }}
                    </div>
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @{{ each value.products }}
                            <div class="productImg-item swiper-slide p-r-10x">
                                <a href="/product/@{{$value.spu}}">
                                    <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
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
                        <a href="/designer/@{{ value.designerId }}">
                            <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a href="/designer/@{{ value.designerId }}">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</a>
                        @else
                            <a href="/login" class="btn btn-gray btn-sm p-x-20x">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
        </div>
    </div>
    @{{ /if }}

    @{{ /each }}
</template>

@include('footer')