@include('header' )

        <!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            <div class="leftMeun">
                <div class="box-shadow bg-white">
                    <!-- 个人头像、用户名 -->
                    <div class="my-info p-x-20x p-t-20x text-center">
                        <img class="img-circle" src="{{config('runtime.Image_URL')}}/images/designer/designer-head.jpg" width="64" height="64" alt="">
                        <div class="helveBold font-size-md p-t-5x">Vivian</div>
                        <hr class="hr-base m-x-20x">
                    </div>

                    <!-- 菜单 -->
                    @include('user.left')
                    <div class="right">
                        <div class="rightContent">
                            <!-- Change Password -->
                            <div class="box-shadow bg-white mH">
                                <div class="p-t-30x p-x-30x">
                                    <!-- 头像、用户名 -->
                                    <div class="p-x-20x p-t-20x text-center">
                                        <img class="img-circle" src="{{config('runtime.Image_URL')}}/images/designer/designer-head.jpg" width="116" height="116" alt="">
                                        <div class="font-size-md p-y-10x font-size-md">Replace Profile Picture</div>
                                        <hr class="hr-base m-x-20x">
                                    </div>
                                    <!-- 修改 用户名 -->
                                    <div class="p-t-30x">
                                        <div class="flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="sanBold font-size-md p-r-20x changeName-title">Email</span>
                                        <span class="changePwd-input">Vivian@motif.me</span>
                                    </div>
                                    <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="font-size-md p-r-20x changeName-title">Name</span>
                                        <span class="changePwd-input">
                                            <input type="text" class="form-control contrlo-lg text-primary" placeholder="">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        <div class="text-right p-x-30x p-y-10x">
                            <a href="#" class="text-primary font-size-md p-r-30x">Cancel</a>
                            <a href="#" class="btn btn-primary btn-lg btn-200">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')