@include('header',['title'=>$designer['nickname'],'description'=>$designer['describe'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$designer['img_video_path'],'page'=>'designer'])
<input type="text" id="productClick-name" value="name" hidden>
<input type="text" id="productClick-spu" value="1" hidden>
<input type="text" id="productClick-price" value="1" hidden>
<script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    function onProductClick() {
        var name = document.getElementById('productClick-name').value;
        var spu = document.getElementById('productClick-spu').value;
        var price = document.getElementById('productClick-price').value;
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {'list': 'designer'},      // Optional list property.
                    'products': [{
                        'name': name,                      // Name or ID is required.
                        'id': spu,
                        'price': price,
                        'brand': '{{$designer['nickname']}}',
                        'category': 'designerDetail',
                        'variant': '',
                        'position': ''
                    }]
                }
            },
        });
    }

    dataLayer.push({
        'ecommerce': {
            'currencyCode': 'EUR',                       // Local currency is optional.
            'impressions': [
                    @if(!empty($product['infos']))
                    @foreach($product['infos'] as $k => $value)
                    @if($value['type']=='product')
                    @if(isset($value['spus']))
                    @foreach($value['spus'] as $spu)
                {
                    'name': '{{$product['spuInfos'][$spu]['spuBase']['main_title']}}',       // Name or ID is required.
                    'id': '{{$spu}}',
                    'price': '{{number_format($product['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}',
                    'brand': '{{$designer['nickname']}}',
                    'category': 'designerDetail',
                    'variant': '',
                    'list': 'designer',
                    'position': '{{$k}}'
                },
                    @endforeach
                    @endif
                    @endif
                    @endforeach
                    @endif


                    @if(isset($productAll['data']['list']))
                    @foreach($productAll['data']['list'] as $k=>$value)
                {
                    'name': '{{$value['main_title']}}',       // Name or ID is required.
                    'id': '{{$value['spu']}}',
                    'price': '{{number_format($value['skuPrice']['sale_price']/100,2)}}',
                    'brand': '{{$designer['nickname']}}',
                    'category': 'designerDetail',
                    'variant': '',
                    'list': 'designer',
                    'position': '{{$k}}'
                },
                @endforeach
                @endif

            ]
        }
    });
</script>

