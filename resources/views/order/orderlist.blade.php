@include('header', ['title' => 'Orders'])

<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Orders'])
            <div class="right">
                <div class="rightContent">
                    <div class="orderList" id="orderListContainer" data-pagenum="1" data-loading="false">
                        <!-- Order List -->
                        <div class="bigNoodle text-center leftMeun-title">MY ORDERS</div>
                        <hr class="hr-black m-t-0">
                       @if(empty($data['list']))
                            <!-- 空订单列表 提示信息 -->
                            <div class="text-center p-x-30x p-b-30x empty-marginTop">
                                <i class="iconfont icon-error icon-fontSize-big"></i>
                                <p class="bigNoodle font-size-llxx m-t-40x uppercase">No Orders Found!</p>
                                <a href="/daily" class="btn btn-primary p-y-5x btn-320 bigNoodle font-size-lxx">SHOP NOW</a>
                            </div>
                        @else
                            @foreach($data['list'] as $order)
                                @foreach($order['subOrderList'] as $subOrder)
                                    @if($subOrder['status_code'] != 11)
                                        <div class="bg-white m-b-40x order-item">
                                            <div class="p-t-15x p-b-10x flex flex-alignEnd flex-fullJustified">
                                                <div>
                                                    <h5 class="avenirBold font-size-md">
                                                        <span class="m-r-5x horn @if(in_array($subOrder['status_code'], array(11))) horn-red
                                                        @elseif(in_array($subOrder['status_code'], array(12, 14, 15, 16, 24))) horn-orange
                                                        @elseif(in_array($subOrder['status_code'], array(17, 18))) horn-green
                                                        @elseif(in_array($subOrder['status_code'], array(19, 20))) horn-blue
                                                        @elseif(25 == $subOrder['status_code']) horn-lightblue
                                                        @elseif(in_array($subOrder['status_code'], array(21, 22, 23, 27))) horn-gray
                                                        @else horn-orange
                                                        @endif"></span>
                                                                    {{$subOrder['status_info']}} : {{ date("M d, Y" ,strtotime($subOrder['create_time'])) }}</h5>
                                                                <p class="orderList-explain m-b-0 p-t-5x font-size-sm">{{ $subOrder['status_explain'] }}</p>
                                                            </div>
                                                        <span class="text-right btn-orderDetail p-r-5x">
                                                            <a class="text-gray font-size-sm" href="/order/orderdetail/{{  $subOrder['order_no'] }}">view details</a>
                                                        </span>
                                                        </div>
                                                        <hr class="hr-black m-a-0">
                                                        <div class="">
                                                            @foreach($subOrder['lineOrderList'] as $lineOrder)
                                                                <div class="checkout-Item p-y-10x border-bottom">
                                                                    <div class="media">
                                                                        <div class="media-left m-r-15x">
                                                                            <a href="/detail/{{$lineOrder['spu']}}/{{ $lineOrder['main_title'] }}">
                                                                                <img class="img-lazy img-fluid"
                                                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{ $lineOrder['img_path'] }}"
                                                                                     width="120" height="120" alt="">
                                                                            </a>
                                                                        </div>
                                                                        <div class="media-body">
                                                                            <div class="row flex flex-alignCenter">
                                                                                <div class="col-md-3">
                                                                                    <div class="font-size-base text-main p-l-20x">{{ $lineOrder['main_title'] }}</div>
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
                                                                                    <div class="row flex flex-alignCenter">
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
                                                        <hr class="hr-black m-a-0">
                                                        <div class="p-r-5x p-y-15x flex flex-alignCenter flex-fullJustified">
                                                            <div class="avenirMedium">
                                                                Order # {{$subOrder['order_no']}}
                                                            </div>
                                                        <span>
                                                            <span class="p-r-30x avenirMedium">Order Total</span>
                                                            <span class="avenirBold">${{ number_format(($subOrder['pay_amount'] / 100), 2) }}</span>
                                                        </span>
                                                        </div>
                                                        @if($subOrder['logistics_info_url'])
                                                            {{--订单物流信息 begin--}}
                                                {{--<hr class="hr-base m-a-0">--}}
                                                <a target="_blank" href="{{$subOrder['logistics_info_url']}}">
                                                    <div class="p-b-10x p-r-5x flex flex-alignCenter flex-rightJustify">
                                                        <span class="p-r-10x"><i
                                                                    class="iconfont icon-car font-size-llxx"></i></span>
                                                        <span class="sanBold p-r-10x">Track order</span>
                                                        <span><strong><i
                                                                        class="iconfont icon-arrow-right font-size-base"></i></strong></span>
                                                    </div>
                                                </a>
                                                {{--订单物流信息 end --}}
                                            @endif
                                            @if( 11 == $subOrder['status_code'])
                                                <div class="text-right p-b-10x">
                                                    <a href="/payagain/{{  $subOrder['order_no'] }}/0"
                                                       class="btn btn-primary btn-150 m-r-20x bigNoodle font-size-lxx">CREDIT CART</a>
                                                    <a href="/payagain/{{  $subOrder['order_no'] }}/1"
                                                       class="btn btn-primary btn-150 bigNoodle font-size-lxx">PAYPAL</a>
                                                </div>
                                            @endif
                                        </div>
                                    @endif
                                @endforeach
                            @endforeach
                        @endif
                    </div>
                    <!-- 查看更多 按钮 loading -->
                    @if(!empty($data['list']))
                        <div class="text-center m-y-30x seeMore-info">
                            <div class="orderList-seeMore" style="display: none;">
                                <a class="btn btn-gray btn-380 bigNoodle font-size-lx" href="javascript:void(0)">VIEW MORE</a>
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
    @{{ if value.status_code != 11 }}
    <div class="bg-white m-b-40x order-item">
        <div class="p-t-15x p-b-10x flex flex-alignEnd flex-fullJustified">
            <div>
                <h5 class="avenirBold font-size-md">
                    <span class="m-r-5x horn @{{ if 11 == value.status_code }} horn-red
        @{{ else if value.status_code == 12 || value.status_code == 14 || value.status_code == 15 || value.status_code == 16 || value.status_code == 24  }} horn-orange
        @{{ else if value.status_code == 17 || value.status_code == 18 }} horn-green
        @{{ else if value.status_code == 19 || value.status_code == 20 }} horn-blue
        @{{ else if value.status_code == 25 }} horn-lightblue
        @{{ else if value.status_code == 21 || value.status_code == 22 || value.status_code == 23 || value.status_code == 27 }} horn-gray
        @{{ else }} horn-orange
        @{{ /if }}"></span>
                    @{{ value.status_info }} : @{{ value.format_create_time }}</h5>
                <p class="orderList-explain m-b-0 p-t-5x font-size-sm">@{{ value.status_explain }}</p>
            </div>
            <span class="text-right btn-orderDetail p-r-5x">
                <a class="text-gray font-size-sm" href="/order/orderdetail/@{{ value.order_no }}">view details</a>
            </span>
        </div>
        <hr class="hr-black m-a-0">
        <div class="">
            @{{ each value.lineOrderList }}
            <div class="checkout-Item p-y-10x border-bottom">
                <div class="media">
                    <div class="media-left m-r-15x">
                        <a href="/detail/@{{ $value.spu }}/@{{ $value.main_title }}">
                            <img class="img-lazy img-fluid"
                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/@{{ $value.img_path }}"
                                 width="120" height="120" alt="">
                        </a>
                    </div>
                    <div class="media-body">
                        <div class="row flex flex-alignCenter">
                            <div class="col-md-3">
                                <div class="font-size-base text-main p-l-20x">@{{ $value.main_title }}</div>
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
                        <div class="row flex flex-alignCenter">
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
        <hr class="hr-black m-a-0">
        <div class="p-r-5x p-y-15x flex flex-alignCenter flex-fullJustified">
            <div class="avenirMedium">
                Order # @{{ value.order_no }}
            </div>
            <span>
                <span class="avenirMedium p-r-30x">Order total</span>
                <span class="avenirBold">$@{{ (value.pay_amount/100).toFixed(2) }}</span>
            </span>
        </div>
        @{{ if value.logistics_info_url }}
            {{--<hr class="hr-base m-a-0">--}}
            <a target="_blank" href="@{{value.logistics_info_url}}">
                <div class="p-b-10x p-r-5x flex flex-alignCenter flex-rightJustify">
                                                        <span class="p-r-10x"><i
                                                                    class="iconfont icon-car font-size-llxx"></i></span>
                    <span class="sanBold p-r-10x">Track order</span>
                                                        <span><strong><i
                                                                        class="iconfont icon-arrow-right font-size-base"></i></strong></span>
                </div>
            </a>
        @{{ /if }}
    @{{ if value.status_code == 11 }}
    <!-- 订单未支付 支付按钮 -->
        <div class="text-right p-b-10x">
            <a href="/payagain/@{{  $value.order_no }}/0" class="btn btn-primary btn-150 m-r-20x bigNoodle font-size-lxx">CREDIT CART</a>
            <a href="/payagain/@{{  $value.order_no }}/1" class="btn btn-primary btn-150 bigNoodle font-size-lxx">PAYPAL</a>
        </div>
        @{{ /if }}

    </div>
    @{{ /if }}
    @{{ /each }}
    @{{ /each }}
</template>

@include('footer')
