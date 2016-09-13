@include('user.head')
<hr class="hr-common m-a-0">
<!-- 内容 -->
<section class="bg-white">
    <div class="helve login-title text-center text-main p-y-20x">Email Required</div>
    <div class="register-container">
        <div class="register-content">
            <form id="register">
                <div class="m-b-20x">In order to receive your order information, you must enter your email address.
                </div>
                <fieldset class="p-t-15x login-text">
                    <div class="login-text">
                        <input type="text" class="input-login form-control contrlo-lg text-primary emailRequired-email" name="email" placeholder="Email">
                        <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                    </div>
                    <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                        <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                        <span class="font-size-base">Please select size !</span>
                    </div>
                </fieldset>
            </form>
            <div class="p-t-30x">
                <div class="btn btn-primary btn-lg btn-block disabled" data-role="emailRequired-submit">Continue</div>
            </div>
        </div>
    </div>
</section>
<script>
</script>

@include('user.foot')
<script src="/scripts/vendor.js"></script>
<script src="/scripts/common.js"></script>
