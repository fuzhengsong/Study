/**
 * Created by Administrator on 2017/4/21 0021.
 */
export default function (time) {
  if (time) {
    var date = new Date();
    date.setTime(time);
    var y = date.getFullYear();
    var m = ('0' + (date.getMonth() + 1)).slice(-2);
    var d = ('0' + date.getDate()).slice(-2);
    var h = ('0' + date.getHours()).slice(-2);
    var mm = ('0' + date.getMinutes()).slice(-2);
    var ss = ('0' + date.getSeconds()).slice(-2);
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
  }
}
