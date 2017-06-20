<template>
  <div class="account-info">
    <div id="captcha">
        <p id="wait" class="show">正在加载验证码......</p>
    </div>
    <mu-raised-button label="注册" class="demo-raised-button" @click="test2"/>
  </div>
</template>

<script>
import captchaApi from '../../api/captchaApi'
import gt from '../../assets/gt'
export default {
  name: 'account-info',
  data () {
    return {
      msg: '这是用户信息页面',
      test3: ''
    }
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      var _this = this
      captchaApi.getGtCaptcha()
        .then(function(res) {
          console.log(gt)
          window.initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: res.data.new_captcha, // 用于宕机时表示是新验证码的宕机

              product: "float", // 产品形式，包括：float，popup
              width: "300px"
              // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
          }, function (captchaObj) {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                document.getElementById('wait').style.display = 'none';
            });
            captchaObj.onSuccess(function () {
              _this.test3 = captchaObj.getValidate();
            })
          });
        })
    },
    test2 () {
      console.log(this.test3)
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-info
  width 100%
  height 100%
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
  display inline-block
label
  vertical-align top
  display inline-block
  width 80px
  text-align right
#wait
  text-align left
  color #666
  margin 0
</style>
