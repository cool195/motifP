<!-- 头部 -->
@include('header')

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container">
        <h4 class="helveBold text-main p-l-10x">Checkout</h4>

        <!-- Checkout Product Item -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="sanBold font-size-md p-x-20x p-y-15x">Items</div>
            <hr class="hr-base m-a-0">
            <div class="p-a-20x">
                @foreach($accountList['showSkus'] as $showSku)
                    <div class="checkout-Item">
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
                                        <div class="text-center">X{{$showSku['sale_qtty']}}</div>
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
                                        <div class="row flex flex-alignCenter">
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
                                                <div class="text-center">X{{ $showSku['sale_qtty']  }}</div>
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
                    <hr class="hr-base">
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
                <span class="sanBold">Shipping Address</span>
                <span class="pull-right showHide-simpleInfo">
                    @forelse ($address['data']['list'] as $value)
                        @if($value['isDefault'])
                            <span id="defaultAddr" data-city="{{$value['detail_address1']}}"
                                  data-aid="{{$value['receiving_id']}}">{{$value['country']}} {{$value['city']}} {{$value['detail_address1']}} {{$value['zip']}} {{$value['name']}}</span>
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
                @if(!empty($address['data']['list']))
                    {{--选择地址--}}
                    <div class="p-a-20x select-address">
                        <div class="flex flex-alignCenter flex-fullJustified">
                            <span class="font-size-md">Selecy Shipping Address</span>
                                <span class="font-size-md pull-right">
                                    <a class="btn btn-secondary btn-md" href="#"><i
                                                class="iconfont icon-add font-size-md p-r-5x"></i>Add NewAddress</a>
                                </span>
                        </div>
                        <div class="row p-x-10x p-t-20x">
                            @foreach($address['data']['list'] as $value)
                                <div class="col-md-6">
                                    <div class="p-a-10x">
                                        <div class="address-item p-x-20x p-y-15x @if($value['isDefault']){{'active'}}@endif"
                                             data-info="{{$value['country']}} {{$value['city']}} {{$value['detail_address1']}} {{$value['zip']}} {{$value['name']}}"
                                             data-city="{{$value['detail_address1']}}"
                                             data-aid="{{$value['receiving_id']}}">
                                            <div class="address-info">
                                                {{$value['name']}}<br>
                                                {{$value['zip']}}<br>
                                                {{$value['city']}}<br>
                                                {{$value['country']}}
                                            </div>
                                            <div class="bg-address"></div>
                                            @if($value['isDefault'])
                                                <div class="primary-address font-size-md">Primary</div>
                                            @endif
                                            <div class="btn-edit font-size-md">Edit</div>
                                            <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div class="text-right p-t-10x"><a href="javascript:;"
                                                           class="btn btn-primary btn-md"
                                                           id="btnAddrShowHide">Continue</a></div>
                    </div>
                @else
                    {{--添加地址--}}
                    <div class="p-a-20x add-address">
                        <div class="inline">
                            <span class="font-size-md">Add Shipping Address</span>
                        <span class="font-size-md pull-right">
                            <i class="iconfont icon-checkcircle text-primary font-size-lg @if(empty($address['data']['list'])){{'active'}}@endif"></i>
                            <a class="p-l-10x" href="javascript:;">Make Primary</a></span>
                        </div>
                        <div class="row p-t-30x">
                            <form id="addAddressForm">
                                <div class="col-md-5">
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="email" class="form-control contrlo-lg text-primary"
                                               placeholder="Email" value="{{Session::get('user.login_email')}}">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter a valid email address !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="name" class="form-control contrlo-lg text-primary"
                                               placeholder="Full name">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your name !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="city" class="form-control contrlo-lg text-primary"
                                               placeholder="City">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your city !</span>
                                        </div>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="state" class="form-control contrlo-lg text-primary"
                                               placeholder="State (optional)">
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="tel" class="form-control contrlo-lg text-primary"
                                               placeholder="Phone">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your Phone !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="addr1" class="form-control contrlo-lg text-primary"
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
                                    <div class="p-l-20x m-b-20x">
                                        <select name="country" class="form-control contrlo-lg select-country">
                                            @foreach($Address->getCountry() as $value)
                                                <option value="{{$value['country_id']}}">{{$value['country_name_en']}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="p-l-20x m-b-20x">
                                        <input type="text" name="zip" id="zip"
                                               class="form-control contrlo-lg text-primary"
                                               placeholder="Zip Code">
                                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your zip code !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1"></div>
                            </form>
                        </div>
                        <div class="text-right"><a href="javascript:;" id="addAddress"
                                                   class="btn btn-primary btn-md">Save</a></div>
                    </div>
                @endif
            </div>
        </div>

        {{--Shipping Method--}}
        <div class="box-shadow bg-white m-t-20x">
            <div class="font-size-md p-x-20x p-y-15x btn-showHide" id="smShowHide">
                <span class="sanBold">Shipping Method</span>
                <span class="pull-right showHide-simpleInfo">
                    <span class="shippingMethodShow">{{$logisticsList['list'][0]['logistics_name']}}</span>
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <hr class="hr-common m-a-0">
            <div class="showHide-body method-content">
                <!-- 选择 物流方式 -->
                <div class="p-a-20x">
                    <div class="row p-x-20x p-t-20x">
                        @foreach($logisticsList['list'] as $k=>$list)
                            <div class="col-md-6 p-b-10x">
                                <input type="radio" @if($k==0){{'checked'}}@endif name="shippingMethod" data-price="{{$list['price']}}"
                                       value="{{$list['logistics_type']}}" data-show="{{ $list['logistics_name'] }}">
                                <label for="" class="p-l-10x">{{ $list['logistics_name'] }}
                                    +${{ number_format(($list['price'] / 100), 2) }}</label>
                            </div>
                        @endforeach
                    </div>
                    <div class="text-right"><a href="javascript:;" id="smsubmit" class="btn btn-primary btn-md">Continue</a></div>
                </div>
            </div>
        </div>

        <!-- Promotion Code -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="p-x-20x p-y-15x flex flex-alignCenter flex-fullJustified">
                <div class="font-size-md btn-showHide">
                    <span class="sanBold">Promotion Code</span>
                </div>
                <div class="showHide-body flex flex-alignCenter pull-right">
                    <div><input type="text" name="ccps"
                                class="form-control contrlo-lg text-primary input-promotion disabled"></div>
                    <div class="p-l-20x"><a href="javascript:;" id="pcsubmit" class="btn btn-primary btn-md">Continue</a></div>
                </div>
                <span class="pull-right showHide-simpleInfo promotion-info">
                    <span id="pcode"></span>
                    <a class="p-l-40x font-size-md ">Edit</a>
                </span>
            </div>
        </div>

        <!-- Special Request (optional) -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="p-x-20x p-y-15x font-size-md btn-showHide">
                <span class="sanBold">Special Request (optional)</span>
                <span class="pull-right showHide-simpleInfo">
                    <span id="srmessage"></span>
                    <a class="p-l-40x">Edit</a>
                </span>
            </div>
            <div class="showHide-body p-x-20x p-b-20x">
                <div class="p-x-20x p-b-20x">
                    <textarea name="cremark" class="form-control disabled" cols="30" rows="4"></textarea>
                </div>
                <div class="text-right"><a href="#" class="btn btn-primary btn-md">Save</a></div>
            </div>
        </div>

        <!-- 购物袋总价 -->
        <div class="box-shadow bg-white m-t-20x">
            <div class="p-a-20x font-size-md">
                <div class="text-right"><span>Items(3):</span><span
                            class="sanBold cart-price">${{number_format(($accountList['total_amount'] / 100), 2)}}</span>
                </div>
                @if($accountList['vas_amount'] !=0)
                    <div class="text-right"><span>Additional Services:</span><span
                                class="sanBold cart-price">${{ number_format(($accountList['vas_amount'] / 100), 2) }}</span>
                    </div>
                @endif

                <div class="text-right shopping-methodPrice hidden">
                    <span class="shipMto"></span>
                    <span class="sanBold cart-price shipMtoprice"></span>
                </div>
                {{--promotion-code 添加 hidden样式--}}
                <div class="text-right promotion-code hidden">
                    <span>Promotion code:</span>
                    <span class="sanBold cart-price code-price" data-price="0"></span>
                </div>

                <div class="text-right"><span>Bag Subtotal:</span><span
                            class="sanBold cart-price totalPrice" data-price="{{$accountList['pay_amount']}}">${{ number_format(($accountList['pay_amount']) / 100, 2) }}</span>
                </div>
            </div>
        </div>
        <!-- 提交按钮 -->
        <div class="p-y-40x text-right">
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg btn-toCheckout">Proceed To Checkout</a>
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

@include('footer')
