import Vue from 'vue'
import Router from 'vue-router'
import Ratings from '@/components/Ratings/ratings'
import Seller from '@/components/seller/seller'

const Goods = resolve => require(['@/components/goods/goods'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})
