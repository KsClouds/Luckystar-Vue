import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import QRCode from '@/components/QRCode'
import Star from '@/components/Star'
import Doupo from '@/components/Doupo'
import Encrypt from '@/components/Encrypt'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/QRCode',
      name: 'QRCode',
      component: QRCode,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Star',
      name: 'Star',
      component: Star,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Doupo',
      name: 'Doupo',
      component: Doupo
    },
    {
      path: '/Encrypt',
      name: 'Encrypt',
      component: Encrypt
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')

    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
