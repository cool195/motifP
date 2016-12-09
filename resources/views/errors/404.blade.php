
@include('header', ['page' => ""])

<section class="m-y-40x">
    <div class="container text-center p-y-40x">
        <div class="order_comfirmed_content">
            <img src="{{config('runtime.Image_URL')}}/images/error/404@2x.png" srcset="{{config('runtime.Image_URL')}}/images/error/404@3x.png 2x">
            <h3 class="helveBold m-b-20x m-t-30x text-primary">Seems like you're lost…</h3>
            <p class="p-t-20x">
                Your requested URL was not found<br>
                You may want to
            </p>
            <a href="/daily" class="btn btn-primary btn-lg btn-350">Go Home</a>
        </div>
    </div>
</section>

@include('footer')