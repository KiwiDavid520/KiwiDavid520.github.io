import PageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
import ImgUpload from '@/components/ImgUpload'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImgUpload', ImgUpload)
  }
}
