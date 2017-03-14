<!-- header start-->
@include('header',['title'=>$data['seo_title'],'description'=>$data['seo_describe'],'keywords'=>$data['seo_keyword'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$data['main_image_url']])
<!-- header end-->
<!-- 添加购物车 -->
<input type="text" id="addToCart-quantity" value="1" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    // 推荐商品埋点
    {{--dataLayer.push({--}}
        {{--'ecommerce': {--}}
            {{--'currencyCode': 'EUR',                       // Local currency is optional.--}}
            {{--'impressions': [--}}
                    {{--@foreach($recommended['list'] as $product)--}}
                {{--{--}}
                    {{--'name': '{{$product['main_title']}}',       // Name or ID is required.--}}
                    {{--'id': '{{$product['spu']}}',--}}
                    {{--'price': '{{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}',--}}
                    {{--'brand': 'Motif PC',--}}
                    {{--'list': '{{'shopping detail_'.$data['main_title'].'_'.$data['spu']}}',--}}
                    {{--'position': 1--}}
                {{--},--}}
                {{--@endforeach--}}
            {{--]--}}
        {{--}--}}
    {{--});--}}
    // 商品详情
    dataLayer.push({
        'ecommerce': {
            'detail': {
                'actionField': {'list': '{{'shopping Detail_'.$data['main_title'].'_'.$data['spu']}}'},
                'products': [{
                    'name': '{{$data['main_title']}}',
                    'id': '{{ $data['spu'] }}',
                    'price': '{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}',
                    'brand': 'Motif',
                    'category': '{{$data['category_name']}}',
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
                        'category': '{{$data['category_name']}}',
                        'variant': '',
                        'quantity': quantity
                    }]
                }
            }
        });
    }

    var content_name = '{{$data['main_title']}}';
    var content_category = '{{ $data['category_name'] }}';
    var content_ids = ['{{$data['spu']}}'];
    var totalPrice = '{{number_format(($data['skuPrice']['sale_price'] / 100), 2)}}';
</script>
<!-- 内容 -->
<section class="body-container">
    <div class="container">
        <!-- 面包屑 地址 -->
        <div class="p-y-15x">
            <a href="/shop" class="text-productmMenu font-size-sm">Shop</a>
            <span class="font-size-xs">></span> <a href="/shop/{{$data['category_id']}}" class="text-productmMenu font-size-sm">{{$data['category_name']}}</a>
            <span class="font-size-xs">></span> <a href="/detail/{{$data['seo_link']}}" class="text-productmMenu1 font-size-sm">{{$data['main_title']}}</a></div>
        <div class="row">
            <div class="col-lg-7 col-md-7">
                <div class="smallImg-list">
                    <div class="swiper-container swiper-productImgList">
                        <div class="productImg-list swiper-wrapper">
                            @if(isset($data['productImages']))
                                @foreach($data['productImages'] as $key => $image)
                                    @if($image['useness_type'] != 7)
                                    <div class="productImg-item swiper-slide">
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
                                                         src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                         alt=""
                                                         style="width: 35px;">
                                                </div>
                                            @else
                                                <img class="img-thumbnail small-img img-lazy @if(0 == $key) active @endif"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n3/{{$image['img_path']}}"
                                                     width="88" height="88" alt="{{ $data['main_title'] }}"
                                                     data-idplay="false" data-playid="">
                                            @endif
                                        </a>
                                    </div>
                                    @endif
                                @endforeach
                            @endif
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left"></i>
                        </div>
                    </div>
                </div>
                <div class="bigImg-list">
                    <div class="bg-white  @if(1 == $data['sale_type']) productImg-border  @endif" id="productImg" >
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
                                                     id="btn-startPlayer" data-playerid="{{$image['video_path']}}">
                                                    <div class="play-content">
                                                        <img class="btn-productPlayer"
                                                             src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                             alt=""
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

                        @if(1 == $data['sale_type'])
                            {{--预售标志--}}
                            <div class="presale-sign">
                                <span class="newPresale-text bigNoodle p-x-20x">Limited Edition</span>
                            </div>
                        @endif

                        <!-- wish -->
                        @inject('wishlist', 'App\Http\Controllers\UserController')
                        <div class="flex flex-alignCenter" id="productDetail-wish">
                            {{--<span class="font-size-md sanBold">Add to wishlist</span>--}}
                        <span class="product-heart">
                            @if(Session::has('user'))
                                <i class="iconfont btn-detailWish font-size-lxx @if(in_array($data['spu'], $wishlist->wishlist())){{'active'}}@endif"
                                   data-spu="{{$data['spu']}}"></i>
                            @else
                                <i class="iconfont btn-detailWish font-size-lxx" data-actionspu="{{$data['spu']}}" data-referer="{{$_SERVER['REQUEST_URI']}}"></i>
                            @endif
                        </span>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-lg-5 col-md-5" id="productInfo">
                <div class="bg-white">
                    <div class="p-l-20x">
                        <div class="">
                            <span class="product-title avenirBold">{{ $data['main_title'] }}</span>
                        </div>
                        <!-- 设计师名称 -->
                        @if(isset($data['designer']))
                            <div class="">
                                <a class="font-size-sm" href="/collection/{{$data['designer']['designer_id']}}"><span>{{ $data['designer']['designer_name'] }}</span></a>
                            </div>
                        @endif
                        <div class="product-price">
                            @if(isset($data['skuPrice']['skuPromotion']) && ($data['skuPrice']['skuPromotion']['promot_price']<$data['skuPrice']['skuPromotion']['price']))
                                <span class="avenirMedium p-r-5x text-primary newPrice">${{ number_format(($data['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                                <span class="avenirMedium font-size-sm text-green text-throughLine oldPrice">${{ number_format(($data['skuPrice']['skuPromotion']['price'] /100), 2) }}</span>
                            @else
                                <span class="avenirMedium p-r-10x text-primary newPrice">${{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}</span>
                            @endif
                        </div>
                        @if($data['prompt_words'] || $data['skuPrice']['skuPromotion']['promo_words'])
                            <div class="">
                                <div class="font-size-sm">{{ $data['skuPrice']['skuPromotion']['promo_words'] }}</div>
                                <div class="font-size-sm">{{$data['prompt_words']}}</div>
                            </div>
                        @endif
                        {{--<hr class="hr-base">--}}
                        <input hidden id="jsonStr" value="{{$jsonResult}}">
                        @if(!empty($data['spuAttrs']))
                            <input hidden id="productsku">
                            @foreach($data['spuAttrs'] as $spuAttr)
                                <fieldset class="text-left m-t-15x m-b-15x productAttr-item">
                                    <div class="text-primary font-size-sm flex">
                                        <span class="p-r-20x">{{$spuAttr['attr_type_value']}}:</span>

                                        <!-- 下拉选 属 性 -->
                                        {{--@if($spuAttr['attr_select_flag'])--}}
                                        {{--<span class="productAttr">--}}
                                            {{--<div class="dropdown productAttr-dropdown ">--}}
                                                {{--<button class="btn btn-productAttr font-size-sm" type="button">--}}
                                                    {{--Select {{$spuAttr['attr_type_value']}}--}}
                                                {{--</button>--}}
                                                {{--<div class="dropdown-menu productAttr-menu font-size-sm p-t-5x">--}}
                                                    {{--@foreach($spuAttr['skuAttrValues'] as $skuAttrValue )--}}
                                                        {{--@if(!empty($skuAttrValue['skus']))--}}
                                                            {{--<a href="javascript:;" class="dropdown-item"--}}
                                                               {{--@if($skuAttrValue['img_path'])--}}
                                                               {{--rel="{{"{gallery: 'gal1', smallimage: '".config('runtime.CDN_URL')}}/n1/{{$skuAttrValue['img_path']."',largeimage: '".config('runtime.CDN_URL')}}/n0/{{$skuAttrValue['img_path']."'}"}}"--}}
                                                               {{--@endif--}}
                                                               {{--id="{{'skutype'.$skuAttrValue['attr_value_id']}}"--}}
                                                               {{--data-type="{{'attr_type'.$spuAttr['attr_type']}}"--}}
                                                               {{--data-attr-type="{{$spuAttr['attr_type']}}"--}}
                                                               {{--data-attr-value-id="{{$skuAttrValue['attr_value_id']}}"--}}
                                                               {{--data-id="{{'skutype'.$skuAttrValue['attr_value_id']}}">{{$skuAttrValue['attr_value']}}--}}
                                                            {{--</a>--}}
                                                        {{--@else--}}
                                                        {{--@endif--}}
                                                    {{--@endforeach--}}
                                                {{--</div>--}}
                                            {{--</div>--}}

                                            {{--@if(in_array($spuAttr['attr_type_value'],array('Ring Size','Women Size','Men Size')))--}}
                                                {{--<a class="sizeGuide p-l-10x" target="_blank" href="{{'/service/24?template=1'}}">Size Guide</a>--}}
                                            {{--@endif--}}

                                            {{--<span class="warning-info flex flex-alignCenter text-warning off"--}}
                                                  {{--id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0">--}}
                                                {{--<i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>--}}
                                                {{--<span class="font-size-sm">{{'Please select '.$spuAttr['attr_type_value']}}!</span>--}}
                                            {{--</span>--}}
                                        {{--</span>--}}
                                        {{--@endif--}}
                                        <!--  下拉选 属性 -->

                                        <!-- 框选 属性 -->
                                        <span class="warning-info flex flex-alignCenter text-warning off"
                                              id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0">
                                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                                <span class="font-size-sm">{{'Please select '.$spuAttr['attr_type_value']}}!</span>
                                        </span>
                                    </div>

                                    <!-- 框选 属性 -->
                                    <div class="">
                                        <div class="option-item">
                                            @foreach($spuAttr['skuAttrValues'] as $skuAttrValue )
                                                <div class="p-y-5x p-r-10x">
                                                    @if(!empty($skuAttrValue['skus']))
                                                        <a href="javascript:;" class="btn btn-itemProperty"
                                                           @if($skuAttrValue['img_path'])
                                                           rel="{{"{gallery: 'gal1', smallimage: '".config('runtime.CDN_URL')}}/n1/{{$skuAttrValue['img_path']."',largeimage: '".config('runtime.CDN_URL')}}/n0/{{$skuAttrValue['img_path']."'}"}}"
                                                           @endif
                                                           id="{{'skutype'.$skuAttrValue['attr_value_id']}}"
                                                           data-type="{{'attr_type'.$spuAttr['attr_type']}}"
                                                           data-attr-type="{{$spuAttr['attr_type']}}"
                                                           data-attr-value-id="{{$skuAttrValue['attr_value_id']}}"
                                                           data-id="{{'skutype'.$skuAttrValue['attr_value_id']}}">{{$skuAttrValue['attr_value']}}
                                                        </a>
                                                    @else
                                                        <div class="btn btn-itemProperty disabled">{{$skuAttrValue['attr_value']}}</div>
                                                    @endif
                                                </div>
                                            @endforeach
                                            @if(in_array($spuAttr['attr_type_value'],array('Ring Size','Women Size','Men Size')))
                                                <div class="p-y-10x p-r-10x font-size-sm"><a class="sizeGuide" target="_blank"
                                                                                href="{{'/service/24?template=1'}}">Size Guide</a></div>
                                            @endif
                                        </div>
                                    </div>
                                    <!-- 框选 属性-->


                                </fieldset>
                            @endforeach
                        @else
                            <input hidden id="productsku" value="{{$data['skuPrice']['sku']}}">
                        @endif
                        @if(isset($data['vasBases']))
                            @foreach($data['vasBases'] as $vas)
                                <fieldset class="text-left m-b-15x">
                                    <div class="text-primary font-size-sm">{{ucfirst(strtolower($vas['vas_describe']))}}
                                        +${{number_format(($vas['vas_price'] / 100), 2)}}</div>
                                    <div class="">
                                        <div class="p-y-5x flex flex-alignCenter">
                                            <input type="text" id="{{'vas_id'.$vas['vas_id']}}"
                                                   class="input-engraving form-control m-r-20x text-primary disabled">
                                            <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                                        </div>
                                        <span class="warning-info flex flex-alignCenter text-warning off">
                                            <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                            <span class="font-size-sm">Invalid character</span>
                                        </span>
                                    </div>
                                </fieldset>
                            @endforeach
                        @endif
                        <fieldset class="text-left m-b-20x">
                            <div class="flex flex-alignCenter">
                                <span class="text-primary font-size-sm m-r-20x">QUANTITY:</span>
                                <div class="btn-group flex m-r-15x" id="item-count">
                                    <div class="btn btn-cartCount patb disabled" id="delQtySku" data-num="-1">
                                        <strong><i class="iconfont icon-arrow-bottom font-size-xs"></i></strong>
                                    </div>
                                    <div class="btn btn-cartCount font-size-sm" id="skuQty" data-num="1">
                                        1
                                    </div>
                                    <div class="btn btn-cartCount patb" id="addQtySku" data-num="1">
                                        <strong><i class="iconfont icon-arrow-up font-size-xs"></i></strong>
                                    </div>
                                </div>
                                <span class="warning-info flex flex-alignCenter text-warning off">
                                    <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                    <span class="font-size-sm">Invalid character</span>
                                </span>
                            </div>
                        </fieldset>
                    </div>

                    <div class="p-l-20x m-b-20x">
                        {{--<hr class="hr-base m-a-0">--}}
                        <div class="text-left">
                            {{--@if(Session::has('user'))--}}
                            <a href="javascript:void(0);" id="productAddBag"
                               class="btn btn-200 btn-addToBag bigNoodle font-size-lxx @if(!$data['sale_status'] || $data['isPutOn']!=1 || $data['status_code'] != 100){{'disabled'}}@endif"
                               data-action="post"> ADD TO BAG </a>
                            {{--@else--}}
                            {{--<a href="/login" class="btn btn-primary btn-lg btn-350 btn-addToBag"> Add to Bag </a>--}}
                            {{--@endif--}}
                        </div>
                    </div>

                @if(1 == $data['sale_type'])
                    <!-- 预售信息 -->
                        <div class="preorder-info p-l-20x m-b-20x">
                            @foreach($data['skuPrice']['skuPromotion']['pre_exp_descs'] as $value)
                                <div class="text-primary font-size-base m-b-10x preorder-title">
                                    <div class="avenirMedium">{{$value['desc_title']}}</div>
                                </div>
                                <div class="font-size-md">
                                    <span class="stock-qtty font-size-sm">{{$value['desc_value']}}</span>
                                </div>
                            @endforeach

                            @if($data['isPutOn'] !=1)
                                <div class="font-size-md">
                                    <span class="stock-qtty font-size-sm">Sold Out</span>
                                </div>
                                <div class="">
                                    <div class="font-size-md limited-content">
                                        <span class="font-size-sm">Orders Closed</span>
                                    </div>
                                </div>
                            @else
                                @if(!isset($data['skuPrice']['skuPromotion']) || $data['skuPrice']['skuPromotion']['remain_time'] >= 0 || $data['isPutOn'] ==0 || !empty($data['spuStock']))
                                    <div class="">
                                        @if(!empty($data['spuStock']))
                                            <div class="font-size-sm">
                                            <span class="stock-qtty">
                                                @if($data['spuStock']['stock_qtty'] - $data['spuStock']['saled_qtty'] > 0)
                                                    Only {{$data['spuStock']['stock_qtty'] - $data['spuStock']['saled_qtty']}} Left
                                                @else Sold Out @endif
                                            </span>
                                            </div>
                                        @endif

                                        @if($data['skuPrice']['skuPromotion']['remain_time'] >= 0)
                                            @if($data['sale_status'])
                                                <div class="font-size-sm limited-content"
                                                     data-begintime="{{$data['skuPrice']['skuPromotion']['start_time']}}"
                                                     data-endtime="{{$data['skuPrice']['skuPromotion']['end_time']}}"
                                                     data-lefttime="@if($data['skuPrice']['skuPromotion']['remain_time']>0){{$data['skuPrice']['skuPromotion']['remain_time']}}@else{{'0'}}@endif"
                                                     data-qtty="{{$data['spuStock']['stock_qtty']}}">
                                                <span class="">Orders Close In <span
                                                            class="time_show"></span></span>
                                                </div>
                                            @else
                                                <div class="font-size-sm limited-content">
                                                    <img src="{{config('runtime.Image_URL')}}/images/product/icon-flash@2x.png">
                                                    <span class="">Orders Closed</span>
                                                </div>
                                            @endif
                                        @endif

                                    </div>
                                @endif
                            @endif
                        </div>
                    @endif

                </div>

                <div class="p-l-20x">
                    <!-- Description -->
                    <div class="avenirMedium font-size-base m-b-10x">DESCRIPTION:</div>
                    <div><p class="m-b-0 font-size-sm">{!! str_replace("\n", "<br>",  $data['intro_short']) !!}</p></div>
                </div>

                <!-- You May Also Like -->
                @if(isset($recommended['list']) && !empty($recommended['list']))
                <div class="p-t-30x p-l-20x">
                    <div class="avenirMedium font-size-base m-b-10x">YOU MIGHT ALSO LIKE:</div>
                    <div class="swiper-container swiper-alsolikeList">
                        <div class="swiper-wrapper">
                                @foreach($recommended['list'] as $k=>$list)
                                        <div class="productImg-item swiper-slide">
                                            <a href="/detail/{{$list['seo_link']}}" data-impr="{{$list['impr']}}" data-clk="{{$list['clk']}}">
                                                <img class="small-img img-lazy"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@140.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n2/{{ $list['main_image_url']}}"
                                                     width="90" height="90" alt="" >
                                            </a>
                                        </div>
                                @endforeach
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left"></i></div>
                    </div>
                </div>
                @endif

            </div>
        </div>
    </div>
</section>

<!-- 文字说明 -->
@if(isset($data['templates']))
    <div class="container m-t-20x p-x-20x">
        <div class="row product-description p-y-15x">
            <div class="col-lg-4">
                <div class=" p-a-20x">
                    <div class="text-center font-size-md avenirBold">FREE U.S. SHIPPING</div>
                    <div class="p-t-10x text-center">We offer Free Shipping on all U.S. orders, with free upgrade to
                        Expedited
                        Shipping on orders over $79. <a target="_blank" href="{{'/service/23?template=1'}}"
                                                        class="text-underLine">Learn more</a>.
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class=" p-a-20x">
                    <div class="text-center font-size-md avenirBold">EASY RETURNS</div>
                    <div class="p-t-10x text-center">Simply send your return request to service@motif.me within 30 days
                        of delivery.
                        Additional terms may apply. <a target="_blank" href="{{'/service/23?template=1'}}"
                                                       class="text-underLine">Learn more</a>.
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class=" p-a-20x">
                    <div class="text-center font-size-md avenirBold">INTERNATIONAL SHIPPING</div>
                    <div class="p-t-10x text-center">We offer Free Shipping to over 30+ countries.
                        <a target="_blank" href="{{'/service/23?template=1'}}" class="text-underLine">Learn more</a>.
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
{{--<div class="container m-t-30x m-b-30x">--}}
    {{--@if(isset($recommended['list']) && !empty($recommended['list']))--}}
        {{--<h4 class="helveBold text-main p-l-10x">You May Also Like</h4>--}}
        {{--<div class="row p-t-20x" id="alsoLike-list" data-impr="{{$recommended['impr']}}">--}}
            {{--@foreach($recommended['list'] as $k=>$list)--}}
                {{--<div class="col-md-3 col-xs-6 detailCommendShop" @if($k>3){{'hidden'}}@endif>--}}
                    {{--<div class="productList-item">--}}
                        {{--<div class="image-container">--}}
                            {{--<a href="/detail/{{$list['spu']}}" data-impr="{{$list['impr']}}"--}}
                               {{--data-clk="{{$list['clk']}}">--}}
                                {{--<img class="img-fluid img-lazy"--}}
                                     {{--data-original="{{config('runtime.CDN_URL')}}/n1/{{ $list['main_image_url']}}"--}}
                                     {{--src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"--}}
                                     {{--alt="{{ $list['main_title'] }}">--}}
                                {{--@if($list['image_paths'][0])--}}
                                    {{--<img class="img-fluid productImg-hover"--}}
                                         {{--src="{{config('runtime.CDN_URL')}}/n2/{{$list['image_paths'][0]}}"--}}
                                         {{--alt="{{$list['main_title']}}">--}}
                                {{--@endif--}}
                                {{--<div class="bg-heart"></div>--}}
                            {{--</a>--}}
                            {{--@if(Session::has('user'))--}}
                                {{--<span class="product-heart btn-heart">--}}
                                {{--<i class="iconfont btn-wish font-size-lxx @if(in_array($list['spu'], $wishlist->wishlist())){{'active'}}@endif"--}}
                                   {{--data-spu="{{$list['spu']}}"></i>--}}
                            {{--</span>--}}
                            {{--@else--}}
                                {{--<span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"--}}
                                                                         {{--data-actionspu="{{$list['spu']}}"></i></span>--}}
                            {{--@endif--}}
                            {{--@if(1 == $list['sale_type'])--}}
                                {{--<div class="newPresale-sign presale-sign ">--}}
                                    {{--<div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>--}}
                                    {{--<div class="newPresale-text helveBold font-size-xs text-primary">Limited Edition--}}
                                    {{--</div>--}}
                                {{--</div>--}}
                            {{--@endif--}}
                        {{--</div>--}}
                        {{--<div class="price-caption helveBold">--}}
                            {{--<div class="text-center font-size-md text-primary text-truncate p-x-20x">{{ $list['main_title'] }}</div>--}}
                            {{--<div class="text-center">--}}
                                {{--@if($list['skuPrice']['sale_price'] != $list['skuPrice']['price'])--}}
                                    {{--<span class="font-size-md text-primary p-r-5x text-red">${{ number_format(($list['skuPrice']['sale_price'] / 100), 2) }}</span>--}}
                                    {{--<span class="font-size-base text-green text-throughLine">${{ number_format(($list['skuPrice']['price'] / 100), 2) }}</span>--}}
                                {{--@else--}}
                                    {{--<span class="font-size-md text-primary p-r-5x">${{ number_format(($list['skuPrice']['sale_price'] / 100), 2) }}</span>--}}
                                {{--@endif--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--@endforeach--}}
        {{--</div>--}}
        {{--<div class="text-center m-y-10x seeMore-info">--}}
            {{--<div class="">--}}
                {{--<div class="btn btn-gray btn-lg btn-380 btn-seeMoreALP">VIEW MORE</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--@endif--}}
{{--</div>--}}

<script>
    var _learnq = _learnq || [];
    _learnq.push(['track', 'Viewed Product', {
        Title: '{{$data['main_title']}}',
        ItemId: '{{ $data['spu'] }}',
        Categories: '{{ $data['category_name'] }}', // The list of categories is an array of strings.
        ImageUrl: '{{config('runtime.CDN_URL')}}/n0/{{ $data['main_image_url'] }}',
        Url: 'https://www.motif.me{{ $_SERVER['REQUEST_URI'] }}',
        Brand: 'Motif PC',
        Price: '{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}'
    }]);
</script>

<!-- 购买成功提示 -->
<div class="remodal remodal-xs" data-remodal-id="additem-modal" id="addItem-modalDialog" data-spu="">
    <div class="text-center font-size-llx m-y-10x bigNoodle">Item Added</div>
</div>

<!-- 购买失败提示 -->
<div class="remodal remodal-xs" data-remodal-id="additemfail-modal" id="addItemFail-modalDialog"
     data-spu="">
    <div class="text-center font-size-llx m-y-10x bigNoodle">Added Failled</div>
</div>
<img src='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=pv.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"spu":{{$data['spu']}},"main_sku":{{$data['skuPrice']['sku']}},"price":{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }},"expid":0,"version":"1.0.1","src":"PC"}&ref={{$_SERVER['HTTP_REFERER']}}' hidden>

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


<script>
    var _learnq = _learnq || [];
    var trackAddToBag = function () {
        _learnq.push(['track', 'Add to Bag Successfully', {
            'SPU' : '{{$data['spu']}}',
            'Name' : '{{$data['main_title']}}',
            'ImageUrl' : '{{config('runtime.CDN_URL')}}/n0/{{ $data['main_image_url'] }}',
            'Url': 'https://www.motif.me{{ $_SERVER['REQUEST_URI'] }}',
            'ItemPrice' : '{{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}',
            'Categories' : '{{ $data['category_name'] }}',
            'Brand' : 'Motif PC'
        }]);
    };

    @if(Session::has('user'))
       $('#userEmail').val('{{Session::get('user.login_email')}}');
    @endif
</script>