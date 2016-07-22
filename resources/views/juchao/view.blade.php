<!DOCTYPE html>
<html>
<head>
    <title>NotFound 404</title>
    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            color: #B0BEC5;
            display: table;
            font-weight: 100;
            font-family: 'Lato', sans-serif;
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 72px;
            margin-bottom: 40px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="title">True</div>
        <input hidden id="jsonStr" value="{{$jsonResult}}">

        @foreach($result['spuAttrs'] as $k=>$spuAttrs)
            <div id="{{$spuAttrs['attr_type_value']}}" class="noclick">
                <span>{{$spuAttrs['attr_type_value']}}:::</span>
                @foreach($spuAttrs['skuAttrValues'] as $skuAttrValues)
                    <input onclick="clicksku(this,'{{$spuAttrs['attr_type_value']}}')" type="radio" class="{{$spuAttrs['attr_type_value']}}"
                           name="{{$spuAttrs['attr_type_value']}}" @if(!$skuAttrValues['stock']){{'disabled'}}@endif>{{$skuAttrValues['attr_value']}}
                @endforeach
            </div>
        @endforeach
    </div>
</div>
<script src="/jquery-3.0.0.min.js"></script>

<script>

    var str = $('#jsonStr').val()
    var data = eval('(' + str + ')');
    function clicksku(obj,attrValue) {
        $('#' + attrValue).attr('class','click')
        for (var i = 0; i < data.spuAttrs.length; i++) {
            alert($('#' + data.spuAttrs[i].attr_type_value).attr('class'))
            if (obj.id != data.spuAttrs[i].attr_type_value && $('#' + data.spuAttrs[i].attr_type_value).attr('class') == 'noclick') {
                var otherSku = data.spuAttrs[i].attr_type_value
                //alert(otherSku+"---sku")
            }
        }
    }
</script>
</body>
</html>
