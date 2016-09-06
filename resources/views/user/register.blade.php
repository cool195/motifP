@include('user.head', ['title'=>"Register"])
<!-- 内容 -->
<section class="bg-white">
    <div class="helve login-title text-center text-main p-y-20x">Create Your Account</div>
    <div class="register-container">
        <div class="register-content">
            <form id="register">
                <fieldset class="p-t-15x login-text">
                    <div class="login-text">
                        <input type="text" class="input-login form-control contrlo-lg text-primary register-nick" name="nick" placeholder="Your Name">
                        <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                    </div>
                    <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                        <span class="font-size-base">Please select size !</span>
                    </div>
                </fieldset>
                <fieldset class="p-t-15x login-text">
                    <div class="login-text">
                        <input type="text" class="input-login form-control contrlo-lg text-primary register-email" name="email" placeholder="Email">
                        <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                    </div>
                    <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                        <span class="font-size-base">Please select size !</span>
                    </div>
                </fieldset>
                <fieldset class="p-t-15x login-text">
                    <div class="login-text">
                        <input type="password" class="input-login form-control contrlo-lg text-primary register-pw" name="pw" placeholder="Password">
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
                <div class="btn btn-primary btn-lg btn-block" data-role="register-submit">Sign up</div>
            </div>
            <div class="p-y-15x text-center">
                <div class="text-main">By registering, you’ve accepted our <a class="text-link" href="#">Terms & Conditions</a>
                </div>
            </div>
            <div class="text-center login-or">
                <hr class="hr-login m-a-0">
                <span class="p-x-5x">or</span>
            </div>
            <div class="p-t-15x">
                <a class="btn btn-block btn-lg btn-facebook" id="facebookLogin">
                    <i class="iconfont icon-facebook-o icon-size-md"></i> Signin with Facebook
                </a>
                <a class="btn btn-block btn-lg btn-google m-t-15x" id="googleLogin">
                    <i class="iconfont icon-google-o icon-size-md"></i> Sign in with Google
                </a>
            </div>
            <div class="p-y-15x text-center">
                <div class="text-main">Already have an account? <a class="text-link" href="/login">Sign in</a></div>
            </div>
        </div>
    </div>
</section>

@include('user.foot')

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
