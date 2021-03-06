{{--@include('user.head')--}}
@include('header', ['title' => 'Email Required', 'cid' =>$cid, 'page' => 'Email Required'])
<hr class="hr-common m-a-0">
<!-- 内容 -->
<section class="bg-white overhidden body-container">
    <div class="container">
        <div class="login-container text-center p-t-20x">
            <div class="login-content p-y-20x">
                <div class="m-a-40x">&nbsp;</div>
                <div class="p-a-5x">&nbsp;</div>
                <div class="avenirMedium font-size-sm m-b-30x">In order to receive your order information, you must enter your email address.</div>
                <form id="register">
                    <fieldset class="p-y-15x login-text">
                        <div class="login-text">
                            <input type="text" class="input-login form-control contrlo-lg text-primary emailRequired-email" name="email" placeholder="EMAIL">
                            <i class="iconfont icon-delete font-size-lg input-clear text-common hidden"></i>
                            <div class="loading uploademail-loading" style="display: none">
                                <div class="loader"></div>
                            </div>
                        </div>
                        <div class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                            <i class="iconfont icon-caveat icon-size-sm p-r-5x"></i>
                            <span class="font-size-sm">Please select size !</span>
                        </div>
                    </fieldset>
                    <input type="hidden" name="id" value="{{$params['id']}}">
                    <input type="hidden" name="name" value="{{$params['name']}}">
                    <input type="hidden" name="avatar" value="{{$params['avatar']}}">
                </form>
                <div class="p-t-40x">
                    <div class="btn btn-primary btn-block bigNoodle font-size-lxx disabled" data-role="emailRequired-submit">Continue</div>
                </div>
                <div class="m-a-40x">&nbsp;</div>
                <div class="p-a-5x">&nbsp;</div>
            </div>
        </div>
    </div>
</section>

<script>
</script>

@include('user.foot')
<script src="/scripts/vendor.js"></script>
<script src="/scripts/common.js"></script>
