@include('header')
<!-- 内容 -->
<section class="m-t-40x">
    @inject('wishlist', 'App\Http\Controllers\UserController')
    <!-- 设计师列表 -->
    <div class="container m-b-40x">
        <div class="box-shadow p-a-20x bg-white">
            <div class="row designer-item" id="designerDetailContainer">
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="product-bigImg player-media">
                        @if(isset($designer['detailVideoPath']))
                            <div class="designer-media bg-white">
                                <div class="player-item" data-playid="{{$designer['detailVideoPath']}}">
                                    <div id="{{$designer['detailVideoPath']}}" class="ytplayer" data-playid="{{$designer['detailVideoPath']}}"></div>
                                    <div class="bg-player">
                                        <img class="img-fluid bg-img" src="{{config('runtime.CDN_URL')}}/n1/{{$designer['img_video_path']}}" alt="">
                                        <div class="btn-beginPlayer designer-beginPlayer">
                                            <img src="{{config('runtime.Image_URL')}}/images/daily/icon-player.png"
                                                 srcset="{{config('runtime.Image_URL')}}/images/daily/icon-player@2x.png 2x,{{config('runtime.Image_URL')}}/images/daily/icon-player@3x.png 3x"
                                                 alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @else
                            <img class="img-fluid product-bigImg img-lazy"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$designer['img_video_path']}}"
                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@750.png"
                                 alt="商品的名称">
                        @endif
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="text-center m-x-20x">
                        <div class="m-b-10x"><img class="img-circle img-border-white-4x" src="{{config('runtime.CDN_URL')}}/n0/{{$designer['icon']}}" width="120" height="120" alt=""></div>
                        <div class="font-size-md helveBold">{{$designer['nickname']}}</div>
                        <div class="p-t-15x">
                            @if(Session::has('user'))
                                <div class="btn btn-gray btn-sm p-x-20x btn-follow @if(in_array($designer['designer_id'], $followList)) active @endif"
                                   data-did="{{$designer['designer_id']}}">@if(in_array($designer['designer_id'], $followList)){{'Following'}}@else{{'Follow'}}@endif</div>
                            @else
                                <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow" data-actiondid="{{$designer['designer_id']}}">Follow</a>
                            @endif
                        </div>

                        @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']))
                        <div class="p-t-15x p-l-15x">
                        @endif
                            @if(!empty($designer['instagram_link']))
                                <a href="{{$designer['instagram_link']}}" class="m-r-20x"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-ins.png"></a>
                            @endif
                            @if(!empty($designer['snapchat_link']))
                                <a href="{{$designer['snapchat_link']}}" class="m-r-20x"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-snapchat@2x.png"></a>
                            @endif
                            @if(!empty($designer['youtube_link']))
                                <a href="{{$designer['youtube_link']}}" class="m-r-20x"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-youtube@2x.png"></a>
                            @endif
                            @if(!empty($designer['facebook_link']))
                                <a href="{{$designer['facebook_link']}}" class="m-r-20x"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-fac.png"></a>
                            @endif
                            @if(!empty($designer['blog_link']))
                                <a href="{{$designer['blog_link']}}" class="m-r-20x"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-blog@2x.png"></a>
                            @endif
                        @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']))
                        </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- 设计师介绍 -->
        <h4 class="helveBold text-main p-l-10x p-t-30x m-b-20x">{{$designer['nickname']}}</h4>
        <div class="box-shadow p-x-20x p-y-15x bg-white">
            <p class="m-b-0">{{$designer['describe']}}</p>
        </div>

        <!-- 设计师 预售 -->
        <section class="bg-common m-t-30x p-b-20x">
            <!-- 预售倒计时 -->
            <div class="designer-presale text-center p-t-40x p-b-10x">
                <div class="helveBold pre-tit p-b-10x">Vivian’s Presale</div>
                <span class="sanBold font-size-lxx">Order Close in </span>
                <div class="m-t-30x">
                    <div class="row presaleDate-row">
                        <div class="col-md-3">
                            <div class="timeDown box-shadow bg-white">
                                <span class="time-number p-t-5x helveBold">5</span>
                                <div class="dateName text-white helve">DAY</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="timeDown box-shadow bg-white">
                                <span class="time-number p-t-5x helveBold">2</span>
                                <div class="dateName text-white helve">HOUR</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="timeDown box-shadow bg-white">
                                <span class="time-number p-t-5x helveBold">4</span>
                                <div class="dateName text-white helve">MIN</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="timeDown box-shadow bg-white">
                                <span class="time-number p-t-5x helveBold">34</span>
                                <div class="dateName text-white helve">SEC</div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="p-t-40x sanBold font-size-md">Expected to ship on Sep 10, 2016</p>
            </div>

            <!--banner图-->
            <div class="m-t-20x text-center">
                <img class="img-lazy designer-banImg" src="{{config('runtime.Image_URL')}}/images/product/pic.jpg">
            </div>

            <!--描述-->
            <div class="p-x-20x m-y-20x">
                <p class="m-b-0 text-center">traight off the Emmys red carpet, inspired by the most beautiful jewelries that sparkled all night.Straight off the Emmys red carpet, inspired by the most beautiful jewelries that sparkled all night.</p>
            </div>

            <!--设计师 商品-->
            <div class="container m-y-20x">
                <div class="row designerDetail-goods">
                    <div class="col-md-3 col-xs-6 goods-item">
                        <div class="productList-item">
                            <div class="image-container">
                                <a href="#">
                                    <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/product/product.jpg" alt="商品的名称">
                                    <div class="bg-heart"></div>
                                </a>
                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"></i></span>
                                <!--预售标志-->
                                <div class="presale-sign">
                                    <div class="img-clock font-size-sm"><img class="img-circle" src="{{config('runtime.Image_URL')}}/images/icon/sale-clock.png"></div>
                                    <div class="presale-text helve font-size-sm">LIMITED DEITION</div>
                                </div>
                            </div>
                            <div class="price-caption helveBold">
                                <div class="text-center font-size-md text-primary text-truncate p-x-20x">New Rings</div>
                                <div class="text-center">
                                    <span class="font-size-md text-primary p-r-5x text-red">$199.95</span>
                                    <span class="font-size-base text-common text-throughLine">$299.95</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--banner图-->
            <div class="m-t-20x text-center">
                <img class="img-lazy designer-banImg" src="{{config('runtime.Image_URL')}}/images/product/pic-test.png">
            </div>

            <!--设计师 商品-->
            <div class="container m-y-20x">
                <div class="row designerDetail-goods">
                    <div class="col-md-3 col-xs-6 goods-item">
                        <div class="productList-item">
                            <div class="image-container">
                                <a href="#">
                                    <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/product/product.jpg" alt="商品的名称">
                                    <div class="bg-heart"></div>
                                </a>
                                <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"></i></span>
                                <!--预售标志-->
                                <div class="presale-sign">
                                    <div class="img-clock font-size-sm"><img class="img-circle" src="{{config('runtime.Image_URL')}}/images/icon/sale-clock.png"></div>
                                    <div class="presale-text helve font-size-sm">LIMITED DEITION</div>
                                </div>
                            </div>
                            <div class="price-caption helveBold">
                                <div class="text-center font-size-md text-primary text-truncate p-x-20x">New Rings</div>
                                <div class="text-center">
                                    <span class="font-size-md text-primary p-r-5x text-red">$199.95</span>
                                    <span class="font-size-base text-common text-throughLine">$299.95</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>

        <!-- 设计师 商品 -->
        <h4 class="helveBold text-main p-l-10x p-t-30x m-b-20x">@if(isset($productAll['data']['list'])){{$designer['nickname']}}'s Design Works @endif</h4>
        <div class="row">
            @if(isset($productAll['data']['list']))
                @foreach($productAll['data']['list'] as $product)
            <div class="col-md-3 col-xs-6">
                <div class="productList-item">
                    <div class="image-container">
                        <a data-impr='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":0,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                           data-clk='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"action":1,"skipType":1,"skipId":{{$product['spu']}},"expid":0,"version":"1.0.1","src":"PC"}'
                           data-link="/product/{{$product['spu']}}" href="javascript:void(0)">
                            <img class="img-fluid img-lazy"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$product['main_image_url']}}" alt="{{$product['main_title']}}"
                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png">
                            {{--售罄--}}
                            {{--<div class="bg-soldout">
                                <span class="text helve font-size-sm">SOLD OUT</span>
                            </div>--}}
                        </a>
                        @if(Session::has('user'))
                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx @if(in_array($product['spu'], $wishlist->wishlist())) active @endif" data-spu="{{$product['spu']}}"></i></span>
                        @else
                            <a class="product-heart btn-heart" href="javascript:void(0)"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$product['spu']}}"></i></a>
                        @endif

                        @if(1 == $product['sale_type'])
                            <div class="presale-sign">
                                <div class="img-clock"><img class="img-circle" src="/images/icon/sale-clock.png"></div>
                                <div class="presale-text helve font-size-sm">LIMITED DEITION</div>
                            </div>
                        @endif
                    </div>
                    <div class="price-caption helveBold">
                        <div class="text-center font-size-md text-primary text-truncate p-x-20x">{{ $product['main_title'] }}</div>
                        <div class="text-center">
                            @if($product['skuPrice']['sale_price'] != $product['skuPrice']['price'])
                                <span class="font-size-md text-primary p-r-5x text-red">${{number_format($product['skuPrice']['sale_price']/100,2)}}</span>
                                <span class="font-size-base text-common text-throughLine">${{number_format($product['skuPrice']['price']/100,2)}}</span>
                            @else
                                <span class="font-size-md text-primary p-r-5x">${{number_format($product['skuPrice']['sale_price']/100,2)}}</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
                @endforeach
            @endif
        </div>
    </div>
