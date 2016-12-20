@include('header')

        <!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container" data-status="true">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Payment Method'])
            @inject('Address', 'App\Http\Controllers\AddressController')
            {{--*/ $address = $Address->index() /*--}}

            @inject('Wordpay', 'App\Http\Controllers\WordpayController')
            {{$paylist = $Wordpay->getPayList()}}
            <div class="right">
                <div class="rightContent">
                    <div class="bigNoodle text-center leftMeun-title">Payment Method</div>
                    <hr class="hr-black m-t-0">
                    <!-- Address -->
                    <div class="bg-white mH">
                        <div class="payment-content">
                            <!--选择支付方式-->
                            <div class="select-payment">
                                <div class="row p-t-20x payment-list">
                                    @foreach($paylist['data']['list'] as $list)
                                        @if(isset($list['creditCards']))
                                            @foreach($list['creditCards'] as $card)
                                                <div class="col-md-6" data-paymentcardid="{{$card['card_id']}}">
                                                    <div class="p-a-10x">
                                                        <div class="choose-item p-a-20x"
                                                             data-cardtype="{{ $card['card_type'] }}"
                                                             data-cardnum="{{ $card['card_number'] }}"
                                                             data-cardid="{{ $card['card_id'] }}"
                                                             data-paytype="{{ $card['pay_type'] }}">
                                                            <div class="flex flex-alignCenter">
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
                                                                <span class="avenirMedium billingTxt font-size-lg">{{  $card['card_number'] }}</span>
                                                            </div>
                                                            <div class="m-t-10x flex">
                                                                <span class="payLeft-minW">Exp:{{$card['month']}} /{{$card['year']}}</span>
                                                                <span class="billingTxt">Billing:{{$card['detail_address1']}} {{$card['detail_address2']}} {{$card['city']}} {{$card['state']}} {{$card['country']}}</span>
                                                            </div>
                                                            <div class="btn-deleteCard btn-edit font-size-md hover-green" data-cardid="{{$card['card_id']}}">Delete</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                            <div class="col-md-6">
                                                <div class="p-a-10x">
                                                    <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard">
                                                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-card.png"
                                                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-card@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-card@3x.png{{config('runtime.V')}} 3x">
                                                        <span class="font-size-lg p-l-20x">Add New Credit Card</span>
                                                        <i class="iconfont icon-add"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        @else
                                            <div class="col-md-6">
                                                <div class="p-a-10x">
                                                    <div class="choose-item flex flex-alignCenter p-x-20x"
                                                         data-cardtype="paypal" data-cardnum="PayPal" data-cardid="PayPal"
                                                         data-paytype="{{$list['pay_type']}}">
                                                        <img src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-32@2x.png"
                                                             srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypallogo-32@3x.png{{config('runtime.V')}} 2x">
                                                        <span class="font-size-lg p-l-40x">{{$list['pay_name']}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    @endforeach
                                </div>
                                {{--<div class="text-right p-t-10x">--}}
                                    {{--<a href="javascript:void(0);" class="btn btn-primary btn-md"--}}
                                       {{--id="btnPaymentShowHide">Continue</a>--}}
                                {{--</div>--}}
                            </div>
                            <!--添加卡-->
                            <div class="add-newCard disabled">

                                <div class="p-t-20x p-b-10x font-size-md avenirBold">Add New Credit Card</div>

                                <div class="p-a-10x">
                                    <div class="p-t-10x p-l-20x">We Accept:
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
                                    <div class="row p-t-20x p-l-20x">
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
                                                <div class="avenirMedium def-name">{{$defaultAddr['name']}}</div>
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
                                                <div class="m-b-20x">
                                                    <input type="text" name="name" data-optional="false" data-inputrole="name"
                                                           class="form-control contrlo-lg text-primary card-name"
                                                           placeholder="Full name">
                                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                        <span class="font-size-base">Please enter your name !</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-20x">
                                                    <input type="text" name="tel" data-optional="false" data-inputrole="phone"
                                                           class="form-control contrlo-lg text-primary card-tel"
                                                           placeholder="Phone">
                                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                        <span class="font-size-base">Please enter your phone !</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-20x">
                                                    <input type="text" name="addr1" data-optional="false" data-inputrole="street"
                                                           class="form-control contrlo-lg text-primary card-addr1"
                                                           placeholder="Street 1">
                                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                        <span class="font-size-base">Please enter your street !</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-20x">
                                                    <input type="text" name="addr2"
                                                           class="form-control contrlo-lg text-primary card-addr2"
                                                           placeholder="Street 2 (optional)">
                                                </div>
                                            </div>
                                            <div class="col-md-2"></div>
                                            <div class="col-md-5">
                                                <div class="m-b-20x">
                                                    <input type="text" name="city" data-optional="false" data-inputrole="city"
                                                           class="form-control contrlo-lg text-primary card-city"
                                                           placeholder="City">
                                                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                        <span class="font-size-base">Please enter your city !</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-20x">
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
                                                <div class="m-b-20x state-info">
                                                     <input type="text" name="state" class="form-control contrlo-lg text-primary"
                                                            placeholder="State">
                                                </div>
                                                <div class="m-b-20x">
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
                                        </form>
                                    </div>
                                    <div class="text-center m-t-20x">
                                        <a href="javascript:void(0);" id="card-addAddress-cancel"
                                           class="btn btn-baseSize font-size-llx btn-primary bigNoodle m-r-20x">Cancel</a>
                                        <a href="javascript:void(0);" id="btn-addNewCard" class="btn btn-baseSize font-size-llx btn-green bigNoodle">Save</a>
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
                </div>
            </div>
        </div>
    </div>
</section>

<!-- loading -->
<div class="loading loading-screen loading-switch loading-hidden" id="checkoutLoading">
    <div class="loader loader-screen"></div>
</div>

<!-- 删除地址 确认框 -->
<div class="remodal modal-content remodal-md p-a-0" data-remodal-id="paymentmodal-modal" data-cardid="">
    <div class="avenirMedium text-center font-size-md p-a-15x">Remove Items from Your Payment?</div>
    <hr class="hr-common m-a-0">
    <div class="text-center dialog-info">Are you sure you want to remove this item?</div>
    <hr class="hr-common m-a-0">
    <div class="row">
        <div class="col-md-6">
            <div class="m-y-20x m-l-20x"><a href="javascript:;" class="btn btn-block btn-secondary btn-lg delPaymentCard">Remove</a></div>
        </div>
        <div class="col-md-6">
            <div class="m-y-20x m-r-20x"><a href="javascript:;" class="btn btn-block btn-primary btn-lg" data-remodal-action="close">Cancel</a>
            </div>
        </div>
    </div>
</div>

<!-- card 模板 -->
<template id="tpl-creditCard">
    @{{ each list }}
    @{{ if $value.pay_method === 'Worldpay' }}
    @{{ each $value.creditCards }}
    <div class="col-md-6" data-paymentcardid="@{{ $value.card_id }}">
        <div class="p-a-10x">
            <div class="choose-item p-a-20x"
                 data-cardtype="@{{ $value.card_type }}" data-cardnum="@{{ $value.card_number }}"
                 data-cardid="@{{ $value.card_id }}" data-paytype="@{{ $value.pay_type }}">
                <div class="flex flex-alignCenter">
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

                    <span class="avenirMedium billingTxt font-size-lg">@{{ $value.card_number }}</span>
                </div>
                <div class="m-t-10x flex">
                    <span class="payLeft-minW">Exp:@{{ $value.month }}/@{{ $value.year }}</span>
                    <span class="billingTxt">@{{ $value.detail_address1 }} @{{ $value.detail_address2 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }}</span>
                </div>
                <div class="btn-deleteCard btn-edit font-size-md hover-green" data-cardid="@{{ $value.card_id }}">Delete</div>
            </div>
        </div>
    </div>
    @{{ /each }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard">

                <img src="{{config('runtime.Image_URL')}}/images/payment/card-four.png" width="60">
                <span class="font-size-lg p-l-20x">Add New Credit Card</span>
                <i class="iconfont icon-add"></i>
            </div>
        </div>
    </div>

    @{{ else if $value.pay_method === 'PayPalNative' }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="choose-item flex flex-alignCenter p-x-20x"
                 data-cardtype="paypal" data-cardnum="PayPal" data-cardid="PayPal"
                 data-paytype="@{{ $value.pay_type }}">
                <img src="{{config('runtime.Image_URL')}}/images/payment/paypal-color@3x.png" width="60">
                <span class="font-size-lg p-l-40x">@{{$value.pay_name}}</span>
            </div>
        </div>
    </div>

    @{{ else if $value.pay_method === 'Oceanpay' }}
    @{{ each $value.creditCards }}
    <div class="col-md-6" data-paymentcardid="@{{ $value.card_id }}">
        <div class="p-a-10x">
            <div class="choose-item p-a-20x"
                 data-cardtype="@{{ $value.card_type }}" data-cardnum="@{{ $value.card_number }}"
                 data-cardid="@{{ $value.card_id }}" data-paytype="@{{ $value.pay_type }}">
                <div class="flex flex-alignCenter">
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

                    <span class="avenirMedium font-size-md">@{{ $value.card_number }}</span>
                </div>
                <div class="m-t-10x flex">
                    <span class="payLeft-minW">Exp:@{{ $value.month }}/@{{ $value.year }}</span>
                    <span class="billingTxt">@{{ $value.detail_address1 }} @{{ $value.detail_address2 }} @{{ $value.city }} @{{ $value.state }} @{{ $value.country }}</span>
                </div>
                <div class="btn-deleteCard btn-edit font-size-md hover-green" data-cardid="@{{ $value.card_id }}">Delete</div>
            </div>
        </div>
    </div>
    @{{ /each }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="choose-item flex flex-alignCenter flex-fullJustified p-x-20x addCreditCard">
                <img src="{{config('runtime.Image_URL')}}/images/payment/card-four.png" width="60">
                <span class="font-size-lg p-l-20x">Add New Credit Card</span>
                <i class="iconfont icon-add"></i>
            </div>
        </div>
    </div>

    @{{ /if }}

    @{{ /each }}
</template>

@include('footer')