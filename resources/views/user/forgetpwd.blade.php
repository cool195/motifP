@include('user.head', ['title' => "Forget Password"])
<!-- 内容 -->
<section class="bg-white overhidden">
    <div class="row m-x-0 bg-login">
        <div class="container login-container">
            <div class="row">
                <div class="col-lg-6"></div>
                <div class="col-lg-6 bg-white">
                    <div class="login-content">
                        <h4 class="p-t-30x m-b-30x sanBold text-main">FORGET PASSWORD?</h4>
                        <div class="m-a-40x">&nbsp;</div>
                        <div class="m-b-20x">Enter the email address associated with your Motif account, then click Reset
                            password.
                            We’ll send you a link to reset your password.
                        </div>
                        <form id="forgetPassword">
                            <fieldset class="p-t-15x login-text">
                                <div class="login-text">
                                    <input type="text" class="input-login form-control contrlo-lg text-primary forget-email" name="email" placeholder="Email">
                                    <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                                </div>
                                <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Please select size !</span>
                                </div>
                            </fieldset>
                        </form>
                        <div class="p-t-30x">
                            <div class="btn btn-primary btn-lg btn-block" data-role="forget-submit">Reset password</div>
                        </div>
                        <div class="p-y-15x text-center">
                            <a class="text-link" href="/login">Back to Sign in</a>
                        </div>
                        <div class="text-center login-or">
                            <hr class="hr-login m-a-0">
                        </div>
                        <div class="p-y-20x text-center">
                            <div class="text-main">Don’t have an account? <a class="text-link" href="/register">Sign up</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-loginright">&nbsp;</div>
        </div>

    </div>
</section>

@include('user.foot')

</body>
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/common.js{{config('runtime.V')}}"></script>

</html>
