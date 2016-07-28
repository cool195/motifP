<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Shopping Cart</title>
    <link rel="apple-touch-icon" href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png">

    <link rel="stylesheet" href="/styles/vendor.css">

    <link rel="stylesheet" href="/styles/common.css">

</head>
<body>

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
                    <div class="row p-y-20x flex flex-alignCenter">
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
                                {{--<div class="font-size-base text-common text-throughLine">$299.95</div>--}}
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-4">
                            <div class="btn-group flex">
                                <div class="btn btn-cartCount btn-xs @if($showSku['sale_qtty']==1 || !$showSku['select']){{'disabled'}}@endif"
                                     data-item="minus">
                                    <i class="iconfont icon-minus font-size-lg"></i>
                                </div>
                                <div class="btn btn-cartCount btn-xs font-size-base p-x-20x"
                                     data-num="num">{{$showSku['sale_qtty']}}</div>
                                <div class="btn btn-cartCount btn-xs @if(!$showSku['select']){{'disabled'}}@endif"
                                     data-item="add">
                                    <i class="iconfont icon-add font-size-lg"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-4">
                            <div class="p-l-20x">
                                <a class="btn-block" href="#">Save for Later</a>
                                <a class="btn-block" data-type="cart-remove" href="#">Remove</a>
                            </div>
                        </div>
                    </div>
                    <hr class="hr-common m-a-0">
                @endforeach
            </div>
        </div>

        <!-- Saved List -->
        @if(!empty($save['showSkus']))
            <div class="box-shadow bg-white m-t-20x">
                <div class="sanBold font-size-md p-x-20x p-y-15x">Saved</div>
                <hr class="hr-common m-a-0">
                <div class="p-x-20x">
                    @foreach($save['showSkus'] as $showSku)
                        <div class="row p-y-20x flex flex-alignCenter">
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
                                    {{--<div class="font-size-base text-common text-throughLine">$299.95</div>--}}
                                </div>
                            </div>
                            <div class="col-md-2 col-xs-4">
                                &nbsp;
                            </div>
                            <div class="col-md-2 col-xs-4">
                                <div class="p-l-20x">
                                    <a class="btn-block" href="#">Move to Bag</a>
                                    <a class="btn-block" href="#" data-type="remove">Remove</a>
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
                <div class="text-right"><span>Items({{$cart['total_sku_qtty'] }}):</span><span
                            class="sanBold cart-price">${{number_format($cart['total_amount'] /100, 2)}}</span></div>
                @if($cart['vas_amount'] > 0)
                    <div class="text-right"><span>Additional Services:</span><span
                                class="sanBold cart-price">${{ number_format($cart['vas_amount'] / 100, 2) }}</span>
                    </div>
                @endif
                <div class="text-right"><span>Bag Subtotal:</span><span
                            class="sanBold cart-price">${{ number_format($cart['pay_amount'] / 100, 2)}}</span></div>
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

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
