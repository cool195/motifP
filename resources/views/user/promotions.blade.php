@include('header',['title'=>'promotions'])

<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container" id="userpromotions" data-status="true">
        <div class="myHome-content">
            @include('user.left', ['title' => 'promotions'])
            <div class="right">
                <div class="rightContent">
                    <!-- Promotions -->
                    <div class="bg-white promotion-content">
                        <div class="bigNoodle text-center leftMeun-title">Promotions</div>
                        <hr class="hr-black m-t-0">
                        <!--新增促销码-->
                        <div class="p-y-20x addPromotionCode disabled">
                            <a href="javascript:void(0)" class="goback-toAdd"><i class="iconfont icon-arrow-left font-size-lx"></i></a>
                            <div class="empty-content">
                                <i class="iconfont icon-ticket"></i>
                                <p class="font-size-llxx bigNoodle m-t-40x">Add New Promotions</p>
                                <div class="addCode-input text-left">
                                    <input type="text" class="form-control contrlo-lg text-primary m-b-5x" name="cps" value="" placeholder="Enter Your Promotions Code Here">
                                    <!--error-->
                                    <span class="warning-info text-warning off">
                                        <i class="iconfont icon-caveat p-r-5x"></i>
                                        <span class="font-size-base invalidText"></span>
                                    </span>
                                </div>

                                <div class="text-center m-t-30x">
                                    <div class="btn btn-baseSize btn-black font-size-llx bigNoodle coupon-apply disabled">APPLY</div>
                                </div>
                            </div>
                        </div>

                        <!-- Coupons and Promotions-->
                        <div class="p-t-20x p-b-40x p-x-5x showPromotionCode">
                            <div class="flex flex-alignCenter flex-fullJustified">
                                <span class="font-size-md avenirBold">COUPONS AND PROMOTIONS</span>
                                <span class="font-size-md pull-right">
                                    <a class="btn-addNewCode">+ Add New Promotion Code</a>
                                </span>
                            </div>
                            <div class="row coupon-list p-t-10x">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<template id="tpl-coupon">
    @{{ each list }}
    <div class="col-md-6">
        <div class="p-a-10x p-y-15x">
            <div class="row promotion-item flex flex-alignCenter active">
                <div class="col-md-8">
                    <div class="text-right p-left p-r-15x p-y-30x font-size-md">
                        <div>@{{ $value.prompt_words }}</div>
                        <span>Expire: @{{ $value.expiry_time }}</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="font-size-llxx text-left avenirBold">@{{ $value.cp_title }}</div>
                </div>
            </div>
        </div>
    </div>
    @{{ /each }}
</template>

@include('footer')
<script>
    function getCookie(name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr != null) {
            $('.showPromotionCode').addClass('disabled');
            $('.addPromotionCode').removeClass('disabled');
            $('.coupon-apply').removeClass('disabled');
            setCookie(name, '');
            return unescape(arr[2]);
        }
        return null;
    }
    function setCookie(name, value) {
        var exp = new Date();
        exp.setTime(0);
        document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString();
    }

    $('input[name="cps"]').val(getCookie('sharecode'))
</script>
