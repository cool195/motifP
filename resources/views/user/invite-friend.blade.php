@include('header')

<!-- invite friend -->
<section class="m-y-40x">
    <div class="container box-shadow bg-white">
        <div class="invite-content">
            <div class="invite-title">Share Promotion Code with your friends</div>
            <p class="p-y-20x text-primary font-size-md">Both you and your friends will get $20 off after their first purchase!
                <a href="#" class="text-link text-underLine">Detail</a></p>
            <div class="flex">
                <span class="sanBold font-size-md">Invite Code:</span>
                <span class="input-group">
                    <input type="text" class="form-control input-engraving" placeholder="Search for...">
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                  </span>
                </span>
                <a href="/daily" class="btn btn-primary btn-lg btn-200">Invite Friends</a>
            </div>
        </div>
    </div>
</section>

@include('footer')

