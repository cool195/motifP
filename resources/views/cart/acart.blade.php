<!-- 头部 Start-->
@include('header')
<!-- 头部 End -->

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container">
        <h4 class="helveBold text-main p-l-10x">My Bag</h4>
        <div class="box-shadow bg-white m-t-20x">
            <div class="sanBold font-size-md p-x-20x p-y-15x">In Bag</div>
            <hr class="hr-common m-a-0">
            <div class="p-x-20x">
                @foreach($cart['showSkus'] as $showSku)
                    <div class="row p-y-20x flex flex-alignCenter cartProduct-item">
                        <div class="col-md-6 col-xs-12 flex flex-alignCenter">
                            <div><img src="{{config('runtime.CDN_URL')}}/n1/{{ $showSku['main_image_url'] }}"
                                      width="120" height="120" alt=""></div>
                            <div class="cart-product-title font-size-md text-main">{{  $showSku['main_title'] }}</div>
                            <div class="p-l-20x">
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
                        </div>
                        <div class="col-md-2 col-xs-4">
                            <div class="p-l-20x">
                                <div class="font-size-md text-primary">
                                    ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-4">
                            <div class="btn-group flex">
                                <div id="{{'cdsku'.$showSku['sku']}}"
                                     class="btn btn-cartCount btn-xs @if($showSku['sale_qtty']==1 || !$showSku['select']){{'disabled'}}@endif cupn"
                                     data-num="-1" data-sku="{{$showSku['sku']}}">
                                    <i class="iconfont icon-minus font-size-lg"></i>
                                </div>
                                <div id="{{'csku'.$showSku['sku']}}"
                                     class="btn btn-cartCount btn-xs font-size-base p-x-20x">{{$showSku['sale_qtty']}}</div>
                                <div id="{{'casku'.$showSku['sku']}}"
                                     class="btn btn-cartCount btn-xs @if(!$showSku['select']){{'disabled'}}@endif cupn"
                                     data-num="1" data-sku="{{$showSku['sku']}}">
                                    <i class="iconfont icon-add font-size-lg"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-4">
                            <div class="p-l-20x">
                                <a class="btn-block cartManage" data-action="save" data-sku="{{$showSku['sku']}}"
                                   href="javascript:;">Save for Later</a>
                                <a class="btn-block cartManage" data-action="delsku" data-sku="{{$showSku['sku']}}"
                                   href="javascript:;">Remove</a>
                            </div>
                        </div>
                    </div>
                    <hr class="hr-common m-a-0">
                @endforeach
            </div>
        </div>

        <!-- Saved List -->
        @if($save['showSkus'])
            <div class="box-shadow bg-white m-t-20x">
                <div class="sanBold font-size-md p-x-20x p-y-15x">Saved</div>
                <hr class="hr-common m-a-0">
                <div class="p-x-20x">
                    @foreach($save['showSkus'] as $showSku)
                        <div class="row p-y-20x flex flex-alignCenter cartProduct-item">
                            <div class="col-md-6 col-xs-12 flex flex-alignCenter">
                                <div><img src="{{config('runtime.CDN_URL')}}/n1/{{ $showSku['main_image_url'] }}" width="120" height="120" alt=""></div>
                                <div class="cart-product-title font-size-md text-main">{{  $showSku['main_title'] }}</div>
                                <div class="p-l-20x">
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
                            </div>
                            <div class="col-md-2 col-xs-4">
                                <div class="p-l-20x">
                                    <div class="font-size-md text-primary">
                                        ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                </div>
                            </div>
                            <div class="col-md-2 col-xs-4">
                                &nbsp;
                            </div>
                            <div class="col-md-2 col-xs-4">
                                <div class="p-l-20x">
                                    <a class="btn-block cartManage" data-action="movetocart"
                                       data-sku="{{$showSku['sku']}}" href="javascript:;">Move to Bag</a>
                                    <a class="btn-block cartManage" data-action="delsave" data-sku="{{$showSku['sku']}}"
                                       href="javascript:;">Remove</a>
                                </div>
                            </div>
                        </div>
                        <hr class="hr-common m-a-0">
                    @endforeach
                </div>
            </div>
        @endif

    <!-- 购物袋总价 -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="p-a-20x font-size-md">
                <div class="text-right"><span id="total_sku_qtty">Items({{$cart['total_sku_qtty'] }}):</span><span
                            class="sanBold cart-price"
                            id="total_amount">${{number_format($cart['total_amount'] /100, 2)}}</span></div>
                @if($cart['vas_amount'] > 0)
                    <div class="text-right"><span>Additional Services:</span><span
                                class="sanBold cart-price"
                                id="vas_amount">${{ number_format($cart['vas_amount'] / 100, 2) }}</span>
                    </div>
                @endif
                <div class="text-right"><span>Bag Subtotal:</span><span
                            class="sanBold cart-price"
                            id="pay_amount">${{ number_format($cart['pay_amount'] / 100, 2)}}</span></div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="p-y-40x text-right">
            <a href="/checkout" class="btn btn-block btn-primary btn-lg btn-toCheckout">Proceed To Checkout</a>
        </div>
    </div>
</section>

<div class="remodal modal-content remodal-md" data-remodal-id="cartmodal" id="modalDialog" data-spu="">
    <div class="sanBold text-center font-size-md p-a-15x">Remove Items from Your Bag?</div>
    <hr class="hr-common m-a-0">
    <div class="text-center dialog-info">Are you sure you want to remove this item?</div>
    <hr class="hr-common m-a-0">
    <div class="row">
        <div class="col-md-6">
            <div class="m-y-20x m-l-20x"><a href="#" class="btn btn-block btn-secondary btn-lg">Remove</a></div>
        </div>
        <div class="col-md-6">
            <div class="m-y-20x m-r-20x"><a href="#" class="btn btn-block btn-primary btn-lg"
                                            data-remodal-action="close">Cancel</a>
            </div>
        </div>
    </div>
</div>

@include('footer')