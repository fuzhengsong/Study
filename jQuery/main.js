/**
 * Created by Administrator on 2017/3/26 0026.
 */
require(['jquery','jquery.slide'],function ($, slide) {
        $.fn.slideShow=slide.slideShow;
        $(".slidePic.slide1").slideShow({
            autoplay:true,
            Ttype:"mouseover"
        });
        $(".slidePic.slide2").slideShow();
});