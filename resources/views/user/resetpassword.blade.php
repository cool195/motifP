{{--@include('user.head', ['title' => "Reset Password"])--}}
@include('header', ['title' => 'Reset Password', 'cid' =>$cid, 'page' => 'Reset Password'])
<!-- 内容 -->
<section class="bg-white overhidden body-container">
    <div class="container">
        <div class="login-container text-center p-t-20x">
            <div class="login-content p-y-20x">
                <div class="m-a-40x">&nbsp;</div>
                <div class="p-a-10x">&nbsp;</div>
                <form id="reset">
                    <fieldset class="p-t-15x login-text">
                        <div class="login-text">
                            <input type="password"
                                   class="input-login form-control contrlo-lg text-primary reset-pw" name="pw"
                                   placeholder="NEW PASSWORD">
                            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
                        </div>
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                            <span class="font-size-sm">Please select size !</span>
                        </div>
                    </fieldset>
                    <fieldset class="p-y-15x login-text">
                        <div class="login-text">
                            <input type="password"
                                   class="input-login form-control contrlo-lg text-primary reset-lastpw"
                                   name="lastpw" placeholder="CONFIRM NEW PASSWORD">
                            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
                        </div>
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                            <span class="font-size-sm">Please select size !</span>
                        </div>
                    </fieldset>
                    <input hidden name="tp" value="{{$tp}}">
                    <input hidden name="sig" value="{{$sig}}">
                </form>
                <div class="p-t-30x">
                    <div class="btn btn-primary btn-block bigNoodle font-size-lxx" data-role="reset-submit">Submit</div>
                </div>
                <div class="m-a-40x">&nbsp;</div>
                <div class="p-a-10x">&nbsp;</div>
            </div>
        </div>
    </div>



    {{--<div class="row m-x-0 bg-login">--}}
        {{--<div class="container login-container">--}}
            {{--<div class="row">--}}
                {{--<div class="col-lg-6"></div>--}}
                {{--<div class="col-lg-6 bg-white">--}}
                    {{--<div class="login-content">--}}
                        {{--<h4 class="p-t-30x m-b-15x sanBold text-main">RESET PASSWORD</h4>--}}
                        {{--<div class="m-a-40x">&nbsp;</div>--}}
                        {{--<form id="reset">--}}
                            {{--<fieldset class="p-t-15x login-text">--}}
                                {{--<div class="login-text">--}}
                                    {{--<input type="password"--}}
                                           {{--class="input-login form-control contrlo-lg text-primary reset-pw" name="pw"--}}
                                           {{--placeholder="New Password">--}}
                                    {{--<i class="iconfont icon-show font-size-lg input-show text-common off"></i>--}}
                                {{--</div>--}}
                                {{--<div class="warning-info off flex flex-alignCenter text-warning p-t-5x">--}}
                                    {{--<i class="iconfont icon-caveat icon-size-md p-r-5x"></i>--}}
                                    {{--<span class="font-size-base">Please select size !</span>--}}
                                {{--</div>--}}
                            {{--</fieldset>--}}
                            {{--<fieldset class="p-t-15x login-text">--}}
                                {{--<div class="login-text">--}}
                                    {{--<input type="password"--}}
                                           {{--class="input-login form-control contrlo-lg text-primary reset-lastpw"--}}
                                           {{--name="lastpw" placeholder="Confirm New Password">--}}
                                    {{--<i class="iconfont icon-show font-size-lg input-show text-common off"></i>--}}
                                {{--</div>--}}
                                {{--<div class="warning-info off flex flex-alignCenter text-warning p-t-5x">--}}
                                    {{--<i class="iconfont icon-caveat icon-size-md p-r-5x"></i>--}}
                                    {{--<span class="font-size-base">Please select size !</span>--}}
                                {{--</div>--}}
                            {{--</fieldset>--}}
                            {{--<input hidden name="tp" value="{{$tp}}">--}}
                            {{--<input hidden name="sig" value="{{$sig}}">--}}
                        {{--</form>--}}
                        {{--<div class="p-t-30x">--}}
                            {{--<div class="btn btn-primary btn-lg btn-block" data-role="reset-submit">Submit</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="bg-loginright">&nbsp;</div>--}}
        {{--</div>--}}

    {{--</div>--}}
</section>

@include('user.foot')

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
