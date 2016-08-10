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
                            <li class="nav-item">
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
                            <li class="nav-item active">
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
                    <!-- Address -->
                    <div class="box-shadow bg-white mH">
                        <div class="address-content">
                            <!-- 添加地址 -->
                            <div class="p-a-20x add-address">
                                <div class="inline">
                                    <span class="font-size-md">Add Shipping Address</span>
                                    <span class="font-size-md pull-right">
                                        <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                                        <a class="p-l-10x" href="#">Make Primary</a>
                                    </span>
                                </div>
                                <div class="row p-t-30x">
                                    <div class="col-md-5">
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="Full name">
                                            <div class="warning-info flex flex-alignCenter text-warning p-t-5x">
                                                <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                                <span class="font-size-base">Please select size !</span>
                                            </div>
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="Street 1">
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="City">
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="State (optional)">
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="Phone (optional)">
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="Street 2">
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <select name="" id="" class="form-control contrlo-lg select-country">
                                                <option value="1">Country</option>
                                                <option value="2">beijing</option>
                                                <option value="3">shanghai</option>
                                            </select>
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="Zip Code">
                                        </div>
                                        <div class="p-l-20x m-b-20x">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="IDnumber">
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                                <div class="text-right">
                                    <a href="#" class="text-primary font-size-md p-r-30x">Cancel</a>
                                    <a href="#" class="btn btn-primary btn-lg btn-200">Save</a>
                                </div>
                            </div>

                            <!-- 选择地址 -->
                            <div class="p-a-20x select-address disabled">
                                <div class="flex flex-alignCenter flex-fullJustified">
                                    <span class="font-size-md">Selecy Shipping Address</span>
                                    <span class="font-size-md pull-right">
                                        <a class="btn btn-secondary btn-md" href="#"><i class="iconfont icon-add font-size-md p-r-5x"></i>Add New Address</a>
                                    </span>
                                </div>
                                <div class="row p-x-10x p-t-20x">
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="address-item p-x-20x p-y-15x active">
                                                <div class="address-info">
                                                    UserName<br>
                                                    New York<br>
                                                    12030<br>
                                                    United States
                                                </div>
                                                <div class="bg-address"></div>
                                                <div class="primary-address font-size-md">Primary</div>
                                                <div class="btn-edit font-size-md">Edit</div>
                                                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="address-item p-x-20x p-y-15x">
                                                <div class="address-info">
                                                    UserName<br>
                                                    New York<br>
                                                    12030<br>
                                                    United States
                                                </div>
                                                <div class="bg-address"></div>
                                                <div class="btn-edit font-size-md">Edit</div>
                                                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="address-item p-x-20x p-y-15x">
                                                <div class="address-info">
                                                    UserName<br>
                                                    New York<br>
                                                    12030<br>
                                                    United States
                                                </div>
                                                <div class="bg-address"></div>
                                                <div class="btn-edit font-size-md">Edit</div>
                                                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="p-a-10x">
                                            <div class="address-item p-x-20x p-y-15x">
                                                <div class="address-info">
                                                    UserName<br>
                                                    New York<br>
                                                    12030<br>
                                                    United States
                                                </div>
                                                <div class="bg-address"></div>
                                                <div class="btn-edit font-size-md">Edit</div>
                                                <div class="btn-addPrimary"><i class="iconfont icon-check font-size-lg"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right p-t-10x"><a href="#" class="btn btn-primary btn-lg btn-200">Continue</a>
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