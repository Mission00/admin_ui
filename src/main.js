// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import 'element-ui/lib/theme-chalk/base.css';// fade/zoomxi

Vue.use(ElementUI) //使用elementUI
Vue.use(mavonEditor)

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api/admin
var axios = require('axios')
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8443/api/admin'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
axios.defaults.headers['Content-Type'] = 'application/json';
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 配置全局自定义设置
import seetings from "./assets/settings"
Vue.prototype.$settings = seetings;
// 在所有需要与后台交互的组件中：this.$settings.base_url + '再拼接具体后台路由

let one = true;
router.beforeEach((to, from, next) => {
  if (store.state.adminname && to.path.startsWith('/home')) {
      initAdminMenu(router, store) 
  }
  if (to.meta.requireAuth) {
    if (store.state.adminname) {
      axios.get('/authentication').then(resp => {
        if (resp.data) {
          console.log("身份认证通过")
          next()
        }else{
          alert("非法请求");
        }
      })
    } else {
      console.log("身份认证失败，准备跳转")
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})


const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    console.log("已加载菜单")
    return
  }
  console.log("准备加载")
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      console.log("菜单获取成功")
      console.log(resp.data.data)
      var fmtRoutes = formatRoutes(resp.data.data)
      
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
