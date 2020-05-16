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
    path: '/cssTest',
    name: 'Css Test',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/CSSView.vue')
  },
  {
    path: '/MutationObserver',
    name: 'Mutation Observer',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/MutationObserver.vue')
  },
  {
    path: '/question/:id',
    name: 'Question（enter）',
    component: () => import(/* webpackChunkName: "unknowJS" */ '../views/Question.vue')
    // children: [
    //   {
    //     path: 'dynamicRoute/id',
    //     alias: '',
    //     name: 'dynamic Route',
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "designPatterns" */ '../components/route/beforeRouteUpdate.vue'
    //       )
    //   }
    // ]
  },
  {
    path: '/vueLinks',
    name: 'Vue links',
    component: Home
  },
  {
    path: '/axios',
    name: 'axios（leave）',
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

routes.forEach(route => {
  route.beforeEnter = (to, from, next) => {
    console.info('路由独享beforeEnter', to, from)
    next()
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.info('全局路由监听beforeEach', to, from)
  next()
})
router.beforeResolve((to, from, next) => {
  console.info('全局解析守卫beforeResolve', to, from)
  next()
})

router.afterEach((to, from) => {
  console.info('全局路由监听afterEach', to, from)
})

export default router
