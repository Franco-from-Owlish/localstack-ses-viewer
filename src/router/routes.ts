import HomeView from '@/views/HomeView.vue'
import type {RouteRecordRaw} from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/emails',
    name: 'emails',
    component: () => import('../views/EmailsView.vue')
  }
];

export default mainRoutes;