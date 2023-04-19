import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

// import HeroPage from '../pages/HeroPage.vue'
// import ChatPage from '../pages/ChatPage.vue'
// import AvailablePage from '../pages/AvailablePage.vue'
// import BookRidePage from '../pages/BookRidePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          // component: HeroPage
          component: () => import('@/pages/HeroPage.vue')
        },
        {
          path: '/chat',
          // component: ChatPage
          component: () => import('@/pages/ChatPage.vue')
        },

        {
          path: '/availability',
          // component: AvailablePage
          component: () => import('@/pages/AvailablePage.vue')
        },
        {
          path: '/profile',
          component: () => import('@/pages/DriverProfilePage.vue')
        },
        {
          path: '/bookride',
          component: () => import('@/pages/BookRidePage.vue')
        },
        {
          path: '/available',
          component: () => import('@/pages/AvailableDriversPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    }
  ]
})

export default router
