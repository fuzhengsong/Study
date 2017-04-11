/**
 * Created by Administrator on 2017/4/5 0005.
 */

//跨浏览器获取视口大小

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

//计算窗体视口居中位置的方法

$.fn.center=function(width,height){
    var clientWidth=getClient().width;
    var clientHeight=getClient().height;
    var top=(clientHeight-height)/2+$(document).scrollTop();   //window.pageYOffset   document.documentElement.scrollTop
    var left=(clientWidth-width)/2+$(document).scrollLeft()      //window.pageXOffset
    $(this).css({
        "top":top,
        "left":left
    });
    return this;
};

//添加一个拖动的方法：
//@param {[selector]} 传入拖动框内点击可以拖动的区域
    $.fn.drag=function (that) {
    //__this指向外部的父元素
        var __this=this;
        $(that).mousedown(function (event) {
            //_this指向内部元素
            var _this=this;
            var e=event||window.event;
            //获取窗口当前位置的left和top值
            var current_left= parseInt($(__this).css("left"));
            var current_top=parseInt($(__this).css("top"));
            // 获取鼠标点击的位置
            var X=e.pageX;
            var Y=e.pageY;
            //点击位置在窗口中的偏移
            var offset_x=X-current_left;
            var offset_y=Y-current_top;
            var width=parseInt($(__this).css("width"));
            var height=parseInt($(__this).css("height"));
                var move=function (event) {
                    var e=event||window.event;
                    $(__this).css({
                        "left":e.pageX-offset_x+"px",
                        "top":e.pageY-offset_y+"px"
                    });
                    // console.log($(__this).css("top"));
                    //调整窗口的位置
                   if(e.pageX-offset_x+width>getClient().width+$(document).scrollLeft()){
                       $(__this).css("left",getClient().width-width+$(document).scrollLeft()+"px");
                   }
                   if(e.pageY-offset_y+height>getClient().height+$(document).scrollTop()){
                       $(__this).css("top",getClient().height-height+$(document).scrollTop()+"px");
                   }
                   if(e.pageY-offset_y<$(document).scrollTop()){
                       $(__this).css("top",$(document).scrollTop());
                   }
                   if(e.pageX-offset_x<$(document).scrollLeft()){
                        $(__this).css("left",$(document).scrollLeft());
                    }

                };
                $(_this).on("mousemove",move);
                $(_this).on("mouseup",function () {
                    $(_this).off("mousemove",move)
                });
            // }
        });

        return this;
    };

//窗口大小变化时，调整窗口位置

    $.fn.size=function () {
        var _this=this;
        $(window).resize(function () {
            var current_left= parseInt($(_this).css("left"));
            var current_top=parseInt($(_this).css("top"));
            var width=parseInt($(_this).css("width"));
            var height=parseInt($(_this).css("height"));
            if(current_left+width>getClient().width+$(document).scrollLeft()){
                $(_this).css("left",getClient().width-width+"px");
            }
            if(current_top+height>getClient().height+$(document).scrollTop()){
                $(_this).css("top",getClient().height-height+"px");
            }
        })
    };


//轮播器
$.fn.slideShow = function () {  //$.fn定义jquery的原型方法
    //为集合中的每个对象都执行
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
            count = $(this).index();
            // $(this).animate({opacity: 0.8});
            ul.animate({left: -width * count});
        });

//       该效果写入css中
        /*        var handleout = function () {
         $(this).animate({opacity: 0.5});
         };*/

        //从图片中移出时，自动滚屏
        var handleoutt = function () {
            timer = setInterval(function () {
                count++;
                if (count > count_img-1) {
                    count = 0;
                }
                ul.animate({left: -width * count});
            }, 2000)
        };

//        鼠标移入移除图片的事件
        ul.hover(function () {
            clearInterval(timer);
        }, handleoutt);
        handleoutt();

    })
};

