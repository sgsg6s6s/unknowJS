<template>
  <div class="question-wrapper">
    <router-link to="/question/1">question1</router-link>
    <router-link to="/question/2">question2</router-link>
    <h1>前端常见的攻击以及防御</h1>
    <p>
      1、XSS(Cross Site Scripting) 跨站脚本攻击<br />
      2、CSRF（Cross Site Request Forgy）跨站请求伪造<br />
      3、点击劫持<br />
    </p>
    <h1>1. var和let区别：</h1>
    <p>
      （1）let形成块级词法作用域<br />
      （2）声明的变量不会在词法作用域提升<br />
      （3）全局词法作用域下，var声明变量可以挂在window上（var a -->
      window.a）,let却不可以<br />
    </p>
    <h1>2. AMD、CMD、CommonJS、ES6的import/export:</h1>
    <p>
      (1)AMD、CMD、CommonJS、ES6是不同规范或组织<br />
      (2)AMD使用RequireJS(异步加载js)、CMD使用require函数加载js（同步）、CommonJS通过module.exports定义模块<br />
    </p>
    <h1>遗留问题：</h1>
    <p>1. 软绑定和硬绑定<br /></p>
  </div>
</template>

<script >

// @ts-nocheck
/* eslint-disable */
const arr = [1, 2, [3, 4], [[5, 6], 7]]

function makeSum(arr) {
  let sum = 0
  for (const a of arr) {
    if (typeof a === 'number') {
      sum += a
    } else if (Array.isArray(a)) {
      sum += makeSum(a)
    }
  }
  return sum
}
console.info(makeSum(arr))

// Promise.all polyfill
function doResovle(resovle, value) {
  setTimeout(() => {
    console.info(value)
    resovle(value)
  }, value * 1000)
}

const prom = new Promise((resovle, reject) => {
  console.info('异步')
})
console.info('同步')
const list = [
  new Promise((resovle, reject) => {
    doResovle(resovle, 1)
  }),
  new Promise((resovle, reject) => {
    doResovle(resovle, 2)
  })
  // new Promise((resovle, reject) => {
  //     reject('laji')
  // }),
]
Promise.all(list).then(
  result => {
    console.info(res)
  },
  result => {
    console.info(result)
  }
)
const allin = function (list) {
  return new Promise((resovle, reject) => {
    const res = []
    for (const pro of list) {
      pro.then(
        result => {
          res.push(result)
          if (res.length === list.length) {
            resolve(res)
          }
        },
        result => {
          reject(result)
        }
      )
    }
  })
}
allin(list)

// 实现 convert2Tree 方法将下面数组根据 id 和 parentId 转成树状
const data = [
  { id: 1, parentId: null, name: '1' },
  { id: 2, parentId: 1, name: '2' },
  { id: 3, parentId: 2, name: '3' },
  { id: 4, parentId: 2, name: '4' },
  { id: 5, parentId: 3, name: '5' },
  { id: 6, parentId: 1, name: '6' },
  { id: 7, parentId: 3, name: '7' },
  { id: 8, parentId: 2, name: '8' }
]

function findRoot(id) {
  return data.find(e => e.parentId === id)
}

function findById(id) {
  return data.find(e => e.id === id)
}

function findChildrenById(id) {
  return data.filter(e => e.parentId === id)
}

function appendChildern(node) {
  if (node) {
    const children = findChildrenById(node.id)
    if (children) {
      for (const child of children) {
        appendChildern(child)
      }
      node.children = children
    }
  }
  return node
}

function convert2Tree() {
  const result = []
  const root = findRoot(null)
  if (root) {
    result.push(appendChildern(root))
  }
  return result
}

console.info(convert2Tree())
import Navigator from '@/components/Navigator.vue'
import RouteVue from '@/components/mixins/RouteVue.vue'
export default {
  mixins: [RouteVue],
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    console.info('++++++++++++++++++', this.$router, this.childrenRoutes.length)
    // const nodes: Array<Route> = ( as any).options.routes
    // const { path } = this.$route
    // const splits = path.match(/\/\w+/g)
    // const currentBigPath = splits ? splits[0] : ''
    // const curentNode = nodes.find((e: Route) => e.path == currentBigPath)
    // let children = curentNode ? (curentNode as any).children : []
    // children = children.map((e: Route) => {
    //   const copy: Route = { ...e }
    //   copy.path = currentBigPath + '/' + copy.path
    //   return copy
    // })
    // this.childrenRoutes = children
  },
  beforeRouteUpdate(to, from, next) {
    console.info('复用组件beforeRouteUpdate', to, from, this)
    next()
  },
  beforeRouteEnter(to, from, next) {
    console.info('进入页面beforeRouteEnter', to, from, this)
    next(vm => {
      console.info('通过next回调请求到了vue实例', vm)
    })
  }
}
</script>
