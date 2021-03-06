
@include('header',['title'=>$topic['title'],'ogimage'=>config('runtime.CDN_URL').'/n2/'.$topic['mainImg']])
<input type="text" id="productClick-name" value="name" hidden>
<input type="text" id="productClick-spu" value="1" hidden>
<input type="text" id="productClick-price" value="1" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    function onProductClick() {
        var name = document.getElementById('productClick-name').value;
        var spu = document.getElementById('productClick-spu').value;
        var price = document.getElementById('productClick-price').value;
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {'list': '{{'topic_'.$topic['title'].'_'.$topicID}}'},      // Optional list property.
                    'products': [{
                        'name': name,                      // Name or ID is required.
                        'id': spu,
                        'price': price,
                        'brand': '{{$topic['title']}}',
                        'category': 'topicPCWeb',
                        'variant': '',
                        'position': ''
                    }]
                }
            },
        });
        console.log('GA.Click'+name);
    }

    dataLayer.push({
        'ecommerce': {
            'currencyCode': 'EUR',                       // Local currency is optional.
            'impressions': [
                    @foreach($topic['infos'] as $value)
                    @if($value['type']=='product')
                    @if(isset($value['spus']))
                    @foreach($value['spus'] as $k=>$spu)
                {
                    'name': '{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}',       // Name or ID is required.
                    'id': '{{$spu}}',
                    'price': '{{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}',
                    'brand': '{{$topic['title']}}',
                    'category': 'topicPCWeb',
                    'variant': '',
                    'list': '{{'topic_'.$topic['title'].'_'.$topicID}}'
                },
                @endforeach
                @endif
                @endif
                @endforeach
            ]
        }
    });
</script>
<!--内容-->

