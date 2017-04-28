/**
 * Created by Administrator on 2017/4/25 0025.
 */
var Storage=function () {
    let preFix='bookStore_';
    var setStorage=function (key,value) {
       localStorage.setItem(preFix+key,value);
    };
    var getStorage=function (key) {
       return localStorage.getItem(preFix+key)
    };
    return{
        setStorage:setStorage,
        getStorage:getStorage
    }
}();