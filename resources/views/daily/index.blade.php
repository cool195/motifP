@include('header')

        <!-- banner -->
<section>
    <div class="bannerSwiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background-image:url(/resources/assets/dist/images/banner/banner1.jpg)"></div>
            <div class="swiper-slide" style="background-image:url(/resources/assets/dist/images/banner/banner1.jpg)"></div>
            <div class="swiper-slide" style="background-image:url(/resources/assets/dist/images/banner/banner1.jpg)"></div>
        </div>
        <div class="container banner-container">
            <div class="swiper-button-next">
                <i class="iconfont icon-arrow-right text-white"></i>
            </div>
            <div class="swiper-button-prev">
                <i class="iconfont icon-arrow-left text-white"></i>
            </div>
        </div>
    </div>
</section>
<div class="clearfix"></div>

<!-- 内容 -->
<div class="container m-b-40x" role="main">
    @if(!empty($list))
        <ul class="tiles-wrap animated row" id="wookmark1">
            <!-- 图片 -->
            <li>
                <div class="daily-item">
                    <a href="#">
                        <img src="{{config('runtime.Image_URL')}}/images/daily/daily.jpg" class="img-fluid img-daily">
                    </a>
                </div>
            </li>

            <!-- 图 & 文 -->
            <li>
                <div class="daily-item">
                    <img src="{{config('runtime.Image_URL')}}/images/daily/daily1.jpg" class="img-fluid img-daily">
                    <div class="daily-info p-a-10x text-left">
                        <div>
                            <h6 class="text-main helveBold font-size-md m-b-5x">Boho Beaded Tassel Necklace</h6>
                            <p class="text-primary m-b-0">Boasting a spectacular display of color, the titanium</p>
                        </div>
                    </div>
                </div>
            </li>
            @foreach($list as $daily)
            <!-- 图 & 文 & 设计师 -->
            <li>
                <div class="daily-item">
                    <img src="{{config('runtime.CDN_URL')}}/n0/{{$daily['imgPath']}}" class="img-fluid img-daily">
                    <div class="daily-info p-a-10x text-left">
                        @if(!empty($daily['title'] || !empty($daily['subTitle'])))
                        <div>
                            <h6 class="text-main helveBold font-size-md m-b-5x">{{$daily['title']}}</h6>
                            <p class="text-primary m-b-0">{{ $daily['subTitle'] }}</p>
                        </div>
                        <hr class="hr-base m-y-10x">
                        @endif
{{--                        <div class="flex flex-fullJustified flex-alignCenter">
                            <div class="flex flex-alignCenter">
                                <img src="{{config('runtime.Image_URL')}}/images/daily/daily.jpg" class="img-circle" width="30" height="30">
                                <span class="p-l-15x">
                                    <h6 class="text-main font-size-sm helveBold">Street Art</h6>
                                    <a class="text-primary font-size-sm" href="#">facebook.com</a>
                                </span>
                            </div>
                            <i class="iconfont icon-follow font-size-lx"></i>
                        </div>--}}
                    </div>
                </div>
            </li>
            @endforeach
        </ul>
    @endif
        <div class="text-center m-y-30x">
            <a class="btn btn-block btn-gray btn-lg btn-seeMore" href="#">See more ofall</a>
        </div>
        <div class="loading" style="display: block">
            <div class="loader"></div>
            <div class="text-center p-t-10x">Loading...</div>
        </div>
</div>

@include('footer')

