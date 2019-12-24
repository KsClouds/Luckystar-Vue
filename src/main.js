// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import kPopup from '../static/js/kPopup.js'
import '../static/css/style.css'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$store = store
// Vue.prototype.HOME = '/api'
// Vue.prototype.HOME = 'http://localhost:9000'

Vue.use(kPopup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('BEFORE')
  debugger
  if (to.matched.some(m => m.meta.requireAuth)) { // 需要登录
    if (window.localStorage.token && window.localStorage.isLogin === '1') {
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token
      if (token === 'null' || token === '' || token === undefined) {
        next({path: '/login'})
        alert('检测到您还未登录,请登录后操作！')
      }
    } else {
      next()
    }
  } else { // 不需要登录
    next()
  }
})

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common['token'] = store.state.token
    }
    return config
  },
  error => {
    // 对请求错误做什么
    return Promise.reject(error)
  })

// http reponse响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          router.replace({
            path: '/views/login',
            query: {redirect: router.currentRoute.fullPath} // 登录成功后跳入浏览的当前页面
          })
      }
    }
  }
)
