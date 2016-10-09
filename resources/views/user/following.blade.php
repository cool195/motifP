
@include('header', ['title' => 'following'])
<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            <!-- 左侧菜单 -->
            @include('user.left', ['title' => 'following'])

            <!-- 右侧内容 -->
            <div class="right">
                @if(empty($data['list']))
                    <!--following为空时显示-->
                    <div class="rightContent">
                        <div class="empty-content">
                            <i class="iconfont icon-follow"></i>
                            <p class="helveBold font-size-llxx m-t-40x">Your following list is empty!</p>
                        </div>
                    </div>
                @endif
                <div class="rightContent" id="followList-container" data-pagenum="1" data-loading="false">
                    <!-- Following List -->
                    <div class="row">
                        @if(!empty($data['list']))
                            @foreach($data['list'] as $key => $follow)
                                <div class="col-lg-6 col-md-12">
                                    <div class="follow-item text-center p-a-40x m-b-20x @if($key % 4 == 0 || $key % 4 == 3) bg-white @else bg-common @endif">
                                        <div class="m-b-10x">
                                            <a href="/designer/{{$follow['userId']}}">
                                                <img class="img-circle img-lazy img-border-white-4x"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{$follow['avatar']}}"
                                                     width="120" height="120" alt="">
                                            </a>
                                        </div>
                                        <div class="font-size-md helveBold">{{ $follow['nickname'] }}</div>
                                        <div class="p-t-15x">
                                            <div class="btn btn-gray btn-sm p-x-20x btn-follow active"
                                               data-did="{{$follow['userId']}}">Following</div>
                                        </div>
                                        <div class="m-t-15x followText-Info">{{ $follow['description'] }}</div>
                                        {{--<div class="p-t-15x">
                                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-fac.png"></a>
                                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-pin.png"></a>
                                            <a href="#" class="m-r-20x"><img src="/images/icon/icon-ins.png"></a>
                                        </div>--}}
                                    </div>
                                </div>
                            @endforeach
                        @endif
                    </div>

                    @if(!empty($data['list']) && count($data['list']) == 8)
                        <!-- see more btn -->
                        <div class="text-center m-y-30x seeMore-info">
                            <div class="followList-seeMore" style="display: none;">
                                <a class="btn btn-gray btn-lg btn-380 btn-seeMore-follow" href="javascript:void(0)">See more of all</a>
                            </div>
                            <div class="loading follow-loading" style="display: none">
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

<template id="tpl-follow">
    @{{ each list }}
    <div class="col-md-6 col-xs-12">
        <div class="follow-item text-center p-a-40x m-b-20x @{{ if ($index % 4) == 0 || ($index % 4) == 3 }} bg-white @{{ else }} bg-common @{{ /if }}">
            <div class="m-b-10x">
                <a href="/designer/@{{ $value.userId }}">
                    <img class="img-circle img-lazy img-border-white-4x"
                         src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                         data-original="{{config('runtime.CDN_URL')}}/n1/@{{ $value.avatar }}"
                         width="120" height="120" alt="">
                </a>
            </div>
            <div class="font-size-md helveBold">@{{ $value.name }}</div>
            <div class="p-t-15x">
                <div class="btn btn-gray btn-sm p-x-20x btn-following active" data-did="@{{ $value.userId }}">Following</div>
            </div>
            <div class="m-t-15x followText-Info">@{{ $value.description }}</div>
            {{--<div class="p-t-15x">
                <a href="#" class="m-r-20x"><img src="/images/icon/icon-fac.png"></a>
                <a href="#" class="m-r-20x"><img src="/images/icon/icon-pin.png"></a>
                <a href="#" class="m-r-20x"><img src="/images/icon/icon-ins.png"></a>
            </div>--}}
        </div>
    </div>
    @{{ /each }}
</template>
@include('footer')
