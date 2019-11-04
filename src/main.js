// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Layout from '@/components/Layout'
import Permission from '@/components/Permission'


import { asyncRoutes, constantRoutes } from '@/router'
// import http from '@/assets/js/http'


Vue.config.productionTip = false
Vue.use(ElementUI)

// Vue.prototype.$http = http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const asyncRoutes2 = [
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
]



router.beforeEach((to, from, next) => {
  //  console.log(router)
  // console.log(store.getters.token)
  if (store.getters.token) { // 判断是否有token
    // console.log(to.path)
    // console.log(store.getters.roles.length)


    if (to.path === '/login') {
      next({ path: '/' });
    } else {

      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('getInfo').then(res => { // 拉取info
          const roles = res.data.role;
          console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      

        //获取token  向服务器请求 role
        // const roles = 'admin';
        // store.getters.roles.push(roles);  //获取到roles后写入 store.getters.roles  下次router.beforeEach进来就直接执行next()  不会死循环了
        // if(roles == 'admin') {
        //      console.log('是admin')
        //      router.addRoutes(asyncRoutes2) 
        // }
        // next({ ...to, replace: true })


        // console.log(router)

        // next('/dashboard');

        // 动态添加可访问路由表
        // next({ ...to, replace: true })
        // console.log(router)


      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  


} else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});


