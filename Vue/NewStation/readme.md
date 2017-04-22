# newstation

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

> ### vue+vuex+vue-router+axios+webpack+mintui

该项目包括了主页面，轮播图组件，导航组件，关注页面，用户信息页面，登录页面，注册页面，文章页面

目录结构

				─src
					│  App.vue
					│  main.js
					│  router.config.js
					│  
					├─assets
					│  │  
					│  ├─css
					│  │      animate.min.css
					│  │      base.css
					│  │      index.css
					│          
					├─components
					│      Article.vue					
					│      Column.vue							
					│      Follow.vue
					│      footer.vue
					│      header.vue
					│      Home.vue
					│      Login.vue
					│      Reg.vue
					│      Slide.vue
					│      Userinfo.vue
					│      
					├─data
					│      article.data
					│      follow.data
					│      index.data
					│      
					├─fliters
					│      index.js
					│      normalTime.js
					│      
					└─store
							actions.js
							getters.js
							index.js
							mutations.js
      
	  
### 页面展示

![enter description here][1]


  ![enter description here][2]


![enter description here][3]


  [1]: ./images/%E4%B8%BB%E9%A1%B5_2.jpg "主页"
  [2]: ./images/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF_1.jpg "个人信息"
  [3]: ./images/%E6%96%87%E7%AB%A0_1.jpg "文章"
  