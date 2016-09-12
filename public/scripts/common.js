/*global jQuery Swiper template*/

'use strict';

// 公共方法: 隐藏 see more 按钮
function HideSeeMore(seemoreName) {
    $(seemoreName).html('No more items!');
    setTimeout(function () {
        $(seemoreName).hide();
    }, 2000);
}

(function ($, Swiper) {
    // 公共方法 : 图片加载loading动画 与 see more 按钮 的显示和隐藏
    function loadingShow(loadingName, seemoreName) {
        $(loadingName).show();
        $(seemoreName).hide();
    }

    function loadingHide(loadingName, seemoreName) {
        $(loadingName).hide();
        $(seemoreName).show();
    }

    function loadingAndSeemoreHide(loadingName, seemoreName) {
        $(loadingName).hide();
        $(seemoreName).hide();
    }

    // 截取字符串
    function SubstringText(strinfo){  //'.designer-intro'
        $(strinfo).each(function(){
            var str=$(this).html();
            if(str.length > 200){
                str = str.substring(0, 200) + '...';
            }
            $(this).html(str);
        });
    }

    // public 公共方法start
    var testIndex = 0;

    function switchImpr(Impr) {
        // 当前视窗浏览位置
        var CurrentPosition = $(window).scrollTop() + $(window).height();
        // 元素本身聚顶部高度
        var ItemPosition = $(Impr).offset().top;

        // 如果是曝光项，加上本身的高度
        // 完全出现在视窗内时，再曝光
        if ($(Impr).is('a')) {
            ItemPosition += $(Impr).height();
        }

        // 判断是否在视窗内
        if (ItemPosition <= CurrentPosition) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * pushAjax - 依次发送 ajax 请求，遍历所有项
     *
     * @param  { Object } $Item 需要曝光的项
     */

    function pushAjax($Item) {
        $.each($Item, function (index, element) {
            if (switchImpr(element)) {
                var impr = $(element).data('impr');
                $(element).removeAttr('data-impr');
                if(impr != undefined && impr != null && impr != "") {
                    testIndex++;
                    console.log(testIndex);
                    $.ajax({
                            url: impr
                        })
                        .always(function () {
                            //$(element).removeAttr('data-impr');
                        });
                }
            }
        });
    }

    function imprList() {
        var $ImprList = $('[data-impr]');
        if ($ImprList.length !== 0) {
            pushAjax($ImprList);
        }
    }

    $(document).on('scroll', function (event) {
        //imprList();
    })

    $(document).ready(function () {
        $('[data-clk]').unbind('click');
        $('[data-clk]').click(function () {
            var $this = $(this);
            //onProductClick();

            if(undefined != $this.data('link')) {
                $.ajax({
                    url: $this.data('clk'),
                    type: "GET"
                });
                setTimeout(function () {
                    window.location.href = $this.data('link');
                }, 100);
            }
        })
    })

    // public 公共方法end


    // ShoppingDetail.html  start

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

    // designerList 判断设计师商品个数
    function swiperBtnHover(){
        $('.productImg-list').each(function () {
            var itemNum = $(this).children('.productImg-item').length,
                $btnNext = $(this).siblings('.swiper-button-next'),
                $btnPrev = $(this).siblings('.swiper-button-prev');
            $btnNext.hide();
            $btnPrev.hide();
            $(this).parent().hover(function () {
                if (itemNum > 4){
                    $btnNext.show();
                    $btnPrev.show();
                }
            },function () {
                $btnNext.hide();
                $btnPrev.hide();
            });

        })
    }
    swiperBtnHover();

    // 点击选择图片
    $('.small-img').on('click', function (e) {
        if (!$(this).hasClass('active')) {
            $('.productImg-item img').removeClass('active');
            $(this).addClass('active');
        }
    });

    // 选择 商品属性
    var product_data = eval('(' + $('#jsonStr').val() + ')');
    var spuAttrs = typeof(product_data) != "undefined" ? product_data.spuAttrs : '';
    var product_arrayTemp_click = [];//被选中的总数组

    //点击属性事件
    $('.btn-itemProperty').on('click', function () {
        var ItemType = $(this).data('type');
        if (ItemType !== '' && !$(this).hasClass('disabled')) {
            $('#skuQty').data('num', 1);
            $('#skuQty').html(1);
            $('#skuQty').parent().siblings('.warning-info').addClass('off');
            $('#delQtySku').addClass('disabled');
            //todo 加判断
            //$('#addQtySku').removeClass('disabled');
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
        console.log(nowClickArray);
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
            $.each(product_data.skuExps,function (index,val) {
                if(product_lastSkuArray[0]==val.sku){
                    $('.newPrice').html('$'+(val.skuPrice.sale_price/100).toFixed(2));
                    return false;
                }
            });
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
            $(this).parent().siblings('.warning-info').addClass('off');
            var skuQty = $('#skuQty').data('num') + $(this).data('num');
            var product_stock_qtty = product_cache_skuQty[$('#productsku').val()] ? product_cache_skuQty[$('#productsku').val()] : product_getSkuQty($('#productsku').val());
            if (skuQty > 0 && skuQty <= product_stock_qtty) {
                $('#delQtySku').hasClass('disabled') ? $('#delQtySku').removeClass('disabled') : false;
                $('#addQtySku').hasClass('disabled') ? $('#addQtySku').removeClass('disabled') : false;
                $('#skuQty').data('num', skuQty);
                $('#skuQty').html(skuQty);
            }
            else if (skuQty > 20 && skuQty <= 50 && $(this).data('num') > 0) {
                if (!$('#addQtySku').hasClass('disabled')) {
                    checkStock($('#productsku').val() + '_' + skuQty);
                }
                $('#addQtySku').addClass('disabled');
            } else if (skuQty >= product_stock_qtty && $(this).data('num') > 0) {
                //alert('库存不足');
                $('#addQtySku').addClass('disabled');
                $(this).parent().siblings('.warning-info').removeClass('off');
                $(this).parent().siblings('.warning-info').children('span').html('Warning: only ' + product_stock_qtty + ' left');
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

            var flag = true;
            if(product_data.vasBases != undefined){
                $.each(product_data.vasBases, function (index, val) {
                    if (!$('#vas_id' + val.vas_id).hasClass('disabled') /*&& $('#vas_id' + val.vas_id).val()*/) {
                        if ($('#vas_id' + val.vas_id).val() == "" || $('#vas_id' + val.vas_id).val() == null) {
                            $('#vas_id' + val.vas_id).parents('.flex-alignCenter').siblings('.warning-info').removeClass('off');
                            flag = false;
                        }
                        operate.VAList.push({'vas_id': val.vas_id, 'user_remark': $('#vas_id' + val.vas_id).val()});
                    }
                });
            }
            if (!flag) {
                return;
            }
            $(this).addClass('disabled');
            var action = $(this).data('action');
            $.ajax({
                    url: '/cart/add',
                    type: action,
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
                        if(data.redirectUrl != null) {
                            window.location.href = data.redirectUrl;
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
        $(this).parents('.flex-alignCenter').siblings('.warning-info').addClass('off');
    });

    $('.icon-checkcircle').on('click', function () {
        $(this).toggleClass('active');
        $(this).parents('.flex-alignCenter').siblings('.warning-info').addClass('off');
        if ($(this).hasClass('active')) {
            $(this).siblings('.input-engraving').removeClass('disabled');
            $(this).siblings('.input-engraving').removeAttr('disabled');
        } else {
            //$(this).siblings('.input-engraving').val('');
            $(this).siblings('.input-engraving').addClass('disabled');
            $(this).siblings('.input-engraving').attr({disabled: "disabled"})
        }
    });

    // 点击 "心" 关注商品
    $('.btn-wish').on('click', function () {
        var $this = $(this);
        var spu = $this.data('spu');
        if( spu != undefined) {
            $.ajax({
                    url: '/wishlist/' + spu,
                    type: 'GET'
                })
                .done(function (data) {
                    if (data.success) {
                        $this.toggleClass('active');
                    }
                });
        } else {
            spu = $this.data('actionspu');
            $.ajax({
                    url: '/noteaction',
                    type: 'get',
                    data: {
                        action: 'wish',
                        spu: spu
                    }
                })
                .done(function (data) {
                    window.location.href = '/login';
                })
        }

    });

    $('#productList-container').on('click', '.btn-wishList', function (e) {
        var $this = $(e.target);
        var spu = $this.data('spu');
        if( spu != undefined) {
            $.ajax({
                    url: '/wishlist/' + spu,
                    type: 'GET'
                })
                .done(function (data) {
                    if (data.success) {
                        $this.toggleClass('active');
                    }
                })
        } else {
            spu = $this.data('actionspu');
            $.ajax({
                url: '/noteaction',
                type: 'get',
                data: {
                    action: 'wish',
                    spu: spu
                }
            })
                .done(function (data) {
                    window.location.href = '/login';
                })
        }

    });

    // 商品详情页 动态获取模版
    $('.btn-productTemplate').on('click', function () {
        var TemplateId = $(this).data('tid'),
            $TemplateDom = $('#template' + TemplateId),
            $this = $(this);
        if (TemplateId == -1) {
            return;
        } else {
            $.ajax({
                    url: '/service/' + TemplateId,
                    type: 'GET',
                })
                .done(function (data) {
                    if (data.success) {
                        $this.data('tid', -1);
                        appendProductTemplateList($TemplateDom, data.data);

                    }
                })
        }
    });

    // 遍历 template data 生成html 插入到页面
    function appendProductTemplateList($TemplateContainer, TemplateList) {
        var TplHtml = template('tpl-productTemplate', TemplateList);
        var StageCache = $.parseHTML(TplHtml);
        $TemplateContainer.html(StageCache);
    }


    // 预售商品倒计时
    var beginTimes = $('.limited-content').data('begintime'); // 开始时间
    var endTimes = $('.limited-content').data('endtime');   // 结束时间
    var leftNum = $('.limited-content').data('lefttime');     // 剩余秒数  604358742
    var qtty = $('.limited-content').data('qtty');            //  库存量
    var secondnum = parseInt(endTimes - beginTimes);   //604802000    // 预售总时长
    function timer(intDiff) {
        var timer = window.setInterval(function () {
            if (intDiff <= 1) {
                $('.stock-qtty').html('Sold Out');
                $('.btn-addToBag').addClass('disabled');
                clearInterval(timer);
            }
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            //if (minute <= 9) minute = '0' + minute;
            //if (second <= 9) second = '0' + second;
            if (leftNum < 259200000) {
                $('.time_show').html(day * 24 + hour + 'h: ' + minute + 'm: ' + second + 's');
            } else {
                $('.time_show').html(day + 'd: ' + hour + 'h: ' + minute + 'm: ' + second + 's');
            }
            intDiff--;
        }, 1000);
    }
    if(leftNum != -1){
        $(function () {
            timer(leftNum / 1000);
        });
    }


    // ShoppingDetail.html  end

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
                        if (skuQty >= 50) $('#casku' + nowsku).addClass('disabled');
                        if (skuQty <= 49) $('#casku' + nowsku).removeClass('disabled');
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
                        $('#total_amount').html('$' + (data.data.total_amount / 100).toFixed(2));
                        $('#total_sku_qtty').html('Items(' + data.data.total_sku_qtty + '):');
                        $('#vas_amount').html('$' + (data.data.vas_amount / 100).toFixed(2));
                        $('#pay_amount').html('$' + (data.data.pay_amount / 100).toFixed(2));
                        if(data.data.pay_amount <= 0){
                            $('.btn-toCheckout').addClass('disabled');
                        }
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
        //var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        var $email = $('input[name="email"]'),
            $name = $('input[name="name"]'),
            $city = $('input[name="city"]'),
            $tel = $('input[name="tel"]'),
            $addr1 = $('input[name="addr1"]'),
            $zip = $('input[name="zip"]');
        if (checkValid($name) && checkValid($city) && checkValid($tel) && checkValid($addr1) && checkValid($zip)) {
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
        var flag = true;
        $.ajax({
            url: '/coupon',
            type: 'post',
            data: {cps: $('input[name="ccps"]').val()}
        })
            .done(function (data) {
                if(data.success){
                    if ($('input[name="ccps"]').val() != '') {
                        $.ajax({
                                url: '/cart/accountlist?aid='+$('#defaultAddr').data('aid')+'&bindid=' + data.data.bind_id + '&logisticstype=' + $('input[name="shippingMethod"]:checked').val(),
                                type: 'GET',
                            })
                            .done(function (data) {
                                if (data.success) {
                                    $('.promotion-code').removeClass('hidden');
                                    $('#pcode').html(data.data.cp_title);
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

                }else{
                    $this.parent().siblings('.warning-info').removeClass('off');
                    //$this.parent().siblings('.warning-info').children('span').html(data.prompt_msg);
                }
            })

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
            $('.address-save').addClass('disabled');
            $('select[name="country"]').prop('selectedIndex', 0);

            // 初始化 国家,洲
            var Country= $('select[name="country"] option:selected').text();
            initCityState(Country,'');
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

                    // 初始化 国家,洲
                    initCityState(data.country,data.state);

                    if (data.isDefault == 1) {
                        $('.isDefault').addClass('active');
                    } else {
                        $('.isDefault').removeClass('active');
                    }
                    $('.address-save').removeClass('disabled');

                })
        }
    }

    // 选择国家 联动洲
    $('select[name="country"]').change(function () {
        var Country = $('select[name="country"]').val();
        initCityState(Country,'');

        if (address_check($('.address-name')) && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });



    // 初始化 国家,洲
    function initCityState(Country,State){
        // CountryId  国家Id
        // SelectType 国家对应洲类型
        var CountryId=$('select[name="country"] > option[value="'+ Country +'"]').data('id');
        var SelectType = $('select[name="country"] > option[value="'+ Country +'"]').data('type');
        if(SelectType != undefined && SelectType === 0){
            // 洲为选填
            $('.state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary" placeholder="State (optional)">');
            $('input[name="state"]').val(State);
        } else if(SelectType != undefined && SelectType === 1){
            // 洲为必填
            $('.state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary address-state" placeholder="State"><div class="warning-info flex flex-alignCenter text-warning p-t-5x off"> <i class="iconfont icon-caveat icon-size-md p-r-5x"></i> <span class="font-size-base">Please enter your State !</span> </div>');
            $('input[name="state"]').val(State);
        } else {
            // 洲为下拉列选择
            // 获取 洲 列表
            $.ajax({
                    url: '/statelist/' + CountryId,
                    type: 'GET'
                })
                .done(function (data) {
                    $('.state-info').html('<select name="state" class="form-control contrlo-lg select-country"></select>');
                    // 添加选项
                    $.each(data, function (n, value) {
                        var StateNameId=value['state_name_en'];
                        var StateNameEn=value['state_name_en'];
                        $("<option></option>").val(StateNameId).text(StateNameEn).appendTo($("select"));
                    });
                    if(State != ""){
                        $('select[name="state"]').val(State);
                    }
                })
        }
    }

    try {
        // 初始化 国家,洲
        var Country= $('select[name="country"] option:selected').text();
        initCityState(Country,'');
    } catch (e) {}

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
        var paym = $(this).data('with');
        $.ajax({
                url: '/order',
                type: 'POST',
                data: {
                    aid: $('#defaultAddr').data('aid'),
                    cps: $('input[name="ccps"]').val(),
                    remark: $('input[name="cremark"]').val(),
                    stype: $('input[name="shippingMethod"]:checked').val(),
                    paym: paym
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
                    if ($('.address-item').length === 1) {
                        $.each(data.data.list, function (n, value) {
                            var country = value['country'],
                                city = value['city'],
                                detail_address1 = value['detail_address1'],
                                zip = value['zip'],
                                name = value['name'];
                            $('#defaultAddr').html(country + " " + city + " " + detail_address1 + " " + zip + " " + name);
                            $('#defaultAddr').data('city', city);
                            $('#defaultAddr').data('aid', value['receiving_id']);
                            console.info(value['country']);
                        });
                    }
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
                    alert(data.prompt_msg);
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

    var ClientID = '344651811353-qqgbjruqute7t6heftrcquu0iq2u2jd6.apps.googleusercontent.com';
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

    try {
        initGoogle();
    } catch (e) {}

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
    });

    $('.register-pw').on('keyup blur', function () {
        if (login_validationPassword($(this)) && register_validationNick($('.register-nick')) && login_validationEmail($('.register-email'))) {
            $('div[data-role="register-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="register-submit"]').addClass('disabled');
        }
    });

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
    });

    $('.reset-lastpw').on('keyup blur', function () {
        var newPwd = $('input[name="pw"]').val(),
            confirmPwd = $(this).val();
        if (login_validationPassword($(this)) && reset_validateConfirmPwd($(this), newPwd, confirmPwd)) {
            $('div[data-role="reset-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="reset-submit"]').addClass('disabled');
        }
    });


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
                alert(data.prompt_msg);
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
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
    function address_delete($addressItem) {
        $.ajax({
                url: '/address/' + $addressItem.data('aid'),
                type: 'delete',
                data: {}
            })
            .done(function (data) {
                if (data.success) {
                    DelAddressModal.close();
                    $addressItem.parents('.col-md-6').remove();
                }
            })
    }

    $('#addressList-info').on('click', '.btn-delAddress', function () {
        var addressId = $(this).parent().data('aid');
        $('[data-remodal-id="addressmodal-modal"]').data('addressid', addressId);
        DelAddressModal.open();
    });

    // 删除 地址
    $('.delAddress').on('click', function () {
        var DelAddressId = $('[data-remodal-id="addressmodal-modal"]').data('addressid');
        var $DelAddressItem = $('[data-aid="' + DelAddressId + '"]');
        address_delete($DelAddressItem);
    });

    //地址验证
    function address_check($address) {
        var flag = false;
        var $warningInfo = $address.siblings('.warning-info');
        var inputText = $address.val();
        if ("" == inputText || undefined == inputText || null == inputText) {
            $warningInfo.removeClass('off');
            flag = false;
        } else {
            $warningInfo.addClass('off');
            flag = true;
        }
        return flag;
    }

    function address_validationEmail($email) {
        var flag = false;
        var emailNull = "Please enter your email",
            emailStyle = "Please enter a valid email address";
        //var $warningInfo = $('.warning-info');
        var $warningInfo = $email.siblings('.warning-info');
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

    //$('.address-email').on('keyup blur', function () {
    //    var email = $(this).val();
    //    if (address_validationEmail($(this)) && address_check($('.address-name')) && address_check($('.address-city'))
    //        && address_check($('.address-phone')) && address_check($('.address-street')) && address_check($('.address-zipcode'))) {
    //        $('.address-save').removeClass('disabled');
    //    } else {
    //        $('.address-save').addClass('disabled');
    //    }
    //});

    $('.address-name').on('keyup blur', function () {
        var name = $(this).val();
        if (address_check($(this)) && address_check($('.address-city'))
            && address_check($('.address-phone')) && address_check($('.address-street')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-city').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-phone')) && address_check($('.address-street')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-phone').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-street')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    })

    $('.address-street').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-zipcode').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-street'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    // 验证 State
    $('.state-info').on('keyup blur','.address-state', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    function validateState(){
        if($('.address-state').length > 0){
            if(address_check($('.address-state'))){
                $('.address-save').removeClass('disabled');
            } else {
                $('.address-save').addClass('disabled');
            }
        } else {
            $('.address-save').removeClass('disabled');
        }
    }


    //地址验证

    //User Address End

    //User Profile Start
    function profile_updateUser() {
        $.ajax({
                url: '/user/modify',
                type: 'post',
                data: $('#changeProfile').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    $('input[name="nick"]').attr('placeholder', data.data.nickname);
                    $('.name').html(data.data.nickname);
                    $('input[name="nick"]').val('');
                }
            })
    }

    //上传头像
    $("#profileIcon").change(function (e) {
        $('.uploadProfile-loading').show();
        $('.bg-uploadProfileLoading').css('display', 'block');
        var xhr = new XMLHttpRequest();
        var file = $('#profileIcon').get(0).files[0];
        var formData = new FormData();
        formData.append('_token', $('input[name="_token"]').val());
        formData.append('file', file);

        // xhr.upload.addEventListener("progress", function (evt) {
        //     if (evt.lengthComputable) {
        //         var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        //         console.log(percentComplete);
        //     }
        //
        // }, false);//进度
        xhr.addEventListener("load", function (e) {
            var obj = JSON.parse(e.currentTarget.response);
            if (obj.success) {
                $('.uploadProfile-loading').hide();
                $('.bg-uploadProfileLoading').css('display', 'none');
                $('#avatarUrl').attr('src', $('#avatarUrl').data('url') + '/n1/' + obj.data.url);
                $('.img-circle').attr('src', $('#avatarUrl').data('url') + '/n1/' + obj.data.url);
            }
        }, false); // 处理上传完成
        xhr.addEventListener("error", function (e) {
            console.log(e);
        }, false); // 处理上传失败

        xhr.open('post', '/user/uploadicon');
        xhr.send(formData);
    });

    $('input[name="nick"]').on('keyup', function () {
        if ("" === $(this).val()) {
            $('.profile-save').addClass('disabled');
        } else {
            $('.profile-save').removeClass('disabled');
        }
    });

    $('.profile-save').on('click', function (event) {
        if (!$(event.target).hasClass('disabled')) {
            profile_updateUser();
        }
    });

    //User Profile End

    //Designer Start

    // 判断 第一页 designer 个数
    try {
        $(function () {
            var DesignerListNum = $('.designer-item').length;
            $('.designerList-seeMore').show();
            if (DesignerListNum < 10) {
                HideSeeMore('.designerList-seeMore');
            }
        });
        SubstringText('.designer-intro');
    } catch (e) {}

    // ajax 加载 设计师信息
    function designer_getDesignerList() {
        var $DesignerContainer = $('#designerContainer'),
            Start = $DesignerContainer.data('start'),
            Size = 10;
        // 判断是否还有数据要加载
        if (Start === -1) {
            return;
        }

        // 判断当前选项卡是否在加载中
        if ($DesignerContainer.data('loading') === true) {
            return;
        } else {
            $DesignerContainer.data('loading', true);
        }
        // 加载动画loading 显示
        loadingShow('.designer-loading', '.designerList-seeMore');
        $.ajax({
                url: '/designer',
                data: {
                    start: Start,
                    size: Size,
                    ajax: 1
                }
            })
            .done(function (data) {
                if (data.data === null || data.data === '' || data.data.list === null || data.data.list === '' || data.data.list.length === 0) {
                    $DesignerContainer.data('start', -1);
                    HideSeeMore('.designerList-seeMore');
                    loadingAndSeemoreHide('.designer-loading', '.designerList-seeMore');
                } else {
                    designer_appendDesignerList(data.data);

                    // 判断当前页是否是最后一页
                    // CurrentSize 当前页显示条数
                    // StartNum 下一页开始条数
                    var CurrentSize = data.data.list.length,
                        StartNum = data.data.start;
                    if (CurrentSize < Size) {
                        $DesignerContainer.data('start', -1);
                    } else {
                        $DesignerContainer.data('start', StartNum);
                    }

                    if (data.data.list.length < Size) {
                        HideSeeMore('.designerList-seeMore');
                    }

                    // 视频区域高度
                    var MediaScale = 9 / 16;
                    var Width = $('.player-media').width(),
                        MediaHeight = Width * MediaScale;
                    if ($('.ytplayer').length > 0) {
                        // 初始化 外边框尺寸
                        $('.designer-media').css('height', MediaHeight);
                        $('.designer-beginPlayer').css('display', 'block');
                    }

                    // 初始化 swiper
                    initSwiper();
                    swiperBtnHover();

                    // 截取 设计师说明 长度
                    SubstringText('.designer-intro');

                    // 图片延迟加载
                    $('img.img-lazy').lazyload({
                        threshold: 1000,
                        effect: 'fadeIn'
                    });
                }
            })
            .always(function () {
                $DesignerContainer.data('loading', false);
                // 加载动画loading 隐藏
                loadingHide('.designer-loading', '.designerList-seeMore');
            });

    }

    function initSwiper() {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true,
            slidesPerView: 'auto',
            freeModeMomentumRatio: .5
        });
    }

    // 渲染 html 模版
    function designer_appendDesignerList(designerList) {
        var number = $('.designerList-item').length;
        if (number % 2 === 0) {
            var tplHtml = template('tpl-designerList-even', designerList);
        } else {
            var tplHtml = template('tpl-designerList-odd', designerList);
        }
        var stageCache = $.parseHTML(tplHtml);
        $('#designerContainer').append(stageCache);
    }

    // 点击查看更多 designer 信息
    $('.designerList-seeMore').on('click', function () {
        $('img.img-lazy').each(function () {
            var Src = $(this).attr('src'),
                Original = $(this).attr('data-original');
            if (Src === Original) {
                $(this).removeClass('img-lazy');
            }
        });
        designer_getDesignerList();
    });

    $('.btn-follow').on('click', function () {
        var $this = $(this);
        $.ajax({
                url: '/follow/' + $this.data('did'),
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    $this.toggleClass('active');
                    if ('Following' == $this.html()) {
                        $this.html('Follow');
                    } else {
                        $this.html('Following');
                    }
                }
            });

    });

    $('#designerContainer').on('click', '.btn-following', function () {
        var $this = $(this);
        $.ajax({
                url: '/follow/' + $this.data('did'),
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    $this.toggleClass('active');
                    if ('Following' == $this.html()) {
                        $this.html('Follow');
                    } else {
                        $this.html('Following');
                    }
                }
            });
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
        var winWidth = $(window).width(),
            zoomXOffset = 0;
        if (winWidth > 1460) {
            zoomXOffset = 40;
        } else {
            zoomXOffset = 35;
        }
        var ProductDetailImg_width = $('#productImg').width() + zoomXOffset;
        jQuery_1_6(function () {
            jQuery_1_6('#jqzoom').jqzoom({
                zoomType: 'standard',
                xOffset: zoomXOffset,
                title: false,
                lens: true,
                preloadImages: false,
                alwaysOn: false,
                zoomWidth: ProductDetailImg_width,
                zoomHeight: ProductDetailImg_width
            });
        });
    }
    catch (e) {
    }


    // Shopping List

    // 判断 商品个数
    try {
        $(function () {
            var ProductListNum = $('.productList-item').length;
            $('.productList-seeMore').show();
            if (ProductListNum < 16) {
                HideSeeMore('.productList-seeMore');
            }
        })
    } catch (e) {

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
            Size = 16,
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
        loadingShow('.product-loading', '.productList-seeMore');
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
                HideSeeMore('.productList-seeMore');
            } else if (data.data.list === null || data.data.list === '' || data.data.list === undefined) {
                $ProductListontainer.data('pagenum', -1);
                HideSeeMore('.productList-seeMore');
            } else {
                // 遍历模板 插入页面

                appendProductList(data.data);

                $ProductListontainer.data('pagenum', NextProductNum);

                if (data.data.list.length < Size) {
                    HideSeeMore('.productList-seeMore');
                }

                //点击埋点
                $('[data-clk]').unbind('click');
                $('[data-clk]').bind('click', function () {
                    var $this = $(this);

                    if (undefined !== $this.data('link')) {
                        $.ajax({
                            url: $this.data('clk'),
                            type: "GET"
                        });
                        setTimeout(function () {
                            window.location.href = $this.data('link');
                        }, 100);
                    }
                })

                //end

                // 图片延迟加载
                $('img.img-lazy').lazyload({
                    threshold: 1000,
                    effect: 'fadeIn'
                });

            }
        }).always(function () {
            $ProductListontainer.data('loading', false);
            loadingHide('.product-loading', '.productList-seeMore');
        });
    }

    // 遍历 data 生成html 插入到页面
    function appendProductList(ProductsList) {
        var TplHtml = template('tpl-product', ProductsList);
        var StageCache = $.parseHTML(TplHtml);
        $('#productList-container').find('.row').append(StageCache);
    }

    // Daily List start

    //点击 查看更多商品
    $('.btn-seeMore-dailyList').on('click', function () {
        getDailyList();
    });

    // ajax 得到 daily List
    function getDailyList() {
        //  $DailyListContainer 列表容器
        //  Size 当前页显示条数
        var $DailyListContainer = $('#dailyList-container'),
            PageNum = $DailyListContainer.data('pagenum'),
            Size = 20;
        //判断是否还有数据要加载
        if (PageNum === -1) {
            return;
        }

        //判断当前容器的数据是否正在加载中
        if ($DailyListContainer.data('loading') === true) {
            return;
        } else {
            $DailyListContainer.data('loading', true);
        }

        var NextDailyNum = ++PageNum;
        loadingShow('.daily-loading', '.dailyList-seeMore');
        //参数：pagesize 页面大小， pagenum,当前页面 ， ajax:1必传
        $.ajax({
            url: '/daily',
            data: {
                pagesize: Size,
                pagenum: PageNum,
                ajax: 1
            }
        }).done(function (data) {

            if (data.data === null || data.data === '') {
                $DailyListContainer.data('pagenum', -1);
                HideSeeMore('.dailyList-seeMore');
                loadingAndSeemoreHide('.daily-loading', '.dailyList-seeMore');
            } else if (data.data.list === null || data.data.list === '' || data.data.list === undefined) {
                $DailyListContainer.data('pagenum', -1);
                HideSeeMore('.dailyList-seeMore');
                loadingAndSeemoreHide('.daily-loading', '.dailyList-seeMore');
            } else {
                // 遍历模板 插入页面
                appendDailyList(data.data);

                $DailyListContainer.data('pagenum', NextDailyNum);

                // 视频区域高度
                var MediaScale = 9 / 16;
                var Width = $('.daily-item').width(),
                    MediaHeight = Width * MediaScale;
                if ($('.ytplayer').length > 0) {
                    // 初始化 外边框尺寸
                    $('.designer-media').css('height', MediaHeight);
                    $('.designer-beginPlayer').css('display', 'block');
                }

                //点击触发点击埋点
                $('[data-clk]').unbind('click');
                $('[data-clk]').bind('click', function() {
                    var $this = $(this);
                    if (undefined !== $this.data('link')) {
                        $.ajax({
                            url: $this.data('clk'),
                            type: "GET"
                        });
                        setTimeout(function () {
                            window.location.href = $this.data('link');
                        }, 100);
                    }
                } )
                // end

                $('#daily-wookmark').imagesLoaded(function () {
                    $('.isHidden').removeClass('isHidden');
                    var wookmark1 = new Wookmark('#daily-wookmark', {
                        container: $('#daily-wookmark'),
                        align: 'center',
                        offset: 0,
                        itemWidth: 272
                    });
                    loadingHide('.daily-loading', '.dailyList-seeMore');

                    var dailyNum = data.data.list.length;
                    if (dailyNum < Size) {
                        HideSeeMore('.dailyList-seeMore');
                    }
                });
            }
        }).always(function () {
            $DailyListContainer.data('loading', false);
            //loadingHide('.daily-loading', '.dailyList-seeMore');
        });
    }

    //遍历 data 生成html 插入到页面
    function appendDailyList(DailysList) {
        var TplHtml = template('tpl-daily', DailysList);
        var StageCache = $.parseHTML(TplHtml);
        $('#dailyList-container').find('#daily-wookmark').append(StageCache);
    }

    $(function () {
        try {
            loadingShow('.daily-loading', '.dailyList-seeMore');
            // 判断 daily banner 个数
            if ($('.daily-banner').length > 1) {
                $('.dailyBanner-btn').css('display', 'block');
            } else {
                $('.dailyBanner-btn').css('display', 'none');
            }
        } catch (e) {
        }
    });

    // Daily List end


    // 个人中心 Order List start

    // 判断 order list 第一次加载订单数
    try {
        $(function () {
            var OrderListNum = $('#orderListContainer .box-shadow').length;
            $('.orderList-seeMore').show();
            if (OrderListNum < 10) {
                HideSeeMore('.orderList-seeMore');
            }
        })
    } catch (e) {}

    // 点击 查看更多 订单
    $('.orderList-seeMore').on('click', function () {
        getOrderList();
    });

    // ajax 得到 order list
    function getOrderList() {
        //  $OrderListContainer 列表容器
        //  Start 当前页开始条数
        //  Size 当前页显示条数
        var $OrderListContainer = $('#orderListContainer'),
            Pagenum = $OrderListContainer.data('pagenum'),
            Size = 10;
        // 判断是否还有数据要加载
        if (Pagenum === -1) {
            return;
        }

        // 判断当前选项卡是否在加载中
        if ($OrderListContainer.data('loading') === true) {
            return;
        } else {
            $OrderListContainer.data('loading', true);
        }

        var NextProductNum = ++Pagenum;

        loadingShow('.orderList-loading', '.orderList-seeMore');
        $.ajax({
            url: '/orderlist',
            data: {
                num: Pagenum,
                size: Size,
                ajax: 1
            }
        }).done(function (data) {
            if (data.data === null || data.data === '') {
                $OrderListContainer.data('pagenum', -1);
                HideSeeMore('.orderList-seeMore');
                loadingAndSeemoreHide('.orderList-loading', '.orderList-seeMore');
            } else if (data.data.list.length === 0 || data.data.list === '' || data.data.list === undefined) {
                $OrderListContainer.data('pagenum', -1);
                HideSeeMore('.orderList-seeMore');
                loadingAndSeemoreHide('.orderList-loading', '.orderList-seeMore');
            } else {
                // 遍历模板 插入页面
                appendOrderList(data.data);

                $OrderListContainer.data('pagenum', NextProductNum);

                if (data.data.list.length < Size) {
                    HideSeeMore('.orderList-seeMore');
                }
            }
        }).always(function () {
            $OrderListContainer.data('loading', false);
            loadingHide('.orderList-loading', '.orderList-seeMore');
        });
    }

    // 遍历 data 生成html 插入到页面
    function appendOrderList(OrdersList) {
        var TplHtml = template('tpl-orderList', OrdersList);
        var StageCache = $.parseHTML(TplHtml);
        $('#orderListContainer').append(StageCache);
    }

    // 个人中心 Order List end

    //个人中心 Order Detail Start

    function order_getOperate() {
        var operate = [];
        var operateItem = {
            'sale_qtty': null,
            'select': true,
            'sku': null,
            'VAList': []
        };

        var orderList = eval($('#buyAgain').data('orderlist'));

        $.each(orderList, function (index, val) {
            operateItem.sale_qtty = val.sale_qtty;
            operateItem.sku = val.sku;

            var vas = [];
            $.each(val.vas_info, function (i, el) {
                vas[i] = {};
                vas[i].user_remark = el.user_remark;
                vas[i].vas_id = el.vas_id;
            });
            operateItem.VAList = vas;

            operate.push(operateItem);

            operateItem = {
                'sale_qtty': null,
                'select': true,
                'sku': null,
                'VAList': []
            };
        });
        console.log(operate);
        return operate;
    }

    function order_buyAgain() {
        var operate = order_getOperate();
        $.ajax({
                url: '/cart/addBatch',
                type: 'POST',
                data: {
                    operate: operate
                }
            })
            .done(function (data) {
                if (data.success) {
                    //window.location.href = data.redirectUrl;
                } else {

                }
            })
    }

    $('#buyAgain').click(function () {
        if (!$(this).hasClass('disabled')) {
            order_buyAgain();
        }
    })


    //个人中心 Order Detail End


    //#start 个人中心 WishList

    // 判断 wishlist 第一次加载数
    try {
        $(function () {
            var WishListNum = $('.wishlist-item').length;
            $('.wishList-seeMore').show();
            if (WishListNum < 9) {
                HideSeeMore('.wishList-seeMore');
            }
        })
    } catch (e) {}

    //点击查看更多商品
    $('.btn-seeMore-wishList').on('click', function () {
        getWishList();
    });

    //ajax 得到 wish List
    function getWishList() {
        var $WishListContainer = $('#wishList-container'),
            PageNum = $WishListContainer.data('pagenum'),
            Size = 9;
        //判断是否还有数据要加载
        if (PageNum === -1) {
            return;
        }
        //判断当前容器的数据是否正在加载中
        if ($WishListContainer.data('loading') === true) {
            return;
        } else {
            $WishListContainer.data('loading', true);
        }
        var NextWishNum = ++PageNum;
        loadingShow('.wish-loading', '.btn-seeMore-wishList');

        $.ajax({
            url: '/wish',
            data: {
                size: Size,
                num: PageNum,
                ajax: 1
            }
        }).done(function (data) {
            if (data.data === null || data.data === '') {
                $WishListContainer.data('pagenum', -1);
                HideSeeMore('.wishList-seeMore');
                loadingAndSeemoreHide('.wish-loading', '.btn-seeMore-wishList');
            } else if (data.data.list.length === 0) {
                $WishListContainer.data('pagenum', -1);
                HideSeeMore('.wishList-seeMore');
                loadingAndSeemoreHide('.wish-loading', '.btn-seeMore-wishList');
            } else {

                // 遍历模板 插入数据
                appendWishList(data.data);

                $WishListContainer.data('pagenum', NextWishNum);

                $('#wishlist-wookmark').imagesLoaded(function () {
                    loadingHide('.wish-loading', '.btn-seeMore-wishList');
                    $('.isHidden').removeClass('isHidden');
                    new Wookmark('#wishlist-wookmark', {
                        container: $('#wishlist-wookmark'),
                        align: 'left',
                        offset: 0,
                        itemWidth: 285
                    });

                    var WishNum = data.data.list.length;
                    if (WishNum < Size) {
                        HideSeeMore('.wishList-seeMore');
                    }
                });

                //图片延迟加载
                //$('img.img-lazy').lazyload({
                //    threshold: 1000,
                //    effect: 'fadeIn'
                //});

            }
        }).always(function () {
            $WishListContainer.data('loading', false);
        });
    }

    //遍历data 生成html 插入到页面
    function appendWishList(WishList) {
        var TplHtml = template('tpl-wish', WishList);
        var StageCache = $.parseHTML(TplHtml);
        $('#wishList-container').find('#wishlist-wookmark').append(StageCache);
    }

    // 新加载出来的也可点击 '心' 切换
    $('#wishList-container').on('click', '.btn-wishing', function (e) {
        var $this = $(e.target);
        var spu = $this.data('spu');
        $.ajax({
                url: '/wishlist/' + spu,
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    $this.toggleClass('active');
                }
            })
    });


    //#end 个人中心 WishList

    //#start 个人中心 Following

    // 判断 followlist 第一次加载数
    try {
        $(function () {
            var FollwListNum = $('.follow-item').length;
            $('.followList-seeMore').show();
            if (FollwListNum < 8) {
                HideSeeMore('.followList-seeMore');
            }
        })
        SubstringText('.followText-Info');
    } catch (e) {}

    $('.btn-seeMore-follow').on('click', function () {
        $('img.img-lazy').each(function () {
            var Src = $(this).attr('src'),
                Original = $(this).attr('data.original');
            if (Src === Original) {
                $(this).removeClass('img-lazy');
            }
        });
        getFollowList();
    });

    //ajax 得到 Following List
    function getFollowList() {
        var $followListContainer = $('#followList-container'),
            PageNum = $followListContainer.data('pagenum'),
            Size = 8;
        //判断是否还有数据要加载
        if (PageNum === -1) {
            return;
        }
        //判断当前容器的数据是否正在加载中
        if ($followListContainer.data('loading') === true) {
            return;
        } else {
            $followListContainer.data('loading', true);
        }
        var NextFollowNum = ++PageNum;
        loadingShow('.follow-loading', '.btn-seeMore-follow');

        $.ajax({
            url: '/following',
            data: {
                size: Size,
                num: PageNum,
                ajax: 1
            }
        }).done(function (data) {
            if (data.data === null || data.data === '') {
                $followListContainer.data('pagenum', -1);
                HideSeeMore('.followList-seeMore');
                loadingAndSeemoreHide('.follow-loading', '.btn-seeMore-follow');
            } else if (data.data.list.length === 0) {
                $followListContainer.data('pagenum', -1);
                HideSeeMore('.followList-seeMore');
                loadingAndSeemoreHide('.follow-loading', '.btn-seeMore-follow');
            } else {

                //遍历模板 生成html插入页面
                appendFollowList(data.data);

                $followListContainer.data('pagenum', NextFollowNum);
                loadingHide('.follow-loading', '.btn-seeMore-follow');

                if (data.data.list.length < Size) {
                    HideSeeMore('.followList-seeMore');
                }

                // 图片延迟加载
                $('img.img-lazy').lazyload({
                    threshold: 200,
                    effect: 'fadeIn'
                })
            }
        }).always(function () {
            $followListContainer.data('loading', false);
        });
    }

    function appendFollowList(followList) {
        var TplHtml = template('tpl-follow', followList);
        var StageCache = $.parseHTML(TplHtml);
        $('#followList-container').find('.row').append(StageCache);
    }

    $('#followList-container').on('click', '.btn-following', function () {
        var $this = $(this);
        $.ajax({
                url: '/follow/' + $this.data('did'),
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    $this.toggleClass('active');
                    if ('Following' == $this.html()) {
                        $this.html('Follow');
                    } else {
                        $this.html('Following');
                    }
                }
            });
    });

    //#end 个人中心 Following

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
if ($('.isHidden').hasClass('isHidden')) {
    $(function () {
        try {
            $('#daily-wookmark').imagesLoaded(function () {
                $('.daily-loading').hide();
                $('.dailyList-seeMore').show();

                $('.isHidden').removeClass('isHidden');

                // 设置视频的高度
                Width = $('.player-media').width();
                MediaHeight = Width * MediaScale;
                // 初始化 外边框尺寸
                $('.designer-media').css('height', MediaHeight);
                $('.designer-beginPlayer').css('display', 'block');

                var wookmark1 = new Wookmark('#daily-wookmark', {
                    container: $('#daily-wookmark'),
                    align: 'center',
                    offset: 0,
                    itemWidth: 272
                });

                var dailyNum = $('#daily-wookmark li').length;
                $('.productList-seeMore').show();
                if (dailyNum < 20) {
                    HideSeeMore('.dailyList-seeMore');
                }
            })
        } catch (e) {
        }
    });
}


window.onload = function () {
    // 初始化瀑布流
    // daily 瀑布流
    try {
        var wookmark1 = new Wookmark('#daily-wookmark', {
            container: $('#daily-wookmark'),
            align: 'center',
            offset: 0,
            itemWidth: 272
        });
    } catch (e) {
    }

    // wishlist 瀑布流
    try {
        var wishlist_wookmark = new Wookmark('#wishlist-wookmark', {
            container: $('#wishlist-wookmark'),
            align: 'left',
            offset: 0,
            itemWidth: 285
        });
    }
    catch (e) {
    }
};


// youtube 视频加载 start
// 视频播放
function onPlayerReady(event) {
    event.target.playVideo();
    //event.target.mute();  // 设置静音
}

// 视频播放失败
function onPlayerError(event) {
    event.target.playVideo();
}

// youtube 视频播放
// 视频比例
var MediaScale = 9 / 16;
var $ClickPlayer;

var Width = $('.player-media').width(),
    MediaHeight = Width * MediaScale;

// 加载视频
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

if ($('.ytplayer').length > 0) {
    // 初始化 外边框尺寸
    $('.designer-media').css('height', MediaHeight);
    $('.designer-beginPlayer').css('display', 'block');
}
var player;
// daily 页面
$('.daily-content').on('click', '.bg-player', function () {
    Width = $('.player-media').width();
    MediaHeight = Width * MediaScale;
    // 初始化 外边框尺寸
    $('.designer-media').css('height', MediaHeight);
    $('.designer-beginPlayer').css('display', 'block');

    startPlayer($(this));
});

// designer 页面
$('#designerContainer').on('click', '.bg-player', function () {
    startPlayer($(this));
});
// designerDetail 页面
$('#designerDetailContainer').on('click', '.bg-player', function () {
    startPlayer($(this));
});


function startPlayer($this) {
    var PlayId = $this.siblings('.ytplayer').data('playid');
    player = new YT.Player(PlayId, {
        height: MediaHeight,
        width: Width,
        videoId: PlayId,
        playerVars: {'autoplay': 1, 'controls': 2, 'showinfo': 0, 'playsinline': 1},
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });

    $ClickPlayer = $this;
    $this.css('display', 'none');
    $this.children('.bg-img').hide();
    $this.children('.btn-beginPlayer').hide();
    $this.siblings('.btn-morePlayer').removeAttr('hidden');
    $this.parents('.player-item').addClass('active');
}


// 判断是否离开曝光
$(document).on('scroll', function (event) {
    var $PlayerItem = $('.player-item');
    if ($PlayerItem.length !== 0 && $('#designerDetailContainer').length < 1) {
        $.each($PlayerItem, function (index, element) {
            if (switchPlayer(element) && $(element).hasClass('active')) {
                var $Player = $(element),
                    PlayerId = $Player.data('playid'),
                    isAdd = false;
                $Player.children('.bg-player').css('display', 'block');
                $Player.children('.bg-player').children('.bg-img').css('display', 'block');
                $Player.children('.bg-player').children('.btn-beginPlayer').css('display', 'block');
                $Player.children('.btn-morePlayer').attr('hidden','hidden');
                $Player.removeClass('active');
                $Player.children('iframe').remove();
                if (!isAdd) {
                    $Player.prepend('<div id="' + PlayerId + '" class="ytplayer" data-playid="' + PlayerId + '"></div>');
                    isAdd = true;
                }
            }
        });
    }
});

// 判断视频是否在曝光处
function switchPlayer(Player) {
    // 当前视窗浏览位置
    var CurrentPosition = $(window).scrollTop() + $(window).height();
    // 元素本身聚顶部高度
    var ItemPositionBottom = $(Player).offset().top;
    // 如果是曝光项，加上本身的高度
    // 完全出现在视窗内时，再曝光
    var ItemPositionTop = ItemPositionBottom + $(Player).height();
    // 判断是否在视窗内
    if (ItemPositionBottom > CurrentPosition || ItemPositionTop < $(window).scrollTop()) {
        return true;
    } else {
        return false;
    }
}

// youtube 视频加载 end