import { createRouter, createWebHistory } from '@ionic/vue-router';
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const verifyLogged = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const login = await Storage.get({ key: 'login' })
  if(login.value){
    next()
  }
  else{
    console.error('login before try to reach this route')
    next('/login')
  }
}

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
        component:() => import('@/views/Accueil.vue'),
        beforeEnter: verifyLogged
      },
      {
        path:'notifications',
        component:() => import('@/views/Notifications.vue'),
        beforeEnter: verifyLogged
      },
      {
        path:'profil',
        component:() => import('@/views/Profil.vue'),
        beforeEnter: verifyLogged
      },
      {
        path:'reglages',
        component:() => import('@/views/Reglages.vue'),
        beforeEnter: verifyLogged
      },
      {
        path:'map',
        component:() => import('@/views/Map.vue'),
        beforeEnter: verifyLogged
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
