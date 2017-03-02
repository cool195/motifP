
@include('header')
<section class="body-container">
    <div class="container">
            @if(!empty($banner))
                @foreach($banner as $value)
                    @if(0 == $value['banner_show_type'])
                        <a href="@if(1 == $value['banner_skip_type'])/detail/@elseif(2==$value['banner_skip_type'])/collection/@elseif(3==$value['banner_skip_type'])/topic/@elseif(4 == $value['banner_skip_type'])/shop/@endif{{ $value['banner_skip'] }}">
                            <img class="img-fluid img-lazy"
                                 data-original="{{config('runtime.CDN_URL').'/n0/'.$value['img_path']}}"
                                 src="{{env('CDN_Static')}}/images/product/bg-banner@1280.png" alt="">
                        </a>
                    @endif
                @endforeach
            @endif
        <div class="bg-common p-y-40x">
            <div class="text-center m-y-20x flex  flex-justifyCenter">
                    <div class="bigNoodle font-size-llxx">
                        sign up for emails and get 15% off!
                    </div>

                    <form id="subscribe" action="" method="" class="m-l-30x">
                        <div><input name="email" class="text-primary input-email font-size-md p-a-5x subscribe-email" placeholder="Enter email" type="text"></div>
                        <span class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                            <span class="font-size-base"></span>
                        </span>
                    </form>
                    <div class="btn btn-primary p-x-10x bigNoodle font-size-lxx" id="btn-subscribe">SIGN ME UP</div>
            </div>
        </div>
    </div>
</section>

<!-- 邮件订阅 弹出框 -->
<div class="remodal modal-content remodal-lg redeem-content" data-remodal-id="redeem-modal">
    <div class="row m-a-0">
        <div class="col-md-6 p-a-0">
            <img src="{{config('runtime.Image_URL')}}/images/daily/redeem_pic.png" class="img-fluid">
        </div>
        <div class="col-md-6 col-xs-6 redeem-rightWrapper">
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
                <a href="javascript:void(0);" class="subs-btnText bigNoodle redeem-btn"  data-remodal-action="close">SHOW ME THE GOODS</a>
            </div>
        </div>

    </div>
</div>

@include('footer')