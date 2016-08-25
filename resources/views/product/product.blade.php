<!-- header start-->
@include('header',['title'=>$data['main_title'],'description'=>$data['intro_short']])
<!-- header end-->

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="p-a-20x box-shadow bg-white">

                    <div class="product-bigImg gallery">
                        @if(isset($data['productImages']))
                            @foreach($data['productImages'] as $key => $image)
                                @if(0 == $key)
                                    <li style="display:block">
                                        <a href="{{config('runtime.CDN_URL')}}/n0/{{$image['img_path']}}"
                                           class="jqzoom" rel="gal1" title="triumph" id="jqzoom">
                                            <img class="img-fluid product-bigImg img-lazy"
                                                 src="/images/product/bg-product@750.png"
                                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$image['img_path']}}">
                                        </a>
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
                                    <div class="productImg-item swiper-slide p-r-10x">
                                        <a href="javascript:void(0);"
                                           rel="{{"{gallery: 'gal1', smallimage: '".config('runtime.CDN_URL')}}/n1/{{$image['img_path']."',largeimage: '".config('runtime.CDN_URL')}}/n0/{{$image['img_path']."'}"}}">
                                            <img class="img-thumbnail small-img img-lazy @if(0 == $key) active @endif"
                                                 src="/images/product/bg-product@140.png"
                                                 data-original="{{config('runtime.CDN_URL')}}/n3/{{$image['img_path']}}"
                                                 width="110" height="110" alt="{{ $data['main_title'] }}">
                                        </a>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                        <div class="swiper-button-next"><i class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="p-a-20x box-shadow bg-white">
                    @inject('wishlist', 'App\Http\Controllers\UserController')
                    <div class="flex flex-fullJustified">
                        <span class="product-title helveBold">{{ $data['main_title'] }}</span>
                        @if(Session::has('user'))
                            <span class="product-heart">
                                <i class="iconfont btn-wish font-size-lxx @if(in_array($data['spu'], $wishlist->wishlist())){{'active'}}@endif" data-spu="{{$data['spu']}}"></i>
                            </span>
                        @else
                            <a href="/login"><span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"></i></span></a>
                        @endif
                    </div>
                    <div class="product-price">
                        @if(isset($data['skuPrice']['skuPromotion']))
                            <span class="sanBold p-r-10x text-primary">${{ number_format(($data['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                            <span class="sanBold font-size-lxx text-common text-throughLine">${{ number_format(($data['skuPrice']['skuPromotion']['price'] /100), 2) }}</span>
                        @else
                            <span class="sanBold p-r-10x text-primary">${{ number_format(($data['skuPrice']['sale_price'] / 100), 2) }}</span>
                        @endif
                    </div>
                    <div class="p-y-5x">
                        @if(isset($data['skuPrice']['skuPromotion']))
                            <span class="font-size-md">{{ $data['skuPrice']['skuPromotion']['display'] }}
                                &nbsp;&nbsp;</span>
                        @endif
                        <span>{{$data['prompt_words']}}</span>
                    </div>
                    <hr class="hr-common">
                    <input hidden id="jsonStr" value="{{$jsonResult}}">
                    @if(isset($data['spuAttrs']))
                        <input hidden id="productsku">
                        @foreach($data['spuAttrs'] as $spuAttr)
                            <fieldset class="text-left m-b-20x">
                                <div class="text-primary font-size-md flex">
                                    <span class="p-r-20x">{{$spuAttr['attr_type_value']}}:</span>
                                    <span class="warning-info flex flex-alignCenter text-warning off"
                                        id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">{{'Please select '.$spuAttr['attr_type_value']}}!</span>
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
                                <div class="text-primary font-size-md">{{$vas['vas_describe']}}
                                    +${{number_format(($vas['vas_price'] / 100), 2)}}</div>
                                <div class="m-l-15x">
                                    <div class="p-y-5x flex flex-alignCenter">
                                        <input type="text" id="{{'vas_id'.$vas['vas_id']}}"
                                               class="input-engraving form-control m-r-20x text-primary disabled">
                                        <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                                    </div>
                                </div>
                            </fieldset>
                        @endforeach
                    @endif
                    <fieldset class="text-left m-b-20x">
                        <div class="flex flex-alignCenter">
                            <span class="text-primary font-size-md m-r-20x">Qty:</span>
                            <div class="btn-group flex" id="item-count">
                                <div class="btn btn-cartCount btn-xs patb disabled" id="delQtySku" data-num="-1">
                                    <i class="iconfont icon-minus font-size-lg"></i>
                                </div>
                                <div class="btn btn-cartCount btn-xs font-size-base p-x-20x" id="skuQty" data-num="1">
                                    1
                                </div>
                                <div class="btn btn-cartCount btn-xs patb" id="addQtySku" data-num="1">
                                    <i class="iconfont icon-add font-size-lg"></i>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <hr class="hr-common">
                    <div class="text-center p-t-15x p-b-10x">
                        @if(Session::has('user'))
                            <a href="javascript:void(0);" id="productAddBag"
                               class="btn btn-block btn-primary btn-lg btn-addToBag @if($data['isPutOn']==0){{'disabled'}}@endif">Add
                                to Bag</a>
                        @else
                            <a href="/login" class="btn btn-block btn-primary btn-lg btn-350 btn-addToBag">Add to
                                Bag</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@if(isset($data['designer']))
    <div class="container m-t-30x">
        <span class="sanBold font-size-md p-x-20x">Designer:</span>
        <span class="sanBold text-main">{{ $data['designer']['designer_name'] }}</span>
    </div>
@endif

<div class="container m-t-30x">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link font-size-md active" href="#Descripyion" data-toggle="tab">Descripyion</a>
        </li>
        <li class="nav-item">
            <a class="nav-link font-size-md btn-free" href="#Free" data-toggle="tab">Free Shipping & Free Return</a>
        </li>
    </ul>
    <div class="tab-content bg-white p-a-20x">
        <div class="tab-pane text-primary active" id="Descripyion">
            <p class="m-b-0">{!! str_replace("\n", "<br>",  $data['intro_short']) !!}</p>
        </div>
        <div class="tab-pane text-primary" id="Free">
            <div class="loading" style="display: block;">
                <div class="loader"></div>
                <div class="text-center p-t-10x">Loading...</div>
            </div>
        </div>
    </div>
</div>

<div class="container m-t-30x m-b-40x">
    <h4 class="helveBold text-main p-l-10x">You May Also Like</h4>
    <div class="row p-t-20x">
        @foreach($recommended['list'] as $list)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a href="/product/{{$list['spu']}}">
                            <img class="img-fluid img-lazy"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{ $list['main_image_url']}}"
                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                 alt="{{ $list['main_title'] }}">
                            <div class="bg-heart"></div>
                        </a>
                        @if(Session::has('user'))
                            <span class="product-heart btn-heart">
                                <i class="iconfont btn-wish font-size-lxx @if(in_array($list['spu'], $wishlist->wishlist())){{'active'}}@endif" data-spu="{{$list['spu']}}"></i>
                            </span>
                        @else
                            <a href="/login"><span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"></i></span></a>
                        @endif
                    </div>
                    <div class="price-caption helveBold">
                        <div class="text-center font-size-md text-primary text-truncate p-x-20x">{{ $list['main_title'] }}</div>
                        <div class="text-center">
                            <span class="font-size-md text-primary p-r-5x">${{ number_format(($list['skuPrice']['sale_price'] / 100), 2) }}</span>
                            @if($list['skuPrice']['sale_price'] != $list['skuPrice']['price'])
                                <span class="font-size-base text-common text-throughLine">${{ number_format(($list['skuPrice']['price'] / 100), 2) }}</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

<!-- 购买成功提示 -->
<div class="remodal modal-content remodal-xs" data-remodal-id="additem-modal" id="addItem-modalDialog" data-spu="">
    <div class="text-center font-size-md p-a-30x">Item Added</div>
</div>

<!-- 购买失败提示 -->
<div class="remodal modal-content remodal-xs" data-remodal-id="additemfail-modal" id="addItemFail-modalDialog"
     data-spu="">
    <div class="text-center font-size-md p-a-30x">Added Failled</div>
</div>

<!-- footer start -->
@include('footer')
<!-- footer end -->
