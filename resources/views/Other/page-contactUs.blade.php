@include('header', ['title' => 'Contact Us'])
<!-- 内容 -->
<section class="body-container m-y-30x">
    <div class="container">
        <div class="myHome-content">
            @include('Other.page-left', ['title' => 'contactus'])
            <div class="right">
                <div class="rightContent">
                    <div class="bigNoodle text-center leftMeun-title uppercase">contact us</div>
                    <hr class="hr-black m-t-0">
                    <div class="row contact-form">
                        <form class="form m-t-40x">
                            <div class="col-md-6 m-b-20x">
                                <label class="contact-label font-size-sm">first name</label>
                                <input type="text" name="firstname" class="form-control contact-firstname">
                            </div>
                            <div class="col-md-6 m-b-20x">
                                <label class="contact-label font-size-sm">last name</label>
                                <input type="text" name="lastname" class="form-control contact-lastname">
                            </div>
                            <div class="col-md-6 m-b-20x">
                                <label class="contact-label font-size-sm">email</label>
                                <div><input type="text" name="email" class="form-control contact-email" value="{{Session::get('user.login_email')}}"></div>
                                <span class="warning-info flex flex-alignCenter text-warning p-t-5x off">
                                    <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                    <span class="font-size-base"></span>
                                </span>

                            </div>
                            <div class="col-md-6 m-b-20x">
                                <label class="contact-label font-size-sm">order no.(optional)</label>
                                <input type="text" name="ordernum" class="form-control contact-ordernum">
                            </div>
                            <div class="col-md-12 m-b-40x">
                                <label class="contact-label font-size-sm">tell us what's up</label>
                                <textarea name="content" class="form-control contact-content"></textarea>
                            </div>
                            <div class="col-md-12">
                                <div class="btn btn-primary btn-block font-size-llxx bigNoodle" id="contact-submit">SUBMIT</div>
                            </div>
                            <input type="hidden" name="type" class="contact-type" value="{{$type}}">
                            <input type="hidden" name="stype"  class="contact-stype" value="{{$stype}}">
                        </form>
                    </div>

                    <!--提交成功-->
                    <div class="text-center p-a-30x contact-success">
                        <i class="iconfont m-t-40x submit-ok"></i>
                        <div class="uppercase bigNoodle font-size-llxx m-y-10x">thank you!</div>
                        <p class="font-size-sm">Your submission is received and we will contact you soon.</p>
                        <a href="/daily" class="btn btn-primary btn-baseSize bigNoodle font-size-lxx m-t-10x">BACK TO HOME</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')
