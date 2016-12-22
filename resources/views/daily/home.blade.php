
@include('header')
<section class="body-container" id="designerIndex" data-show="true">
    <div class="container m-b-40x">
            @if(!empty($banner))
                @foreach($banner as $value)
                    <div>
                        <a href="@if(1 == $value['banner_skip_type'])/detail/@elseif(2==$value['banner_skip_type'])/designer/@elseif(3==$value['banner_skip_type'])/topic/@elseif(4 == $value['banner_skip_type'])/shopping/@endif{{ $value['banner_skip'] }}">
                            <img class="img-fluid img-lazy figure"
                                 data-original="{{config('runtime.CDN_URL')}}/n1/{{$value['imgPath']}}"
                                 src="{{env('CDN_Static')}}/images/product/bg-product@750.png" alt="">
                        </a>
                    </div>
                @endforeach
            @endif
    </div>
</section>

@include('footer')