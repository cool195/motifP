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
    $('.btn-itemProperty').on('click', function () {
        var ItemType = $(this).data('type');
        if (ItemType !== '') {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $('.btn-itemProperty[data-type=' + ItemType + ']').removeClass('active');
                $(this).addClass('active');
            }
        }
    });

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
