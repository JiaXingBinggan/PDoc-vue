<template>
  <div calss="captcha">
      <div class="code" @click="getCaptcha">{{captcha}}</div>
  </div>
</template>

<script>
import captchaApi from '../../api/captchaApi'

export default {
  name: 'captcha',
  data () {
    return {
      msg: '验证码',
      captcha: ''
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      var _this = this
      captchaApi.getImgCaptcha()
        .then(function (response) {
          console.log(response)
          _this.captcha = response.data.result
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.captcha
  width 300px
  height 50px
  float left
.code
  background url('../../assets/captchaback.png')
  font-family Arial
  font-style italic
  color blue
  font-size 20px
  border 0
  border-radius 5px
  letter-spacing 3px
  font-weight bolder           
  float left           
  cursor pointer
  width 100px
  height 35px
  line-height 35px
  text-align center
  vertical-align middle
</style>
