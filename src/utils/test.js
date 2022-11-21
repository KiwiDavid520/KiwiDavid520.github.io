import PageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
