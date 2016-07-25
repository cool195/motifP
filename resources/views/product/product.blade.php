<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Shopping Detail</title>
    <link rel="apple-touch-icon" href="/images/icon/apple-touch-icon.png">

    <link rel="stylesheet" href="/styles/vendor.css">

    <link rel="stylesheet" href="/styles/common.css">

    <script src="/scripts/vendor/modernizr.js"></script>
</head>
<body>

<!-- header start-->
@include('header')
<!-- header end-->

<!-- 内容 -->
<section class="m-t-40x">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-12">
                <div class="p-a-20x box-shadow bg-white">
                    <img class="img-fluid product-bigImg" src="/images/product/product.jpg" alt="">
                    <div class="swiper-container">
                        <div class="productImg-list p-t-20x swiper-wrapper">
                            <div class="productImg-item swiper-slide p-r-10x">
                                <img class="img-thumbnail active" src="/images/product/product.jpg" width="110"
                                     height="110" alt="商品图片">
                            </div>
                            <div class="productImg-item swiper-slide p-r-10x">
                                <img class="img-thumbnail" src="/images/product/product1.jpg" width="110" height="110"
                                     alt="商品图片">
                            </div>
                            <div class="productImg-item swiper-slide p-r-10x">
                                <img class="img-thumbnail" src="/images/product/product.jpg" width="110" height="110"
                                     alt="商品图片">
                            </div>
                            <div class="productImg-item swiper-slide p-r-10x">
                                <img class="img-thumbnail" src="/images/product/product.jpg" width="110" height="110"
                                     alt="商品图片">
                            </div>
                            <div class="productImg-item swiper-slide p-r-10x">
                                <img class="img-thumbnail" src="/images/product/product.jpg" width="110" height="110"
                                     alt="商品图片">
                            </div>
                        </div>
                        <div class="swiper-button-next"><i
                                    class="iconfont icon-arrow-right font-size-lg text-white"></i></div>
                        <div class="swiper-button-prev"><i class="iconfont icon-arrow-left font-size-lg text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="p-a-20x box-shadow bg-white">
                    <h4 class="product-title helveBold">Aurora Ring</h4>
                    <p class="m-b-15x text-primary">Boasting a spectacular display of color, the titanium Aurora ring
                        stands out
                        as a beautiful
                        anomaly contemporary fashion. Be light-years ahead!</p>
                    <div class="product-price">
                        <span class="sanBold p-r-10x text-primary">$ 199.95</span>
                        <span class="sanBold font-size-lxx text-common text-throughLine">$299.95</span>
                    </div>
                    <hr class="hr-common">
                    <fieldset class="text-left m-b-20x">
                        <div class="text-primary font-size-md">Size</div>
                        <div class="m-l-15x">
                            <div class="option-item">
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="xxl" id="xxl" hidden>
                                    <label for="xxl" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">XXL</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="xl" id="xl" disabled="disabled" hidden>
                                    <label for="xl" class="btn btn-itemProperty btn-sm disabled" data-spa=""
                                           data-ska="">XL</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="l" id="l" hidden>
                                    <label for="l" class="btn btn-itemProperty btn-sm" data-spa="" data-ska="">L</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="s" id="s" hidden>
                                    <label for="s" class="btn btn-itemProperty btn-sm" data-spa="" data-ska="">S</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="m" id="m" hidden>
                                    <label for="m" class="btn btn-itemProperty btn-sm" data-spa="" data-ska="">M</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="size" value="xs" id="xs" hidden>
                                    <label for="xs" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">XS</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="text-left m-b-20x">
                        <div class="text-primary font-size-md">Color</div>
                        <div class="m-l-15x">
                            <div class="option-item">
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="red" id="red" hidden>
                                    <label for="red" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">Red</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="blue" id="blue" hidden>
                                    <label for="blue" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">Blue</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="black" id="black" disabled="disabled"
                                           hidden>
                                    <label for="black" class="btn btn-itemProperty btn-sm disabled" data-spa=""
                                           data-ska="">Black</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="green" id="green" hidden>
                                    <label for="green" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">Green</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="gold" id="gold" hidden>
                                    <label for="gold" class="btn btn-itemProperty btn-sm" data-spa=""
                                           data-ska="">Gold</label>
                                </div>
                                <div class="p-y-5x p-r-10x">
                                    <input type="radio" name="color" value="darkBlue" id="darkBlue" hidden>
                                    <label for="darkBlue" class="btn btn-itemProperty btn-sm" data-spa="" data-ska="">Dark
                                        Blue</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="text-left m-b-20x">
                        <div class="text-primary font-size-md">Ring Inside Engraving +$4.5</div>
                        <div class="m-l-15x">
                            <div class="p-y-5x flex flex-alignCenter">
                                <input type="text" class="input-engraving form-control m-r-20x text-primary disabled">
                                <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="text-left m-b-20x">
                        <div class="flex flex-alignCenter">
                            <div class="text-primary font-size-md m-r-20x">Gift package+＄4.5(optional)</div>
                            <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                        </div>
                    </fieldset>
                    <fieldset class="text-left m-b-20x">
                        <div class="flex flex-alignCenter">
                            <span class="text-primary font-size-md m-r-20x">Qty:</span>
                            <div class="btn-group flex" id="item-count">
                                <div class="btn btn-cartCount btn-xs" data-item="minus">
                                    <i class="iconfont icon-minus font-size-lg"></i>
                                </div>
                                <div class="btn btn-cartCount btn-md font-size-base" data-num="num">2</div>

                                <div class="btn btn-cartCount btn-xs" data-item="add">
                                    <i class="iconfont icon-add font-size-lg"></i>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <hr class="hr-common">
                    <div class="text-center p-t-15x p-b-10x"><a href="#"
                                                                class="btn btn-block btn-primary btn-lg btn-addToBag">Add
                            to Bag</a></div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="container m-t-30x">
    <span class="sanBold font-size-md p-x-20x">Designer:</span>
  <span class="p-r-10x"><img class="img-circle" src="/images/icon/apple-touch-icon.png" width="40" height="40"
                             alt=""></span>
    <span class="sanBold text-main">Vivian</span>
