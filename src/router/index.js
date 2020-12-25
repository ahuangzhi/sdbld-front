import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: '总体概览',
      component: () => import('@/views/home/index'),
      meta: {
        title: '总体概览',
        icon: 'home'
      }
    },
    {
      path: '/telemetering',
      name: '遥测',
      component: () => import('@/views/telemetering/index'),
      meta: {
        title: '遥测'
      },
      hidden: true
    },
    {
      path: '/transferRecords',
      name: '交易详情',
      component: () => import('@/views/transferRecords/index'),
      meta: {
        title: '交易详情'
      },
      hidden: true
    },
    {
      path: '/transferDetails',
      name: '详细信息',
      component: () => import('@/views/transferRecords/transferDetails/index'),
      meta: {
        title: '详细信息'
      },
      hidden: true
    }
  ],
},
{
  path: '/block',
  component: Layout,
  children: [
    {
      path: '/block',
      name: '转账记录',
      component: () => import('@/views/block/index'),
      meta: { title: '转账记录', icon: 'blockHeight' }
    }
  ]
},
{
  path: '/traceability',
  component: Layout,
  children: [
    {
      path: '/traceability',
      name: '资源管理',
      component: () => import('@/views/traceability/traceability'),
      meta: { title: '资源管理', icon: 'traceability' }
    }
  ]
},
{
  path: '/unifiedQuery',
  component: Layout,
  children: [
    {
      path: '/unifiedQuery',
      name: '统一查询',
      component: () => import('@/views/unifiedQuery/index'),
      meta: { title: '统一查询', icon: 'query' }
    }
  ]
},
{
  path: '/orderCharge',
  component: Layout,
  children: [
    {
      path: '/orderCharge',
      name: '价格维护',
      component: () => import('@/views/priceMaintenance/index'),
      meta: { title: '价格维护', icon: 'blockHeight' }
    }
  ]
},
// {
//   path: '/orderCharge',
//   component: Layout,
//   children: [
//     {
//       path: '/basics_sectional_tariff',
//       name: '价格维护',
//       component: () => import('@/views/basics_sectional_tariff/index'),
//       meta: { title: '价格维护', icon: 'blockHeight' }
//     }
//   ]
// },
{
  path: '/electricSource',
  component: Layout,
  children: [
    {
      path: '/electricSource',
      name: '绿电溯源',
      component: () => import('@/views/electricSource/index'),
      meta: { title: '绿电溯源', icon: 'client' }
    }
  ]
},
{
  path: '/sharingPrivate',
  component: Layout,
  children: [
    {
      path: '/sharingPrivate',
      name: '私桩共享',
      component: () => import('@/views/sharingPrivate/index'),
      meta: { title: '私桩共享', icon: 'device' }
    }
  ]
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
