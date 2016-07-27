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
  } catch (e) {}
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
  } catch (e) {}

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
  } catch (e) {}

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
})(jQuery, Swiper);
//# sourceMappingURL=common.js.map
