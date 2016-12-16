<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <title>{{$title or 'Exclusive Fashion Accessories Designed by the World’s Top Fashion Bloggers, Instagrammers and Digital Influencers'}} @if('daily' != $page)
            | MOTIF @endif</title>
    <meta property="og:image"
          content="{{$ogimage or config('runtime.Image_URL').'/images/logo/logo.png'}}{{config('runtime.V')}}">
    <meta name="description"
          content="{{$description or 'Your style is unique and cutting edge - your fashion should be too.Exclusive, limited edition accessories designed by the world’s top fashion bloggers, Instagrammers and digital influencers.'}}">
    <meta name="keywords"
          content="{{$keywords or 'fashion,style,shop,accessory,jewelry,watch,blogger,Instagram,designer,limited,edition,ecommerce,buy'}}">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon"
          href="{{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">
    <link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/common.css{{config('runtime.V')}}">
    @if (env('APP_ENV') == 'production')
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:350201,hjsv:5};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
        </script>
        <script type='text/javascript'>
            var _vwo_code=(function(){
                var account_id=266886,
                        settings_tolerance=2000,
                        library_tolerance=2500,
                        use_existing_jquery=false,
                /* DO NOT EDIT BELOW THIS LINE */
                        f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
        </script>
    @endif
</head>
<body>
<section class="">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="box-shadow bg-white">
                    <div class="p-x-20x p-t-20x">
                        <input hidden id="jsonStr" value="{{$jsonResult}}">
                        @if(!empty($data['spuAttrs']))
                            <input hidden id="productsku">
                            @foreach($data['spuAttrs'] as $spuAttr)
                                <fieldset class="text-left m-b-20x">
                                    <div class="text-primary font-size-md flex">
                                        <span class="p-r-20x">{{$spuAttr['attr_type_value']}}:</span>
                                        <span class="warning-info flex flex-alignCenter text-warning off"
                                              id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">{{'Please select '.$spuAttr['attr_type_value']}}
                                                !</span>
                                        </span>
                                    </div>
                                    <div class="m-l-15x">
                                        <div class="option-item">
                                            @foreach($spuAttr['skuAttrValues'] as $skuAttrValue )
                                                <div class="p-y-5x p-r-10x">
                                                    @if(!empty($skuAttrValue['skus']))
                                                        <a href="javascript:;" class="btn btn-itemProperty btn-sm"
                                                           @if($skuAttrValue['img_path'])
                                                           rel="{{"{gallery: 'gal1', smallimage: '".config('runtime.CDN_URL')}}/n1/{{$skuAttrValue['img_path']."',largeimage: '".config('runtime.CDN_URL')}}/n0/{{$skuAttrValue['img_path']."'}"}}"
                                                           @endif
                                                           id="{{'skutype'.$skuAttrValue['attr_value_id']}}"
                                                           data-type="{{'attr_type'.$spuAttr['attr_type']}}"
                                                           data-attr-type="{{$spuAttr['attr_type']}}"
                                                           data-attr-value-id="{{$skuAttrValue['attr_value_id']}}"
                                                           data-id="{{'skutype'.$skuAttrValue['attr_value_id']}}">{{$skuAttrValue['attr_value']}}
                                                        </a>
                                                    @else
                                                        <div class="btn btn-itemProperty btn-sm disabled">{{$skuAttrValue['attr_value']}}</div>
                                                    @endif
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </fieldset>
                            @endforeach
                        @else
                            <input hidden id="productsku" value="{{$data['skuPrice']['sku']}}">
                        @endif
                        @if(isset($data['vasBases']))
                            @foreach($data['vasBases'] as $vas)
                                <fieldset class="text-left m-b-20x">
                                    <div class="text-primary font-size-md">{{ucfirst(strtolower($vas['vas_describe']))}}
                                        +${{number_format(($vas['vas_price'] / 100), 2)}}</div>
                                    <div class="m-l-15x">
                                        <div class="p-y-5x flex flex-alignCenter">
                                            <input type="text" id="{{'vas_id'.$vas['vas_id']}}"
                                                   class="input-engraving form-control m-r-20x text-primary disabled">
                                            <i class="iconfont icon-checkcircle text-primary font-size-lg"></i>
                                        </div>
                                        <span class="warning-info flex flex-alignCenter text-warning off">
                                            <i class="iconfont icon-caveat icon-size-md p-r-5x"></i>
                                            <span class="font-size-base">Invalid character</span>
                                        </span>
                                    </div>
                                </fieldset>
                            @endforeach
                        @endif
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>


<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/card.js{{config('runtime.V')}}"></script>
<script src="{{config('runtime.Image_URL')}}/scripts/protest.js{{config('runtime.V')}}"></script>

</body>
</html>