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
                    <a href="/cart">
                        <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                            <i class="iconfont icon-shopbag font-size-lg p-r-10x"></i>
                            <span class="font-size-md">My Bag</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item @if('Orders' == $title || 'Order Detail' == $title) active @endif">
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
                <li class="nav-item @if('Change Profile' == $title) active @endif">
                    <a href="/user/profile">
                        <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                            <span class="font-size-md">Change Profile</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item @if('Change Password' == $title) active @endif">
                    <a href="/user/password">
                        <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                            <span class="font-size-md">Change Password</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item @if('Payment Method' == $title) active @endif">
                    <a href="#">
                        <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                            <span class="font-size-md">Payment Method</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item @if('Shipping Address' == $title) active @endif">
                    <a href="/user/address">
                        <div class="flex flex-alignCenter p-y-5x m-b-15x p-x-40x">
                            <span class="font-size-md">Shipping Address</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/signout">
                        <div class="flex flex-alignCenter p-y-5x p-x-40x">
                            <span class="font-size-md">Log Out</span>
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>