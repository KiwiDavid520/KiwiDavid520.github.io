import { login, getInfo, getDetailInfo } from '@/api/user'
import router from '@/router'
// import { getToken, setToken } from '@/utils/auth'
const state = {
  // 使用的是本地存储实现数据持久化
  token: localStorage.getItem('backToken') || '',

  // 使用的是Cookies来实现数据持久化
  // token: getToken() || ''

  // 用户信息
  userInfo: {}

}
const mutations = {
  setToken(state, token) {
    // 使用本地存储将登录后的token做一个备份，因为vuex刷新后，token就会消失，无法做到数据持久化，而本地存储不会
    localStorage.setItem('backToken', token)

    // 备份到Cookies
    // setToken(token)
    state.token = token
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },

  // 清除token
  removeToken(state) {
    state.token = ''
  },
  // 清除用户所有信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {

  async login(context, data) {
    const res = await login(data)
    // console.log(res, '这是接收到的res')
    context.commit('setToken', res)
  },

  // 获取用户基本信息
  async getUserInfo(context) {
    const res = await getInfo()
    const detail = await getDetailInfo(res.userId)
    const info = { ...res, ...detail }
    console.log(info)
    context.commit('setUserInfo', info)
  },

  // 根据id获取用户详细信息
  //   async getDetailInfo(id) {
  //     const res = await getDetailInfo(id)
  //     console.log(res)
  //   }

  // 退出系统
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    localStorage.removeItem('backToken')
    router.push('/login')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