//滚动条锁定
function scrollLock() {
    $(document).scrollTop(scrollLock.top);
    $(document).scrollLeft(scrollLock.left);
}
//屏幕遮罩的打开和调整
function screen_on() {
    var screen=$(".screen");
    screen.show().animate({
        opacity:0.5
    },300).css({
        "width":getClient().width+$(document).scrollLeft(),
        "height":getClient().height+$(document).scrollTop()
    });
//锁定滚动条
     $("body").css("overflow","hidden");
    // scrollLock.top=$(document).scrollTop();
    // scrollLock.left=$(document).scrollLeft();
    // $(window).on("scroll",function () {
    //
    // });

    $(window).resize(function () {
        if(getClient().width<1200){
            screen.css({
                "width":1200+"px",
                "height":getClient().height+$(document).scrollTop()
            });
        }else{
        screen.css({
            "width":getClient().width+$(document).scrollLeft(),
            "height":getClient().height+$(document).scrollTop()
        });
        }
    })
}
//屏幕遮罩的关闭
function screen_off() {
    $(".screen").animate({
        opacity:0
    },300,function () {
        $(this).hide();
    });
    $("body").css("overflow","visible");
    // $(window).off("scroll",scrollLock);
}
//点击登录打开登录窗

$("#login").click(function () {
    //登录窗口的大小为300 250
   $("#login_box").center(300,250).slideDown(300);
    screen_on()
});

//点击关闭登录窗口

$("#login_box ").find(".login_header a img").click(function () {
    $("#login_box").hide();
    screen_off();

});

//为窗口添加一个拖动事件
var login_box=$("#login_box");
login_box.drag(".login_header").size();

//个人中心下拉菜单

var header_ul = $("#header").find("ul");
$("#person_center").hover(function () {
    header_ul.clearQueue();
    header_ul.animate({
        opacity:1
    },300,function () {
        header_ul.show();
    })
},function () {
    header_ul.animate({
        opacity:0
    },300,function () {
        header_ul.hide();

    })
});

//注册框点击打开

$("#register").click(function () {

    $("#reg").center(600,550).slideDown(300);
    screen_on();
});

//关闭注册框
var reg=$("#reg");
reg.find("#reg_header a img").click(function () {
    $("#reg").hide();
    screen_off();
    document.getElementById("reg_form").reset();
    $("#reg").find("span").filter(function () {
        return ($(this).hasClass("info")||$(this).hasClass("error")||$(this).hasClass("success"))
    }).hide();
});

//拖动注册框
reg.drag("#reg_header").size();


//注册表单的验证

//表单获取焦点时，显示提示信息
var reg_body=$("#reg_body");
function Focus(type) {
    reg_body.find("span.success_"+type).hide();
    reg_body.find("span.error_"+type).hide();
    reg_body.find("span.info_"+type).show();
}
//没有信息，表单失去焦点
function Blur(type) {
    reg_body.find("span.success_"+type).hide();
    reg_body.find("span.error_"+type).hide();
    reg_body.find("span.info_"+type).hide();
}
//填入信息错误
function error(type) {
    reg_body.find("span.error_"+type).show();
    reg_body.find("span.info_"+type).hide();
}
//填入信息正确
function success(type) {
    reg_body.find("span.success_"+type).show();
    reg_body.find("span.info_"+type).hide();
}

//用户名验证
var reg_form=document.getElementById("reg_form");
var username= reg_form.elements["user_name"];
var flag_user=true;
$(username).focus(function () {
    reg_body.find("span.has_user").hide();
    Focus('user');
})
    .blur(function () {
        var val=$(username).val().trim();
        if(val===''){
            Blur('user');
            flag_user=false;
        }
        else if(/[^(\da-zA-Z_)]/.test(val)||val.length<2||val.length>20){
            error('user');
            flag_user=false;
        }else{
            reg_body.find("span.info_user").css("display","none");
            reg_body.find("span.user_loading").css("display","block");
            setTimeout(function () {
                $.ajax({
                    type:'post',
                    url:'is_user.php',
                    data:$(username).serialize(),
                    success:function (data) {
                        if(data==="1"){
                            reg_body.find("span.user_loading").hide();
                            reg_body.find("span.has_user").show();
                            flag_user=false;
                        }else{
                            reg_body.find("span.user_loading").hide();
                            reg_body.find("span.success_user").show();
                            flag_user=true;
                        }
                    },
                    error:function (xhr){
                        flag_user=false;
                    },
                    async:false
                });
            },30)



        }
    });


//密码验证

