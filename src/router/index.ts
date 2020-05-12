import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/unknowJS',
    alias: '/',
    name: 'Unknow JS',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/UnknowJS.vue')
  },
  {
    path: '/api',
    name: 'JS Object API',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/API.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/Question.vue')
  },
  {
    path: '/vueLinks',
    name: 'Vue links',
    component: Home
  },
  {
    path: '/axios',
    name: 'axios',
    component: () => import(/* webpackChunkName: "axios" */ '../views/Axios.vue')
  },
  {
    path: '/designPatterns',
    name: 'Design Patterns',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: Patterns,
    component: () => import(/* webpackChunkName: "designPatterns" */ '../views/Patterns.vue'),
    children: [
      {
        path: 'iterator',
        alias: '',
        name: 'Iterator Pattern',
        component: () =>
          import(
            /* webpackChunkName: "designPatterns" */ '../components/designParttens/Iterator.vue'
          )
      },
      {
        path: 'proxy',
        name: 'Proxy Pattern',
        component: () =>
          import(/* webpackChunkName: "designPatterns" */ '../components/designParttens/Proxy.vue')
      },
      {
        path: 'observe',
        name: 'Observe Pattern',
        component: () =>
          import(
            /* webpackChunkName: "designPatterns" */ '../components/designParttens/Observe.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
