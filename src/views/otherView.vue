<template>
	<div class="other-view">{{msg}}</div>
</template>

<script>
export default {
  name: 'other-view',
  data () {
    return {
      msg: '这个其它页面'
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 检查是否存在session
      if (!this.getCookie('uid')) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.other-view
  width 800px
  height 400px
  margin 0px auto 
  margin-top 20px
  background orange
</style>

