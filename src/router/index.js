import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path:'/staff-list',
    name:'staff-list',
    component: () => import('@/views/StaffList.vue')
  },
  {
    path:'/staff-details/:idStaff',
    name:'staff-details',
    component: () => import('@/views/StaffDetails.vue')
  },
  {
    path:'/calendar',
    name:'calendar',
    component: () => import('@/views/Calendar.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router