/**
 * Created by Administrator on 2017/3/12 0012.
 */
//获取所有的子节点
rootElement=document.querySelector(".container");
form=document.forms[0];
btn_blr=form.elements["blr"];
btn_lbr=form.elements["lbr"];
btn_lrb=form.elements["lrb"];

//前序遍历
var arr=[];
function bootLeftRight(rootElement) {
    if(rootElement){
            arr.push(rootElement);
            bootLeftRight(rootElement.firstElementChild);
            bootLeftRight(rootElement.lastElementChild);
    }
}
//中序遍历
function leftBootRight(rootElement) {
    if(rootElement){
        leftBootRight(rootElement.firstElementChild);
        arr.push(rootElement);
        leftBootRight(rootElement.lastElementChild);
    }
}

//后序遍历

function leftRightBoot(rootElement) {
    if(rootElement){
        leftRightBoot(rootElement.firstElementChild);
        leftRightBoot(rootElement.lastElementChild);
        arr.push(rootElement);
    }
}

btn_blr.addEventListener("click",function () {

    bootLeftRight(rootElement);
    var i=0;
    timer=setInterval(function () {
        if(i==0){
            arr[i].style.backgroundColor="#00AA88";
        }
        else if(i>arr.length-1){
            arr[i-1].style.backgroundColor="white";
            arr=[];
            clearInterval(timer);
        }
        else{
            arr[i-1].style.backgroundColor="white";
            arr[i].style.backgroundColor="#00AA88"
        }
        i++;
    },500);

});
btn_lbr.addEventListener("click",function () {

    leftBootRight(rootElement);
    var i=0;
    timer=setInterval(function () {
        if(i==0){
            arr[i].style.backgroundColor="#00AA88";
        }
        else if(i>arr.length-1){
            arr[i-1].style.backgroundColor="white";
            arr=[];
            clearInterval(timer);
        }
        else{
            arr[i-1].style.backgroundColor="white";
            arr[i].style.backgroundColor="#00AA88"
        }
        i++;
    },500);

});
btn_lrb.addEventListener("click",function () {

    leftRightBoot(rootElement);
    var i=0;
    timer=setInterval(function () {
        if(i==0){
            arr[i].style.backgroundColor="#00AA88";
        }
        else if(i>arr.length-1){
            arr[i-1].style.backgroundColor="white";
            arr=[];
            clearInterval(timer);
        }
        else{
            arr[i-1].style.backgroundColor="white";
            arr[i].style.backgroundColor="#00AA88"
        }
        i++;
    },500);

});