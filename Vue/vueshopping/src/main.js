import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http=axios;
// var router=new VueRouter({
//     // routes:[
//     //     {path:'*',component:Cart}
//     // ]
// });

new Vue({
    el: '#app',
    render: h => h(App)
})
