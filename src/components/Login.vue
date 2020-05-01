<template>
  <div class="login" id="login" style="height: 364px;">
    <div class="headerClose">
      <a class="close" id="close" title="关闭" tabindex="14" @click='closeLogin()'></a>
    </div>
    <div class="error_tips" id="error_tips" style="display: none;">
      <span class="error_logo" id="error_logo"></span>
      <span class="err_m" id="err_m"></span>
    </div>
    <div class="loading_tips" id="loading_tips" style="visibility: hidden">
      <span id="loading_wording">登录中</span>
      <img id="loading_img" src="../assets/load.gif" alt="加载中">
    </div>

    <div class="web_qr_login" id="web_qr_login" style="display: block;">
      <div class="web_qr_login_show" id="web_qr_login_show">
        <div class="web_login" id="web_login">
          <div class="tips" id="tips">
            <span class="title" id="title_2">Login</span>
          </div>

          <div class="login_form">
              <div class="uinArea" id="uinArea">
                <!-- <div class="inputOuter"> -->
                  <input type="text" class="inputstyle" id="userCode" maxlength="8" tabindex="1" placeholder="账号">
                  <a class="uin_del" style="display: block;" @click="delUserCode()"></a>
                <!-- </div> -->
              </div>
              <div class="pwdArea" id="pwdArea">
                <!-- <div class="inputOuter"> -->
                  <input type="password" class="inputstyle password" id="password" maxlength="16" tabindex="2" placeholder="密码">
                  <a class="uin_del" style="display: block;" @click="delPassword()"></a>
                <!-- </div> -->
                <div class="lock_tips" id="caps_lock_tips" style="display: none;">
                  <span class="lock_tips_row"></span>
                  <span>大写锁定已打开</span>
                </div>
              </div>
              <div class="verifyArea" id="verifyArea">
                <div class="verifyinputArea" id="verifyinputArea">
                  <label class="input_tips" id="vc_tips" for="verifycode">验证码</label>
                  <div class="inputOuter">
                    <input name="verifycode" type="text" class="inputstyle verifycode" id="verifycode" value="" tabindex="3">
                  </div>
                </div>
                <div class="verifyimgArea" id="verifyimgArea">
                  <img class="verifyimg" id="verifyimg" title="看不清，换一张">
                  <a tabindex="4" class="verifyimg_tips">看不清，换一张</a>
                </div>
              </div>
              <div class="submit">
                <a class="login_button" hidefocus="true">
                  <input type="submit" tabindex="6" value="登 录" class="btn" id="login_button" @click='loginAndRegister()'>
                </a>
              </div>
            <!-- </form> -->
          </div>
        </div>

<!--        <div class="bottom" id="bottom_web" style="display: block;">-->
<!--          <a class="link" id="forgetpwd" target="_blank">忘了密码？</a>-->
<!--          <span class="dotted">|</span>-->
<!--          <a class="link" target="_blank">注册新帐号</a>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    closeLogin () {
      $('#userCode').val('')
      $('#password').val('')
      $('#loginDiv').hide()
      $('#_overlay_').hide()
    },
    loginAndRegister () {
      let _this = this
      var userCode = $('#userCode').val()
      var password = $('#password').val()
      if (userCode === '' || password === '') {
        alert('请输入账号密码')
        return
      }
      var param = {
        userCode: userCode,
        password: password
      }
      param = _this.encryptDes(JSON.stringify(param))
      _this.$api.login.login(param).then(res => {
        if (res == null) {
          alert('登录失败')
          $('#loading_tips').attr('style', 'visibility: hidden')
          return
        }
        if (res.code === 0) {
          _this.$store.commit('$_setToken', res.data.token)
          _this.$store.commit('$_setUserCode', userCode)
          _this.closeLogin()
          window.location.reload()
        } else {
          alert(res.msg)
        }
        $('#loading_tips').attr('style', 'visibility: hidden')
      })
      $('#loading_tips').attr('style', 'visibility: visible')
    },
    delUserCode () {
      $('#userCode').val('')
    },
    delPassword () {
      $('#password').val('')
    }
  }
}
</script>

<style>
.login {
  background-color: #FFFFFF;
  margin: 0 auto;
  border: 2px solid #eee;
  position: relative;
  height: 100%;
  max-width: 100%;
  border-radius: 10px;
}
.headerClose {
  height: 50px;
  width: 50px;
  position: absolute;
  top: 0;
  right: 0;
  font-family: "微软雅黑";
  z-index: 1000;
}
.close {
  width: 47px;
  height: 20px;
  float: right;
  background: url(../../static/img/icon_3_8.png) -221px -126px no-repeat;
  outline: 0;
}
.web_qr_login {
  position: relative;
  overflow: hidden;
  /* height: 100%; */
  height: 345px;
}
.web_qr_login_show {
  top: 0;
  height: 100%;
}
.web_login {
  position: relative;
  height: 100%;
  top: 50%;
  margin-top: -150px;
}
.web_login .tips {
  position: relative;
  margin: 0 auto 36px;
  z-index: 11;
  font-size: 16px;
  color: #666;
  text-align: center;
}
.web_login .login_form {
  width: 272px;
  margin: 0 auto;
}
.web_login .uinArea {
  height: 55px;
  position: relative;
  z-index: 10;
}
.web_login .inputstyle {
  width: 258px;
  position: relative;
  top: 2px;
  left: 2px;
  height: 18px;
  padding: 10px 0 10px 10px;
  line-height: 18px;
  border: none;
  background: 0 0;
  color: #333;
  font-family: Verdana,Tahoma,Arial;
  font-size: 16px;
  border-radius: 25px;
}
.web_login .uin_del {
  width: 21px;
  height: 21px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 10px;
  background: url(../../static/img/icon_3_8.png) -116px -160px no-repeat;
  display: none;
}
.web_login .pwdArea {
  height: 55px;
  position: relative;
  z-index: 3;
}
.web_login .verifyArea {
  display: none;
  height: 120px;
  position: relative;
}
.web_login .verifyinputArea {
  height: 55px;
}
.web_login .verifyimgArea {
  position: relative;
  height: 55px;
  cursor: pointer;
}
.web_login .verifyimgArea .verifyimg {
  height: 55px;
  width: 150px;
  position: absolute;
  left: 0;
}
.web_login .verifyimgArea .verifyimg_tips {
  position: absolute;
  left: 165px;
  top: 15px;
  color: #000;
}
.web_login .submit {
  position: relative;
  height: 40px;
  background-color: #57b846;
  border-radius: 25px;
}
.web_login .login_button {
  position: absolute;
  left: 0;
  outline: 0;
  width: 100%;
}
.web_login .login_button .btn {
  width: 100%;
  height: 40px;
  line-height: 35px;
  border: none;
  font-size: 17px;
  font-weight: 400;
  font-family: "Microsoft Yahei","微软雅黑",SimHei,"黑体","Hiragino Sans GB",STHeiTi,sans-serif;
  color: #fff;
  background: 0 0;
  cursor: pointer;
  border-radius: 25px;
}
.bottom {
  height: 16px;
  margin-bottom: 8px;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 10px;
  text-align: right;
  font-size: 12px;
}
.bottom .link {
  color: #666;
}
.bottom .dotted {
  color: #bfbfbf;
  margin: 0 5px;
}
</style>
