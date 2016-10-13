<!-- 头部 -->
@include('header',['title'=>'MOTIF | Checkout'])
<script type="text/javascript">
    // 支付埋点
    function onCheckout() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            'event': 'checkout',
            'ecommerce': {
                'checkout': {
                    'actionField': {'step': 1, 'total': '{{ number_format(($data['pay_amount'] / 100), 2)}}'},
                    'products': [
                            @foreach($accountList['showSkus'] as $showSku)
                        {
                            'name': '{{$showSku['main_title']}}',
                            'id': '{{$showSku['spu']}}',
                            'price': '{{ number_format(($showSku['sale_price'] / 100), 2) }}',
                            'brand': 'Motif PC',
                            'category': '',
                            'variant': '',
                            'quantity': '{{$showSku['sale_qtty']}}'
                        },
                        @endforeach
                    ]
                }
            }
        });
    }
</script>

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container" id="checkoutView" data-status="true">
        <h4 class="helveBold text-main p-l-10x">Checkout</h4>

        <!-- Checkout Product Item -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="sanBold font-size-md p-x-20x p-y-15x">Items</div>
            <hr class="hr-base m-a-0">
            <div class="p-x-20x">
                @foreach($accountList['showSkus'] as $showSku)
                    <div class="checkout-Item border-bottom p-y-20x">
                        <div class="media">
                            <div class="media-left m-r-15x">
                                <img class="" src="{{config('runtime.CDN_URL')}}/n1/{{$showSku['main_image_url']}}"
                                     width="120" height="120" alt="">
                            </div>
                            <div class="media-body @if(empty($showSku['showVASes'])) no-border @endif">
                                <div class="row flex flex-alignCenter">
                                    <div class="col-md-3">
                                        <div class="font-size-md text-main p-l-20x">{{ $showSku['main_title'] }}</div>
                                    </div>
                                    <div class="col-md-3">
                                        @if(isset($showSku['attrValues']))
                                            @foreach($showSku['attrValues'] as $attr)
                                                {{$attr['attr_type_value']}}:{{$attr['attr_value']}}<br>
                                            @endforeach
                                        @endif
                                    </div>
                                    <div class="col-md-2">
                                        <div class="text-center">
                                            ${{number_format(($showSku['sale_price'] / 100), 2)}}</div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="text-center">x{{$showSku['sale_qtty']}}</div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="text-center">
                                            ${{number_format(($showSku['total_amount'] / 100), 2)}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @if(isset($showSku['showVASes']))
                            <div class="media">
                                @foreach($showSku['showVASes'] as $vas)
                                    <div class="media-left m-r-15x">
                                        &nbsp;
                                    </div>
                                    <div class="media-body no-border">
                                        <div class="row flex flex-alignCenter border-top">
                                            <div class="col-md-3">
                                                <div class="p-l-20x">{{ $vas['vas_name'] }}</div>
                                            </div>
                                            <div class="col-md-3">
                                                <div>{{ $vas['user_remark'] }}</div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-center">
                                                    ${{number_format(($vas['vas_price'] / 100), 2)}}</div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-center">x{{ $showSku['sale_qtty']  }}</div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="text-center">
                                                    +${{number_format(($vas['vas_price'] / 100 * $showSku['sale_qtty']), 2)}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                @endforeach
                            </div>
                        @endif
                    </div>
                    {{--预售--}}
                    {{--@if(1 == $showSku['sale_type'] && isset($showSku['skuPromotion']['ship_desc']))--}}
                    {{--<div class="presale-checkout text-white font-size-md p-a-10x bg-red sanBold">PREORDER: Expected to ship--}}
                    {{--on {{$showSku['skuPromotion']['ship_desc']}}</div>--}}
                    {{--@endif--}}
                @endforeach
            </div>
        </div>

        {{--Shipping Address--}}
        {{--Address 注入服务--}}
        @inject('Address', 'App\Http\Controllers\AddressController')
        {{--*/ $address = $Address->index() /*--}}
        <div class="box-shadow bg-white m-t-20x">
            <div class="font-size-md p-x-20x p-y-15x btn-showHide @if(empty($address['data']['list'])){{'active'}}@endif"
                 id="addrShowHide">
                <span class="sanBold">Shipping to</span>
                <span class="pull-right showHide-simpleInfo">
                    @forelse ($address['data']['list'] as $value)
                        @if($value['isDefault'])
                            <span id="defaultAddr" data-csn="{{$value['country_name_sn']}}"
                                  data-aid="{{$value['receiving_id']}}">{{$value['name']}} {{$value['detail_address1']}} {{$value['city']}} {{$value['state']}} {{$value['country']}} {{$value['zip']}}</span>
                        @endif
                        @break($value['isDefault'])
                    @empty
                        <span id="defaultAddr" data-aid="0"></span>
                    @endforelse
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body address-content @if(empty($address['data']['list'])){{'active'}}@endif">
                {{--选择地址--}}
                <div class="p-a-20x select-address @if(empty($address['data']['list'])){{'disabled'}}@endif">
                    <div class="flex flex-alignCenter flex-fullJustified">
                        <span class="font-size-md">Shipping Address</span>
                        <span class="font-size-md pull-right">
                            <div class="btn btn-secondary btn-md btn-addNewAddress" href="#">
                                <i class="iconfont icon-add font-size-md p-r-5x"></i>Add New Address</div>
                        </span>
                    </div>
                    <div class="row p-x-10x p-t-20x address-list"></div>
                    <div class="text-right p-t-10x">
                        <a href="javascript:;" class="btn btn-primary btn-md" id="btnAddrShowHide">Continue</a>
                    </div>
                </div>
                {{--添加\修改 地址--}}
                <div class="p-a-20x add-address @if(!empty($address['data']['list'])){{'disabled'}}@endif">
                    <div class="inline">
                        <span class="font-size-md address-text">Add Shipping Address</span>
                        <span class="font-size-md pull-right">
                            <i class="isDefault iconfont icon-checkcircle btn-makePrimary text-primary font-size-lg @if(empty($address['data']['list'])){{'active'}}@endif"></i>
                            <a class="p-l-10x" href="javascript:;">Default</a>
                        </span>
                    </div>
                    <div class="row p-t-30x">
                        <form id="addAddressForm" data-aid="">
                            <div class="col-md-5">

                                <input type="hidden" name="email" value="{{Session::get('user.login_email')}}">
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="name"
                                           class="form-control contrlo-lg text-primary address-name"
                                           placeholder="Full name">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your name !</span>
                                    </div>
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="tel"
                                           class="form-control contrlo-lg text-primary address-phone"
                                           placeholder="Phone">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your Phone !</span>
                                    </div>
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="addr1"
                                           class="form-control contrlo-lg text-primary address-street"
                                           placeholder="Street 1">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your street !</span>
                                    </div>
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="addr2" class="form-control contrlo-lg text-primary"
                                           placeholder="Street 2 (optional)">
                                </div>


                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-md-5">

                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="city"
                                           class="form-control contrlo-lg text-primary address-city" placeholder="City">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your city !</span>
                                    </div>
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <select name="country" class="form-control contrlo-lg select-country">
                                        @foreach($Address->getCountry() as $value)
                                            <option value="{{$value['country_name_en']}}"
                                                    data-type="{{$value['child_type']}}"
                                                    data-id="{{$value['country_id']}}">{{$value['country_name_en']}}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="p-l-20x m-b-20x state-info">
                                    <input type="text" name="state" class="form-control contrlo-lg text-primary"
                                           placeholder="State">
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="zip" id="zip"
                                           class="form-control contrlo-lg text-primary address-zipcode"
                                           placeholder="Zip Code">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your zip code !</span>
                                    </div>
                                </div>

                                <div>
                                    <input type="hidden" name="isd"
                                           value="@if(empty($address['data']['list'])){{'1'}}@else{{'0'}}@endif">
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </form>
                    </div>
                    <div class="text-right">
                        <a href="javascript:;" id="addAddress-cancel"
                           class="btn btn-secondary btn-md m-r-10x">Cancel</a>
                        <a href="javascript:;" id="addAddress" class="btn btn-primary btn-md address-save">Save</a>
                    </div>
                </div>
            </div>
        </div>

        {{--Shipping Method--}}
        <div class="box-shadow bg-white m-t-20x">
            <div class="font-size-md p-x-20x p-y-15x btn-showHide" id="smShowHide">
                <span class="sanBold">Shipping</span>
                <span class="pull-right showHide-simpleInfo">
                    <span class="shippingMethodShow">{{$logisticsList['list'][0]['logistics_name']}} @if($list['pay_price']>0)
                            +${{ number_format(($logisticsList['list'][0]['pay_price'] / 100), 2) }}@endif</span>
                    <a class="p-l-40x shippingMethodButton">@if(count($logisticsList['list'])>1){{'Edit'}}@endif</a>
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body method-content">
                <!-- 选择 物流方式 -->
                <div class="p-a-20x">
                    <div class="row p-x-20x p-t-20x checkout-method">
                        @foreach($logisticsList['list'] as $k=>$list)
                            <div class="col-md-6 p-b-10x">
                                @if($k==0)
                                <input class="methodRadio" type="radio"
                                       checked="checked" name="shippingMethod"
                                       data-price="{{$list['pay_price']}}"
                                       value="{{$list['logistics_type']}}" data-show="{{ $list['logistics_name'] }}">
                                @else
                                        <input class="methodRadio" type="radio" name="shippingMethod"
                                               data-price="{{$list['pay_price']}}"
                                               value="{{$list['logistics_type']}}" data-show="{{ $list['logistics_name'] }}">
                                @endif
                                <label for="" class="p-l-10x">{{ $list['logistics_name'] }}
                                    @if($list['pay_price']>0)
                                        +${{ number_format(($list['pay_price'] / 100), 2) }}
                                    @endif
                                </label>
                            </div>
                        @endforeach
                    </div>
                    <div class="text-right"><a href="javascript:;" id="smsubmit"
                                               class="btn btn-primary btn-md">Continue</a></div>
                </div>
            </div>
        </div>

        {{--Promotion Code--}}
        <div class="box-shadow bg-white m-t-20x" id="pcode" data-bindid="{{$accountList['cp_bind_id']}}">
            <div class="p-x-20x p-y-15x font-size-md btn-showHide" id="">
                <span class="sanBold">Promotion Code</span>
                <span class="pull-right showHide-simpleInfo">
                    <span id="codemessage"></span>
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body p-x-20x p-b-20x">
                <!--新增促销码-->
                <div class="p-a-20x addPromotionCode disabled">
                    <div class="goback-toAdd"><i class="iconfont icon-arrow-left font-size-lg p-r-10x"></i></div>
                    <div class="invite-content addPromotion-content">
                        <p class="helveBold font-size-llxx m-t-40x">Add New Promotion Code</p>
                        <div class="addCode-input m-t-20x text-left">
                            <input type="text" class="form-control contrlo-lg text-primary m-b-10x" name="cps" value=""
                                   placeholder="Enter Your Promotion Code Here">
                                    <span class="warning-info text-warning off">
                                        <i class="iconfont icon-caveat p-r-5x"></i>
                                        <span class="font-size-base invalidText"></span>
                                    </span>
                        </div>

                        <div class="text-center m-t-30x">
                            <div class="btn btn-primary btn-lg btn-200 coupon-apply disabled">Apply</div>
                        </div>
                    </div>
                </div>

                <!-- Coupons and Promotions-->
                <div class="p-a-20x showPromotionCode">
                    <div class="flex flex-alignCenter flex-fullJustified">
                        <span class="font-size-md sanBold"></span>
                        <span class="font-size-md pull-right">
                            <div class="btn btn-secondary btn-md btn-addNewCode"><i
                                        class="iconfont icon-add font-size-md p-r-5x"></i>Add New Promotion Code</div>
                        </span>
                    </div>
                    <div class="row p-x-10x p-t-20x coupon-list">

                    </div>
                </div>
            </div>
        </div>


        <!-- Special Request (optional) -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="p-x-20x p-y-15x font-size-md btn-showHide" id="crShowHide">
                <span class="sanBold">Special Request (optional)</span>
                <span class="pull-right showHide-simpleInfo">
                    <span id="srmessage"></span>
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <div class="showHide-body p-x-20x p-b-20x">
                <div class="p-x-20x p-b-20x">
                    <textarea name="cremark" class="form-control" cols="30" rows="4"></textarea>
                </div>
                <div class="text-right"><a href="javascript:;" id="crsubmit" class="btn btn-primary btn-md">Save</a>
                </div>
            </div>
        </div>

        <!-- 结算总价 -->
        <div class="box-shadow bg-white m-t-20x checkoutInfo"
             data-price="{{$accountList['total_amount']+$accountList['vas_amount']}}">
            <div class="p-a-20x font-size-md">
                {{--数量--}}
                <div class="text-right">
                    <span>Items ({{$accountList['total_sku_qtty']}}):</span>
                    <span class="sanBold cart-price">${{number_format(($accountList['total_amount'] / 100), 2)}}</span>
                </div>
                {{--增值服务--}}
                @if($accountList['vas_amount'] > 0)
                    <div class="text-right @if($accountList['vas_amount'] > 0) @endif">
                        <span>Additional services:</span>
                        <span class="sanBold cart-price">${{ number_format(($accountList['vas_amount'] / 100), 2) }}</span>
                    </div>
                @endif
                {{--优惠--}}
                <div class="text-right promotion-code cps_amountShow @if($accountList['cps_amount'] <= 0) hidden @endif">
                    <span>Promotion code:</span>
                    <span class="sanBold cart-price cps_amount">-${{number_format(($accountList['cps_amount'] / 100), 2)}}</span>
                </div>
                {{--折扣--}}
                @if($accountList['promot_discount_amount'] > 0)
                    <div class="text-right">
                        <span>Discount</span>
                        <span class="sanBold cart-price">-${{number_format(($accountList['promot_discount_amount'] / 100), 2)}}</span>
                    </div>
                @endif
                {{--收税提示--}}
                <div class="text-right promotion-code tax_amountShow @if($accountList['tax_amount'] <= 0) hidden @endif">
                    <span>Sales tax:</span>
                    <span class="sanBold cart-price tax_amount">${{number_format(($accountList['tax_amount'] / 100), 2)}}</span>
                </div>
                {{--地址服务--}}
                <div class="text-right">
                    <span>Shipping and handling:</span>
                    <span class="sanBold cart-price freight_amount">@if(0 == $accountList['freight_amount']) Free @else
                            ${{ number_format(($accountList['freight_amount'] / 100), 2)}} @endif</span>
                </div>
                {{--结算价--}}
                <div class="text-right ">
                    <span>Order Total:</span>
                    <span class="sanBold cart-price pay_amount">${{ number_format(($accountList['pay_amount']) / 100, 2) }}</span>
                </div>
            </div>
        </div>
        <div class="checkoutWarning p-y-10x text-right text-warning" hidden>
            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
            <span class="font-size-base"></span>
        </div>
        <!-- 提交按钮 -->
        <div class="p-y-20x text-right">
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg btn-toCheckout m-r-40x" data-with="Oceanpay">Pay
                with Credit Card</a>
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg btn-toCheckout" data-with="PayPalNative">Pay
                with PayPal</a>
        </div>
    </div>
</section>

<div class="remodal modal-content remodal-md" data-remodal-id="modal" id="modalDialog" data-spu="">
    <div class="sanBold text-center font-size-md p-a-15x">Remove Items from Your Bag?</div>
    <hr class="hr-common m-a-0">
    <div class="text-center dialog-info">Are you sure you want to remove this item?</div>
    <hr class="hr-common m-a-0">
    <div class="row">
        <div class="col-md  -6">
            <div class="m-y-20x m-l-20x"><a href="#" class="btn btn-block btn-secondary btn-lg">Remove</a></div>
        </div>
        <div class="col-md-6">
            <div class="m-y-20x m-r-20x"><a href="#" class="btn btn-block btn-primary btn-lg"
                                            data-remodal-action="close">Cancel</a></div>
        </div>
    </div>
</div>
<!-- address 模版 -->
<template id="tpl-address">
    @{{ each list }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="address-item p-x-20x p-y-15x @{{ if $value.isDefault == 1 }} active @{{ /if }}"
                 data-info="@{{ $value.name }} @{{ $value.detail_address1 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }} @{{ $value.zip }}"
                 data-csn="@{{ $value.country_name_sn }}"
                 data-aid="@{{ $value.receiving_id }}">
                <div class="address-info">
                    @{{ $value.name }}<br>
                    @{{ $value.zip }}<br>
                    @{{ $value.city }}, @{{ $value.state }}<br>
                    @{{ $value.country }}
                </div>
                <div class="bg-address"></div>
                @{{ if $value.isDefault == 1 }}
                <div class="primary-address font-size-md">Primary</div>
                @{{ /if }}
                <div class="btn-edit font-size-md btn-editAddress">Edit</div>
                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i>
                </div>
            </div>
        </div>
    </div>
    @{{ /each }}
</template>

<!-- 优惠券 模版 -->
<template id="tpl-coupon">
    @{{ each list }}
    <div class="col-md-6">
        <div class="m-a-10x">
            <div class="row promotion-item checkoutPromotion-item flex flex-alignCenter @{{ if $value.usable == true }} codeItem @{{ /if }} @{{ if $value.selected == true }} active @{{ /if }}"
                 data-promotioncode="@{{ $value.cp_title }}" data-bindid="@{{ $value.bind_id }}">
                <div class="col-md-8">
                    <div class="text-right p-left p-r-15x p-y-15x">
                        <div class="helveBold font-size-sm">@{{ $value.prompt_words }}</div>
                        <span class="font-size-sm">Expire: @{{ $value.expiry_time }}</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="font-size-lx text-left helveBold">@{{ $value.cp_title }}</div>
                </div>
                <div class="promotionCode-Primary"><i class="iconfont icon-check font-size-lg"></i></div>
                @{{ if $value.usable == false }}
                <div class="mask"></div>
                @{{ /if }}
            </div>
            {{--提示--}}
            @{{ if $value.bind_id == 678 }}
                <span class="warning-info flex flex-alignCenter text-warning p-t-5x">
                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                    <span class="font-size-base">This coupon can only be used in our free Motif app.</span>
                </span>
            @{{ /if }}
        </div>
    </div>
    @{{ /each }}
</template>

<!-- 物流模板 -->
<template id="tpl-method">
    @{{each list as value index}}
    @{{ if 0 == index }}
    <div class="col-md-6 p-b-10x">
        <input type="radio" class="methodRadio" checked="checked" id="method@{{ value.pay_price }}"
               name="shippingMethod" data-price="@{{ value.pay_price }}" value="@{{ value.logistics_type }}"
               data-show="@{{ value.logistics_name }}">
        <label for="method@{{ value.pay_price }}" class="p-l-10x">
            @{{ if value.pay_price == 0}}
            @{{ value.logistics_name }}
            @{{ else }}
            @{{ value.logistics_name }} +$@{{ (value.pay_price/100).toFixed(2) }}
            @{{ /if }}
        </label>
    </div>
    @{{ else }}
    <div class="col-md-6 p-b-10x">
        <input type="radio" class="methodRadio" id="method@{{ value.pay_price }}" name="shippingMethod"
               data-price="@{{ value.pay_price }}" value="@{{ value.logistics_type }}"
               data-show="@{{ value.logistics_name }}">
        <label for="method@{{ value.pay_price }}" class="p-l-10x">
            @{{ if value.pay_price == 0}}
            @{{ value.logistics_name }}
            @{{ else }}
            @{{ value.logistics_name }} +$@{{ (value.pay_price/100).toFixed(2) }}
            @{{ /if }}
        </label>
    </div>
    @{{ /if }}
    @{{ /each }}
</template>
@include('footer')


