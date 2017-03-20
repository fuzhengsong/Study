/**
 * Created by Administrator on 2017/3/13 0013.
 */
var schoolData={
    "北京":["北京大学","清华大学","航空航天大学","北京邮电大学","北京工业大学","中国电影学院","中央戏剧学院"],
    "浙江":["浙江大学","浙江理工大学","浙江工业大学","温州大学","温州医科大学"],
    "江苏":["南开大学","南京大学"],
    "福建":["厦门大学","福建大学","阿拉伯商学院"]
};
form=document.forms[0];
function $(name) {
    return form.elements[name];
}
var sel=document.querySelector(".sel");
var job=document.querySelector(".job");
var school=document.querySelector("#school");
var notSchool=document.querySelector("#notSchool");
var city=$("city");
var college=$("college");
school.addEventListener("click",function () {
    job.style.display = "none";
    sel.style.display = "flex";
});
window.addEventListener("load",function () {
    school.checked=true;
    if(city.options[0]==null) {
        for (str in schoolData) {
            var newOption = new Option(str, str);
            city.add(newOption, undefined);
        }
        var str=city.options[0].value;
        for(var i=0;i<schoolData[str].length;i++){
            var newOption1=new Option(schoolData[str][i],schoolData[str][i]);
            college.add(newOption1,undefined);
        }

    }
});
notSchool.addEventListener("click",function () {
    sel.style.display="none";
    job.style.display="block";
});
city.addEventListener("change",function () {
    college.innerHTML="";
    var selected=city.selectedIndex;
    var str=city.options[selected].value;
    for(var i=0;i<schoolData[str].length;i++){
        var newOption1=new Option(schoolData[str][i],schoolData[str][i]);
        college.add(newOption1,undefined);
    }
});