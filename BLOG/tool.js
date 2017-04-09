/**
 * Created by Administrator on 2017/3/29 0029.
 */
//浏览器检测
(function () {
window.sys={};
var ua=navigator.userAgent.toLowerCase();
var s;
    (s=ua.match(/msie ([\d.]+)/))? sys.ie=s[1]:
        (s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
            (s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
                (s=ua.match(/opera.*version\/([\d.]+)/))?sys.opera=s[1]:
                    (s=ua.match(/version\/([\d.]+).*safari/))?sys.safari=s[1]:0;

})();




//跨浏览器获取css

function getStyle(element,sty){
    if(typeof document.defaultView.getComputedStyle!="undefined"){  //w3c  计算当前元素的所有样式，包括嵌入和样式表
        return document.defaultView.getComputedStyle(element,null)[sty];
    }else if(element.currentStyle!="undefined"){            //ie
        return element.currentStyle[sty];
    }
}



/*跨浏览器监听事件区别的总结：
* 1.IE方法中 ，attachEvent和DOM0级添加的方法 的this指向window，需要调用call函数，从而导致事件不同，添加的事件无法被删除
* 2.IE中 ，attachEvent添加的方法无法按顺序执行。该方法本身存在这个弊端
* 3.IE中，使用DOM0级添加事件时，event是window中的一个属性。*/



//外部创建一个计数器，便于在哈希表中添加事件
addEvent.ID=0;

//跨浏览器事件监听
function addEvent(element,type,handler) {
    if(element.addEventListener!=undefined){        //W3C
        element.addEventListener(type,handler,false)
    }else{                                                  //IE中使用传统方法来模拟多个事件的监听
        //为element对象创建一个哈希表，用来存放事件
        if(!element.events){                     //判断是否存在 不存在就创建
            element.events={}
        }
        if(!element.events[type]){              //为每种事件创建一个存放的数组，便于统一执行
            element.events[type]=[];
            element.events[type][addEvent.ID++]=handler;                        //第一次如果没有该类型的事件，则直接添加
        }else if(addEvent.equal( element.events[type],handler)==true){         //判断该事件是否已经添加，不进行重复添加
            return false
        }else{

            element.events[type][addEvent.ID++]=handler;
        }
        //执行添加事件函数
        element["on"+type]=addEvent.exec;

    }

}

//事件处理函数
addEvent.exec=function (event) {
    var e=event||window.event;
    for(var i in this.events[e.type]){           //element["on"+type]=addEvent.exec; 因此this就是element
                                                //触发事件时，event.type中也保存着type的类型，所以这里可以使用event.type代替type类型
        this.events[e.type][i].call(this,e);    //IE中，DOM0级以及attachEvent的this指的是window对象，而不是调用函数的元素
                                                //在IE中，使用DOM0级添加事件处理函数时，event对象作为window的一个对象
    }
};

addEvent.equal=function (es,fn) {
    for(var i in es){
        if(es[i]==fn){
            return true
        }
    }
    return false;
};


//跨浏览器清除监听事件

function  removeEvent(element,type,handler) {
    if(element.removeEventListener!=undefined){
        element.removeEventListener(type,handler,false)
    }else {
        for(var i in element.events[type]){
           if(element.events[type][i]==handler){
               delete  element.events[type]
           }
        }
    }
}

//跨浏览器获取视口大小

function  getClient() {
    if(window.innerWidth!=undefined){
        return {
            width:window.innerWidth,            //IE9+,FireFox,safari,Opera,Chrome
            height:window.innerHeight
        }
    }
       else if(document.compatMode=="CSS1Compat") {    //IE8之前
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


//获取Event对象
function  getEvent(event){
    return event||window.event;
}

//阻止事件对象

function preDefault(e) {
    var event=getEvent(e);
    if(typeof event.preventDefault!="undefined"){       //W3C
        event.preventDefault();
    }
    else{                             //IE
        event.returnValue=false;
    }
}

//阻止事件冒泡

function stopPropagation(e){
    var event=getEvent(e);
    if(event.stopPropagation){
        event.stopPropagation();
    }
    else{
        event.cancelBubble=true;
    }
}

//滚动条清零
function  clearScroll() {
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
}