<!-- 内容 -->
<section class="m-t-40x">
@inject('wishlist', 'App\Http\Controllers\UserController')
<!-- 新版设计师详情页 -->
    <div class="topic-wrap">
        <!-- 设计师信息 -->
        <div class="box-shadow bg-white">
            <!-- 设计师头图 -->
        @if(isset($designer['detailVideoPath']))
            <!-- 视频 -->
            @else
                <div class="designer-img"><img class="img-fluid"
                                               src="{{config('runtime.CDN_URL')}}/n1/{{$designer['img_video_path']}}">
                </div>
        @endif

        <!-- 设计师头像 follow 介绍 社交 -->
            <div class="text-center p-b-20x p-t-30x designer-basicInfo">
                <div class="m-b-10x designer-headImg"
                     data-impr='http://clk.motif.me/log.gif?t=designer.600001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&ref=&v={"action":0,"skipType":2,"skipId":{{$designer['designer_id']}},"expid":0,"version":"1.0.1","ver":"9.2","src":"PC"}'>
                    <img class="img-circle img-border-white-4x"
                         src="{{config('runtime.CDN_URL')}}/n0/{{$designer['icon']}}"
                         width="120" height="120" alt="">
                </div>
                <div class="font-size-md helveBold p-t-40x">{{$designer['nickname']}}</div>
                <div class="p-t-15x">
                    @if(Session::has('user'))
                        <div class="btn btn-gray btn-sm p-x-20x btn-follow @if(in_array($designer['designer_id'], $followList)) active @endif"
                             data-did="{{$designer['designer_id']}}">@if(in_array($designer['designer_id'], $followList)){{'Following'}}@else{{'Follow'}}@endif</div>
                    @else
                        <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow"
                           data-actiondid="{{$designer['designer_id']}}">Follow</a>
                    @endif
                </div>

                <div class="p-t-20x p-x-20x">
                    <p class="m-b-0">{{$designer['describe']}}</p>
                </div>

                @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                    <div class="p-t-20x p-l-15x font-size-lxx">
                        @endif
                        @if(!empty($designer['instagram_link']))
                            <a href="{{$designer['instagram_link']}}" class="m-r-20x"><i
                                        class="iconfont icon-instagram1"></i></a>
                        @endif
                        @if(!empty($designer['snapchat_link']))
                            <a href="{{$designer['snapchat_link']}}" class="m-r-20x"><i
                                        class="iconfont icon-snapchat"></i></a>
                        @endif
                        @if(!empty($designer['youtube_link']))
                            <a href="{{$designer['youtube_link']}}" class="m-r-20x"><i
                                        class="iconfont icon-youtube1"></i></a>
                        @endif
                        @if(!empty($designer['facebook_link']))
                            <a href="{{$designer['facebook_link']}}" class="m-r-20x"><i
                                        class="iconfont icon-facebook1"></i></a>
                        @endif
                        @if(!empty($designer['blog_link']))
                            <a href="{{$designer['blog_link']}}" class="m-r-20x"><i
                                        class="iconfont icon-blog"></i></a>
                        @endif
                        @if(!empty($designer['instagram_link']) || !empty($designer['snapchat_link']) || !empty($designer['youtube_link']) || !empty($designer['facebook_link']) || !empty($designer['blog_link']))
                    </div>
                @endif
            </div>
        </div>

        <!-- 设计师预售信息 LIMITED EDITION -->
        <div class="box-shadow bg-white m-t-20x p-x-20x">
            <div class="helveBold text-center p-y-15x font-size-md">LIMITED EDITION</div>

            <div class="p-y-15x">
                <div class="">
                    <img src="{{config('runtime.Image_URL')}}/images/icon/icon-limited.png"
                         srcset="{{config('runtime.Image_URL')}}/images/icon/icon-limited@2x.png 2x, {{config('runtime.Image_URL')}}/images/icon/icon-limited@3x.png 3x"
                         alt="">
                    <span class="text-primary font-size-base p-l-5x">Orders Closed</span>
                </div>
            </div>

            <hr class="hr-base m-a-0">
            <div class="p-y-15x">
                <div class="limited-content"
                     data-begintime="1477584000"
                     data-endtime="1477670400"
                     data-lefttime="86400">
                    <img src="{{config('runtime.Image_URL')}}/images/icon/icon-limited.png"
                         srcset="{{config('runtime.Image_URL')}}/images/icon/icon-limited@2x.png 2x, {{config('runtime.Image_URL')}}/images/icon/icon-limited@3x.png 3x"
                         alt="">
                    <span class="text-primary font-size-base p-l-5x">Orders Close In <span class="time_show"></span></span>
                </div>
                <div class="p-t-10x">
                    <progress class="progress progress-primary" id="limited-progress" value="2000" max="10000">20%</progress>
                </div>
            </div>

        </div>
        <!-- 设计师预售信息 PREORDER -->
        <div class="box-shadow bg-white m-t-20x p-x-20x">
            <div class="helveBold text-center p-y-15x font-size-md">PREORDER</div>
            <hr class="hr-base m-a-0">
            <div class="p-y-15x">
                <div class="text-primary font-size-base">
                    Expected to ship on <span class="sanBold">November 25, 2016.</span>
                </div>
            </div>
        </div>

        <!-- 设计师预售 -->
        @if(!empty($product['infos']))
            <div class="bg-white m-t-20x">
            @if(!empty($product['infos']))
                @foreach($product['infos'] as $k => $value)
                    @if($value['type']=='banner' || (!isset($value['spus']) && $value['type']=='product'))
                        <!--banner图-->
                            <div class="p-y-0 text-center">
                                @if(!isset($value['skipType']) || empty($value['skipId']))
                                    <img class="img-lazy img-fluid"
                                         src="{{config('runtime.CDN_URL')}}/n0/{{$value['imgPath']}}">
                                @else
                                    <a href="@if($value['skipType']=='1')/detail/{{$value['skipId']}}@elseif($value['skipType']=='2')/designer/{{$value['skipId']}}@elseif($value['skipType']=='3')/topic/{{$value['skipId']}}@elseif($value['skipType']=='4')/shopping#{{$value['skipId']}}@else{{$value['skipId']}}@endif"
                                       data-impr='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":0,"skipType":{{$value['skipType']}},"skipId":"{{$value['skipId']}}","expid":0,"index":{{$k}},"version":"1.0.1","ver":"9.2","src":"PC"}'
                                       data-clk='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":{{$value['skipType']}},"skipId":"{{$value['skipId']}}","expid":0,"index":{{$k}},"version":"1.0.1","ver":"9.2","src":"PC"}'>
                                        <img class="img-lazy img-fluid"
                                             src="{{config('runtime.CDN_URL')}}/n0/{{$value['imgPath']}}">
                                    </a>
                                @endif
                            </div>
                    @elseif($value['type']=='title')
                        <!--标题-->
                            <div class="p-x-20x p-t-20x m-b-20x text-center">
                                <h2 class="helveBold font-size-lxx">{{$value['value']}}</h2>
                            </div>
                    @elseif($value['type'] == 'boxline')
                        <!--分割线-->
                            <hr class="hr-base m-x-20x m-y-0">
                    @elseif($value['type'] =='context')
                        <!--描述-->
                            <div class="p-x-20x m-y-20x">
                                <p class="m-b-0 text-center">{{$value['value']}}</p>
                            </div>
                    @elseif($value['type'] == 'product')
                        @if(isset($value['spus']) && !empty($value['spus']))
                            <!--设计师 商品-->
                                <div class="p-t-20x bg-body">
                                    <div class="row designerDetail-goods">
                                        @foreach($value['spus'] as $key => $spu)
                                            <div class="col-xs-6">
                                                <div class="productList-item">
                                                    <div class="image-container">
                                                        <a href="/detail/{{$spu}}"
                                                           data-clk='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":{{$spu}},"expid":0,"index":{{$key}},"version":"1.0.1","ver":"9.2","src":"PC"}'
                                                           data-spu="{{$spu}}"
                                                           data-title="{{$product['spuInfos'][$spu]['spuBase']['main_title']}}"
                                                           data-price="{{number_format($product['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}">
                                                            <img class="img-fluid img-lazy figure"
                                                                 src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$product['spuInfos'][$spu]['spuBase']['main_image_url']}}"
                                                                 alt="{{$product['spuInfos'][$spu]['spuBase']['main_title']}}">
                                                        </a>
                                                        <!--预售标志-->
                                                        @if(1 == $product['spuInfos'][$spu]['spuBase']['sale_type'])
                                                            @if($product['spuInfos'][$spu]['stockStatus']=='NO' || $product['spuInfos'][$spu]['spuBase']['isPutOn']==0)
                                                                <div class="bg-soldout">
                                                                    <span class="text helve font-size-sm">SOLD OUT</span>
                                                                </div>
                                                            @else
                                                            <!--预售标志-->
                                                                <div class="presale-sign newPresale-sign">
                                                                    <a href="/detail/{{$spu}}"
                                                                       data-clk='http://clk.motif.me/log.gif?t=designer.400001&m=PC_M2016-1&pin={{ Session::get('user.pin') }}&uuid={{Session::has('user') ? Session::get('user.uuid') : $_COOKIE['uid']}}&v={"action":1,"skipType":1,"skipId":{{$spu}},"expid":0,"index":{{$key}},"version":"1.0.1","ver":"9.2","src":"PC"}'
                                                                       data-spu="{{$spu}}"
                                                                       data-title="{{$product['spuInfos'][$spu]['spuBase']['main_title']}}"
                                                                       data-price="{{number_format($product['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}"
                                                                       class="newPresale-text helveBold font-size-xs">Limited
                                                                        Edition</a>
                                                                </div>
                                                            @endif
                                                        @endif

                                                        @if(Session::has('user'))
                                                            <span class="product-heart btn-heart">
                                                                <i class="iconfont btn-wish font-size-lxx @if(in_array($spu, $wishlist->wishlist())) active @endif" data-spu="{{$spu}}"></i>
                                                            </span>
                                                        @else
                                                            <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx" data-actionspu="{{$spu}}"></i></span>
                                                        @endif
                                                    </div>
                                                    <div class="price-caption helveBold">
                                                        <div class="text-center font-size-md text-primary text-truncate p-x-20x">
                                                            {{$product['spuInfos'][$spu]['spuBase']['main_title']}}
                                                        </div>
                                                        <div class="text-center">
                                                            @if($product['spuInfos'][$spu]['skuPrice']['sale_price'] != $product['spuInfos'][$spu]['skuPrice']['price'])
                                                                <span class="font-size-md text-primary p-r-5x text-red">${{number_format($product['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
                                                                <span class="font-size-base text-common text-throughLine">${{number_format($product['spuInfos'][$spu]['skuPrice']['price']/100,2)}}</span>
                                                            @else
                                                                <span class="font-size-md text-primary p-r-5x">${{number_format($product['spuInfos'][$spu]['skuPrice']['sale_price']/100,2)}}</span>
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
                @endif
            </div>
        @endif

    <!-- 设计师商品 -->
        <div class="m-t-20x">
            <div class="row">
                @if(isset($productAll['data']['list']))
                    @foreach($productAll['data']['list'] as $product)
                        <div class="col-xs-6">
                            <div class="productList-item">
                                <div class="image-container">
                                    <a data-impr="{{ $product['impr'] }}" data-clk="{{ $product['clk'] }}"
                                       href="/detail/{{$product['spu']}}" data-spu="{{$product['spu']}}"
                                       data-title="{{$product['main_title']}}"
                                       data-price="{{number_format($product['skuPrice']['sale_price']/100,2)}}">
                                        <img class="img-fluid img-lazy figure"
                                             data-original="{{config('runtime.CDN_URL')}}/n1/{{$product['main_image_url']}}"
                                             alt="{{$product['main_title']}}"
                                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png">
                                    </a>
                                    <!--预售标志-->
                                    @if(1 == $product['sale_type'])
                                        <div class="presale-sign">
                                            <a data-impr="{{ $product['impr'] }}" data-clk="{{ $product['clk'] }}"
                                               href="/detail/{{$product['spu']}}" data-spu="{{$product['spu']}}"
                                               data-title="{{$product['main_title']}}"
                                               data-price="{{number_format($product['skuPrice']['sale_price']/100,2)}}"
                                               class="newPresale-text helveBold font-size-xs">Limited Edition</a>
                                        </div>
                                    @endif

                                    @if(Session::has('user'))
                                        <span class="product-heart btn-heart">
                                            <i class="iconfont btn-wish font-size-lxx @if(in_array($product['spu'], $wishlist->wishlist())) active @endif"
                                               data-spu="{{$product['spu']}}"></i>
                                        </span>
                                    @else
                                        <span class="product-heart btn-heart"><i class="iconfont btn-wish font-size-lxx"
                                                                                 data-actionspu="{{$product['spu']}}"></i></span>
                                    @endif

                                </div>
                                <div class="price-caption helveBold">
                                    <div class="text-center font-size-md text-primary text-truncate p-x-20x">
                                        {{ $product['main_title'] }}
                                    </div>
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

        <!-- 99 设计师 尾部 follow -->
        @if($designer['designer_id']==99)
            <div class="font-size-base text-primary p-y-15x p-x-15x m-b-10x">
                <div class="text-center">
                    <div>Love this collection? Follow Rae on our free app for early access to shop future collections.
                    </div>
                    <div class="p-t-15x">
                        @if(Session::has('user'))
                            <div class="btn btn-gray btn-sm p-x-20x btn-follow @if(in_array($designer['designer_id'], $followList)) active @endif"
                                 data-did="{{$designer['designer_id']}}">@if(in_array($designer['designer_id'], $followList)){{'Following'}}@else{{'Follow'}}@endif</div>
                        @else
                            <a href="javascript:void(0)" class="btn btn-gray btn-sm p-x-20x btn-follow"
                               data-actiondid="{{$designer['designer_id']}}">Follow</a>
                        @endif
                    </div>
                </div>
            </div>
        @endif

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
                        url = '/detail/';
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
