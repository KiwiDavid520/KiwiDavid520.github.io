import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElZh from 'element-ui/lib/locale/lang/zh-CN'
import ElEn from 'element-ui/lib/locale/lang/en'
// 将i18n作为Vue的插件
Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      '体验版': 'Demo Version',
      '你好': 'Hello!',
      '欢迎进入公司系统': 'Welcome to the company system',
      '愿您开心每一天!': 'May you be happy every day!',
      '人资管理系统': 'HR Management System',
      '全屏': 'Full Screen',
      '工作日历': 'Work Calendar',
      '系统访问数据': 'System Access Data',
      '公司新闻': 'Company Information',
      '人事招聘业绩统计': 'Recruitment Performance Data Of the Personnel',
      '首页': 'Home',
      '部门': 'Department',
      '审批': 'Approval',
      // 'Approval': '审批',
      '员工': 'Employee',
      '考勤': 'Attendance',
      '权限': 'Permission',
      '工资': 'Salary',
      '设置': 'Setting',
      '社保': 'Social Security',
      '人资后台管理系统': 'HR Back Office Management System',
      '项目地址': 'address',
      '退出登录': 'Sign Out',
      '星期一': 'Mon',
      '星期二': 'Tue',
      '星期三': 'Wed',
      '星期四': 'Thu',
      '星期五': 'Fri',
      '星期六': 'Sat',
      '星期天': 'Sun',
      '休': 'R',
      '取消': 'Cancel',
      '确定': 'OK',
      '密码': 'Password',
      '账号': 'Account',
      '立即登录': 'Sign In',
      'departments': 'Department',
      'settings': 'Setting',
      'salarys': 'Salary',
      'approvals': 'Approval',
      'undefined': 'Home',
      'employees': 'Employee',
      'social_securitys': 'Social Security',
      'permissions': 'Permission',
      'attendances': 'Attendance',
      'title': '提示',
      'confirm': '确定',
      'cancel': '取消',
      'error': '输入的数据不合法!'
    }

  },
  zh: {
    message: {
      '体验版': '体验版',
      '你好': '你好!',
      '欢迎进入公司系统': '欢迎进入公司系统',
      '愿您开心每一天!': '愿您开心每一天',
      '人资管理系统': '人资管理系统',
      '全屏': '全屏',
      '工作日历': '工作日历',
      '系统访问数据': '系统访问数据',
      '公司新闻': '公司新闻',
      '人事招聘业绩统计': '人事招聘业绩统计',
      '首页': '首页',
      '部门': '部门',
      '审批': '审批',
      '员工': '员工',
      '考勤': '考勤',
      '权限': '权限',
      '工资': '工资',
      '设置': '设置',
      '社保': '社保',
      '人资后台管理系统': '人资后台管理系统',
      '项目地址': '项目地址',
      '退出登录': '退出登录',
      '星期一': '星期一',
      '星期二': '星期二',
      '星期三': '星期三',
      '星期四': '星期四',
      '星期五': '星期五',
      '星期六': '星期六',
      '星期天': '星期天',
      '休': '休',
      '取消': '取消',
      '确定': '确定',
      '密码': '密码',
      '账号': '账号',
      '立即登录': '立即登录',
      'departments': '部门',
      'settings': '设置',
      'salarys': '工资',
      'approvals': '审批',
      'undefined': '首页',
      'employees': '员工',
      'social_securitys': '社保',
      'permissions': '权限',
      'attendances': '考勤',
      'title': '提示',
      'confirm': '确定',
      'cancel': '取消',
      'error': '输入的数据不合法!'
    }
  }
}

// 根据文档创建实例
const i18n = new VueI18n({
  locale: 'en',
  messages,
  ElZh,
  ElEn
})

export default i18n
