@include('header',['title'=>'Get $20 off your first jewelry purchase! designed by the world’s top Fashion Bloggers,Instagrammers,and Digital Influencers.','description'=>$data['intro_short'],'ogimage'=>config('runtime.CDN_URL').'/n0/'.$data['main_image_url']])

<!-- invite friend -->
<section class="m-y-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content minh">
            <div class="invite-title helveBold">Share Motif with your friends</div>
            <p class="p-y-20x text-primary font-size-md">They get $20 off, and you will too after their first purchase.
                <a href="/saleinfo" class="text-link text-underLine">Details</a></p>
            <div class="flex flex-alignCenter">
                <span class="sanBold font-size-md p-r-15x">Invite Code:</span>
                <div class="input-group invite-input p-r-30x">
                    <input type="text" class="form-control" id="inviteCode" placeholder="{{$code}}" value="{{$code}}" aria-describedby="btn-copy">
                    <span class="input-group-addon text-primary font-size-md" id="btn-copy" onclick="copyinput();">Copy</span>
                </div>
                <div class="p-l-30x"><span class="btn btn-primary btn-md" id="btn-inviteFriend">Invite Friends</span></div>
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
<script type="text/javascript">
    function copyinput()
    {
        var input=document.getElementById("inviteCode");//input的ID值
        input.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
    }
</script>


