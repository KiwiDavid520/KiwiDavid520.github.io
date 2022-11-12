import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// import { formatDate } from '@/filters'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.directive('fiximg', {

  // 绑定该指令的元素插入父元素、文档的时候
  inserted(el, binding) {
    // console.log(binding)
    // 头像是否存在，不存在则给一个默认头像
    el.src = !el.src || 'https://ts1.cn.mm.bing.net/th/id/R-C.a21c47c9c760efdf19aaa7198f66aa02?rik=nsg4EAMujowt4A&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20190531%2f23%2f1559315845-wSyIpLAivO.png&ehk=m0ZYm%2faoSqS0XHIUE2wyCXXzKgJpVVGjir5jZTJDyVE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    // 头像请求出错，会出现一个碎片的图片，那么很不爽，则直接使用自定义的头像
    el.onerror = () => {
      el.src = binding.value
    }

    // 另一种方式
    // el.addEventListener('error', () => {
    //   el.src = binding.value
    // })
  },

  // 防止页面更新的时候，让绑定该指令的元素再执行一次该指令
  update(el, binding) {
    // console.log(binding)
    // 头像是否存在，不存在则给一个默认头像
    el.src = !el.src || 'https://ts1.cn.mm.bing.net/th/id/R-C.a21c47c9c760efdf19aaa7198f66aa02?rik=nsg4EAMujowt4A&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20190531%2f23%2f1559315845-wSyIpLAivO.png&ehk=m0ZYm%2faoSqS0XHIUE2wyCXXzKgJpVVGjir5jZTJDyVE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    // 头像请求出错，会出现一个碎片的图片，那么很不爽，则直接使用自定义的头像
    el.onerror = () => {
      el.src = binding.value
    }
  }
})
import * as myFilters from '@/filters'
// console.log(myFilters)
// 全局过滤器
Vue.filter('dateFormat', myFilters.formatDate)

// 全局组件注册
// import PageTools from '@/components/pageTools'
// Vue.component('PageTools', PageTools)
import MyPlugin from '@/utils/test'
Vue.use(MyPlugin)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
