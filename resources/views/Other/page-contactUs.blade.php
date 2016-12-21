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
                    <div class="row">
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
                                <input type="text" name="email" class="form-control contact-email" value="{{Session::get('user.login_email')}}">
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
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

@include('footer')