//密码验证
var userPassword=$(reg_form.elements["passWord"]);
var flag_pas=true;
//获得焦点 显示提示消息
userPassword.focus(function () {
    Focus('pass');
})
    .blur(function () {
        var val=userPassword.val();

        //失去焦点，如果没有内容则不提示
        if(val.trim()===''){
            Blur('pass');
            flag_pas=false;
        }

        //如果不为字母数字或者长度不正确，提示错误
        else if(/[^(\da-zA-Z)]/.test(val)||val.length<6||val.length>20){
            error('pass');
            flag_pas=false;
            //如果正确 显示安全级别
        }else{
            var success=reg_body.find("span.info_pass a:first-child").html();
            reg_body.find("span.success_pass").show().html(success);
            reg_body.find("span.info_pass").hide();
            flag_pas=true;
        }
    });

//密码强度验证
userPassword.keyup(function () {
    var val=userPassword.val();
    var testCount=0;

    //密码长度验证
    if(val.length<=20&&val.length>=6){
        reg_body.find("span.info_pass .p1").html("●").css("color","green");
    }else{
        reg_body.find("span.info_pass .p1").html("○").css("color","#ccc");
    }

    //密码字符验证
    if(/[^(\da-zA-Z)]/.test(val)||val.length===0){
        reg_body.find("span.info_pass .p2").html("○").css("color","#ccc");
    }else{
        reg_body.find("span.info_pass .p2").html("●").css("color","green");
    }

    //密码字符种类验证
    if(/\d/.test(val)){
        testCount++;
    }
    if(/[a-z]/.test(val)){
        testCount++;
    }
    if(/[A-Z]/.test(val)){
        testCount++;
    }
    if(testCount>=2){
        reg_body.find("span.info_pass .p3").html("●").css("color","green");
    }else{
        reg_body.find("span.info_pass .p3").html("○").css("color","#ccc");
    }

    //安全级别
    /*高：字符长度大于10，且字符种类大于3种
     * 中：字符长度大于8，且字符种类大于2种
     * 低：字符长度大于1位*/

    if(val.length>=10&&testCount>=3){
        reg_body.find("span.info_pass .s").css("color","green");
        reg_body.find("span.info_pass .s4").html(" 高");
    }else if(val.length>=8&&testCount>=2){
        reg_body.find("span.info_pass .s1").css("color","#f60");
        reg_body.find("span.info_pass .s2").css("color","#f60");
        reg_body.find("span.info_pass .s3").css("color","#ccc");
        reg_body.find("span.info_pass .s4").html(" 中").css("color","#f60");
    }else if(val.length>=1){
        reg_body.find("span.info_pass .s1").css("color","maroon");
        reg_body.find("span.info_pass .s2").css("color","#ccc");
        reg_body.find("span.info_pass .s3").css("color","#ccc");
        reg_body.find("span.info_pass .s4").html(" 低").css("color","maroon");
    }else{
        reg_body.find("span.info_pass .s").css("color","#ccc");
        reg_body.find("span.info_pass .s4").html("");
    }
});

//重复密码验证
var flag_pasA=true;
var userPasswordA=reg_form.elements["passAgain"];
$(userPasswordA).focus(function () {
    Focus('passAgain');
})
    .blur(function () {
        var val=$(userPasswordA).val();
        if(val.trim()===''){
            Blur('passAgain');
            flag_pasA=false;
        }
        else if(val.trim()===userPassword.val().trim()){
            success('passAgain');
            flag_pasA=true;
        }else{
            error('passAgain');
            flag_pasA=false;
        }

    });



//回答
var flag_answer=true;
var answer=reg_form.elements["answer"];
$(answer).focus(function () {
    Focus('answer')
}).blur(function () {
    var val=$(answer).val();
    if(val.trim()===''){
        Blur('answer');
        flag_answer=false;
    }else{
        success('answer');
        flag_answer=true;
    }
});


