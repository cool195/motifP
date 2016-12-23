<!-- 登录注册 弹窗 -->
<div class="remodal modal-content remodal-md" data-remodal-id="login-modal" id="login-modalDialog">
    <div class="p-a-10x">
        <div class="text-right"><a href="javascript:void(0)" data-remodal-action="close"><i class="iconfont icon-close font-size-lxx"></i></a></div>
        <div class="login-content p-y-20x">
            <div class="row">
                <div class="col-md-6">
                    <a class="bigNoodle login-title font-size-lxx active tab-login">LOGIN</a>
                </div>
                <div class="col-md-6">
                    <a class="bigNoodle login-title font-size-lxx tab-register">REGISTER</a>
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

            <div class="login-info active">
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
                    <input type="hidden" name="referer" value="{{$_SERVER['REQUEST_URI']}}">
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
            <div class="register-info">
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

<footer class="login-footer">
    <div class="container p-x-40x">
        <div class="text-center p-t-20x m-b-20x loginFooter-contactUs bigNoodle"><a href="/contactus" class="text-green font-size-lx">Contact Us</a></div>
        <div class="text-center p-t-10x m-b-10x text-primary avenirMedium font-size-xs">Copyright © 2016 Motif Group LLC. All rights reserved.</div>
    </div>
</footer>

@if (env('APP_ENV') == 'production') {
<script src="{{config('runtime.CLK_URL')}}/wl.js"></script>
<!-- Google Tag Manager -->
<script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K9J99M');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9J99M"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

@endif
