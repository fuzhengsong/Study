/**
 * Created by Administrator on 2017/3/10 0010.*/
/*
var form=document.forms[0];
var tagText=form.elements["tag1"];
var tagArea=document.getElementById("tags");
var interestText=form.elements["interest"];
var btn_interest=form.elements["makeSure"];
var interestArea=document.getElementById("interests");

// tagText.addEventListener("focus",function () {
//     tagText.style.borderColor="Cyan";
//     tagText.style.outlineWidth=0;
// });


//插入标签的函数
function createElement(m,area) {
    var spanElement=document.createElement("span");
    spanElement.setAttribute("class","box");
    spanElement.innerText=m;
    area.appendChild(spanElement);
}
//检测是否存在标签,以及标签的个数
function arrTest(arr,text,area) {
    if (arr.indexOf(text) == -1) {
        if (arr.length < 10) {
            createElement(text,area);
            arr.push(text);
        }
        else {
            area.removeChild(area.firstElementChild);
            arr.shift(text);
            createElement(text,area);
            arr.push(text);
        }
    }
}

//鼠标悬浮时显示函数
function  mouseOver(e) {
    if(e.target.tagName=="SPAN"){
        e.target.innerHTML="点击删除  "+e.target.innerHTML;
        e.target.style.backgroundColor="red";
    }
}

//鼠标离开时显示函数
function mouseOut(e) {
    if(e.target.tagName=="SPAN") {
        var changeValue = e.target.innerHTML;
        changeValue = changeValue.replace(/点击删除  (.*)/, "$1");
        e.target.innerHTML = changeValue;
        e.target.style.backgroundColor = "DeepSkyBlue";
    }
}

//删除文本时调用函数
function del(e,arr,area) {
    var delValue=e.target.innerHTML;
    delValue = delValue.replace(/点击删除  (.*)/, "$1");
    pos=arr.indexOf(delValue);
    arr.splice(pos,1);
    area.removeChild(event.target);
}
//为文本输入框添加一个keydown的事件
var arrTag=[];
tagText.addEventListener("keyup",function (event) {
    keyCodes=event.keyCode;

    var text=tagText.value.trim();
    if(text!="") {
        if (/[^,， ]*[,， ]$/.test(text)||keyCodes==13){
            if(text==","||text=="，"){
                tagText.value = "";
                return ;
            }
            text=text.replace(/([^,， ]+)[,， ]$/,"$1");
            arrTest(arrTag,text,tagArea);
            tagText.value = "";           //清空文本框

        }
    }
});
//鼠标悬浮在标签上的事件
tagArea.addEventListener("mouseover",function (event) {
    mouseOver(event);
});
//鼠标离开时的事件
tagArea.addEventListener("mouseout",function (event) {
    mouseOut(event);
});

//点击删除
tagArea.addEventListener("click",function (event) {
    del(event,arrTag,tagArea);
});
var arrInterests=[];
btn_interest.addEventListener("click",function () {
    var textArr=interestText.value.split(/[\n,，、\s\t\r]+/);         //\t表示tab键
    for(var i=0;i<textArr.length;i++){
        textArr[i]=textArr[i].trim();
        if(textArr[i]!=""){
        arrTest(arrInterests,textArr[i],interestArea);
        }
    }
    interestArea.value = "";           //清空文本框
});
interestArea.addEventListener("click",function (event) {                //这三个可以定义为原型方法
    del(event,arrInterests,interestArea);
});
interestArea.addEventListener("mouseover",function (event) {
    mouseOver(event);
});
interestArea.addEventListener("mouseout",function (event) {
    mouseOut(event);
});
*/


