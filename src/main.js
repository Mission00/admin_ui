// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import 'element-ui/lib/theme-chalk/base.css';// fade/zoomxi

Vue.use(ElementUI) //使用elementUI

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
axios.defaults.headers['Content-Type'] = 'application/json';
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 配置全局自定义设置
import seetings from "./assets/settings"
Vue.prototype.$settings = seetings;
// 在所有需要与后台交互的组件中：this.$settings.base_url + '再拼接具体后台路由

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
