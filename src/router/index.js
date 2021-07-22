import Vue from 'vue'
import Router from 'vue-router'
import Tip from '../components/Tip.vue'
import QRCode from '@/components/QRCode'
import Novel from '@/components/Novel'
import Doupo from '@/components/Doupo'
import Encrypt from '@/components/Encrypt'
import Animation from '@/components/Animation'
import StudyMaterial from '@/components/StudyMaterial'
import NovelStar from '@/components/NovelStar'
import Red from '@/components/Red'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tip
    },
    {
      path: '/QRCode',
      name: 'QRCode',
      component: QRCode
    },
    {
      path: '/Tip',
      name: 'Tip',
      component: Tip
    },
    {
      path: '/Novel',
      name: 'Novel',
      component: Novel
    },
    {
      path: '/NovelStar',
      name: 'NovelStar',
      component: NovelStar
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
    },
    {
      path: '/Animation',
      name: 'Animation',
      component: Animation
    },
    {
      path: '/StudyMaterial',
      name: 'StudyMaterial',
      component: StudyMaterial
      // meta: {
      //   requireAuth: true
      // }
    },
    {
      path: '/Red',
      name: 'Red',
      component: Red
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
