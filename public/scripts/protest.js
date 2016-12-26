var product_data = eval('(' + $('#jsonStr').val() + ')');
var spuAttrs = typeof(product_data) != "undefined" ? product_data.spuAttrs : '';

if (spuAttrs != undefined && spuAttrs.length == 1) {
    if (spuAttrs[0].skuAttrValues.length == 1) {
        $('#p_a_w' + spuAttrs[0].attr_type).data('sel', 1);
        $('#productsku').val(product_data.main_sku);
        $('#skutype' + spuAttrs[0].skuAttrValues[0].attr_value_id).addClass('active');
    }
}

var product_arrayTemp_click = [];

$('.btn-itemProperty').on('click', function() {
    var ItemType = $(this).data('type')
    if(ItemType !== '' && !$(this).hasClass('disabled')) {
        if($(this).hasClass('active')) {
            $(this).removeClass('active')
            delete product_arrayTemp_click['key' + $(this).attr('data-attr-type')];
            $('#p_a_w' + $(this).attr('data-attr-type')).data('sel', 0);
            if( $('#productsku').val()) {
                $('#productsku').val('');
            }
        } else {
            $('.btn-itemProperty[data-type=' + ItemType + ']').removeClass('active');
            $(this).addClass('active');
            $('#p_a_w' + $(this).attr('data-attr-type')).data('sel', 1);
            if(!$('#p_a_w' + $(this).data('attr-type')).hasClass('off')){
                $('#p_a_w' + $(this).data('attr-type')).addClass('off');
            }
        }
    }
    var nowClickArray = product_getNowClickArray($(this).attr('data-attr-type'), $(this).attr('data-attr-value-id'), $(this).hasClass('active'));
    product_onclickStatic(nowClickArray, $(this).attr('data-attr-type'), $(this).hasClass('active'));

})

function product_getNowClickArray(attr_type, attr_value_id, status) {
    var nowClickArray = [];
    for (var i = 0; i < spuAttrs.length; i++){
        if(attr_type == spuAttrs[i].attr_type) {
            for( var j = 0; j < spuAttrs[i].skuAttrValues.length; j++){
                if( attr_value_id == spuAttrs[i].skuAttrValues[j].attr_value_id) {
                    //todo
                    !status ? nowClickArray = spuAttrs[i].skuAttrValues[j].skus : product_arrayTemp_click['key' + attr_type] = nowClickArray = spuAttrs[i].skuAttrValues[j].skus;
                    console.log(product_arrayTemp_click);
                    break;
                }
            }
            break;
        }
    }
    return nowClickArray;
}

function product_onclickStatic(nowClickArray, nowAttrType, clickStatus) {
    var lastSku = product_setLastSku();
    console.log(lastSku);
    for (var i = 0; i < spuAttrs.length; i++) {
        if(nowAttrType != spuAttrs[i].attr_type){
            //var _tempArr = nowClickArray;
            var _tempArr = product_getOtherIntersectionSku(spuAttrs[i].attr_type, nowClickArray);
            if($('#p_a_w' + spuAttrs[i].attr_type).data('sel') == 0) {
                _tempArr = lastSku;
            }
            for (var j = 0; j < spuAttrs[i].skuAttrValues.length; j++){
                var is = false;
                for(var k = 0; k < spuAttrs[i].skuAttrValues[j].skus.length; k++){
                    if( _tempArr.indexOf(spuAttrs[i].skuAttrValues[j].skus[k]) >= 0) {
                        //找到交集,结束循环
                        if($('#skutype' + spuAttrs[i].skuAttrValues[j].attr_value_id).hasClass('disabled')) {
                            $('#skutype' + spuAttrs[i].skuAttrValues[j].attr_value_id).removeClass('disabled');
                        }
                        is = true;
                        break;
                    }
                }

                if(!is){
                   clickStatus ? $('#skutype' + spuAttrs[i].skuAttrValues[j].attr_value_id).addClass('disabled') : $('#skutype' + spuAttrs[i].skuAttrValues[j].attr_value_id).removeClass('disabled');
                }
            }
        }
    }
}

function product_setLastSku(){
    var loop = 0;
    var product_lastSkuArray = []; //被选中的交集数组
    for (var key in product_arrayTemp_click) {
        product_lastSkuArray = loop !== 0 ? product_array_intersection(product_lastSkuArray, product_arrayTemp_click[key]) : product_arrayTemp_click[key];
        //console.log(product_lastSkuArray);
        loop = 1;
    }
    if(product_lastSkuArray.length == 1) {

    }
    //console.log(product_lastSkuArray);
    return product_lastSkuArray;
}

function product_getOtherIntersectionSku(nowAttrType, nowClickArray){
    //var product_otherIntersectionArray = product_arrayTemp_click['key' + nowAttrType];
    var product_otherIntersectionArray = nowClickArray;
    for (var key in product_arrayTemp_click) {
        if(('key' + nowAttrType) == key){
            continue
        }
        product_otherIntersectionArray = product_array_intersection(product_otherIntersectionArray, product_arrayTemp_click[key]);
    }
    console.log(product_otherIntersectionArray);
    return product_otherIntersectionArray;

}

//获取两个数组的所有交集
function product_array_intersection(lastSkuArray, tempArray){
    var result = [];
    for(var i = 0; i < tempArray.length; i++){
        var temp = tempArray[i];
        for(var j = 0; j < lastSkuArray.length; j++){
            if(temp === lastSkuArray[j]){
                result.push(temp);
                break;
            }
        }
    }
    return product_array_remove_repeat(result);
}

function product_array_remove_repeat(result){
    var r = [];
    for (var i = 0; i < result.length; i++){
        var flag = true;
        var temp = result[i];
        for(var j = 0; j < r.length; j++){
            if (temp === r[j]){
                flag = false;
                break;
            }
        }
        if(flag) {
            r.push(temp);
        }
    }
    return r;
}




