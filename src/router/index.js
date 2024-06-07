import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/layout/Basic.vue'
import LayoutBackView from '../views/layout/BasicBack.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutView,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'homePage',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'finally',
          name: 'finallyPage',
          component: () => import('@/views/finally/index.vue')
        }
      ]
    },
    {
      path: '/back',
      name: 'back',
      component: LayoutBackView,
      redirect: '/back/index',
      children: [
        {
          path: 'index',
          name: 'backPage',
          component: () => import('@/views/back/index.vue')
        }
      ]
    }
  ]
})

export default router
