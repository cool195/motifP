@include('header')
<!--内容-->
<div class="container">
    <div class="content-wrap">
        <h2 class="helveBold text-main font-size-lxx m-b-20x m-x-20x">Contact Service</h2>
        <div class="bg-white content box-shadow">
            <form method="post" id="form-askQuestion" action="/askshopping">
                <input type="hidden" class="form-control contrlo-lg text-primary" name="id" value="{{$id}}">
                <input type="hidden" class="form-control contrlo-lg text-primary" name="skiptype" value="{{$skiptype}}">
                <input type="text" class="form-control contrlo-lg text-primary" id="email" name="email" value="{{Session::get('user.login_email')}}"><br/>
                <textarea class="form-control contrlo-lg text-primary" name="content" id="content"></textarea>
                <br/>
                <div class="row m-b-20x">
                    <div class="text-right p-x-30x p-y-10x">
                        <a  class="btn btn-primary btn-lg btn-200" href="{{Session::has('referer') ? Session::get('referer') : '/orderlist'}}">Cancel</a>
                        <div class="btn btn-primary btn-lg btn-200" data-role="submit" data-spu="123" id="askSend">Send</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@include('footer')
