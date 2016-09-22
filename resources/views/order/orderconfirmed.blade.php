@include('header')

<!--订单成功主体内容-->
<section class="m-y-40x">
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
            <a href="/daily" class="btn btn-primary btn-lg btn-320 m-t-40x">Continue Shopping</a>
        </div>
    </div>
</section>

@include('footer')