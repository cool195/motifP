/*global jQuery Swiper template*/

'use strict';

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
        // 设计师 产品列表
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true,
            slidesPerView: 'auto',
            freeModeMomentumRatio: .5
        });

        // daily 页面 banner 轮播
        var swiper1 = new Swiper('.bannerSwiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            effect: 'fade'
            // autoplay: 2500
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
            product_onclickStatic(product_onSkuClick($(this).attr('data-attr-type'), $(this).attr('data-attr-value-id'), $(this).hasClass('active')), $(this).attr('data-attr-type'), $(this).hasClass('active'));
            product_setLastSku()
        }
    });

    //将当前点击的SKU数组添加到要进行计算的总数组中
    function product_onSkuClick(attr_type, attr_value_id, status) {
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
    }

    //操作后的可用状态
    function product_onclickStatic(nowClickArray, nowAT, clickStatus) {
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
                AddItemFailModal.open();
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
                    AddItemFailModal.open();
                    setTimeout(function () {
                        AddItemFailModal.close();
                    }, 1500);
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
            $('#productAddBag').addClass('disabled');
            $.ajax({
                    url: '/cart/add',
                    type: 'POST',
                    data: {
                        operate: operate
                    }
                })
                .done(function (data) {
                    $('#productAddBag').removeClass('disabled');
                    if (data.success) {
                        // 弹出 成功添加购物车 提示
                        AddItemModal.open();
                        setTimeout(function () {
                            AddItemModal.close();
                        }, 1500);
                        if ($('.shoppingCart-number').hasClass('hidden')) {
                            $('.shoppingCart-number').removeClass('hidden');
                        }
                    } else {
                        AddItemFailModal.open();
                        setTimeout(function () {
                            AddItemFailModal.close();
                        }, 1500);
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
    $('.btn-wish').on('click', function () {
        var $this = $(this);
        $.ajax({
                url: '/wishlist/' + $this.data('spu'),
                type: 'GET',
            })
            .done(function (data) {
                if (data.success) {
                    $this.toggleClass('active');
                }
            });

    });

    $('#productList-container').on('click', '.btn-wishList', function(e) {
       var $this = $(e.target);
       var spu = $this.data('spu');
        $.ajax({
            url: '/wishlist/' + spu,
            type: 'GET',
        })
            .done(function (data) {
                if(data.success) {
                    $this.toggleClass('active');
                }
            })
    });

    // Shopping Cart
    // 初始化 确认删除 弹出框
    try {
        var Options = {
            closeOnOutsideClick: false,
            closeOnCancel: false,
            hashTracking: false
        };
        // 删除购物车商品 提示框
        var CartModal = $('[data-remodal-id=cartmodal]').remodal(Options);
        // Shopping Detail 添加购物车成功 提示框
        var AddItemModal = $('[data-remodal-id=additem-modal]').remodal(Options);
        // Shopping Detail 添加购物车失败 提示框
        var AddItemFailModal = $('[data-remodal-id=additemfail-modal]').remodal(Options);
        // Address List 删除地址 提示框
        var DelAddressModal = $('[data-remodal-id=addressmodal-modal]').remodal(Options);
    } catch (e) {
    }

    //购物车修改购买数量
    $('.cupn').on('click', function (e) {
        var tObj = $(this);
        var nowsku = tObj.data('sku');
        if (nowsku && !tObj.hasClass('disabled')) {
            tObj.addClass('disabled');
            var skuQty = $('#cskunum' + nowsku).html() * 1 + tObj.data('num');
            $.ajax({
                    url: 'cart/alterQtty',
                    type: 'POST',
                    data: {
                        sku: nowsku,
                        qtty: skuQty,
                    }
                })
                .done(function (data) {
                    if (data.success) {
                        $('#cskunum' + nowsku).html(skuQty);
                        tObj.removeClass('disabled');
                        if (skuQty == 2) $('#cdsku' + nowsku).removeClass('disabled');
                        if (skuQty == 1) $('#cdsku' + nowsku).addClass('disabled');
                        cart_update_info();
                    } else {
                        AddItemFailModal.open();
                    }
                });

        }
    });

    //动态更新购物车价格总数量
    function cart_update_info() {
        $.ajax({
                url: '/cart/list',
                type: 'GET',
            })
            .done(function (data) {
                if (data.success) {
                    if (data.data != '') {
                        $('#total_amount').html('$' + data.data.total_amount / 100);
                        $('#total_sku_qtty').html('Items(' + data.data.total_sku_qtty + '):');
                        $('#vas_amount').html('$' + data.data.vas_amount / 100);
                        $('#pay_amount').html('$' + data.data.pay_amount / 100);
                    } else {
                        location.reload();
                    }

                }
            });
    }

    //购物车相关操作
    $('.cartManage').on('click', function (e) {
        var action = $(this).data('action');
        var sku = $(this).data('sku');
        var thisParent = $(this).parents('.cartProduct-item');
        $.ajax({
                url: '/cart/operate',
                type: 'POST',
                data: {cmd: action, sku: sku}
            })
            .done(function (data) {
                if (data.success) {
                    if (action == 'movetocart' || action == 'save') {
                        location.reload();
                    } else {
                        thisParent.remove();
                        cart_update_info();
                    }
                } else {
                    AddItemFailModal.open();
                }
            });
    });

    //购物车删除操作
    $('.delCartM').on('click', function () {
        var action = $('#modalDialog').data('action');
        var sku = $('#modalDialog').data('sku');
        var id = $('#modalDialog').data('id');

        $.ajax({
                url: '/cart/operate',
                type: 'POST',
                data: {cmd: action, sku: sku}
            })
            .done(function (data) {
                if (data.success) {
                    if (action == 'movetocart' || action == 'save') {
                        location.reload();
                    } else {
                        $('#csku' + sku).remove();
                        cart_update_info();
                    }
                }
                CartModal.close();
            });
    });

    // 触发删除 购物车商品
    $('[data-type="cart-remove"]').on('click', function () {
        $('#modalDialog').data('action', $(this).data('action'));
        $('#modalDialog').data('sku', $(this).data('sku'));
        CartModal.open();
    });

    //验证表单
    function checkValid($input) {
        var value = $input.val();
        if (value == '' || value == undefined) {
            $input.siblings('.warning-info').removeClass('off');
            return false;
        }
        return true;
    }

    // Checkout Start
    $('#addAddress').on('click', function () {
        var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        var $email = $('input[name="email"]'),
            $name = $('input[name="name"]'),
            $city = $('input[name="city"]'),
            $tel = $('input[name="tel"]'),
            $addr1 = $('input[name="addr1"]'),
            $zip = $('input[name="zip"]');
        if (reg.test($email.val()) && checkValid($email) && checkValid($name) && checkValid($city) && checkValid($tel) && checkValid($addr1) && checkValid($zip)) {
            var Aid = $('#addAddressForm').data('aid');
            if (Aid === '' || Aid === undefined) {
                $.ajax({
                        url: '/address',
                        type: 'POST',
                        data: $('#addAddressForm').serialize()
                    })
                    .done(function (data) {
                        if (data.success) {
                            $('.select-address').removeClass('disabled');
                            $('.add-address').addClass('disabled');
                            $('#addAddressForm').find('input[type="text"]').val('');
                            getAddressList();
                        }
                    })
            } else {
                if ($('.isDefault').hasClass('active')) {
                    $('input[name="isd"]').val(1);
                } else {
                    $('input[name="isd"]').val(0);
                }

                $.ajax({
                        url: '/address/' + Aid,
                        type: 'PUT',
                        data: $('#addAddressForm').serialize()
                    })
                    .done(function (data) {
                        if (data.success) {
                            $('.select-address').removeClass('disabled');
                            $('.add-address').addClass('disabled');
                            $('#addAddressForm').find('input[type="text"]').val('');
                            getAddressList();
                        }
                    })
            }

        }
        return false;
    });

    //  取消 添加/修改地址
    $('#addAddress-cancel').on('click', function () {
        $('.select-address').removeClass('disabled');
        $('.add-address').addClass('disabled');
        $('#addAddressForm').find('input[type="text"]').val('');
        $('select[name="country"]').prop('selectedIndex', 0);

    });

    //焦点事件去掉warning
    $('#addAddressForm input[type="text"]').on('focus', function () {
        $(this).siblings('.warning-info').addClass('off');
    });

    // 控制 div 显示隐藏
    $('.btn-showHide').on('click', function () {
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
    });
    // 单独控制 Promotion Code div 的显示隐藏
    $('.btn-codeShowHide').on('click', function () {
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
    });

    // 提交 Promotion Code
    $('#pcsubmit').on('click', function () {
        var $this = $(this);
        if ($('input[name="ccps"]').val() != '') {
            $.ajax({
                    url: '/cart/accountlist?couponcode=' + $('input[name="ccps"]').val() + '&logisticstype=' + $('input[name="shippingMethod"]:checked').val(),
                    type: 'GET',
                })
                .done(function (data) {
                    if (data.success) {
                        $('.promotion-code').removeClass('hidden');
                        $('#pcode').html($('input[name="ccps"]').val() + ' -$' + (data.data.cps_amount / 100).toFixed(2));
                        $('.code-price').html('-$' + (data.data.cps_amount / 100).toFixed(2));
                        $('.code-price').data('price', data.data.cps_amount);
                        $('.totalPrice').html('$' + (data.data.pay_amount / 100).toFixed(2));
                        //收起
                        var $AddressContent = $this.parent().parent('.showHide-body');
                        var $SimpleInfo = $this.parent().parent().siblings('.showHide-simpleInfo');
                        $AddressContent.slideUp(500);
                        $AddressContent.removeClass('active');
                        $this.removeClass('active');
                        $AddressContent.css('display', 'none');
                        $SimpleInfo.css('display', 'block');
                        $this.parent().siblings('.warning-info').addClass('off');
                    } else {
                        $this.parent().siblings('.warning-info').removeClass('off');
                        setTimeout(function () {
                            $this.parent().siblings('.warning-info').addClass('off');
                        }, 1500);
                    }
                })
        } else {
            $this.parent().siblings('.warning-info').removeClass('off');
            setTimeout(function () {
                $this.parent().siblings('.warning-info').addClass('off');
            }, 1500);
        }


    });

    // 设置地址为默认地址
    $('.btn-makePrimary').on('click', function () {
        if ($(this).hasClass('active')) {
            $('input[name="isd"]:eq(1)').attr("checked", 'checked');
        } else {
            $('input[name="isd"]:eq(0)').attr("checked", 'checked');
        }
    });

    // 控制 div 显示隐藏
    $('#btnAddrShowHide').on('click', function () {
        if ($('#addrShowHide').children('.showHide-simpleInfo').length > 0) {
            var $AddressContent = $('#addrShowHide').siblings('.showHide-body');
            if ($AddressContent.hasClass('active')) {
                $AddressContent.slideUp(500);
                $AddressContent.removeClass('active');
                $('#addrShowHide').removeClass('active');
            }
        }
    });

    // 选择地址
    $('.address-list').on('click', '.bg-address', function () {
        $('.address-item').removeClass('active');
        $(this).parent('.address-item').addClass('active');
        $('#defaultAddr').html($(this).parent('.address-item').data('info'));
        $('#defaultAddr').data('city', $(this).parent('.address-item').data('city'));
        $('#defaultAddr').data('aid', $(this).parent('.address-item').data('aid'));
    });

    // 修改地址
    $('.address-list').on('click', '.btn-editAddress', function () {
        $('.select-address').addClass('disabled');
        $('.add-address').removeClass('disabled');
        // 修改的地址 ID
        var AddressId = $(this).parent('.address-item').data('aid');
        $('#addAddressForm').data('aid', AddressId);
        initAddAddressForm();
    });

    // 初始化 添加地址表单
    function initAddAddressForm() {
        var AddressId = $('#addAddressForm').data('aid');
        if (AddressId === '' || AddressId === undefined) {
            // 添加地址
            //初始化 修改地址 from 表单
            $('input[name="email"]').val('');
            $('input[name="name"]').val('');
            $('input[name="city"]').val('');
            $('input[name="state"]').val('');
            $('input[name="tel"]').val('');
            $('input[name="addr1"]').val('');
            $('input[name="addr2"]').val('');
            $('input[name="zip"]').val('');
            $('.isDefault').removeClass('active');
        } else {
            // 修改地址
            $.ajax({
                    url: '/address/' + AddressId,
                    type: 'GET'
                })
                .done(function (data) {
                    //初始化 修改地址 from 表单
                    $('input[name="email"]').val(data.email);
                    $('input[name="name"]').val(data.name);
                    $('input[name="city"]').val(data.city);
                    $('input[name="state"]').val(data.state);
                    $('input[name="tel"]').val(data.telephone);
                    $('input[name="addr1"]').val(data.detail_address1);
                    $('input[name="addr2"]').val(data.detail_address2);
                    $('input[name="zip"]').val(data.zip);
                    $('select[name="country"]').val(data.country);
                    if (data.isDefault == 1) {
                        $('.isDefault').addClass('active');
                    } else {
                        $('.isDefault').removeClass('active');
                    }

                })
        }
    }

    // 选择地址增值服务
    $('input[type="radio"]').on('click', function () {

        if ($(this).data('price') != 0) {
            $('.shipMto').html('Ship to ' + $('#defaultAddr').data('city') + ':');
            $('.shipMtoprice').html('$' + ($(this).data('price') / 100).toFixed(2));
            $('.totalPrice').html('$' + (($(this).data('price') + $('.totalPrice').data('price') - $('.code-price').data('price')) / 100).toFixed(2));
            $('.shopping-methodPrice').removeClass('hidden');
        } else {
            $('.totalPrice').html('$' + (($('.totalPrice').data('price') - $(this).data('price') - $('.code-price').data('price')) / 100).toFixed(2));
            $('.shopping-methodPrice').addClass('hidden');
        }
        $('.shippingMethodShow').html($(this).data('show'));
    });

    // 收起地址增值服务
    $('#smsubmit').on('click', function () {
        if ($('#smShowHide').children('.showHide-simpleInfo').length > 0) {
            var $sm = $('#smShowHide').siblings('.showHide-body');
            if ($sm.hasClass('active')) {
                $sm.slideUp(500);
                $sm.removeClass('active');
                $('#smShowHide').removeClass('active');
            }
        }
    });

    // 添加备注
    $('#crsubmit').on('click', function () {
        $('#srmessage').html($('textarea[name="cremark"]').val());
        if ($('#crShowHide').children('.showHide-simpleInfo').length > 0) {
            var $sm = $('#crShowHide').siblings('.showHide-body');
            if ($sm.hasClass('active')) {
                $sm.slideUp(500);
                $sm.removeClass('active');
                $('#crShowHide').removeClass('active');
            }
        }
    });

    // 生成订单
    $('.btn-toCheckout').on('click', function () {
        $.ajax({
                url: '/order',
                type: 'POST',
                data: {
                    aid: $('#defaultAddr').data('aid'),
                    cps: $('input[name="ccps"]').val(),
                    remark: $('input[name="cremark"]').val(),
                    stype: $('input[name="shippingMethod"]:checked').val(),
                }
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                }
            })
    });

    // 进入添加地址界面
    $('.btn-addNewAddress').on('click', function () {

        $('.select-address').addClass('disabled');
        $('.add-address').removeClass('disabled');
        $('#addAddressForm').data('aid', '');
        initAddAddressForm();
    });

    // 加载地址列表
    function getAddressList() {
        $.ajax({
                url: '/address',
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    appendAddressList(data.data);
                }
            })
    }

    // 遍历模板, 插入数据到指定位置
    function appendAddressList(AddressList) {
        var TplHtml = template('tpl-address', AddressList);
        var StageCache = $.parseHTML(TplHtml);
        $('.address-list').html(StageCache);
    }

    // 首次加载 图片列表信息
    if ($('#checkoutView').data('status') == true) {
        getAddressList();
    }

    // Checkout End


    // Login start

    function login_signin() {
        $('[data-role="login-submit"]').addClass('disabled');
        $.ajax({
                url: '/signin',
                type: 'POST',
                data: $('#login').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('.login-pw').parent().siblings('.warning-info').removeClass('off');
                    $('.login-pw').parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                }
            })
            .always(function () {
                $('[data-role="login-submit"]').removeClass('disabled');
            });
    }

    function login_forgetPassword() {
        $.ajax({
                url: '/forget',
                type: 'POST',
                data: $('#forgetPassword').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    $('.restPwd-content').addClass('hidden').removeClass('active');
                    $('.login-content').removeClass('hidden').addClass('active');
                    $('.login-title').text('Sign in with Motif Account');
                } else {
                    $('.forget-email').parent().siblings('.warning-info').removeClass('off');
                    $('.forget-email').parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                }
            })
            .always(function () {

            });

    }


    /**
     *  验证 Email 格式
     * @param $email
     */
    function login_validationEmail($email) {
        var flag = false;
        var emailNull = "Please enter your email",
            emailStyle = "Please enter a valid email address";
        //var $warningInfo = $('.warning-info');
        var $warningInfo = $email.parent().siblings('.warning-info');
        var inputText = $email.val();
        var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        if ("" == inputText || undefined == inputText || null == inputText) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(emailNull);
            flag = false;
        } else if (!reg.test(inputText)) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(emailStyle);
            flag = false;
        } else {
            $warningInfo.addClass('off');
            flag = true;
        }
        return flag;
    }

    function login_validationPassword($password) {
        var flag = false;
        var passwordNull = "Please enter your password",
            passwordLength = "Oops, that's not a match.";
        var $warningInfo = $password.parent().siblings('.warning-info');
        var inputText = $password.val();
        if ("" == inputText || undefined == inputText || null == inputText) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(passwordNull);
            flag = false;
        } else if (inputText.length < 6 || inputText.length > 32) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(passwordLength);
            flag = false;
        } else {
            $warningInfo.addClass('off');
            flag = true
        }
        return flag;
    }

    // 验证电子邮件的情况
    $('.login-email').on('keyup blur', function () {
        var InputText = $(this).val();
        if (InputText === '' || InputText === undefined) {
            $(this).siblings('.input-clear').addClass('hidden');
        } else {
            $(this).siblings('.input-clear').removeClass('hidden');
        }
        if (login_validationEmail($(this)) && login_validationPassword($('.login-pw'))) {
            $('div[data-role="login-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="login-submit"]').addClass('disabled');
        }
    });

    $('.login-pw').on('keyup blur', function () {
        /*        var inputText = $(this).val();
         if (inputText === '' || inputText === undefined) {
         $(this).siblings('.input-clear').addClass('hidden');
         } else {
         $(this).siblings('.input-clear').removeClass('hidden');
         }*/
        if (login_validationPassword($(this)) && login_validationEmail($('.login-email'))) {
            $('div[data-role="login-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="login-submit"]').addClass('disabled');
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
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            login_signin();
        }
    });

    $('.forget-email').on('keyup blur', function () {
        if (login_validationEmail($(this))) {
            $('div[data-role="forget-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="forget-submit"]').addClass('disabled');
        }
    });

    // 点击 忘记忘记 发送邮件
    $('[data-role="forget-submit"]').on('click', function () {
        console.info('Reset Password');
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            login_forgetPassword();
        }

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

    //Login end

    //第三方登录开始
    // google 第三方登录
    function attachSignin(element) {
        console.log(element.id);
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                var profile = googleUser.getBasicProfile();
                $.ajax({
                        url: '/googlelogin',
                        type: 'POST',
                        data: {
                            email: profile.getEmail(),
                            id: profile.getId(),
                            name: profile.getName(),
                            avatar: profile.getImageUrl()
                        }
                    })
                    .done(function (data) {
                        console.log("success");
                        if (data.success) {
                            window.location.href = data.redirectUrl;
                        } else {
                            $('.login-pw').parent().siblings('.warning-info').removeClass('off');
                            $('.login-pw').parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                        }
                    })
                    .fail(function () {
                        console.log("error");
                    })
                    .always(function () {
                        console.log("complete");
                    });

            },
            function (error) {
                console.error(JSON.stringify(error, undefined, 2));
            });
    }

    var ClientID = '21307862595-iabkmrtg7r2ioq6qmu1e81de66thp4p2.apps.googleusercontent.com';
    // var googleUser = {};
    var auth2 = {};
    var initGoogle = function () {
        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: ClientID,
                cookiepolicy: 'single_host_origin'
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('googleLogin'));
        });
    };

    //initGoogle();

    // facebook 第三方登录

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            loginFacebook();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '270298046670851',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.6' // use version 2.2
        });

    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function loginFacebook() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=id,name,picture,email', function (response) {
            console.log(response);
            if (response.email === '' && response === undefined) {
                window.location.href = '/addFacebookEmail?id=' + response.id + '&name=' + response.name + '&avatar=' + response.picture.data.url.encodeURIComponent();
            } else {
                $.ajax({
                        url: '/facebooklogin',
                        type: 'POST',
                        data: {
                            email: response.email,
                            id: response.id,
                            name: response.name,
                            avatar: response.picture.data.url
                        }
                    })
                    .done(function (data) {
                        console.log("success");
                        if (data.success) {
                            window.location.href = data.redirectUrl;
                        } else {
                            $('.login-pw').parent().siblings('.warning-info').removeClass('off');
                            $('.login-pw').parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                        }
                    })
                    .fail(function () {
                        console.log("error");
                    })
                    .always(function () {
                        console.log("complete");
                    });

            }

        });
    }

    $('#facebookLogin').click(function () {
        /* Act on the event */
        FB.login(function (response) {
            // handle the response
            statusChangeCallback(response);
        }, {
            scope: 'public_profile,email'
        });
    });

    //第三方登录结束

    //Register start

    function register_validationNick($nickname) {
        var flag = false;
        var nicknameNull = "Please enter your nickname";
        var $warningInfo = $nickname.parent().siblings('.warning-info');
        var inputText = $nickname.val();
        if ("" == inputText || undefined == inputText || null == inputText) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(nicknameNull);
            flag = false;
        } else {
            $warningInfo.addClass('off');
            flag = true
        }
        return flag;
    }

    function register_signup() {
        $('[data-role="register-submit"]').addClass('disabled');
        $.ajax({
                url: '/signup',
                type: 'POST',
                data: $('#register').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('.register-pw').parent().siblings('.warning-info').removeClass('off');
                    $('.register-pw').parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                }
            })
            .always(function () {
                $('[data-role="register-submit"]').removeClass('disabled');
            });
    }

    $('.register-nick').on('keyup blur', function () {
        if (register_validationNick($(this)) && login_validationEmail($('.register-email')) && login_validationPassword($('.register-pw'))) {
            $('div[data-role="register-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="register-submit"]').addClass('disabled');
        }
    });

    $('.register-email').on('keyup blur', function () {
        if (login_validationEmail($(this)) && register_validationNick($('.register-nick')) && login_validationPassword($('.register-pw'))) {
            $('div[data-role="register-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="register-submit"]').addClass('disabled');
        }
    })

    $('.register-pw').on('keyup blur', function () {
        if (login_validationPassword($(this)) && register_validationNick($('.register-nick')) && login_validationEmail($('.register-email'))) {
            $('div[data-role="register-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="register-submit"]').addClass('disabled');
        }
    })

    $('[data-role="register-submit"]').on('click', function () {
        console.info('Register');
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            register_signup();
        }
    });
    //register end


    //reset start

    function reset_password() {
        $('[data-role="reset-submit"]').addClass('disabled');
        $.ajax({
                type: 'POST',
                url: '/reset',
                data: $('#reset').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('.reset-lastpw').parent().siblings('.warning-info').removeClass('off');
                    $('.reset-lastpw').parent().siblings('.warning-info').children('span').html('Oops something went wrong, please go to the sign-in page and reset your password.');

                }
            })
            .always(function () {
                $('[data-role="reset-submit"]').removeClass('disabled');
            })
    }

    function reset_validateConfirmPwd($pw, newPwd, confirmPwd) {
        var flag = true;
        var passwordConfirm = 'New password does not match';
        //var $warningInfo = $('.warning-info');
        var $warningInfo = $pw.parent().siblings('.warning-info');
        if (newPwd !== confirmPwd) {
            $warningInfo.removeClass('off');
            $warningInfo.children('span').html(passwordConfirm);
            flag = false;
        } else {
            $warningInfo.addClass('off');
        }
        return flag;
    }


    $('.reset-pw').on('keyup blur', function () {
        var newPwd = $(this).val(),
            confirmPwd = $('input[name="lastpw"]').val();
        if (login_validationPassword($(this)) && reset_validateConfirmPwd($('.reset-lastpw'), newPwd, confirmPwd)) {
            $('div[data-role="reset-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="reset-submit"]').addClass('disabled');
        }
    })

    $('.reset-lastpw').on('keyup blur', function () {
        var newPwd = $('input[name="pw"]').val(),
            confirmPwd = $(this).val();
        if (login_validationPassword($(this)) && reset_validateConfirmPwd($(this), newPwd, confirmPwd)) {
            $('div[data-role="reset-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="reset-submit"]').addClass('disabled');
        }
    })


    $('[data-role="reset-submit"]').on('click', function () {
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            reset_password();
        }
    });


    //reset end

    // changepassword start

    function change_password() {
        $('.change-save').addClass('disabled');
        $.ajax({
                url: '/user/modifyUserPwd',
                type: 'POST',
                data: $('#changepassword').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    alert(data.prompt_msg);
                    window.location.href = data.redirectUrl;
                }else{
                    //$('.warning-info').removeClass('off');
                    //$('.warning-info').children('span').html(data.prompt_msg);
                }
            })
            .always(function () {
                $('.change-save').removeClass('disabled');
            })
    }

    $('.change-oldpw').on('keyup blur', function () {
        var pw = $('.change-pw').val(),
            confirmPwd = $('.change-cpw').val();

        if (login_validationPassword($(this)) && login_validationPassword($('.change-pw')) && reset_validateConfirmPwd($('.change-cpw'), pw, confirmPwd)) {
            $('.change-save').removeClass('disabled');
        } else {
            $('.change-save').addClass('disabled');
        }
    });

    $('.change-pw').on('keyup blur', function () {
        var pw = $(this).val(),
            confirmPwd = $('.change-cpw').val();
        if (login_validationPassword($(this)) && login_validationPassword($('.change-oldpw')) && reset_validateConfirmPwd($('.change-cpw'), pw, confirmPwd)) {
            $('.change-save').removeClass('disabled');
        } else {
            $('.change-save').addClass('disabled');
        }
    });

    $('.change-cpw').on('keyup blur', function () {
        var newPwd = $('.change-pw').val(),
            confirmPwd = $(this).val();
        if (login_validationPassword($(this)) && reset_validateConfirmPwd($(this), newPwd, confirmPwd) && login_validationPassword($('.change-oldpw')) && login_validationPassword($('.change-pw'))) {
            $('.change-save').removeClass('disabled');
        } else {
            $('.change-save').addClass('disabled');
        }
    });

    $('.change-save').on('click', function (event) {
        if (!$(event.target).hasClass('disabled')) {
            change_password();
        }
    });

    //ChangePassword End

    //User Address Start
    function address_delete($addressItem)
    {
        $.ajax({
            url: '/address/' + $addressItem.data('aid'),
            type: 'delete',
            data: {}
        })
            .done(function(data) {
                if(data.success) {
                    DelAddressModal.close();
                    $addressItem.parents('.col-md-6').remove();
                }
            })
    }

    $('.btn-delAddress').on('click', function() {
        var addressId = $(this).parent().data('aid');
        $('[data-remodal-id="addressmodal-modal"]').data('addressid', addressId);
        DelAddressModal.open();
    });

    // 删除 地址
    $('.delAddress').on('click',function(){
        var DelAddressId=$('[data-remodal-id="addressmodal-modal"]').data('addressid');
        var $DelAddressItem=$('[data-aid="'+ DelAddressId +'"]');
        address_delete($DelAddressItem);
    });

    //User Address End

    //User Profile Start
    function profile_updateUser()
    {
        $.ajax({
            url: '/user/modify',
            type: 'post',
            data: $('#changeProfile').serialize()
        })
            .done(function(data) {
                if(data.success) {
                    $('input[name="nick"]').attr('placeholder', data.data.nickname);
                    $('input[name="nick"]').val('');
                }
            })
    }

    $('input[name="nick"]').on('keyup', function() {
        if("" === $(this).val()) {
            $('.profile-save').addClass('disabled');
        } else {
            $('.profile-save').removeClass('disabled');
        }
    })

    $('.profile-save').on('click', function(event) {
        if(!$(event.target).hasClass('disabled')){
            profile_updateUser();
        }
    })

    //User Profile End

    //Designer Start
    function designer_getDesignerList() {
        var $designerContainer = $('#designerContainer');
        var pageNum = $designerContainer.data('num');
        if(pageNum == -1){
            return;
        }
        $.ajax({
            url: '/designer',
            data:{
                num: pageNum,
                size: 5,
                ajax: 1
            }
        })
            .done(function (data) {
                if (data.data === null || data.data === '' || data.data.list === null || data.data.list === '') {
                    $designerContainer.data('num', -1);
                } else {
                    designer_appendDesignerList('tpl-designerList', data.data);
                }
            })

    }

    function designer_appendDesignerList(tpl, designerList) {
        var tplHtml = template(tpl, designerList);
        var stageCache = $.parseHtml(tplHtml);
        $('#designerContainer').append(stageCache);
    }

    $('.designer-seeMore').on('click', function() {
        designer_getDesignerList();
    });

    //Designer End

    // 图片延迟加载
    try {
        $('img.img-lazy').lazyload({
            threshold: 200,
            effect: 'fadeIn'
        });
    }
    catch (e) {
    }

    // 图片放大镜
    try {
        jQuery_1_6(function () {
            jQuery_1_6('#jqzoom').jqzoom({
                zoomType: 'standard',
                xOffset: 40,
                title: false,
                lens: true,
                preloadImages: false,
                alwaysOn: false,
                zoomWidth: 550,
                zoomHeight: 550
            });
        });
    }
    catch (e) {
    }


    // Shopping List

    // 商品图片加载 loading
    // 加载动画显示
    function productList_loadingShow() {
        $('.product-loading').show();
        $('.productList-seeMore').hide();
    }

    // 加载动画隐藏
    function productList_loadingHide() {
        $('.product-loading').hide();
        $('.productList-seeMore').show();
    }

    // 点击 查看更多商品
    $('.btn-seeMore').on('click', function () {
        $('img.img-lazy').each(function () {
            var Src = $(this).attr('src'),
                Original = $(this).attr('data-original');
            if (Src === Original) {
                $(this).removeClass('img-lazy');
            }
        });
        getProductList();
    });

    // ajax 得到 product list
    function getProductList() {
        //  $DesignerContainer 列表容器
        //  Start 当前页开始条数
        //  Size 当前页显示条数
        var $ProductListontainer = $('#productList-container'),
            Pagenum = $ProductListontainer.data('pagenum'),
            Size = 20,
            CategoryId = $ProductListontainer.data('categoryid');
        // 判断是否还有数据要加载
        if (Pagenum === -1) {
            return;
        }

        // 判断当前选项卡是否在加载中
        if ($ProductListontainer.data('loading') === true) {
            return;
        } else {
            $ProductListontainer.data('loading', true);
        }

        var NextProductNum = ++Pagenum;

        productList_loadingShow();
        $.ajax({
            url: '/products',
            data: {
                pagenum: Pagenum,
                pagesize: Size,
                cid: CategoryId
            }
        }).done(function (data) {
            if (data.data === null || data.data === '') {
                $ProductListontainer.data('pagenum', -1);
            } else if (data.data.list === null || data.data.list === '' || data.data.list === undefined) {
                $ProductListontainer.data('pagenum', -1);
            } else {
                // 遍历模板 插入页面

                appendProductList(data.data);

                $ProductListontainer.data('pagenum', NextProductNum);

                // 图片延迟加载
                $('img.img-lazy').lazyload({
                    threshold: 1000,
                    effect: 'fadeIn'
                });

            }
        }).always(function () {
            $ProductListontainer.data('loading', false);
            productList_loadingHide();
        });
    }

    // 遍历 data 生成html 插入到页面
    function appendProductList(ProductsList) {
        var TplHtml = template('tpl-product', ProductsList);
        var StageCache = $.parseHTML(TplHtml);
        $('#productList-container').find('.row').append(StageCache);
    }

})(jQuery, Swiper);
//# sourceMappingURL=common.js.map


//public start
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
//public end

// 瀑布流
$(function () {
    try {
        var wookmark1 = new Wookmark('#daily-wookmark', {
            container: $('#daily-wookmark'),
            align: 'center',
            offset: 0,
            itemWidth: 272
        });
    } catch (e) {
    }
});

window.onload = function () {
    // 初始化瀑布流
    try {
        var wookmark1 = new Wookmark('#daily-wookmark', {
            container: $('#daily-wookmark'),
            align: 'center',
            offset: 0,
            itemWidth: 272
        });
    } catch (e) {
    }
};