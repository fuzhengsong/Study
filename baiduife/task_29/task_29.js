/**
 * Created by Administrator on 2017/3/13 0013.
 */

//获取相应元素
form=document.forms[0];
function $(ele) {
    return form.elements[ele];
}
function q(ele) {
    return document.querySelector(ele)
}

//构造函数
function CreateFrom(name,passW,pasAgain,email,tel){
    //私有变量
    var valueName;
    var valuePas;
    var valuePasAg;
    var valueEmail;
    var valueTel;
    this.count=0;
    //公有属性
    this.tip1=q(".tip1");
    this.tip2=q(".tip2");
    this.tip3=q(".tip3");
    this.tip4=q(".tip4");
    this.tip5=q(".tip5");

    this.name=$(name);
    this.passW=$(passW);
    this.pasAgain=$(pasAgain);
    this.email=$(email);
    this.tel=$(tel);
    //把this赋值给tip 在创建每个对象时都不同
    var tip=this;
    this.onFocus=function(){
        //名称获得焦点事件
        tip.name.addEventListener("focus",function () {
            var Text="必填，长度为4-16个字符";
            tip.insertTips(tip.name,tip.tip1,Text);
        });
        //名称失去焦点
        tip.name.addEventListener("blur",function () {
            var lenCh=0;
            var lenEN=0;
            var len=0;
            tip.valueName=tip.name.value;
            if(/[\u4e00-\u9fa5，。；：‘’“”·]/.test(tip.valueName)){
                lenCh=tip.valueName.match(/[\u4e00-\u9fa5，。；：‘’“”·]/g).length*2;
            }
            if(/[0-9a-zA-Z,\.:!'";]/.test(tip.valueName)){
                lenEN=tip.valueName.match(/[0-9a-zA-Z,\.:!'"]/g).length;
            }
            len=lenCh+lenEN;
            var text1="名字不能为空";
            var text2="名字填写正确";
            var text3="名字格式不符";
             tip.CheckText(tip.valueName,tip.tip1,text1,text2,text3,tip.name,len);
        });

        //密码获得焦点
        tip.passW.addEventListener("focus",function () {
            var Text="输入16位以内密码，英文字母和数字";
            tip.insertTips(tip.passW,tip.tip2,Text);

        });

        //密码失去焦点
        tip.passW.addEventListener("blur",function () {
            var len=0;
            tip.valuePas=tip.passW.value;
            if(/^[0-9a-zA-z]+$/.test(tip.valuePas)){
                len=/^[0-9a-zA-z]+$/.exec(tip.valuePas)[0].length;
            }
            var text1="密码不能为空";
            var text2="密码格式正确";
            var text3="密码格式不符";
            tip.CheckText(tip.valuePas,tip.tip2,text1,text2,text3,tip.passW,len);

        });

        //再次输入密码获得焦点
        tip.pasAgain.addEventListener("focus",function () {
            var Text="再次输入相同密码";
            tip.insertTips(tip.pasAgain,tip.tip3,Text);

        });

        //再次输入密码失去焦点
        tip.pasAgain.addEventListener("blur",function () {
            var len=0;
            tip.valuePasAg=tip.pasAgain.value;
            if( tip.valuePas==tip.valuePasAg){
                len=10;
            }
            var text1="密码不能为空";
            var text2="密码输入正确";
            var text3="密码不同！";
            tip.CheckText(tip.valuePasAg,tip.tip3,text1,text2,text3,tip.pasAgain,len);

        });

        //邮箱获得焦点
        tip.email.addEventListener("focus",function () {
            var Text="输入您的邮箱地址  例：fuzhengsong@163.com";
            tip.insertTips(tip.email,tip.tip4,Text);

        });

        //邮箱失去焦点
        tip.email.addEventListener("blur",function () {
            var len=0;
            tip.valueEmail=tip.email.value;
            if(/^[0-9a-zA-Z-_]+[\.0-9a-zA-Z-_]*@[0-9a-zA-Z-_]+(\.[0-9a-zA-Z-_]+){1,3}$/.test(tip.valueEmail)){
                len=10;
            }
            var text1="邮箱不能为空";
            var text2="邮箱输入正确";
            var text3="邮箱格式不正确";
            tip.CheckText(tip.valueEmail,tip.tip4,text1,text2,text3,tip.email,len);
        });

        //手机框获得焦点
        tip.tel.addEventListener("focus",function () {
            var Text="输入11位手机号码";
            tip.insertTips(tip.tel,tip.tip5,Text);

        });

        //手机框失去焦点
        tip.tel.addEventListener("blur",function () {
            var len=0;
            tip.valueTel=tip.tel.value;
            if(/^1[34578][0-9]{9}$/.test(tip.valueTel)){
                len=10;
            }
            var text1="手机号不能为空";
            var text2="手机号输入正确";
            var text3="手机格式不正确";
            tip.CheckText(tip.valueTel,tip.tip5,text1,text2,text3,tip.tel,len);

        });

        //提交表单验证
        form.addEventListener("submit",function (event) {
            if(tip.count==5){
                alert("提交成功！");
            }
            else{
                event.preventDefault(event);
                alert("输入有误！");
            }
        })
}();

}

CreateFrom.prototype= {
    //插入提示字符
    insertTips: function (type, tip, text) {
        tip.innerText = text;
        type.style.borderColor = "darkgray";
        tip.style.color = "#A9A9A9";
    },
    //错误提示
    CheckText: function (value, tip, text1, text2, text3, type, len) {
        if (value == "") {
            tip.innerText = text1;
            tip.style.color = "red";
            type.style.borderColor = "red";
        }
        else if (len < 4 || len > 16) {
            tip.innerText = text3;
            tip.style.color = "red";
            type.style.borderColor = "red";
        }
        else {
            type.style.borderColor = "#00CC00";
            tip.innerText = text2;
            tip.style.color = "#00CC00";
            this.count = this.count + 1;
        }
    }

}
var myForm=new CreateFrom("myName","passWord","passWordAgain","email","telephone");
