/**
 * Created by Administrator on 2017/3/8 0008.
 */
var form=document.forms[0];
var blocks=document.getElementById("blockArea");
var btn_left_in=form.elements["left-in"];
var btn_left_out=form.elements["left-out"];
var btn_right_in=form.elements["right-in"];
var btn_right_out=form.elements["right-out"];
function createElement(m) {
    var spanElement=document.createElement("span");
    spanElement.setAttribute("class","box");
    spanElement.innerText=m;
    return spanElement;
}
btn_left_in.addEventListener("click",function () {
    var textInput=form.elements["textIn"].value;
    if(/\d+/.test(textInput)){
        var spanElement=createElement(textInput);
        blocks.insertBefore(spanElement,blocks.firstChild);
    }
});
btn_left_out.addEventListener("click",function () {
    if(blocks.firstElementChild==null){
        alert("没有元素可以删除！");
    }
    else{
        var alertText=blocks.firstElementChild.firstChild.nodeValue;
        blocks.removeChild(blocks.firstElementChild);
        alert(alertText);
    }
});
btn_right_in.addEventListener("click",function () {
    var textInput=form.elements["textIn"].value;
    if(/\d+/.test(textInput)){
        var spanElement=createElement(textInput);
        blocks.appendChild(spanElement);
    }
});
btn_right_out.addEventListener("click",function () {
    if(blocks.lastElementChild==null){
        alert("没有元素可以删除");
    }
    else{
        var alertText=blocks.lastElementChild.firstChild.nodeValue;
        blocks.removeChild(blocks.lastElementChild);
        alert(alertText);
    }
});
blocks.addEventListener("click",function (event) {
    blocks.removeChild(event.target);
});