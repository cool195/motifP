@include('header')

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="content">
            <div class="leftMeun">
                <div class="box-shadow bg-white">
                    <!-- 个人头像、用户名 -->
                    <div class="my-info p-x-20x p-t-20x text-center">
                        <img class="img-circle" src="{{config('runtime.Image_URL')}}/images/designer/designer-head.jpg" width="64" height="64" alt="">
                        <div class="helveBold font-size-md p-t-5x">Vivian</div>
                        <hr class="hr-base m-x-20x">
                    </div>

                    <!-- 菜单 -->
                    <nav class="nav-menu p-b-15x">
                        <ul class="nav">
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-shopbag font-size-lg p-r-10x"></i>
                                        <span class="font-size-md">My Bag</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-book font-size-lg p-r-10x"></i>
                                        <span class="font-size-md">Orders</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-like font-size-lg p-r-10x"></i>
                                        <span class="font-size-md">Wishlist</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-follow font-size-lg p-r-10x"></i>
                                        <span class="font-size-md">Following</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <h5 class="helveBold p-t-30x p-b-15x font-size-md p-l-20x">Settings</h5>

                <div class="box-shadow bg-white">
                    <!-- 菜单 -->
                    <nav class="nav-menu p-y-30x">
                        <ul class="nav">
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Change Profile</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Change Password</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Payment Method</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Shipping Address</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x p-x-40x">
                                        <span class="font-size-md">Log Out</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
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
                            <a href="javascript:void(0)" class="text-primary font-size-md p-r-30x">Cancel</a>
                            <a href="javascript:void(0)" class="btn btn-primary btn-lg btn-200 change-save">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')
