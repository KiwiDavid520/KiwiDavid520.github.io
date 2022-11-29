import { asyncRouter, constantRoutes } from '@/router/index'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = [
      ...constantRoutes,
      ...data
    ]
    console.log(state.routes, 12121)
  }
}
const actions = {
  // store是默认能得到的参数，meaus是调用这个函数时的载荷
  filterRouter(store, menus) {
    // 过滤路由
    const routes = asyncRouter.filter((route) => {
      console.log(route, menus)
      return menus.includes(route.name)
    })

    // console.log(routes, 78787)
    store.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
