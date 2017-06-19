<template>
  <div id="app">
    <div class="header">
      <mu-appbar>
        <div class="inner">
          <router-link to="/">首页</router-link>
          <router-link to="/other">其它页面</router-link>
        </div>
        <mu-flat-button v-if="!loginStatus" color="white" label="登录/注册" slot="right" @click="login"/>
        <mu-flat-button v-if="loginStatus" color="white" slot="right" label="茧" @click="toggle()" />
          <mu-drawer right :open="open" @close="toggle()">
            <mu-appbar title="个人中心">
              <mu-icon-button icon='menu' slot="left" @click="toggle()"/>
            </mu-appbar>
            <mu-list>
              <mu-list-item @click="loginOut" title="退出登录"/>
            </mu-list>
          </mu-drawer>
      </mu-appbar>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import authApi from './api/authApi'
export default {
  name: 'app',
  data () {
    return {
      open: false
    }
  },
  computed: {
    localStorage () {
      // window.localStorege.user转换为json
      return JSON.parse(window.localStorage.user || '[]')
    },
    loginStatus () {
      // 当存在本地保存的登录状态则使用本地登录状态 ,如果登出则本地登录状态被撤回此时使用store保存的状态
      return this.localStorage.login ? this.localStorage.login : this.$store.state.user.login
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    login () {
      this.$router.push('/login');
    },
    loginOut () {
      let _this = this
      authApi.loginOut()
        .then(function (response) {
          console.log(response)
          let userInfo = {
            email: null,
            uid: null
          }
          _this.delCookie('uid');
          _this.$store.commit('UPDATEUSER', userInfo);
          _this.$router.push('/login');
          _this.toggle()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
body
  font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  background-color lighten(#eceef1, 30%)
  margin 0

a
  color #34495e
  text-decoration none

.header
  z-index 999
  max-width 100%
  height 55px
  top 0
  left 0
  right 0
  .inner
    padding-left 100px
    font-size 16px
    font-family "Microsoft YaHei"
    a
      color rgba(255, 255, 255, .8)
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #fff
      &.router-link-active
        color #fff
        font-weight 400
        
.view
  padding 0 100px
  margin 0 auto
  position relative
  
.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  body
    font-size 14px
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
