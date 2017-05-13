/**
 * Created by Administrator on 2017/5/12 0012.
 */
export default function urlParse() {
  let url = window.location.search;
  let pattern = /[&?][^&?]+=[^&?]+/g;
  let matches = url.match(pattern);
  let obj = {};
  if (matches) {
    matches.forEach((item) => {
      let value = item.substring(1).split('=');
      let key = encodeURIComponent(value[0]);
      let val = encodeURIComponent(value[1]);
      obj[key] = val;
    });
  }
  return obj;
}
