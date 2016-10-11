@include('user.head', ['title' => "Login"])
<!-- 内容 -->
<section class="bg-white">
    <div class="helve login-title text-center text-main p-y-20x">Sign in with Motif Account</div>
    <div class="row m-a-0">
        <div class="col-lg-6 p-r-0 login-ad-container"></div>
        <div class="col-lg-6 login-container">
            <!-- 登录 -->
            <div class="login-content">
                <form id="login">
                    <fieldset class="p-t-15x login-text">
                        <div class="login-text">
                            <input type="text" class="input-login form-control contrlo-lg text-primary login-email" name="email" placeholder="Email">
                            <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                        </div>
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                            <span class="font-size-base">Please select size !</span>
                        </div>
                    </fieldset>
                    <fieldset class="p-t-15x login-text">
                        <div class="login-text">
                            <input type="password" class="input-login form-control contrlo-lg text-primary login-pw" name="pw" placeholder="Password">
                            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
                        </div>
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                            <span class="font-size-base">Please select size !</span>
                        </div>
                    </fieldset>
                    <input type="hidden" name="referer" value="{{$referer}}">
                </form>
                <div class="p-t-30x">
                    <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                        <span class="font-size-base">Please select size !</span>
                    </div>
                    <div class="btn btn-primary btn-lg btn-block" data-role="login-submit">Sign in</div>
                </div>
                <div class="p-y-15x text-center">
                    <a class="text-link btn-forgotPwd" href="javascript:void(0)">Forgot password?</a>
                </div>
                <div class="text-center login-or">
                    <hr class="hr-login m-a-0">
                    <span class="p-x-5x">or</span>
                </div>
                <div class="p-t-15x">
                    <a class="btn btn-block btn-lg btn-facebook" id="facebookLogin">
                        <i class="iconfont icon-facebook-o icon-size-md"></i> Sign in with Facebook
                    </a>
                    <a class="btn btn-block btn-lg btn-google m-t-15x" id="googleLogin">
                        <i class="iconfont icon-google-o icon-size-md"></i> Sign in with Google
                    </a>
                </div>
                <div class="p-y-15x text-center">
                    <div class="text-main">Don’t have an account? <a class="text-link" href="/register?referer={{$referer}}">Sign up</a></div>
                </div>
            </div>

            <!-- Forget Password -->
            <div class="restPwd-content hidden">
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
                    <a class="text-link btn-backLogin" href="#">Back to Sign in</a>
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
</section>

@include('user.foot')

</body>
<script src="/scripts/vendor.js"></script>
<script src="https://apis.google.com/js/api:client.js"></script>
<script src="/scripts/common.js"></script>

</html>
