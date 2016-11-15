<footer>
    <div class="container p-x-40x">
        <div class="text-center m-b-40x p-t-10x">
            <a href="/daily"><img class=""
                                  src="{{config('runtime.Image_URL')}}/images/logo/logo-white.png{{config('runtime.V')}}"
                                  alt="logo" srcset="{{config('runtime.Image_URL')}}/images/logo/logo-white@2x.png 2x"></a>
        </div>
        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="list-group text-white m-b-20x">
                    <div class="sanBold font-size-sm p-b-20x">Motif</div>
                    <a class="list-group-item font-size-xs" href="/aboutmotif">About Motif</a>
                    <a class="list-group-item font-size-xs" href="/privacynotice">Privacy Notice</a>
                    <a class="list-group-item font-size-xs" href="/termsconditions">Terms & Conditions</a>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="list-group text-white m-b-20x">
                    <div class="sanBold font-size-sm m-b-20x">Help & Service</div>
                    <a class="list-group-item font-size-xs text-white" href="/contactus">Contact Us</a>
                    <a class="list-group-item font-size-xs text-white" href="/faq">FAQ</a>
                    {{--<a class="list-group-item font-size-xs text-white" href="/payments">Payments</a>--}}
                    <a class="list-group-item font-size-xs text-white" href="/template/23">Shipping & Returns</a>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="list-group text-white m-b-20x">
                    <div class="sanBold font-size-sm m-b-20x">Download</div>
                    <div class="list-group-item">
                        <a href="https://itunes.apple.com/us/app/id1125850409" target="_blank" class="btn btn-black">
                            <img class="img-fluid m-x-auto"
                                 src="{{config('runtime.Image_URL')}}/images/icon/icon-appStore.png{{config('runtime.V')}}"
                                 srcset="{{config('runtime.Image_URL')}}/images/icon/icon-appStore@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/icon/icon-appStore@3x.png{{config('runtime.V')}} 3x">
                        </a>
                    </div>
                    <div class="list-group-item">
                        <a href="https://play.google.com/store/apps/details?id=me.motif.motif" target="_blank" class="btn btn-black">
                            <img class="img-fluid m-x-auto"
                                 src="{{config('runtime.Image_URL')}}/images/icon/icon-googlePlay.png{{config('runtime.V')}}"
                                 srcset="{{config('runtime.Image_URL')}}/images/icon/icon-googlePlay@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/icon/icon-googlePlay@3x.png{{config('runtime.V')}} 3x">
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="list-group text-white m-b-20x">
                    <div class="sanBold font-size-sm m-b-20x">Follow Us</div>
                    <a href="https://www.facebook.com/motifme" target="_blank" class="btn btn-share btn-circle m-r-20x">
                        <i class="iconfont icon-facebook1 footer-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/motifme/" target="_blank" class="btn btn-share btn-circle m-r-20x">
                        <i class="iconfont icon-instagram1 footer-icon"></i>
                    </a>
                    <a href="https://www.pinterest.com/motifme/" target="_blank" class="btn btn-share btn-circle m-r-20x">
                        <i class="iconfont icon-pinterest1 footer-icon"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="p-y-10x text-center">
            <div class="sanBold font-size-sm m-b-20x text-white">Payment Accepted</div>
            <div>
                <img class="m-x-10x"
                     src="{{config('runtime.Image_URL')}}/images/payment/payicon-paypal-43.png"
                     srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-paypal-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-paypal-43@3x.png{{config('runtime.V')}} 3x">
                <img class="m-x-10x"
                     src="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-43.png"
                     srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-mastercard-43@3x.png{{config('runtime.V')}} 3x">
                <img class="m-x-10x"
                     src="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-43.png"
                     srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-jcb-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-jcb-43@3x.png{{config('runtime.V')}} 3x">
                <img class="m-x-10x"
                     src="{{config('runtime.Image_URL')}}/images/payment/payicon-american-43.png"
                     srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-american-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-american-43@3x.png{{config('runtime.V')}} 3x">
                <img class="m-x-10x"
                     src="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-43.png"
                     srcset="{{config('runtime.Image_URL')}}/images/payment/payicon-visa-43@2x.png{{config('runtime.V')}} 2x, {{config('runtime.Image_URL')}}/images/payment/payicon-visa-43@3x.png{{config('runtime.V')}} 3x">
            </div>
        </div>
        <div class="p-t-10x m-t-10x text-center text-white font-size-xs text-Copyright">Copyright © 2016 Motif Group
            LLC. All rights reserved.
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
                <a href="/shopping/0" class="subs-btnText bigNoodle redeem-btn">SHOW ME THE GOODS</a>
            </div>
        </div>

    </div>
</div>
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/card.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/common.js{{config('runtime.V')}}"></script>
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

<script>
    !function (f, b, e, v, n, t, s) {
        if (f.fbq)return;
        n = f.fbq = function () {
            n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq)f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window,
            document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '1777634412449097');
    fbq('track', "PageView");</script>
<noscript><img height="1" width="1" style="display:none"
               src="https://www.facebook.com/tr?id=1777634412449097&ev=PageView&noscript=1"
    /></noscript>

</body>
</html>