//验证电子邮件
var dropdownmenu=$(".dropdown-menu");
var email=reg_form.elements["email"];
var flag_email=true;
$(email).focus(function () {
    Focus("email");
    //获得焦点时，如果为空则隐藏菜单
    if($(email).val().trim()===''){
        dropdownmenu.hide()
    }
    //如果存在@符号，则隐藏菜单，没有则显示
    else if($(email).val().indexOf('@')===-1){
        dropdownmenu.show()
    }
    $(".dropdown-menu li").css("backgroundColor",'white');
}).blur(function () {
    var val=$(email).val();
    if(val.trim()===''){
        Blur('email');
        flag_email=false;
    }else if(/^[0-9a-zA-Z-_]+[\.0-9a-zA-Z-_]*@[0-9a-zA-Z-_]+(\.[a-zA-Z-_]{2,4}){1,3}$/.test(val)){
        success('email');
        flag_email=true;
    }else{
        error('email');
        flag_email=false;
    }
    //失去焦点，隐藏菜单
    dropdownmenu.hide();
    this.i=undefined;
}).keyup(function (event) {

    //键入时，弹出菜单
    dropdownmenu.show();
    var val=$(email).val();

    //如果有@符号，则隐藏菜单
    if(val.indexOf('@')===-1) {
        $(".dropdown-menu li span").html(val);
    }else{
        dropdownmenu.hide();
    }
    //如果为空，隐藏菜单
    if(val.trim()===''){
        dropdownmenu.hide();
    }
    var li=$(".dropdown-menu li");
    li.css("backgroundColor",'white');
    //按下向下键
    if(event.keyCode===40){
        //没有定义或者大于等于最后一个索引值时，选中第一个
        if(this.i===undefined||this.i>=li.length-1){     //this.i记录当前选择li的索引值
            this.i=0;
        }else{
            this.i++
        }
        li.eq(this.i).css("backgroundColor",'#A9A9A9');
    }

    //按下向上键
    if(event.keyCode===38){
        //没有定义或者等于第一个索引值时，选中最后一个
        if(this.i===undefined||this.i===0){
            this.i=li.length-1;
        }else{
            this.i--
        }
        li.eq(this.i).css("backgroundColor",'#A9A9A9');
    }

    //按下确定键
    if(event.keyCode===13){
        $(email).val(li.eq(this.i).text());
        dropdownmenu.hide();         //下拉菜单消失
        this.i=undefined;                           //this.i重置为undefined
    }

});
$(".dropdown-menu li").mouseover(function (e) {
    $(".dropdown-menu li").css("backgroundColor",'white');
    if(e.target.tagName.toLowerCase()==="li"){
    $(e.target).css("backgroundColor",'#A9A9A9');
    }else{
        $(e.target).parent("li").css("backgroundColor",'#A9A9A9');
    }
});


//获取补全元素
dropdownmenu.mousedown(function (e) {
    $(email).val($(e.target).text());
});

//年月日

//添加日期数

function addNumber(num) {
    var message="<option>---</option>";
    for(var i=1;i<=num;i++){
        if(i<10){
            message+='<option value="0'+i +'">0'+ i+'</option>';
        }
        else{
            message+='<option value="'+i+'">'+ i+'</option>';
        }
    }
    return message;
}
var year=$(reg_form.elements["year"]);
var month=$(reg_form.elements["month"]);
var day=$(reg_form.elements["day"]);
for(var i=1950;i<=2017;i++){
    year.append('<option value="'+i +'">'+ i+'</option>');
}
for(var m=1;m<=12;m++){
    month.html(addNumber(12));
}
var flag_birthday=false;
//判断对应年月有几天天数
function  addDay() {
    var val = month.val();
    var arr1 = ['01', '03', '05', '07', '08', '10', '12'];
    var arr2 = ['04', '06', '09', '11'];

    //判断大小月
    if (arr1.indexOf(val) !== -1) {
        day.html(addNumber(31));
    } else if (arr2.indexOf(val) !== -1) {
        day.html(addNumber(30));
    } else if (year.val() ==='---') {
        alert("请先选择年份！")

    //是否是闰年
    } else if (year.val() % 400 === 0 || (year.val() % 4 === 0 && year.val() % 100 !== 0)) {
        day.html(addNumber(29));
    } else {
        day.html(addNumber(28));
    }
    //如果日期存在，则隐藏错误提示（提交后会有错误提示）
    flag_birthday=(year.val()!=='---'&&month.val()!=='---'&&day.val()!=='---');
    if(flag_birthday){
        reg_body.find("span.error_birthday").hide();
    }

}

//选择年月时 对应改变日期
year.on("change",addDay);
month.on("change",addDay);
day.on("change",function () {
    flag_birthday=(year.val()!=='---'&&month.val()!=='---'&&day.val()!=='---');
    if(flag_birthday){
        reg_body.find("span.error_birthday").hide();
    }
});



//备注功能

