<!-- header start-->
@include('header', ['title' => 'Cart'])
<!-- header end-->
<!-- 横幅 -->
<input type="text" id="removeFromCart-name" value="" hidden>
<input type="text" id="removeFromCart-spu" value="" hidden>
<input type="text" id="removeFromCart-price" value="" hidden>
<input type="text" id="removeFromCart-quantity" value="" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    // 购物车 remove product 埋点
    function onRemoveFromCart() {
        var name = document.getElementById('removeFromCart-name').value;
        var spu = document.getElementById('removeFromCart-spu').value;
        var price = document.getElementById('removeFromCart-price').value;
        var quantity = document.getElementById('removeFromCart-quantity').value;
        dataLayer.push({
            'event': 'removeFromCart',
            'ecommerce': {
                'remove': {
                    'products': [{
                        'name': name,
                        'id': spu,
                        'price': price,
                        'brand': 'Motif PC',
                        'category': '',
                        'variant': '',
                        'quantity': quantity
                    }]
                }
            }
        });
    }

    var content_ids = [@foreach($cart['showSkus'] as $key => $product) @if(0 == $key)'{{$product['spu']}}' @else , '{{$product['spu']}}' @endif @endforeach];
    var totalPrice = "{{ number_format($cart['pay_amount'] / 100, 2)}}";
</script>

{{--@if($config)--}}
    {{--<div class="active-banner p-y-10x text-center">--}}
        {{--<span class="sanBold font-size-md">{{$config}}</span>--}}
        {{--<a href="/daily">--}}
            {{--<div class="btn btn-100 btn-share btn-md m-l-20x text-link">SHOP NOW</div>--}}
        {{--</a>--}}
    {{--</div>--}}
{{--@endif--}}

