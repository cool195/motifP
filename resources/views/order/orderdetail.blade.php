@include('header', ['title' => 'Order Detail'])

<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">

            @include('user.left', ['title' => 'Order Detail'])


            <div class="right">
                <div class="rightContent">
                    <!-- Order Detail -->
                    <div class="p-t-5x p-b-10x">
                        <a href="/orderlist">
                            <strong><i class="iconfont icon-arrow-left font-size-lx p-x-15x"></i></strong>
                            <span class="helveBold font-size-lxx">Order Detail</span>
                        </a>
                    </div>

                    <div class="box-shadow bg-white m-b-20x">
                        <div class="p-x-20x p-y-15x">
                            <div>
                                <span class="orderDetail-title">Order date</span>
                                <span>{{ $data['create_time'] }}</span>
                            </div>
                            <div>
                                <span class="orderDetail-title">Order #</span>
                                <span>{{ $data['sub_order_no'] }}</span>
                            </div>
                            <div>
                                <span class="orderDetail-title">Order total</span>
                                <span>${{number_format(($data['pay_amount'] / 100), 2)}}({{ $data['item_qtty'] }}
                                    items)</span>
                            </div>
                        </div>
                    </div>

                    <div class="box-shadow bg-white m-b-20x">
                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                            <div>
                                <h5 class="sanBold font-size-md">{{ $data['status_info'] }}
                                    : {{ $data['create_time'] }}</h5>
                            </div>
                            <!-- 被取消的订单 -->
                            @if(in_array($data['status_code'], array(21, 22, 23)))
                                <span>
                                    <a id="buyAgain" class="btn btn-primary btn-md" href="javascript:void(0)" data-orderList="{{json_encode($data['lineOrderList'])}}" >Buy Again</a>
                                </span>
                            @endif
                        </div>
                        <hr class="hr-base m-a-0">
                        <div class="p-x-20x">
                            @foreach($data['lineOrderList'] as $lineOrder)
                                <div class="checkout-Item border-bottom p-y-20x">
                                    <div class="media">
                                        <div class="media-left m-r-15x">
                                            <a href="/product/{{$lineOrder['spu']}}">
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
                                                    @if(isset($lineOrder['vas_info']) && !empty($lineOrder['vas_info']))
                                                        @foreach($lineOrder['vas_info'] as $info)
                                                            {{$info['vas_name']}}: {{$info['user_remark']}}
                                                            +${{number_format(($info['vas_price'] / 100), 2)}}
                                                        @endforeach
                                                    @endif
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">
                                                        ${{number_format(($lineOrder['sale_price'] / 100), 2)}}</div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">X{{$lineOrder['sale_qtty']}}</div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="text-center">
                                                        ${{number_format(($lineOrder['total_amount'] / 100), 2)}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <hr class="hr-base m-a-0">
                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                            <div>
                                Order # {{ $data['sub_order_no'] }}
                            </div>
                            <span>
                                <span class="p-r-30x">Order total</span>
                                <span class="sanBold">${{ number_format(($data['total_amount'] / 100), 2) }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="box-shadow bg-white m-b-20x">
                        <div class="p-a-20x">
                            <div class="media">
                                <div class="media-left sanBold orderInfo-title">Ships to</div>
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
                                <div class="media-right">{{  $data['logistics_name'] }} ${{number_format(($data['logistics_price'] / 100), 2)}}</div>
                            </div>
                            @if(!in_array($data['status_code'], array(11, 21, 27)))
                                <hr class="hr-base">
                                <div class="media">
                                    <div class="media-left sanBold orderInfo-title">Pay with</div>
                                    <div class="media-right">{{$data['pay_type']}}</div>
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
                            <div class="text-right">
                                <span>Items({{ $data['item_qtty'] }}):</span>
                                <span class="sanBold cart-price">${{number_format(($data['total_amount'] / 100), 2)}}</span>
                            </div>
                            @if($data['vas_amount'] > 0)
                                <div class="text-right">
                                    <span>Additional Services:</span>
                                    <span class="sanBold cart-price">-${{ number_format(($data['vas_amount'] / 100), 2) }}</span>
                                </div>
                            @endif
                            <div class="text-right">
                                <span>Shipping and handling:</span>
                                <span>@if(0 == $data['freight_amount']) Free @else ${{ number_format(($data['freight_amount'] / 100), 2)}} @endif</span>
                            </div>
                            @if($data['promot_discount_amount'] > 0)
                                <div class="text-right">
                                    <span>Discount:</span>
                                    <span>-${{ number_format(($data['promot_discount_amount'] / 100), 2)}}</span>
                                </div>
                            @endif
                            @if($data['cps_amount'] > 0)
                                <div class="text-right">
                                    <span>Promotion Code:</span>
                                    <span>-${{ number_format(($data['cps_amount'] / 100), 2)}}</span>
                                </div>
                            @endif
                            <div class="text-right">
                                <span class="sanBold text-main">Order Total:</span>
                                <span class="sanBold text-main cart-price">${{ number_format(($data['pay_amount'] / 100), 2) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-right p-t-30x">
                        <a href="#" class="btn btn-primary btn-lg btn-300 m-r-20x">Contact Service</a>
                        <!-- 未支付订单 支付按钮 -->
                        @if( 11 == $data['status_code'])
                            <a href="/payagain/{{  $data['sub_order_no'] }}/0" class="btn btn-primary btn-lg btn-200 m-r-20x">Credit Cart</a>
                            <a href="/payagain/{{  $data['sub_order_no'] }}/1" class="btn btn-primary btn-lg btn-200">PayPal</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')