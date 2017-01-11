{{--@include('user.head', ['title' => "Forget Password"])--}}
@include('header', ['title' => 'Forget Password', 'cid' =>$cid, 'page' => 'Forget Password'])
<!-- 内容 -->
<section class="bg-white overhidden body-container">
    <div class="container">
        <div class="login-container text-center p-t-20x">
            <div class="login-content p-y-20x">
                <div class="m-a-40x">&nbsp;</div>
                <div class="avenirMedium font-size-sm m-b-20x">Enter the email address associated with your Motif<br> account, then click Reset
                    password.We’ll send you a link<br> to reset your password.
                </div>
                <form id="forgetPassword">
                    <fieldset class="p-t-30x m-b-30x login-text">
                        <div class="login-text">
                            <input type="text" class="input-login form-control contrlo-lg text-primary forget-email" name="email" placeholder="EMAIL">
                            <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                        </div>
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                            <span class="font-size-base">Please select size !</span>
                        </div>
                    </fieldset>
                </form>
                <div class="p-t-20x">
                    <div class="btn btn-primary btn-block bigNoodle font-size-lxx" data-role="forget-submit">Reset password</div>
                </div>
                <div class="p-y-10x text-center">
                    <a class="text-green avenirMedium font-size-xs" href="/login">Back to Sign in</a>
                </div>
                <div class="text-center p-t-5x">
                    <hr class="hr-black m-a-0">
                </div>
                <div class="p-y-10x text-center">
                    <div class="avenirMedium font-size-xs p-t-10x m-b-40x">Don’t have an account? <a class="text-green" href="/register">Sign up</a></div>
                </div>

            </div>
        </div>
    </div>
</section>

@include('user.foot')

</body>
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/common.js{{config('runtime.V')}}"></script>

</html>
