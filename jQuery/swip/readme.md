采用juqery 实现的一个简单的滚屏插件
====
## 引用方式：
```
<script src="jquery.js"></script>
<script src="jquery.slide.js"></script>
```
先引入jquery.js 再引入jquery.slide.js
## html 布局：
```
<div class="slidePic slide1">
  <ul>
    <li><img src="./images/chrome-big.jpg" alt="chrome"></li>
    <li><img src="./images/safari-big.jpg" alt="safari"></li>
    <li><img src="./images/opera-big.jpg" alt="opera"></li>
    <li><img src="./images/firefox-big.jpg" alt="firefox"></li>
  </ul>
  <div class="nav">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
  </div>
</div>
```

## js调用
```
 $('.slide1').slideShow({
      time:500
      auto:1000
  });
```

auto:滚屏的时间间隔，默认是3s

time：动画持续时间，默认是500ms
