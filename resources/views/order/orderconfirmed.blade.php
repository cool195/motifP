@include('header',['title'=>'Order Confirmed'])

@if(!empty($order))
    <script type="text/javascript">
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            'ecommerce': {
                'purchase': {
                    'actionField': {
                        'id': '{{ $order['sub_order_no'] }}',
                        'affiliation': 'Online Store',
                        'revenue': '{{ number_format($order['total_amount'] / 100, 2) }}',
                        'tax': '{{ number_format($order['tax_amount']) }}',
                        'shipping': '{{ number_format($order['freight_amount'] / 100, 2) }}',
                        'coupon': ''
                    },
                    'products': [
                            @foreach($order['lineOrderList'] as $lineOrder)
                        {
                            'name': '{{ $lineOrder['main_title'] }}',
                            'id': '{{ $lineOrder['spu'] }}',
                            'price': '{{ number_format($lineOrder['sale_price'] / 100, 2) }}',
                            'brand': 'Motif PC',
                            'category': '',
                            'quantity': '{{ $lineOrder['sale_qtty'] }}'
                        },
                        @endforeach
                    ]
                }
            }
        });
    </script>
    @endif

<script>
    var totalPrice="{{ number_format($order['total_amount'] / 100, 2) }}";
    var content_ids = [@foreach($order['lineOrderList'] as $key => $product) @if(0 == $key)'{{$product['spu']}}' @else ,'{{$product['spu']}}' @endif @endforeach];
</script>
<!--订单成功主体内容-->
<section class="body-container m-y-40x">
    <div class="container bg-white text-center">
        <div class="order_comfirmed_content">
            <i class="iconfont m-t-40x submit-ok"></i>
            <h4 class="bigNoodle m-b-20x m-t-40x font-size-llxx">Order Confirmed</h4>
            <p class="font-size-md">
                <span>A confirmation email has been sent to: </span><br>
                <span class="avenirBold">{{Session::get('user.login_email')}}</span>
            </p>
            <p class="font-size-sm">You can track
                <a href="@if(!empty($order))/order/orderdetail/{{$order['sub_order_no']}}@else /order/orderlist @endif" class="text-green">your order</a>
                at any time by visting the Order tab from the PROFILE menu
            </p>
        </div>
    </div>
</section>
@if(isset($order) && !empty($order))
<!-- invite friend -->
<section class="m-b-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content p-y-40x">
            <div class="invite-title helveBold">Share Motif with your friends</div>
            <p class="p-y-20x text-primary font-size-md">They get $20 off, and you will too after their first purchase.
                <a href="/saleinfo" class="text-link text-underLine">Details</a></p>
            <div class="flex flex-alignCenter">
                <span class="sanBold font-size-md p-r-15x">Invite Code:</span>
                <div class="input-group invite-input p-r-30x">
                    <div class="form-control" id="inviteCode" aria-describedby="btn-copy">{{$code}}</div>
                    <span class="input-group-addon text-primary font-size-md copy" id="btn-copy">Copy</span>
                </div>
                <div class="p-l-30x"><span class="btn btn-primary btn-md" id="btn-inviteFriend">Invite Friends</span></div>
            </div>
        </div>
    </div>
</section>
@endif

<div class="remodal modal-content remodal-md p-y-20x" data-remodal-id="sharemodal">
    <span class="font-size-md sanBold p-r-15x">Invite with:</span>
    {{--<a href="#" class="btn btn-circle btn-shareEmail m-r-20x p-a-5x"><i class="iconfont icon-email-o font-size-lxx text-white"></i></a>--}}
    <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareFacebook m-r-20x p-a-5x"><i class="iconfont icon-facebook-o font-size-lxx text-white"></i></a>
    <a href="javascript:window.open('http://twitter.com/home?status='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareTwitter m-r-20x p-a-5x"><i class="iconfont icon-twitter-o font-size-lxx text-white"></i></a>
    {{--<a href="#" class="btn btn-circle btn-shareGoogle m-r-20x p-a-5x"><i class="iconfont icon-google-o font-size-lxx text-white"></i></a>--}}
</div>
<img src='{{config('runtime.CLK_URL')}}/log.gif?time={{time()}}&t=order.100001&m=PC_M2016-1&pin={{Session::get('user.pin')}}&uuid={{Session::get('user.uuid')}}&v={"orderno":"{{$order['sub_order_no']}}","expid":0,"version":"1.0.1","src":"PC"}' hidden>
@include('footer')
<script src="{{config('runtime.Image_URL')}}/scripts/clipboard.min.js"></script>
<script type="text/javascript">
    var clipboard = new Clipboard('.copy', {
        text: function() {
            return '{{$code}}';
        }
    });
    clipboard.on('success', function(e) {
        $('#btn-copy').html('Code Copied');
        setTimeout(function () {
            $('#btn-copy').html('Copy');
        }, 1500);
    });
    clipboard.on('error', function(e) {
        $('#btn-copy').html('Copy');
    });

</script>