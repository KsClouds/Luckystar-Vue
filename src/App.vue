<template>
  <div id="app">
    <div id="loginDiv" data-milodialog="1" role="dialog" tabindex="-1" @mousewheel.prevent @touchmove.prevent>
      <login></login>
    </div>
    <!-- content -->
    <div>
      <div id="mobile-bar">
        <a class="menu-button" @click="showMenu()"></a>
        <a class="mobile-title">らき☆すた</a>
        <a class="login" @click="login()"></a>
      </div>
      <div id="header">
        <a id="logo" @click='hideOrShow()'>
          <img src="./assets/amy.gif">
          <span>らき☆すた</span>
        </a>
        <ul id="nav">
          <li>
            <a class="nav-link team" @click='login()'>登录</a>
          </li>
        </ul>
      </div>
      <!-- main page start -->
      <div id='main' class='fix-sidebar'>
        <!-- left start -->
        <div class="sidebar">
          <div class="sidebar-inner">
            <div class="menu-list">
              <h2>⭐幸运星&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
              <ul class="menu-root">
                <li><h3>🔧工具</h3></li>
                <li @click="showMenu()"><router-link to="Tip" >Tips</router-link></li>
                <li @click="showMenu()"><router-link to="QRCode" >生成二维码</router-link></li>
                <li @click="showMenu()"><router-link to="StudyMaterial" >学习资料</router-link></li>
                <li><h3>🐋娱乐</h3></li>
                <li @click="showMenu()"><router-link to="Novel" >小说</router-link></li>
                <li @click="showMenu()"><router-link to="Doupo" >漫画</router-link></li>
                <li @click="showMenu()"><router-link to="Animation">动画</router-link></li>
                <li><h3>💻CRM</h3></li>
                <li @click="showMenu()"><router-link to="Encrypt">加解密</router-link></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- left end -->
        <!-- right start -->
        <div class="content guide with-sidebar instance-guide">
          <router-view></router-view>
        </div>
        <!-- right end -->
      </div>
      <!-- main page end -->
      <div id="_overlay_" @mousewheel.prevent @touchmove.prevent></div>
      <div id="loading" @mousewheel.prevent @touchmove.prevent>
        <img src="../static/img/loading.gif">
      </div>
    </div>
    <!-- content -->
    <notifications group="foo" />
  </div>
</template>

<script>
import $ from 'jquery'
import Login from '@/components/Login.vue'
import mqtt from 'mqtt'
import store from './store/store'

export default {
  name: 'app',
  components: {Login},
  created () {
    var userCode = store.state.userCode
    if (userCode) {
      setTimeout(() => $('.team').html(userCode))
    }
    this.mqttMSG(userCode)
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-z16/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: './static/live2dw/live2d-widget-model-z16/assets/z16.model.json' },
        display: { position: 'right', width: 200, height: 380 },
        mobile: { show: false },
        log: false
      })
    }, 1000)
  },
  methods: {
    login () {
      $('#loginDiv').show()
      $('#_overlay_').show()
    },
    hideOrShow () {
      var isShow = $('.content').css('margin-left') !== '0px'
      if (isShow) {
        $('.sidebar').hide()
        $('.content').css('margin-left', '0px')
      } else {
        $('.sidebar').show()
        $('.content').css('margin-left', '200px')
      }
    },
    showMenu () {
      var sidebar = $('.sidebar')
      if (sidebar.hasClass('open')) {
        sidebar.removeClass('open')
      } else {
        sidebar.addClass('open')
      }
    },
    mqttMSG (userCode) {
      var uuID = this.generateUUID()
      const options = {
        connectTimeout: 40000,
        clientId: 'mqttID_' + userCode + '_' + uuID,
        clean: true,
        reconnect: true,
        reconnectInterval: 10
      }

      var client = mqtt.connect('ws://111.230.25.75:8083/mqtt', options)
      // mqtt连接
      client.on('connect', (e) => {
        console.log('连接成功:')
        client.subscribe(['/mqtt/' + userCode, '/mqtt/all'], { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息', message.toString())
        this.msg = message.toString()
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: message.toString()
        })
      })
      // 断开发起重连
      client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    },
    generateUUID () {
      var d = new Date().getTime()
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }
  }
}
</script>

<style>
.mobile-title {
  position: absolute;
  width: 100px;
  height: 30px;
  top: 5px;
  left: 50%;
  margin-left: -50px;
  background-size: 30px;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
#loading {
  height: 100%;
  width: 100%;
  z-index: 10003;
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: rgb(0, 0, 0);
  opacity: 0.7;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-transform: translate(0, -100%);
  transform: translate(0, -100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
}
#loading.loading {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
#_overlay_ {
  display: none;
  background-color: rgb(0, 0, 0);
  position: fixed;
  height: 100%;
  z-index: 10001;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0.7;
}
.mark {
  z-index: 10002;
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 0.88rem;
  line-height: 0.88rem;
  width: 80%;
  text-align: center;
  font-size: 0.28rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.1rem;
}
.content.with-sidebar {
    margin-left: 200px;
}
.content {
  position: relative;
  padding: 35px 0;
  max-width: 700px;
  margin: 0 auto;
  padding-left: 50px;
}

