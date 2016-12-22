{{--@include('user.head', ['title'=>"Register"])--}}
@include('header', ['title' => 'Register', 'cid' =>$cid, 'page' => 'Register'])
<!-- 内容 -->
<section class="bg-white overhidden body-container">
    <div class="container">
        <div class="login-container text-center p-t-20x">
            <div class="login-content p-y-20x">
                <div class="row">
                    <div class="col-md-6">
                        <a class="bigNoodle login-title font-size-lxx tab-login">LOGIN</a>
                    </div>
                    <div class="col-md-6">
                        <a class="bigNoodle login-title font-size-lxx tab-register active">REGISTER</a>
                    </div>
                </div>

                <!-- 登录信息 -->

                <div class="bigNoodle font-size-llx p-t-30x" id="loginRegister-title">SIGN IN WITH</div>

                <div class="row p-t-10x">
                    <div class="col-md-6">
                        <a class="btn btn-block font-size-lxx text-white btn-loginFackbook" id="facebookLogin"><i class="iconfont icon-facebook2 font-size-lx p-r-5x"></i><span class="bigNoodle">FACEBOOK</span></a>
                    </div>
                    <div class="col-md-6">
                        <a class="btn btn-block font-size-lxx text-white btn-loginGoogle" id="googleLogin"><i class="iconfont icon-google-o font-size-lx p-r-5x"></i><span class="bigNoodle">GOOGLE</span></a>
                    </div>
                </div>

                <div class="login-info">
                    <div class="avenirMedium font-size-xs p-t-10x m-b-40x">Don’t have an account? <a href="javascript:void(0)" class="text-green tab-register">Sign up</a></div>

                    <div class="text-center login-or">
                        <hr class="hr-login m-a-0">
                        <span class="p-x-5x bigNoodle font-size-lxx">or</span>
                    </div>

                    <div class="bigNoodle font-size-llx p-t-5x">SIGN IN WITH EMAIL</div>

                    <form id="login">
                        <fieldset class="p-t-15x login-text">
                            <div class="login-text">
                                <input type="text"
                                       class="input-login form-control text-primary login-email"
                                       name="email" placeholder="EMAIL">
                                <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                            </div>
                            <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                <span class="font-size-sm">Please select size !</span>
                            </div>
                        </fieldset>
                        <fieldset class="p-t-15x login-text">
                            <div class="login-text">
                                <input type="password"
                                       class="input-login form-control text-primary login-pw" name="pw"
                                       placeholder="PASSWORD">
                                <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
                            </div>
                            <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                <span class="font-size-sm">Please select size !</span>
                            </div>
                        </fieldset>
                        <input type="hidden" name="referer" value="{{$referer}}">
                    </form>

                    <div class="p-t-15x">
                        <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                            <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                            <span class="font-size-sm">Please select size !</span>
                        </div>
                        <div class="btn btn-primary btn-block bigNoodle font-size-lxx" data-role="login-submit">Sign in</div>
                    </div>

                    <div class="avenirMedium font-size-xs p-t-10x"><a href="/forgetpassword" class="text-green">Forget your password?</a></div>
                </div>

                <!-- 注册信息 -->
                <div class="register-info active">
                    <div class="avenirMedium font-size-xs p-t-10x m-b-40x">Already have an account? <a href="javascript:void(0)" class="text-green tab-login">Sign in</a></div>

                    <div class="text-center login-or">
                        <hr class="hr-login m-a-0">
                        <span class="p-x-5x bigNoodle font-size-lxx">or</span>
                    </div>

                    <div class="bigNoodle font-size-llx p-t-5x">SIGN UP WITH EMAIL</div>

                    <form id="register">
                        <fieldset class="p-t-15x login-text">
                            <div class="login-text">
                                <input type="text" class="input-login form-control text-primary register-nick" name="nick" placeholder="NAME">
                                <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                            </div>
                            <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                <span class="font-size-sm">Please select size !</span>
                            </div>
                        </fieldset>
                        <fieldset class="p-t-15x login-text">
                            <div class="login-text">
                                <input type="text" class="input-login form-control text-primary register-email" name="email" placeholder="EMAIL ADDRESS">
                                <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                            </div>
                            <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                <span class="font-size-sm">Please select size !</span>
                            </div>
                        </fieldset>
                        <fieldset class="p-t-15x login-text">
                            <div class="login-text">
                                <input type="password" class="input-login form-control text-primary register-pw" name="pw" placeholder="PASSWORD">
                                <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
                            </div>
                            <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                                <span class="font-size-sm">Please select size !</span>
                            </div>
                        </fieldset>
                        <input type="hidden" name="referer" value="{{$referer}}">
                    </form>
                    <div class="p-t-15x">
                        <div class="btn btn-primary btn-block bigNoodle font-size-lxx" data-role="register-submit">Sign up</div>
                    </div>

                    <div class="avenirMedium font-size-xs p-t-10x">By registering, you’ve accepted our <a href="/termsconditions" class="text-green">Terms & Conditions</a></div>
                </div>
            </div>
        </div>
    </div>

    {{--<div class="row m-x-0 bg-login">--}}
        {{--<div class="container login-container">--}}
            {{--<div class="row">--}}
                {{--<div class="col-lg-6"></div>--}}
                {{--<div class="col-lg-6 bg-white">--}}
                    {{--<div class="login-content">--}}
                        {{--<h4 class="p-t-10x sanBold text-main">REGISTER/CREATE AN ACCOUNT</h4>--}}
                        {{--<form id="register">--}}
                            {{--<fieldset class="p-t-15x login-text">--}}
                                {{--<div class="login-text">--}}
                                    {{--<input type="text" class="input-login form-control contrlo-lg text-primary register-nick" name="nick" placeholder="Your Name">--}}
                                    {{--<i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>--}}
                                {{--</div>--}}
                                {{--<div class="warning-info off flex flex-alignCenter text-warning p-t-5x">--}}
                                    {{--<i class="iconfont icon-caveat icon-size-md p-r-5x"></i>--}}
                                    {{--<span class="font-size-base">Please select size !</span>--}}
                                {{--</div>--}}
                            {{--</fieldset>--}}
                            {{--<fieldset class="p-t-15x login-text">--}}
                                {{--<div class="login-text">--}}
                                    {{--<input type="text" class="input-login form-control contrlo-lg text-primary register-email" name="email" placeholder="Email">--}}
                                    {{--<i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>--}}
                                {{--</div>--}}
                                {{--<div class="warning-info off flex flex-alignCenter text-warning p-t-5x">--}}
                                    {{--<i class="iconfont icon-caveat icon-size-md p-r-5x"></i>--}}
                                    {{--<span class="font-size-base">Please select size !</span>--}}
                                {{--</div>--}}
                            {{--</fieldset>--}}
                            {{--<fieldset class="p-t-15x login-text">--}}
                                {{--<div class="login-text">--}}
                                    {{--<input type="password" class="input-login form-control contrlo-lg text-primary register-pw" name="pw" placeholder="Password">--}}
                                    {{--<i class="iconfont icon-show font-size-lg input-show text-common off"></i>--}}
                                {{--</div>--}}
                                {{--<div class="warning-info off flex flex-alignCenter text-warning p-t-5x">--}}
                                    {{--<i class="iconfont icon-caveat icon-size-md p-r-5x"></i>--}}
                                    {{--<span class="font-size-base">Please select size !</span>--}}
                                {{--</div>--}}
                            {{--</fieldset>--}}
                            {{--<input type="hidden" name="referer" value="{{$referer}}">--}}
                        {{--</form>--}}
                        {{--<div class="p-t-20x">--}}
                            {{--<div class="btn btn-primary btn-lg btn-block" data-role="register-submit">Sign up</div>--}}
                        {{--</div>--}}
                        {{--<div class="p-y-10x text-center">--}}
                            {{--<div class="text-main">By registering, you’ve accepted our <a class="text-link" href="/termsconditions">Terms & Conditions</a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        {{--<div class="text-center login-or">--}}
                            {{--<hr class="hr-login m-a-0">--}}
                            {{--<span class="p-x-5x">or</span>--}}
                        {{--</div>--}}
                        {{--<div class="p-t-15x">--}}
                            {{--<a class="btn btn-block btn-lg btn-facebook" id="facebookLogin">--}}
                                {{--<i class="iconfont icon-facebook-o icon-size-md"></i> Sign in with Facebook--}}
                            {{--</a>--}}
                            {{--<a class="btn btn-block btn-lg btn-google m-t-15x" id="googleLogin">--}}
                                {{--<i class="iconfont icon-google-o icon-size-md"></i> Sign in with Google--}}
                            {{--</a>--}}
                        {{--</div>--}}
                        {{--<div class="p-y-15x text-center">--}}
                            {{--<div class="text-main">Already have an account? <a class="text-link" href="/login">Sign in</a></div>--}}
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
<script src="https://apis.google.com/js/api:client.js"></script>
<script src="/scripts/common.js"></script>



</html>