//封装
function CreateTags(input,output,button) {
    //公有变量
    this.arr=[];
    //私有变量
    var form=document.forms[0];
    //公有属性
    this.text=form.elements[input];
    this.area=document.getElementById(output);
    this.btn=form.elements[button];
    if(this.btn){                   //不同的对象调用不同的方法
        this.init();
        this.btnEvent();
        //把this指针赋值给self
        //
        // this.btnEvent=function () {
        //     self.area.addEventListener("click", function (e) {
        //         var delValue = e.target.innerHTML;
        //         delValue = delValue.replace(/点击删除  (.*)/, "$1");
        //         pos = self.arr.indexOf(delValue);
        //         self.arr.splice(pos, 1);
        //         self.area.removeChild(event.target);
        //     });
        //     self.btn.addEventListener("click", function () {
        //         var textArr = self.text.value.split(/[\n,，、\s\t\r]+/);         //\t表示tab键
        //         for (var i = 0; i < textArr.length; i++) {
        //             textArr[i] = textArr[i].trim();
        //             if (textArr[i] != "") {
        //                 var area = self.area;
        //                 self.arrTest(self.arr, textArr[i], area);
        //             }
        //         }
        //         self.text.value = "";           //清空文本框
        //     });
        // }()

    }
    else{
        this.init();
        //如果在原型方法中的this值需要赋值给不同的变量，相同的变量会在下次构造对象时被修改
        this.keyupEvent();
        // var self=this;
        // this.keyupEvent=function () {
        //     self.area.addEventListener("click", function (e) {
        //         var delValue = e.target.innerHTML;
        //         delValue = delValue.replace(/点击删除  (.*)/, "$1");
        //         pos = self.arr.indexOf(delValue);
        //         self.arr.splice(pos, 1);
        //         self.area.removeChild(event.target);
        //     });
        //     self.text.addEventListener("keyup", function (event) {
        //         keyCodes = event.keyCode;
        //         var text = self.text.value;
        //         if (text != "") {
        //             if (/[^,， ]*[,， ]$/.test(text) || keyCodes == 13) {
        //                 if (text == "," || text == "，"||text == " ") {
        //                     self.text.value = "";
        //                     return;
        //                 }
        //                 text = text.replace(/([^,， ]+)[,， ]$/, "$1");
        //                 self.arrTest(self.arr, text, self.area);
        //                 self.text.value = "";           //清空文本框
        //
        //             }
        //         }
        //     });
        // }();
    }
}

//原型方法
CreateTags.prototype= {
    //插入标签的函数
    createElement: function (m, area) {
        var spanElement = document.createElement("span");
        spanElement.setAttribute("class", "box");
        spanElement.innerText = m;
        area.appendChild(spanElement);

    },
    //检测是否存在标签,以及标签的个数
    arrTest: function (arr, text, area) {
        if (arr.indexOf(text) == -1) {
            if (arr.length < 10) {
                this.createElement(text, area);
                arr.push(text);
            }
            else {
                area.removeChild(area.firstElementChild);
                arr.shift(text);
                this.createElement(text, area);
                arr.push(text);
            }
        }
    },

    //init方法内定义了2个鼠标事件
    init: function() {
        this.area.addEventListener("mouseover", function (e) {
            if (e.target.tagName == "SPAN") {
                e.target.innerHTML = "点击删除  " + e.target.innerHTML;
                e.target.style.backgroundColor = "red";
            }
        });
        this.area.addEventListener("mouseout", function (e) {
            if (e.target.tagName == "SPAN") {
                var changeValue = e.target.innerHTML;
                changeValue = changeValue.replace(/点击删除  (.*)/, "$1");
                e.target.innerHTML = changeValue;
                e.target.style.backgroundColor = "DeepSkyBlue";
            }
        });

    },

    keyupEvent:function () {
        var self=this;
    self.area.addEventListener("click", function (e) {
        var delValue = e.target.innerHTML;
        delValue = delValue.replace(/点击删除  (.*)/, "$1");
        pos = self.arr.indexOf(delValue);
        self.arr.splice(pos, 1);
        self.area.removeChild(event.target);
    });
    self.text.addEventListener("keyup", function (event) {
        keyCodes = event.keyCode;
        var text = self.text.value;
        if (text != "") {
            if (/[^,， ]*[,， ]$/.test(text) || keyCodes == 13) {
                if (text == "," || text == "，"||text == " ") {
                    self.text.value = "";
                    return;
                }
                text = text.replace(/([^,， ]+)[,， ]$/, "$1");
                self.arrTest(self.arr, text, self.area);
                self.text.value = "";           //清空文本框

            }
        }
    });
},
    btnEvent:function () {
        var self=this;
    self.area.addEventListener("click", function (e) {
        var delValue = e.target.innerHTML;
        delValue = delValue.replace(/点击删除  (.*)/, "$1");
        pos = self.arr.indexOf(delValue);
        self.arr.splice(pos, 1);
        self.area.removeChild(event.target);
    });
    self.btn.addEventListener("click", function () {
        var textArr = self.text.value.split(/[\n,，、\s\t\r]+/);         //\t表示tab键
        for (var i = 0; i < textArr.length; i++) {
            textArr[i] = textArr[i].trim();
            if (textArr[i] != "") {
                var area = self.area;
                self.arrTest(self.arr, textArr[i], area);
            }
        }
        self.text.value = "";           //清空文本框
    });
}
};
var tags=new CreateTags("tag1","tags");
var interest=new CreateTags("interest","interests","makeSure");
var interest1=new CreateTags("interest1","interests1","makeSure1");



