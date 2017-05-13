/**
 * Created by Administrator on 2017/5/12 0012.
 */

// 在localStorage的__seller__属性中有id属性，ID属性中有key属性保存收藏状态
function setLocalStorage(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    // 因为在localStorage中是以json字符串的格式存储的
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

function getLocalStorage(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  } else {
    seller = JSON.parse(seller)[id];
    if (!seller) {
      return def;
    } else {
      return seller[key] || def;
    }
  }
}

export {setLocalStorage, getLocalStorage};
