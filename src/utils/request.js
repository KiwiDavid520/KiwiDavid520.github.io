// import { config } from '@vue/test-utils'
import store from '@/store'
import axios from 'axios'
// import router from '@/router'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + request url

  // 请求发出去5秒钟没回应就报错通知我
  timeout: 20000 // request timeout
})

// 请求拦截器（请求发出去前要做什么）
// 这个config就是当前请求配置
service.interceptors.request.use((config) => {
  // 通过拦截器将token带上
  // 由于并不是啥时候都需要携带token，例如像登录页请求登录的时候是不需要携带token的
  // 这里通过token是否存在来判断是否在登录页
  if (store.state.user.token) {
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token
    // console.log(config)
  }
  // 设置完要记得放行
  return config
})

// 响应拦截器（接收到响应前要做什么）
service.interceptors.response.use(res => {
  const response = res.data
  if (response.success) {
    if (response.message === '登录成功') { Message.success(response.message) }
    return response.data
  } else {
    Message.warning(response.message)
    return Promise.reject(new Error(response.message))
  }
}, err => {
  // 这是2xx以上状态码才会触发的回调函数
  console.dir(err)
  if (err.response && err.response.data.code === 10002) {
    // store.commit('user/removeToken')
    // store.commit('user/removeUserInfo')
    // router.replace('/login')
    // localStorage.removeItem('backToken')
    store.dispatch('user/logout')
  }
  Message.error(err.message)
  // throw error
  return Promise.reject(err)
})

// 暴露实例
export default service

