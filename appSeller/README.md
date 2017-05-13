# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 关于这个项目
这个项目是从网上找的一个关于使用vue开发的较为基础的项目，做的人多，我也就顺便拿来练习练习。下面是做这个项目课程中的一些总结。

### 目录结构

		│  .babelrc
		│  .editorconfig
		│  .eslintignore
		│  .eslintrc.js
		│  .gitignore
		│  .postcssrc.js
		│  data.json
		│  index.html
		│  package.json
		│  prod.server.js
		│  README.md
		│  项目总结
		│  
		├─build
		│      build.js
		│      check-versions.js
		│      dev-client.js
		│      dev-server.js
		│      utils.js
		│      vue-loader.conf.js
		│      webpack.base.conf.js
		│      webpack.dev.conf.js
		│      webpack.prod.conf.js
		│      webpack.test.conf.js
		│      
		├─config
		│      dev.env.js
		│      index.js
		│      prod.env.js
		│      test.env.js
		│      
		├─dist
		│  │  index.html
		│  │  
		│  └─static
		│      ├─css
		│      │      app.0e15e3b4edcb170db346a2eebab756d0.css
		│      │      app.0e15e3b4edcb170db346a2eebab756d0.css.map
		│      │      reset.css
		│      │      
		│      └─js
		│              app.90e2aade529f78bd3ae7.js
		│              app.90e2aade529f78bd3ae7.js.map
		│              iconfont.js
		│              manifest.b880a8407788762cd281.js
		│              manifest.b880a8407788762cd281.js.map
		│              vendor.b19b03e1e7fdc467150c.js
		│              vendor.b19b03e1e7fdc467150c.js.map
		│              
		├─images
		├─src
		│  │  App.vue
		│  │  main.js
		│  │  
		│  ├─assets
		│  │  ├─js
		│  │  │      loaclStorage.js
		│  │  │      normalTime.js
		│  │  │      util.js
		│  │  │      
		│  │  └─less
		│  │          mixin.less
		│  │          
		│  ├─components
		│  │  ├─cartControl
		│  │  │      cartControl.vue
		│  │  │      
		│  │  ├─cartPanel
		│  │  │      cartPanel.vue
		│  │  │      
		│  │  ├─food
		│  │  │      food.vue
		│  │  │      
		│  │  ├─goods
		│  │  │      good.vue 
		│  │  ├─header
		│  │  │      header.vue
		│  │  ├─ratings
		│  │  │      ratings.vue
		│  │  │      
		│  │  ├─seller
		│  │  │      seller.vue
		│  │  ├─star
		│  │  │      star.vue
		│  │  └─tags
		│  │          tag.vue
		│  │          
		│  └─router
		│          index.js
		│          
		├─static
		│  │  .gitkeep
		│  │  
		│  ├─css
		│  │      reset.css
		│  │      
		│  └─js
		│          iconfont.js
		│          
		└─test
			├─e2e
			│  │  nightwatch.conf.js
			│  │  runner.js
			│  │  
			│  ├─custom-assertions
			│  │      elementCount.js
			│  │      
			│  └─specs
			│          test.js
			│          
			└─unit
				│  .eslintrc
				│  index.js
				│  karma.conf.js
				│  
				└─specs
						Hello.spec.js
						
						
### 数据

项目中的数据都是从网上拉取下来的模拟数据，通过在 dev-server.js文件中express的路由配置，然后在组件中发送ajax请求来获取。ajax我采用的是axios，是vue官方推荐的一个插件。

### 图标和样式

图标使用的是阿里巴巴图标库中的图标，采用symbol方式引入，使用还是比较方便的，图标大小可以通过字体大小来设置，但是有些图标能够修改颜色，有些图标不能，做状态切换的时候就会比较麻烦。初始化样式是之前在用的一个模板。


### header组件

