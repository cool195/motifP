@include('header', ['title' => 'Search', 'cid' =>$cid, 'page' => 'search'])
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
                    'list': 'shopping list__',
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
                    'actionField': {'list': 'shopping list__'},      // Optional list property.
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
        console.log('GA.Click'+name);
    }
</script>

<!-- 内容 -->
<section class="body-container">
    <div class="bg-inverse product-category">
        <div class="container">
            <nav class="nav navbar-nav">
                <ul class="nav flex flex-alignCenter flex-justifyCenter">
                    @foreach($categories as $category)
                        <li class="text-center avenirRegular uppercase font-size-sm category-item p-x-30x p-y-10x @if($cid == $category['category_id']) active @endif">
                            <a href="{{$category['category_id']==0 ? '/shop' : '/shop/'.$category['category_id']}}">{{$category['category_name']}}</a>
                        </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>

    <!-- 商品列表 -->
    <div class="container m-t-20x m-b-20x product-container" id="searchList-container" data-pagenum="1" data-loading="false" data-searchid="0">
        <div class="text-center bigNoodle font-size-llx p-y-10x">
            <span>SEARCH RESULTS FOR '{{$kw}}'</span>
        </div>
        <div class="row">
            @foreach($productAll['list'] as $product)
                <div class="col-md-3 col-xs-6">
                    <div class="productList-item search-item">
                        <div class="image-container">
                            <a href="/detail/{{$product['spuBase']['seo_link']}}" data-impr="{{$product['impr']}}" data-clk="{{$product['clk']}}"
                               data-spu="{{$product['spuBase']['spu']}}" data-title="{{$product['spuBase']['main_title']}}"
                               data-price="{{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}">
                                <img class="img-fluid img-lazy" src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" data-original="{{config('runtime.CDN_URL')}}/n2/{{$product['spuBase']['main_image_url']}}" alt="{{$product['spuBase']['main_title']}}">
                                @if($product['spuBase']['image_paths'][0])
                                    <img class="img-fluid productImg-hover" src="{{config('runtime.CDN_URL')}}/n2/{{$product['spuBase']['image_paths'][0]}}" alt="{{$product['spuBase']['main_title']}}">
                                @endif
                                <div class="bg-heart"></div>
                            </a>
                            @if(Session::has('user'))
                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx @if($product['spuBase']['isWished']) active @endif" data-spu="{{$product['spuBase']['spu']}}"></i></span>
                            @else
                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$product['spuBase']['spu']}}" data-referer="{{$_SERVER['REQUEST_URI']}}"></i></span>
                            @endif
                        </div>
                        <div class="price-caption text-center">
                            <!--预售-->
                            @if(1 == $product['spuBase']['sale_type'])
                                <div class="bigNoodle font-size-llxx text-truncate p-x-20x">
                                    <span>LIMITED EDITION</span>
                                </div>
                            @endif

                            <div class="font-size-md text-truncate p-x-20x">{{$product['spuBase']['main_title']}}</div>
                            <div class="text-center">
                                @if($product['skuPrice']['skuPromotion']['promot_price'] != $product['skuPrice']['skuPromotion']['price'])
                                    <span class="font-size-md p-r-5x">${{ number_format(($product['skuPrice']['skuPromotion']['promot_price'] / 100), 2) }}</span>
                                    <span class="font-size-md text-green text-throughLine">${{ number_format(($product['skuPrice']['skuPromotion']['price'] / 100), 2) }}</span>
                                @else
                                    <span class="font-size-md p-r-5x">${{ number_format(($product['skuPrice']['sale_price'] / 100), 2) }}</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach

        </div>
        <input type="hidden" name="keyword" value="{{$kw}}">
        <div class="text-center m-y-10x seeMore-info">
            <div class="searchList-seeMore" style="display: none">
                <div class="btn btn-gray btn-380 btn-seeSearchMore bigNoodle font-size-lx">VIEW MORE</div>
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
            <a href="/detail/@{{ $value.spuBase.seo_link }}" data-impr="@{{ $value.impr }}" data-clk="@{{ $value.clk }}"
               data-spu="@{{ $value.spuBase.spu }}" data-title="@{{ $value.spuBase.main_title }}"
               data-price="@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}">
                <img class="img-fluid img-lazy" data-original="{{config('runtime.CDN_URL')}}/n2/@{{ $value.spuBase.main_image_url }}"
                     src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png" alt="@{{ $value.spuBase.main_title }}">
                {{--@{{ each $value.image_paths as value index }}--}}
                    {{--@{{ if 0 == index }}--}}
                    {{--<img class="img-fluid productImg-hover" src="{{config('runtime.CDN_URL')}}/n2/@{{ value }}" alt="@{{ $value.spuBase.main_title }}">--}}
                    {{--@{{ /if }}--}}
                {{--@{{ /each }}--}}
                <div class="bg-heart"></div>
            </a>
            @if(Session::has('user'))
                <span class="product-heart btn-heart"><i class="iconfont btn-wish btn-wishList font-size-lxx @{{ if $value.spuBase.isWished }} active @{{ /if }}" data-spu="@{{ $value.spuBase.spu }}"></i></span>
            @else
                <span class="product-heart btn-heart"><i class="iconfont font-size-lxx btn-wish btn-wishList" data-actionspu="@{{ $value.spuBase.spu }}" data-referer="{{$_SERVER['REQUEST_URI']}}"></i></span>
            @endif
        </div>
        <div class="price-caption text-center">
            <!--预售-->
            @{{ if 1 == $value.spuBase.sale_type }}
            <div class="bigNoodle font-size-llxx text-truncate p-x-20x">
                <span>LIMITED EDITION</span>
            </div>
            @{{ /if }}
            
            <div class="font-size-md text-truncate p-x-20x">@{{ $value.spuBase.main_title }}</div>
            <div class="text-center">
                @{{ if $value.skuPrice.sale_price != $value.skuPrice.price }}
                    <span class="font-size-md p-r-5x">$@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                    <span class="font-size-md text-green text-throughLine">$@{{ ($value.skuPrice.price/100).toFixed(2) }}</span>
                @{{ else }}
                    <span class="font-size-md p-r-5x">$@{{ ($value.skuPrice.sale_price/100).toFixed(2) }}</span>
                @{{ /if }}
            </div>
        </div>
    </div>
</div>
    @{{ /each }}
</template>

@include('footer')
