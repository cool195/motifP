
@include('header', ['title' => 'Following'])
<!-- 内容 -->
<section class="body-container m-y-30x" id="designerUser" data-show="true">
    <div class="container">
        <div class="myHome-content">
            <!-- 左侧菜单 -->
            @include('user.left', ['title' => 'following'])

            <!-- 右侧内容 -->
            <div class="right">
                <div class="rightContent" id="followList-container" data-pagenum="1" data-loading="false">
                    <div class="bigNoodle text-center leftMeun-title">FOLLOWING</div>
                    <hr class="hr-black m-t-0">
                    @if(empty($data['list']))
                            <!--following为空时显示-->
                    <div class="text-center p-x-30x p-b-30x empty-marginTop">
                        <i class="iconfont icon-error icon-fontSize-big"></i>
                        <p class="bigNoodle font-size-llxx m-t-40x uppercase">Your following list is empty!</p>
                    </div>
                    @endif

                    <!-- Following List -->
                    <div class="row">
                        @if(!empty($data['list']))
                            @foreach($data['list'] as $key => $follow)
                                <div class="col-lg-6 col-md-12">
                                    <div class="follow-item text-center p-a-40x">
                                        <div class="m-b-10x">
                                            <a href="/designer/{{$follow['userId']}}">
                                                <img class="img-circle img-lazy"
                                                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                     data-original="{{config('runtime.CDN_URL')}}/n1/{{$follow['avatar']}}"
                                                     width="120" height="120" alt="">
                                            </a>
                                        </div>
                                        <div class="font-size-lx bigNoodle">{{ $follow['nickname'] }}</div>
                                        <div class="p-t-15x">
                                            <div class="btn btn-gray bigNoodle font-size-lxx p-x-20x btn-follow active"
                                               data-did="{{$follow['userId']}}">Following</div>
                                        </div>
                                        <div class="m-t-15x followText-Info" data-designerid="{{$follow['userId']}}">{{ $follow['description'] }}</div>
                                    </div>
                                </div>
                            @endforeach
                        @endif
                    </div>

                    @if(!empty($data['list']) && count($data['list']) == 8)
                        <!-- see more btn -->
                        <div class="text-center m-y-30x seeMore-info">
                            <div class="followList-seeMore" style="display: none;">
                                <a class="btn btn-gray btn-lg btn-380 btn-seeMore-follow" href="javascript:void(0)">VIEW MORE</a>
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
        <div class="follow-item text-center p-a-40x">
            <div class="m-b-10x">
                <a href="/designer/@{{ $value.userId }}">
                    <img class="img-circle img-lazy"
                         src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                         data-original="{{config('runtime.CDN_URL')}}/n1/@{{ $value.avatar }}"
                         width="120" height="120" alt="">
                </a>
            </div>
            <div class="font-size-lx bigNoodle">@{{ $value.name }}</div>
            <div class="p-t-15x">
                <div class="btn btn-gray bigNoodle font-size-llx p-x-20x btn-follow active" data-did="@{{ $value.userId }}">Following</div>
            </div>
            <div class="m-t-15x followText-Info" data-designerid="@{{ value.userId }}">@{{ $value.description }}</div>
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
