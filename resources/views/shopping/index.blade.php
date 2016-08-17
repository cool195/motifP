@include('header')
<!-- 内容 -->
<section class="m-t-30x">
    <!-- 商品类别 二级导航 -->
    <div class="bg-white product-category">
        <div class="container">
            <nav class="nav navbar-nav">
                <ul class="nav flex flex-alignCenter flex-justifyCenter">
                    @foreach($categories as $category)
                    <li class="nav-item p-x-20x m-l-0">
                        <a href="#">
                            <div class="p-x-5x p-t-30x p-b-20x category-item @if("All" == $category['category_name']) active @endif">
                                <img src="{{config('runtime.CDN_URL')}}/n0/{{$category['img_path2']}}" alt="">
                                <div class="text-center p-t-10x">{{$category['category_name']}}</div>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>

    <!-- 商品列表 -->
    <div class="container m-t-30x m-b-40x" id="productList-container" data-categoryid="0" data-pagenum="1" data-loading="false">
        <div class="row">
            @foreach($productAll['list'] as $product)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a href="/product/{{$product['spu']}}">
                            <img class="img-fluid img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" data-original="{{config('runtime.CDN_URL')}}/n0/{{$product['main_image_url']}}" alt="商品的名称">
                            <div class="bg-heart"></div>
                        </a>
                        <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"></i></span>
                    </div>
                    <div class="price-caption helveBold">
                        <div class="text-center font-size-md text-primary text-truncate p-x-20x">{{$product['main_title']}}</div>
                        <div class="text-center">
                            @if(isset($product['skuPrice']['skuPromotion']))
                                <span class="font-size-md text-primary p-r-5x">${{ number_format(($product['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                                <span class="font-size-base text-common text-throughLine">${{ number_format(($product['skuPrice']['skuPromotion']['price'] / 100), 2) }}</span>
                            @else
                                <span class="font-size-md text-primary p-r-5x">${{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="text-center m-y-30x productList-seeMore">
            <div class="btn btn-block btn-gray btn-lg btn-380 btn-seeMore">See more of all</div>
        </div>
        <div class="loading product-loading" style="display: none">
            <div class="loader">
            </div>
            <div class="text-center p-t-5x p-l-10x">Loading...</div>
        </div>
    </div>
</section>

<template id="tpl-product">
    @{{ each list }}
<div class="col-md-3 col-xs-6">
    <div class="productList-item">
        <div class="image-container">
            <a href="/detail/@{{ $value.spu }}" data-impr="@{{ $value.impr }}" data-clk="@{{ $value.clk }}">
                <img class="img-fluid img-lazy" data-original="https://s3-us-west-1.amazonaws.com/emimagetest/n1/@{{ $value.main_image_url }}"
                     src="/images/product/bg-product@336.png" alt="@{{ $value.main_title }}" alt="@{{ $value.main_title }}">
                <div class="bg-heart"></div>
            </a>
            <span class="product-heart btn-heart"><i class="iconfont font-size-lxx btn-wish"></i></span>
        </div>
        <div class="price-caption helveBold">
            <div class="text-center font-size-md text-primary text-truncate p-x-20x">@{{ $value.main_title }}</div>
            <div class="text-center">
                    <span class="font-size-md text-primary p-r-5x">$@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                @{{ if $value.skuPrice.sale_price !== $value.skuPrice.price }}
                    <span class="font-size-base text-common text-throughLine">$@{{ ($value.skuPrice.skuPromotion.price/100).toFixed(2) }}</span>
                @{{ /if }}
            </div>
        </div>
    </div>
</div>
    @{{ /each }}
</template>

@include('footer')
