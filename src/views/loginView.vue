<template>
  <div class="login-view">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账户" prop="account">
      <el-input v-model="ruleForm.account"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="ruleForm.captcha" type="captcha" class="captchaInput"></el-input>
      <captcha></captcha>
    </el-form-item>
    <el-form-item class="inputButton">
      <el-button type="primary" @click="userLogin('ruleForm')">登录</el-button>
      <el-button @click="register()">注册</el-button>
    </el-form-item>
  </el-form>
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
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
           { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      if (this.ruleForm.account !== '' && this.ruleForm.password !== '') {
        this.toLogin()
      }
    },
    toLogin () {
      this.userInfo = {
        email: this.ruleForm.account
      }
      // 登录状态15天后过期
      let expireDays = 1000 * 60 * 60 * 24 * 15

      let _this = this
      authApi.login(this.ruleForm.account, this.ruleForm.password, this.ruleForm.captcha)
        .then(function (response) {
          if (response.data.code == 1) {
            let userInfo = {
              email: _this.ruleForm.account,
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
    userLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    register () {
      this.$router.push('/register')
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
  width 200px
  float left
</style>
