import HomeView from '@/views/HomeView.vue'
import type {RouteRecordRaw} from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/emails',
    name: 'emails',
    component: () => import('../views/EmailsView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  }
];

export default mainRoutes;