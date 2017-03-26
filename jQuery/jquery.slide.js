/**
 * Created by Administrator on 2017/3/26 0026.
 */
define(['jquery'],function ($) {


    var slideShow=function (qot) {
        var defaults={
            autoplay:true,
            Ttype:"click"
        };
        $.extend(defaults,qot);

        $(this).each(function () {
            me = $(this);
            var nav = me.find("span");
            var ul = me.find("ul");
            var width = me.find("ul img").eq(0).width();
            var timer = null;
            var ind = 0;
            //移入则清除计时器，移动到指定的图片
            nav.on(defaults.Ttype,function () {
                clearInterval(timer);
                ind = $(this).index();
                ul.animate({left: -width * ind - 40});
            });

//       该效果写入css中
            /*        var handleout = function () {
             $(this).animate({opacity: 0.5});
             };*/

            //从图片中移出时，自动滚屏

            var handleoutt = function () {
                timer = setInterval(function () {
                    ind++;
                    if (ind > 3) {
                        ind = 0;
                    }
                    ul.animate({left: -width * ind - 40});
                }, 2000)
            };

            if(defaults.autoplay) {
                handleoutt();
            }
//        鼠标移入移除图片的事件
            ul.hover(function () {
                clearInterval(timer);
            }, handleoutt);

        })
    };
    return{
        slideShow:slideShow
    }
});