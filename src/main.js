import Vue from 'vue'
//完整引入整个Element
import ElementUI from 'element-ui'
//注意：样式需要单独引入哦
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
