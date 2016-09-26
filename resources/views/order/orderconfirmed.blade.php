@include('header')

<!--订单成功主体内容-->
<section class="m-t-40x">
    <div class="container bg-white text-center">
        <div class="order_comfirmed_content">
            <img src="{{config('runtime.Image_URL')}}/images/icon/ok.png">
            <h4 class="helveBold m-b-20x m-t-40x text-main">Order Confirmed</h4>
            <p class="text-primary font-size-md">
                <span>A confirmation email has been sent to: </span><br>
                <span class="sanBold">{{Session::get('user.login_email')}}</span>
            </p>
            <p>You can track
                <a data-impr='http://clk.motif.me/log.gif?t=order.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"orderno":{{$order['sub_order_no']}},”expid":0,"version":"1.0.1,"src":"PC"}'
                   href="@if(!empty($order))/order/orderdetail/{{$order['sub_order_no']}}@else /order/orderlist @endif" class="text-link">your order</a>
                at any time by visting the Order tab from the PROFILE menu
            </p>
        </div>
    </div>
</section>
<!-- invite friend -->
<section class="m-t-20x m-b-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content p-y-40x">
            <div class="invite-title helveBold">Share Promotion Code with your friends</div>
            <p class="p-y-20x text-primary font-size-md">Both you and your friends will get $20 off after their first purchase!
                <a href="/saleinfo" class="text-link text-underLine">Detail</a></p>
            <div class="flex flex-alignCenter">
                <span class="sanBold font-size-md p-r-15x">Invite Code:</span>
                <div class="input-group invite-input p-r-30x">
                    <input type="text" class="form-control" id="inviteCode" placeholder="{{$code}}" value="{{$code}}" aria-describedby="btn-copy">
                    <span class="input-group-addon text-primary font-size-md" id="btn-copy" onclick="copyinput();">Copy</span>
                </div>
                <div class="p-l-30x"><span class="btn btn-primary btn-md" id="btn-inviteFriend">Invite Friends</span></div>
            </div>
        </div>
    </div>
</section>

<div class="remodal modal-content remodal-md p-y-20x" data-remodal-id="sharemodal">
    <span class="font-size-md sanBold p-r-15x">Invite with:</span>
    {{--<a href="#" class="btn btn-circle btn-shareEmail m-r-20x p-a-5x"><i class="iconfont icon-email-o font-size-lxx text-white"></i></a>--}}
    <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareFacebook m-r-20x p-a-5x"><i class="iconfont icon-facebook-o font-size-lxx text-white"></i></a>
    <a href="javascript:window.open('http://twitter.com/home?status='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareTwitter m-r-20x p-a-5x"><i class="iconfont icon-twitter-o font-size-lxx text-white"></i></a>
    {{--<a href="#" class="btn btn-circle btn-shareGoogle m-r-20x p-a-5x"><i class="iconfont icon-google-o font-size-lxx text-white"></i></a>--}}
</div>

@include('footer')
<script type="text/javascript">
    function copyinput()
    {
        var input=document.getElementById("inviteCode");//input的ID值
        input.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
    }
</script>