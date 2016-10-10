<!-- header start-->
@include('header', ['title' => 'Cart'])
<!-- header end-->
<!-- 横幅 -->

@if($config)
    <div class="active-banner p-y-10x text-center">
        <span class="sanBold font-size-md">{{$config}}</span>
        <a href="/daily"><div class="btn btn-100 btn-share btn-md m-l-20x text-link">SHOP NOW</div></a>
    </div>
@endif

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container">
        @if(empty($cart['showSkus']))
            {{--空购物车 提示信息--}}
            <div class="empty-content shopbag-content">
                <div class="m-b-20x p-b-5x"><i class="iconfont icon-iconshoppingbag"></i></div>
                <p class="text-primary m-b-20x p-b-20x font-size-llxx">Your bag is empty, Fill it up ! </p>
                <a href="/daily" class="btn btn-primary btn-lg btn-320">SHOP NOW</a>
            </div>
        @else
            <h4 class="helveBold text-main p-l-10x">My Bag</h4>
            {{--My Bag List--}}
            <div class="box-shadow bg-white m-t-20x">
                <div class="sanBold font-size-md p-x-20x p-y-15x">In Bag</div>
                <hr class="hr-base m-a-0">
                <div class="p-x-20x">
                    @foreach($cart['showSkus'] as $showSku)
                        <div class="p-y-20x border-bottom" id="{{'csku'.$showSku['sku']}}">
                            <div class="row flex flex-alignCenter cartProduct-item">
                                <div class="col-md-4 media">
                                    <a class="media-left" href="/detail/{{$showSku['spu']}}">
                                        <img class="img-lazy"
                                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                             data-original="{{config('runtime.CDN_URL')}}/n3/{{ $showSku['main_image_url'] }}"
                                             width="120" height="120" alt="">
                                    </a>
                                    <div class="media-body cart-product-title font-size-md text-main">{{  $showSku['main_title'] }}</div>
                                </div>
                                <div class="col-md-3">
                                    <div class="p-l-15x">
                                        @if(isset($showSku['attrValues']))
                                            @foreach($showSku['attrValues'] as $key => $attrValue)
                                                {{$attrValue['attr_type_value']}}:{{$attrValue['attr_value']}}<br>
                                            @endforeach
                                        @endif
                                        @if(isset($showSku['showVASes']))
                                            @foreach($showSku['showVASes'] as $key => $vas)
                                                {{ ucfirst(strtolower($vas['vas_name'])) }}:{{ $vas['user_remark'] }}
                                            @endforeach
                                        @endif
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="p-l-20x">
                                        <div class="font-size-md text-primary">
                                            ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="btn-group flex p-l-40x">
                                        <div id="{{'cdsku'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs @if($showSku['sale_qtty']==1 || !$showSku['select']){{'disabled'}}@endif cupn"
                                             data-num="-1" data-sku="{{$showSku['sku']}}">
                                            <i class="iconfont icon-minus font-size-lg"></i>
                                        </div>
                                        <div id="{{'cskunum'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs font-size-base p-x-20x">{{$showSku['sale_qtty']}}</div>
                                        <div id="{{'casku'.$showSku['sku']}}"
                                             class="btn btn-cartCount btn-xs @if(!$showSku['select'] || $showSku['sale_qtty'] >= 50){{'disabled'}}@endif cupn"
                                             data-num="1" data-sku="{{$showSku['sku']}}">
                                            <i class="iconfont icon-add font-size-lg"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="p-l-40x m-l-10x">
                                        <a class="btn-block cartManage" data-action="save"
                                           data-sku="{{$showSku['sku']}}" href="javascript:;">Save for Later</a><br>
                                        <a class="btn-block" data-type="cart-remove" data-action="delsku"
                                           data-sku="{{$showSku['sku']}}" href="javascript:;">Remove</a>
                                    </div>
                                </div>
                                @if(0 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                    <div class="mask"></div>
                                @endif
                            </div>
                            <div class="warning-info flex flex-alignCenter text-warning @if(0 != $showSku['stock_status'] && 2 != $showSku['stock_status'] && 1 == $showSku['isPutOn']) off @endif">
                                <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                <span class="font-size-base">{{$showSku['prompt_info']}}</span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
        {{--Saved List--}}
        @if($save['showSkus'])
            <div class="box-shadow bg-white m-t-20x">
                <div class="sanBold font-size-md p-x-20x p-y-15x">Saved</div>
                <hr class="hr-base m-a-0">
                <div class="p-x-20x border-bottom">
                    @foreach($save['showSkus'] as $showSku)
                        <div class="row p-y-20x flex flex-alignCenter cartProduct-item border-bottom" id="{{'csku'.$showSku['sku']}}">
                            <div class="col-md-4 media">
                                <a class="media-left" href="/detail/{{$showSku['spu']}}">
                                    <img class="img-lazy"
                                         src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                         data-original="{{config('runtime.CDN_URL')}}/n3/{{ $showSku['main_image_url'] }}"
                                         width="120" height="120" alt="">
                                </a>
                                <div class="media-body cart-product-title font-size-md text-main">{{  $showSku['main_title'] }}</div>
                                @if(0 == $showSku['stock_status'] || 2 == $showSku['stock_status'] || 1 != $showSku['isPutOn'])
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-10x">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">{{$showSku['prompt_info']}}</span>
                                    </div>
                                @endif
                            </div>
                            <div class="col-md-3">
                                <div class="p-l-15x">
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
                            <div class="col-md-1">
                                <div class="p-l-20x">
                                    <div class="font-size-md text-primary">
                                        ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                &nbsp;
                            </div>
                            <div class="col-md-2">
                                <div class="p-l-40x m-l-10x">
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
        @endif
        @if(!empty($cart['showSkus']))
            {{--购物袋总价--}}
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
        @endif
        {{--提交按钮--}}
        <div class="p-y-40x text-right">
            @if(!empty($cart['showSkus']))
                <a href="/cart/ordercheckout"
                   class="btn btn-block btn-primary btn-lg btn-toCheckout @if($cart['pay_amount'] <= 0) disabled @endif">Proceed
                    To Checkout</a>
            @endif
        </div>
    </div>
</section>

<!-- 删除确认框 -->
<div class="remodal modal-content remodal-md" data-remodal-id="cartmodal" id="modalDialog" data-action="" data-id=""
     data-sku="">
    <div class="sanBold text-center font-size-md p-a-15x">Remove Items from Your Bag?</div>
    <hr class="hr-common m-a-0">
    <div class="text-center dialog-info">Are you sure you want to remove this item?</div>
    <hr class="hr-common m-a-0">
    <div class="row m-a-0">
        <div class="col-md-6">
            <div class="m-y-20x m-l-20x">
                <a href="javascript:;" class="btn btn-block btn-secondary btn-lg delCartM">Remove</a>
            </div>
        </div>
        <div class="col-md-6">
            <div class="m-y-20x m-r-20x"><a href="javascript:;" class="btn btn-block btn-primary btn-lg"
                                            data-remodal-action="close">Cancel</a>
            </div>
        </div>
    </div>
</div>


<!-- footer start -->
@include('footer')
<!-- footer end -->
