@include('header',['title'=>"I'm giving you $20 to spend on Motif! Use code '{$code}' with your first purchase. Enjoy!",'description'=>$data['intro_short'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$data['main_image_url']])

<!-- invite friend -->
<section class="body-container m-y-30x">
    <div class="container content-maxWidth">
        <div class="bigNoodle text-center leftMeun-title">inevite friends</div>
        <hr class="hr-black m-t-0">
        <div class="invite-content minh">
            <div class="invite-title bigNoodle">Share Motif with your friends</div>
            <p class="p-y-20x font-size-md">They get $20 off, and you will too after their first purchase.
                <a href="/saleinfo" class="text-green text-underLine">Details</a></p>
            <div class="flex flex-alignCenter">
                <span class="avenirBold font-size-md p-r-15x">INVITE CODE:</span>
                <div class="m-r-30x">
                    <div class="input-group invite-input">
                        <div class="form-control" id="inviteCode" aria-describedby="btn-copy">{{$code}}</div>
                        <span class="input-group-addon font-size-md copy" id="btn-copy">COPY</span>
                    </div>
                </div>
                <span class="btn btn-baseSize btn-green font-size-llx bigNoodle" id="btn-inviteFriend">Invite Friends</span>
            </div>
        </div>
    </div>
</section>

<div class="remodal remodal-md p-y-30x" data-remodal-id="sharemodal">
    <span class="font-size-md bigNoodle p-r-15x" style="vertical-align: text-bottom;">INVITE WITH:</span>
    {{--<a href="#" class="btn btn-circle btn-shareEmail m-r-20x p-a-5x"><i class="iconfont icon-email-o font-size-lxx text-white"></i></a>--}}
    <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('{{'https://www.motif.me/d/invite/'.$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn-shareFacebook m-r-20x p-t-5x"><i class="iconfont icon-facebook2 font-size-llx"></i></a>
    <a href="javascript:window.open('http://twitter.com/home?status='+encodeURIComponent('{{"I\'m giving you $20 to spend on Motif! Use code \'$code\' with your first purchase. Enjoy! https://www.motif.me/d/invite/".$code}}'),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)" class="btn-shareTwitter m-r-20x"><i class="iconfont icon-twitter-o font-size-llx"></i></a>
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


