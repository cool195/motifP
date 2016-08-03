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
    <div class="container m-t-30x m-b-40x">
        <div class="row">
            @foreach($productAll['list'] as $product)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a href="/product/{{$product['spu']}}">
                            <img class="img-fluid" src="{{config('runtime.CDN_URL')}}/n0/{{$product['main_image_url']}}" alt="商品的名称">
                            <div class="bg-heart"></div>
                        </a>
                        <span class="product-heart btn-heart"><i class="iconfont icon-onheart font-size-lxx"></i></span>
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
        <div class="text-center m-y-30x"><a class="btn btn-block btn-gray btn-lg btn-seeMore" href="#">See more of all</a>
        </div>
        <div class="loading" style="display: block">
            <div class="loader">
            </div>
            <div class="text-center p-t-10x">Loading...</div>
        </div>
    </div>
</section>

@include('footer')
