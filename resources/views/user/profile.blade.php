@include('header')

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Change Profile'])
            <div class="right">
                <div class="rightContent">
                    <!-- Change Password -->
                    <div class="box-shadow bg-white mH">
                        <div class="p-t-30x p-x-30x">
                            <!-- 头像、用户名 -->
                            <div class="p-x-20x p-t-20x text-center">
                                <img class="img-circle" src="{{config('runtime.CDN_URL')}}/n1/{{Session::get('user.icon')}}" width="116" height="116" alt="">
                                <form id="uploadIcon" method="post" action="/user/uploadicon" enctype="multipart/form-data">
                                    <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="font-size-md p-r-20x changeName-title">Icon</span>
                                        <span class="changePwd-input">
                                            <input id="profileIcon" type="file" name="icon" class="form-control contrlo-lg text-primary">
                                        </span>
                                    </div>
                                </form>
                                <a href="javascript:void(0)" class="btn btn-primary btn-lg btn-200 profile-uploadIcon">Replace Profile Picture</a>
                                {{--<div class="font-size-md p-y-10x font-size-md">Replace Profile Picture</div>--}}
                                <hr class="hr-base m-x-20x">
                            </div>
                            <!-- 修改 用户名 -->
                            <div class="p-t-30x">
                                <form method="" id="changeProfile">
                                    <div class="flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="sanBold font-size-md p-r-20x changeName-title">Email</span>
                                        <span class="changePwd-input">{{ Session::get('user.login_email') }}</span>
                                    </div>
                                    <div class="sanBold flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="font-size-md p-r-20x changeName-title">Name</span>
                                        <span class="changePwd-input">
                                            <input type="text" name="nick" class="form-control contrlo-lg text-primary" placeholder="{{ Session::get('user.nickname') }}">
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="text-right p-x-30x p-y-10x">
                            {{--<a href="javascript:void(0)" class="text-primary font-size-md p-r-30x">Cancel</a>--}}
                            <a href="javascript:void(0)" class="btn btn-primary btn-lg btn-200 profile-save">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')