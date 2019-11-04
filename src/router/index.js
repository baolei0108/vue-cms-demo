import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Layout from '@/components/Layout'
import Permission from '@/components/Permission'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/dashboard',
//       name: 'Dashboard',
//       component: Dashboard
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: Login
//     }
//   ]
// })

export const constantRoutes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: Dashboard }]
  },
  {
    path: '/hello',
    component: Layout,
    name: 'hello'
  }
]


//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRoutes
});



//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin','super_editor'] }, //页面需要的权限
    children: [
    { 
      path: 'index',
      component: Permission,
      name: '权限测试页',
      meta: { role: ['admin','super_editor'] }  //页面需要的权限
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
];

