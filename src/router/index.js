import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Instruction from '@/pages/instruction/instructe'
import store from '../store/index'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Instruction',
      name: 'Instruction',
      meta: {requireAuth: true},
      component: Instruction
    }
  ]
})
// // 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({path: '/'}) // 登录成功后重定向到当前页面
    }
  } else {
    next()
  }
})
export default router
