import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import routes from './route.config.js'
// import store from './store'

import 'element-ui/lib/theme-default/index.css'
Vue.use(VueRouter);
var router=new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior: () => ({y: 0}),
});
Vue.use(ElementUI);
new Vue({
        router,
        el: '#app',
        render: h => h(App)
});
