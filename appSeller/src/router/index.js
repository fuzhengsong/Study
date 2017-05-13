import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/good';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
Vue.use(Router);

export default new Router({
  // 重置激活类名为active
  linkActiveClass: 'active',
  // mode: 'history',
  routes: [
    {path: '/', component: goods},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
});
