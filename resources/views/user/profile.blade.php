@include('header', ['title' => 'Change Profile'])

<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'Change Profile'])
            <div class="right">
                <div class="rightContent">
                    <div class="bigNoodle text-center leftMeun-title">change profile</div>
                    <hr class="hr-black m-t-0">

                    <!-- Change Password -->
                    <div class="bg-white mH">
                        <div class="p-t-30x p-x-30x">
                            <!-- 头像、用户名 -->
                            {{--<div class="p-x-20x p-t-20x text-center">
                                <div class="text-center profile-info">
                                    <a href="javascript:;" class="head-file img-border-white-4x">
                                        <img class="img-circle img-lazy"
                                             src="{{config('runtime.Image_URL')}}/images/product/bg-product@336.png"
                                             data-original="@if(Session::has('user.icon')){{config('runtime.CDN_URL').'/n1/'.Session::get('user.icon')}}@else{{config('runtime.Image_URL').'/images/icon/apple-touch-icon.png'}}@endif" width="116"
                                             height="116" data-url="{{config('runtime.CDN_URL')}}" id="avatarUrl">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <input id="profileIcon" type="file" name="file" accept="image/*">
                                        <div class="bg-uploadProfileLoading"></div>
                                    </a>
                                    <div class="loading uploadProfile-loading" style="display: none">
                                        <div class="loader"></div>
                                    </div>
                                </div>
                                <div class="font-size-md p-y-10x font-size-md">Replace Profile Picture</div>
                                <hr class="hr-base m-x-20x">
                            </div>--}}
                            <!-- 修改 用户名 -->
                            <div class="p-t-30x">
                                <form method="" id="changeProfile">
                                    <div class="flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="avenirBold font-size-md p-r-20x changeName-title">Email</span>
                                        <span class="changePwd-input">{{ Session::get('user.login_email') }}</span>
                                    </div>
                                    <div class="flex flex-alignCenter flex-justifyCenter m-b-20x">
                                        <span class="avenirBold font-size-md p-r-20x changeName-title">Name</span>
                                        <span class="changePwd-input">
                                            <input type="text" name="nick" class="form-control contrlo-lg text-primary"
                                                   value="{{ Session::get('user.nickname') }}">
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="text-center">
                            {{--<a href="javascript:void(0)" class="text-primary font-size-md p-r-30x">Cancel</a>--}}
                            <a href="javascript:void(0)" class="btn btn-baseSize btn-primary font-size-llx bigNoodle profile-save disabled">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')