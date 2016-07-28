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
