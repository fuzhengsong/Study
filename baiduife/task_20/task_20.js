/**
 * Created by Administrator on 2017/3/10 0010.
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
var search=form.elements["search"];

search.addEventListener("click",function () {
    searchValue=form.elements["searchValue"].value.trim();
    elements=document.querySelectorAll(".box");
    len=elements.length;
    for(var i=0;i<len;i++){
        var val=elements[i].innerHTML;
        val=val.replace(/^<span.*>(.*)<\/span>/g,"$1");
        val=val.replace(new RegExp(searchValue,"g"),"<span class='select'>"+searchValue+"</span>");
        elements[i].innerHTML=val;
    }
});
function createElement(m) {
    var spanElement=document.createElement("div");
    spanElement.setAttribute("class","box");
    spanElement.innerText=m;
    return spanElement;
}
btn_left_in.addEventListener("click",function () {
    var textInput=form.elements["textIn"].value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    var len=textInput.length;
    for(var n=0;n<len;n++){
        var spanElement=createElement(textInput[n]);
        blocks.insertBefore(spanElement,blocks.firstChild);
}
});
btn_left_out.addEventListener("click",function () {
    if(blocks.firstElementChild==null){
        alert("没有元素可以删除！");
    }
    else{
        blocks.removeChild(blocks.firstElementChild);
        alert(alertText);
    }
});
btn_right_in.addEventListener("click",function () {
    var textInput = form.elements["textIn"].value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    var len = textInput.length;
    for (var n = 0; n < len; n++) {
        var spanElement = createElement(textInput[n]);
        blocks.appendChild(spanElement);
    }
}
);
btn_right_out.addEventListener("click",function () {
    if(blocks.lastElementChild==null){
        alert("没有元素可以删除");
    }
    else{
        blocks.removeChild(blocks.lastElementChild);
        alert(alertText);
    }
});
blocks.addEventListener("click",function (event) {
    blocks.removeChild(event.target);
});
