
@include('header', ['title' => 'Designer', 'page' => 'designer'])
{{--内容--}}
<section class="body-container" id="designerIndex" data-show="true">
    {{--设计师列表--}}
    <div id="designerContainer" class="container m-b-40x" data-start="{{$start}}" data-loading="false">
        <div class="row">
        @foreach($list as $key => $designer)
                @if(2 == $designer['designer_type'])
                    <div class="col-md-12 m-b-30x designer-item">
                        <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                           data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                           href="/designer/{{ $designer['designerId'] }}">
                            <img class="img-fluid img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['pc_img_path']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="{{ $designer['name'] }}" style="max-height: 23rem">
                        </a>
                    </div>
                @else
                    <div class="col-md-4 m-b-30x designer-item">
                            <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                               data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                               href="/designer/{{ $designer['designerId'] }}">
                                <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/{{$designer['pc_img_path']}}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="{{ $designer['name'] }}">
                            </a>
                    </div>
                @endif
        @endforeach
        </div>
    </div>

    <div class="text-center m-y-30x seeMore-info">
        <div class="designerList-seeMore" style="display: none;">
            <a class="btn btn-gray btn-380 bigNoodle font-size-lx" href="javascript:void(0)">VIEW MORE</a>
        </div>
        <div class="loading designer-loading" style="display: none">
            <div class="loader"></div>
            <div class="text-center p-l-15x">Loading...</div>
        </div>
    </div>

</section>

<!-- designer list 模版 -->
<template id="tpl-designerList">
    @{{ each list as value }}
    @{{ if 2 == value.designer_type }}
        <div class="col-md-12 m-b-30x designer-item">
            <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
               data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
               href="/designer/@{{ value.designerId }}">
                <img class="img-fluid img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/@{{ value.pc_img_path }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="@{{ value.name }}" style="max-height: 23rem">
            </a>
        </div>
    @{{ else }}
        <div class="col-md-4 m-b-30x designer-item">
                <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                   data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                   href="/designer/@{{ value.designerId }}">
                    <img class="img-fluid product-bigImg img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ value.pc_img_path }}" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="@{{ value.name }}">
                </a>
        </div>
    @{{ /if }}
    @{{ /each }}
</template>

@include('footer')