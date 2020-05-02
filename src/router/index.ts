import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/unknowJS',
    alias: '/',
    name: 'Unknow JS',
    component: () =>
      import(/* webpackChunkName: "unknowJS" */ '../views/UnknowJS.vue')
  },
  {
    path: '/api',
    name: 'JS Object API',
    component: () =>
      import(/* webpackChunkName: "unknowJS" */ '../views/API.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () =>
      import(/* webpackChunkName: "unknowJS" */ '../views/Question.vue')
  },
  {
    path: '/vueLinks',
    name: 'Vue links',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
