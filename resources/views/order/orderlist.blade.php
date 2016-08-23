@include('header')

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
                        <div class="shopbag-empty-content m-b-40x">
                            <div class="container shopbag-emptyInfo">
                                <div class="m-b-20x p-b-5x"><i class="btn-shopbagEmpty iconfont icon-book"></i></div>
                                <p class="text-primary m-b-20x p-b-20x font-size-llxx">No Oreders Found</p>
                                <a href="/daily" class="btn btn-block btn-primary btn-lg btn-320">Go Shopping</a>
                            </div>
                        </div>
                        @else
                            @foreach($data['list'] as $order)
                                @foreach($order['subOrderList'] as $subOrder)
                                    <div class="box-shadow bg-white m-b-20x">
                                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                                            <div>
                                                <h5 class="sanBold font-size-md">Order
                                                    Created: {{$subOrder['create_time']}}</h5>
                                                <p class="m-b-0 p-t-5x">{{ $subOrder['status_explain'] }}</p>
                                            </div>
                                            <span>
                                                <a class="btn btn-primary btn-md" href="/orderdetail/{{  $subOrder['order_no'] }}">Order Detail</a>
                                            </span>
                                        </div>
                                        <hr class="hr-base m-a-0">
                                        <div class="p-a-20x">
                                            @foreach($subOrder['lineOrderList'] as $lineOrder)
                                                <div class="checkout-Item">
                                                    <div class="media">
                                                        <div class="media-left m-r-15x">
                                                            <img class="img-thumbnail"
                                                                 src="{{config('runtime.CDN_URL')}}/n1/{{ $lineOrder['img_path'] }}"
                                                                 width="120" height="120" alt="">
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
                                                                        X{{ $lineOrder['sale_qtty'] }}</div>
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
                                                                <div class="media-body no-border">
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
                                                                                X{{ $value['vas_type'] }}</div>
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <div class="text-center">
                                                                                +${{ number_format(($value['vas_price'] / 100 * $value['vas_types']), 2) }}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    @endif
                                                </div>
                                            @endforeach
                                        </div>
                                        <hr class="hr-base">
                                        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                                            <div>
                                                Order # {{$subOrder['order_no']}}
                                            </div>
                                            <span>
                                                <span class="p-r-30x">Order total</span>
                                                <span>${{ number_format(($subOrder['pay_amount'] / 100), 2) }}</span>
                                            </span>
                                        </div>
                                    </div>
                                @endforeach
                            @endforeach
                        @endif
                    </div>
                    <!-- 查看更多 按钮 loading -->
                    <div class="text-center m-y-30x">
                        <a class="btn btn-block btn-gray btn-lg btn-380 orderList-seeMore" href="javascript:void(0)">See more of all</a>

                        <div class="loading orderList-loading" style="display: none">
                            <div class="loader"></div>
                            <div class="text-center p-t-5x p-l-10x">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 订单列表 模版 -->
<template id="tpl-orderList">
    @{{ each list }}
    @{{ each $value.subOrderList as value index }}

    <div class="box-shadow bg-white m-b-20x">
        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
            <div>
                <h5 class="sanBold font-size-md">Order Created: @{{ value.create_time }}</h5>
                <p class="m-b-0 p-t-5x">@{{ value.status_explain }}</p>
            </div>
                            <span>
                                <a class="btn btn-primary btn-md" href="/orderdetail/@{{ value.order_no }}">Order Detail</a>
                            </span>
        </div>
        <hr class="hr-base m-a-0">
        <div class="p-a-20x">
            @{{ each value.lineOrderList }}
                <div class="checkout-Item">
                    <div class="media">
                        <div class="media-left m-r-15x">
                            <img class="img-thumbnail" src="{{config('runtime.CDN_URL')}}/n1/@{{ $value.img_path }}" width="120" height="120" alt="">
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
                                    <div class="text-center">X@{{ $value.sale_qtty }}</div>
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
                                <div class="media-body no-border">
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
                                            <div class="text-center">X@{{ $value.vas_type }}</div>
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
            @{{ /each }}
        </div>
        <hr class="hr-base">
        <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
            <div>
                Order # @{{ value.order_no }}
            </div>
            <span>
                <span class="p-r-30x">Order total</span>
                <span>$@{{ (value.pay_amount/100).toFixed(2) }}</span>
            </span>
        </div>
    </div>
    @{{ /each }}
    @{{ /each }}
</template>

@include('footer')
