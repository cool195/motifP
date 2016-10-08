@include('header',['title'=>"I'm giving you $20 to spend on Motif where you can purchase exclusive accessory designs from your favorite Instagrammers & You Tubers! Use code '{{$code}}' with your first purchase.Enjoy!",'description'=>$data['intro_short'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$data['main_image_url']])

<!-- invite friend -->
<section class="m-y-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content minh">
            <div class="invite-title helveBold">Share Motif with your friends</div>
            <p class="p-y-20x text-primary font-size-md">They get $20 off, and you will too after their first purchase.
                <a href="/saleinfo" class="text-link text-underLine">Details</a></p>
            <div class="flex flex-alignCenter">
                <span class="sanBold font-size-md p-r-15x">Invite Code:</span>
                <div class="m-r-30x">
                    <div class="input-group invite-input">
                        <div class="form-control" id="inviteCode" aria-describedby="btn-copy">{{$code}}</div>
                        <span class="input-group-addon text-primary font-size-md copy" id="btn-copy">Copy</span>
                    </div>
                </div>
                <span class="btn btn-primary btn-md" id="btn-inviteFriend">Invite Friends</span>
            </div>
        </div>
    </div>
</section>

<div class="remodal modal-content remodal-md p-y-20x" data-remodal-id="sharemodal">
    <span class="font-size-md sanBold p-r-15x">Invite with:</span>
    {{--<a href="#" class="btn btn-circle btn-shareEmail m-r-20x p-a-5x"><i class="iconfont icon-email-o font-size-lxx text-white"></i></a>--}}
    <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareFacebook m-r-20x p-a-5x"><i class="iconfont icon-facebook-o font-size-lxx text-white"></i></a>
    <a href="javascript:window.open('http://twitter.com/home?status='+encodeURIComponent('{{config('runtime.SELF_URL').'d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn btn-circle btn-shareTwitter m-r-20x p-a-5x"><i class="iconfont icon-twitter-o font-size-lxx text-white"></i></a>
    {{--<a href="#" class="btn btn-circle btn-shareGoogle m-r-20x p-a-5x"><i class="iconfont icon-google-o font-size-lxx text-white"></i></a>--}}
</div>

@include('footer')
<script src="scripts/clipboard.min.js"></script>
<script type="text/javascript">
    var clipboard = new Clipboard('.copy', {
        text: function() {
            return '{{$code}}';
        }
    });
    clipboard.on('success', function(e) {
        $('#btn-copy').html('Code Copied');
        setTimeout(function () {
            $('#btn-copy').html('Copy');
        }, 1500);
    });
    clipboard.on('error', function(e) {
        $('#btn-copy').html('Copy');
    });

</script>


