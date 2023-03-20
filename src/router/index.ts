import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/playlist/:id',
    name: 'PlayList',
    component: () => import('@/views/PlayList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