</section>

@include('footer')

<script>
    // 锚点图
    function getHotSpot() {
        $('.hotspot-image').each(function () {
            var $this = $(this);
            var obj = $(this).data('hotspot');
            // 获取最后一个字符
            var lastStr = obj.charAt(obj.length - 1);
            if (lastStr === ',') {
                obj = obj.substring(0, obj.length - 1);
            }
            // 转化为json
            var objJson = eval('[' + obj + ']');
            $.each(objJson, function (n, value) {
                var BeginX = value.beginX;
                var BeginY = value.beginY;
                var EndX = value.endX;
                var EndY = value.endY;
                var url = '';
                switch (value.skipType) {
                    case '1':
                        url = '/product/';
                        break;
                    case '2':
                        url = '/designer/';
                        break;
                    case '3':
                        url = '/topic/';
                        break;
                    case '4':
                        url = '/shopping/';
                        break;
                }
                url += value.skipId;
                var parenta = $('<a></a>').attr('href', url);
                var childdiv = $('<div class="hotspot-spot"></div>').css({
                    width: (EndX - BeginX) * 100 + "%",
                    height: (EndY - BeginY) * 100 + "%",
                    left: BeginX * 100 + "%",
                    top: BeginY * 100 + "%"
                });
                parenta.prepend(childdiv).appendTo($this);
            });
        });
    }

    $(function () {
        getHotSpot();
    });
</script>
