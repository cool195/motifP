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
</section>

@include('user.foot')

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
