<footer>
    <div class="container">
            <div class="row footer-row">
                <div class="col-md-3 verticalHr">
                    <div class="bigNoodle font-size-lx m-b-5x">CONNECT WITH US</div>
                    <div>
                        <a href="https://www.facebook.com/motifme" target="_blank" class="p-r-10x text-primary">
                            <i class="iconfont icon-facebook2 footer-icon"></i>
                        </a>
                        <a href="https://www.instagram.com/motifme/" target="_blank" class="p-r-10x text-primary">
                            <i class="iconfont icon-ins2 footer-icon"></i>
                        </a>
                        <a href="https://www.pinterest.com/motifme/" target="_blank" class="p-r-10x text-primary">
                            <i class="iconfont icon-pin2 footer-icon"></i>
                        </a>
                    </div>
                </div>
                <div class="col-md-3 p-l-40x">
                    <div class="bigNoodle font-size-lx m-b-5x">MOTIF</div>
                    <ul class="list-group">
                        <li class="list-group-item font-size-sm"><a href="/aboutmotif">OUR STORY</a></li>
                        <li class="list-group-item font-size-sm"><a href="/">IN THE PRESS</a></li>
                        <li class="list-group-item font-size-sm"><a href="/">AFFILIATE PROGRAM</a></li>
                    </ul>
                </div>
                <div class="col-md-2">
                    <div class="bigNoodle font-size-lx m-b-5x">HELP</div>
                    <ul class="list-group">
                        <li class="list-group-item font-size-sm"><a href="/contactus">CONTACT US</a></li>
                        <li class="list-group-item font-size-sm"><a href="/faq">FAQ</a></li>
                        <li class="list-group-item font-size-sm"><a href="/privacypolicy">SHIPPING POLICY</a></li>
                        <li class="list-group-item font-size-sm"><a href="/">RETURNS</a></li>
                        <li class="list-group-item font-size-sm"><a href="/termsconditions">TERMS & CONDITIONS</a></li>
                        <li class="list-group-item font-size-sm"><a href="/privacynotice">PRIVACY NOTICE</a></li>

                    </ul>
                </div>
                <div class="col-md-4">
                    <div class="text-right">
                        <input class="contrlo-lg text-primary input-search font-size-sm" placeholder="Looking for something specific?" type="text">
                        <a class="btn btn-primary bigNoodle font-size-lx btn-search">SEARCH</a>
                    </div>
                </div>
            </div>
        </div>

    @if(!isset($CartCheck))
    <!-- 固定 弹框订阅 -->
        <div class="redeem-fixed p-y-10x p-x-20x">GET 15% OFF YOUR FIRST ORDER!</div>
    @endif
</footer>

<div id="top">
    <div class="btn btn-top btn-circle p-a-5x">
        <i class="iconfont icon-top font-size-lx text-white"></i>
    </div>
</div>


<!-- 邮件订阅 弹出框 -->
<div class="remodal modal-content remodal-lg redeem-content" data-remodal-id="redeem-modal">
    <div class="row m-a-0">
        <div class="col-md-6 p-a-0">
            <img src="{{config('runtime.Image_URL')}}/images/daily/redeem_pic.png" class="img-fluid">
        </div>
        <form id="subscribe" action="" method="" class="redeem-leftWrapper">
            <div class="col-md-6 col-xs-6">
                <div class="p-a-30x">
                    <i class="iconfont icon-cross font-size-xs redeem-close" data-remodal-action="close"></i>
                    <div class="text-left p-b-20x">
                        <div class="subs-tit bigNoodle">GET (MOTIF)ATED</div>
                        <div class="openSans font-size-lg subs-subTit">Subscribe and enjoy 15% off your first order
                        </div>
                    </div>
                    <input type="text" name="name" placeholder="Name" class="m-b-10x subscribe-name">
                    <div class="m-b-10x">
                        <div><input type="text" name="email" placeholder="Email" class="subscribe-email"></div>
                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                            <span class="font-size-base"></span>
                        </div>
                    </div>
                    <div class="subs-btnText bigNoodle redeem-btn redeem-enter disabled">ENTER</div>
                </div>
            </div>
        </form>
        <div class="col-md-6 col-xs-6 redeem-rightWrapper hidden">
            <div class="p-a-30x">
                <i class="iconfont icon-cross font-size-xs redeem-close" data-remodal-action="close"></i>
                <div class="text-left p-b-20x">
                    <div class="subs-tit bigNoodle">WELCOME!</div>
                    <div class="openSans font-size-lg subs-subTit">
                        <span>Here’s your 15% off promo code! You have 48 hours left to use it  on your purchase.</span>
                        <div class="p-t-10x">Happy Shopping!</div>
                    </div>
                </div>
                <div class="subs-btnText bigNoodle m-b-10x redeem-code">MOTIFATED15</div>
                <a href="javascript:;" class="subs-btnText bigNoodle redeem-btn"  data-remodal-action="close">SHOW ME THE GOODS</a>
            </div>
        </div>

    </div>
</div>
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/card.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/common.js{{config('runtime.V')}}"></script>
@if (env('APP_ENV') == 'production')
<script src="{{config('runtime.CLK_URL')}}/wl.js"></script>
<!-- Google Tag Manager -->
<script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K9J99M');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9J99M"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

@endif
</body>
</html>