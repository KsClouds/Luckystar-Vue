<template>
  <div id="app">
    <div id="mobile-bar">
      <a class="menu-button"></a>
      <a class="logo" href="/"></a>
    </div>
    <div id="header">
      <a id="logo" href="/">
        <img src="./assets/amy.gif">
        <!-- <span>KのTools</span> -->
        <span>Luckystar</span>
      </a>
      <ul id="nav">
        <li>
          <form id="search-form">
            <input placeholder="暂无该功能" type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" aria-label="搜索" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style=""><pre aria-hidden="true" style="position: absolute; visibility: hidden; white-space: pre; font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
          </form>
        </li>
        <li class="nav-dropdown-container learn">
          <a class="nav-link current">学习</a><span class="arrow"></span>
            <ul class="nav-dropdown">
              <li><h4>文档</h4></li>
              <li>
                <ul>
                  <li><a href="/v2/guide/" class="nav-link current">教程</a></li>
                  <li><a href="/v2/api/" class="nav-link">API</a></li>
                  <li><a href="/v2/style-guide/" class="nav-link">风格指南</a></li>
                  <li><a href="/v2/examples/" class="nav-link">示例</a></li>
                  <li><a href="/v2/cookbook/" class="nav-link">Cookbook</a></li>
                </ul>
              </li>
            <li><h4>视频教程</h4></li>
            <li>
              <ul>
                <li><a href="https://www.vuemastery.com/courses/" class="nav-link" target="_blank" rel="sponsored noopener">Vue Mastery (英文)</a></li>
                <li><a href="https://vueschool.io/?friend=vuejs&amp;utm_source=Vuejs.org&amp;utm_medium=Link&amp;utm_content=Navbar%20Dropdown" class="nav-link" target="_blank" rel="noopener">Vue School (英文)</a></li>
                <li><a href="https://learning.dcloud.io/" class="nav-link" target="_blank" rel="sponsored noopener">DCloud 视频教程</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-dropdown-container ecosystem">
          <a class="nav-link">生态系统</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li><h4>帮助</h4></li>
            <li><ul>
              <li><a href="https://forum.vuejs.org/" class="nav-link" target="_blank" rel="noopener">论坛</a></li>
              <li><a href="https://chat.vuejs.org/" class="nav-link" target="_blank" rel="noopener">聊天室</a></li>
              <li><a href="https://events.vuejs.org/meetups/" class="nav-link" target="_blank" rel="noopener">聚会</a></li>
            </ul></li>
            <li><h4>工具</h4></li>
            <li>
              <ul>
                <li><a href="https://github.com/vuejs/vue-devtools" class="nav-link" target="_blank" rel="noopener">Devtools</a></li>
                <li><a href="https://cli.vuejs.org/zh/" class="nav-link" target="_blank" rel="noopener">Vue CLI</a></li>
                <li><a href="https://vue-loader.vuejs.org/zh/" class="nav-link" target="_blank" rel="noopener">Vue Loader</a></li>
              </ul>
            </li>
            <li><h4>核心插件</h4></li>
            <li><ul>
              <li><a href="https://router.vuejs.org/zh/" class="nav-link" target="_blank" rel="noopener">Vue Router</a></li>
              <li><a href="https://vuex.vuejs.org/zh/" class="nav-link" target="_blank" rel="noopener">Vuex</a></li>
              <li><a href="https://ssr.vuejs.org/zh/" class="nav-link" target="_blank" rel="noopener">Vue 服务端渲染</a></li>
            </ul></li>
            <li><h4>信息</h4></li>
            <li><ul>
              <li><a href="https://news.vuejs.org" class="nav-link" target="_blank" rel="noopener">周刊</a></li>
              <li><a href="https://github.com/vuejs/vue/projects/6" class="nav-link" target="_blank" rel="noopener">Roadmap</a></li>
              <li><a href="https://events.vuejs.org/" class="nav-link" target="_blank" rel="noopener">活动</a></li>
              <li><a href="https://twitter.com/vuejs" class="nav-link" target="_blank" rel="noopener">Twitter</a></li>
              <li><a href="https://medium.com/the-vue-point" class="nav-link" target="_blank" rel="noopener">博客</a></li>
              <li><a href="https://vuejobs.com/?ref=vuejs" class="nav-link" target="_blank" rel="noopener">工作</a></li>
            </ul></li>
          </ul>
        </li>
        <li>
          <a href="/v2/guide/team.html" class="nav-link team">团队</a>
        </li>
        <li class="nav-dropdown-container resources">
          <a href="#" class="nav-link">资源列表</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li><a href="/resources/partners.html" class="nav-link">合作伙伴</a></li>
            <li><a href="/resources/themes.html" class="nav-link">主题</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" class="nav-link" target="_blank">Awesome Vue</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- main page start -->
    <div id='main' class='fix-sidebar'>
      <!-- left start -->
      <div class="sidebar">
        <div class="sidebar-inner">
          <div class="list">
            <h2>
              教程
              <select class="version-select">
                <option value="SELF" selected="">2.x</option>
                <option value="v1">1.0</option>
                <option value="012">0.12</option>
                <option value="011">0.11</option>
              </select>
            </h2>
            <ul class="menu-root">
              <li>
                <router-link to="QRCode" >生成二维码</router-link>
              </li>
              <li><h3>工具</h3></li>
              <li>
                <router-link to="HelloWorld" >HelloWorld</router-link>
              </li>
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    popup (str) {
      var div = '<div class="mark"></div>'
      this.$('body').append(div)
      this.$('.mark').html(str)
      this.$('.mark').show()
      setTimeout(function () {
        this.$('.mark').hide()
        this.$('.mark').remove()
      }, 2000)
    }
  }
}
</script>

<style>
.mark {
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
    margin-left: 290px;
}
.content {
  position: relative;
  padding: 35px 0;
  /* max-width: 700px; */
  margin: 0 auto;
  padding-left: 50px;
  /* border: 2px; */
  /* border-style:solid; */
  /* border-color:#000000; */
}

/* sidebar */
.sidebar {
    position: absolute;
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
/* sidebar */
#main {
    position: relative;
    z-index: 1;
    padding: 0 60px 30px;
    overflow-x: hidden;
}
body #header {
  position: fixed;
  width: 100%;
  top: 0;
}
#header {
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
}
#header {
  background-color: #fff;
  height: 40px;
  padding: 10px 60px;
  position: relative;
  z-index: 20;
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
.search-query {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 15px 0 30px;
  border: 1px solid #e3e3e3;
  color: #273849;
  outline: none;
  border-radius: 15px;
  margin-right: 10px;
  transition: border-color 0.2s ease;
  background: #fff url(./assets/search.png) 8px 5px no-repeat;
  background-size: 20px;
  vertical-align: middle !important;
}
img {
  border: none;
}
</style>