</div>

<div class="container m-t-30x">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link font-size-md active" href="#Descripyion" data-toggle="tab">Descripyion</a>
        </li>
        <li class="nav-item">
            <a class="nav-link font-size-md" href="#Free" data-toggle="tab">Free Shipping & Free Return</a>
        </li>
    </ul>
    <div class="tab-content bg-white p-a-20x">
        <div class="tab-pane text-primary active" id="Descripyion">
            <p class="m-b-0">111 Yueqing Yang is an international fashion designer whose collections focus on the use of
                almost totally abandoned traditional craftsmanship techniques combined with modern inspirations. Her
                work has
                been celebrated in fashion festivals and museums in London, Beijing and Shanghai.</p>
        </div>
        <div class="tab-pane text-primary" id="Free">
            <p class="m-b-0">222 Yueqing Yang is an international fashion designer whose collections focus on the use of
                almost totally abandoned traditional craftsmanship techniques combined with modern inspirations. Her
                work has
                been celebrated in fashion festivals and museums in London, Beijing and Shanghai.</p>
        </div>
    </div>
</div>

<div class="container m-t-30x m-b-40x">
    <h4 class="helveBold text-main p-l-10x">You May Also Like</h4>
    <div class="row p-t-20x">
        <div class="col-md-3 col-xs-6">
            <div class="productList-item">
                <div class="image-container">
                    <img class="img-fluid" src="/images/product/product.jpg" alt="商品的名称">
                </div>
                <div class="price-caption helveBold">
                    <div class="text-center font-size-md text-primary">New Rings</div>
                    <div class="text-center">
                        <span class="font-size-md text-primary p-r-5x">$199.95</span>
                        <span class="font-size-base text-common text-throughLine">$299.95</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-6">
            <div class="productList-item">
                <div class="image-container">
                    <img class="img-fluid" src="/images/product/product.jpg" alt="商品的名称">
                </div>
                <div class="price-caption helveBold">
                    <div class="text-center font-size-md text-primary">New Rings</div>
                    <div class="text-center">
                        <span class="font-size-md text-primary p-r-5x">$199.95</span>
                        <span class="font-size-base text-common text-throughLine">$299.95</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-6">
            <div class="productList-item">
                <div class="image-container">
                    <img class="img-fluid" src="/images/product/product.jpg" alt="商品的名称">
                </div>
                <div class="price-caption helveBold">
                    <div class="text-center font-size-md text-primary">New Rings</div>
                    <div class="text-center">
                        <span class="font-size-md text-primary p-r-5x">$199.95</span>
                        <span class="font-size-base text-common text-throughLine">$299.95</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-6">
            <div class="productList-item">
                <div class="image-container">
                    <img class="img-fluid" src="/images/product/product.jpg" alt="商品的名称">
                </div>
                <div class="price-caption helveBold">
                    <div class="text-center font-size-md text-primary">New Rings</div>
                    <div class="text-center">
                        <span class="font-size-md text-primary p-r-5x">$199.95</span>
                        <span class="font-size-base text-common text-throughLine">$299.95</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center m-y-30x"><a class="btn btn-block btn-gray btn-lg btn-seeMore" href="#">See more of all</a>
    </div>
    <div class="loading" style="display: none">
        <div class="loader">
        </div>
    </div>
</div>

<!-- footer start -->
@include('footer')
<!-- footer end -->

</body>
<script src="/scripts/vendor.js"></script>
<script src="/scripts/common.js"></script>
</html>
