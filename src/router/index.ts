import component from '*.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path:'/inscription',
    component:() => import('@/views/Inscription.vue')
  },
  {
    path:'/tabs/',
    name:'Tabs',
    component:Tabs,
    children:[
      {
        path:'',
        redirect:'/tabs/accueil'
      },
      {
        path:'accueil',
        component:() => import('@/views/Accueil.vue')
      },
      {
        path:'notifications',
        component:() => import('@/views/Notifications.vue')
      },
      {
        path:'profil',
        component:() => import('@/views/Profil.vue')
      },
      {
        path:'reglages',
        component:() => import('@/views/Reglages.vue')
      },
      {
        path:'map',
        component:() => import('@/views/Map.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
