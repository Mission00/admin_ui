import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UserList from '@/components/usercontroll/userList'
import AdminList from '@/components/usercontroll/adminList'
import MovieList from '@/components/moviecontroll/movieList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/login',
      name:'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
            path:'/userlist',
            name:'userList',
            component: UserList
        },
        {
          path:'/adminlist',
          name:'adminList',
          component: AdminList
      },

      {
        path:'/movielist',
        name:'movieList',
        component: MovieList
    },

      ]
    }
  ]
})