//点击清尾，删除多余字数

var p=$("#ps").find("p");
var textarea=$(".ps");
p.on("click",".clear",function () {
    textarea.val(textarea.val().substring(0,200));
    p.html('还能输入<strong>0</strong>个字');
    flag_ps=true;
    $(".form-group span.error_ps").css("display","none");
});

//检查输入域内的文本字数
var flag_ps=true;
function  checkPs() {
    var length=textarea.val().length;
    if(length<=200){
        p.html('还可以输入<strong>'+(200-length)+'</strong>个字');
        flag_ps=true;
        reg_body.find("span.error_ps").hide();
    }else{
        p.html('已经超过<strong>'+ (length-200 )+'</strong>个字'+'  <span class="clear" style="font-weight: bold">清尾</span>');
        flag_ps=false;
    }
}

textarea.keyup(function () {
    checkPs()
}).on("paste",function () {
    //粘贴事件会在粘贴之前触发,设置延时验证
    setTimeout(function () {
        checkPs()
    },50)

});

//阻止事件对象

function preDefault(e) {
    var event=e||window.event;
    if(typeof event.preventDefault!=="undefined"){       //W3C
        event.preventDefault();
    }
    else{                             //IE
        event.returnValue=false;
    }
}

//提交

$("#submit").on("click",function (e) {
    var reg_form=$("#reg_form");
    reg_form.find("input").trigger('blur');
    if (!flag_user) {
        error('user')
    }
    if (!flag_pas) {
        error('pass')
    }
    if (!flag_pasA) {
        error('passAgain')
    }
    if (!flag_answer) {
        error('answer')
    }
    if (!flag_email) {
        error('email')
    }
    if(!flag_birthday){
        error('birthday')
    }
    if(!flag_ps){
        error('ps');
    }
    if(flag_user&&flag_pas&&flag_pasA&&flag_answer&&flag_email&&flag_birthday&&flag_ps){
        // reg_form.submit();
        $("#submit").attr("disabled",true).css({
            "backgroundPosition":"right"
        });
     $("#reg_loading").center(200,40).show().find("p").text("正在注册");
        setTimeout(function(){
            $.ajax({
                type: "POST",
                url: "add.php",
                data: reg_form.serialize(),

                success: function (text) {
                    if (text ==="1") {
                        $("#reg_loading").hide();
                        $("#reg_success").center(200, 40).show().find("p").text("注册成功！");
                        setCookie("user",reg_form.find("[name='user_name']").val());
                        setTimeout(function () {
                            $("#reg_success").hide();
                            $("#reg").hide();
                            screen_off();
                            reg_body.find("span.success").hide();
                            document.getElementById("reg_form").reset();
                            $("#submit").attr("disabled", false).css({
                                "backgroundPosition": "left"
                            });
                            $("#header").find('.mes').css("display","none");
                            var user_name=getCookie('user');
                            $("#header").find('#mes').html("<span>您好！"+user_name+'</span>').css({
                                "display":"block",
                                "color":"DarkGoldenRod"
                            });
                        }, 1500)
                    }
                },
                error:function (xhr) {
                    if(xhr.status===404){
                        $("#reg_loading").hide();
                        $("#reg_fail").center(200, 40).show().find("p").text("注册失败！");
                            setTimeout(function () {
                                $("#reg_fail").hide();
                                $("#submit").attr("disabled", false).css({
                                    "backgroundPosition": "left"
                                });
                            }, 1500)
                    }
                },
                async: true
            });
        },40)


    }else{
        preDefault(e)
    }
});


//导航
$("nav").find("li").mouseenter(function () {
    var _this=this;
    var index=$(this).index();
    var arr=[20,105,190,275,360];
    $(".move").animate({
        left:arr[index]+"px"
    },150,function () {
        $("nav li a").css("color","#000");
        $(_this).find("a").css("color","#fff");
    })
});
$("nav").mouseleave(function () {
    $(".move").animate({
        left:"20px"
    },150,function () {
        $("nav li a").css("color","#000");
        $("nav li:first a").css("color","#fff");
    })
});

//轮播器
$(".banner").slideShow();

