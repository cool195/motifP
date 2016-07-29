@include('user.head', ['title' => "Reset Password"])
<!-- 内容 -->
<section class="bg-white">
  <div class="helve login-title text-center text-main p-y-20x">Reset Password</div>
  <div class="register-container">
    <div class="register-content">
      <form id="reset">
        <fieldset class="p-t-15x login-text">
          <div class="login-text">
            <input type="password" class="input-login form-control contrlo-lg text-primary" name="pw" placeholder="New Password">
            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
          </div>
          <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
            <span class="font-size-base">Please select size !</span>
          </div>
        </fieldset>
        <fieldset class="p-t-15x login-text">
          <div class="login-text">
            <input type="password" class="input-login form-control contrlo-lg text-primary" name="lastpw" placeholder="Confirm New Password">
            <i class="iconfont icon-show font-size-lg input-show text-common off"></i>
          </div>
          <div class="warning-info off flex flex-alignCenter text-warning p-t-5x">
            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
            <span class="font-size-base">Please select size !</span>
          </div>
        </fieldset>
        <input hidden name="tp" value="{{$tp}}">
        <input hidden name="sig" value="{{$sig}}">
      </form>
      <div class="p-t-30x">
        <div class="btn btn-primary btn-lg btn-block" data-role="reset-submit">Submit</div>
      </div>
    </div>
  </div>
</section>

@include('user.foot')

</body>
<script src="/scripts/vendor.js"></script>

<script src="/scripts/common.js"></script>
</html>
