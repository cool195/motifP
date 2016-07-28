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

    // 加载动画显示
    function loadingShow(CurrentTab) {
        $('.loading').show();
    }

    // 加载动画隐藏
    function loadingHide(CurrentTab) {
        $('.loading').hide();
    }

    // 初始化商品图片列表 Swiper
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
    $('.productImg-item img').on('click', function () {
        if (!$(this).hasClass('active')) {
            var ImgUrl = $(this).attr('src');
            $('.productImg-item img').removeClass('active');
            $(this).addClass('active');
            $('.product-bigImg').attr('src', ImgUrl);
        }
    });

    // 选择 商品属性
    var product_data = eval('(' + $('#jsonStr').val() + ')')
    var spuAttrs = typeof(product_data) != "undefined" ? product_data.spuAttrs : '';
    var product_arrayTemp_click = [] //被选中的总数组

    //点击属性事件
    $('.btn-itemProperty').on('click', function () {
        var ItemType = $(this).data('type');
        if (ItemType !== '' && !$(this).hasClass('disabled')) {
            $('#skuQty').data('num', 1);
            $('#skuQty').html(1);
            $('#delQtySku').addClass('disabled');
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                delete product_arrayTemp_click['key' + $(this).attr('data-attr-type')];
                $('#p_a_w' + $(this).attr('data-attr-type')).data('sel', 0);
                if ($('#productsku').val()) {
                    $('#productsku').val('');
                }
            } else {
                $('.btn-itemProperty[data-type=' + ItemType + ']').removeClass('active');
                $(this).addClass('active');
                $('#p_a_w' + $(this).attr('data-attr-type')).data('sel', 1);
                if (!$('#p_a_w' + $(this).data('attr-type')).hasClass('off')) {
                    $('#p_a_w' + $(this).data('attr-type')).addClass('off')
                }
            }
            product_onclickStatic(product_onSkuClick($(this).attr('data-attr-type'), $(this).attr('data-attr-value-id'),$(this).hasClass('active')), $(this).attr('data-attr-type'),$(this).hasClass('active'));
            product_setLastSku()
        }
    });

    //将当前点击的SKU数组添加到要进行计算的总数组中
    function product_onSkuClick(attr_type, attr_value_id,status) {
        var nowClickArray = []
        for (var i = 0; i < spuAttrs.length; i++) {
            if (attr_type == spuAttrs[i].attr_type) {
                for (var y = 0; y < spuAttrs[i].skuAttrValues.length; y++) {
                    if (attr_value_id == spuAttrs[i].skuAttrValues[y].attr_value_id) {
                        !status ? nowClickArray = spuAttrs[i].skuAttrValues[y].skus : product_arrayTemp_click['key' + attr_type] = nowClickArray = spuAttrs[i].skuAttrValues[y].skus;
                    }
                }
            }
        }
        return nowClickArray;
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
        console.log(product_lastSkuArray);
    }

    //操作后的可用状态
    function product_onclickStatic(nowClickArray, nowAT,clickStatus) {
        for (var i = 0; i < spuAttrs.length; i++) {
            if (nowAT != spuAttrs[i].attr_type) {
                for (var y = 0; y < spuAttrs[i].skuAttrValues.length; y++) {
                    var is = false;
                    for (var x = 0; x < spuAttrs[i].skuAttrValues[y].skus.length; x++) {
                        $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).removeClass('disabled');
                        if (nowClickArray.indexOf(spuAttrs[i].skuAttrValues[y].skus[x]) >= 0) {
                            //找到交集,结束循环
                            if ($('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).hasClass('disabled')) {
                                $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).removeClass('disabled');
                            }
                            is = true;
                            break;
                        }
                    }
                    if (!is) {
                        clickStatus ? $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).addClass('disabled') : $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).removeClass('disabled');
                    }
                }
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

    //sku库存临时缓存
    var product_cache_skuQty = []
    //获取sku库存
    function product_getSkuQty(sku) {
        for (var value in product_data.skuExps) {
            if (product_data.skuExps[value].sku == sku) {
                product_cache_skuQty[sku] = product_data.skuExps[value].stock_qtty;
                return product_data.skuExps[value].stock_qtty;
            }
        }
    }

    //修改购买数量
    $('.patb').on('click', function (e) {
        if ($('#productsku').val()) {
            var skuQty = $('#skuQty').data('num') + $(this).data('num');
            var product_stock_qtty = product_cache_skuQty[$('#productsku').val()] ? product_cache_skuQty[$('#productsku').val()] : product_getSkuQty($('#productsku').val());
            if (skuQty > 0 && skuQty <= product_stock_qtty) {
                $('#delQtySku').hasClass('disabled') ? $('#delQtySku').removeClass('disabled') : false;
                $('#skuQty').data('num', skuQty);
                $('#skuQty').html(skuQty);
            }
            else if (skuQty > 20 && $(this).data('num') > 0) {
                if (!$('#addQtySku').hasClass('disabled')) {
                    checkStock($('#productsku').val() + '_' + skuQty);
                }
                $('#addQtySku').addClass('disabled');
            } else if (skuQty > product_stock_qtty && $(this).data('num') > 0) {
                alert('库存不足');
            }
            if (skuQty <= 1) {
                !$('#delQtySku').hasClass('disabled') ? $('#delQtySku').addClass('disabled') : false;
            }
        } else {
            !$('#delQtySku').hasClass('disabled') || $(this).data('num') > 0 ? pSelAttr() : false;
        }
    });
    //检查库存
    function checkStock(skus) {
        $.ajax({
            url: '/checkStock',
            type: 'POST',
            data: {
                skus: skus
            }
        })
            .done(function (data) {
                if (data.success) {
                    if (data.data.list[0].stockStatus === 1) {
                        $('#skuQty').data('num', $('#skuQty').data('num') + 1);
                        $('#skuQty').html($('#skuQty').data('num'));
                        product_cache_skuQty[data.data.list[0].sku] = product_cache_skuQty[data.data.list[0].sku] + 1;
                        $('#addQtySku').removeClass('disabled');
                    }
                } else {
                    alert('库存不足')
                }
            });
    }

    // 添加购物车
    $('#productAddBag').on('click', function (e) {
        if ($('#productsku').val()) {
            var operate = {
                'sale_qtty': $('#skuQty').data('num'),
                'select': true,
                'sku': $('#productsku').val(),
                'VAList': []
            };


            $.each(product_data.vasBases, function (index, val) {
                if (!$('#vas_id' + val.vas_id).hasClass('disabled') && $('#vas_id' + val.vas_id).val()) {
                    operate.VAList.push({'vas_id': val.vas_id, 'user_remark': $('#vas_id' + val.vas_id).val()});
                }
            });
            $.ajax({
                url: '/cart/add',
                type: 'POST',
                data: {
                    operate: operate
                }
            })
                .done(function (data) {
                    if (data.success) {
                        alert('ok')
                    } else {
                        alert('error')
                    }
                });
        } else {
            pSelAttr();
        }
    });

    // 属性验证
    function pSelAttr() {
        $.each(product_data.spuAttrs, function (index, val) {
            if ($('#p_a_w' + val.attr_type).data('sel') == 0) {
                $('#p_a_w' + val.attr_type).focus();
                $('#p_a_w' + val.attr_type).removeClass('off');
                $("html,body").animate({scrollTop: $('#p_a_w' + val.attr_type).offset().top}, 200);
                return false;
            }
        });
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
            $(this).siblings('.input-engraving').val('');
            $(this).siblings('.input-engraving').addClass('disabled');
        }
    });

    // 点击 "心" 关注商品
    $('.product-heart').on('click', function () {
        $(this).toggleClass('active');
    });

    // Shopping Cart
    // 初始化 确认删除 弹出框
    try {
        var CartOptions = {
            closeOnOutsideClick: false,
            closeOnCancel: false,
            hashTracking: false
        };
        var CartModal = $('[data-remodal-id=cartmodal]').remodal(CartOptions);
    } catch (e) {
    }

    // 触发删除 购物车商品
    $('[data-type="cart-remove"]').on('click', function () {
        CartModal.open();
    });

    // Checkout
    // 控制 div 显示隐藏
    $('.btn-showHide').on('click', function () {
        if ($(this).children('.showHide-simpleInfo').length > 0) {
            var $AddressContent = $(this).siblings('.showHide-body');
            if ($AddressContent.hasClass('active')) {
                $AddressContent.slideUp(500);
                $AddressContent.removeClass('active');
                $(this).removeClass('active');
            } else {
                $AddressContent.slideDown(500);
                $AddressContent.addClass('active');
                $(this).addClass('active');
            }
        } else {
            var $AddressContent = $(this).siblings('.showHide-body');
            var $SimpleInfo = $(this).siblings('.showHide-simpleInfo');
            if ($AddressContent.hasClass('active')) {
                $AddressContent.slideUp(500);
                $AddressContent.removeClass('active');
                $(this).removeClass('active');
                $AddressContent.css('display', 'none');
                $SimpleInfo.css('display', 'block');
            } else {
                $AddressContent.slideDown(500);
                $AddressContent.addClass('active');
                $(this).addClass('active');
                $AddressContent.css('display', 'flex');
                $SimpleInfo.css('display', 'none');
            }
        }
    });

    // 选择地址
    $('.address-item').on('click', function () {
        $('.address-item').removeClass('active');
        $(this).addClass('active');
    });

    // Login
    // 验证电子邮件的情况
    $('input[name="email"]').on('keyup blur', function () {
        var InputText = $(this).val();
        if (InputText === '' || InputText === undefined) {
            $(this).siblings('.input-clear').addClass('hidden');
        } else {
            $(this).siblings('.input-clear').removeClass('hidden');
        }
    });

    // 清除输入
    $('.input-clear').on('click', function (e) {
        $(e.target).siblings('input').val('');
        $(this).addClass('hidden');
    });

    // 查看密码
    $('.input-show').on('click', function (e) {
        var $Password = $(e.target).siblings('input');

        if ($(e.target).hasClass('off')) {
            $Password.attr('type', 'text');
            $(e.target).removeClass('off');
        } else {
            $Password.attr('type', 'password');
            $(e.target).addClass('off');
        }
    });

    // 点击登录
    $('[data-role="login-submit"]').on('click', function () {
        console.info('登录');
    });

    // 点击 忘记忘记 发送邮件
    $('[data-role="restPwd-submit"]').on('click', function () {
        console.info('Rest Password');
    });

    // 忘记密码入口
    $('.btn-forgotPwd').on('click', function () {
        $('.login-content').addClass('hidden').removeClass('active');
        $('.restPwd-content').removeClass('hidden').addClass('active');
        $('.login-title').text('Forget Password?');
    });

    // 返回登录入口
    $('.btn-backLogin').on('click', function () {
        $('.restPwd-content').addClass('hidden').removeClass('active');
        $('.login-content').removeClass('hidden').addClass('active');
        $('.login-title').text('Sign in with Motif Account');
    });
})(jQuery, Swiper);
//# sourceMappingURL=common.js.map


//public start
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
//public end