//图片的延时加载
var picture_list1=$("#picture_list1");
picture_list1.find("dl dt img").css("opacity",0);
function wait_load() {
    //视口底部在文档中的垂直偏移
    var top=getClient().height+window.pageYOffset;

    $("#picture_list1").find("dl dt img").each(function () {
        //获取元素相对文档的偏移
        var rect_top=this.getBoundingClientRect().top+$(document).scrollTop();
        if(top>rect_top){
            $(this).attr("src",$(this).attr("xsrc")).animate({
                opacity:1
            },1000)
        }
    })
}
//文档滚动事件，滚动到图片时加载
$(document).scroll(function () {
    wait_load();
});

//窗口大小变化时同样需要进行判断
$(window).resize(function () {
   wait_load()
});



var picture_list1_big=$("#picture_list1_big");
var img_length=picture_list1.find("dl dt img").length;
//获取当前查看图片的左右2张图片的src并且预加载
function  toggle_picture(index) {
    //获取前后一张图片的大图src，预加载图片
    //实例化2个图片元素，这样赋值了src才会加载图片
    var prev_img=new Image();
    var next_img=new Image();
    prev_img.src=picture_list1.find("dl").eq(index-1).find("img").attr("src_big");
    next_img.src=picture_list1.find("dl").eq(index+1).find("img").attr("src_big");
    var index_prev=index-1;
    var index_next=index+1;
    //如果为第一张图片，则获得图片列表中的最后一张
    if(index===0){
        prev_img.src=picture_list1.find("dl").eq(img_length-1).find("img").attr("src_big");
        index_prev=img_length-1;
    }
    if(index===img_length-1){
        next_img.src=picture_list1.find("dl").eq(0).find("img").attr("src_big");
        index_next=0;
    }

    //把前后2张图片的src分别赋给lt和gt

    picture_list1_big.find(".lt").attr({
        "src":prev_img.src,
        "index":index_prev
    });
    picture_list1_big.find(".gt").attr({
        "src":next_img.src,
        "index":index_next
    });
}

//图片查看大图

picture_list1.find("dl dt img").click(function () {
    picture_list1_big.center(620,511).slideDown(300);
    screen_on();

    //创建一个临时的图片对象
    var src_big=new Image;
    src_big.src=$(this).attr("src_big");
    $(src_big).on("load",function () {
        picture_list1_big.find(".picture_body img").attr("src",src_big.src).css({
           "opacity":0,
            "top":0,
            "width":"600px",
            "height":"450px"
        }).animate({
            opacity:1
        },800);
    });

    /*IE中需要把src_big.src=.... 放在load事件之后*/

    //当前点击图片的索引
    var index=$(this).parents("dl").index();
    toggle_picture(index);
    picture_list1_big.find(".picture_body .index").html(index+1+"/"+img_length);
});

//点击左右切换图片
picture_list1_big.find(".toggle").click(function () {
    picture_list1_big.find(".picture_body img").attr("src","images/loading.gif").css({
        "width":"32px",
        "height":"32px",
        "top":"190px"
    });
    var src_big=new Image();
    var index=parseInt($(this).attr("index"));
    toggle_picture(index);
    src_big.src=$(this).attr("src");
    $(src_big).on("load",function () {
        picture_list1_big.find(".picture_body img").attr("src",src_big.src).css({
            "opacity":0,
            "top":0,
            "width":"600px",
            "height":"450px"
        }).animate({
            opacity:1
        },200);

        picture_list1_big.find(".picture_body .index").html(index+1+"/"+img_length);
    });

});


//关闭大图
picture_list1_big.find(".picture_header a img").click(function () {
    picture_list1_big.hide();
    screen_off();
    // 重置loading图片，这样没次打开都会有loading
    picture_list1_big.find(".picture_body img").attr("src","images/loading.gif").css({
        "width":"32px",
        "height":"32px",
        "top":"190px"
    })
});

//拖动大图
picture_list1_big.drag(".picture_header").size();


//用户登录验证
var login_form=$("#login_form");
function  check_username() {
    var val=login_form.find("[name='user_name']").val().trim();
    if(val===''){
        return false;
    }else if(/[^(\da-zA-Z_)]/.test(val)||val.length<2||val.length>20) {
        $(".login_error_user").css("opacity", 1);
        return false
    }else{
        return true;
    }
}
login_form.find("[name='user_name']").blur(function () {
    check_username()
    
}).focus(function(){
    $(".login_error_user").css("opacity",0);
});

