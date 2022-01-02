import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UserList from '@/components/usercontroll/userList'


Vue.use(Router)
Vue.use(Vuex)


export default new Router({
  routes: [
    {
      path: '/login',
      name:'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true
      },
      component: Home,
      children:[
        {
            path:'/home/userlist',
            name:'userList',
            component: UserList,
            meta: {
              requireAuth: true
            },
        },

      ]
    },
    {
      path:'*',
      name:'404'
    }
  ]
})
