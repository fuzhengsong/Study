/**
 * Created by Administrator on 2017/4/21 0021.
 */
export default function(time){
    if(time){
        var date=new Date();
        date.setTime(time);
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        var h=date.getHours();
        var mm=date.getMinutes();
        var s=date.getSeconds();

        return y+'-'+m+'-'+d+' '+h+':'+m+':'+s;
    }

}