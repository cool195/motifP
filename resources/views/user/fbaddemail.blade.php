@include('user.head')
<hr class="hr-common m-a-0">
<!-- 内容 -->
<section class="bg-white overhidden">
    <div class="row m-x-0 bg-login">
        <div class="container login-container">
            <div class="row">
                <div class="col-lg-6"></div>
                <div class="col-lg-6 bg-white">
                    <div class="login-content">
                        <h4 class="p-t-30x m-b-30x sanBold text-main">EMAIL REQUIRED</h4>
                        <div class="m-a-40x">&nbsp;</div>
                        <form id="register">
                            <div class="m-b-30x">In order to receive your order information, you must enter your email address.
                            </div>
                            <fieldset class="p-y-15x login-text">
                                <div class="login-text">
                                    <input type="text" class="input-login form-control contrlo-lg text-primary emailRequired-email" name="email" placeholder="Email">
                                    <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>

                                    <div class="loading uploademail-loading" style="display: none">
                                        <div class="loader"></div>
                                    </div>
                                </div>
                                <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Please select size !</span>
                                </div>
                            </fieldset>
                            <input type="hidden" name="id" value="{{$params['id']}}">
                            <input type="hidden" name="name" value="{{$params['name']}}">
                            <input type="hidden" name="avatar" value="{{$params['avatar']}}">
                        </form>
                        <div class="p-t-40x">
                            <div class="btn btn-primary btn-lg btn-block disabled" data-role="emailRequired-submit">Continue</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-loginright">&nbsp;</div>
        </div>

    </div>
</section>

<script>
</script>

@include('user.foot')
<script src="/scripts/vendor.js"></script>
<script src="/scripts/common.js"></script>
