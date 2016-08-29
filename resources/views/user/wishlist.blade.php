@include('header')
        <!-- 内容 -->
<section class="m-y-30x">
    <div class="container">
        <div class="myHome-content">
            <!-- 左侧菜单 -->
            @include('user.left', ['title' => 'wishlist'])
            <!-- 左侧内容 -->

            <div class="right">
                @if(empty($data['list']))
                    <!--wishlist为空时显示-->
                    <div class="rightContent">
                        <div class="empty-content">
                            <i class="iconfont icon-like"></i>
                            <p class="helveBold font-size-llxx m-t-40x">Your wishlist is empty!</p>
                        </div>
                    </div>
                @endif
                <div class="rightContent" id="wishList-container" data-pagenum="1" data-loading="false">
                    <!-- WishList content -->
                    <ul class="tiles-wrap wishlist-wrap animated row" id="wishlist-wookmark">
                        <!-- 商品 -->
                        @if(!empty($data['list']))
                            @foreach($data['list'] as $wish)
                                <li>
                                    <div class="wishlist-item daily-item">
                                        <a href="/product/{{$wish['spu']}}">
                                            <img src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{ $wish['main_image_url'] }}" alt="{{ $wish['main_title'] }}" class="img-fluid img-lazy">
                                        </a>
                                        <span class="wishlist-heart btn-heart">
                                            <i class="iconfont btn-wish font-size-lxx active" data-spu="{{$wish['spu']}}"></i></span>
                                        <div class="daily-info p-a-10x helveBold text-center">
                                            <div class="font-size-md text-main p-x-20x">{{$wish['main_title']}}</div>
                                            <div>
                                                <span class="font-size-md text-main p-r-5x">${{ number_format(($wish['skuPrice']['sale_price'] / 100), 2) }}</span>
                                                @if($wish['skuPrice']['sale_price'] !== $wish['skuPrice']['price'])
                                                    <span class="font-size-base text-common text-throughLine">${{ number_format(($wish['skuPrice']['price'] / 100), 2) }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        @endif
                    </ul>
                    @if(!empty($data['list']))
                        <div class="text-center m-y-30x  wishList-seeMore">
                            <a class="btn btn-gray btn-lg btn-380 btn-seeMore-wishList" href="javascript:void(0)">See more of all</a>
                        </div>
                    @endif
                    <div class="loading wish-loading" style="display: none">
                        <div class="loader"></div>
                        <div class="text-center p-t-10x">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<template id="tpl-wish">
    @{{ each list }}
    <li>
        <div class="wishlist-item daily-item">
            <a href="/product/@{{ $value.spu }}">
                <img src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                     data-original="{{config('runtime.CDN_URL')}}/n1/@{{ $value.main_image_url }}" alt="@{{ $value.main_title }}" class="img-fluid img-lazy">
            </a>
            <span class="wishlist-heart btn-heart">
                <i class="iconfont btn-wish font-size-lxx active" data-spu="@{{ $value.spu }}"></i></span>
            <div class="daily-info p-a-10x helveBold text-center">
                <div class="font-size-md text-main p-x-20x">@{{ $value.main_title }}</div>
                <div>
                    <span class="font-size-md text-main p-r-5x">@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                    @{{ if $value.skuPrice.sale_price !== $value.skuPrice.price }}
                        <span class="font-size-base text-common text-throughLine">@{{ ($value.skuPrice.price/100).toFixed(2) }}</span>
                    @{{ /if }}
                </div>
            </div>
        </div>
    </li>
    @{{ /each }}
</template>

@include('footer')