$("#login_btn").click(function(){
    if(check_username()){
        $("#login_btn").attr("disabled",true).css({
            "backgroundPosition":"right"
        });
        $("#login_loading").center(200,40).show();
        $.ajax({
            type:"POST",
            url:'is_login.php',
            data:login_form.serialize(),
            success:function (text) {
                //登录成功
                if (text ==="0") {
                    $("#login_loading").hide();
                    $("#login_success").center(200, 40).show();
                    setCookie("user",login_form.find("[name='user_name']").val());
                    setTimeout(function () {
                        $("#login_success").hide();
                        $("#login_box").hide();
                        screen_off();
                        document.getElementById("login_form").reset();
                        $("#login_btn").attr("disabled", false).css({
                            "backgroundPosition": "left"
                        });
                        $("#header").find('.mes').css("display","none");
                        var user_name=getCookie('user');
                        $("#header").find('#mes').html("<span>您好！"+user_name+'</span>').css({
                            "display":"block",
                            "color":"DarkGoldenRod"
                        });
                    }, 1500)

                    //登录失败
                }else if(text==="1"){
                    $("#login_loading").hide();
                    $("#login_fail").center(200, 40).show();
                    setTimeout(function () {
                        $("#login_fail").hide();
                        $("#login_btn").attr("disabled", false).css({
                            "backgroundPosition": "left"
                        });
                    }, 1500)
                }
            },
            // error:function (xhr) {
            //     if(xhr.status===404){
            //         $("#reg_loading").hide();
            //         $("#reg_fail").center(200, 40).show();
            //         setTimeout(function () {
            //             $("#reg_fail").hide();
            //             $("#submit").attr("disabled", false).css({
            //                 "backgroundPosition": "left"
            //             });
            //         }, 1500)
            //     }
            // },
            async: true
        })

        }
    });
//570

//弹出发表文章的框
var myarticle=$("#myarticle");
$("#person_center").on("click","#Publish",function () {
    // if($("#header").find('#mes').css("display")==='none'){
    //     alert("请先登录！");
    //     return false;
    // }
    myarticle.center(600,700).slideDown(300);
});

//关闭
myarticle.find("#myarticle_header a img").click(function () {
    myarticle.hide();
});
myarticle.drag("#myarticle_header").size();

myarticle.find("#title").focus(function () {
    myarticle.find('.info_title').css("opacity",0);
});
myarticle.find("#content").keydown(function (event) {
    var e=event||window.event;
    //阻止tab键的默认切换焦点，并且添加空格
    if(e.keyCode===9){
        e.preventDefault();
        //this=document.getElementById("content");
        var s = this.selectionStart;
        this.value = this.value.substring(0,this.selectionStart) +"\t" + this.value. substring(this.selectionEnd);               this.selectionEnd = s+1;
    }
});

//点击发表
$("#article_btn").click(function () {
    if(myarticle.find("#title").val().trim()===''){
        myarticle.find('.info_title').css("opacity",0).animate({
            "opacity":1
        },500);
        return false;
    }
    if(myarticle.find("#content").val().trim()===''){
        myarticle.find("#content").val('写点啥吧...');
        return false;
    }
    $("#submit").attr("disabled",true).css({
        "backgroundPosition":"right"
    });
    var html='';
    var ele=$('<div class="myarticle"></div>');
    html+="<div class='myarticle_header'><h3>"+ myarticle.find("#title").val()+"</h3></div>";
    html+="<div class='myarticle_body'>"+myarticle.find("#content").val() +"</div>";
    html+="<div class='myarticle_footer'> <span>阅读全文&gt;&gt;</span></div>";
    ele.append(html);
    $("#reg_loading").center(200,40).show().find("p").text("正在发表..");
    $.ajax({
        type: "POST",
        url: "add_blog.php",
        data: $("#myarticle_form").serialize(),
        success: function (text) {
            if (text ==="1") {
                $("#reg_loading").hide();
                $("#reg_success").center(200, 40).show().find("p").text("发表成功！");
                setTimeout(function () {
                    $("#reg_success").hide();
                    myarticle.hide();
                    document.getElementById("myarticle_form").reset();
                    $("#myarticle_btn").attr("disabled", false).css({
                        "backgroundPosition": "left"
                    });
                    $("#side_right").find(".myarticle").eq(2).animate({
                        "opacity":0,
                        "height":0
                    },500,function () {
                        $(this).hide()
                    });
                    $("#side_right").prepend(ele);
                    $(ele).css({
                        "opacity":0,
                        "height":0
                    }).animate({
                        "opacity":1,
                        "height":"240px"
                    },500);

                }, 1500);

            }
        },
        error:function (xhr) {
            if(xhr.status===404){
                $("#reg_loading").hide();
                $("#reg_fail").center(200, 40).show().find("p").text("发表失败！");
                setTimeout(function () {
                    $("#reg_fail").hide();
                    $("#myarticle_btn").attr("disabled", false).css({
                        "backgroundPosition": "left"
                    });
                }, 1500)
            }
        },
        async: true
    });
});

