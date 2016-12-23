@include('header', ['title' => 'Wishlist'])
        <!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container">
        <div class="myHome-content">
            <!-- 左侧菜单 -->
            @include('user.left', ['title' => 'wishlist'])
            <!-- 右侧内容 -->

            <div class="right">
                <div class="rightContent" id="wishList-container" data-pagenum="1" data-loading="false">
                    <div class="bigNoodle text-center leftMeun-title">MY WISHLIST</div>
                    <hr class="hr-black m-t-0">
                    @if(empty($data['list']))
                            <!--wishlist为空时显示-->
                        <div class="text-center p-x-30x p-b-30x empty-marginTop">
                            <i class="iconfont icon-error icon-fontSize-big"></i>
                            <p class="bigNoodle font-size-llxx m-t-40x uppercase">Your wishlist is empty!</p>
                        </div>
                    @else

                    <!-- WishList content -->
                    <ul class="tiles-wrap wishlist-wrap animated row" id="wishlist-wookmark">
                        <!-- 商品 -->
                        @foreach($data['list'] as $wish)
                            <li>
                                <div class="productList-item wishlist-item">
                                    <div class="image-container">
                                        <a href="/detail/{{$wish['spu']}}">
                                            <img src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{ $wish['main_image_url'] }}" alt="{{ $wish['main_title'] }}" class="img-fluid img-lazy">
                                            <div class="bg-heart"></div>
                                        </a>
                                        <span class="product-heart btn-heart">
                                            <i class="iconfont btn-wish font-size-lxx active" data-spu="{{$wish['spu']}}"></i>
                                        </span>
                                    </div>
                                    <div class="price-caption">
                                        <!--预售-->
                                        @if(1 == $wish['sale_type'])
                                            <div class="bigNoodle font-size-llxx text-truncate p-x-20x">
                                                <span>LIMITED EDITION</span>
                                            </div>
                                        @endif

                                        <div class="text-center font-size-md text-truncate p-x-20x">{{$wish['main_title']}}</div>
                                        <div class="text-center">
                                            @if($wish['skuPrice']['sale_price'] !== $wish['skuPrice']['price'])
                                                <span class="font-size-md p-r-5x">${{ number_format(($wish['skuPrice']['sale_price'] / 100), 2) }}</span>
                                                <span class="font-size-md text-green text-throughLine">${{ number_format(($wish['skuPrice']['price'] / 100), 2) }}</span>
                                            @else
                                                <span class="font-size-md p-r-5x">${{ number_format(($wish['skuPrice']['sale_price'] / 100), 2) }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                    <div class="text-center m-y-30x seeMore-info">
                        <div class="wishList-seeMore" style="display: none;">
                            <a class="btn btn-gray btn-380 bigNoodle font-size-lx btn-seeMore-wishList" href="javascript:void(0)">VIEW MORE</a>
                        </div>
                        <div class="loading wish-loading" style="display: none">
                            <div class="loader"></div>
                            <div class="text-center p-l-15x">Loading...</div>
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</section>

<template id="tpl-wish">
    @{{ each list }}
    <li class="isHidden">
        <div class="productList-item wishlist-item">
            <div class="image-container">
                <a href="/detail/@{{ $value.spu }}">
                    <img src="{{config('runtime.CDN_URL')}}/n1/@{{ $value.main_image_url }}" alt="@{{ $value.main_title }}" class="img-fluid">
                    <div class="bg-heart"></div>
                </a>
                <span class="product-heart btn-heart">
                    <i class="iconfont btn-wish btn-wishing font-size-lxx active" data-spu="@{{ $value.spu }}"></i>
                </span>
            </div>
            <div class="price-caption">
                <!--预售-->
                @{{ if 1 === $value.sale_type }}
                    <div class="bigNoodle font-size-llxx text-truncate p-x-20x">
                        <span>LIMITED EDITION</span>
                    </div>
                @{{ /if }}
                <div class="text-center font-size-md text-truncate p-x-20x">@{{ $value.main_title }}</div>
                <div class="text-center">
                    @{{ if $value.skuPrice.sale_price !== $value.skuPrice.price }}
                        <span class="font-size-md text-main p-r-5x">@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                        <span class="font-size-md text-green text-throughLine">@{{ ($value.skuPrice.price/100).toFixed(2) }}</span>
                    @{{ else }}
                        <span class="font-size-md text-main p-r-5x">@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                    @{{ /if }}
                </div>
            </div>
        </div>
    </li>
    @{{ /each }}
</template>

@include('footer')