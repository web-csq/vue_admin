import Vue from 'vue'
import Router from 'vue-router'
import { schoolRoutes } from "./school"
import { classRoutes } from "./class"
import { stuRoutes } from "./student"
import { baseAdminRoutes } from "./base"

const originalReplace = Router.prototype.replace;
const routerPush = Router.prototype.push;

Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
      path: '/moduleshow',
      name: 'moduleshow',
      component: () => import('@/views/ModuleShow.vue')
    },
    {
      path: '/modulemain',
      name: 'modulemain',
      component: () => import('@/views/ModuleMain'),
      children:[
        {
          path:"/testmanager",
          name: 'testmanager',
          component: () => import('@/views/ModuleViews/TestManager')
        },
        {
          path:"/analyzelist",
          name: 'analyzelist',
          component: () => import('@/views/ModuleViews/AnalyzeList')
        }
      ],
      
    },
    {
        path: '/baseData',
        name: 'baseData',
        component: () => import('@/views/base/admin/baseDataHome'),
        children:[
          ...baseAdminRoutes,
        ]
      },
    {path: '/', redirect: '/home'},
] 

/**
 * 异步路由，通过后台数据生成
 */
export const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('@/views/SchoolExamAnalyze/Home')
    },
    ...schoolRoutes,
    ...classRoutes,
    ...stuRoutes
}

const createRouter = () => new Router({mode:"history",base:"./",routes: commonRoutes})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router