![enter description here][1]


  
  
  header组件就是一些布局，主页头部是float布局，弹出层中的优惠信息和商家公告采用的是flex布局，felx布局在屏幕自适应上用起来还是非常实用方便的。弹出层底部的关闭按钮采用的是stikey footer，不论高度多大，都会固定在底部。弹出层的变化效果采用了vue的transition，相比之前采用的animate.css也同样很方便。
  
  
  ### goods组件
  
  ![enter description here][2]


  
  
  goods组件时这个项目的核心。首先是将页面分为左右2列，采用的也是flex布局，左侧固定宽度，右侧随屏幕的大小改变，这2列都采用了iscroll插件，比较关键的是需要在==dom结构变化之后==实例化，不然是无法获取高度的，屏幕也就无法滚动了，所以需要在this.$nextTrik的回调函数中实例化iscroll插件。
  
  点击左侧的菜单右侧会发生滚动，这里的思路就是将右侧的每个菜单对应的滚动高度放入一个数组中，点击后获取数组中的对应项，然后采用iscroll中的==scrollToElement==方法将屏幕滚动到对应的高度。
  
  滚动右侧的列表左侧菜单也会发生变化，这里也是使用了iscroll的一个==on scroll==的监听，获取屏幕当前的scrollY高度，判断对应的菜单，注意这里要将实例化iscroll的options中的 ==probeType==设为3，最灵敏，不然是无法触发监听事件的。
  
 goods组件中组合了添加删除cartControl组件，购物车面板cartPanel组件，每个插件在选择商品是发生的状态变化，如删除按钮，数字的出现，购物车价格文字颜色的改变，都是通过给每个商品设置了一个响应式的数据来实现的，也就是==Vue.set方法==，每个组件中都会传入商品信息，所以可以通过获取其中的商品数量来实现各个组件间响应式的变化。
 
 #### 关于这个项目中比较酷小球动画
 
 小球动画使用了vue的动画钩子函数，vue中的v-show v-if 或者组件的切换都会触发动画，beforeenter的时候获取点击触发元素的位置，将小球置于该位置，分别设置它的横向和纵向的动画（使用2层元素），横向是linear，纵向是抛物线的贝塞尔曲线，dropping阶段将小球位置设置为000也就是初始位置，最后手动将小球的display设置为none，如果不手动设置就会出现小球消失的延时以及个别小球不消失的情况，应该是dom的异步刷新有关。
 
 
 ### food 组件
 ![enter description here][3]
 
 这个大图采用的是响应式的等比缩放，比例为1：1，之前写过响应式的页面，所有这里也采用了这种方法，主要就是设置一个父元素的padding-top。当padding采用百分比设置时，基数视为其父元素的宽度的，所以当窗口大小变化时，padding值和宽度会等比例变化，这时将图片绝对定位到父元素位置时，也就可以等比缩放了。这里组合了cartControl组件以及一个控制ratings内容的tags组件。
 
 
 
 ### ratings组件
 
 ![enter description here][4]
 
ratings组件上面部分采用的也是flex布局，下面的部分是tags组件加上v-for的列表，同样也采用了iscroll控制滚动
。

### tags组件

tags组件的作用主要父组件传入的ratings数组进行分析，当用户点击不同的类别的时候，分别计算出相应的ratings列表，然后返回父组件，在父组件中做相应的显示，商品详情页和商家评价也都有使用该组件。


### star 组件

star组件传入的参数右2个，评分以及star的尺寸，通过一个计算属性根据对应的评分转化成一个对应的星星的数组，数组长度为5，有全星，半星以及灰色的星，然后通过对应不同的class来实现一个star列表的效果。

### seller组件

![enter description here][5]

最后是商家详情页，主要也是采用了inline-block，flex，float的布局形式，vue的v-for使用还是很爽，商家详情页主要是收藏，当用户点击收藏后使用localStorage储存起来，当用户再次刷新的时候还是会保留之前的状态，这里将商家的id也一并保存了，这样可以将不同商家的状态一起存储而不会发生冲突。

  [1]: ./images/header.jpg "header"
  [2]: ./images/goods.jpg "goods"
  [3]: ./images/food.jpg "food"
  [4]: ./images/ratings.jpg "ratings"
  [5]: ./images/seller.jpg "seller"