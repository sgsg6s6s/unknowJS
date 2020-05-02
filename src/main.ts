import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import Element from 'element-ui'
import { Button, Select, Option } from 'element-ui'
import 'element-ui/packages/theme-chalk/src/index.scss'
// Vue.use(Element)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
