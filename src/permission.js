import router from '@/router'
import store from '@/store'

// 使用全局前置导航守卫
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 已登录
    // 如果已经有token了，这时候用户还想去登录页，是没必要的
    // 直接把用户踢到首页
    // 只要不是去登录页，就说明是登录状态，则要获取一遍用户数据
    if (to.path === '/login') {
      if (Object.keys(store.state.user.userInfo).length === 0) {
        await store.dispatch('user/getUserInfo')
      }
      next('/dashboard')
    } else {
      // 已登录，但不是去登录页，那随用户的意思，直接放行
      // {}永远不要直接拿来判断

      // 而是使用Object.keys(传入一个对象)返回这个对象的由这个对象中的属性组成的数组
      if (Object.keys(store.state.user.userInfo).length === 0) {
        await store.dispatch('user/getUserInfo')
        // 拿完数据以后，当前用户的meaus就有了，就可以进行权限筛选了
        const menus = store.state.user.userInfo.roles.menus
        const res = await store.dispatch('permission/filterRouter', menus)
        // console.log(res, 111)
        // 追加路由配置，使用Router的addRoutes函数
        router.addRoutes([
          ...res,
          // 404页面必须放置在最后面
          { path: '*', redirect: '/404', hidden: true }
        ])
        return next(to.path)
      }
      next()
    }
  } else {
    // 未登录
    // 注意，未登录状态下需要给一个白名单，用户访问的页面如果在白名单内，是不需要token的
    const whiteList = ['/login', '/404']
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单的页面，随便进
      next()
    } else {
      // 如果不在白名单,强制跳转到登录页
      next('/login')
    }
  }
})
