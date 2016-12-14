
@include('header', ['title' => 'Designer', 'page' => 'designer'])
{{--内容--}}
<section class="m-t-40x" id="designerIndex" data-show="true">
    {{--设计师列表--}}
    <div id="designerContainer" class="container m-b-40x" data-start="{{$start}}" data-loading="false">
        <!--网红大图-->
        @foreach($list as $key => $designer)
        <div class="row">
            <img class="img-fluid img-lazy" src="https://s3-us-west-1.amazonaws.com/emimagetest/n0/topic/motif/6420/1280X500/092063a2b74df574b650f059ecdbcc41.jpg">
            <!--设计师小图-->
            <ul class="designer-wrap">
                <li class="designer-item m-y-15x">
                    <a data-impr='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                       data-clk='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=designer.200001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":2,"skipId":"{{$designer['designerId']}}","expid":0,"version":"1.0.1","src":"PC"}'
                       href="/designer/{{ $designer['designerId'] }}">
                        <img class="img-fluid product-bigImg img-lazy" src="{{config('runtime.CDN_URL')}}/n2/{{$designer['listImg']}}">
                    </a>
                </li>
            </ul>
        </div>
        @endforeach
    </div>

    <div class="text-center m-y-30x seeMore-info">
        <div class="designerList-seeMore" style="display: none;">
            <a class="btn btn-gray btn-lg btn-380" href="javascript:void(0)">VIEW MORE</a>
        </div>
        <div class="loading designer-loading" style="display: none">
            <div class="loader"></div>
            <div class="text-center p-l-15x">Loading...</div>
        </div>
    </div>

</section>

<!-- designer list 模版 -->
<template id="tpl-designerList-even">

</template>

<template id="tpl-designerList-odd">

</template>

@include('footer')