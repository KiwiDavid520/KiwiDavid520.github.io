import Vue from 'vue'
import Router from 'vue-router'
import departmentsRouter from '@/router/module/departments.js'
import approvalsRouter from '@/router/module/approvals'
import attendancesRouter from '@/router/module/attendances'
import employeesRouter from '@/router/module/employees'
import permissionRouter from '@/router/module/permission'
import salarysRouter from '@/router/module/salarys'
import settingRouter from '@/router/module/setting'
import socialRouter from '@/router/module/social'
import importRouter from '@/router/module/import'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 这是静态路由，并不需要权限控制
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // 404页面必须放置在最后面
  { path: '*', redirect: '/404', hidden: true }
]

// 有权限的路由配置
export const asyncRouter = [
  departmentsRouter,
  approvalsRouter,
  employeesRouter,
  attendancesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
  importRouter
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
