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
    function SubstringText(strinfo, strlenght) {  //'.designer-intro'
        $(strinfo).each(function () {
            var str = $(this).html();

            if (str.length > strlenght) {
                str = str.substring(0, strlenght);
                var lastIndex = str.lastIndexOf(' ');
                if(lastIndex != '-1'){
                    var lastStr = str.substring(0, lastIndex);
                } else {
                    var lastStr = str;
                }
                if($(this).data('designerid') != ''){
                    str = lastStr + '... <a class="text-link" href="/designer/'+$(this).data('designerid')+'">View More</a>';
                } else {
                    str = lastStr + '...';
                }
            }
            $(this).html(str);
        });
    }

    // public 公共方法start

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

    // 设置cookie
    function setCookie(name, value) {
        //var Time = 24;
        var exp = new Date();
        //exp.setTime(exp.getTime() + Time * 60 * 60 * 1000);
        exp.setTime(exp.getTime() + 5 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    }

    // 读取cookie
    function getCookie(name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }

    // download 是否显示
    try {
        $(function () {
            var $downloadInfo = $('.download-info');
            $downloadInfo.click(function (e) {
                if(e.target != $('.img-fluid')[0] && e.target != $('.img-fluid')[1]
                    && e.target != $('.btn-black')[0] && e.target != $('.btn-black')[1]){
                    //window.location = '/download';
                    window.open('/download');
                }
            });
            if (getCookie('pcdownloadingApp')) {
                $downloadInfo.remove();
            } else {
                $downloadInfo.removeAttr('hidden');
            }
        })
    } catch (e) {
    }

    // public 关闭下载提示框
    $('.btn-closeDownload').on('click', function () {
        setCookie('pcdownloadingApp', 'true');
        $('.download-info').remove();
    });

    // 全局 loading
    function openCheckoutLoading() {
        $('#checkoutLoading').toggleClass('loading-hidden');
        setTimeout(function () {
            $('#checkoutLoading').toggleClass('loading-open');
        }, 25);
    }

    // loading 隐藏
    function closeCheckoutLoading() {
        $('#checkoutLoading').addClass('loading-close');
        setTimeout(function () {
            $('#checkoutLoading').toggleClass('loading-hidden loading-open').removeClass('loading-close');
        }, 500);
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
                if (impr != undefined && impr != null && impr != "") {
                    $.ajax({
                            url: impr
                        })
                        .always(function () {
                            //$(element).removeAttr('data-impr');
                        });
                }
            }else{
                return;
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
        imprList();
    })

    $(document).ready(function () {
        $('[data-clk]').unbind('click');
        $('[data-clk]').click(function () {
            var $this = $(this);

            $('#productClick-name').val($this.data('title'));
            $('#productClick-spu').val($this.data('spu'));
            $('#productClick-price').val($this.data('price'));

            if($('#gaProductClick').length>0){
                onProductClick();
            }

            $.ajax({
                url: $this.data('clk'),
                type: "GET"
            });
            //    window.open($this.data('link'));
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
            pagination: '.swiper-pagination',
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            spaceBetween: 30,
            effect: 'fade',
            loop: true
        });
    } catch (e) {
    }

    // designerList 判断设计师商品个数
    function swiperBtnHover() {
        $('.productImg-list').each(function () {
            var itemNum = $(this).children('.productImg-item').length,
                $btnNext = $(this).siblings('.swiper-button-next'),
                $btnPrev = $(this).siblings('.swiper-button-prev');
            $btnNext.hide();
            $btnPrev.hide();
            $(this).parent().hover(function () {
                if (itemNum > 3) {
                    $btnNext.show();
                    $btnPrev.show();
                }
            }, function () {
                $btnNext.hide();
                $btnPrev.hide();
            });

        })
    }

    swiperBtnHover();

    // 点击选择图片
    $('.product-smallImg').on('click', function (e) {
        if (!$(this).children('.small-img').hasClass('active')) {
            $('#btn-startPlayer').remove();
            $('.productImg-item img').removeClass('active');
            $(this).children('.small-img').addClass('active');

            if($(this).children('.small-img').data('idplay')){
                if($('#btn-startPlayer').length > 0){
                    $('#btn-startPlayer').remove();
                }
                $('.bg-productDetailPlayer').css('display','flex');
                var playid=$(this).children('.small-img').data('playid');
                shoppingDetailPlayer(playid);
            } else {
                $('.bg-productDetailPlayer').css('display','none');
                $('.play-content').html('<div id="ytplayer" class="ytplayer" data-playid=""></div>');
            }
        }
    });

    // shipppingDetail 视频播放 begin
    var player;
    function onPlayerReady(event) {
        event.target.playVideo();
    }
    // 视频播放-- 控制显示隐藏
    function shoppingDetailPlayer(PlayerId){
        $('.play-content').html('<div id="ytplayer" class="ytplayer" data-playid=""></div>');

        $('#ytplayer').data('playid',PlayerId);

        // youtube 视频播放
        // 视频比例
        var MediaScale = 9 / 16;
        var Width = ($('.gallery').width()).toFixed(2),
            MediaHeight = Width * MediaScale;

        player = new YT.Player('ytplayer', {
            height: MediaHeight,
            width: Width,
            videoId: PlayerId,
            playerVars: {'autoplay': 1, 'controls': 2, 'showinfo': 0, 'rel': 0},
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    // 播放第一个视频
    $('#btn-startPlayer').on('click',function(){
        var PlayerId=$(this).data('playerid');
        $(this).remove();
        $('.bg-productDetailPlayer').css('display','flex');
        shoppingDetailPlayer(PlayerId);
    });
    // shipppingDetail 视频播放 end



    // 选择 商品属性
    var product_data = eval('(' + $('#jsonStr').val() + ')');
    var spuAttrs = typeof(product_data) != "undefined" ? product_data.spuAttrs : '';

    if (spuAttrs != undefined && spuAttrs.length == 1) {
        if (spuAttrs[0].skuAttrValues.length == 1) {
            $('#p_a_w' + spuAttrs[0].attr_type).data('sel', 1);
            $('#productsku').val(product_data.main_sku)
            $('#skutype' + spuAttrs[0].skuAttrValues[0].attr_value_id).addClass('active');
        }
    }

    var product_arrayTemp_click = [];//被选中的总数组

    //点击属性事件
    $('.btn-itemProperty').on('click', function () {
        var ItemType = $(this).data('type');
        if (ItemType !== '' && !$(this).hasClass('disabled')) {
            $('#skuQty').data('num', 1);
            $('#skuQty').html(1);
            $('#skuQty').parent().siblings('.warning-info').addClass('off');
            $('#delQtySku').addClass('disabled');
            $('#addQtySku').removeClass('disabled');
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
            $.each(product_data.skuExps, function (index, val) {
                if (product_lastSkuArray[0] == val.sku) {
                    $('.newPrice').html('$' + (val.skuPrice.sale_price / 100).toFixed(2));
                    $('.oldPrice').html('$' + (val.skuPrice.price / 100).toFixed(2));
                    return false;
                }
            });
        }
        return product_lastSkuArray;
    }

    //操作后的可用状态
    function product_onclickStatic(nowClickArray, nowAT, clickStatus) {
        var lastSku = product_setLastSku();
        for (var i = 0; i < spuAttrs.length; i++) {
            if (nowAT != spuAttrs[i].attr_type) {
                for (var y = 0; y < spuAttrs[i].skuAttrValues.length; y++) {
                    var is = false;
                    for (var x = 0; x < spuAttrs[i].skuAttrValues[y].skus.length; x++) {
                        $('#skutype' + spuAttrs[i].skuAttrValues[y].attr_value_id).removeClass('disabled');
                        var _tempArr = nowClickArray;
                        if ($('#p_a_w' + spuAttrs[i].attr_type).data('sel') == 0) {
                            _tempArr = lastSku;
                        }
                        if (_tempArr.indexOf(spuAttrs[i].skuAttrValues[y].skus[x]) >= 0) {
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
                $('#addQtySku').addClass('disabled');
                $(this).parent().siblings('.warning-info').removeClass('off');
                if (skuQty >= 50) {
                    $(this).parent().siblings('.warning-info').children('span').html("Warning: " + product_stock_qtty + ' items limit');
                } else {
                    $(this).parent().siblings('.warning-info').children('span').html('Warning: only ' + product_stock_qtty + ' left');
                }
            }
            if (skuQty <= 1) {
                !$('#delQtySku').hasClass('disabled') ? $('#delQtySku').addClass('disabled') : false;
            }
        } else {
            !$('#delQtySku').hasClass('disabled') || $(this).data('num') > 0 ? pSelAttr() : false;
        }

        $('#addToCart-quantity').val($('#skuQty').html());
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
        if (!pSelAttr()) {
            return false;
        }
        if ($('#productsku').val()) {
            var operate = {
                'sale_qtty': $('#skuQty').data('num'),
                'select': true,
                'sku': $('#productsku').val(),
                'VAList': []
            };

            var flag = true;
            if (product_data.vasBases != undefined) {
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

            // 添加购物车埋点
            onAddToCart();

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
                        if (data.redirectUrl != null) {
                            window.location.href = data.redirectUrl;
                        }
                    } else {
                        AddItemFailModal.open();
                        setTimeout(function () {
                            AddItemFailModal.close();
                        }, 1500);
                    }
                });
        }
    });

    // 属性验证
    function pSelAttr() {
        if (spuAttrs == undefined) {
            return true
        }
        var status = true;
        $.each(product_data.spuAttrs, function (index, val) {
            if ($('#p_a_w' + val.attr_type).data('sel') == 0) {
                $('#p_a_w' + val.attr_type).focus();
                $('#p_a_w' + val.attr_type).removeClass('off');
                //$("html,body").animate({scrollTop: $('#p_a_w' + val.attr_type).offset().top}, 200);
                status = false;
                return false;
            }
        });
        return status;
    }

    // 选择 商品增值服务
    $('.input-engraving').on('click', function () {
        $(this).removeClass('disabled');
        $(this).siblings('.icon-checkcircle').addClass('active');
        $(this).parents('.flex-alignCenter').siblings('.warning-info').addClass('off');
    });

    var CheckNum = 0
    $('.icon-checkcircle').on('click', function () {
        if (CheckNum === 0 && $(this).hasClass('active')) {
            CheckNum = 0;
        } else {
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
            CheckNum++;
        }
    });

    // 点击 "心" 关注商品
    $('.btn-wish').on('click', function () {
        var $this = $(this);
        var spu = $this.data('spu');
        if (spu != undefined) {
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
        if (spu != undefined) {
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
    var secondnum = parseInt(endTimes - beginTimes);   //604802000    // 预售总时长
    var rate = ((leftNum / secondnum).toFixed(4) * 10000); //剩余时间所占总时长的比例
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
            if ($('#designerDetailContainer').length > 0) {
                $('.day-info').html(day);
                $('.hour-info').html(hour);
                $('.min-info').html(minute);
                $('.sec-info').html(second);
            }
            intDiff--;
            rate = ((intDiff * 1000 / secondnum).toFixed(4) * 10000);
            $('#limited-progress').attr('value', rate);
        }, 1000);
    }

    if (leftNum != -1) {
        $(function () {
            timer(leftNum / 1000);
        });
    }


    // ShoppingDetail.html  end

    // Shopping Cart begin
    // 初始化 确认删除 弹出框
    try {
        var Options = {
            closeOnOutsideClick: false,
            closeOnCancel: false,
            hashTracking: false
        };
        var OptionsShare = {
            closeOnOutsideClick: true,
            closeOnCancel: false,
            hashTracking: false
        }
        // 删除购物车商品 提示框
        var CartModal = $('[data-remodal-id=cartmodal]').remodal(Options);
        // Shopping Detail 添加购物车成功 提示框
        var AddItemModal = $('[data-remodal-id=additem-modal]').remodal(Options);
        // Shopping Detail 添加购物车失败 提示框
        var AddItemFailModal = $('[data-remodal-id=additemfail-modal]').remodal(Options);
        // Address List 删除地址 提示框
        var DelAddressModal = $('[data-remodal-id=addressmodal-modal]').remodal(Options);
        // 个人中心 修改密码成功 提示框
        var ChangePwdModal = $('[data-remodal-id=changepwd-modal]').remodal(Options);

        // inviteFriend share 内容
        var ShareModal = $('[data-remodal-id=sharemodal]').remodal(OptionsShare);

        // 邮件订阅 弹出框
        var redeemModal = $('[data-remodal-id=redeem-modal]').remodal(Options);

        // designerDetail 弹出视频
        var playerModal = $('[data-remodal-id=playermodal]').remodal(OptionsShare);

        // 删除 card 提示框
        var DelCardModal = $('[data-remodal-id=paymentmodal-modal]').remodal(Options);

    } catch (e) {
    }

    //购物车修改购买数量
    $('.cupn').on('click', function (e) {
        var tObj = $(this);
        var nowsku = tObj.data('sku');
        var nowkey = tObj.data('key');
        if (nowsku && !tObj.hasClass('disabled')) {
            //tObj.addClass('disabled');
            var skuQty = $('#cskunum' + nowsku).html() * 1 + tObj.data('num');
            $.ajax({
                    url: '/checkStock',
                    type: 'POST',
                    data: {
                        skus: nowsku + '_' + skuQty
                    }
                })
                .done(function (data) {
                    if (data.success) {
                        if (data.data.list[0].stockStatus === 1) {
                            $('#cskunum' + nowsku).html(skuQty);
                            tObj.removeClass('disabled');
                            if (skuQty == 2) $('#cdsku' + nowsku).removeClass('disabled');
                            if (skuQty == 1) $('#cdsku' + nowsku).addClass('disabled');
                            if (skuQty >= 50) {
                                $('#casku' + nowsku).addClass('disabled');
                                $('#casku' + nowsku).parents('.cartProduct-item').siblings('.warning-info').removeClass('off');
                                $('#casku' + nowsku).parents('.cartProduct-item').siblings('.warning-info').children('span').html(skuQty + ' items limit');

                            }
                            if (skuQty <= 49) {
                                $('#casku' + nowsku).removeClass('disabled');
                                $('#casku' + nowsku).parents('.cartProduct-item').siblings('.warning-info').addClass('off');
                            }
                            $.ajax({
                                    url: 'cart/alterQtty',
                                    type: 'POST',
                                    data: {
                                        sku: nowsku,
                                        qtty: skuQty
                                    }
                                })
                                .done(function (data) {
                                    if (data.success) {
                                        cart_update_info(nowkey);
                                    }
                                })

                        } else {
                            $('#casku' + nowsku).addClass('disabled');
                            $('#casku' + nowsku).parents('.cartProduct-item').siblings('.warning-info').removeClass('off');
                            $('#casku' + nowsku).parents('.cartProduct-item').siblings('.warning-info').children('span').html("Warning: Only " + (skuQty - 1) + ' left');

                        }
                    }
                });

        }
    });

    //动态更新购物车价格总数量
    function cart_update_info(nowkey) {
        $.ajax({
                url: '/cart/list',
                type: 'GET',
            })
            .done(function (data) {
                if (data.success) {
                    if (data.data != '') {
                        $('.total_amount').html('$' + (data.data.total_amount / 100).toFixed(2));
                        $('.total_sku_qtty').html('Items (' + data.data.total_sku_qtty + '):');
                        $('.vas_amount').html('$' + (data.data.vas_amount / 100).toFixed(2));
                        $('.pay_amount').html('$' + (data.data.pay_amount / 100).toFixed(2));
                        if(nowkey != undefined){
                            $('.skuprice'+nowkey).html('$'+(data.data.showSkus[nowkey].sale_price / 100).toFixed(2));
                        }
                        if (data.data.pay_amount <= 0) {
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


    //购物车删除操作q
    $('.delCartM').on('click', function () {
        onRemoveFromCart();

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

        // 埋点数据
        $('#removeFromCart-name').val($(this).data('title'));
        $('#removeFromCart-spu').val($(this).data('spu'));
        $('#removeFromCart-price').val($(this).data('price'));
        $('#removeFromCart-quantity').val($(this).data('qtty'));

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

    // Shopping Cart end

    // Checkout Start
    $('#addAddress').on('click', function () {
        //var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        var $email = $('.address-email'),
            $name = $('.address-name'),
            $city = $('.address-city'),
            $tel = $('.address-phone'),
            $addr1 = $('.address-addr1'),
            $zip = $('.address-zipcode');
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
                            var Aid = data.data.receiving_id;
                            setTimeout(function () {
                                if ($('.card-message') && $('div[data-aid = "' + Aid + '"]').hasClass('active')) {
                                    $('.card-message .def-name').html(data.data.name);
                                    $('.card-message .def-city').html(data.data.city);
                                    $('.card-message .def-zip').html(data.data.zip);
                                    $('.card-message .def-state').html(data.data.state);

                                    $('.card-message .def-tel').val(data.data.telephone);
                                    $('.card-message .def-addr1').val(data.data.detail_address1);
                                    $('.card-message .def-addr2').val(data.data.detail_address2);
                                    $('.card-message .def-country').val(data.data.country);

                                    $('#defaultAddr').html(data.data.name + " " + data.data.detail_address1 + " " + data.data.city + " " + data.data.state + " " + data.data.country + " " + data.data.zip);
                                    $.ajax({
                                        url: '/wordpay/selAddr/' + Aid,
                                        type: 'get'
                                    })
                                }
                            }, 1000);

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
                            if ($('.card-message') && $('div[data-aid = "'+Aid+'"]').hasClass('active')) {
                                $('.card-message .def-name').html(data.data.name);
                                $('.card-message .def-city').html(data.data.city);
                                $('.card-message .def-zip').html(data.data.zip);
                                $('.card-message .def-state').html(data.data.state);

                                $('.card-message .def-tel').val(data.data.telephone);
                                $('.card-message .def-addr1').val(data.data.detail_address1);
                                $('.card-message .def-addr2').val(data.data.detail_address2);
                                $('.card-message .def-country').val(data.data.country);

                                $('#defaultAddr').html(data.data.name+" "+data.data.detail_address1+" "+data.data.city+" "+data.data.state+" "+data.data.country+" "+ data.data.zip);

                                $.ajax({
                                    url: '/wordpay/selAddr/' + Aid,
                                    type: 'get'
                                })
                            }
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

    // 设置地址为默认地址
    $('.btn-makePrimary').on('click', function () {
        if ($(this).hasClass('active')) {
            $('input[name="isd"]:eq(1)').attr("checked", 'checked');
        } else {
            $('input[name="isd"]:eq(0)').attr("checked", 'checked');
        }
    });

    // 控制 div 显示隐藏
    $('.btnAddrShowHide').on('click', function () {
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
        $('#defaultAddr').data('csn', $(this).parent('.address-item').data('csn'));
        $('#defaultAddr').data('aid', $(this).parent('.address-item').data('aid'));

        var userName = $(this).parent('.address-item').data('name');
        var city = $(this).parent('.address-item').data('city');
        var zip = $(this).parent('.address-item').data('zip');
        var state = $(this).parent('.address-item').data('state');
        var tel = $(this).parent('.address-item').data('tel');
        var addr1 = $(this).parent('.address-item').data('addr1');
        var addr2 = $(this).parent('.address-item').data('addr2');
        var country = $(this).parent('.address-item').data('country');

        $('.card-message .def-name').html(userName);
        $('.card-message .def-city').html(city);
        $('.card-message .def-zip').html(zip);
        $('.card-message .def-state').html(state);

        $('.card-message .def-tel').val(tel);
        $('.card-message .def-addr1').val(addr1);
        $('.card-message .def-addr2').val(addr2);
        $('.card-message .def-country').val(country);

        $.ajax({
            url: '/wordpay/selAddr/' + $(this).parent('.address-item').data('aid'),
            type: 'get'
        })
            .done(function () {
                if($('#checkoutView').data('status')){
                    getshiplist();
                }
            })
    });

    // 修改地址
    $('.address-list').on('click', '.btn-editAddress', function () {
        $('.select-address').addClass('disabled');
        $('.add-address').removeClass('disabled');
        CheckNum = 0;
        // 修改的地址 ID
        var AddressId = $(this).parent('.address-item').data('aid');
        $('#addAddressForm').data('aid', AddressId);
        $('.address-text').html('Modify Address');
        initAddAddressForm();
    });

    // 初始化 添加地址表单
    function initAddAddressForm() {
        var AddressId = $('#addAddressForm').data('aid');
        if (AddressId === '' || AddressId === undefined) {
            if ($('.address-item').length <= 0) {
                $('.isDefault').addClass('active');
                CheckNum = 0;
            } else {
                $('.isDefault').removeClass('active');
            }
            // 添加地址
            //初始化 修改地址 from 表单
            $('.address-email').val('');
            $('.address-name').val('');
            $('.address-city').val('');
            $('#addAddressForm input[name="state"]').val('');
            $('.address-phone').val('');
            $('.address-addr1').val('');
            $('.address-addr2').val('');
            $('.address-zipcode').val('');
            $('.address-save').addClass('disabled');
            $('.select-country').prop('selectedIndex', 0);

            // 初始化 国家,洲

            var Country = $('#addAddressForm .select-country option:selected').text();
            initCityState(Country, '');
        } else {
            // 修改地址
            $.ajax({
                    url: '/address/' + AddressId,
                    type: 'GET'
                })
                .done(function (data) {
                    //初始化 修改地址 from 表单
                    $('.address-email').val(data.email);
                    $('.address-name').val(data.name);
                    $('.address-city').val(data.city);
                    $('#addAddressForm input[name="state"]').val(data.state);
                    $('.address-phone').val(data.telephone);
                    $('.address-addr1').val(data.detail_address1);
                    $('.address-addr2').val(data.detail_address2);
                    $('.address-zipcode').val(data.zip);
                    $('.select-country').val(data.country);

                    // 初始化 国家,洲
                    initCityState(data.country, data.state);

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
    $('.select-country').change(function () {
        var Country = $('.select-country option:selected').text();

        initCityState(Country, '');
        if (address_check($('.address-name')) && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    // 初始化 国家,洲
    // country: 国家名称
    // State: 修改地址时,州名称
    function initCityState(Country, State) {
        // CountryId  国家Id
        // SelectType 国家对应洲类型
        var CountryId = $('.select-country > option[value="' + Country + '"]').data('id');
        var SelectType = $('.select-country > option[value="' + Country + '"]').data('type');
        var child_label = $('.select-country > option[value="' + Country + '"]').data('child_label');
        var zipcode_label = $('.select-country > option[value="' + Country + '"]').data('zipcode_label');
        $('.address-zipcode').siblings('.warning-info').children('span').html('Please enter your '+ zipcode_label + ' !');
        $('.address-zipcode').attr('placeholder', zipcode_label);
        if (SelectType != undefined && SelectType === 0) {
            // 洲为选填
            $('#addAddressForm .state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary" placeholder="'+ child_label + '(optional)">');
            $('#addAddressForm input[name="state"]').val(State);
        } else if (SelectType != undefined && SelectType === 1) {
            // 洲为必填
            $('#addAddressForm .state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary address-state" placeholder="' + child_label + '"><div class="warning-info flex flex-alignCenter text-warning p-t-5x off"> <i class="iconfont icon-caveat icon-size-md p-r-5x"></i> <span class="font-size-base">Please enter your ' + child_label + '!</span> </div>');
            $('#addAddressForm input[name="state"]').val(State);
        } else {
            // 洲为下拉列选择
            // 获取 洲 列表
            $.ajax({
                    url: '/statelist/' + CountryId,
                    type: 'GET'
                })
                .done(function (data) {
                    $('#addAddressForm .state-info').html('<select name="state" class="form-control contrlo-lg select-state"></select>');
                    // 添加选项
                    $.each(data, function (n, value) {
                        var StateNameId = value['state_name_sn'];
                        var StateNameEn = value['state_name_en'];
                        $("<option></option>").val(StateNameId).text(StateNameEn).appendTo($('#addAddressForm select[name="state"]'));
                    });
                    if (State != "") {
                        $('#addAddressForm select[name="state"]').val(State);
                    }
                })
        }
    }

    try {
        if ($('#checkoutView').data('status') || $('#addressView').data('status')) {
            // 初始化 国家,洲
            var Country = $('.select-country option:selected').text();
            initCityState(Country, '');
        }
    } catch (e) {
    }

    $('.checkout-method').on('click', '.methodRadio', function () {
        var payPrice = $(this).data('price') > 0 ? ' +$' + ($(this).data('price') / 100).toFixed(2) : '';
        $('.shippingMethodShow').html($(this).data('show') + payPrice);


        $.ajax({
            url: '/wordpay/selship/' + $(this).val(),
            type: 'get'
        })
            .done(function (data) {
                getCheckoutInfo();
            });

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
        var messageStr = $('textarea[name="cremark"]').val();
        if (messageStr.length >= 30) {
            messageStr = messageStr.substring(0, 30) + '...';
        }
        $('#srmessage').html(messageStr);
        if ($('#crShowHide').children('.showHide-simpleInfo').length > 0) {
            var $sm = $('#crShowHide').siblings('.showHide-body');
            if ($sm.hasClass('active')) {
                $sm.slideUp(500);
                $sm.removeClass('active');
                $('#crShowHide').removeClass('active');
            }
        }
    });

    //重新获取结算信息
    function getCheckoutInfo() {
        var aid = $('#defaultAddr').data('aid') == undefined ? '' : $('#defaultAddr').data('aid');
        var bindid = $('#pcode').data('bindid') == undefined ? '' : $('#pcode').data('bindid');
        var smethod = $('input[name="shippingMethod"]:checked').val() == undefined ? '' : $('input[name="shippingMethod"]:checked').val();
        console.log(smethod);
        $.ajax({
                url: '/cart/accountlist?aid=' + aid + '&bindid=' + bindid + '&logisticstype=' + smethod,
                type: 'GET',
            })
            .done(function (data) {
                if (data.success) {
                    if (data.data.cps_amount > 0) {
                        $('.cps_amountShow').removeClass('hidden');
                        $('.cps_amount').html('-$' + (data.data.cps_amount / 100).toFixed(2));
                    } else {
                        $('.cps_amountShow').addClass('hidden');
                    }
                    if (data.data.tax_amount > 0) {
                        $('.tax_amountShow').removeClass('hidden');
                        $('.tax_amount').html('$' + (data.data.tax_amount / 100).toFixed(2));
                    } else {
                        $('.tax_amountShow').addClass('hidden');
                    }
                    if (data.data.freight_amount > 0) {
                        $('.freight_amount').html('$' + (data.data.freight_amount / 100).toFixed(2));
                    } else {
                        $('.freight_amount').html('Free');
                    }
                    $('.pay_amount').html('$' + (data.data.pay_amount / 100).toFixed(2));
                    $('.checkoutInfo').data('price', data.data.total_amount + data.data.vas_amount);
                }
            })
    }

    // 生成订单
    $('#placeOrder').on('click', function () {

        if ($('#defaultAddr').data('aid') < 1) {
            checkValid($('input[name="name"]'));
            $("html,body").animate({scrollTop: $('#addrShowHide').offset().top}, 100);
            return false;
        }

        if($('.payment-text').html() == ""){
            $('.checkoutWarning .font-size-base').html('Please choose your payment method!');
            $('.checkoutWarning').removeAttr('hidden');
            setTimeout(function () {
                $('.checkoutWarning').attr('hidden', "");
            }, 3000);
            return false;
        }

        if($('input[name="shippingMethod"]:checked').val() < 0){
            $('.checkoutWarning .font-size-base').html('Please choose your shipping method!');
            $('.checkoutWarning').removeAttr('hidden');
            setTimeout(function () {
                $('.checkoutWarning').attr('hidden', "");
            }, 3000);
            return false;
        }

        openCheckoutLoading();
        var $this = $(this);
        $.ajax({
            url: $this.data('clks'),
            type: 'get'
        });

        var paym = $(this).data('with');
        $.ajax({
                url: '/payorder',
                type: 'POST',
                data: {
                    aid: $('#defaultAddr').data('aid'),
                    bindid: $('#pcode').data('bindid') == undefined ? '' : $('#pcode').data('bindid'),
                    remark: $('input[name="cremark"]').val(),
                    stype: $('input[name="shippingMethod"]:checked').val(),
                    paym: paym
                }
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('.checkoutWarning .font-size-base').html('There was a problem validating your payment. Please verify all payment details and try placing your order again. Thank you.');
                    $('.checkoutWarning').removeAttr('hidden');
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            })
            .always(function(){
                closeCheckoutLoading();
            })
    });


    // 进入添加地址界面
    $('.btn-addNewAddress').on('click', function () {

        $('.select-address').addClass('disabled');
        $('.add-address').removeClass('disabled');
        $('#addAddressForm').data('aid', '');
        $('.address-text').html('Add Shipping Address');
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
                    if ($('.address-item').length === 1 && $('#addrlength').data('addrlength') == 0) {
                        $.each(data.data.list, function (n, value) {
                            var country = value['country'],
                                city = value['city'],
                                detail_address1 = value['detail_address1'],
                                zip = value['zip'],
                                name = value['name'],
                                state = value['state'];
                            $('#defaultAddr').html(name + detail_address1 + " " + city + " " + state + " " + country + " " + zip);
                            $('#defaultAddr').data('csn', value['country_name_sn']);
                            $('#defaultAddr').data('aid', value['receiving_id']);
                            $('#addrlength').data('addrlength', 1);
                        });
                        getshiplist();
                    }
                }
            })
    }

    //设置配送服务
    function getshiplist() {
        $.ajax({
                url: '/getshiplist?country=' + $('#defaultAddr').data('csn') + '&price=' + $('.checkoutInfo').data('price'),
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    var payPrice = data.data.list[0].pay_price > 0 ? ' +$' + (data.data.list[0].pay_price / 100).toFixed(2) : '';
                    $('.shippingMethodShow').html(data.data.list[0].logistics_name + payPrice);
                    if (data.data.list.length < 2) {
                        $('.shippingMethodButton').html('&nbsp;');
                    } else {
                        $('.shippingMethodButton').html('Edit');
                    }
                    appendMethodList(data.data);
                    getCheckoutInfo();
                }
            })
    }

    //遍历模板, 配送方式
    function appendMethodList(MethodList) {
        var TplHtml = template('tpl-method', MethodList);
        var StageCache = $.parseHTML(TplHtml);
        $('.checkout-method').html(StageCache);
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


    // start 支付方式 Payment Method

    // 选择卡
    $('.payment-list').on('click', '.card-item', function () {
        $('.payment-list').find('.card-item').removeClass('active');
        $(this).addClass('active');
        var cardType = $(this).data('cardtype');
        var cardNum = $(this).data('cardnum');
        var cardId = $(this).data('cardid');
        var payType = $(this).data('paytype');

        $('.pay-img').removeClass('active');
        if (cardType == 'Visa'){
            $('.pay-img.pay-visa').addClass('active');
        }else if (cardType === 'MasterCard'){
            $('.pay-img.pay-masc').addClass('active');
        }else if (cardType === 'AmericanExpress'){
            $('.pay-img.pay-amc').addClass('active');
        }else if (cardType === 'JCB'){
            $('.pay-img.pay-jcb').addClass('active');
        }else if (cardType === 'paypal'){
            $('.pay-img.pay-paypal').addClass('active');
        }

        $('.payment-text').html(cardNum);

        $.ajax({
            url: '/wordpay/paywith/' + payType + '/' + cardId,
            type: 'get'
        })

    });

    // 点击添加信用卡
    $('.payment-list').on('click', '.addCreditCard', function () {
        $('.select-payment').addClass('disabled');
        $('.add-newCard').removeClass('disabled');
        if('Oceanpay' == $(this).data('method')){
            $('#img-amex').css('display', 'none');
            $('#img-jcb').css('display', 'none');
        }else{
            $('#img-amex').css('display', 'inline-flex');
            $('#img-jcb').css('display','inline-flex');
        }
    });

    // 控制 支付方式div 显示/隐藏
    $('#btnPaymentShowHide').on('click', function () {
        if ($('#pmShowHide').children('.showHide-simpleInfo').length > 0 || true) {
            var $pmContent = $('#pmShowHide').siblings('.showHide-body');
            if ($pmContent.hasClass('active')) {
                $pmContent.slideUp(500);
                $pmContent.removeClass('active');
                $('#pmShowHide').removeClass('active');
            }
        }
    });
    $('#card-addAddress-cancel').on('click', function () {
        $('.select-payment').removeClass('disabled');
        $('.add-newCard').addClass('disabled');

    });

    // 选择与shipping相同的地址
    $('.choose-oldAddr').on('click', function () {
        $('.card-message').removeClass('disabled');
        $('.card-addNewAddr').addClass('disabled');

        //if (checkInput($('input[name="card"]')) && checkInput($('input[name="expiry"]')) && checkInput($('input[name="cvc"]'))){
        //    $('#btn-addNewCard').removeClass('disabled')
        //}else{
        //    $('#btn-addNewCard').addClass('disabled')
        //}

    });
    // 选择 新增账单地址
    $('.choose-addNewAddr').on('click', function () {
        $('.card-message').addClass('disabled');
        $('.card-addNewAddr').removeClass('disabled');

        var Country = $('.card-selectCountry option:selected').text();
        initPaymentCityState(Country, '')
    });


    //初始化 账单地址 国家洲
    function initPaymentCityState(Country, State) {
        // CountryId  国家Id
        // SelectType 国家对应洲类型
        var CountryId = $('.card-selectCountry > option[value="' + Country + '"]').data('id');
        var SelectType = $('.card-selectCountry > option[value="' + Country + '"]').data('type');
        var child_label = $('.card-selectCountry > option[value="' + Country + '"]').data('child_label');
        var zipcode_label = $('.card-selectCountry > option[value="' + Country + '"]').data('zipcode_label');
        $('.card-zip').siblings('.warning-info').children('span').html('Please enter your '+ zipcode_label + ' !');
        $('.card-zip').attr('placeholder', zipcode_label);
        $('.card-zip').attr('data-inputrole',zipcode_label);
        if (SelectType != undefined && SelectType === 0) {
            // 洲为选填
            $('#card-addAddressForm .state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary card-state" placeholder="State (optional)">');
        } else if (SelectType != undefined && SelectType === 1) {
            // 洲为必填
            $('#card-addAddressForm .state-info').html('<input type="text" name="state" class="form-control contrlo-lg text-primary card-state" data-optional="false" data-inputrole="'+child_label+'" placeholder="'+child_label+'"><div class="warning-info flex flex-alignCenter text-warning p-t-5x off"> <i class="iconfont icon-caveat icon-size-md p-r-5x"></i> <span class="font-size-base">Please enter your "'+child_label+'" !</span> </div>');

        } else {
            // 洲为下拉列选择
            // 获取 洲 列表
            $.ajax({
                    url: '/statelist/' + CountryId,
                    type: 'GET'
                })
                .done(function (data) {
                    $('#card-addAddressForm .state-info').html('<select name="state" class="form-control contrlo-lg card-state"></select>');
                    // 添加选项
                    $.each(data, function (n, value) {
                        var StateNameId = value['state_name_sn'];
                        var StateNameEn = value['state_name_en'];
                        $("<option></option>").val(StateNameId).text(StateNameEn).appendTo($('#card-addAddressForm select[name="state"]'));
                    });
                    if (State != "") {
                        $('#card-addAddressForm select[name="state"]').val(State);
                    }
                })
        }
    }
    // card 选择国家 联动洲
    $('.card-selectCountry').change(function () {
        var Country = $(this).val();
        initPaymentCityState(Country, '');

    });
    // 验证input非空 并 添加提示文本
    function checkInput(thisElem){
        if (thisElem.val() === ''){
            thisElem.siblings('.warning-info').removeClass('off');
            thisElem.siblings('.warning-info').children('span').html('Please enter a valid ' + thisElem.data('inputrole') + ' !');
            return false;
        }else{
            thisElem.siblings('.warning-info').addClass('off');
            return true;
        }
    }
    //获得焦点时移除提示
    $('input[data-optional="false"]').on('focus', function () {
        $(this).siblings('.warning-info').addClass('off');
    });
    //Credit Card 校验
    if($('#addCard-container').length > 0){
        $('#addCard-container').card({
            container: '.card-wrapper'
        });
    }
    // 提交卡信息
    $('#btn-addNewCard').on('click', function () {
        //校验
        if( $('.card-addNewAddr').hasClass('disabled')){
            if( !checkInput($('input[name="card"]')) || !checkInput($('input[name="expiry"]')) || !checkInput($('input[name="cvc"]')) ){
                return;
            }

        }else {
            if ( !checkInput($('input[name="card"]')) || !checkInput($('input[name="expiry"]')) || !checkInput($('input[name="cvc"]')) ||
                !checkInput($('.card-name')) || !checkInput($('.card-tel')) || !checkInput($('.card-addr1')) || !checkInput($('.card-city')) ||
                !checkInput($('.card-zip')) || !checkInput($('.card-state')) ){
                return;
            }

        }

        openCheckoutLoading();
        var $this = $(this);
        $this.addClass('disabled');
        var cardNum =  $('.card-number').val();
        var cardDate = $('.card-date').val();
        var cardCode = $('.card-code').val();
        var cardName = '', cardTel = '', cardAddr1 = '', cardAddr2 = '', cardCity = '', cardCountry = '',cardZip = '', cardState = '';
        var cardType = $('input[name="card_type"]').val();
        var csn = '';

        if( $('.card-addNewAddr').hasClass('disabled') ){ //选择了与shipping相同的地址信息
            cardName = $('.def-name').html();

            cardTel = $('.def-tel').val();
            cardAddr1 = $('.def-addr1').val();
            cardAddr2 = $('.def-addr2').val();
            cardCity = $('.def-city').html();
            cardCountry = $('.def-country').val();
            cardZip = $('.def-zip').html();
            cardState = $('.def-state').html();
            csn = $('.card-selectCountry > option[value="' + cardCountry + '"]').data('csn');

        }else{
            cardName = $('.card-name').val();

            cardTel = $('.card-tel').val();
            cardAddr1 = $('.card-addr1').val();
            cardAddr2 = $('.card-addr2').val();
            cardCity = $('.card-city').val();
            cardCountry = $('.card-selectCountry > option:selected').text();
            cardZip = $('.card-zip').val();
            cardState = $(".card-state").val();
            csn = $('.card-selectCountry > option[value="' + cardCountry + '"]').data('csn');

        }
        $.ajax({
                url: '/wordpay/addCard',
                type: 'POST',
                data: {
                    card: cardNum,
                    expiry: cardDate,
                    cvv: cardCode,
                    card_type: cardType,
                    name: cardName,
                    tel: cardTel,
                    addr1: cardAddr1,
                    addr2: cardAddr2,
                    city: cardCity,
                    country: cardCountry,
                    csn: csn,
                    zip: cardZip,
                    state: cardState
                }
            })
            .done(function (data) {
              if (data.success) {
                    getCardList();
                    $('#addCard-container input[type="text"]').val('');
                    $('#card-addAddressForm input[type="text"]').val('');
                    $('.select-payment').removeClass('disabled');
                    $('.add-newCard').addClass('disabled');

                    var cardType = data.data.card_type;
                    var cardNum = data.data.card_number;
                    var cardId = data.data.card_id;
                    var payType = data.data.pay_type;

                    $('.pay-img').removeClass('active');
                    if (cardType == 'Visa'){
                        $('.pay-img.pay-visa').addClass('active');
                    }else if (cardType === 'MasterCard'){
                        $('.pay-img.pay-masc').addClass('active');
                    }else if (cardType === 'AmericanExpress'){
                        $('.pay-img.pay-amc').addClass('active');
                    }else if (cardType === 'JCB'){
                        $('.pay-img.pay-jcb').addClass('active');
                    }else if (cardType === 'paypal'){
                        $('.pay-img.pay-paypal').addClass('active');
                    }

                    $('.payment-text').html(cardNum);


              } else {
                    $('.addCard-warning').removeClass('off');
                    setTimeout(function () {
                        $('.addCard-warning').addClass('off');

                    }, 5000);
                }
                $this.removeClass('disabled');
            })
            .always(function() {
                closeCheckoutLoading();
            });

    });
    function getCardList(){
        $.ajax({
            url:'/wordpay/paylist',
            type: 'GET'
        }).done(function (data) {
            if (data.success){
                appendCardList(data.data);
            }
        })
    }
    function appendCardList(cardList){
        var tplHtml = template('tpl-creditCard', cardList);
        var StageCache = $.parseHTML(tplHtml);
        $('.payment-list').html(StageCache);
    }
    // end 支付方式 Payment Method

    // 触发 删除卡
    $('.payment-list').on('click','.btn-deleteCard',function(){
        var CardId=$(this).data('cardid');
        $('[data-remodal-id="paymentmodal-modal"]').data('cardid', CardId);
        DelCardModal.open();
    });
    // 确认删除卡
    $('.delPaymentCard').on('click',function(){
        var CardId=$('[data-remodal-id="paymentmodal-modal"]').data('cardid');
        $.ajax({
                url: '/wordpay/delCard?card_id='+CardId,
                type: 'post',
                data: {}
            })
            .done(function (data) {
                if (data.success) {
                    $('.payment-list div[data-paymentcardid="' + CardId + '"]').remove();
                    DelCardModal.close();
                }
            })
    });

    // Checkout End


    // Login start

    function login_signin() {
        $('[data-role="login-submit"]').addClass('disabled');
        if ($('.login-email').val() == "" || $('.login-pw').val() == "") {
            return;
        }
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
                    window.location.href = '/login';
                } else {
                    $('.forget-email').parent().siblings('.warning-info').removeClass('off');
                    $('.forget-email').parent().siblings('.warning-info').children('span').html(data.error_msg);
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
        //var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        var reg = /^[\.a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
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
        if (login_validationEmail($('.login-email')) && login_validationPassword($('.login-pw'))) {
            $('div[data-role="login-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="login-submit"]').addClass('disabled');
        }
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            login_signin();
        }
    });

    $("body").keydown(function (e) {
        var event = event || e;
        if (event.keyCode == "13") {
            $('[data-role="login-submit"]').click();
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
        if ($(this).hasClass('disabled')) {
            return;
        } else {
            login_forgetPassword();
        }

    });


    // 忘记密码入口
    //$('.btn-forgotPwd').on('click', function () {
    //    $('.login-content').addClass('hidden').removeClass('active');
    //    $('.restPwd-content').removeClass('hidden').addClass('active');
    //    $('.login-title').text('Forget Password?');
    //});
    //
    //// 返回登录入口
    //$('.btn-backLogin').on('click', function () {
    //    $('.restPwd-content').addClass('hidden').removeClass('active');
    //    $('.login-content').removeClass('hidden').addClass('active');
    //    $('.login-title').text('Sign in with Motif Account');
    //});

    //Login end

    //第三方登录开始
    // google 第三方登录
    function attachSignin(element) {
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
                alert("something went wrong and we can't sign you in right now. please try again");
                window.location.reload();
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
    } catch (e) {
    }

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
        FB.api('/me', 'GET', {fields: 'id,name,picture.width(750).height(750),email'}, function (response) {
            if (response.email == '' || response == undefined) {
                $.ajax({
                        url: '/facebookstatus/' + response.id,
                        type: 'get'
                    })
                    .done(function (data) {

                        if (data.status) {
                            response.email = data.data.email;
                            loginSuccess(response);
                        } else {
                            window.location.href = '/addFacebookEmail?id=' + response.id + '&name=' + response.name;
                        }
                    })
            } else {
                loginSuccess(response);
            }

        });
    }

    function loginSuccess(response) {
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
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('.warning-info').removeClass('off');
                    $('.warning-info').children('span').html(data.prompt_msg);
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

    $('.emailRequired-email').on('keyup blur', function () {
        if ($(this).val() === '') {
            $(this).siblings('.icon-delete').addClass('hidden');
        } else {
            $(this).siblings('.icon-delete').removeClass('hidden');
        }

        if (login_validationEmail($(this))) {
            $('div[data-role="emailRequired-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="emailRequired-submit"]').addClass('disabled');
        }
    });

    // 提交 email 信息
    $('div[data-role="emailRequired-submit"]').on('click', function () {
        if (!$(this).hasClass('disabled')) {
            $.ajax({
                    url: '/facebooklogin',
                    type: 'post',
                    data: $('#register').serialize()
                })
                .done(function (data) {
                    if (data.success) {
                        window.location.href = data.redirectUrl;
                    }
                })
            $('.uploademail-loading').css('display', 'block');
            $('div[data-role="emailRequired-submit"]').addClass('disabled');
            setTimeout(function () {
                $('.uploademail-loading').css('display', 'none');
                $('div[data-role="emailRequired-submit"]').removeClass('disabled');
            }, 1500);
        }
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
        if (register_validationNick($('.register-nick')) && login_validationEmail($('.register-email')) && login_validationPassword($('.register-pw'))) {
            $('div[data-role="register-submit"]').removeClass('disabled');
        } else {
            $('div[data-role="register-submit"]').addClass('disabled');
        }
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
                $('.changepwd-info').html(data.prompt_msg);
                var $changePwdBtn = $('#changePwdBtn');
                if (data.success) {
                    $changePwdBtn.attr('href', data.redirectUrl);
                    $changePwdBtn.html('OK');
                    ChangePwdModal.open();
                } else {
                    $changePwdBtn.html('Close');
                    ChangePwdModal.open();
                    $changePwdBtn.click(function () {
                        ChangePwdModal.close();
                    });
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
        //var reg = /^[a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        var reg = /^[\.a-zA-Z0-9_-]+@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
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

    $('.address-name').on('keyup blur', function () {
        var name = $(this).val();
        if (address_check($(this)) && address_check($('.address-city'))
            && address_check($('.address-phone')) && address_check($('.address-addr1')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-city').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-phone')) && address_check($('.address-addr1')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-phone').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-addr1')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-addr1').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    $('.address-zipcode').on('keyup blur', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-addr1'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    // 验证 State
    $('#addAddressForm .state-info').on('keyup blur', '.address-state', function () {
        if (address_check($(this)) && address_check($('.address-name'))
            && address_check($('.address-city')) && address_check($('.address-phone')) && address_check($('.address-zipcode'))) {
            validateState();
        } else {
            $('.address-save').addClass('disabled');
        }
    });

    function validateState() {
        if ($('.address-state').length > 0) {
            if (address_check($('.address-state'))) {
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
                    $('.profile-save').addClass('disabled');
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
        SubstringText('.designer-intro', 260);
    } catch (e) {
    }

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

                    $('[data-clk]').unbind('click');
                    $('[data-clk]').click(function () {
                        var $this = $(this);
                        if($('#gaProductClick').length>0){
                            onProductClick();
                        }


                        $.ajax({
                            url: $this.data('clk'),
                            type: "GET"
                        });
                        //    window.open($this.data('link'));


                    })

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
                    SubstringText('.designer-intro', 260);

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
        var did = $this.data('did')
        if (did != undefined) {
            $.ajax({
                    url: '/follow/' + did,
                    type: 'GET'
                })
                .done(function (data) {
                    if (data.success) {
                        if ($('#designerIndex').data('show') || $('#designerUser').data('show')) {
                            $this.toggleClass('active');
                            if ('Following' == $this.html()) {
                                $this.html('Follow');
                            } else {
                                $this.html('Following');
                            }
                        } else {
                            $('.btn-follow').toggleClass('active');
                            if ('Following' == $('.btn-follow').html()) {
                                $('.btn-follow').html('Follow');
                            } else {
                                $('.btn-follow').html('Following');
                            }
                        }

                    }
                });
        } else {
            did = $this.data('actiondid')
            $.ajax({
                    url: '/noteaction',
                    type: 'get',
                    data: {
                        action: 'follow',
                        did: did
                    }
                })
                .done(function (data) {
                    window.location.href = '/login';
                })
        }

    });

    $('#designerContainer').on('click', '.btn-following', function () {
        var $this = $(this);
        var did = $this.data('did')
        if (did != undefined) {
            $.ajax({
                    url: '/follow/' + did,
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
        } else {
            did = $this.data('actiondid')
            $.ajax({
                    url: '/noteaction',
                    type: 'get',
                    data: {
                        action: 'follow',
                        did: did
                    }
                })
                .done(function (data) {
                    window.location.href = '/login';
                })
        }
    });

    $('#designerDetailContainer').on('click', '.bg-player', function () {
        playerModal.open();
    });

    $(document).on('closed', '[data-remodal-id="playermodal"]', function (e) {
        $('[data-remodal-id="playermodal"]').html('<div id="ytplayer" class="ytplayer" data-playid=""></div>');
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


    // Shopping List start

    // 判断 商品个数
    try {
        $(function () {
            var ProductListNum = $('.productList-item').length;
            $('.productList-seeMore').show();
            if (ProductListNum < 32) {
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
        getProductList(1);
    });

    // ajax 得到 product list
    // Type 1: 正常加载   2: 点击排序
    function getProductList(Type) {
        //  $DesignerContainer 列表容器
        //  Start 当前页开始条数
        //  Size 当前页显示条数
        var $ProductListontainer = $('#productList-container'),
            Pagenum = $ProductListontainer.data('pagenum'),
            Size = 32,
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

        // 设置搜索条件
        var search = $('#productList-container').data('searchid');
        var url = '';
        if (search === 0) {
            url = '/products';
        } else {
            url = '/products?extra_kv=sea:' + search;
        }

        loadingShow('.product-loading', '.productList-seeMore');
        $.ajax({
            url: url,
            data: {
                pagenum: Pagenum,
                pagesize: Size,
                cid: CategoryId
            }
        }).done(function (data) {
            onImpressProduct(data.data.list);
            if (data.data === null || data.data === '') {
                $ProductListontainer.data('pagenum', -1);
                HideSeeMore('.productList-seeMore');
            } else if (data.data.list === null || data.data.list === '' || data.data.list === undefined) {
                $ProductListontainer.data('pagenum', -1);
                HideSeeMore('.productList-seeMore');
            } else {
                // 遍历模板 插入页面

                appendProductList(data.data, Type);

                $ProductListontainer.data('pagenum', NextProductNum);

                if (data.data.list.length < Size) {
                    //HideSeeMore('.productList-seeMore');
                    $('.productList-seeMore .btn-seeMore').css('display', 'none');
                    $('.productList-seeMore').append('<span>No more items!</span>');
                    setTimeout(function () {
                        $('.productList-seeMore').hide();
                    }, 2000);
                } else {
                    $('.productList-seeMore .btn-seeMore').css('display', 'inline-block');
                    $('.productList-seeMore span').remove();
                }

                //点击埋点
                $('[data-clk]').unbind('click');
                $('[data-clk]').bind('click', function () {
                    var $this = $(this);

                    $('#productClick-name').val($this.data('title'));
                    $('#productClick-spu').val($this.data('spu'));
                    $('#productClick-price').val($this.data('price'));

                    if($('#gaProductClick').length>0){
                        onProductClick();
                    }

                    $.ajax({
                        url: $this.data('clk'),
                        type: "GET"
                    });
                    //    window.open($this.data('link'));

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
    function appendProductList(ProductsList, type) {
        var TplHtml = template('tpl-product', ProductsList);
        var StageCache = $.parseHTML(TplHtml);
        if (type === 1) {
            $('#productList-container').find('.row').append(StageCache);
        } else if (type === 2) {
            $('#productList-container').find('.row').html(StageCache);
        }
    }

    // 排序
    $('.dropdown-item').on('click', function () {
        var SearchId = $(this).data('search'),
            SearchName = $(this).data('searchtext');
        $('#searchDropdown').html(SearchName);
        $('.dropdown-item').removeClass('active');
        $(this).addClass('active');

        var CurrentSearch = $('#productList-container').data('searchid');
        if(SearchId != CurrentSearch){
            // 设置排序 方式
            $('#productList-container').data('searchid', SearchId);
            $('#productList-container').data('pagenum', 0);
            $('#productList-container').data('loading', 'false');
            getProductList(2);
        }
    });

    // Shopping List end

    // Daily List start

    //点击 查看更多商品
    $('.btn-seeMore-dailyList').on('click', function () {
        $('img.img-lazy').each(function () {
            var Src = $(this).attr('src'),
                Original = $(this).attr('data-original');
            if (Src === Original) {
                $(this).removeClass('img-lazy');
            }
        });
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
                $('[data-clk]').bind('click', function () {
                    var $this = $(this);
                    $.ajax({
                        url: $this.data('clk'),
                        type: "GET"
                    });
                    //    window.open($this.data('link'));
                })
                // end

                $('#daily-wookmark').imagesLoaded(function () {
                    //$('.isHidden').removeClass('isHidden');
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

                // 图片延迟加载
                $('img.img-lazy').lazyload({
                    threshold: 1000,
                    effect: 'fadeIn'
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
    } catch (e) {
    }

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
            url: '/order/orderlist',
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


        var orderList = eval($('#buyAgain').data('orderlist'));

        $.each(orderList, function (index, val) {
            var operateItem = {
                'sale_qtty': val.sale_qtty,
                'select': true,
                'sku': val.sku,
                'VAList': []
            };

            if (val.vas_info != null && val.vas_info != undefined) {
                var vas = [];
                $.each(val.vas_info, function (i, el) {
                    vas[i] = {};
                    vas[i].user_remark = el.user_remark;
                    vas[i].vas_id = el.vas_id;
                });
                operateItem.VAList = vas;
            }

            operate.push(operateItem);
        });
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
                    window.location.href = data.redirectUrl;
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
    } catch (e) {
    }

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
        SubstringText('.followText-Info', 140);
    } catch (e) {
    }

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

    //start 个人中心 Promotions

    try {
        if ($('#checkoutView').data('status') || $('#userpromotions').data('status')) {
            getCoupons(2);
        }
    } catch (e) {
    }

    //进入添加 Promotions Code页面
    $('.btn-addNewCode').on('click', function () {
        $('.showPromotionCode').addClass('disabled');
        $('.addPromotionCode').removeClass('disabled');
    });
    //返回 显示Promotions页面
    $('.goback-toAdd').on('click', function () {
        $('.showPromotionCode').removeClass('disabled');
        $('.addPromotionCode').addClass('disabled');
    });

    //加载Promotions Code列表
    //State 加载状态  1:添加加载  2:页面load 首次加载
    function getCoupons(State) {
        //判断 是个人中心 还是 checkout
        if ($('#checkoutView').data('status')) {
            var CouponUrl = '/coupon';
        } else if ($('#userpromotions').data('status')) {
            var CouponUrl = '/usercoupon';
        }
        $.ajax({
                url: CouponUrl,
                type: 'GET'
            })
            .done(function (data) {
                if (data.success) {
                    appendCouponList(data.data);
                    $('.checkoutPromotion-item').each(function () {
                        if ($(this).hasClass('codeItem') && $(this).data('bindid') == $('#pcode').data('bindid')) {
                            $('#codemessage').html($(this).data('promotioncode'));
                            $('.codeItem').removeClass('active');
                            $('[data-bindid=' + $('#pcode').data('bindid') + ']').addClass('active');
                        }
                    })
                    if (State === 2) {
                        if ($('.promotion-item').length > 0) {
                            $('.showPromotionCode').removeClass('disabled');
                            $('.addPromotionCode').addClass('disabled');
                        } else {
                            $('.showPromotionCode').addClass('disabled');
                            $('.addPromotionCode').removeClass('disabled');
                        }
                    }
                } else {

                }
            })

    }

    //遍历模板, 插入coupon数据到指定位置
    function appendCouponList(couponList) {
        var TplHtml = template('tpl-coupon', couponList);
        var StageCache = $.parseHTML(TplHtml);
        $('.coupon-list').html(StageCache);
    }

    //Add New Promotions
    $('.coupon-apply').on('click', function () {
        //验证code码
        if (!$(this).hasClass('disabled')) {
            $.ajax({
                    url: '/coupon',
                    type: 'post',
                    data: {cps: $('input[name="cps"]').val()}
                })
                .done(function (data) {
                    if (data.success) {
                        $('#pcode').data('bindid', data.data.bind_id);
                        getCoupons(1);
                        if ($('#checkoutView').data('status')) {
                            getCheckoutInfo();
                        }
                        $('.addCode-input .warning-info').addClass('off');
                        $('.showPromotionCode').removeClass('disabled');
                        $('.addPromotionCode').addClass('disabled');
                    } else {
                        $('.invalidText').html(data.prompt_msg);
                        $('.addCode-input .warning-info').removeClass('off');
                    }
                })
        }
    });
    $('input[name="cps"]').on('keyup', function (e) {
        if ($(this).val() === '') {
            $('.coupon-apply').addClass('disabled');
        } else {
            $('.coupon-apply').removeClass('disabled');
        }
    });
    // 粘贴内容 触发事件
    $('input[name="cps"]').on('paste', function (e) {
        var pastedText = undefined;
        if (window.clipboardData && window.clipboardData.getData) {
            pastedText = window.clipboardData.getData('Text');
        } else {
            pastedText = e.originalEvent.clipboardData.getData('Text');
        }

        if (pastedText === '' || pastedText === undefined) {
            $('.coupon-apply').addClass('disabled');
        } else {
            $('.coupon-apply').removeClass('disabled');
        }
    });


    // checkou promotion
    $('.coupon-list').on('click', '.codeItem', function () {
        $('.codeItem').removeClass('active');
        var $this = $(this);
        $.ajax({
            url: '/wordpay/selCode/' + $(this).data('bindid'),
            type: 'post'
        })
            .done(function (data) {
                if (!$this.hasClass('active')) {
                    $('#codemessage').html($this.data('promotioncode'));
                    $('#pcode').data('bindid', $this.data('bindid'));
                    $this.addClass('active');
                    getCheckoutInfo();
                }
            });

    });

    //end 个人中心 Promotions

    //start 设计师详情 预售
    //获取 banner图片宽高
    var $designerBanImg = $('.designer-banImg');
    $designerBanImg.each(function (index) {
        $(this).on("load", function () {
            var banW = $(this).width();
            var banH = $(this).height();
            if (banW > banH) {
                $(this).css('width', '100%');
            } else {
                $(this).css({
                    width: '50%',
                    margin: '0 auto'
                });
            }
        });
    });

    //end 设计师详情 预售


    //Ask Start
    function ask_addMessage() {
        $.ajax({
                url: '/askshopping',
                type: 'POST',
                data: $('#form-askQuestion').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                }
            })
    }

    $('#askSend').on('click', function () {
        ask_addMessage();
    });
    //Ask End


    // invite Friends begin
    $('#btn-inviteFriend').on('click', function () {
        ShareModal.open();
    });

    // invite Friends end

    // 回到顶部
    $(window).scroll(function () {
        var Top = $(window).scrollTop();
        if (Top > 300) {
            $('#top').addClass('active');
        } else {
            $('#top').removeClass('active');
        }
    });
    $('#top').on('click', function () {
        $("html, body").animate({
            "scroll-top": 0
        }, "fast");
    });

    //邮件订阅
    $('.redeem-fixed').on('click', function () {
        redeemModal.open();
    });
    // 校验 email
    $('.subscribe-email').on('keyup blur', function () {
        if (login_validationEmail($(this))) {
            $('.redeem-enter').removeClass('disabled');
        } else {
            $('.redeem-enter').addClass('disabled');
        }
    });
    $('.redeem-enter').on('click', function () {
        if ($(this).hasClass('disabled')) {
            return;
        }
        $.ajax({
                url: '/subscribe',
                type: 'post',
                data: $('#subscribe').serialize()
            })
            .done(function (data) {
                if (data.success) {
                    $('.redeem-leftWrapper').addClass('hidden');
                    $('.redeem-rightWrapper').removeClass('hidden');
                } else {

                }
            });
    });
})(jQuery, Swiper);


//public start
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
//public end

// 瀑布流
if ($('#dailyIndex').data('show')) {
    $(function () {
        try {
            $('#daily-wookmark').imagesLoaded(function () {
                $('.daily-loading').hide();
                $('.dailyList-seeMore').show();

                //$('.isHidden').removeClass('isHidden');

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
    var MediaScaleDesigner = 9 / 16;
    var WidthDesigner = $('.player-media').width(),
        MediaHeightDesigner = WidthDesigner * MediaScaleDesigner;

    var PlayId=$(this).data('playid');
    player = new YT.Player('ytplayer', {
        height: MediaHeightDesigner,
        width: WidthDesigner,
        videoId: PlayId,
        playerVars: {'autoplay': 1, 'controls': 2, 'showinfo': 0, 'playsinline': 1, 'rel': 0},
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });

    $('#playermodalDialog').css('background-color','rgba(0, 0, 0, 0)');
});


function startPlayer($this) {
    var PlayId = $this.siblings('.ytplayer').data('playid');
    player = new YT.Player(PlayId, {
        height: MediaHeight,
        width: Width,
        videoId: PlayId,
        playerVars: {'autoplay': 1, 'controls': 2, 'showinfo': 0, 'playsinline': 1, 'rel': 0},
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
                $Player.children('.btn-morePlayer').attr('hidden', 'hidden');
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