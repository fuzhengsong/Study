# bookstore

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
## 技术栈

vue+vue-router+webpack

## 目录结构
				│-  babelrc

			│  .gitignore
			│
			│  index.html

			│  npm-debug.log

			│  package.json
			│  
			│  webpack.config.js
			├─mock

			└─src
				│  App.vue
				│  main.js
				│  route.config.js
				│  
				├─assets
				│  ├─css
				│  │      element.css
				│  │      reset.css
				│  │      
				│  ├─img
				│  │      back.png
				│  │      banner.jpg
				│  │      category.png
				│  │      female.png
				│  │      loading.gif
				│  │      loading4.gif
				│  │      male.png
				│  │      rank.png
				│  │      
				│  ├─js
				│  │      ajax.js
				│  │      iconfont.js
				│  │      jquery.base64.js
				│  │      jquery.jsonp.js
				│  │      localStorage.js
				│  │      
				│  └─lib
				│          zepto.min.js
				│          
				└─components
					│  book.vue
					│  bookStore.vue
					│  catagory.vue
					│  female.vue
					│  header.vue
					│  Home.vue
					│  male.vue
					│  rank.vue
					│  reader.vue
					│  
					└─Home
							Home_hot.vue
							Home_nav.vue
							Home_recommend.vue
							Home_top.vue

## 页面功能

### 首页
![enter description here][1]


  
  ### 分类页面 
  
  ![enter description here][2]
  
  ![3]
  
  ![4]
  
  ### 书架
  
  ![enter description here][3]
  
  ### 书籍详情
  
  ![enter description here][4]

### 阅读器
阅读器功能：
1.字体大小的切换，背景颜色和字体颜色的切换
2.白天黑夜模式的选择



![enter description here][5]


  [1]: ./images/home.png "home"
  [2]: ./images/male.png "male"
  [3]: ./images/bookStore.png "bookStore"
  [4]: ./images/%E4%B9%A6%E7%B1%8D%E8%AF%A6%E6%83%85%E9%A1%B5.png "书籍详情页"
  [5]: ./images/reader.png "reader"