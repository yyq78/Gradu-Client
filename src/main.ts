import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/main.css'
import $axios from './utils/http'
import echarts from 'echarts';
Vue.config.productionTip = false
Vue.prototype.$axios = $axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
