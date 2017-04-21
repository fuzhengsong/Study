/**
 * Created by Administrator on 2017/3/26 0026.
 */
//轮播器
    $.fn.slideShow = function (obj) {  //$.fn定义jquery的原型方法
        //为集合中的每个对象都执行
        var auto=obj.auto?obj.auto:3000;        //设置自动播放时间间隔 默认3s
        var time=obj.time?obj.time:500;       //设置动画持续时间，默认500ms
        console.log(auto);
        $(this).each(function () {
            me = $(this);
            var nav = me.find("span");
            var ul = me.find("ul");
            var width = me.find("ul img").eq(0).width();
            var timer = null;
            var count_img=me.find("ul img").length;
            var count = 0;
            //移入则清除计时器，移动到指定的图片
            nav.on("click",function () {
                clearInterval(timer);
                ind = $(this).index();
                $(this).animate({opacity: 0.8});
                ul.animate({left: -width * count},time);
            });

            //从图片中移出时，自动滚屏
            var handleoutt = function () {
                timer = setInterval(function () {
                    count++;
                    if (count > count_img-1) {
                        count = 0;
                    }
                    ul.animate({left: -width * count});
                }, auto)
            };

//        鼠标移入移除图片的事件
            ul.hover(function () {
                clearInterval(timer);
            }, handleoutt);
            handleoutt();

        })
    };
