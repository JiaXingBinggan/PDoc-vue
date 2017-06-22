<template>
  <div class="login-view">
  <mu-flexbox class="mt8" orient="vertical">
    <mu-flexbox-item class="flex-demo">
      <mu-text-field hintText="账户" :errorText="accountErrorText" v-model="account"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      <mu-text-field hintText="密码" :errorText="passErrorText" type="password" v-model="password"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo-captcha">
      <!-- <mu-text-field hintText="验证码" :errorText="captchaErrorText" icon="message" v-model="captcha" @textOverflow="captchaInputOverflow" :maxLength="6" class="captchaInput"/> -->
      <!-- <captcha></captcha> -->
      <div id="captcha">
        <p id="wait" class="show">正在加载验证码......</p>
      </div>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo-button">
      <mu-raised-button label="注册" class="demo-raised-button" @click="register"/>
      <mu-raised-button label="登录" class="demo-raised-button" @click="login" primary/>
    </mu-flexbox-item>
  </mu-flexbox>
  </div>
</template>

<script>
// import captcha from '../components/captcha/captcha.vue'
import captchaApi from '../api/captchaApi'
import authApi from '../api/authApi'
import gtInit from '../assets/gt'
export default {
  name: 'login-view',
  // components: {
  //   captcha
  // },
  data () {
    return {
      account: '',
      password: '',
      // captcha: '',
      accountErrorText: '',
      passErrorText: '',
      captchaErrorText: '',
      gtCapValid: ''
    }
  },
  created () {
    this.initGtCaptcha()
  },
  methods: {
    login () {
      if (this.account == '') {
        this.accountErrorText = '请输入您的用户名'
      }
      if (this.password == '') {
        this.passErrorText = '请输入您的密码'
      }
      // if (this.captcha == '') {
      //   this.captchaErrorText = '请输入验证码'
      // }
      if (this.account !== '' && this.password !== '') {
        this.toLogin()
      } else {
        this.$notify.error({
          title: '错误',
          message: '您未正确填完登录信息!'
        })
      }
    },
    toLogin () {
      this.userInfo = {
        email: this.account
      }
      // 登录状态15天后过期
      let expireDays = 1000 * 60 * 60 * 24 * 15

      if (this.gtCapValid) {
        let _this = this
        authApi.login(this.account, this.password)
          .then(function (response) {
            if (response.data.code == 1) {
              console.log(response)
              let userInfo = {
                email: _this.account,
                name: response.data.result.name,
                uid: response.data.result.id
              }
              _this.setCookie('uid', response.data.result.id, expireDays)
              _this.$store.dispatch('dologin', userInfo)
              // 登录成功后
              _this.$router.push('/')
            } else {
              _this.$notify.error({
                title: '错误',
                message: response.data.msg
              })
            }
          })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请完成验证!'
        })
      }
    },
    register () {
      this.$router.push('/register')
    },
    captchaInputOverflow (isOverflow) {
      this.captchaErrorText = isOverflow ? '超过啦！！！！' : ''
    },
    initGtCaptcha () {
      var _this = this
      captchaApi.getGtCaptcha()
        .then(function(res) {
          console.log(gtInit)
          window.initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: res.data.new_captcha, // 用于宕机时表示是新验证码的宕机

              product: "float", // 产品形式，包括：float，popup
              width: "260px"
          }, function (captchaObj) {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                document.getElementById('wait').style.display = 'none';
            });
            captchaObj.onSuccess(function () {
              _this.gtCapValid = captchaObj.getValidate();
            })
            captchaObj.onError(function () {
                // 出错啦，可以提醒用户稍后进行重试
              _this.$notify.error({
                title: '错误',
                message: '出错啦，请稍后进行重试'
              })
            });
          });
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-view
  width 600px
  height 350px
  margin 0px auto 
  margin-top 50px
  padding-top 50px
  .inputButton
    margin-left 80px
.captchaInput
  width 165px
  float left
.mt8 
  margin-top 8px
.flex-demo 
  height 60px
  text-align center
  line-height 32px
.flex-demo-captcha
  padding-left 70px
.flex-demo-button
  height 60px
  line-height 32px
  text-align center
.inp
  border 1px solid #cccccc
  border-radius 2px
  padding 0 10px
  width 278px
  height 40px
  font-size 18px
.btn
  display inline-block
  box-sizing border-box
  border 1px solid #cccccc
  border-radius 2px
  width 100px
  height 40px
  line-height 40px
  font-size 16px
  color #666
  cursor pointer
  background white linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%)
.btn:hover
  background white linear-gradient(0deg, #ffffff 0%, #f3f3f3 100%)
#captcha
  width 300px
  height 60px
  display inline-block
label
  vertical-align top
  display inline-block
  width 80px
  text-align right
#wait
  text-align center
  color #666
  margin 0
</style>
