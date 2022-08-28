import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + request url
  // withCredentials: true, // send cookies when cross-domain requests

  // 请求发出去5秒钟没回应就报错通知我
  timeout: 5000 // request timeout
})

// 请求拦截器（请求发出去前要做什么）
service.interceptors.request.use()

// 响应拦截器（接收到响应前要做什么）
service.interceptors.response.use()

// 暴露实例
export default service

