@include('header')

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="content">
            @include('user.left', ['title' => 'Change Password'])
            <div class="right">
                <div class="rightContent">
                    <!-- Change Password -->
                    <div class="box-shadow bg-white mH">
                        <form method="" id="changepassword">
                        <div class="p-t-40x">
                            <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                <span class="font-size-md p-r-20x changePwd-title">Current Password</span>
                                <span class="changePwd-input">
                                    <input type="password" class="form-control contrlo-lg text-primary change-oldpw" placeholder="Current Password" name="oldpw">
                                </span>
                                <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Please enter your password</span>
                                </div>
                            </div>
                            <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                <span class="font-size-md p-r-20x changePwd-title">New Password</span>
                                <span class="changePwd-input">
                                    <input type="password" class="form-control contrlo-lg text-primary change-pw" placeholder="New Password(6 characters min)" name="pw">
                                </span>
                                <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Please enter your password</span>
                                </div>
                            </div>
                            <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                <span class="font-size-md p-r-20x changePwd-title">Confirm New Password</span>
                                <span class="changePwd-input">
                                    <input type="password" class="form-control contrlo-lg text-primary change-cpw" placeholder="Confirm New Password">
                                </span>
                                <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base">Please enter your password</span>
                                </div>
                            </div>
                        </div>
                        </form>
                        <div class="text-right p-x-30x p-y-10x">
                            {{--<a href="javascript:void(0)" class="text-primary font-size-md p-r-30x">Cancel</a>--}}
                            <a href="javascript:void(0)" class="btn btn-primary btn-lg btn-200 change-save">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')
