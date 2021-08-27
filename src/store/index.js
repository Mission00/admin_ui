import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     adminname: window.sessionStorage.getItem('adminname') == null ? '' : JSON.parse(window.sessionStorage.getItem('adminname' || '[]')),
//     adminMenus: []
//   },
//   mutations: {
//     initAdminMenu (state, menus) {
//       state.adminMenus = menus
//     },
//     login (state, data) {
//       state.adminname = data
//       window.sessionStorage.setItem('adminname', JSON.stringify(data))
//     },
//     logout (state) {
//       // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
//       state.adminname = ''
//       window.sessionStorage.removeItem('adminname')
//       state.adminMenus = []
//     }
//   },
//   actions: {
//   }
// })


export default new Vuex.Store({
  state: {
      adminname: window.sessionStorage.getItem('adminname' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('adminname' || '[]')).adminname,
      adminMenus: [],
  },
  mutations: {
    login (state, admin) {
      state.adminname = admin.adminname

      window.sessionStorage.setItem('adminname', JSON.stringify(admin.adminname))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.adminname = ''
      window.sessionStorage.removeItem('adminname')
      state.adminMenus = []
    },
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
  }
})
