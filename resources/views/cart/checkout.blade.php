<!-- 头部 -->
@include('header',['title'=>'Checkout'])
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
        <div class="box-shadow bg-white m-t-20x" id="addrlength" data-addrlength ="{{ count($address['data']['list']) }}">
            <div class="font-size-md p-x-20x p-y-15x btn-showHide @if(empty($address['data']['list'])){{'active'}}@endif"
                 id="addrShowHide">
                <span class="sanBold">Shipping to</span>
                <span class="pull-right showHide-simpleInfo">
                    @if(Session::has('user.checkout.address'))
                        {{$value = Session::get('user.checkout.address')}}
                        <span id="defaultAddr" data-csn="{{$value['country_name_sn']}}"
                              data-aid="{{$value['receiving_id']}}">{{$value['name']}} {{$value['detail_address1']}} {{$value['city']}} {{$value['state']}} {{$value['country']}} {{$value['zip']}}</span>
                    @else
                        @forelse ($address['data']['list'] as $value)
                            @if($value['isDefault'])
                                <span id="defaultAddr" data-csn="{{$value['country_name_sn']}}"
                                      data-aid="{{$value['receiving_id']}}">{{$value['name']}} {{$value['detail_address1']}} {{$value['city']}} {{$value['state']}} {{$value['country']}} {{$value['zip']}}</span>
                            @endif
                            @break($value['isDefault'])
                        @empty
                            <span id="defaultAddr" data-aid="0"></span>
                        @endforelse
                    @endif
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
                                <i class="iconfont icon-add font-size-md p-r-5x"></i>Add New Address
                            </div>
                        </span>
                    </div>
                    <div class="row p-x-10x p-t-20x address-list"></div>
                    <div class="text-right p-t-10x">
                        <a href="javascript:;" class="btn btn-primary btn-md btnAddrShowHide">Continue</a>
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
                                <input type="hidden" name="email" class="address-email"
                                       value="{{Session::get('user.login_email')}}">
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
                                           class="form-control contrlo-lg text-primary address-addr1"
                                           placeholder="Street 1">
                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                        <span class="font-size-base">Please enter your street !</span>
                                    </div>
                                </div>
                                <div class="p-l-20x m-b-20x">
                                    <input type="text" name="addr2"
                                           class="form-control contrlo-lg text-primary address-addr2"
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
                                        @foreach($Address->getCountry(0) as $value)
                                            <option value="{{$value['country_name_en']}}"
                                                    data-type="{{$value['child_type']}}"
                                                    data-id="{{$value['country_id']}}"
                                                    data-child_label="{{$value['child_label']}}"
                                                    data-zipcode_label="{{$value['zipcode_label']}}">{{$value['country_name_en']}}</option>
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
                        <a href="javascript:void(0);" id="addAddress-cancel"
                           class="btn btn-secondary btn-md m-r-10x">Cancel</a>
                        <a href="javascript:void(0);" id="addAddress"
                           class="btn btn-primary btn-md address-save">Save</a>
                    </div>
                </div>
            </div>
        </div>

        {{--Shipping Method--}}
        <div class="box-shadow bg-white m-t-20x">
            <div class="font-size-md p-x-20x p-y-15x btn-showHide" id="smShowHide">
                <span class="sanBold">Shipping</span>
                <span class="pull-right showHide-simpleInfo">
                    @if(Session::has('user.checkout.selship'))
                        <span class="shippingMethodShow">{{Session::get('user.checkout.selship.logistics_name')}} @if(Session::get('user.checkout.selship.pay_price')>0)
                                +${{ number_format((Session::get('user.checkout.selship.pay_price') / 100), 2) }}@endif</span>
                        <a class="p-l-40x shippingMethodButton">Edit</a>
                    @else
                        <span class="shippingMethodShow">{{$logisticsList['list'][0]['logistics_name']}} @if($list['pay_price']>0)
                                +${{ number_format(($logisticsList['list'][0]['pay_price'] / 100), 2) }}@endif</span>
                        <a class="p-l-40x shippingMethodButton">@if(count($logisticsList['list'])>1){{'Edit'}} @else
                                &nbsp; @endif</a>
                    @endif
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body method-content">
                <!-- 选择 物流方式 -->
                <div class="p-a-20x">
                    <div class="row p-x-20x p-t-20x checkout-method">
                        @foreach($logisticsList['list'] as $k=>$list)
                            <div class="col-md-6 p-b-10x">
                                @if(Session::has('user.checkout.selship'))
                                    <input class="methodRadio" type="radio"
                                           @if( Session::get('user.checkout.selship.logistics_type') == $list['logistics_type'] ) checked="checked"
                                           @endif name="shippingMethod"
                                           data-price="{{$list['pay_price']}}"
                                           value="{{$list['logistics_type']}}"
                                           data-show="{{ $list['logistics_name'] }}">
                                @else
                                    @if($k==0)
                                        <input class="methodRadio" type="radio"
                                               checked="checked" name="shippingMethod"
                                               data-price="{{$list['pay_price']}}"
                                               value="{{$list['logistics_type']}}"
                                               data-show="{{ $list['logistics_name'] }}">
                                    @else
                                        <input class="methodRadio" type="radio" name="shippingMethod"
                                               data-price="{{$list['pay_price']}}"
                                               value="{{$list['logistics_type']}}"
                                               data-show="{{ $list['logistics_name'] }}">
                                    @endif
                                @endif
                                <label for="" class="p-l-10x">{{ $list['logistics_name'] }}
                                    @if($list['pay_price']>0)
                                        +${{ number_format(($list['pay_price'] / 100), 2) }}
                                    @endif
                                </label>
                            </div>
                        @endforeach
                    </div>
                    <div class="text-right"><a href="javascript:void(0);" id="smsubmit"
                                               class="btn btn-primary btn-md">Continue</a></div>
                </div>
            </div>
        </div>

        {{--Payment Method--}}
        <div class="box-shadow bg-white m-t-20x active">
            @inject('Wordpay', 'App\Http\Controllers\WordpayController')
            {{$paylist = $Wordpay->getPayList()}}
            <div class="font-size-md p-x-20x p-y-15x btn-showHide" id="pmShowHide">
                <span class="sanBold">Payment Method</span>
                <span class="pull-right showHide-simpleInfo">
                    @if(Session::has('user.checkout.paywith'))
                        @if(Session::has('user.checkout.paywith.withCard'))
                            {{$withCard = Session::get('user.checkout.paywith.withCard')}}
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-paypal">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-visa @if($withCard['card_type'] == 'Visa') active @endif ">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-masc @if($withCard['card_type'] == 'MasterCard') active @endif ">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-amc @if($withCard['card_type'] == 'AmericanExpress') active @endif ">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-jcb @if($withCard['card_type'] == 'JCB') active @endif ">
                            <span class="p-l-10x payment-text">{{$withCard['card_number']}}</span>
                        @else
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-paypal active">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-visa">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-masc">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-amc">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@3x.png{{config('runtime.V')}} 3x"
                                 class="pay-img pay-jcb">
                            <span class="p-l-10x payment-text">PayPal</span>
                        @endif
                    @else
                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43.png"
                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-43@3x.png{{config('runtime.V')}} 3x"
                             class="pay-img pay-paypal">
                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32.png"
                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@3x.png{{config('runtime.V')}} 3x"
                             class="pay-img pay-visa">
                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32.png"
                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@3x.png{{config('runtime.V')}} 3x"
                             class="pay-img pay-masc">
                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32.png"
                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-32@3x.png{{config('runtime.V')}} 3x"
                             class="pay-img pay-amc">
                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32.png"
                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@3x.png{{config('runtime.V')}} 3x"
                             class="pay-img pay-jcb">
                        <span class="p-l-10x payment-text"></span>
                    @endif
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body payment-content">
                <!--选择支付方式-->
                <div class="p-a-20x select-payment">
                    <span class="font-size-md">Select Payment Method</span>
                    <div class="row p-x-10x p-t-20x payment-list">
                        @foreach($paylist['data']['list'] as $list)
                            @if(isset($list['creditCards']))
                                @foreach($list['creditCards'] as $card)
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="card-item choose-item p-a-20x @if($card['card_id'] == Session::get('user.checkout.paywith.withCard.card_id')) active @endif"
                                                 data-cardtype="{{ $card['card_type'] }}"
                                                 data-cardnum="{{ $card['card_number'] }}"
                                                 data-cardid="{{ $card['card_id'] }}"
                                                 data-paytype="{{ $card['pay_type'] }}">
                                                <div>
                                                    <span class="payLeft-minW">
                                                    @if($card['card_type'] == 'Visa')
                                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-52.png"
                                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-52@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-52@3x.png{{config('runtime.V')}} 3x">
                                                        @elseif($card['card_type'] == 'MasterCard')
                                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-52.png"
                                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-52@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-52@3x.png{{config('runtime.V')}} 3x">
                                                        @elseif($card['card_type'] == 'AmericanExpress')
                                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-52.png"
                                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-52@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-52@3x.png{{config('runtime.V')}} 3x">
                                                        @elseif($card['card_type'] == 'JCB')
                                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-52.png"
                                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-52@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-52@3x.png{{config('runtime.V')}} 3x">
                                                        @endif
                                                    </span>

                                                    <span class="sanBold font-size-lx">{{  $card['card_number'] }}</span>
                                                </div>
                                                <div class="m-t-20x flex">
                                                    <span class="payLeft-minW">Exp:{{$card['month']}}
                                                        /{{$card['year']}}</span>
                                                    <span class="billingTxt">Billing:{{$card['detail_address1']}} {{$card['detail_address2']}} {{$card['city']}} {{$card['state']}} {{$card['country']}}</span>
                                                </div>
                                                <div class="btn-addPrimary"><i
                                                            class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                                <div class="col-md-6">
                                    <div class="p-a-10x">
                                        <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard" data-method="{{$list['pay_method']}}">
                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-card.png"
                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-card@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-card@3x.png{{config('runtime.V')}} 3x">
                                            <span class="font-size-lxx">Add New Credit Card</span>
                                            <i class="iconfont icon-add m-r-20x"></i>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <div class="col-md-6">
                                    <div class="p-a-10x">
                                        <div class="card-item choose-item flex flex-alignCenter p-x-20x @if($list['pay_type'] == Session::get('user.checkout.paywith.pay_type')) active @endif"
                                             data-cardtype="paypal" data-cardnum="PayPal" data-cardid="PayPal"
                                             data-paytype="{{$list['pay_type']}}">
                                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-32@2x.png"
                                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-32@3x.png{{config('runtime.V')}} 2x">
                                            <span class="font-size-lxx p-l-40x">{{$list['pay_name']}}</span>
                                            <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    </div>
                    <div class="text-right p-t-10x">
                        <a href="javascript:void(0);" class="btn btn-primary btn-md"
                           id="btnPaymentShowHide">Continue</a>
                    </div>
                </div>
                <!--添加卡-->
                <div class="p-a-20x add-newCard disabled">
                    <div class="inline">
                        <span class="font-size-md sanBold">Add New Credit Card</span>
                        {{--<span class="font-size-md pull-right">
                            <i class="isDefault iconfont icon-checkcircle hover-blue font-size-lg active"></i>
                            <span class="p-l-5x">Make Primary</span>
                        </span>--}}
                    </div>

                    <div class="p-a-20x">
                        <div>We Accept:
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-32@3x.png{{config('runtime.V')}} 3x"
                                 class="m-l-10x" id="img-mastercard" data-type="MasterCard">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-32@3x.png{{config('runtime.V')}} 3x"
                                 class="m-l-20x" id="img-visa" data-type="Visa">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-32@3x.png{{config('runtime.V')}} 3x"
                                 class="m-l-20x" id="img-jcb" data-type="JCB">
                            <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32.png"
                                 srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-32@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-32@3x.png{{config('runtime.V')}} 3x"
                                 class="m-l-20x" id="img-amex" data-type="AmericanExpress">
                        </div>
                        <div class="card-wrapper" style="display: none;"></div>
                        <div class="row p-t-20x">
                            <form action="" id="addCard-container">
                                <input name="card_type" type="hidden">

                                <div class="col-md-4">
                                    <input type="text" name="card" maxlength="20"
                                           class="form-control contrlo-lg text-primary card-number"
                                           data-optional="false" data-inputrole="credit card number"
                                           placeholder="Credit Card Number">
                                    <div class="warning-info flex flex-alignLeft text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-t-5x p-r-5x"></i>
                                        <span class="font-size-base"></span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="expiry" maxlength="7"
                                           class="form-control contrlo-lg text-primary card-date" data-optional="false"
                                           data-inputrole="expiration date" placeholder="MM/YY">
                                    <div class="warning-info flex flex-alignLeft text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-t-5x p-r-5x"></i>
                                        <span class="font-size-base"></span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="cvc" maxlength="4"
                                           class="form-control contrlo-lg text-primary card-code" data-optional="false"
                                           data-inputrole="security code" placeholder="Security Code">
                                    <div class="warning-info flex flex-alignLeft text-warning p-t-5x off">
                                        <i class="iconfont icon-caveat icon-size-md p-t-5x p-r-5x"></i>
                                        <span class="font-size-base"></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="row m-t-40x">
                            <div class="col-md-6 p-b-10x">
                                <div>
                                    <input class="choose-oldAddr" type="radio" checked="checked" name="card-address">
                                    <label for="" class="p-l-10x">Billing address same as the shipping address</label>
                                </div>
                                {{--账单地址信息--}}
                                @if(Session::has('user.checkout.address'))
                                    {{$defaultAddr = Session::get('user.checkout.address')}}
                                @else
                                    {{$defaultAddr = $Address->getUserDefaultAddr()['data']}}
                                @endif
                                <div class="card-message">
                                    <div class="sanBold def-name">{{$defaultAddr['name']}}</div>
                                    <div class="def-city">{{$defaultAddr['city']}}</div>
                                    <div class="def-zip">{{$defaultAddr['zip']}}</div>
                                    <div class="def-state">{{$defaultAddr['state']}}</div>

                                    <input type="hidden" name="tel" class="def-tel"
                                           value="{{$defaultAddr['telephone']}}">
                                    <input type="hidden" name="addr1" class="def-addr1"
                                           value="{{$defaultAddr['detail_address1']}}">
                                    <input type="hidden" name="addr2" class="def-addr2"
                                           value="{{$defaultAddr['detail_address2']}}">
                                    <input type="hidden" name="country" class="def-country"
                                           value="{{$defaultAddr['country']}}">
                                </div>
                            </div>
                            <div class="col-md-6 p-b-10x">
                                <div>
                                    <input class="choose-addNewAddr" type="radio" name="card-address">
                                    <label for="" class="p-l-10x">Use a different billing address</label>
                                </div>
                            </div>
                        </div>
                        {{--start添加新的账单地址--}}
                        <div class="row card-addNewAddr disabled">
                            <form id="card-addAddressForm">
                                <div class="col-md-5">
                                    <input type="hidden" name="email" value="{{Session::get('user.login_email')}}">
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="name" data-optional="false" data-inputrole="name"
                                               class="form-control contrlo-lg text-primary card-name"
                                               placeholder="Full name">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your name !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="tel" data-optional="false" data-inputrole="phone"
                                               class="form-control contrlo-lg text-primary card-tel"
                                               placeholder="Phone">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your phone !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="addr1" data-optional="false" data-inputrole="street"
                                               class="form-control contrlo-lg text-primary card-addr1"
                                               placeholder="Street 1">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your street !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="addr2"
                                               class="form-control contrlo-lg text-primary card-addr2"
                                               placeholder="Street 2 (optional)">
                                    </div>
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="city" data-optional="false" data-inputrole="city"
                                               class="form-control contrlo-lg text-primary card-city"
                                               placeholder="City">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your city !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <select name="country" class="form-control contrlo-lg card-selectCountry">
                                            @foreach($Address->getCountry(1) as $value)
                                                <option value="{{$value['country_name_en']}}"
                                                        data-type="{{$value['child_type']}}"
                                                        data-id="{{$value['country_id']}}"
                                                        data-csn="{{$value['country_name_sn']}}"
                                                        data-child_label="{{$value['child_label']}}"
                                                        data-zipcode_label="{{$value['zipcode_label']}}">{{$value['country_name_en']}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="p-l-20x m-b-20x state-info">
                                        {{-- <input type="text" name="state" class="form-control contrlo-lg text-primary"
                                                placeholder="State">--}}
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="zip" id="zip" data-optional="false"
                                               data-inputrole="zip code"
                                               class="form-control contrlo-lg text-primary card-zip"
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
                            <a href="javascript:void(0);" id="card-addAddress-cancel"
                               class="btn btn-secondary btn-md m-r-10x">Cancel</a>
                            <a href="javascript:void(0);" id="btn-addNewCard" class="btn btn-primary btn-md">Continue</a>
                            <div class="warning-info text-warning p-t-10x addCard-warning off">
                                <i class="iconfont icon-caveat icon-size-md"></i>
                                <span class="font-size-base">Add Card Error!</span>
                            </div>
                        </div>
                        {{--end添加新的账单地址--}}
                    </div>
                </div>

            </div>
        </div>

        {{--Promotion Code--}}
        <div class="box-shadow bg-white m-t-20x" id="pcode"
             data-bindid="@if(Session::has('user.checkout.couponInfo')){{Session::get('user.checkout.couponInfo.bind_id')}}@else{{$accountList['cp_bind_id']}}@endif">
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
                                        class="iconfont icon-add font-size-md p-r-5x"></i>Add New Promotion Code
                            </div>
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
        <!-- 提交按钮 -->
        <div class="p-y-20x text-right">
            <div data-clks='{{config('runtime.CLK_URL')}}/log.gif?t=check.100002&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&ref=&v={"skipType":"placeorder","skipId":"","version":"1.0.1","ver":"9.2","src":"PC"}'
               class="btn btn-block btn-primary btn-lg btn-toCheckout m-r-40x" id="placeOrder" data-with="Worldpay">Place Order</div>
            {{--<a href="javascript:;" class="btn btn-block btn-primary btn-lg btn-toCheckout m-r-40x" data-with="Oceanpay">Pay
                with Credit Card</a>
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg btn-toCheckout" data-with="PayPalNative">Pay
                with PayPal</a>--}}
            <div class="checkoutWarning p-y-10x text-warning m-r-40x" hidden>
                <i class="iconfont icon-caveat icon-size-md"></i>
                <span class="font-size-base"></span>
            </div>
        </div>
    </div>
</section>

<!-- loading -->
<div class="loading loading-screen loading-switch loading-hidden" id="checkoutLoading">
    <div class="loader loader-screen"></div>
</div>

<!-- 移除商品弹框 -->
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
            <div class="address-item choose-item p-x-20x p-y-15x @{{ if $value.isSel == 0 || $value.isSel == 1 }}  @{{ if $value.isSel == 1 }} active  @{{ /if }} @{{ else }} @{{ if $value.isDefault == 1 }} active @{{ /if }} @{{ /if }}"
                 data-info="@{{ $value.name }} @{{ $value.detail_address1 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }} @{{ $value.zip }}"
                 data-csn="@{{ $value.country_name_sn }}" data-aid="@{{ $value.receiving_id }}"
                 data-name="@{{ $value.name }}" data-city="@{{ $value.city }}"
                 data-zip="@{{ $value.zip }}" data-state="@{{ $value.state }}" data-tel="@{{ $value.telephone }}"
                 data-addr1="@{{ $value.detail_address1 }}" data-addr2="@{{ $value.detail_address2 }}"
                 data-country="@{{ $value.country }}">
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

<!-- card 模板 -->
<template id="tpl-creditCard">
    @{{ each list }}
    @{{ if $value.pay_method === 'Worldpay' }}
    @{{ each $value.creditCards }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="card-item choose-item p-a-20x @{{ if $value.actived == 1}} active @{{ /if }}"
                 data-cardtype="@{{ $value.card_type }}" data-cardnum="@{{ $value.card_number }}"
                 data-cardid="@{{ $value.card_id }}" data-paytype="@{{ $value.pay_type }}">
                <div>
                    <span class="payLeft-minW">
                    @{{ if $value.card_type === 'MasterCard' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-mastercard.png" width="50">
                        @{{ else if $value.card_type === 'Visa' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-visa.png" width="50">
                        @{{ else if $value.card_type === 'JCB' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-jcb.png" width="50">
                        @{{ else if $value.card_type === 'AmericanExpress' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-amc.png" width="50">
                        @{{ /if }}
                    </span>

                    <span class="sanBold font-size-lx">@{{ $value.card_number }}</span>
                </div>
                <div class="m-t-20x flex">
                    <span class="payLeft-minW">Exp:@{{ $value.month }}/@{{ $value.year }}</span>
                    <span class="billingTxt">@{{ $value.detail_address1 }} @{{ $value.detail_address2 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }}</span>
                </div>
                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
            </div>
        </div>
    </div>
    @{{ /each }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard">

                <img src="{{config('runtime.Image_URL')}}/images/payment/card-four.png" width="60">
                <span class="font-size-lxx">Add New Credit Card</span>
                <i class="iconfont icon-add m-r-20x"></i>
            </div>
        </div>
    </div>

    @{{ else if $value.pay_method === 'PayPalNative' }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="card-item choose-item flex flex-alignCenter p-x-20x @{{ if $value.actived == 1 }} active @{{ /if }}"
                 data-cardtype="paypal" data-cardnum="PayPal" data-cardid="PayPal"
                 data-paytype="@{{ $value.pay_type }}">
                <img src="{{config('runtime.Image_URL')}}/images/payment/paypal-color@3x.png" width="60">
                <span class="font-size-lxx p-l-40x">@{{$value.pay_name}}</span>
                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
            </div>
        </div>
    </div>

    @{{ else if $value.pay_method === 'Oceanpay' }}
    @{{ each $value.creditCards }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="card-item choose-item p-a-20x @{{ if $value.actived == 1 }} active @{{ /if }}"
                 data-cardtype="@{{ $value.card_type }}" data-cardnum="@{{ $value.card_number }}"
                 data-cardid="@{{ $value.card_id }}" data-paytype="@{{ $value.pay_type }}">
                <div>
                    <span class="payLeft-minW">
                    @{{ if $value.card_type === 'MasterCard' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-mastercard.png" width="50">
                        @{{ else if $value.card_type === 'Visa' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-visa.png" width="50">
                        @{{ else if $value.card_type === 'JCB' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-jcb.png" width="50">
                        @{{ else if $value.card_type === 'AmericanExpress' }}
                        <img src="{{config('runtime.Image_URL')}}/images/payment/pay-amc.png" width="50">
                        @{{ /if }}
                    </span>

                    <span class="sanBold font-size-lx">@{{ $value.card_number }}</span>
                </div>
                <div class="m-t-20x flex">
                    <span class="payLeft-minW">Exp:@{{ $value.month }}/@{{ $value.year }}</span>
                    <span class="billingTxt">@{{ $value.detail_address1 }} @{{ $value.detail_address2 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }}</span>
                </div>
                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
            </div>
        </div>
    </div>
    @{{ /each }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard">
                <img src="{{config('runtime.Image_URL')}}/images/payment/card-four.png" width="60">
                <span class="font-size-lxx">Add New Credit Card</span>
                <i class="iconfont icon-add m-r-20x"></i>
            </div>
        </div>
    </div>

    @{{ /if }}

    @{{ /each }}
</template>

<!-- 优惠券 模版 -->
<template id="tpl-coupon">
    @{{ each list }}
    <div class="col-md-6">
        <div class="m-a-10x">
            <div class="row promotion-item checkoutPromotion-item flex flex-alignCenter @{{ if $value.usable == true }} codeItem @{{ /if }} @{{ if $value.selected == 1 }} active @{{ /if }}"
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
            @{{ if $value.cp_id == 306 }}
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



