@include('header')

<!--订单成功主体内容-->
<section class="m-y-40x">
    <div class="container bg-white text-center">
        <div class="order_comfirmed_content">
            <img src="/images/icon/ok.png">
            <h4 class="helveBold m-b-20x m-t-40x text-main">Order Comfirmed</h4>
            <p class="text-primary font-size-md">
                <span>A confirmation email has been sent to: </span><br>
                <span class="sanBold">{{Session::get('user.login_email')}}</span>
            </p>
            <p>You can track
                <a href="@if(!empty($order))/orderdetail/{{$order['sub_order_no']}}@else /orderlist @endif" class="text-link">your order</a>
                at any time by visting the Order tab from the PROFILE menu
            </p>
            <a href="/daily" class="btn btn-block btn-primary btn-lg btn-320 m-t-40x">Continue Shopping</a>
        </div>
    </div>
</section>

@include('footer')