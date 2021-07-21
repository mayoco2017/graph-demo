import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/sanjiao',
    name: '三角',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sanjiao.vue')
  },
  {
    path: '/polygon',
    name: '多边形',
    component: () => import( '../views/Polygon.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
