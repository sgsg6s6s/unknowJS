import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './main/windowAdd'

import 'element-ui/packages/theme-chalk/src/index.scss'
// import Element from 'element-ui'
// Vue.use(Element)
import { Button, Select, Option, Tabs, TabPane } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
