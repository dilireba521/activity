import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/layout/Basic.vue'

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
        }
      ]
    }
  ]
})

export default router
