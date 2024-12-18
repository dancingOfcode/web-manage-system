import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: '首页',
          component: Home
        },
        {
          path: '/user',
          name: '用户管理',
          component: () => import('@/views/userManage/index.vue')
        },
        {
          path: '/role',
          name: '角色管理',
          component: () => import('@/views/roleManage/index.vue')
        },
        {
          path: '/menu',
          name: '菜单管理',
          component: () => import('@/views/menuManage/index.vue')
        },
      ]
    },
  ],
})

// 路由守卫
router.beforeEach(async (to, from) => {
  // 检查用户是否已登录
  let userInfo = localStorage.getItem('userInfo')
  if (!userInfo && to.name !== 'login') {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
})

export default router
