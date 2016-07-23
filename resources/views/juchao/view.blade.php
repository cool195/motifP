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
        @foreach($result['spuAttrs'] as $k=>$spuAttrs)
            <div id="{{'attr_type'.$spuAttrs['attr_type']}}" class="noclick" dataid="{{$spuAttrs['attr_type']}}">
                <span>{{$spuAttrs['attr_type_value']}}:::</span>
                @foreach($spuAttrs['skuAttrValues'] as $skuAttrValues)
                    @if($skuAttrValues['stock'])
                        <input onclick="clicksku('{{$skuAttrValues['attr_value_id']}}')" type="radio"
                               name="{{'attr_type'.$spuAttrs['attr_type']}}"
                               id="{{'attr_value_id'.$skuAttrValues['attr_value_id']}}">{{$skuAttrValues['attr_value'].':'.$skuAttrValues['attr_value_id']}}
                    @else
                        <label>{{$skuAttrValues['attr_value']}}</label>
                    @endif

                @endforeach
            </div>
        @endforeach
    </div>
    <input hidden id="jsonStr" value="{{$jsonResult}}">
</div>
<script src="/jquery-3.0.0.min.js"></script>

<script>
    var str = $('#jsonStr').val()
    var data = eval('(' + str + ')')
    var arrayTemp_click = lastSkuArray = oldSkuArray = []

    //点击当前选项
    function clicksku(attr_value_id) {

        var parent = $('#attr_value_id' + attr_value_id).parent()

        if ($('#attr_value_id' + attr_value_id).attr('class') != 'onclick') {
            $('#attr_value_id' + attr_value_id).attr('class', 'onclick')
            parent.attr('class', 'click')

            onSkuClick(parent.attr('dataid'), attr_value_id)

            setLastSku()

            onclickStatic(lastSkuArray)
        } else {
            unclick(attr_value_id)
            $('#attr_value_id' + attr_value_id).attr('class', '')
        }


    }

    //取消当前选项并重置没有被选中的可用状态
    function unclick(attr_value_id) {
        var parent = $('#attr_value_id' + attr_value_id).parent()
        parent.attr('class', 'noclick')
        delete arrayTemp_click['key' + parent.attr('dataid')]
        onclickStatic(oldSkuArray)
    }

    //设置没有被点击的可用状态
    function onclickStatic(diffArray) {
        for (var i = 0; i < data.spuAttrs.length; i++) {
            var attr_type = 'attr_type' + data.spuAttrs[i].attr_type
            if ($('#' + attr_type).attr('class') == 'noclick') {
                for (var y = 0; y < data.spuAttrs[i].skuAttrValues.length; y++) {
                    overlap(diffArray, data.spuAttrs[i].skuAttrValues[y].skus)
                }
            }
        }
    }

    //将当前点击的SKU数组添加到要进行计算的总数组中
    function onSkuClick(attr_type, attr_value_id) {
        for (var i = 0; i < data.spuAttrs.length; i++) {
            if (attr_type == data.spuAttrs[i].attr_type) {
                for (var y = 0; y < data.spuAttrs[i].skuAttrValues.length; y++) {
                    if (attr_value_id == data.spuAttrs[i].skuAttrValues[y].attr_value_id) {
                        arrayTemp_click['key' + attr_type] = data.spuAttrs[i].skuAttrValues[y].skus
                    }
                }
            }
        }
    }

    //数组间是否存在交集
    function overlap(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) >= 0) {
                //找到交集,结束循环
                return true
            }
        }
        return false
    }

    //设置被选中属性后的SKU交集数组
    function setLastSku() {
        var loop = 0
        oldSkuArray = lastSkuArray
        for (var value in arrayTemp_click) {
            lastSkuArray = loop !== 0 ? array_intersection(lastSkuArray, arrayTemp_click[value]) : arrayTemp_click[value]
            loop = 1
        }
        console.log(lastSkuArray)
    }

    //去重
    function array_remove_repeat(a) {
        var r = [];
        for (var i = 0; i < a.length; i++) {
            var flag = true;
            var temp = a[i];
            for (var j = 0; j < r.length; j++) {
                if (temp === r[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                r.push(temp);
            }
        }
        return r;
    }

    //获取两个数组的所有交集
    function array_intersection(a, b) {
        var result = [];
        for (var i = 0; i < b.length; i++) {
            var temp = b[i];
            for (var j = 0; j < a.length; j++) {
                if (temp === a[j]) {
                    result.push(temp);
                    break;
                }
            }
        }
        return array_remove_repeat(result);
    }
</script>
</body>
</html>
