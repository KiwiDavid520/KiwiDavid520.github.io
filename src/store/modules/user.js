import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  // 使用的是本地存储实现数据持久化
  // token: localStorage.getItem('backToken') || ''

  // 使用的是Cookies来实现数据持久化
  token: getToken() || ''
}
const mutations = {
  setToken(state, token) {
    // 使用本地存储将登录后的token做一个备份，因为vuex刷新后，token就会消失，无法做到数据持久化，而本地存储不会
    // localStorage.setItem('backToken', token)

    // 备份到Cookies
    setToken(token)
    state.token = token
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    console.log(res, '这是接收到的res')
    context.commit('setToken', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