//从数据库获取博文列表
function getBlog() {
    var slide_right=$("#side_right");
    slide_right.find(".blog_loading").show();
    slide_right.find(".side_body").html('');
    $.ajax({
        type: "POST",
        url: "get_blog.php",
        data:{},
        success: function (text) {
            var json=JSON.parse(text);
            //添加最新的三条博文
            for(var i=0;i<3;i++){
                var content_length=json[i].content.length;
                if(content_length>470){
                    var content=json[i].content.substring(0,470)+"...";
                }else{
                    content=json[i].content;
                }
                var html='';
                var ele=$('<div class="myarticle"></div>');
                html+="<div class='myarticle_header'><h3>"+ json[i].title+"</h3></div>";
                html+="<div class='myarticle_body'>"+content +"</div>";
                html+="<div class='myarticle_footer'> <span>阅读全文&gt;&gt;</span></div>"
                ele.append(html);
                slide_right.find(".blog_loading").hide();
                slide_right.find(".side_body").append(ele);
                $(ele).css({
                    "opacity":0,
                    "height":0
                }).animate({
                    "opacity":1,
                    "height":"240px"
                },500);
             /*   slide_right.append('<div class="myarticle"></div>');

                slide_right.find(".myarticle:last-child").append("<div class='myarticle_header'><h3>"+ json[i].title+"</h3></div>").append("<div class='myarticle_body'>"+content +"</div>").append("<div class='myarticle_footer'> <span>阅读全文&gt;&gt;</span></div>").slideDown(300);*/
            }
        }
    });
}
getBlog();


//更换皮肤

var skin=$("#skin");
$("#person_center").on("click","#changeSkin",function () {
    // if($("#header").find('#mes').css("display")==='none'){
    //     alert("请先登录！");
    //     return false;
    // } <a href="#"><img src="images/small_bg1.png" alt=""></a>
    skin.center(600,370).fadeIn(300);
    $.ajax({
        type: "POST",
        url: "get_skin.php",
        data:{
            type:"all"
        },
        success: function (text) {
            var json=JSON.parse(text);
            var html='';
            for(var i=0;i<6;i++){
               html+='<a><img src="images/'+json[i].small_bg +'" big_bg="'+json[i].big_bg +'" bg_color="'+ json[i].bg_color+'"><span>'+json[i].bg_text+'</span></a>'
            }
            skin.find("#skin_body").html(html).css("opacity",0).animate({
                "opacity":1
            },500);
        }
    });

    //选择皮肤，并更新到数据库
    skin.find("#skin_body ").on("click","a img",function () {
        var that=this;
        $("body").css({
            "background":$(that).attr("bg_color")+' '+'url(images/'+$(that).attr('big_bg') +')'
        });
        $.ajax({
            type: "POST",
            url: "get_skin.php",
            data:{
                type:"set",
                big_bg:$(that).attr('big_bg')
            },
            success: function (text) {
               if(text==="1"){
                   $("#reg_success").center(200, 40).show().find("p").text("更换成功！");
               }
               setTimeout(function () {
                   $("#reg_success").hide()
               },1000);
            }
        });
    })

});

//关闭
skin.find("#skin_header a img").click(function () {
    skin.hide();
});
skin.drag("#skin_header").size();


//设置默认背景颜色
$.ajax({
    type: "POST",
    url: "get_skin.php",
    data:{
        type:"main"
    },
    success: function (text) {
        var json=JSON.parse(text);
        $("body").css({
            "background":json.bg_color+' '+'url(images/'+json.big_bg +')'
        });
        }

});


