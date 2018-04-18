import Vue from 'vue'
import Router from 'vue-router'
// import Goods from '@/components/goods/goods'
import Ratings from '@/components/Ratings/ratings'
import Seller from '@/components/seller/seller'

const Goods = resolve => require(['@/components/goods/goods'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
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
      name: 'sleer',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})
