    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import App from './App.vue'
    import routes from './router.config'
    import {Swipe, SwipeItem, Indicator } from 'mint-ui';
    import axios from 'axios';
    import store from './store'
    import filters from './fliters'
    import './assets/css/animate.min.css'

    Object.keys(filters).forEach((item) => {
        Vue.filter(item, filters[item])                      //将所有的过滤器添加到Vue对象中
    });
    Vue.prototype.$http = axios;
    //Vue.prototype.$Indicator=Indicator;
    Vue.use(Indicator);
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    import './assets/css/base.css';     //引入全局的base文件
    // //添加一个请求拦截器
    // Vue.prototype.beforeGet=function () {
    //     axios.interceptors.request.use(function(config){
    //         Indicator.open({
    //             text: '加载中...',
    //             spinnerType: 'fading-circle'
    //         });
    //         return config;
    //     },function(error){
    //         //当出现请求错误是做一些事
    //         return Promise.reject(error);
    //     });
    // };
    // //添加一个返回拦截器
    // Vue.prototype.afterGet=function(){
    //     axios.interceptors.response.use(function(response){
    //         Indicator.close();
    //         return response;
    //     },function(error){
    //         //对返回的错误进行一些处理
    //         return Promise.reject(error);
    //     });
    // };
    Vue.use(VueRouter);
    var router = new VueRouter({
        mode: 'history',   //
        scrollBehavior: () => ({y: 0}),
        routes
    });
    new Vue({
        store,
        router,
        el: '#app',
        render: h => h(App)
    });
