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
</head>
<body>
    <input hidden id="jsonStr" value="{{$jsonResult}}">
    @if(!empty($data['spuAttrs']))
        <input hidden id="productsku">
        @foreach($data['spuAttrs'] as $spuAttr)
            <div class="text-primary font-size-md flex">
                <span class="warning-info flex flex-alignCenter text-warning off" id="{{'p_a_w'.$spuAttr['attr_type']}}" data-sel="0"></span>
            </div>
            <span>{{$spuAttr['attr_type_value']}}:</span>
            <select class="btn btn-itemProperty btn-sm">
                <option data-type="{{'attr_type'.$spuAttr['attr_type']}}"
                        data-attr-type="{{$spuAttr['attr_type']}}" class="choose" value="Please Select">Please Select</option>
                @foreach($spuAttr['skuAttrValues'] as $skuAttrValue)
                    @if(!empty($skuAttrValue['skus']))
                        <option class="btn btn-sm"
                                id="{{'skutype'.$skuAttrValue['attr_value_id']}}"
                                data-type="{{'attr_type'.$spuAttr['attr_type']}}"
                                data-attr-type="{{$spuAttr['attr_type']}}"
                                data-attr-value-id="{{$skuAttrValue['attr_value_id']}}"
                                data-id="{{'skutype'.$skuAttrValue['attr_value_id']}}"
                                value="{{$skuAttrValue['attr_value']}}">{{$skuAttrValue['attr_value']}}</option>
                    @endif
                @endforeach
            </select>
            <br/>
        @endforeach
    @endif
    <script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
    <script src="{{config('runtime.Image_URL')}}/scripts/card.js{{config('runtime.V')}}"></script>
    <script src="{{config('runtime.Image_URL')}}/scripts/proselect.js{{config('runtime.V')}}"></script>
</body>
</html>