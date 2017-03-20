/**
 * Created by Administrator on 2017/3/14 0014.
 */
//获得根节点
boot=document.querySelector(".box1");
//获得所有btn元素
btns=document.querySelectorAll("input[type='button']");
text=document.querySelectorAll("input[type='text']");
lock=true;      //遍历时设置为false
var tag=0;      //广度优先遍历自增标识
var element;

//深度优先遍历
var arr=[];
function  DeepFirst(node) {
   if(node){
       arr.push(node);
       var len=node.children.length;        //node.children 代表所有的为元素节点的子元素
       for(var i=0;i<len;i++){
               DeepFirst(node.children[i]);
           }
       }
}
//广度优先遍历:逐层遍历，第一层的元素遍历完成后，遍历第二层元素
function  GdFirst(node) {
    if(node){
        arr.push(node);
        GdFirst(node.nextElementSibling);
        //当没有右侧元素节点时，从左侧第一个元素开始，遍历他们的子元素
        node=arr[tag++];
        GdFirst(node.firstElementChild);
    }
}
//为4个button元素添加处理事件
btns[0].addEventListener("click",function () {
    if(lock==true){
        lock=false;
    DeepFirst(boot);
        Reset();
    traverseRender();
    }
    else{alert("正在遍历中！")}
});
btns[1].addEventListener("click",function () {
    if(lock==true) {
        lock = false;
        GdFirst(boot);
        Reset();
        traverseRender();
    }
    else{alert("正在遍历中！")}
});
btns[2].addEventListener("click",function () {
    if(lock==true) {
        lock = false;
        DeepFirst(boot);
        Reset();
        var value=text[0].value;
        traverseRenderT(value)
    }
    else{alert("正在遍历中！")}
});
btns[3].addEventListener("click",function () {
    if(lock==true) {
        lock = false;
        GdFirst(boot);
        Reset();
        var value=text[0].value;
        traverseRenderT(value)
    }
    else{alert("正在遍历中！")}
});

function Reset() {
    for(var i=0;i<arr.length;i++){
        arr[i].style.backgroundColor="white";
    }
}
function traverseRenderT (value) {
    var i = 0;
        timer = setInterval(function () {
            if (i > arr.length - 1) {
                arr[i - 1].style.backgroundColor = "white";
                arr = [];
                alert("没有找到！");
                clearInterval(timer);
                lock = true;
            }
            else if (i == 0) {
                if (arr[i].firstChild.nodeValue == value) {
                    arr[i].style.backgroundColor="red";
                    arr = [];
                    clearInterval(timer);
                    lock = true;
                }
                else{arr[i].style.backgroundColor = "#00AA88";}
            }
            else {
                if (arr[i].firstChild.nodeValue == value) {
                    arr[i].style.backgroundColor = "red";
                    arr[i - 1].style.backgroundColor = "white";
                    arr = [];
                    clearInterval(timer);
                    lock = true;
                }
                else{
                arr[i].style.backgroundColor = "#00AA88";
                arr[i - 1].style.backgroundColor = "white";
                }
            }
            i++;
        }, 500)

}
function  traverseRender() {
    var i=0;
    timer = setInterval(function () {
        if (i > arr.length - 1) {
            arr[i - 1].style.backgroundColor = "white";
            arr = [];
            clearInterval(timer);
            lock = true;
        }
        else if (i == 0) {
            arr[i].style.backgroundColor = "#00AA88";
        }
        else {
            arr[i].style.backgroundColor = "#00AA88";
            arr[i - 1].style.backgroundColor = "white";
        }
        i++;
    }, 500);

}
boot.addEventListener("click",function (e) {
    DeepFirst(boot);
    Reset();
    arr=[];
    e.target.style.backgroundColor="yellow";
    element=e.target;
});

btns[4].addEventListener("click",function () {
    len=element.childNodes.length;
    if(len){
        while(element.hasChildNodes()){
            element.removeChild(element.firstChild);
        }
        element.parentNode.removeChild(element);
    }
});
btns[5].addEventListener("click",function () {
    var insertNode=text[1].value;
    var newNode=document.createElement("div");
    if(insertNode!=""){
        newNode.innerHTML=insertNode;
    }
    else{
        alert("请输入要插入的内容！");
        return false;
    }
    //alert(element.className);
    newNode.className=element.className.replace(/(\d)/,function (item,$1) {
        return parseInt($1)+1;
    });
    element.appendChild(newNode);
})

