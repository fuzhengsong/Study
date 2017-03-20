/**
 * Created by Administrator on 2017/2/21 0021.
 */

var aqiSourceData={
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
function randomBuildData(seed) {
    var dat = new Date("2016-01-01");
    var returnData={};
    for(var i=0;i<=92;i++){
        var dataStr=getDateStr(dat);
        returnData[dataStr]=Math.ceil(Math.random()*seed);       //用Math方法为returnData中的dataStr属性获取一个随机的值
        dat.setDate(dat.getDate()+1); //设置日期加上一天 获得92天的数据
        //document.writeln(returnData[dataStr]);测试代码
    }
    return returnData;
}
//返回从2016-01-01开始的每天的日期的正确格式
function getDateStr(dat) {                          //获取日期
    var year=dat.getFullYear();
    var month=dat.getMonth()+1;
    month=(month<10)?"0"+month:month;                   //月份小于10时前面添加0；
    day=dat.getDate();
    day=(day<10)?"0"+day:day;
    // document.write(year+"-"+month+"-"+day);测试代码
    return year+"-"+month+"-"+day;
}

var radios=document.getElementsByName("gra-time");          //获取3个radio控件
var radio_day=radios[0];
//alert(radio_day.text);
var radio_week=radios[1];
var radio_month=radios[2];
colors=["#FFEBCD",                              //渲染柱状图颜色的数组
	"#0000FF",
	"#8A2BE2",
	"#A52A2A",
	"#DEB887",
	"#5F9EA0",
	"#7FFF00",
 	"#D2691E",
	"#FF7F50",
	"#6495ED",
	"#FFF8DC",
	"#DC143C",
	"#00FFFF",
	"#00008B",
	"#008B8B",
	"#B8860B",
	"#A9A9A9",
	"#006400",
	"#BDB76B",
	"#8B008B"];

//elements=document.querySelector(".aqi-chart-wrap").getElementsByTagName("div");
elements=document.querySelector(".aqi-chart-wrap").childNodes;          //获取图表中现有的所有元素
length=document.querySelector(".aqi-chart-wrap").childNodes.length;
span1=document.getElementById("info");
selection=document.getElementById("city-select");               //获取下拉菜单

//获取下拉菜单被选中的值
function getSelected() {
    selectedOption=selection.selectedIndex;
    selected=selection.options[selectedOption].text;
}


//创建透明元素及子元素
function createElments(class1,class2,m) {
    var ele_day = document.createElement("div");
    ele_day.setAttribute("class", class1);
    document.querySelector(".aqi-chart-wrap").appendChild(ele_day);
    var data_day_1=document.createElement("div");
    data_day_1.setAttribute("class",class2);
    elements[m].appendChild(data_day_1);
}


//渲染柱形图
function design(count,leftPos,str,n,height) {
    var ele = elements[count];
    ele.style.height = height + "px";
    ele.style.left = leftPos + n + "px";
    ele.setAttribute("value1",str);                     //为每个柱形条设置一个value值代表其日期
    color = colors[Math.floor(Math.random() * 20)];     //产生一个随机的颜色
    ele.style.backgroundColor = color;
    var ele_data=elements[count].firstChild;
    switch (true){                                          //高度不同设置不同的颜色
        case height<200 :ele_data.style.color="green" ;break;
        case height<400 :ele_data.style.color="blue";break;
        case height>=400:ele_data.style.color="red";break;
    }
    ele_data.innerText=height;

}

var cityChange,cityChange_week,cityChange_month;


//给按日显示的控件添加一个监听事
radio_day.addEventListener("click",function (event) {
    cityChange_week="";cityChange_month="";                     //触发该事件时，重置另外2个的selected对应全局变量为空，避免当城市没有                                                                    变化，粒度变化时，事件判断城市未变化而不发生渲染。即113,114行的判断
    getSelected();
    if(selected=="请选择城市"||cityChange==selected){           //判断是否选中了城市，且城市名是否变化
        return false;
    }
    cityChange=selected;                                        //selected赋值给全局变量，将城市名信息储存，便于下次判断


    //判断绘图区内柱状图的格式，如果是按日显示，不需要清除，不是按日显示则清除
    while (elements[0]!=null && length!=94){
        document.querySelector(".aqi-chart-wrap").removeChild(elements[0]);
    }
    var dat = new Date("2016-01-01");
    var data_day=aqiSourceData[selected];                   //获取该城市的日数据总和
    var n=0; var count=0;
    //创建按日显示柱状图元素以及数据元素，如果绘图区内已存在则不需要再创建
   if (length!=94) {
       for (var m = 0; m <= 92; m++) {
           createElments("dayBox","data_dayFor",m);
       }
   }
    createElementForWarpDay(data_day,n,count,dat);             //调用渲染图标函数
    var insertTextArg=radio_day.value;
    insertText(selected,insertTextArg);                     //调用插入文本函数
});

//读取天数据，并调用渲染函数
function createElementForWarpDay(data_day,n,count,dat) {           //修改日期柱状图的样式
    if (count <= 92) {
        var dataStr = getDateStr(dat);
        height_day = data_day[dataStr];
        design(count,40,dataStr,n,height_day);
        n = n +12;
        count++;
        dat.setDate(dat.getDate() + 1);
        setTimeout(function () {                            //超时调用以达到缓慢出现的效果
            createElementForWarpDay(data_day,n,count,dat)
        }, 20);
    }
}

//插入文本
function insertText(selected,insertTextArg) {
    TextBox=document.getElementById("text");
    if(TextBox.firstChild==null){
    div1=document.createElement("div");}
    div1.innerHTML="<span style='color:red;font-weight: bold'>"+selected+"市</span>"+"以"+"<span style='font-weight: bold;color: red'>"+insertTextArg+"</span>为粒度的空气质量指数";
    TextBox.appendChild(div1);
}
//鼠标悬浮时跟随鼠标位置显示日期
document.addEventListener("mouseover",function (event) {
        var value1=event.target.getAttribute("value1");
        if(value1){
            //获得鼠标所在的位置
        var x=(event.pageX)?event.pageX:document.body.scrollLeft+event.clientX;
        var y=(event.pageY)?event.pageY:document.body.scrollTop+event.clientY;
            //设置文本的位置跟随鼠标
        span1.style.left=(x-30)+"px";
        span1.style.top=y+"px";
        span1.innerText=value1;
        }
});
//鼠标离开时清空文本
document.addEventListener("mouseout",function () {
    span1.innerText="";
});

//为周控件添加一个监听事件
radio_week.addEventListener("click",function () {
    cityChange="";cityChange_month="";
    getSelected();
    if(selected=="请选择城市"||cityChange_week==selected){           //判断是否选中了城市，且城市名是否变化
        return false;
    }

    cityChange_week=selected;
    var dat = new Date("2016-01-01");
    getDataWeek(selected,dat);
    while (elements[0]!=null && length!=14){
        document.querySelector(".aqi-chart-wrap").removeChild(elements[0]);

    }
    var m=0;
    try {
        if (length != 14) {
            for (keys in objWeekData) {
                createElments("weekBox", "data_weekFor", m);
                m++;
            }
        }
    }
    catch(e){
        alert("cant")
        }
    var count=0;var n=0;
    createElementForWarpWeek(count,n);
    var insertTextArg=radio_week.value;
    insertText(selected,insertTextArg);

});
////读取周数据，并调用渲染函数
function createElementForWarpWeek(count,n){
       var key1=Object.keys(objWeekData);              //for in 无法使用setTimeout函数
        if(count<=13){
        var height_week=objWeekData[key1[count]];
        design(count,240,key1[count],n,height_week);
        count++;
        n+=50;
    }
    setTimeout(function () {
        createElementForWarpWeek(count,n)
    },50)
}

var witchWeek=0,witchMonth=1; var objWeekData = {};

//获取每个星期的数据
var arr = ["一", "二", "三", "四", "五"];
function getDataWeek(selected,dat) {
    var weekData = 0;
    var m = 0;
    do {
        var dataStr = getDateStr(dat);
        var month = dat.getMonth() + 1;
        var day = dat.getDay();
        if(aqiSourceData[selected][dataStr]!=null){             //数据取完就跳出
            weekData += aqiSourceData[selected][dataStr];
            m++;
            dat.setDate(dat.getDate() + 1);
        }
        else break;
    } while (day != 0);                     //判断是否是星期天，是则跳出，将数据储存

    //进一步判断月份是否发生了变化
    if (witchMonth == month) {                                //没有发生变化，则存入数据，星期数加1，继续调用geDataWeek产生数据
        var weekData_1 = Math.ceil(weekData / m);
        var weekStr = month + "月第" + arr[witchWeek] + "周";
        objWeekData[weekStr] = weekData_1;

        witchWeek++;
    }
    else{                                        //发生变化时，将该星期数据储存为下个月第一个星期的数据，星期数重置为0，继续调用                                                                                                                          getDataWeek
       witchMonth++;witchWeek=0;
        weekData_1 = Math.ceil(weekData / m);
        weekStr = month + "月第" + arr[witchWeek] + "周";
        objWeekData[weekStr] = weekData_1;
        witchWeek++;
    }
    if(aqiSourceData[selected][dataStr]!=null){       //调用之前判断数据是否已经取完。
        getDataWeek(selected,dat);
    }
    else {
        witchWeek=0;witchMonth=1;
        return objWeekData;
    }
}
//为月控件添加一个监听事件
radio_month.addEventListener("click",function () {
    cityChange="";cityChange_week="";
    getSelected();
    if(selected=="请选择城市"||cityChange_month==selected){           //判断是否选中了城市，且城市名是否变化
        return false;
    }
    cityChange_month=selected;
    var dat1 = new Date("2016-01-01");
    getDataMonth(selected,dat1);
    while (elements[0]!=null && length!=4){
        document.querySelector(".aqi-chart-wrap").removeChild(elements[0]);

    }
    var z=0;
        if (length != 4) {
            for (keys in objMonthData) {
                createElments("monthBox", "data_monthFor", z);
                z++;
            }
        }
    var count=0;var n=0;
    createElementForWarpMonth(count,n);
    var insertTextArg=radio_month.value;
    insertText(selected,insertTextArg);

});
//读取月数据，并调用渲染函数
function createElementForWarpMonth(count,n){
    var keys=Object.keys(objMonthData);              //for in 无法使用setTimeout函数
    if(count<=3){
        var height_month=objMonthData[keys[count]];
        design(count,350,keys[count],n,height_month);
        count++;
        n+=100;
    }
    setTimeout(function () {
        createElementForWarpMonth(count,n)
    },50)
}
//获取每月的数据;
var objMonthData={}; var witchMonth1=1;
function getDataMonth(selected,dat) {
    var monthData=0;var m=0;
    do{
        var dataStr = getDateStr(dat);
        if(aqiSourceData[selected][dataStr]!=null) {
            monthData += aqiSourceData[selected][dataStr];
            m++;
        }else {
            monthData_1 = Math.ceil(monthData/m);
            monthStr=month+"月";
            objMonthData[monthStr]=monthData_1;
            witchMonth1=1;
            return objMonthData;
            }
        dat.setDate(dat.getDate()+1);
        var month=dat.getMonth()+1;
    }while(witchMonth1==month);                     //当月份发生变化时退出，储存当月数据

    var monthData_1 = Math.ceil(monthData/m);
    var monthStr=(month-1)+"月";
    objMonthData[monthStr]=monthData_1;
    witchMonth1++;
    if(aqiSourceData[selected][dataStr]!=null){
        getDataMonth(selected,dat);
    }
}
//下拉菜单添加一个change事件
selection.addEventListener("change",function () {
    if(radio_day.checked){                          //判断哪个控件选中，触发click事件即可
        radio_day.click();
    }
    else if(radio_week.checked)
    {
        radio_week.click();
    }
    else if(radio_month.checked){
        radio_month.click();
    }
});
// $(function () {
//     //alert($("#text").offset().top);
//     $("input:eq(0)").click(function () {
//         $("#city-select").change(function () {
//
//
//         var cityName=$("select").val();
//         //document.write(aqiSourceData[cityName]);
//         if(aqiSourceData[cityName]!=undefined){
//             var returnData=aqiSourceData[cityName];
//             var dat = new Date("2016-01-01");
//             var cityValue=[];
//             var m=40;
//             for(var i=0;i<=91;i++){
//                 var dataStr=getDateStr(dat);
//                 // for(dataStr in returnData){
//                 //     alert(returnData[dataStr]);
//                 // }测试代码
//                 cityValue[i]=returnData[dataStr];
//
//                 $(".aqi-chart-wrap").append("<div></div>")
//                     .find("div").eq(i).addClass("dayBox").css("height", cityValue[i]).css("left",m);
//                 m=m+12;
//                 //$(".aqi-chart-wrap").append("<div></div>").find("div").addClass(".dayBox");
//                 // $("div").eq(i).addClass(function () {
//                 //     return "box"+i
//                 // }).addClass(".dayBox");
//
//
//                 dat.setDate(dat.getDate()+1);
//             }
//         }
//     })})
// });