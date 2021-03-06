@include('header')

        <!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container" id="addressView" data-status="true">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Shipping Address'])
            <div class="right">
                <div class="rightContent">
                    <div class="bigNoodle text-center leftMeun-title">shipping address</div>
                    <hr class="hr-black m-t-0">
                    <!-- Address -->
                    <div class="bg-white mH">
                        <div class="address-content">
                            <!-- 添加地址 -->
                            {{--Shipping Address--}}
                            {{--Address 注入服务--}}
                            @inject('Address', 'App\Http\Controllers\AddressController')
                            {{--*/ $address = $Address->index() /*--}}
                            <div class="p-a-20x add-address @if(!empty($address['data']['list'])) disabled @endif">
                                <div class="inline">
                                    <span class="font-size-md avenirMedium address-text"></span>
                                    <span class="font-size-md pull-right">
                                        <i class="isDefault iconfont icon-checkcircle hover-blue font-size-lg @if(empty($address['data']['list'])){{'active disabled check_opacity'}}@endif"></i>
                                        <span class="p-l-5x uppercase avenirMedium">Default</span>
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
                                                       class="form-control contrlo-lg text-primary address-addr1"
                                                       placeholder="Street 1">
                                                <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                    <span class="font-size-base">Please enter your street !</span>
                                                </div>
                                            </div>
                                            <div class="p-l-20x m-b-20x">
                                                <input type="text" name="addr2" class="form-control contrlo-lg text-primary address-addr2"
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
                                <div class="text-center m-t-20x">
                                    <div id="addAddress-cancel" class="btn btn-baseSize font-size-llx btn-primary bigNoodle m-r-20x">Cancel</div>
                                    <div id="addAddress" class="btn btn-baseSize font-size-llx btn-green bigNoodle address-save">Save</div>
                                </div>
                            </div>

                            <!-- 选择地址 -->
                            {{--Shipping Address--}}
                            <div class="p-a-20x select-address @if(empty($address['data']['list'])) disabled @endif">
                                {{--<div class="flex flex-fullJustified">--}}
                                    {{--<span class="font-size-md avenirMedium">Shipping Address</span>--}}
                                    <div class="text-right p-r-20x">
                                        <a class="btn font-size-lx p-x-10x btn-secondary bigNoodle uppercase btn-addNewAddress">+ Add New Address</a>
                                    </div>
                                {{--</div>--}}
                                <div class="row p-x-10x p-t-20x address-list" id="addressList-info">
                                    @foreach($address['data']['list'] as $value)
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="address-item choose-item p-x-20x p-y-15x @if($value['isDefault']){{'active'}}@endif"
                                                 data-aid="{{$value['receiving_id']}}">
                                                <div class="address-info">
                                                    {{$value['name']}}<br>
                                                    {{$value['zip']}}<br>
                                                    {{$value['city']}}, {{$value['state']}}<br>
                                                    {{$value['country']}}
                                                </div>
                                                <div class="bg-address"></div>
                                                @if($value['isDefault'])
                                                    <div class="primary-address font-size-md">Primary</div>
                                                @endif
                                                <div class="btn-edit font-size-md btn-editAddress hover-blue">Edit</div>
                                                @if(!$value['isDefault'])
                                                    <div class="font-size-md btn-delAddress hover-blue">Delete</div>
                                                @endif
                                                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
                                {{--<div class="text-right p-t-10x"><a href="javascript:void(0)" class="btn btn-primary btn-lg btn-200">Continue</a></div>--}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 删除地址 确认框 -->
<div class="remodal remodal-md p-a-40x" data-remodal-id="addressmodal-modal" data-addressid="">
    <div class="bigNoodle text-center font-size-lllx uppercase">Remove Items from Your Address?</div>
    <div class="text-center p-t-20x p-b-40x m-b-10x font-size-sm">Are you sure you want to remove this item?</div>
    <div class="row">
        <div class="col-md-6">
            <div class="btn btn-secondary btn-baseSize bigNoodle font-size-llx delAddress">Remove</div>
        </div>
        <div class="col-md-6">
            <div class="btn btn-primary btn-baseSize bigNoodle font-size-llx" data-remodal-action="close">Cancel</div>
        </div>
    </div>
</div>

<template id="tpl-address">
    @{{ each list }}
    <div class="col-md-6">
        <div class="p-a-10x">
            <div class="address-item choose-item p-x-20x p-y-15x @{{ if $value.isDefault == 1 }} active @{{ /if }}"
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
                <div class="btn-edit font-size-md btn-editAddress hover-blue">Edit</div>
                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                @{{ if $value.isDefault !== 1 }}
                <div class="font-size-md btn-delAddress hover-blue">Delete</div>
                @{{ /if }}
            </div>
        </div>
    </div>
    @{{ /each }}
</template>

@include('footer')