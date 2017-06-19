<template>
  <div class="register-view">
  <div class="demo-step-container">
  <mu-stepper :activeStep="activeStep">
    <mu-step>
      <mu-step-label>
        输入您的邮箱
      </mu-step-label>
    </mu-step>
    <mu-step>
      <mu-step-label>
        设置密码
      </mu-step-label>
    </mu-step>
    <mu-step>
      <mu-step-label>
        注册成功
      </mu-step-label>
    </mu-step>
  </mu-stepper>
  <div class="demo-step-content">
    <template v-if="!finished">
      <div v-if="activeStep == 0" class="register-step-one">
        <mu-text-field class="emailText" v-model="registerEmail" label="输入邮箱" :errorText="errorEmailText" labelFloat/>
        <mu-raised-button :label="sendButtonText" @click="sendEmailCaptcha" class="demo-raised-button" :disabled="sendButtonActive" primary/>
        <mu-text-field v-model="registerEmailCaptcha" @textOverflow="handleInputOverflow" label="输入邮箱验证码" :errorText="errorEmailCaptchaText" :maxLength="4" labelFloat/>
      </div>
      <div v-if="activeStep == 1" class="register-step-two">
        <mu-text-field v-model.trim="registerPass" label="输入密码" :errorText="errorPassText" type="password" labelFloat/>
        <div v-if="registerPass" class="password-score">
            <div v-if="countPassword <= 1" class="password-weak"></div>
            <div v-if="countPassword > 1 && countPassword <= 3" v-text=""class="password-medium"></div>
            <div v-if="countPassword == 4" class="password-strong"></div>
        </div>
        <mu-text-field v-model="registerRePass" label="再次输入" :errorText="errorRePassText" type="password" labelFloat/>
      </div>
      <div v-if="activeStep == 2" class="register-step-three">
        <span>恭喜您已经完成注册</span>
      </div>
      <div class="register-button">
        <mu-flat-button class="demo-step-button" label="上一步" :disabled="activeStep === 0 || activeStep === 2" @click="handlePrev"/>
        <mu-raised-button class="demo-step-button" :label="activeStep === 2 ? '完成' : '下一步'" primary @click="handleNext" :disabled="buttonActive"/>
      </div>
    </template>
  </div>
</div>
  </div>
</template>

<script>
import captchaApi from '../api/captchaApi'
import userApi from '../api/userApi'

