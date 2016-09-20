@include('header')

<!-- invite -->
<section>
    <div class="bannerSwiper-container invite-banner">
        <div class="swiper-wrapper">
            <a href="/shopping/0" class="swiper-slide daily-banner" style="background-image:url({{config('runtime.Image_URL')}}/images/banner/share-banner.jpg)">
                <div class="banner-content">
                    <div class="text-center helveBold p-b-40x text-white inviteBanner-Title">
                        Enjoy $20 jewelry credit from your referral
                    </div>
                    <div class="text-center p-y-20x text-white inviteBanner-subTitle">
                        Motif is the one place to find exclusive fashion accessories<br/>
                        designed by the world’s top fashion bloggers, Instagrammers,<br/>
                        and digital influences
                    </div>
                    <div class="text-center p-y-20x text-white inviteBanner-subTitle">
                        Claim your credit with promo code: <span class="text-link inviteBanner-code">HISS</span>
                    </div>
                    <div class="text-center">
                        <span href="#" class="btn btn-itemProperty btn-lg btn-200 active clickcode" data-code="123">Sign Up Now</span>
                    </div>
                </div>
            </a>
        </div>
    </div>
</section>

<div class="m-t-40x">
    <div class="text-center text-main helveBold inviteBanner-subTitle">How It Works</div>
    <div class="container p-y-30x">
        <div class="row">
            <div class="col-md-4 p-x-20x">
                <div class="text-center"><i class="iconfont icon-user text-main inviteBanner-subTitle"></i></div>
                <div class="text-center font-size-lx text-main p-t-20x">Sign up & Register.</div>
            </div>
            <div class="col-md-4 p-x-20x">
                <div class="text-center"><i class="iconfont icon-ticket text-main inviteBanner-subTitle"></i></div>
                <div class="text-center font-size-lx text-main p-t-20x">Enter promo code when you check to receive $20 odd your purchase.</div>
            </div>
            <div class="col-md-4 p-x-20x">
                <div class="text-center"><img src="{{config('runtime.Image_URL')}}/images/icon/icon-InviteFriends.png" alt=""></div>
                <div class="text-center font-size-lx text-main p-t-20x">Share “Get $20 Off” from your Motif account profile to get even more credit.</div>
            </div>
        </div>
    </div>
</div>
<div class="p-y-20x bg-white box-outShadow">
    <div class="text-center text-main helveBold font-size-lxx">FREE US SHIPPING + EASY RETURNS</div>
</div>

@include('footer')

<script type="text/javascript">
    $('.clickcode').on('click',function () {
        setCookie('sharecode', $(this).data('code'));
        window.location.href = '/register?url=%2Fpromocode';
    })

    function setCookie(name, value) {
        var Time = 24;
        var exp = new Date();
        exp.setTime(exp.getTime() + Time * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString();
    }
</script>



