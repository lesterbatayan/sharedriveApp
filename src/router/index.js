import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

import HeroPage from '../pages/HeroPage.vue'
import ChatPage from '../pages/ChatPage.vue'
import AvailablePage from '../pages/AvailablePage.vue'
import BookRidePage from '../pages/BookRidePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'home',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: HeroPage
        },
        {
          path: '/chat',
          component: ChatPage
        },

        {
          path: '/availability',
          component: AvailablePage
        },
        {
          path: '/bookride',
          component: BookRidePage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
