
@include('header')
<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            <!-- 左侧菜单 -->
            @include('user.left')

            <!-- 右侧内容 -->
            <div class="right">
                <div class="rightContent">
                    <!-- Following List -->
                    <div class="row">
                        @if(!empty($data['list']))
                            @foreach($data['list'] as $key => $follow)
                        <div class="col-md-6 col-xs-12">
                            <div class="text-center box-shadow p-a-40x m-b-20x @if($key % 4 == 0 || $key % 4 == 3) bg-white @else bg-common @endif">
                                <div class="m-b-10x">
                                    <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/{{$follow['avatar']}}" width="120" height="120" alt="">
                                </div>
                                <div class="font-size-md helveBold">{{ $follow['name'] }}</div>
                                <div class="p-t-15x">
                                    <a href="javascrip:void(0);" class="btn btn-gray btn-sm p-x-20x btn-follow active" data-did="{{$follow['userId']}}">Follow</a>
                                </div>
                                <div class="p-t-15x">{{ $follow['description'] }}</div>
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

                    <!-- see more btn -->
                    <div class="text-center m-y-30x">
                        <a class="btn btn-block btn-gray btn-lg btn-380 btn-seeMore" href="#">See more of all</a>
                    </div>
                    <div class="loading" style="display: block">
                        <div class="loader">
                        </div>
                        <div class="text-center p-t-10x">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')
