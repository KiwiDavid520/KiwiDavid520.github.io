import axios from 'axios'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + request url
  // withCredentials: true, // send cookies when cross-domain requests

  // 请求发出去5秒钟没回应就报错通知我
  timeout: 10000 // request timeout
})

// 请求拦截器（请求发出去前要做什么）
service.interceptors.request.use()

// 响应拦截器（接收到响应前要做什么）
service.interceptors.response.use(res => {
  const response = res.data
  if (response.success) {
    Message.success(response.message)
    return response.data
  } else {
    Message.warning(response.message)
    return Promise.reject(new Error())
  }
}, error => {
  // 这是2xx以上状态码才会触发的回调函数
  Message.error(error.message)
  // console.dir(error)
  // throw error
  return Promise.reject(error)
})

// 暴露实例
export default service

