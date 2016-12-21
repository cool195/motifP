@include('header', ['title' => 'Contact Us'])
<!-- 内容 -->
<section class="body-container m-y-20x">
    <div class="container">
        <div class="myHome-content">
            <!--静态页 共用左侧导航-->
            <div class="leftMeun m-t-40x p-t-30x">
                <nav class="nav-menu p-b-15x">
                    <ul class="nav font-size-md">
                        <li class="nav-item">
                            <a href="#">RETURN POLICY</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">SHIPPING</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">FAQ</a>
                        </li>
                        <li class="nav-item active">
                            <a href="#">CONTACT US</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">TERMS & CONDITIONS</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">PRIVACY NOTICE</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="right">
                <div class="rightContent">
                    <div class="text-center static-tit">LET'S BE<br>
                        <span class="bigNoodle text-center leftMeun-title">FRIENDS</span>
                    </div>

                    <hr class="hr-black m-t-0">
                    <div class="row">
                        <form class="form m-t-40x">
                            <input type="hidden" class="form-control contact-id" name="id" value="{{$id}}">
                            <input type="hidden" class="form-control contact-type" name="skiptype" value="{{$skiptype}}">
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
