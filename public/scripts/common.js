'use strict';

window.onload = function () {
    // 初始化瀑布流
    try {
        var wookmark1 = new Wookmark('#wookmark1', {
            container: $('#wookmark1'),
            align: 'center',
            offset: 20,
            itemWidth: "23.5%"
        });
    } catch (e) {
    }
};

(function ($, Swiper) {

    // ShoppingDetail.html
    // 初始化商品图片列表 Swiper

    // 加载动画显示
    function loadingShow(CurrentTab) {
        $('.loading').show();
    }

    // 加载动画隐藏
    function loadingHide(CurrentTab) {
        $('.loading').hide();
    }

    try {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true,
            slidesPerView: 'auto',
            freeModeMomentumRatio: .5
        });
    } catch (e) {
    }

    // 点击选择图片
    $('.productImg-item img').on('click', function (e) {
        if (!$(this).hasClass('active')) {
            var ImgUrl;
            $('.productImg-item img').removeClass('active');
            $(this).addClass('active');
            ImgUrl = $(this).attr('src');
            $('.product-bigImg').attr('src', ImgUrl);
        }
    });

    // 选择 商品属性
    var spuAttrs = eval('(' + $('#jsonStr').val() + ')')
    var product_arrayTemp_click = [] //被选中的总数组

    $('.btn-itemProperty').on('click', function () {
        var ItemType = $(this).data('type');
        if (ItemType !== '') {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                delete product_arrayTemp_click['key' + $(this).attr('data-attr-type')];
            } else {
                $('.btn-itemProperty[data-type=' + ItemType + ']').removeClass('active');
                $(this).addClass('active');
                product_onSkuClick($(this).attr('data-attr-type'), $(this).attr('data-attr-value-id'));
            }
            product_onclickStatic(product_setLastSku());
        }
    });

    //将当前点击的SKU数组添加到要进行计算的总数组中
    function product_onSkuClick(attr_type, attr_value_id) {
        for (var i = 0; i < spuAttrs.length; i++) {
            if (attr_type == spuAttrs[i].attr_type) {
                for (var y = 0; y < spuAttrs[i].skuAttrValues.length; y++) {
                    if (attr_value_id == spuAttrs[i].skuAttrValues[y].attr_value_id) {
                        product_arrayTemp_click['key' + attr_type] = spuAttrs[i].skuAttrValues[y].skus;
                    }
                }
            }
        }
    }

    //设置被选中属性后的SKU交集数组
    function product_setLastSku() {
        var loop = 0;
        var product_lastSkuArray = [] //被选中的交集数组
        for (var value in product_arrayTemp_click) {
            product_lastSkuArray = loop !== 0 ? product_array_intersection(product_lastSkuArray, product_arrayTemp_click[value]) : product_arrayTemp_click[value];
            loop = 1;
        }
        if (product_lastSkuArray.length == 1) {
            $('#productsku').val(product_lastSkuArray[0])
        }
        return product_lastSkuArray
    }

    //操作后的可用状态
    function product_onclickStatic(lastSkuArray) {
        for (var i = 0; i < spuAttrs.length; i++) {
            for (var y = 0; y < spuAttrs[i].skuAttrValues.length; y++) {
                for (var i = 0; i < lastSkuArray.length; i++) {
                    if (spuAttrs[i].skuAttrValues[y].skus.indexOf(lastSkuArray[i]) >= 0) {
                        //找到交集,结束循环
                        if ($('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).hasClass('disabled')) {
                            $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).removeClass('disabled');
                        }
                        return true
                    }
                }
                $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).addClass('disabled');
                return false
            }
        }
    }

    //去重
    function product_array_remove_repeat(a) {
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
    function product_array_intersection(a, b) {
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
        return product_array_remove_repeat(result);
    }

    // 选择 商品增值服务
    $('.input-engraving').on('click', function () {
        $(this).removeClass('disabled');
        $(this).siblings('.icon-checkcircle').addClass('active');
    });
    $('.icon-checkcircle').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).siblings('.input-engraving').removeClass('disabled');
        } else {
            $(this).siblings('.input-engraving').addClass('disabled');
        }
    });
})(jQuery, Swiper);
//# sourceMappingURL=common.js.map
