@include('header', ['title' => 'shopping', 'cid' =>$cid])
<!-- 内容 -->
<section class="m-t-5x">
    <!-- 商品类别 二级导航 -->
    <div class="bg-white product-category">
        <div class="container">
            <nav class="nav navbar-nav">
                <ul class="nav flex flex-alignCenter flex-justifyCenter">
                    @foreach($categories as $category)
                    <li class="nav-item p-x-10x m-l-0">
                        <a href="/shopping/{{ $category['category_id'] }}">
                            <div class="p-t-10x p-b-5x category-item @if($cid == $category['category_id']) active @endif">
                                <img src="{{config('runtime.CDN_URL')}}/n0/{{$category['img_path']}}" alt="">
                                <div class="text-center p-t-5x">{{$category['category_name']}}</div>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>

    <!-- 商品列表 -->
    <div class="container m-t-30x m-b-40x" id="productList-container" data-categoryid="{{$cid}}" data-pagenum="1" data-loading="false">
        <div class="row">
            @foreach($productAll['list'] as $product)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a href="javascript:void(0)" data-link="/product/{{$product['spu']}}" data-impr="{{$product['impr']}}" data-clk="{{$product['clk']}}">
                            <img class="img-fluid img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['main_image_url']}}" alt="商品的名称">
                            <div class="bg-heart"></div>
                        </a>
                        @if(Session::has('user'))
                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx @if($product['isWished']) active @endif" data-spu="{{$product['spu']}}"></i></span>
                        @else
                            <a class="product-heart btn-heart" href="javascript:void(0)"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$product['spu']}}"></i></a>
                        @endif

                        @if(1 == $product['sale_type'])
                            <!--预售标志-->
                            <div class="presale-sign">
                                <div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>
                                <div class="presale-text helve font-size-sm">LIMITED DEITION</div>
                            </div>
                        @endif
                    </div>
                    <div class="price-caption helveBold">
                        <div class="text-center font-size-md text-main text-truncate p-x-20x">{{$product['main_title']}}</div>
                        <div class="text-center">
                            @if(isset($product['skuPrice']['skuPromotion']))
                                <span class="font-size-md text-main p-r-5x text-red">${{ number_format(($product['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                                <span class="font-size-base text-common text-throughLine">${{ number_format(($product['skuPrice']['skuPromotion']['price'] / 100), 2) }}</span>
                            @else
                                <span class="font-size-md text-main p-r-5x">${{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="text-center m-y-30x seeMore-info">
            <div class="productList-seeMore" style="display: none">
                <div class="btn btn-gray btn-lg btn-380 btn-seeMore">See more of all</div>
            </div>
            <div class="loading product-loading" style="display: none">
                <div class="loader">
                </div>
                <div class="text-center p-l-15x">Loading more...</div>
            </div>
        </div>
    </div>
</section>

<template id="tpl-product">
    @{{ each list }}
<div class="col-md-3 col-xs-6">
    <div class="productList-item">
        <div class="image-container">
            <a href="javascript:void(0)" data-link="/product/@{{ $value.spu }}" data-impr="@{{ $value.impr }}" data-clk="@{{ $value.clk }}">
                <img class="img-fluid img-lazy" data-original="https://s3-us-west-1.amazonaws.com/emimagetest/n1/@{{ $value.main_image_url }}"
                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="@{{ $value.main_title }}" alt="@{{ $value.main_title }}">
                <div class="bg-heart"></div>
            </a>
            @if(Session::has('user'))
                <span class="product-heart btn-heart"><i class="iconfont btn-wish btn-wishList font-size-lxx @{{ if $value.isWished }} active @{{ /if }}" data-spu="@{{ $value.spu }}"></i></span>
            @else
                <a class="product-heart btn-heart" href="javascript:void(0)"><i class="iconfont font-size-lxx btn-wish" data-actionspu="@{{ $value.spu }}"></i></a>
            @endif
            @{{ if 1 == $value.sale_type }}
                <!--预售标志-->
                <div class="presale-sign">
                    <div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>
                    <div class="presale-text helve font-size-sm">LIMITED DEITION</div>
                </div>
            @{{ /if }}
        </div>
        <div class="price-caption helveBold">
            <div class="text-center font-size-md text-main text-truncate p-x-20x">@{{ $value.main_title }}</div>
            <div class="text-center">
                @{{ if $value.skuPrice.sale_price !== $value.skuPrice.price }}
                    <span class="font-size-md text-main p-r-5x text-red">$@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                    <span class="font-size-base text-common text-throughLine">$@{{ ($value.skuPrice.skuPromotion.price/100).toFixed(2) }}</span>
                @{{ else }}
                    <span class="font-size-md text-main p-r-5x">$@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                @{{ /if }}
            </div>
        </div>
    </div>
</div>
    @{{ /each }}
</template>

@include('footer')
