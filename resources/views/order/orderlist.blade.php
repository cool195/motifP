@include('header', ['title' => 'Orders'])

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Orders'])
            <div class="right">
                <div class="rightContent">
                    <div class="orderList" id="orderListContainer" data-pagenum="1" data-loading="false">
                        <!-- Order List -->
                    @if(empty($data['list']))
                        <!-- 空订单列表 提示信息 -->
                            <div class="empty-content">
                                <div class="m-b-20x p-b-5x"><i class="iconfont icon-book"></i></div>
                                <p class="text-primary m-b-20x p-b-20x font-size-llxx">No Orders Found</p>
                                <a href="/daily" class="btn btn-primary btn-lg btn-320">SHOP NOW</a>
                            </div>
                        @else
                            @foreach($data['list'] as $order)
                                @foreach($order['subOrderList'] as $subOrder)
                                    <div class="box-shadow bg-white m-b-20x order-item">
                                        <span class="horn @if(in_array($subOrder['status_code'], array(11))) horn-red
                                            @elseif(in_array($subOrder['status_code'], array(12, 14, 15, 16, 24))) horn-orange
                                            @elseif(in_array($subOrder['status_code'], array(17, 18))) horn-green
                                            @elseif(in_array($subOrder['status_code'], array(19, 20))) horn-blue
                                            @elseif(25 == $subOrder['status_code']) horn-lightblue
                                            @elseif(in_array($subOrder['status_code'], array(21, 22, 23))) horn-gray
                                            @endif">
                                        </span>
                                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                                            <div>
                                                <h5 class="sanBold font-size-md">{{$subOrder['status_info']}}
                                                    : {{ date("M d, Y" ,strtotime($subOrder['create_time'])) }}</h5>
                                                <p class="m-b-0 p-t-5x">{{ $subOrder['status_explain'] }}</p>
                                            </div>
                                            <span>
                                                <a class="btn btn-primary btn-md"
                                                   href="/order/orderdetail/{{  $subOrder['order_no'] }}">Order Detail</a>
                                            </span>
                                        </div>
                                        <hr class="hr-base m-a-0">
                                        <div class="p-x-20x">
                                            @foreach($subOrder['lineOrderList'] as $lineOrder)
                                                <div class="checkout-Item p-y-20x border-bottom">
                                                    <div class="media">
                                                        <div class="media-left m-r-15x">
                                                            <a href="/detail/{{$lineOrder['spu']}}">
                                                                <img class="img-lazy img-fluid"
                                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{ $lineOrder['img_path'] }}"
                                                                     width="120" height="120" alt="">
                                                            </a>
                                                        </div>
                                                        <div class="media-body">
                                                            <div class="row flex flex-alignCenter">
                                                                <div class="col-md-3">
                                                                    <div class="font-size-md text-main p-l-20x">{{ $lineOrder['main_title'] }}</div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    @if(isset($lineOrder['attrValues']))
                                                                        @foreach($lineOrder['attrValues'] as $attr)
                                                                            {{$attr['attr_type_value']}}
                                                                            :{{$attr['attr_value']}}<br>
                                                                        @endforeach
                                                                    @endif
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        ${{ number_format(($lineOrder['sale_price'] / 100), 2) }}</div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        x{{ $lineOrder['sale_qtty'] }}</div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="text-center">
                                                                        ${{ number_format(($lineOrder['total_amount'] / 100), 2) }}</div>
                                                                </div>
                                                            </div>
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
                                            @endforeach
                                        </div>
                                        <hr class="hr-base m-a-0">
                                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                                            <div>
                                                Order # {{$subOrder['order_no']}}
                                            </div>
                                            <span>
                                                <span class="p-r-30x">Order Total</span>
                                                <span>${{ number_format(($subOrder['pay_amount'] / 100), 2) }}</span>
                                            </span>
                                        </div>
                                        @if( 11 == $subOrder['status_code'])
                                            <hr class="hr-base m-a-0">
                                            <div class="text-right p-a-20x">
                                                <a href="/payagain/{{  $subOrder['order_no'] }}/0" class="btn btn-primary btn-lg btn-200 m-r-20x">Credit Card</a>
                                                <a href="/payagain/{{  $subOrder['order_no'] }}/1" class="btn btn-primary btn-lg btn-200">PayPal</a>
                                            </div>
                                        @endif
                                    </div>
                                @endforeach
                            @endforeach
                        @endif
                    </div>
                    <!-- 查看更多 按钮 loading -->
                    @if(!empty($data['list']))
                    <div class="text-center m-y-30x seeMore-info">
                        <div class="orderList-seeMore" style="display: none;">
                            <a class="btn btn-gray btn-lg btn-380" href="javascript:void(0)">See more of all</a>
                        </div>
                        <div class="loading orderList-loading" style="display: none">
                            <div class="loader"></div>
                            <div class="text-center p-l-15x">Loading...</div>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 订单列表 模版 -->