/* sidebar start */
.sidebar {
  position: fixed;
  z-index: 10;
  top: 61px;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}
.sidebar li {
  margin-top: 0.5em;
}
.sidebar a {
  margin-left: 1em;
}
.sidebar a:hover {
  border-bottom: 2px solid #42b983;
}
.sidebar ul {
    list-style-type: none;
    margin: 0;
    line-height: 1.5em;
    padding-left: 1em;
}
.sidebar .sidebar-link {
    color: #4f5959;
}
.sidebar .sidebar-link.current {
    font-weight: 600;
    color: #42b983;
}

#main.fix-sidebar {
  position: static;
}
/* sidebar end */
#main {
    position: relative;
    z-index: 1;
    /* padding: 0 60px 30px; */
    overflow-x: hidden;
}
body #header {
  position: fixed;
  width: 100%;
  top: 0;
}
#header {
  background-color: #fff;
  height: 40px;
  padding: 10px;
  position: relative;
  z-index: 20;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
}
#nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 30px;
    top: 10px;
    height: 40px;
    line-height: 40px;
}
body.docs #nav {
  position: fixed;
}
#nav .nav-link {
  cursor: pointer;
}
.nav-link.current {
  border-bottom: 3px solid #42b983;
}
.nav-link {
  padding-bottom: 3px;
  white-space: nowrap;
}
#nav .nav-dropdown-container .arrow {
  pointer-events: none;
}
#nav .arrow {
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #4f5959;
}
#nav .nav-dropdown {
  display: none;
  box-sizing: border-box;
  max-height: calc(100vh - 61px);
  overflow-y: auto;
  position: absolute;
  top: 100%;
  right: -15px;
  background-color: #fff;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  text-align: left;
  border-radius: 4px;
  white-space: nowrap;
}
#nav .nav-dropdown li {
  line-height: 1.8em;
  margin: 0;
  display: block;
}
#nav li {
  display: inline-block;
  position: relative;
  margin: 0 0.6em;
}
#nav .nav-dropdown li:first-child h4 {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}
#nav .nav-dropdown h4 {
  margin: 0.45em 0 0;
  padding-top: 0.45em;
  border-top: 1px solid #eee;
}
#nav .nav-dropdown a, #nav .nav-dropdown h4 {
  padding: 0 24px 0 20px;
}
h1, h2, h3, h4, strong {
  font-weight: 600;
  color: #273849;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
#logo {
  display: inline-block;
  font-size: 1.5em;
  line-height: 40px;
  color: #273849;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
}
a {
  text-decoration: none;
  color: #304455;
}
#logo img {
  vertical-align: middle;
  margin-right: 6px;
  width: 40px;
  height: 40px;
}
img {
  border: none;
}
#loginDiv {
  height: 368px;
  width: 622px;
  max-width: 90%;
  border: 0px;
  position: fixed;
  z-index: 10002;
  display: none;
  visibility: visible;
  justify-content: center;
  margin: 0 auto;
  left: 0;
  right: 0;
}
#mobile-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #fff;
  z-index: 20;
  display: none;
  box-shadow: 0 0 2px rgba(0,0,0,0.25);
}
#mobile-bar .menu-button {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 8px;
  left: 12px;
  background: url(../static/img/menu.png) center center no-repeat;
  background-size: 24px;
}
#mobile-bar .login {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 8px;
  right: 12px;
  background: url(../static/img/login.png) center center no-repeat;
  background-size: 24px;
}
body.docs {
  padding-top: 61px;
}
@media screen and (max-width: 600px) {
  #header {
    display: none;
  }
  #mobile-bar {
    display: block;
  }
  .sidebar.open {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  .sidebar {
      position: fixed;
      background-color: #f9f9f9;
      height: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
      -webkit-transform: translate(-380px, 0);
      transform: translate(-380px, 0);
  }
  .sidebar .sidebar-inner {
      padding: 60px 10px 30px 20px;
      box-sizing: border-box;
  }
  .content {
      padding-left: 0;
  }
  .content.with-sidebar {
      margin: auto;
  }
  #main {
      /* padding: 2em 1.4em 0; */
  }
  body.docs {
      padding-top: 0;
  }
  body {
      -webkit-text-size-adjust: none;
      font-size: 14px;
  }
  #loginDiv {
    top: 50px;
    bottom: 50px;
    height: 100%;
  }
}
</style>
