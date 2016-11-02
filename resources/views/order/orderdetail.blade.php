@include('header', ['title' => 'Order Detail'])

<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">

            @include('user.left', ['title' => 'Order Detail'])


            <div class="right">
                <div class="rightContent">
                    <!-- Order Detail -->
                    <div class="p-t-5x p-b-10x">
                        <a href="/order/orderlist">
                            <strong><i class="iconfont icon-arrow-left font-size-lx p-x-15x"></i></strong>
                            <span class="helveBold font-size-lxx">Order Detail</span>
                        </a>
                    </div>

                    <div class="box-shadow bg-white m-b-20x">
                        <div class="p-x-20x p-y-15x">
                            <div>
                                <span class="orderDetail-title">Order Date</span>
                                <span>{{ date("M d, Y" ,strtotime($data['create_time'])) }}</span>
                            </div>
                            <div>
                                <span class="orderDetail-title">Order #</span>
                                <span>{{ $data['sub_order_no'] }}</span>
                            </div>
                            <div>
                                <span class="orderDetail-title">Order Total</span>
                                <span>${{number_format(($data['pay_amount'] / 100), 2)}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="box-shadow bg-white m-b-20x order-item">
                        <span class="horn @if(in_array($data['status_code'], array(11))) horn-red
                                            @elseif(in_array($data['status_code'], array(12, 14, 15, 16, 24))) horn-orange
                                            @elseif(in_array($data['status_code'], array(17, 18))) horn-green
                                            @elseif(in_array($data['status_code'], array(19, 20))) horn-blue
                                            @elseif(25 == $data['status_code']) horn-lightblue
                                            @elseif(in_array($data['status_code'], array(21, 22, 23, 27))) horn-gray
                                            @else horn-orange
                                            @endif">
                        </span>
                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                            <div>
                                <h5 class="sanBold font-size-md">{{ $data['status_info'] }}
                                    : {{ date("M d, Y" ,strtotime($data['update_time'])) }}</h5>
                                <p class="m-b-0 p-t-5x">{{ $data['status_explain'] }}</p>
                            </div>

                            <!-- 被取消的订单 -->
                            @if(in_array($data['status_code'], array(21, 22, 23)))
                                <span>
                                    <a id="buyAgain" class="btn btn-primary btn-md" href="javascript:void(0)"
                                       data-orderList="{{json_encode($data['lineOrderList'])}}">Buy Again</a>
                                </span>
                            @endif
                        </div>
                        <hr class="hr-base m-a-0">
                        <div class="p-x-20x">
                            @foreach($data['lineOrderList'] as $lineOrder)
                                <div class="checkout-Item border-bottom p-y-20x">
                                    <div class="media">
                                        <div class="media-left m-r-15x">
                                            <a href="/detail/{{$lineOrder['spu']}}">
                                                <img class="img-fluid img-lazy"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{ $lineOrder['img_path'] }}"
                                                     width="120" height="120" alt="">
                                            </a>
                                        </div>
                                        <div class="media-body no-border">
                                            <div class="row flex flex-alignCenter">
                                                <div class="col-md-3">
                                                    <div class="font-size-md text-main p-l-20x">{{ $lineOrder['main_title'] }}</div>
                                                </div>
                                                <div class="col-md-3">
                                                    @if(isset($lineOrder['attrValues']))
                                                        @foreach($lineOrder['attrValues'] as $attr)
                                                            {{$attr['attr_type_value'] }}:{{$attr['attr_value']}}<br>
                                                        @endforeach
                                                    @endif
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">
                                                        ${{number_format(($lineOrder['sale_price'] / 100), 2)}}</div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">x{{$lineOrder['sale_qtty']}}</div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">
                                                        ${{number_format(($lineOrder['total_amount'] / 100), 2)}}</div>
                                                </div>
                                            </div>
                                            @if(!empty($lineOrder['vas_info']))
                                                @foreach($lineOrder['vas_info'] as $value)
                                                    <div class="media">
                                                        <div class="media-left m-r-15x">
                                                            &nbsp;
                                                        </div>
                                                        <div class="media-body">
                                                            <div class="row flex flex-alignCenter border-top">
                                                                <div class="col-md-3">
                                                                    <div class="p-l-20x">{{$value['vas_name']}}</div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <div>{{ $value['user_remark'] }}</div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        ${{ number_format(($value['vas_price'] / 100), 2) }}</div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        x{{ $lineOrder['sale_qtty'] }}</div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        ${{ number_format($value['vas_price'] / 100 * $lineOrder['sale_qtty'], 2) }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <!-- Track order -->
                        @if(isset($data['logistics_info_url']))
                            <hr class="hr-base m-a-0">
                            <a href="{{$data['logistics_info_url']}}">
                                <div class="p-x-20x p-y-15x flex flex-alignCenter flex-rightJustify">
                                    <span class="p-r-10x"><i class="iconfont icon-car font-size-llxx"></i></span>
                                    <span class="sanBold p-r-10x">Track order</span>
                                    <span><strong><i
                                                    class="iconfont icon-arrow-right font-size-base"></i></strong></span>
                                </div>
                            </a>
                        @endif


                    </div>
                    <div class="box-shadow bg-white m-b-20x">
                        <div class="p-a-20x">
                            <div class="media">
                                <div class="media-left sanBold orderInfo-title">Shipping to</div>
                                <div class="media-right">
                                    {{ $data['userAddr']['name'] }}<br>
                                    {{ $data['userAddr']['detail_address1'] }}<br>
                                    @if(!empty($data['userAddr']['detail_address2'])) {{ $data['userAddr']['detail_address2'] }}
                                    <br>@endif
                                    {{ $data['userAddr']['city'] }}
                                    ,{{ $data['userAddr']['state'] }} {{  $data['userAddr']['zip'] }}<br>
                                    {{$data['userAddr']['country']}}<br>
                                    @if(!empty($data['userAddr']['telephone'])) {{ $data['userAddr']['telephone'] }} @endif
                                </div>
                            </div>
                            <hr class="hr-base">
                            <div class="media">
                                <div class="media-left sanBold orderInfo-title">Shipping</div>
                                <div class="media-right">{{  $data['logistics_name'] }}
                                    ${{number_format(($data['logistics_price'] / 100), 2)}}</div>
                            </div>
                            @if(!in_array($data['status_code'], array(11, 21, 27)))
                                <hr class="hr-base">
                                <div class="media">
                                    <div class="media-left sanBold orderInfo-title">Paid with</div>
                                    <div class="media-right">@if($data['payinfo']['pay_type']=="Oceanpay"){{'Credit Card'}}@else{{'PayPal'}}@endif</div>
                                </div>
                            @endif
                            @if(!empty($data['order_remark']))
                                <hr class="hr-base">
                                <div class="media">
                                    <div class="media-left sanBold orderInfo-title">Special Request</div>
                                    <div class="media-right">
                                        {{$data['order_remark']}}
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="box-shadow bg-white m-t-20x">
                        <div class="p-a-20x font-size-md">
                            {{--数量--}}
                            <div class="text-right">
                                <span>Items({{$data['item_qtty']}}):</span>
                                <span class="sanBold cart-price">${{number_format(($data['total_amount'] / 100), 2)}}</span>
                            </div>
                            {{--增值服务--}}
                            @if($data['vas_amount'] > 0)
                                <div class="text-right @if($data['vas_amount'] > 0) @endif">
                                    <span>Additional services:</span>
                                    <span class="sanBold cart-price">${{ number_format(($data['vas_amount'] / 100), 2) }}</span>
                                </div>
                            @endif
                            {{--优惠--}}
                            <div class="text-right promotion-code cps_amountShow @if($data['cps_amount'] <= 0) hidden @endif">
                                <span>Promotion code:</span>
                                <span class="sanBold cart-price cps_amount">-${{number_format(($data['cps_amount'] / 100), 2)}}</span>
                            </div>
                            {{--折扣--}}
                            @if($data['promot_discount_amount'] > 0)
                                <div class="text-right">
                                    <span>Discount</span>
                                    <span class="sanBold cart-price">-${{number_format(($data['promot_discount_amount'] / 100), 2)}}</span>
                                </div>
                            @endif
                            {{--收税提示--}}
                            <div class="text-right promotion-code tax_amountShow @if($data['tax_amount'] <= 0) hidden @endif">
                                <span>Sales tax:</span>
                                <span class="sanBold cart-price tax_amount">${{number_format(($data['tax_amount'] / 100), 2)}}</span>
                            </div>
                            {{--地址服务--}}
                            <div class="text-right">
                                <span>Shipping and handling:</span>
                                <span class="sanBold cart-price freight_amount">@if(0 == $data['freight_amount'])
                                        Free @else${{ number_format(($data['freight_amount'] / 100), 2)}} @endif</span>
                            </div>
                            {{--结算价--}}
                            <div class="text-right ">
                                <span>Order Total:</span>
                                <span class="sanBold cart-price pay_amount">${{ number_format(($data['pay_amount']) / 100, 2) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-t-30x">
                        <a href="/askshopping?skiptype=2&id={{$data['sub_order_no']}}" class="text-left">Contact
                            Customer Service</a>
                        <!-- 未支付订单 支付按钮 -->
                        <div class="text-right">
                            @if( 11 == $data['status_code'])
                                <a href="/payagain/{{  $data['sub_order_no'] }}/0"
                                   class="btn btn-primary btn-lg btn-200 m-r-20x">Pay with Credit Card</a>
                                <a href="/payagain/{{  $data['sub_order_no'] }}/1"
                                   class="btn btn-primary btn-lg btn-200">Pay with Paypal</a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')