<template id="tpl-orderList">
    @{{ each list }}
    @{{ each $value.subOrderList as value index }}

    <div class="box-shadow bg-white m-b-20x order-item">
        <span class="horn @{{ if 11 == value.status_code }} horn-red
        @{{ else if value.status_code == 12 || value.status_code == 14 || value.status_code == 15 || value.status_code == 16 || value.status_code == 24  }} horn-orange
        @{{ else if value.status_code == 17 || value.status_code == 18 }} horn-green
        @{{ else if value.status_code == 19 || value.status_code == 20 }} horn-blue
        @{{ else if value.status_code == 25 }} horn-lightblue
        @{{ else if value.status_code == 21 || value.status_code == 22 || value.status_code == 23 }} horn-gray
        @{{ else }} horn-orange
        @{{ /if }}"></span>

        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
            <div>
                <h5 class="sanBold font-size-md">@{{ value.status_info }}
                    : @{{ value.format_create_time }}</h5>
                <p class="m-b-0 p-t-5x">@{{ value.status_explain }}</p>
            </div>
            <span>
                <a class="btn btn-primary btn-md" href="/order/orderdetail/@{{ value.order_no }}">Order Detail</a>
            </span>
        </div>
        <hr class="hr-base m-a-0">
        <div class="p-x-20x">
            @{{ each value.lineOrderList }}
            <div class="checkout-Item border-bottom">
                <div class="media">
                    <div class="media-left m-r-15x">
                        <a href="/detail/@{{ $value.spu }}">
                            <img class="img-lazy img-fluid"
                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/@{{ $value.img_path }}"
                                 width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="media-body">
                        <div class="row flex flex-alignCenter">
                            <div class="col-md-3">
                                <div class="font-size-md text-main p-l-20x">@{{ $value.main_title }}</div>
                            </div>
                            <div class="col-md-3">
                                @{{ if $value.attrValues != null }}
                                @{{ each $value.attrValues }}
                                @{{ $value.attr_type_value }}: @{{ $value.attr_value }}<br>
                                @{{ /each }}
                                @{{ /if }}
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">$@{{ ($value.sale_price/100).toFixed(2) }}</div>
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">x@{{ $value.sale_qtty }}</div>
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">$@{{ ($value.pay_amount/100).toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                @{{ if $value.vas_info != null }}
                @{{ each $value.vas_info }}
                <div class="media">
                    <div class="media-left m-r-15x">
                        &nbsp;
                    </div>
                    <div class="media-body">
                        <div class="row flex flex-alignCenter border-top">
                            <div class="col-md-3">
                                <div class="p-l-20x">@{{ $value.vas_name }}</div>
                            </div>
                            <div class="col-md-3">
                                <div>@{{ $value.user_remark }}</div>
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">$@{{ ($value.vas_price/100).toFixed(2) }}</div>
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">x@{{ $value.vas_type }}</div>
                            </div>
                            <div class="col-md-2">
                                <div class="text-center">+$@{{ ($value.vas_price/100).toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                @{{ /each }}
                @{{ /if }}
            </div>
            @{{ /each  }}
        </div>
        <hr class="hr-base m-a-0">
        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
            <div>
                Order # @{{ value.order_no }}
            </div>
            <span>
                <span class="p-r-30x">Order total</span>
                <span>$@{{ (value.pay_amount/100).toFixed(2) }}</span>
            </span>
        </div>
        @{{ if value.status_code == 11 }}
        <!-- 订单未支付 支付按钮 -->
        <hr class="hr-base m-a-0">
        <div class="text-right p-a-20x">
            <a href="/payagain/@{{  $value.order_no }}/0" class="btn btn-primary btn-lg btn-200 m-r-20x">Pay with Credit Card</a>
            <a href="/payagain/@{{  $value.order_no }}/1" class="btn btn-primary btn-lg btn-200">Pay with Paypal</a>
        </div>
        @{{ /if }}

    </div>
    @{{ /each }}
    @{{ /each }}
</template>

@include('footer')
