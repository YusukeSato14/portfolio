const $loading = $('.loading');
const $wrap = $('#wrap');
const $left = $('.left');
const $right = $('.right');
const $btn = $('.btn');
const $doors = $('.doors');
const $rightColumn = $('#rightColumn');
const $commonBtn = $('.commonBtn');

$(window).on("load", function () {
  $('#skip').on('click', function() {
    const items = '#wrap, .char, header, #leftColumn, .left, .right, #rightColumn,.btn, .textBound1, .textBound2, .textBound3, .textBound4, .textBound5, .textBound6, .textBound7';
    $(items).css('animation', 'none');
    $(items).css('-webkit-animation', 'none');
    $('h1').append('<style>h1::after{animation: none}</style>');
    $left.append('<style>.left::before{animation: none;}</style>');
    $left.append('<style>.left::after{animation: none;}</style>');
    $right.append('<style>.right::before{animation: none;}</style>');
    $right.append('<style>.right::after{animation: none;}</style>');
    $left.append('<style>.left{border-left: solid 3px #000;}</style>');
    $left.append('<style>.left{border-right: solid 2px #000;}</style>');
    $right.append('<style>.right{border-right: solid 3px #000;}</style>');
    $right.append('<style>.right{border-left: solid 2px #000;}</style>');
    $rightColumn.append('<style>#rightColumn::before{animation: none}</style>');
    $btn.append('<style>.btn::after{animation: none}</style>');
    $btn.append('<style>.btn::before{animation: none}</style>');
    $type_textBound.append('<style>.type-textBound::after{animation: none}</style>');
    $type_textBound.append('<style>.type-textBound::before{animation: none}</style>');
    setTimeout(function() {
      $loading.css('display', 'none');
    }, 100);
    setTimeout(function() {
      $wrap.css('display', 'block');
      $('body').css('background', '#222');
    }, 300);
  });

  // 消えるタイミングはお好みで
  $loading.delay(1420).fadeOut(850);
});

// 10秒待っても読み込みが終わらない時は強制的にローディング画面をフェードアウト
function stopLoad(){
  $loading.fadeOut(1);
}
setTimeout('stopLoad()',10000);

$(window).on("load", function() {
  $wrap.delay(3500).fadeIn("slow");
});

// スクロールを無効にする
$('main').on('touchmove.noScroll', function(e) {
  e.preventDefault();
});


const $type_textBound = $('.type-textBound')
$(function() {
  // スクロールにかかる時間
  const time = 100;

  // ページ内リンクのみを取得
  $commonBtn.on('click', function() {
    // // 移動先となる要素を取得
    const target = $(this.hash);
    const openClose = $(this).attr('class');
    const $main = $('main');
    const hash = this.hash;
    //topからの距離
    const position = $main.scrollTop();


    const form = $('input, textarea');


    $btn.css('pointer-events', 'none');

    console.log(openClose);

    if (!target.length) {
      if(openClose.match(/close/)) {
        $doors.css('z-index', 3);
        $btn.removeClass('on').addClass('off');
        $left.animate({'marginLeft':'0px'}, 500);
        $right.animate({'marginRight':'0px'}, 500);
        setTimeout(function() {
          $btn.css('pointer-events', '');
        }, 1500);
      }else if(openClose.match(/open/)) {
        $btn.removeClass('off').addClass('on');
        $left.animate({'marginLeft': '-100%'}, 100);
        $right.animate({'marginRight': '-100%'}, 100);
        setTimeout(function() {
          $doors.css('z-index', 1);
          $btn.css('pointer-events', '');
        }, 500);
      }
    }else {
      // ハッシュ書き換えとく
      window.history.pushState(null, null, this.hash);

      // 移動先となる値
      const targetY = target.position().top + position;

      if(hash === '#contact') {
        $(form).attr('tabindex', 0);
      }else {
        $(form).attr('tabindex', -1);
      }

      if($btn.hasClass('off')) {
        $btn.removeClass('off').addClass('on');
        $('#content').animate({scrollTop: targetY}, time);
        setTimeout(function () {
          $left.animate({'marginLeft': '-100%'}, 100);
          $right.animate({'marginRight': '-100%'}, 100);
          // スクロールアニメーション
          setTimeout(function () {
            $doors.css('z-index', 1);
            $btn.css('pointer-events', '');
          }, 700);
        }, 500);
      }else if($btn.hasClass('on')) {
        $doors.css('z-index', 3);
        $left.animate({'marginLeft': '0px'}, 500);
        $right.animate({'marginRight': '0px'}, 500);
        setTimeout(function () {
          // スクロールアニメーション
          $main.animate({scrollTop: targetY}, time);
        }, 2000);
        setTimeout(function () {
          $left.animate({'marginLeft': '-100%'}, 100);
          $right.animate({'marginRight': '-100%'}, 100);
        }, 2200);
        setTimeout(function () {
          $doors.css('z-index', 1);
          $btn.css('pointer-events', '');
        }, 2800);
      }

      // デフォルトの処理はキャンセル
      return false;

    }
  });
  $('#content').fullpage(
  );
});
