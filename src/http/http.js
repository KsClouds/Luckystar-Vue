/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router'
import store from '../store/store'
import { Toast } from 'vant'
import $ from 'jquery'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

router.beforeEach((to, from, next) => {
  console.log(store)
  var luckystore = store
  if (to.matched.some(m => m.meta.requireAuth)) { // 需要登录
    if (luckystore.state.token) {
      next()
    } else if (to.path !== '/login') {
      let token = luckystore.state.token
      if (token === 'null' || token === '' || token === undefined) {
        // next({path: '/login'})
        alert('检测到您还未登录,请登录后操作！')
      }
    } else {
      next()
    }
  } else { // 不需要登录
    next()
  }
})

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 30
})

instance.defaults.headers.common['Authentication-Token'] = store.state.token
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
// 登录流程控制中，根据本地是否存在token判断用户的登录情况
// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
// 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作.
instance.interceptors.request.use(
  config => {
    // const token = store.state.token
    // token && (config.headers.token = token)
    $('#loading').addClass('loading')
    config.headers.common['token'] = store.state.token
    // config.headers.token = token
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    $('#loading').removeClass('loading')
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  // 请求失败
  error => {
    $('#loading').removeClass('loading')
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('changeNetwork', false)
      var res = {
        msg: '请求超时，请重试'
      }
      return Promise.resolve(res)
    }
  })

export default instance
