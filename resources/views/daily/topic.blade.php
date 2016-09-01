
@include('header')
<!--内容-->
<section class="p-y-40x">
    @inject('wishlist', 'App\Http\Controllers\UserController')
    <div class="topic-wrap">
        @if(isset($topic['infos']))
            <div class="bg-white">
            @foreach($topic['infos'] as $k => $value)
                @if($value['type'] == 'title')
                <!--标题-->
                <div class="p-x-20x p-t-20x m-b-20x">
                    <h2 class="helveBold">{{ $value['value'] }}</h2>
                </div>
                @elseif($value['type'] == 'context')
                <!--描述-->
                <div class="p-x-20x m-y-20x">
                    <p class="m-b-0">{{ $value['value'] }}</p>
                </div>
                @elseif($value['type'] == 'multilink')
                <!--图-->
                <div class="m-t-20x">
                    <img src="{{config('runtime.CDN_URL')}}/n1/{{ $value['imgPath'] }}">
                </div>
                @elseif($value['type'] == 'boxline')
                <!--分割线-->
                <hr class="hr-base m-x-20x m-y-0">
                @elseif($value['type'] == 'banner')
                <!--图 banner-->
                <div class="p-y-0">
                    <img src="{{config('runtime.CDN_URL')}}/n1/{{ $value['imgPath'] }}">
                </div>
                @endif

            @if($value['type'] == 'product')
                    <!--图文列表-->
            @if(isset($value['spus']))
                <div class="p-t-40x p-b-20x bg-body">
                    <div class="row">
                        @foreach($value['spus'] as $spu)
                            <div class="col-xs-6">
                                <div class="productList-item">
                                    <div class="image-container">
                                        <a href="/product/{{$spu}}">
                                            <img class="img-fluid img-lazy" data-original="{{config('runtime.CDN_URL')}}/n1/{{$topic['spuInfos'][$spu]['spuBase']['main_image_url']}}"
                                                 src="{{env('CDN_Static')}}/images/product/bg-product@336.png"
                                                 alt="{{$topic['spuInfos'][$spu]['spuBase']['main_title']}}">
                                            <div class="bg-heart"></div>
                                        </a>
                                        @if(Session::has('user'))
                                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx @if(in_array($product['spu'], $wishlist->wishlist())) active @endif" data-spu="{{$spu}}"></i></span>
                                        @else
                                            <a class="product-heart btn-heart" href="/login"><i class="iconfont btn-wish font-size-lxx"></i></a>
                                        @endif
                                    </div>
                                    <div class="price-caption helveBold">
                                        <div class="text-center font-size-md text-primary text-truncate p-x-20x">
                                            {{$topic['spuInfos'][$spu]['spuBase']['main_title']}}
                                        </div>
                                        <div class="text-center">
                                            <span class="font-size-md text-primary p-r-5x">${{number_format($topic['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                            @if($topic['spuInfos'][$spu]['skuPrice']['price'] != $topic['spuInfos'][$spu]['skuPrice']['sale_price'])
                                                <span class="font-size-base text-common text-throughLine">${{number_format($topic['spuInfos'][$spu]['skuPrice']['price']/100,2)}}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
            @endif
            @endforeach
            </div>
        @endif
        
    </div>
</section>

@include('footer')
