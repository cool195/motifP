
@include('header')
<!--内容-->
<section class="p-y-40x">
    @inject('wishlist', 'App\Http\Controllers\UserController')
    <div class="topic-wrap">
        @if(isset($topic['infos']))
            <div class="bg-white">
            @foreach($topic['infos'] as $k => $value)
                @if($value['type'] == 'title')
                <!--标题-->
                    @if(!isset($value['skipId']))
                        <div class="p-x-20x p-t-20x m-b-20x">
                            <h2 class="helveBold font-size-lxx">{{ $value['value'] }}</h2>
                        </div>
                    @else
                        <a href="@if($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/designer/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shopping#@endif{{$value['skipId']}}">
                            <div class="p-x-20x p-t-20x m-b-20x">
                                <h2 class="helveBold font-size-lxx">{{ $value['value'] }}</h2>
                            </div>
                        </a>
                    @endif
                @elseif($value['type'] == 'context')
                <!--描述-->
                    @if(!isset($value['skipId']))
                        <div class="p-x-20x m-y-20x">
                            <p class="m-b-0 font-size-base">{{ $value['value'] }}</p>
                        </div>
                    @else
                        <a href="@if($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/designer/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shopping#@endif{{$value['skipId']}}">
                            <div class="p-x-20x m-y-20x">
                                <p class="m-b-0 font-size-base">{{ $value['value'] }}</p>
                            </div>
                        </a>
                    @endif
                @elseif($value['type']=='multilink')
                <!-- 锚点图 -->
                <div class="m-t-20x">
                    <div class="hotspot-image"
                         data-hotspot='@foreach($value['squas'] as $v){{'{"beginX":'.$v['startX'].',"beginY":'.$v['startY'].',"skipId":"'.$v['skipId'].'","skipType":"'.$v['skipType'].'","endX":'.$v['endX'].',"endY":'.$v['endY'].'},'}}@endforeach'>
                        <img class="img-fluid" src="{{config('runtime.CDN_URL')}}/n1/{{$value['imgPath']}}">
                    </div>
                </div>
                {{--@elseif($value['type'] == 'multilink')--}}
                {{--<!--图-->--}}
                {{--<div class="m-t-20x">--}}
                    {{--<img class="img-fluid" src="{{config('runtime.CDN_URL')}}/n1/{{ $value['imgPath'] }}">--}}
                {{--</div>--}}
                @elseif($value['type'] == 'boxline')
                <!--分割线-->
                <hr class="hr-base m-x-20x m-y-0">
                @elseif($value['type'] == 'banner')
                <!--图 banner-->
                <a href="@if(!isset($value['skipId']))javascript:;@elseif($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/designer/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shopping#@endif{{$value['skipId']}}">
                    <div class="p-y-0">
                        <img class="img-fluid" src="{{config('runtime.CDN_URL')}}/n1/{{ $value['imgPath'] }}">
                    </div>
                </a>

                @elseif($value['type'] == 'product')
                    <!--图文列表-->
                    @if(isset($value['spus']))
                    <div class="p-t-40x p-b-20x bg-body">
                        <div data-impr='http://clk.motif.me/log.gif?t=daily.200001&m=H5_M2016-1&pin={{Session::get('user.pin')}}&uuid={{ Session::get('user.uuid') }}&v={"action":0,"skipType":1,"skipId":"{{ implode("_", $value['spus']) }}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}' class="row">
                            @foreach($value['spus'] as $spu)
                                <div class="col-xs-6">
                                    <div class="productList-item">
                                        <div class="image-container">
                                            <a data-clk='http://clk.motif.me/log.gif?t=daily.200001&m=H5_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":"{{$spu}}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}'
                                               data-link="/product/{{$spu}}" href="javascript:void(0)">
                                                <img class="img-fluid img-lazy"
                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{$topic['spuInfos'][$spu]['spuBase']['main_image_url']}}"
                                                     src="{{env('CDN_Static')}}/images/product/bg-product@336.png"
                                                     alt="{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}">
                                            </a>
                                            @if(Session::has('user'))
                                                <span class="product-heart btn-heart">
                                                    <i class="iconfont btn-wish font-size-lxx @if(in_array($spu, $wishlist->wishlist())) active @endif" data-spu="{{$spu}}"></i>
                                                </span>
                                            @else
                                                <a class="product-heart btn-heart" href="javascript:void(0)"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$spu}}"></i></a>
                                            @endif
                                                <!--预售标志-->
                                            @if(1 == $topic['spuInfos'][$spu]['spuBase']['sale_type'])
                                                <div class="presale-sign">
                                                    <div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>
                                                    <a data-clk='http://clk.motif.me/log.gif?t=daily.200001&m=H5_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":"{{$spu}}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}'
                                                       data-link="/product/{{$spu}}" href="javascript:void(0)"
                                                       class="presale-text helve font-size-sm">LIMITED DEITION
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                        <div class="price-caption helveBold">
                                            <div class="text-center font-size-md text-primary text-truncate p-x-20x">
                                                {{$topic['spuInfos'][$spu]['spuBase']['main_title']}}
                                            </div>
                                            <div class="text-center">

                                                @if($topic['spuInfos'][$spu]['skuPrice']['price'] != $topic['spuInfos'][$spu]['skuPrice']['sale_price'])
                                                    <span class="font-size-md text-primary p-r-5x text-red">${{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                                    <span class="font-size-base text-common text-throughLine">${{number_format($topic['spuInfos'][$spu]['skuPrice']['price']/100,2)}}</span>
                                                @else
                                                    <span class="font-size-md text-primary p-r-5x">${{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    @endif
                @endif
            @endforeach
            </div>
        @endif
        
    </div>
</section>

@include('footer')

<script>
    $(document).ready(function () {
        $('img.img-lazy').lazyload({
            threshold: 200,
            effect: 'fadeIn'
        });
    });

    // 锚点图
    function getHotSpot() {
        $('.hotspot-image').each(function () {
            var $this = $(this);
            var obj = $(this).data('hotspot');
            // 获取最后一个字符
            var lastStr = obj.charAt(obj.length - 1);
            if (lastStr === ',') {
                obj = obj.substring(0, obj.length - 1);
            }
            // 转化为json
            var objJson = eval('[' + obj + ']');
            $.each(objJson, function (n, value) {
                var BeginX = value.beginX;
                var BeginY = value.beginY;
                var EndX = value.endX;
                var EndY = value.endY;
                var url = '';
                switch (value.skipType) {
                    case '1':
                        url = '/product/';
                        break;
                    case '2':
                        url = '/designer/';
                        break;
                    case '3':
                        url = '/topic/';
                        break;
                    case '4':
                        url = '/shopping/';
                        break;
                }
                url += value.skipId;
                var parenta = $('<a></a>').attr('href', url);
                var childdiv = $('<div class="hotspot-spot"></div>').css({
                    width: (EndX - BeginX) * 100 + "%",
                    height: (EndY - BeginY) * 100 + "%",
                    left: BeginX * 100 + "%",
                    top: BeginY * 100 + "%"
                });
                parenta.prepend(childdiv).appendTo($this);
            });
        });
    }

    $(function () {
        getHotSpot();
    });
</script>
