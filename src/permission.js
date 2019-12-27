import router from './router'
import store from './store'
import { menusToRoutes , resetTokenAndClearUser } from './utils/router'
import {
  LoadingBar
} from 'iview'
// import axios from 'axios'

LoadingBar.config({
  color: "#409EFF"
})
// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
  LoadingBar.start()
  if (sessionStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (hasMenus) {
        next()
      } else {
        try {
          // 这里可以用 await 配合请求后台数据来生成路由
          // const data = await axios.get('xxx')
          // const routes = menusToRoutes(data)
          const routes = menusToRoutes(store.state.router.menuItems)
          // 动态添加路由
          router.addRoutes(routes)
          hasMenus = true
          next({
            path: to.path || '/'
          })
        } catch (error) {
          resetTokenAndClearUser()
          next(`/login`)
        }
      }
    }
  } else {
    hasMenus = false
    if (to.path === '/login') {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  LoadingBar.finish()
})