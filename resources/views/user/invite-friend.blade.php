@include('header')

<!-- invite friend -->
<section class="m-y-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content">
            <div class="invite-title helveBold">Share Promotion Code with your friends</div>
            <p class="p-y-20x text-primary font-size-md">Both you and your friends will get $20 off after their first purchase!
                <a href="#" class="text-link text-underLine">Detail</a></p>
            <div class="flex flex-alignCenter">
                <span class="sanBold font-size-md p-r-15x">Invite Code:</span>
                <div class="input-group invite-input p-r-30x">
                    <input type="text" class="form-control" id="inviteCode" placeholder="Code" aria-describedby="btn-copy">
                    <span class="input-group-addon text-primary font-size-md" id="btn-copy" onclick="copyinput();">Copy</span>
                </div>
                <span class="p-l-30x"><a href="/daily" class="btn btn-primary btn-lg btn-200">Invite Friends</a></span>
            </div>
        </div>
    </div>
</section>

@include('footer')
<script type="text/javascript">
    function copyinput()
    {
        var input=document.getElementById("inviteCode");//input的ID值
        input.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
    }
</script>


