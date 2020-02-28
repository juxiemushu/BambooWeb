import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录，如果未登录，跳转到登录界面
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，跳转到系统首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // 移除 token，并跳转到登录页面让用户重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token 信息*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 如果访问没有访问权限的页面，将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
