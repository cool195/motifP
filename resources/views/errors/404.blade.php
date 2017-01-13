
@include('header', ['page' => "404", 'title'=>'Page Not Found 404 error'])

<section class="m-y-40x">
    <div class="container text-center p-y-40x">
        <div class="order_comfirmed_content">
            <div class="bigNoodle error-text">404</div>
{{--            <img src="{{config('runtime.Image_URL')}}/images/error/404@2x.png" srcset="{{config('runtime.Image_URL')}}/images/error/404@3x.png 2x">--}}
            <h3 class="text-primary bigNoodle">Seems like you're lost…</h3>
            <p class="p-t-30x">
                Your requested URL was not found<br>
                You may want to
            </p>
            <a href="/daily" class="btn btn-green font-size-llx bigNoodle btn-300">Go Home</a>
        </div>
    </div>
</section>

@include('footer')