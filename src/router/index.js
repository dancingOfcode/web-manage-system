import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView/index.vue'
import Login from '../views/login/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
})

// 路由守卫
router.beforeEach(async (to, from) => {
  // 检查用户是否已登录
  // let userInfo = localStorage.getItem('userInfo')
  // if (!userInfo && to.name !== 'login') {
  //   // 将用户重定向到登录页面
  //   return { name: 'login' }
  // }
})

export default router
