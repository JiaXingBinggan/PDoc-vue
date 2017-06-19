<template>
  <div class="login-view">
  <mu-flexbox class="mt8" orient="vertical">
    <mu-flexbox-item class="flex-demo">
      <mu-text-field hintText="账户" :errorText="accountErrorText" icon="person" v-model="account"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      <mu-text-field hintText="密码" :errorText="passErrorText" icon="lock" type="password" v-model="password"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo-captcha">
      <mu-text-field hintText="验证码" :errorText="captchaErrotText" icon="message" v-model="captcha" @textOverflow="captchaInputOverflow" :maxLength="6" class="captchaInput"/>
      <captcha></captcha>
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo-button">
      <mu-raised-button label="注册" class="demo-raised-button" @click="register"/>
      <mu-raised-button label="登录" class="demo-raised-button" @click="login" primary/>
    </mu-flexbox-item>
  </mu-flexbox>
  </div>
</template>

<script>
import captcha from '../components/captcha/captcha.vue'
import authApi from '../api/authApi'

export default {
  name: 'login-view',
  components: {
    captcha
  },
  data () {
    return {
      account: '',
      password: '',
      captcha: '',
      accountErrorText: '',
      passErrorText: '',
      captchaErrotText: ''
    }
  },
  methods: {
    login () {
      if (this.account !== '' && this.password !== '' && this.captcha) {
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

      let _this = this
      authApi.login(this.account, this.password, this.captcha)
        .then(function (response) {
          if (response.data.code == 1) {
            let userInfo = {
              email: _this.account,
              uid: response.data.uid
            }
            _this.setCookie('uid', response.data.uid, expireDays)
            _this.$store.commit('DOLOGIN', userInfo)
            // 登录成功后
            _this.$router.push('/')
          } else {
            _this.$notify.error({
              title: '错误',
              message: response.data.msg
            })
          }
        })
    },
    register () {
      this.$router.push('/register')
    },
    captchaInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
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
  width 185px
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
  padding-left 40px
</style>
