@include('header')

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            <div class="leftMeun">
                <div class="box-shadow bg-white">
                    <!-- 个人头像、用户名 -->
                    <div class="my-info p-x-20x p-t-20x text-center">
                        <img class="img-circle" src="images/designer/designer-head.jpg" width="64" height="64" alt="">
                        <div class="helveBold font-size-md p-t-5x">Vivian</div>
                        <hr class="hr-base m-x-20x">
                    </div>

                    <!-- 菜单 -->
                    <nav class="nav-menu p-b-15x">
                        <ul class="nav">
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-shopbag font-size-lg p-r-10x"></i><span
                                                class="font-size-md">My Bag</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-book font-size-lg p-r-10x"></i><span
                                                class="font-size-md">Orders</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-like font-size-lg p-r-10x"></i><span
                                                class="font-size-md">Wishlist</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-follow font-size-lg p-r-10x"></i><span
                                                class="font-size-md">Following</span></div>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <i class="iconfont icon-ticket font-size-lg p-r-10x"></i><span
                                                class="font-size-md">Promotions</span></div>
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
                                        <span class="font-size-md">Change Profile</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Change Password</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Payment Method</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                                        <span class="font-size-md">Shipping Address</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#">
                                    <div class="flex flex-alignCenter p-y-5x p-x-40x">
                                        <span class="font-size-md">Log Out</span></div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="right">
                <div class="rightContent">
                    <!-- Promotions -->
                    <div class="box-shadow bg-white">
                        <div class="promotion-content">
                            <!--新增促销码-->
                            <div class="p-a-20x addPromotionCode disabled">
                                <a href="#"><i class="iconfont icon-arrow-left font-size-lg p-r-10x"></i></a>
                                <div class="empty-content">
                                    <i class="iconfont icon-ticket"></i>
                                    <p class="helveBold font-size-llxx m-t-40x">Add New Promotions</p>
                                    <span class="addCode-input m-t-40x">
                                        <input type="text" class="form-control contrlo-lg text-primary" placeholder="Enter Your Promotions Code Here">
                                    </span>
                                    <div class="text-center m-t-30x">
                                        <a href="javascript:void(0)"
                                           class="btn btn-primary btn-lg btn-200 profile-save">Apply</a>
                                    </div>
                                </div>
                            </div>

                            <!-- Coupons and Promotions-->
                            <div class="p-a-20x showPromotionCode">
                                <div class="flex flex-alignCenter flex-fullJustified">
                                    <span class="font-size-md sanBold">Coupons and Promotions</span>
                                    <span class="font-size-md pull-right">
                                        <a class="btn btn-secondary btn-md" href="#"><i class="iconfont icon-add font-size-md p-r-5x"></i>Add New Promotion Code</a>
                                    </span>
                                </div>
                                <div class="row p-x-10x p-t-20x">
                                    <div class="col-md-6">
                                        <div class="m-a-10x">
                                            <div class="row promotion-item">
                                                <div class="col-md-8">
                                                    <div class="p-t-20x text-right">
                                                        <div class="helveBold font-size-sm">10% Off For Your First
                                                            Orde
                                                        </div>
                                                        <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="p-left">
                                                        <span class="helveBold">10%</span>
                                                        <div class="font-size-lx helveBold">OFF</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="m-a-10x">
                                            <div class="row promotion-item">
                                                <div class="col-md-8">
                                                    <div class="p-t-20x text-right">
                                                        <div class="helveBold font-size-sm">10% Off For Your First
                                                            Orde
                                                        </div>
                                                        <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="p-left">
                                                        <span class="helveBold">10%</span>
                                                        <div class="font-size-lx helveBold">OFF</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="m-a-10x">
                                            <div class="row promotion-item">
                                                <div class="col-md-8">
                                                    <div class="p-t-20x text-right">
                                                        <div class="helveBold font-size-sm">10% Off For Your First
                                                            Orde
                                                        </div>
                                                        <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="p-left">
                                                        <span class="helveBold">10%</span>
                                                        <div class="font-size-lx helveBold">OFF</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

@include('footer')
