
@include('header')
<section class="body-container">
    <div class="container">
            @if(!empty($banner))
                @foreach($banner as $value)
                        <a href="@if(1 == $value['banner_skip_type'])/detail/@elseif(2==$value['banner_skip_type'])/designer/@elseif(3==$value['banner_skip_type'])/topic/@elseif(4 == $value['banner_skip_type'])/shopping/@endif{{ $value['banner_skip'] }}">
                            <img class="img-fluid img-lazy"
                                 data-original="{{config('runtime.CDN_URL').'/n0/'.$value['img_path']}}"
                                 src="{{env('CDN_Static')}}/images/product/bg-product@336.png" alt="">
                        </a>
                @endforeach
            @endif
        <div class="bg-common p-y-40x">
            <div class="text-center m-y-20x flex flex-alignCenter flex-justifyCenter">
                    <div class="bigNoodle font-size-llxx">
                        sign up for emails and get 15% off!
                    </div>

                    <div class="m-l-30x">
                        <input class="text-primary input-email font-size-lxx" placeholder="Enter email" type="text">
                        <a class="btn btn-primary p-x-10x bigNoodle font-size-lxx m-b-5x">SIGN ME UP</a>
                    </div>
            </div>
        </div>
    </div>
</section>

@include('footer')