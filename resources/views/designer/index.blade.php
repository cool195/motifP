
@include('header', ['title' => 'designer'])
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
                            @if(isset($designer['listVideoPath']))
                                <div class="designer-media bg-white">
                                    <div class="player-item" data-playid="{{$designer['listVideoId']}}">
                                        <div id="{{$designer['listVideoId']}}" class="ytplayer" data-playid="{{$designer['listVideoId']}}"></div>
                                        <div class="bg-player">
                                            <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" alt="">
                                            <div class="btn-beginPlayer designer-beginPlayer">
                                                <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                     srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                     alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                   data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">
                                    <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="商品的名称">
                                </a>
                            @endif

                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper">
                                @foreach($designer['products']  as $k => $product)
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                       data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                       data-link="/product/{{$product['spu']}}" href="javascript:void(0)">
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['mainImage']}}" width="110" height="110" alt="商品图片">
                                        {{--售完--}}
                                        @if($product['sale_type'] ==1 && $product['stockStatus'] == 0)
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
                            <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">
                                <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},"expid":0,"version":"1.0.1","src":"PC"}'
                               data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">{{ $designer['name'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <div class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif"
                                   data-did="{{$designer['designerId']}}">@if($designer['isFollowed']){{'Following'}}@else{{'Follow'}}@endif</div>
                            @else
                                <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow" data-actiondid="{{$designer['designerId']}}">Follow</a>
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
                            <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},”expid":0,"version":"1.0.1","src":"PC"}'
                               data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">
                                <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['avatar']}}" width="120" height="120" alt="">
                            </a>
                        </div>
                        <div class="font-size-md helveBold">
                            <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},”expid":0,"version":"1.0.1","src":"PC"}'
                               data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">{{ $designer['name'] }}</a>
                        </div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <div class="btn btn-gray btn-sm p-x-20x btn-follow @if($designer['isFollowed']) active @endif"
                                   data-did="{{$designer['designerId']}}">@if($designer['isFollowed']){{'Following'}}@else{{'Follow'}}@endif</div>
                            @else
                                <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow" data-actiondid="{{$designer['designerId']}}">Follow</a>
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
                            @if(isset($designer['listVideoPath']))
                                <div class="designer-media bg-white">
                                    <div class="player-item" data-playid="{{$designer['listVideoId']}}">
                                        <div id="{{$designer['listVideoId']}}" class="ytplayer" data-playid="{{$designer['listVideoId']}}"></div>
                                        <div class="bg-player">
                                            <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" alt="">
                                            <div class="btn-beginPlayer designer-beginPlayer">
                                                <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                     srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                     alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":2,"skipId":{{$designer['designerId']}},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":2,"skipId":{{$designer['designerId']}},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-link="/designer/{{ $designer['designerId'] }}" href="javascript:void(0)">
                                    <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['listImg']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="商品的名称">
                                </a>
                            @endif
                        </div>
                        <div class="swiper-container">
                            <div class="productImg-list p-t-20x swiper-wrapper">
                                @foreach($designer['products'] as $k => $product)
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                       data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                                       data-link="/product/{{$product['spu']}}" href="javascript:void(0)">
                                        <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['mainImage']}}" width="110" height="110" alt="商品图片">
                                    </a>
                                    {{--售完--}}
                                    @if($product['sale_type'] ==1 && $product['stockStatus'] == 0)
                                        <div class="bg-soldout"></div>
                                    @endif
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
            <a class="btn btn-gray btn-lg btn-380" href="javascript:void(0)">See more of all</a>
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
    <div class="p-a-20x bg-white designerList-item">
        <div class="row designer-item">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-r-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                            <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"0","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                               data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                               data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                            </a>
                        @{{ else }}
                            <div class="designer-media bg-white">
                                <div class="player-item" data-playid="@{{value.listVideoId}}">
                                    <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                    <div class="bg-player">
                                        <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" alt="">
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
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                       data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                       data-link="/product/@{{$value.spu}}" href="javascript:void(0)">
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
                                    </a>
                                </div>
                                @{{ if $value.sale_type == 1 && $value.stockStatus == 0}}
                                    <div class="bg-soldout"></div>
                                @{{ /if }}
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
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}"
                               data-did="@{{ value.designerId }}">@{{ if value.isFollowed }}Following@{{ else }}Follow@{{ /if }}</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
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
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}"
                               data-did="@{{ value.designerId }}">@{{ if value.isFollowed }}Following@{{ else }}Follow@{{ /if }}</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"0","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},"expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" alt="">
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
                                <div class="productImg-item swiper-slide m-r-10x">
                                    <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                       data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                       data-link="/product/@{{$value.spu}}" href="javascript:void(0)">
                                        <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
                                    </a>
                                </div>
                                @{{ if $value.sale_type == 1 && $value.stockStatus == 0}}
                                    <div class="bg-soldout"></div>
                                @{{ /if }}
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
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
                        @endif
                    </div>
                    <div class="p-t-15x">@{{ value.intro }}</div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
                <div class="p-l-30x">
                    <div class="product-bigImg">
                        @{{ if value.listVideoId == undefined }}
                        <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"0","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" alt="">
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
                            <div class="productImg-item swiper-slide m-r-10x">
                                <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-link="/product/@{{$value.spu}}" href="javascript:void(0)">
                                    <img class="img-thumbnail small-img img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
                                </a>
                            </div>
                                @{{ if $value.sale_type == 1 && $value.stockStatus == 0}}
                                    <div class="bg-soldout"></div>
                                @{{ /if }}
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
                        <a data-impr='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"0","skipType":"2","skipId":"@{{ value.designerId }}","expid":"0","version":"1.0.1","src":"PC"}'
                           data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png" alt="@{{ value.name }}">
                        </a>
                        @{{ else }}
                        <div class="designer-media bg-white">
                            <div class="player-item" data-playid="@{{value.listVideoId}}">
                                <div id="@{{value.listVideoId}}" class="ytplayer" data-playid="@{{value.listVideoId}}"></div>
                                <div class="bg-player">
                                    <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.listImg }}" alt="">
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
                            <div class="productImg-item swiper-slide m-r-10x">
                                <a data-impr='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-clk='http://clk.motif.me/log.gif?t=designer.300001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":@{{ value.spu }},”expid":0,"version":"1.0.1","src":"PC"}'
                                   data-link="/product/@{{$value.spu}}" href="javascript:void(0)">
                                    <img class="img-thumbnail small-img img-lazy" src="/images/product/bg-product@140.png" data-original="{{config('runtime.CDN_URL')}}/n0/@{{ value.mainImage }}" width="110" height="110" alt="">
                                </a>
                            </div>
                                @{{ if $value.sale_type == 1 && $value.stockStatus == 0}}
                                <div class="bg-soldout"></div>
                                @{{ /if }}
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
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">
                            <img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n1/@{{ value.avatar }}" width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="font-size-md helveBold">
                        <a data-clk='http://clk.motif.me/log.gif?t=designer.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":"1","skipType":"2","skipId":@{{ value.designerId }},”expid":"0","version":"1.0.1","src":"PC"}'
                           data-link="/designer/@{{ value.designerId }}" href="javascript:void(0)">@{{ value.name }}</a>
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-following  @{{ if value.isFollowed == 1 }} active @{{ /if }}" data-did="@{{ value.designerId }}">Follow</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-following" data-actiondid="@{{ value.designerId }}">Follow</a>
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