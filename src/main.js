import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon

import '@/permission' // permission control
// import { formatDate } from '@/filters'

// 引入多语言
import i18n from '@/i18n'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI
  // i18n: (key, value) => i18n.t(key, value)
)

Vue.config.productionTip = false
Vue.directive('fiximg', {

  // 绑定该指令的元素插入父元素、文档的时候
  inserted(el, binding) {
    // console.log(binding)
    // 头像是否存在，不存在则给一个默认头像
    el.src = el.src || binding.value
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
    el.src = el.src || binding.value
    // 头像请求出错，会出现一个碎片的图片，那么很不爽，则直接使用自定义的头像
    el.onerror = () => {
      el.src = binding.value
      // console.log(binding.value)
    }
  }
})
import * as myFilters from '@/filters'
// console.log(myFilters)
// 全局过滤器
Vue.filter('formatDate', myFilters.formatDate)

// 全局组件注册
// import PageTools from '@/components/pageTools'
// Vue.component('PageTools', PageTools)
import MyPlugin from '@/utils/test'
Vue.use(MyPlugin)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
