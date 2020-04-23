// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import kPopup from '../static/js/kPopup.js'
import '../static/css/style.css'
import store from './store/store'
import decryptDes from '../static/js/des.js'
import api from './http' // 导入api接口
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api

Vue.use(kPopup)
Vue.use(decryptDes)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
