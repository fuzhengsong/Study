/**
 * Created by Administrator on 2017/4/10 0010.
 */
//cookie和web储存

//设置cookie
/*
* @param {{[type]}}--name--cookie名
* @param {{[type]}}--value--cookie的值
* @param {{[Date]}}--expires--cookie过期时间
* @param {{[type]}}--path--cookie可以访问的目录，默认为根目录，如果设置了，只能在该目录中访问，包括根目录的其他目录都不能访问
* @param {{[type]}}--domain--cookie可以访问的域，默认为设置cookie的域
* @param {{[type]}}--secure--只有在ssl链接时才会发送cookie
* */
function setCookie(name,value,expires,path,domain,secure){
    var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);
    if(expires){
        cookieText+=";expires="+expires;
    }
    if(path){
        cookieText+=";path="+path;
    }
    if(domain){
        cookieText+=";domain="+domain;
    }
    if(secure){
        cookieText+=";secure"
    }
    document.cookie=cookieText;
}

/*@param {{[number]}} 设置过期的天数，为一个数值*/
function setDay(day) {
    if(typeof day==="number"&&day>0){
        var date=new Date();
        date.setDate(date.getDate()+day);
    }
    else{
        throw error("参数必须为大于0的数字！")
    }
   return date.toGMTString();
}


/*@param {[type]} 需要获取的cookie值*/
function getCookie(name) {
    var cookieName=encodeURIComponent(name)+'=';
    var cookieStart=document.cookie.indexOf(cookieName);
    var cookieEnd=document.cookie.indexOf(';',cookieStart);
    if(cookieStart>-1){
        if(cookieEnd===-1){
            cookieEnd=document.cookie.length;
        }
        var cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
    }
    return cookieValue;
}


//删除cookie

function deleteCookie(name) {
    document.cookie=name+'=;expires='+new Date(0);
}