<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container content-maxWidth">
        @if(empty($cart['showSkus']))
            {{--空购物车 提示信息--}}
            <h4 class="text-center bigNoodle font-size-llxxx">In Bag</h4>
            <hr class="hr-black">
            <div class="text-center p-t-40x">
                <div class="p-a-10x"></div>
                {{--<div class="m-b-20x p-b-5x"><i class="iconfont icon-iconshoppingbag icon-fontSize-big"></i></div>--}}
                <div class="m-b-10x p-b-5x"><i class="iconfont icon-shoplight icon-fontSize-big"></i></div>
                <p class="bigNoodle font-size-llxx">Your bag is empty, Fill it up !</p>
                <a href="/shopping" class="btn btn-primary btn-baseSize bigNoodle font-size-lxx m-b-30x">SHOP NOW</a>
            </div>
        @else
            {{--My Bag List--}}
            <div class="bg-white">
                <h4 class="text-center bigNoodle font-size-llxxx">In Bag</h4>
                <hr class="hr-black">
                <div class="p-t-20x">
                    <div class="row font-size-sm">
                        <div class="col-md-7">ITEM</div>
                        <div class="col-md-1 p-l-15x">PRICE</div>
                        <div class="col-md-4"><div class="p-l-40x m-l-10x">QUANTITY</div></div>
                    </div>
                    <hr class="hr-gray m-t-0">
                </div>
                <div class="">
                    @foreach($cart['showSkus'] as $k=>$showSku)
                        <div class="p-y-20x" id="{{'csku'.$showSku['sku']}}">
                            <div class="row flex flex-alignCenter cartProduct-item">
                                <div class="col-md-4 media">
                                    <a class="media-left" href="/detail/{{$showSku['spu']}}">
                                        <img class="img-lazy"
                                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                             data-original="{{config('runtime.CDN_URL')}}/n3/{{ $showSku['main_image_url'] }}"
                                             width="120" height="120" alt="">
                                    </a>
                                    <div class="media-body cart-product-title font-size-md">{{  $showSku['main_title'] }}</div>
                                </div>
                                <div class="col-md-3">
                                        @if(isset($showSku['attrValues']))
                                            @foreach($showSku['attrValues'] as $key => $attrValue)
                                                {{$attrValue['attr_type_value']}}:{{$attrValue['attr_value']}}<br>
                                            @endforeach
                                        @endif
                                        @if(isset($showSku['showVASes']))
                                            @foreach($showSku['showVASes'] as $key => $vas)
                                                {{ ucfirst(strtolower($vas['vas_name'])) }}:{{ $vas['user_remark'] }}<br>
                                            @endforeach
                                        @endif
                                </div>
                                <div class="col-md-1">
                                    <div class="p-l-5x">
                                        <div class="font-size-md {{'skuprice'.$k}}">
                                            ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="btn-group flex p-l-40x">
                                        <div id="{{'cdsku'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs @if($showSku['sale_qtty']==1 || !$showSku['select']){{'disabled'}}@endif cupn"
                                             data-num="-1" data-key="{{$k}}" data-sku="{{$showSku['sku']}}">
                                            <i class="iconfont icon-minus font-size-lg"></i>
                                        </div>
                                        <div id="{{'cskunum'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs font-size-base p-x-20x">{{$showSku['sale_qtty']}}</div>
                                        <div id="{{'casku'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs @if(!$showSku['select'] || $showSku['sale_qtty'] >= 50){{'disabled'}}@endif cupn"
                                             data-num="1" data-key="{{$k}}" data-sku="{{$showSku['sku']}}">
                                            <i class="iconfont icon-add font-size-lg"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="p-l-30x m-l-10x">
                                        @if(Session::get('user.pin'))
                                            <a class="btn-block cartManage" data-action="save"
                                               data-sku="{{$showSku['sku']}}" href="javascript:;">Save for Later</a><br>
                                        @endif
                                        <a class="btn-block" data-type="cart-remove" data-action="delsku"
                                           data-sku="{{$showSku['sku']}}" data-spu="{{$showSku['spu']}}"
                                           data-title="{{$showSku['main_title']}}"
                                           data-price="{{number_format(($showSku['sale_price'] / 100), 2)}}"
                                           data-qtty="{{$showSku['sale_qtty']}}" href="javascript:;">Remove</a>
                                    </div>
                                </div>
                                @if(0 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                    <div class="mask"></div>
                                @endif
                            </div>
                            <div class="warning-info flex flex-alignCenter text-warning @if(0 != $showSku['stock_status'] && 2 != $showSku['stock_status'] && 1 == $showSku['isPutOn']) off @endif">
                                <i class="iconfont icon-caveat p-r-5x"></i>
                                <span class="font-size-sm">{{$showSku['prompt_info']}}</span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
            <hr class="hr-gray">
        {{--Saved List--}}
        @if($save['showSkus'])
            <div class="m-t-40x p-t-20x">
                <h4 class="text-center bigNoodle font-size-llxxx">Saved</h4>
                <hr class="hr-black">
                <div class="p-t-20x">
                    <div class="row font-size-sm">
                        <div class="col-md-7">ITEM</div>
                        <div class="col-md-1 p-l-15x">PRICE</div>
                    </div>
                    <hr class="hr-gray m-t-0">
                </div>

                <div class="">
                    @foreach($save['showSkus'] as $showSku)
                        <div class="row p-y-20x flex flex-alignCenter cartProduct-item"
                             id="{{'csku'.$showSku['sku']}}">
                            <div class="col-md-4 media">
                                <a class="media-left" href="/detail/{{$showSku['spu']}}">
                                    <img class="img-lazy"
                                         src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                         data-original="{{config('runtime.CDN_URL')}}/n3/{{ $showSku['main_image_url'] }}"
                                         width="120" height="120" alt="">
                                </a>
                                <div class="media-body cart-product-title font-size-md">{{  $showSku['main_title'] }}</div>
                                @if(0 == $showSku['stock_status'] || 2 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-10x">
                                        <i class="iconfont icon-caveat p-r-5x"></i>
                                        <span class="font-size-sm">{{$showSku['prompt_info']}}</span>
                                    </div>
                                @endif
                            </div>
                            <div class="col-md-3">
                                    @if(isset($showSku['attrValues']))
                                        @foreach($showSku['attrValues'] as $key => $attrValue)
                                            {{$attrValue['attr_type_value']}}:{{$attrValue['attr_value']}}<br>
                                        @endforeach
                                    @endif
                                    @if(isset($showSku['showVASes']))
                                        @foreach($showSku['showVASes'] as $key => $vas)
                                            {{ $vas['vas_name'] }}:{{ $vas['user_remark'] }}
                                        @endforeach
                                    @endif
                            </div>
                            <div class="col-md-1">
                                <div class="p-l-5x">
                                    <div class="font-size-md">
                                        ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                &nbsp;
                            </div>
                            <div class="col-md-2">
                                <div class="p-l-30x m-l-10x">
                                    @if(0 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                        Listing Ended
                                    @else
                                        <a class="btn-block cartManage" data-action="movetocart"
                                           data-sku="{{$showSku['sku']}}" href="javascript:;">Move to Bag</a>
                                    @endif
                                    <br/>
                                    <a class="btn-block" data-type="cart-remove" data-action="delsave"
                                       data-sku="{{$showSku['sku']}}" href="javascript:;">Remove</a>
                                </div>
                            </div>
                            @if(0 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                <div class="mask"></div>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>
            <hr class="hr-gray">
        @endif
    </div>
    <hr class="hr-black m-t-50x">
    <div class="container">
        @if(!empty($cart['showSkus']))
            <div class="bg-white m-y-20x p-x-20x">
                <div class="text-right font-size-md">
                    @if(!empty($cart['showSkus']))
                        <span class="avenirBold total_sku_qtty">Items ({{$cart['total_sku_qtty'] }}):</span>
                        <span class="total_amount">${{number_format($cart['total_amount'] /100, 2)}}</span>
                        @if($cart['vas_amount'] > 0)
                            <span class="m-l-30x avenirBold">Additional Services:</span>
                            <span class="vas_amount">${{ number_format($cart['vas_amount'] / 100, 2) }}</span>
                        @endif
                        <span class="m-l-30x avenirBold">Bag Subtotal:</span>
                        <span class="pay_amount">${{ number_format($cart['pay_amount'] / 100, 2)}}</span>
                        @if(Session::get('user.pin'))
                            <a href="/cart/ordercheckout"
                               data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=check.100002&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&ref=&v={"skipType":"processedcheckout","skipId":"","version":"1.0.1","ver":"9.2","src":"PC"}'
                               class="m-l-30x bigNoodle font-size-llx btn-toCheckout @if($cart['pay_amount'] <= 0) disabled @endif">Proceed To Checkout</a>
                        @else
                            <a class="m-l-30x bigNoodle font-size-llx btn-toCheckout btn-loginModal @if($cart['pay_amount'] <= 0) disabled @endif" data-referer="/cart/ordercheckout">Proceed To Checkout</a>
                        @endif
                    @endif
                </div>
            </div>
        @endif
    </div>
</section>

<!-- 删除确认框 -->
<div class="remodal remodal-md p-a-40x" data-remodal-id="cartmodal" id="modalDialog" data-action="" data-id=""
     data-sku="">
    <div class="bigNoodle text-center font-size-lllx uppercase">Remove Items from Your Bag?</div>
    <div class="text-center p-t-20x p-b-40x m-b-10x font-size-sm">Are you sure you want to remove this item?</div>
    <div class="row">
        <div class="col-md-6">
            <div class="btn btn-secondary btn-baseSize bigNoodle font-size-llx delCartM">Remove</div>
        </div>
        <div class="col-md-6">
            <div class="btn btn-primary btn-baseSize bigNoodle font-size-llx" data-remodal-action="close">Cancel</div>
        </div>
    </div>
</div>

@include('footer')