export default {
  name: 'register-view',
  data () {
    return {
      msg: '这是注册页面',
      activeStep: 0,
      registerEmail: '',
      registerEmailCaptcha: '',
      registerPass: '',
      registerRePass: '',
      errorEmailText: '',
      errorEmailCaptchaText: '',
      errorPassText: '',
      errorRePassText: '',
      buttonActive: false,
      sendButtonActive: false,
      sendButtonText: '发送'
    }
  },
  created () {
    this.buttonActiveControl()
  },
  watch: {
    registerEmailCaptcha: function (val) {
      let _this = this
      console.log(this.registerEmailCaptcha)
      if (this.registerEmailCaptcha.length == 4) {
        captchaApi.vaildEmailCaptcha(this.registerEmail, this.registerEmailCaptcha)
          .then(function (response) {
            _this.buttonActive = false
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
            _this.buttonActive = true
            _this.$notify.error({
              title: '错误',
              message: '验证码不对哟~~~'
            })
          })
      } else {
        _this.buttonActive = true
      }
    },
    registerEmail: function (val) {
      if (val == '') {
        this.sendButtonActive = true
      } else {
        let _this = this
        userApi.getUserByEmail(this.registerEmail)
          .then(function (res) {
            if (res.data.result) {
              _this.sendButtonActive = true
              _this.sendButtonText = '您已注册'
            } else {
              _this.sendButtonActive = false
            }
          })
      }
    }
  },
  computed: {
    finished () {
      return this.activeStep > 2;
    },
    countPassword () {
      var variations = {
        digits: /\d/.test(this.registerPass),
        lower: /[a-z]/.test(this.registerPass),
        upper: /[A-Z]/.test(this.registerPass),
        charactor: /[\^\%\&\'\,\;\=\?\$\*\x22]+/.test(this.registerPass)
      }

      var variationCount = 0
      for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0
      }
      return variationCount
    }
  },
  methods: {
    handleNext () {
      var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.activeStep == 0) {
        if (this.registerEmail == '') {
          this.errorEmailText = '请输入您的邮箱'
        } else if (!emailRe.test(this.registerEmail)) {
          this.errorEmailText = '邮箱格式不正确'
        }else {
          this.activeStep++
        }
      } else if (this.activeStep == 1) {
        if (this.registerPass == '') {
          this.errorPassText = '请设置您的密码'
        } else if (this.registerRePass == '') {
          this.errorRePassText = '请再次输入以确认密码'
        } else if (this.registerPass != this.registerRePass) {
          this.errorRePassText = '两次密码输入不一致'
        }  else {
          this.activeStep++
        }
      } else if (this.activeStep == 2) {
        // 演示用
        // 登录状态15天后过期
        // let expireDays = 1000 * 60 * 60 * 24 * 15
        // let value = this.registerEmail
        // this.setCookie('session', value, expireDays)

        let _this = this
        userApi.addUser(this.registerEmail, this.registerPass)
          .then(function (response) {
            console.log(response)
            _this.$notify.success({
              title: '成功',
              message: '注册成功'
            })
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              title: '错误',
              message: '注册失败'
            })
          })
        // 登录成功后
        this.$router.push('/')
      }
    },
    handlePrev () {
      this.clearText();
      this.activeStep--;
    },
    reset () {
      this.activeStep = 0
    },
    clearText () {
      this.errorEmailText = '';
      this.errorPassText = '';
      this.errorRePassText = '';
      this.registerPass = '';
      this.registerRePass = '';
    },
    sendEmailCaptcha () {
      let _this = this
      captchaApi.getEmailCaptcha(this.registerEmail)
        .then(function (response) {
          console.log(response);
          _this.sendButtonActive = true
          _this.sendButtonTextTime()
        })
        .catch(function (error) {
          console.log(error)
          _this.$notify.error({
            title: '错误',
            message: '发送邮件失败'
          })
        })
    },
    handleInputOverflow (isOverflow) {
      this.errorEmailCaptchaText = isOverflow ? '超过啦！！！！' : ''
    },
    buttonActiveControl () {
      if (this.registerEmailCaptcha == '') {
        this.buttonActive = true
      }
      if (this.registerEmail == '') {
        this.sendButtonActive = true
      }
    },
    sendButtonTextTime () {
      let _this = this
      let time = 60
      let interval = setInterval(function () {
        if (time > 0) {
          time = time - 1
          _this.sendButtonText = time + 'S'
        } else {
          _this.sendButtonText = '发送'
          _this.sendButtonActive = false
          clearInterval(interval);
        }
      }, 1000);
    }
  }
}
</script>

<style lang="stylus" scoped>
.register-view
  margin-top 50px
  
.demo-step-container 
  width 100%
  max-width 700px
  margin auto

.demo-step-content 
  margin 0  16px

.demo-step-button 
  margin-top 12px
  margin-left 20px
  
.register-step-one
  width 280px
  height 150px
  margin 0px auto
  
.register-step-two
  width 300px
  margin 0px auto
  
 .register-step-two
    .password-score
      height 15px
      width 255px
      border 1px solid #ccc
      .password-weak
        height 15px
        width 85px
        background-color red
      .password-medium
        height 15px
        width 165px
        background-color orange
      .password-strong
        height 15px
        width 255px
        background-color green
            
.register-step-three
  width 300px
  margin-left 220px
  
.register-button
  width 300px
  margin 0px auto
  
.emailText
  width 160px
</style>
