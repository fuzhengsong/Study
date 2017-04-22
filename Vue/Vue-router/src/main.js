import Vue from 'vue'
import VueRouter from 'vue-router'  //驼峰写法
import App from './App.vue'
import routes from './router.config.js'
import './assets/animate.min.css'

Vue.use(VueRouter);
var router=new VueRouter(routes);
new Vue({
  el: '#app',
  router,
  components:{
    App
 }
});
