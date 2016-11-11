@include('header', ['title' => 'Shopping', 'cid' =>$cid, 'page' => 'shopping'])
<input type="text" id="productClick-name" value="name" hidden>
<input type="text" id="productClick-spu" value="1" hidden>
<input type="text" id="productClick-price" value="1" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    // shoppinglist 点击更多 产品埋点
    function onImpressProduct(item) {
        var json = [];
        for(var key in item){
            json.push({"name":item[key].main_title,"id":item[key].spu,"price":(item[key].skuPrice.sale_price/100).toFixed(2),"brand":"Motif PC","list":"shopping list","position": 1});
        }
        dataLayer.push({
            'event': 'impressProduct',
            'ecommerce': {
                'currencyCode': 'EUR',
                'impressions': json
            }
        });
    }

    // shoppinglist 页面加载 产品埋点
    dataLayer.push({
        'ecommerce': {
            'currencyCode': 'EUR',                       // Local currency is optional.
            'impressions': [
                @foreach($productAll['list'] as $product)
                {
                    'name': '{{$product['main_title']}}',       // Name or ID is required.
                    'id': '{{$product['spu']}}',
                    'price': '{{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}',
                    'brand': 'Motif PC',
                    'list': 'shopping list',
                    'position': 1
                },
                @endforeach
            ]
        }
    });

    // shoppinglist 点击产品埋点
    function onProductClick() {
        var name = document.getElementById('productClick-name').value;
        var spu = document.getElementById('productClick-spu').value;
        var price = document.getElementById('productClick-price').value;
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {'list': 'shopping list'},      // Optional list property.
                    'products': [{
                        'name': name,                      // Name or ID is required.
                        'id': spu,
                        'price': price,
                        'brand': 'Motif PC',
                        'position': 1
                    }]
                }
            },
        });
    }
</script>

<!-- 内容 -->
<section style="margin-top: 1px;"  id="gaProductClick">
    <!-- 商品类别 二级导航 -->
  {{--  <div class="bg-white product-category">
        <div class="container">
            <nav class="nav navbar-nav">
                <ul class="nav flex flex-alignCenter flex-justifyCenter">
                    @foreach($categories as $category)
                    <li class="nav-item p-x-10x m-l-0">
                        <a href="/shopping/{{ $category['category_id'] }}">
                            <div class="p-t-10x p-b-5x category-item @if($cid == $category['category_id']) active @endif">
                                <img src="{{config('runtime.CDN_URL')}}/n2/{{$category['img_path']}}" alt="">
                                <div class="text-center p-t-5x">{{$category['category_name']}}</div>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>--}}
    <div class="bg-white product-category">
        <div class="container">
            <nav class="nav navbar-nav">
                <ul class="nav flex flex-alignCenter flex-justifyCenter">
                    @foreach($categories as $category)
                        <li class="text-center category-item p-x-30x p-y-10x @if($cid == $category['category_id']) active @endif">
                            <a href="/shopping/{{$category['category_id']}}">{{$category['category_name']}}
                                <span class="triangle-up"></span>
                            </a>
                        </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>
    <!-- 商品列表 -->
    <div class="container m-t-20x m-b-40x" id="productList-container" data-categoryid="{{$cid}}" data-pagenum="1" data-loading="false" data-searchid="0">
        <!-- sort by -->
        <div class="m-b-20x text-right">
            <span class="sanBold p-r-15x">Sort By:</span>
            <div class="dropdown sortBy-dropdown">
                <button class="btn btn-sortBy dropdown-toggle" type="button" id="searchDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Featured
                </button>
                <div class="dropdown-menu sortBy-menu p-t-15x" aria-labelledby="searchDropdown">
                    <li class="dropdown-item active" data-search="0" data-searchtext="Featured">Featured</li>
                    @foreach($search['list'] as $key => $value)
                        <li class="dropdown-item" data-search="{{$value['attr_id']}}" data-searchtext="{{$value['attr_label']}}">{{$value['attr_label']}}</li>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="row">
            @foreach($productAll['list'] as $product)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a href="/detail/{{$product['spu']}}" data-impr="{{$product['impr']}}" data-clk="{{$product['clk']}}"
                           data-spu="{{$product['spu']}}" data-title="{{$product['main_title']}}"
                           data-price="{{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}">
                            <img class="img-fluid img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" data-original="{{config('runtime.CDN_URL')}}/n2/{{$product['main_image_url']}}" alt="商品的名称">
                            <div class="bg-heart"></div>
                        </a>
                        @if(Session::has('user'))
                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx @if($product['isWished']) active @endif" data-spu="{{$product['spu']}}"></i></span>
                        @else
                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$product['spu']}}"></i></span>
                        @endif

                        @if(1 == $product['sale_type'])
                            <!--预售标志-->
                            <div class="presale-sign newPresale-sign">
                                {{--<div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>--}}
                                <a href="/detail/{{$product['spu']}}" data-clk="{{$product['clk']}}" class="newPresale-text helveBold font-size-xs text-primary">Limited Edition</a>
                            </div>
                        @endif
                    </div>
                    <div class="price-caption helveBold">
                        <div class="text-center font-size-md text-main text-truncate p-x-20x">{{$product['main_title']}}</div>
                        <div class="text-center">
                            @if($product['skuPrice']['skuPromotion']['promot_price'] != $product['skuPrice']['skuPromotion']['price'])
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
                <div class="btn btn-gray btn-lg btn-380 btn-seeMore">VIEW MORE</div>
            </div>
            <div class="loading product-loading" style="display: none">
                <div class="loader">
                </div>
                <div class="text-center p-l-15x">Loading...</div>
            </div>
        </div>
    </div>
</section>

<template id="tpl-product">
    @{{ each list }}
<div class="col-md-3 col-xs-6">
    <div class="productList-item">
        <div class="image-container">
            <a href="/detail/@{{ $value.spu }}" data-impr="@{{ $value.impr }}" data-clk="@{{ $value.clk }}"
               data-spu="@{{ $value.spu }}" data-title="@{{ $value.main_title }}"
               data-price="@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}">
                <img class="img-fluid img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ $value.main_image_url }}"
                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="@{{ $value.main_title }}">
                <div class="bg-heart"></div>
            </a>
            @if(Session::has('user'))
                <span class="product-heart btn-heart"><i class="iconfont btn-wish btn-wishList font-size-lxx @{{ if $value.isWished }} active @{{ /if }}" data-spu="@{{ $value.spu }}"></i></span>
            @else
                <span class="product-heart btn-heart"><i class="iconfont font-size-lxx btn-wish" data-actionspu="@{{ $value.spu }}"></i></span>
            @endif
            @{{ if 1 == $value.sale_type }}
                <!--预售标志-->
                <div class="presale-sign newPresale-sign">
                    {{--<div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>--}}
                    <a href="/detail/@{{ $value.spu }}" data-impr="@{{ $value.impr }}" data-clk="@{{ $value.clk }}"
                       data-spu="@{{ $value.spu }}" data-title="@{{ $value.main_title }}"
                       data-price="@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}"
                       class="newPresale-text helveBold font-size-xs text-primary text-primary">Limited Edition</a>
                </div>
            @{{ /if }}
        </div>
        <div class="price-caption helveBold">
            <div class="text-center font-size-md text-main text-truncate p-x-20x">@{{ $value.main_title }}</div>
            <div class="text-center">
                @{{ if $value.skuPrice.sale_price != $value.skuPrice.price }}
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
