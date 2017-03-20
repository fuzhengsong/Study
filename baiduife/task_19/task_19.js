/**
 * Created by Administrator on 2017/3/9 0009.
 */
/**
 * Created by Administrator on 2017/3/8 0008.
 */
var form=document.forms[0];
var blocks=document.getElementById("blockArea");
var btn_left_in=form.elements["left-in"];
var btn_left_out=form.elements["left-out"];
var btn_right_in=form.elements["right-in"];
var btn_right_out=form.elements["right-out"];
var DaLuan=form.elements["DaLuan"];
var Bubble=form.elements["Bubble"];
var Insert=form.elements["Insert"];
var Selection=form.elements["Selection"];


function ChangeLeftCss_out() {
    var elements=document.querySelectorAll(".box");         //当从左侧删除或者点击删除时，对所有的元素的left属性重写
    for(var i=0;i<elements.length;i++) {
        elements[i].style.left =(10+i*20)+"px";
    }
}
function ChangeLeftCss_in() {                               //左侧插入时，现有的数据left属性全部加20，空出第一个位置
    var elements=document.querySelectorAll(".box");
    for(var i=0;i<elements.length;i++) {
        elements[i].style.left =( parseInt(elements[i].style.getPropertyValue("left")) +20)+"px";
    }
}
function ChangeRightCss_in(spanElement) {                   //右侧插入时，计算它的left属性，添加到相应位置上
    var elements=document.querySelectorAll(".box");
    spanElement.style.left=(10+elements.length*20)+"px";
}
function createElement(m) {                             //创建一个元素以及其文字元素，设置高度
    var spanElement=document.createElement("div");
    spanElement.setAttribute("class","box");
    var spanElementText=document.createElement("span");
    spanElementText.setAttribute("class","boxText");
    spanElementText.innerText=m;
    spanElement.appendChild(spanElementText);
    spanElement.style.height=m+"px";
    return spanElement;
}

//左侧插入
btn_left_in.addEventListener("click",function () {
    var textInput=form.elements["textIn"].value;
    if(blocks.childNodes.length>=60){
        alert("当前队列中已有60个数！")
    }
    else if(9<textInput&&textInput<101){
        var spanElement=createElement(textInput);
        spanElement.style.left=10+"px";                 //插入元素的初始left属性为10
        ChangeLeftCss_in();
        blocks.insertBefore(spanElement,blocks.firstElementChild);
    }
    else{
        alert("请输入10-100范围的数");
    }
});

//左侧删除
btn_left_out.addEventListener("click",function () {
    if(blocks.firstElementChild==null){
        alert("没有元素可以删除！");
    }
    else{
        blocks.removeChild(blocks.firstElementChild);
        ChangeLeftCss_out();
    }
});
//右侧插入
btn_right_in.addEventListener("click",function () {
    var textInput=form.elements["textIn"].value;
    if(blocks.childNodes.length>=60){
        alert("当前队列中已有60个数！")
    }
    else if(9<textInput&&textInput<101){
        var spanElement=createElement(textInput);
        ChangeRightCss_in(spanElement);
        blocks.appendChild(spanElement);
    }
    else{
        alert("请输入10-100范围的数");
    }
});

//右侧删除
btn_right_out.addEventListener("click",function () {
    if(blocks.lastElementChild==null){
        alert("没有元素可以删除");
    }
    else{
        blocks.removeChild(blocks.lastElementChild);
    }
});
blocks.addEventListener("click",function (event) {
    blocks.removeChild(event.target);
    ChangeLeftCss_out()
});

function getHeight() {
    var arr=[];
    var elements=document.querySelectorAll(".box");         //当从左侧删除或者点击删除时，对所有的元素的left属性重写
    for(var i=0;i<elements.length;i++) {
        arr[i]=parseInt(elements[i].style.getPropertyValue("height"));
    }
    return arr;
}

//创建60个随机数
DaLuan.addEventListener("click",function () {
    // var arr=getHeight();
    //
    // var len=arr.length;
    // arr1=[];
    // var elements=document.querySelectorAll(".box");
    // for(i=0;i<len;i++){
    //     var m=Math.floor(Math.random()*len);
    //     if(arr1.indexOf(m)==-1){
    //     elements[i].style.height=arr[m]+"px";
    //     elements[i].firstChild.innerText=arr[m];
    //     arr1.push(m);
    // }
    // else{
    //         i--;
    //     }
    // }
    var elements=document.querySelectorAll(".box");
    for(var k=0;k<elements.length;k++) {
        blocks=document.getElementById("blockArea");
            blocks.removeChild(blocks.firstElementChild);
    }

    for(var i=0;i<60;i++){
        textInput=Math.floor(10+Math.random()*90);
        var spanElement=createElement(textInput);
        ChangeRightCss_in(spanElement);
        blocks.appendChild(spanElement);
    }
});

//冒泡排序
Bubble.addEventListener("click",function () {
    var elements=document.querySelectorAll(".box");
    var arr=getHeight();
    var len=arr.length;
    var j=len-1;
    var m=0;
    flag=true;
    timer=setInterval(function () {
        if(j<1){
            clearInterval(timer);
        }
        if(m>=j){
            m=0;
            j--;
        }
                if (arr[m] > arr[m + 1]) {
                    var n=m+1;
                    swap(m, n, arr, elements);
                }
        m++;
    },10);

});


//插入排序
Insert.addEventListener("click",function () {
    var elements=document.querySelectorAll(".box");
    var arr=getHeight();
    var len=arr.length;
    var j=len-1;
    var m=1;
    var i=1;
    timer=setInterval(function () {
        if(i>j){
            clearInterval(timer);
        }
        if(m==0){
            i++;
            m=i;
        }
        if(arr[m]<arr[m-1]){
            var n=m-1;
            swap(m,n,arr,elements);
            m--;
        }
        else{
            m=0;
        }



    },10)
});

//选择排序
Selection.addEventListener("click",function () {
    var elements=document.querySelectorAll(".box");
    var arr=getHeight();
    var len=arr.length;
    var j=len-1;
    var m=0;
    var i=0;
    timer=setInterval(function () {
        if(i==len){
            clearInterval(timer);
        }
        if(m==len){
            i++;
            m=i;
        }
        if(arr[i]>arr[m+1]){
            var n=m+1;
            swap(i,n,arr,elements);
        }
        m++;
    })
},10);

//交换数据
function swap(m,n,arr,elements) {
    elements[n].style.height=arr[m]+"px";
    elements[n].firstChild.innerText=arr[m];
    elements[m].style.height=arr[n]+"px";
    elements[m].firstChild.innerText=arr[n];
    var l=arr[m];
    arr[m]=arr[n];
    arr[n]=l;
}