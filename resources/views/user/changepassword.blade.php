@include('header')

<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Change Password'])
            <div class="right">
                <div class="rightContent">
                    <!-- Change Password -->
                    <div class="bg-white mH">
                        <div class="bigNoodle text-center leftMeun-title">change password</div>
                        <hr class="hr-black m-t-0">

                        <form method="" id="changepassword">
                            <div class="p-t-40x text-center">
                                <div class="row m-b-20x">
                                    <div class="col-xs-4 m-t-5x">
                                        <span class="font-size-md changePwd-title avenirBold">Current Password</span>
                                    </div>
                                    <div class="col-xs-6">
                                    <span class="changePwd-input">
                                        <input type="password" class="form-control contrlo-lg text-primary change-oldpw" placeholder="Current Password" name="oldpw">
                                    </span>
                                        <div class="warning-info off flex flex-alignCenter text-warning p-t-10x">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your password</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-20x">
                                    <div class="col-xs-4 m-t-5x">
                                        <span class="font-size-md changePwd-title avenirBold">New Password</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span class="changePwd-input">
                                            <input type="password" class="form-control contrlo-lg text-primary change-pw" placeholder="New Password(6 characters min)" name="pw">
                                        </span>
                                        <div class="warning-info off flex flex-alignCenter text-warning p-t-10x">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your password</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-20x">
                                    <div class="col-xs-4 m-t-5x">
                                        <span class="font-size-md changePwd-title avenirBold">Confirm New Password</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span class="changePwd-input">
                                            <input type="password" class="form-control contrlo-lg text-primary change-cpw" placeholder="Confirm New Password">
                                        </span>
                                        <div class="warning-info off flex flex-alignCenter text-warning p-t-10x">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Please enter your password</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="text-center p-t-20x">
                                        {{--<a href="javascript:void(0)" class="text-primary font-size-md p-r-30x">Cancel</a>--}}
                                        <a href="javascript:void(0)" class="btn btn-baseSize btn-primary font-size-llx bigNoodle change-save disabled">Save</a>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 修改密码 弹出框 -->
<div class="remodal modal-content remodal-md" data-remodal-id="changepwd-modal" id="modalDialog">
    <div class="text-center dialog-info changepwd-info"></div>
    <hr class="hr-common m-a-0">
    <div class="row m-a-0">
        <div class="col-md-offset-3 col-md-6">
            <div class="m-y-20x"><a href="javascript:;" class="btn btn-block btn-primary btn-lg" id="changePwdBtn"></a></div>
        </div>
    </div>
</div>

@include('footer')
