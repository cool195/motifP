<!-- header start-->
@include('header',['title'=>$data['main_title'],'description'=>$data['intro_short'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$data['main_image_url']])
<!-- header end-->
<!-- 添加购物车 -->
<input type="text" id="addToCart-quantity" value="1" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    // shopping detail 总商品浏览 埋点
    dataLayer.push({
        'ecommerce': {
            'detail': {
                'actionField': {'list': 'shopping detail'},    // 'detail' actions have an optional list property.
                'products': [{
                    'name': '{{$data['main_title']}}',         // Name or ID is required.
                    'id': '{{ $data['spu'] }}',
                    'price': '{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}',
                    'brand': 'Motif PC',
                    'category': '',
                    'variant': ''
                }]
            }
        }
    });

    // shopping detail 加入购物车
    function onAddToCart() {
        var quantity = document.getElementById('addToCart-quantity').value;
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': 'EUR',
                'add': {
                    'products': [{
                        'name': '{{$data['main_title']}}',
                        'id': '{{ $data['spu'] }}',
                        'price': '{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}',
                        'brand': 'Motif PC',
                        'category': '',
                        'variant': '',
                        'quantity': quantity
                    }]
                }
            }
        });
    }
</script>
<!-- 内容 -->
<section class="">
    <div class="container">
        <!-- 面包屑 地址 -->
        <div class="p-y-15x"><a href="#" class="text-productmMenu">Shop / Rings/Sassy </a>Sequins Cami</div>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="p-a-20x box-shadow bg-white" id="productImg">
                    <div class="product-bigImg gallery">
                        @if(isset($data['productImages']))
                            @foreach($data['productImages'] as $key => $image)
                                @if(0 == $key)
                                    <li style="display:block; width: 100%; position: relative;">
                                        <a href="{{config('runtime.CDN_URL')}}/n0/{{$image['img_path']}}"
                                           class="jqzoom" rel="gal1" title="triumph" id="jqzoom">
                                            <img class="img-fluid product-bigImg img-lazy"
                                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png"
                                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$image['img_path']}}">
                                        </a>
                                    @if(!empty($image['video_path']))
                                        <!-- 判断是否是视频 -->
                                            <div class="bg-productPlayer flex flex-alignCenter flex-justifyCenter"
                                                 id="btn-startPlayer" data-playerid="7n-dIXlyQ3M">
                                                <div class="play-content">
                                                    <img class="btn-productPlayer"
                                                         src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png" alt=""
                                                         style="width: 45px;">
                                                </div>
                                            </div>
                                    @endif
                                    <!-- 视频播放 -->
                                        <div class="bg-productDetailPlayer flex flex-alignCenter flex-justifyCenter">
                                            <div class="play-content" style="width: 100%">
                                                <div id="ytplayer" class="ytplayer" data-playid=""></div>
                                            </div>
                                        </div>
                                    </li>
                                @else
                                    <li style="display:none">
                                        <a title="" class="imgmore"
                                           href="{{config('runtime.CDN_URL')}}/n0/{{$image['img_path']}}"><img
                                                    src="{{config('runtime.CDN_URL')}}/n4/{{$image['img_path']}}"></a>
                                    </li>
                                @endif
                            @endforeach
                        @endif
                    </div>
                    <div class="clearfix"></div>

                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            @if(isset($data['productImages']))
                                @foreach($data['productImages'] as $key => $image)
                                    <div class="productImg-item swiper-slide m-r-10x">
                                        <a href="javascript:void(0);" class="product-smallImg"
                                           rel="{{"{gallery: 'gal1', smallimage: '".config('runtime.CDN_URL')}}/n1/{{$image['img_path']."',largeimage: '".config('runtime.CDN_URL')}}/n0/{{$image['img_path']."'}"}}">
                                            <!-- 视频 -->

                                            @if(!empty($image['video_path']))
                                                <img class="img-thumbnail small-img img-lazy @if(0 == $key) active @endif"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n3/{{$image['img_path']}}"
                                                     width="110" height="110" alt="{{ $data['main_title'] }}"
                                                     data-idplay="true" data-playid="{{$image['video_path']}}">
                                                <div class="bg-productPlayer flex flex-alignCenter flex-justifyCenter">
                                                    <img class="btn-productPlayer"
                                                         src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png" alt=""
                                                         style="width: 35px;">
                                                </div>
                                            @else
                                                <img class="img-thumbnail small-img img-lazy @if(0 == $key) active @endif"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n3/{{$image['img_path']}}"
                                                     width="110" height="110" alt="{{ $data['main_title'] }}"
                                                     data-idplay="false" data-playid="">
                                            @endif
                                        </a>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                        <div class="swiper-button-next"><i
                                    class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i>
                        </div>
                    </div>
                </div>
                @inject('wishlist', 'App\Http\Controllers\UserController')
                <div class="flex flex-alignCenter m-y-20x p-l-5x">
                    <span class="font-size-md sanBold">Add to wishlist for later view</span>
                    <span class="product-heart p-t-5x p-l-10x">
                        @if(Session::has('user'))
                        <i class="iconfont btn-wish font-size-lxx @if(in_array($data['spu'], $wishlist->wishlist())){{'active'}}@endif" data-spu="{{$data['spu']}}"></i>
                        @else
                        <i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$data['spu']}}"></i>
                        @endif
                    </span>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="box-shadow bg-white">
                    <div class="p-x-20x p-t-20x">
                        <div class="">
                            <span data-impr='{{config('runtime.CLK_URL')}}/log.gif?t=pv.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"spu":{{$data['spu']}},"main_sku":{{$data['skuPrice']['sku']}},"price":{{ $data['skuPrice']['sale_price'] }},"expid":0,"version":"1.0.1","src":"PC"}'
                                  class="product-title helveBold">{{ $data['main_title'] }}</span>
                        </div>
                        <!-- 设计师名称 -->
                        @if(isset($data['designer']))
                            <div class="p-t-5x p-b-10x">
                                {{--<span class="sanBold font-size-md p-l-5x p-r-20x">Designer:</span>--}}
                                <a href="/designer/{{$data['designer']['designer_id']}}"><span>{{ $data['designer']['designer_name'] }}</span></a>
                            </div>
                        @endif
                        <div class="product-price">
                            @if(isset($data['skuPrice']['skuPromotion']) && ($data['skuPrice']['skuPromotion']['promot_price']<$data['skuPrice']['skuPromotion']['price']))
                                <span class="sanBold p-r-10x text-primary newPrice text-red">${{ number_format(($data['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                                <span class="sanBold font-size-lxx text-common text-throughLine oldPrice">${{ number_format(($data['skuPrice']['skuPromotion']['price'] /100), 2) }}</span>
                            @else
                                <span class="sanBold p-r-10x text-primary newPrice">${{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}</span>
                            @endif
                        </div>
                        <div class="p-y-5x">
                            @if(isset($data['skuPrice']['skuPromotion']))
                                <span class="font-size-md">{{ $data['skuPrice']['skuPromotion']['promo_words'] }}</span>
                                <br/>
                            @endif
                            <span>{{$data['prompt_words']}}</span>
                        </div>
                        <hr class="hr-base">
                        <input hidden id="jsonStr" value="{{$jsonResult}}">
                        @if(!empty($data['spuAttrs']))
                            <input hidden id="productsku">
                            @foreach($data['spuAttrs'] as $spuAttr)
                                <fieldset class="text-left m-b-20x">
                                    <div class="text-primary font-size-md flex">
                                        <span class="p-r-20x">{{$spuAttr['attr_type_value']}}:</span>
                                        <span class="warning-info flex flex-alignCenter text-warning off"
                                              id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">{{'Please select '.$spuAttr['attr_type_value']}}
                                                !</span>
                                        </span>
                                    </div>
                                    <div class="m-l-15x">
                                        <div class="option-item">
                                            @foreach($spuAttr['skuAttrValues'] as $skuAttrValue )
                                                <div class="p-y-5x p-r-10x">
                                                    @if(!empty($skuAttrValue['skus']))
                                                        <div class="btn btn-itemProperty btn-sm"
                                                             id="{{'skutype'.$skuAttrValue['attr_value_id']}}"
                                                             data-type="{{'attr_type'.$spuAttr['attr_type']}}"
                                                             data-attr-type="{{$spuAttr['attr_type']}}"
                                                             data-attr-value-id="{{$skuAttrValue['attr_value_id']}}"
                                                             data-id="{{'skutype'.$skuAttrValue['attr_value_id']}}">{{$skuAttrValue['attr_value']}}
                                                        </div>
                                                    @else
                                                        <div class="btn btn-itemProperty btn-sm disabled">{{$skuAttrValue['attr_value']}}</div>
                                                    @endif
                                                </div>
                                            @endforeach
                                                <!-- size guide -->
                                                <div class="p-y-10x p-r-10x"><a class="text-underLine" target="_blank" href="#">Size Guide</a></div>
                                        </div>
                                    </div>
                                </fieldset>
                            @endforeach
                        @else
                            <input hidden id="productsku" value="{{$data['skuPrice']['sku']}}">
                        @endif
                        @if(isset($data['vasBases']))
                            @foreach($data['vasBases'] as $vas)
                                <fieldset class="text-left m-b-20x">
                                    <div class="text-primary font-size-md">{{ucfirst(strtolower($vas['vas_describe']))}}
                                        +${{number_format(($vas['vas_price'] / 100), 2)}}</div>
                                    <div class="m-l-15x">
                                        <div class="p-y-5x flex flex-alignCenter">
                                            <input type="text" id="{{'vas_id'.$vas['vas_id']}}"
                                                   class="input-engraving form-control m-r-20x text-primary disabled">
                                            <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                                        </div>
                                        <span class="warning-info flex flex-alignCenter text-warning off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Invalid character</span>
                                        </span>
                                    </div>
                                </fieldset>
                            @endforeach
                        @endif
                        <fieldset class="text-left m-b-20x">
                            <div class="flex flex-alignCenter">
                                <span class="text-primary font-size-md m-r-20x">Qty:</span>
                                <div class="btn-group flex m-r-15x" id="item-count">
                                    <div class="btn btn-cartCount btn-xs patb disabled" id="delQtySku" data-num="-1">
                                        <i class="iconfont icon-minus font-size-lg"></i>
                                    </div>
                                    <div class="btn btn-cartCount btn-xs font-size-base p-x-20x" id="skuQty"
                                         data-num="1">
                                        1
                                    </div>
                                    <div class="btn btn-cartCount btn-xs patb" id="addQtySku" data-num="1">
                                        <i class="iconfont icon-add font-size-lg"></i>
                                    </div>
                                </div>
                                <span class="warning-info flex flex-alignCenter text-warning off">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Invalid character</span>
                                </span>
                            </div>
                        </fieldset>
                    </div>

                @if(1 == $data['sale_type'])
                    <!-- 预售信息 -->
                        <div class="preorder-info">
                            @foreach($data['skuPrice']['skuPromotion']['pre_exp_descs'] as $value)
                                <div class="text-white font-size-md p-a-10x m-b-10x bg-red preorder-title">
                                    <div class="sanBold">{{$value['desc_title'].' : '.$value['desc_value']}}</div>
                                    <span class="preorder-fold"></span>
                                </div>
                            @endforeach

                            @if($data['isPutOn'] !=1)
                                <div class="p-x-20x p-y-10x font-size-md">
                                    <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png" alt="">
                                    <span class="p-l-10x stock-qtty">Sold Out</span>
                                </div>
                                <div class="p-b-10x">
                                    <div class="p-x-20x p-y-10x font-size-md limited-content">
                                        <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png">
                                        <span class="p-l-10x">Orders Closed</span>
                                    </div>
                                </div>
                            @else
                                @if(!isset($data['skuPrice']['skuPromotion']) || $data['skuPrice']['skuPromotion']['remain_time'] >= 0 || $data['isPutOn'] ==0 || !empty($data['spuStock']))
                                    <div class="p-b-10x">
                                        @if(!empty($data['spuStock']))
                                            <div class="p-x-20x p-y-10x font-size-md">
                                                <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png" alt="">
                                            <span class="p-l-10x stock-qtty">
                                                @if($data['spuStock']['stock_qtty'] - $data['spuStock']['saled_qtty'] > 0)
                                                    Only {{$data['spuStock']['stock_qtty'] - $data['spuStock']['saled_qtty']}}
                                                    Left
                                                @else Sold Out @endif
                                            </span>
                                            </div>
                                        @endif

                                        @if($data['skuPrice']['skuPromotion']['remain_time'] >= 0)
                                            @if($data['sale_status'])
                                                <div class="p-x-20x p-y-10x font-size-md limited-content"
                                                     data-begintime="{{$data['skuPrice']['skuPromotion']['start_time']}}"
                                                     data-endtime="{{$data['skuPrice']['skuPromotion']['end_time']}}"
                                                     data-lefttime="@if($data['skuPrice']['skuPromotion']['remain_time']>0){{$data['skuPrice']['skuPromotion']['remain_time']}}@else{{'0'}}@endif"
                                                     data-qtty="{{$data['spuStock']['stock_qtty']}}">
                                                    <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png" alt="">
                                                <span class="p-l-10x">Orders Close In <span
                                                            class="time_show"></span></span>
                                                </div>
                                            @else
                                                <div class="p-x-20x p-y-10x font-size-md limited-content">
                                                    <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png">
                                                    <span class="p-l-10x">Orders Closed</span>
                                                </div>
                                            @endif
                                        @endif

                                    </div>
                                @endif
                            @endif
                        </div>
                    @endif

                    <div class="p-x-20x">
                        <hr class="hr-base m-a-0">
                        <div class="text-center p-y-30x">
                            @if(Session::has('user'))
                                <a href="javascript:void(0);" id="productAddBag"
                                   class="btn btn-primary btn-lg btn-350 btn-addToBag @if(!$data['sale_status'] || $data['isPutOn']!=1 || $data['status_code'] != 100){{'disabled'}}@endif"
                                   data-action="post"> Add to Bag </a>
                            @else
                                <a href="/login" class="btn btn-primary btn-lg btn-350 btn-addToBag"> Add to Bag </a>
                            @endif
                        </div>
                    </div>
                </div>

                <div class="box-shadow bg-white m-t-20x p-x-20x p-b-20x">
                    <!-- shipping 说明 -->
                    <div class="p-t-15x p-b-10x flex flex-alignCenter">
                        <span class="p-r-10x"><i class="iconfont icon-car font-size-llxx"></i></span>
                        <span class="p-r-10x">This item is available for immediate shipping</span>
                    </div>
                    <hr class="hr-base m-a-0">
                    <!-- Description -->
                    <div class="sanBold font-size-md p-y-15x">Description:</div>
                    <div><p class="m-b-0">{!! str_replace("\n", "<br>",  $data['intro_short']) !!}</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

{{--@if(isset($data['designer']))--}}
    {{--<div class="container m-t-30x">--}}
        {{--<span class="sanBold font-size-md p-x-20x">Designer:</span>--}}
        {{--<a href="/designer/{{$data['designer']['designer_id']}}"><span--}}
                    {{--class="sanBold">{{ $data['designer']['designer_name'] }}</span></a>--}}
    {{--</div>--}}
{{--@endif--}}

{{--<div class="container m-t-30x">--}}
    {{--<ul class="nav nav-tabs">--}}
        {{--<li class="nav-item">--}}
            {{--<a class="nav-link font-size-md active" href="#Description" data-toggle="tab">Description</a>--}}
        {{--</li>--}}
        {{--@if(isset($data['templates']))--}}
            {{--@foreach($data['templates'] as $template)--}}
                {{--<li class="nav-item">--}}
                    {{--<a class="nav-link font-size-md btn-productTemplate" href="#template{{$template['template_id']}}"--}}
                       {{--data-tid="{{$template['template_id']}}" data-toggle="tab">{{$template['template_title']}}</a>--}}
                {{--</li>--}}
            {{--@endforeach--}}
        {{--@endif--}}
    {{--</ul>--}}
    {{--<div class="tab-content bg-white p-a-20x">--}}
        {{--<div class="tab-pane text-primary active" id="Description">--}}
            {{--<p class="m-b-0">{!! str_replace("\n", "<br>",  $data['intro_short']) !!}</p>--}}
        {{--</div>--}}

        {{--@if(isset($data['templates']))--}}
            {{--@foreach($data['templates'] as $template)--}}
                {{--<div class="tab-pane text-primary" id="template{{$template['template_id']}}">--}}
                    {{--<div class="loading" style="display: block;">--}}
                        {{--<div class="loader"></div>--}}
                        {{--<div class="text-center p-t-10x">Loading...</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--@endforeach--}}
        {{--@endif--}}

    {{--</div>--}}
{{--</div>--}}

<!-- 文字说明 -->
<div class="container m-t-20x p-x-20x">
    <div class="row box-shadow bg-white">
        <div class="col-lg-4">
            <div class=" p-a-20x">
                <div class="text-center font-size-md sanBold">Free U.S Shipping</div>
                <div class="p-t-10x">We offer free shipping on all U.S. orders via USPS and UPS. Learn more. <a
                            href="#" class="text-underLine">Learn more</a>.</div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class=" p-a-20x">
                <div class="text-center font-size-md sanBold">Easy Returns</div>
                <div class="p-t-10x">Send your return request to service@motif.me and get the return label so you can easily send us your return. <a
                            href="#" class="text-underLine">Learn more</a>.</div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class=" p-a-20x">
                <div class="text-center font-size-md sanBold">International Shipping</div>
                <div class="p-t-10x">We offer free shipping on over 30+ countries and order over $79 will be free express shipping. <a
                            href="#" class="text-underLine">Learn more</a>.</div>
            </div>
        </div>
    </div>
</div>

<div class="container m-t-30x m-b-30x">
    @if(isset($recommended['list']) && !empty($recommended['list']))
        <h4 class="helveBold text-main p-l-10x">You May Also Like</h4>
        <div class="row p-t-20x" id="alsoLike-list" data-impr="{{$recommended['impr']}}">
            @foreach($recommended['list'] as $list)
                <div class="col-md-3 col-xs-6">
                    <div class="productList-item">
                        <div class="image-container">
                            <a href="/detail/{{$list['spu']}}" data-impr="{{$list['impr']}}"
                               data-clk="{{$list['clk']}}">
                                <img class="img-fluid img-lazy"
                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{ $list['main_image_url']}}"
                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                     alt="{{ $list['main_title'] }}">
                                <div class="bg-heart"></div>
                            </a>
                            @if(Session::has('user'))
                                <span class="product-heart btn-heart">
                                <i class="iconfont btn-wish font-size-lxx @if(in_array($list['spu'], $wishlist->wishlist())){{'active'}}@endif"
                                   data-spu="{{$list['spu']}}"></i>
                            </span>
                            @else
                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"
                                                                         data-actionspu="{{$list['spu']}}"></i></span>
                            @endif
                            @if(1 == $list['sale_type'])
                                <div class="newPresale-sign presale-sign ">
                                    {{--<div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>--}}
                                    <div class="newPresale-text helveBold font-size-xs text-primary">Limited Edition</div>
                                </div>
                            @endif
                        </div>
                        <div class="price-caption helveBold">
                            <div class="text-center font-size-md text-primary text-truncate p-x-20x">{{ $list['main_title'] }}</div>
                            <div class="text-center">
                                @if($list['skuPrice']['sale_price'] != $list['skuPrice']['price'])
                                    <span class="font-size-md text-primary p-r-5x text-red">${{ number_format(($list['skuPrice']['sale_price'] / 100), 2) }}</span>
                                    <span class="font-size-base text-common text-throughLine">${{ number_format(($list['skuPrice']['price'] / 100), 2) }}</span>
                                @else
                                    <span class="font-size-md text-primary p-r-5x">${{ number_format(($list['skuPrice']['sale_price'] / 100), 2) }}</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="text-center m-y-10x seeMore-info">
            <div class="">
                <div class="btn btn-gray btn-lg btn-380 btn-seeMoreALP">VIEW MORE</div>
            </div>
            <div class="loading product-loading" style="display: none">
                <div class="loader">
                </div>
                <div class="text-center p-l-15x">Loading...</div>
            </div>
        </div>
    @endif
</div>


<!-- 购买成功提示 -->
<div class="remodal modal-content remodal-xs" data-remodal-id="additem-modal" id="addItem-modalDialog" data-spu="">
    <div class="text-center font-size-md m-y-10x">Item Added</div>
</div>

<!-- 购买失败提示 -->
<div class="remodal modal-content remodal-xs" data-remodal-id="additemfail-modal" id="addItemFail-modalDialog"
     data-spu="">
    <div class="text-center font-size-md m-y-10x">Added Failled</div>
</div>

<!-- footer start -->
@include('footer')
<!-- footer end -->

<template id="tpl-productTemplate">
    @{{ each infos }}
    @{{ if $value.type == "title" }}
    <h4 class="sanBold m-b-15x">@{{ $value.value }}</h4>
    @{{ /if }}
    @{{ if $value.type == "context" }}
    <p>@{{ $value.value }}</p>
    @{{ /if }}
    @{{ if $value.type == "product" }}
    <div class="text-center m-b-15x"><img class="img-fluid figure"
                                          src="{{config('runtime.CDN_URL')}}/n1/@{{ $value.imgPath }}" alt=""></div>
    @{{ /if }}
    @{{ /each }}
</template>