<template>
  <div calss="svg-captcha">
      <div id="svgCaptcha" @click="getSvgCaptcha"></div>
  </div>
</template>

<script>
import captchaApi from '../../api/captchaApi'

export default {
  name: 'svg-captcha',
  data () {
    return {
      msg: '验证码'
    }
  },
  created () {
    this.getSvgCaptcha()
  },
  methods: {
    getSvgCaptcha () {
      captchaApi.getSvgCaptcha()
        .then(function (res) {
          document.getElementById('svgCaptcha').innerHTML = res.data.result
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