<section class="body-container m-t-10x" id="gaProductClick">
    @inject('wishlist', 'App\Http\Controllers\UserController')
    <div class="topic-wrap">
        @if(isset($topic['infos']))
            <div class="bg-white">
            @foreach($topic['infos'] as $k => $value)
                @if($value['type'] == 'title')
                <!--标题-->
                    @if(!isset($value['skipId']))
                        <div class="topic-minWidth">
                            <div class="p-t-20x m-b-20x text-center">
                                <h2 class="bigNoodle font-size-big">{{ $value['value'] }}</h2>
                            </div>
                        </div>
                    @else
                        <div class="topic-minWidth">
                            <a href="@if($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/collection/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shop#@endif{{$value['skipId']}}">
                                <div class="p-t-20x m-b-20x text-center">
                                    <h2 class="font-size-llxx"><strong>{{ $value['value'] }}</strong></h2>
                                </div>
                            </a>
                        </div>
                    @endif
                @elseif($value['type'] == 'context')
                <!--描述-->
                    @if(!isset($value['skipId']))
                        <div class="topic-minWidth">
                            <div class="m-y-20x text-center">
                                <p class="m-b-0 font-size-base">{{ $value['value'] }}</p>
                            </div>
                        </div>

                    @else
                        <div class="topic-minWidth text-center">
                            <a href="@if($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/collection/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shop#@endif{{$value['skipId']}}">
                                <div class="m-y-20x topic-minWidth">
                                    <p class="m-b-0 font-size-base">{{ $value['value'] }}</p>
                                </div>
                            </a>
                        </div>
                    @endif
                @elseif($value['type']=='multilink')
                <!-- 锚点图 -->
                <div class="m-t-20x">
                    <div class="hotspot-image"
                         data-hotspot='@foreach($value['squas'] as $v){{'{"beginX":'.$v['startX'].',"beginY":'.$v['startY'].',"skipId":"'.$v['skipId'].'","skipType":"'.$v['skipType'].'","endX":'.$v['endX'].',"endY":'.$v['endY'].'},'}}@endforeach'>
                        <img class="img-fluid" src="{{config('runtime.CDN_URL')}}/n0/{{$value['imgPath']}}">
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
                <a href="@if(!isset($value['skipId']))javascript:;@elseif($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/collection/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shop#@endif{{$value['skipId']}}">
                    <div class="p-y-0 text-center figure" style="width: 100%;">
                        <img class="img-fluid img-lazy figure" data-original="{{config('runtime.CDN_URL')}}/n0/{{ $value['imgPath'] }}" src="{{env('CDN_Static')}}/images/product/bg-product@750.png">
                    </div>
                </a>

                @elseif($value['type'] == 'product')
                    <!--图文列表-->
                    @if(isset($value['spus']))
                    <div class="p-t-40x p-b-20x topic-minWidth">
                        <div data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=daily.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":1,"skipId":"{{ implode("_", $value['spus']) }}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}' class="row">
                            @foreach($value['spus'] as $spu)
                                <div class="col-xs-6">
                                    <div class="productList-item">
                                        <div class="image-container">
                                            <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=daily.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"{{$spu}}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}'
                                               href="/detail/{{$topic['spuInfos'][$spu]['spuBase']['seo_link']}}" data-spu="{{$spu}}" data-title="{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}" data-price="{{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}">
                                                <img class="img-fluid img-lazy figure"
                                                     data-original="{{config('runtime.CDN_URL')}}/n0/{{$topic['spuInfos'][$spu]['spuBase']['main_image_url']}}"
                                                     src="{{env('CDN_Static')}}/images/product/bg-product@336.png"
                                                     alt="{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}">
                                                    @if($topic['spuInfos'][$spu]['spuBase']['isPutOn'] != 1)
                                                        <div class="bg-soldout">
                                                            <span class="text bigNoodle font-size-sm">SOLD OUT</span>
                                                        </div>
                                                    @endif
                                            </a>
                                            @if(Session::has('user'))
                                                <span class="product-heart btn-heart">
                                                    <i class="iconfont btn-wish font-size-lxx @if(in_array($spu, $wishlist->wishlist())) active @endif" data-spu="{{$spu}}"></i>
                                                </span>
                                            @else
                                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$spu}}" data-referer="{{$_SERVER['REQUEST_URI']}}"></i></span>
                                            @endif
                                                <!--预售标志-->
                                            {{--@if(1 == $topic['spuInfos'][$spu]['spuBase']['sale_type'])
                                                <div class="presale-sign newPresale-sign">
                                                    --}}{{--<div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>--}}{{--
                                                    <a data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=daily.200001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":"{{$spu}}","topicId":{{$topicID}},"expid":0,"ver":"1.0.1","src":"PC"}'
                                                       data-link="/detail/{{$spu}}" data-spu="{{$spu}}" data-title="{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}"
                                                       data-price="{{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}"
                                                       class="newPresale-text bigNoodle font-size-xs">Limited Edition
                                                    </a>
                                                </div>
                                            @endif--}}
                                        </div>
                                        <div class="price-caption text-center">
                                            <!--预售-->
                                            @if(1 == $topic['spuInfos'][$spu]['spuBase']['sale_type'])
                                                <div class="bigNoodle font-size-llxx text-truncate p-x-20x">
                                                    <span>LIMITED EDITION</span>
                                                </div>
                                            @endif
                                            
                                            <div class="font-size-md text-truncate p-x-20x">
                                                {{$topic['spuInfos'][$spu]['spuBase']['main_title']}}
                                            </div>
                                            <div class="text-center">
                                                @if($topic['spuInfos'][$spu]['skuPrice']['price'] != $topic['spuInfos'][$spu]['skuPrice']['sale_price'])
                                                    <span class="font-size-md p-r-5x">${{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                                    <span class="font-size-md text-green text-throughLine">${{number_format($topic['spuInfos'][$spu]['skuPrice']['price']/100,2)}}</span>
                                                @else
                                                    <span class="font-size-md p-r-5x">${{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    @else
                        @if($value['style'] =='box-vertical')
                                <a class="text-center figure" style="width: 100%;" href="@if(!isset($value['skipId']))javascript:;@elseif($value['skipType']=='1')/detail/@elseif($value['skipType']=='2')/collection/@elseif($value['skipType']=='3')/topic/@elseif($value['skipType']=='4')/shop#@endif{{$value['skipId']}}">
                                    <img class="img-fluid img-lazy figure"
                                         data-original="{{config('runtime.CDN_URL')}}/n0/{{$value['imgPath']}}"
                                         src="{{env('CDN_Static')}}/images/product/bg-product@750.png" alt="">
                                </a>
                        @endif
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
                        url = '/detail/';
                        break;
                    case '2':
                        url = '/collection/';
                        break;
                    case '3':
                        url = '/topic/';
                        break;
                    case '4':
                        url = '/shop/';
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
