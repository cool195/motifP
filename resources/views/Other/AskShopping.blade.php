@include('header')
<!--内容-->
<div class="container body-container">
    <div class="content-wrap">
        <h2 class="bigNoodle m-b-20x text-center leftMeun-title">Contact Service</h2>
        <hr class="hr-black m-t-0">
        <div class="bg-white content">
            <form method="post" id="form-askQuestion" action="/askshopping">
                <input type="hidden" class="form-control contrlo-lg text-primary" name="id" value="{{$id}}">
                <input type="hidden" class="form-control contrlo-lg text-primary" name="skiptype" value="{{$skiptype}}">
                <input type="text" class="form-control contrlo-lg text-primary" id="email" name="email" value="{{Session::get('user.login_email')}}"><br/>
                <textarea class="form-control contrlo-lg text-primary" name="content" id="content"></textarea>
                <br/>
                <div class="row m-b-20x">
                    <div class="text-right p-x-10x p-y-10x">
                        <a  class="btn btn-primary btn-200 font-size-lxx text-white m-r-20x bigNoodle" href="{{Session::has('referer') ? Session::get('referer') : '/order/orderlist'}}">Cancel</a>
                        <div class="btn btn-200 bigNoodle font-size-lxx btn-green" data-role="submit" data-spu="123" id="askSend">Send</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@include('footer')
