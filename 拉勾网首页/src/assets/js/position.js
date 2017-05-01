/**
 * Created by Administrator on 2017/4/29 0029.
 */
function  getClient() {
    if(window.innerWidth!==undefined){
        return {
            width:window.innerWidth,            //IE9+,FireFox,safari,Opera,Chrome
            height:window.innerHeight
        }
    }
    else if(document.compatMode==="CSS1Compat") {    //IE8之前
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else {
        return{                                     //IE6
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}

var center=function(width,height){
    var clientWidth=getClient().width;
    var clientHeight=getClient().height;
    var top=(clientHeight-height)/2+window.pageYOffset;   //window.pageYOffset   document.documentElement.scrollTop
    var left=(clientWidth-width)/2+window.pageXOffset;     //window.pageXOffset
    top=top<0?0:top;
    left=left<0?0:left;
    return{
        top:top,
        left:left
    }
};
//
// var size=function () {
//     var _this=this;
//     window.addEventListener("resize",function () {
//
//     });
//     $(window).resize(function () {
//         var current_left= parseInt($(_this).css("left"));
//         var current_top=parseInt($(_this).css("top"));
//         var width=parseInt($(_this).css("width"));
//         var height=parseInt($(_this).css("height"));
//         if(current_left+width>getClient().width+$(document).scrollLeft()){
//             $(_this).css("left",getClient().width-width+"px");
//         }
//         if(current_top+height>getClient().height+$(document).scrollTop()){
//             $(_this).css("top",getClient().height-height+"px");
//         }
//     })
// };

export default center
