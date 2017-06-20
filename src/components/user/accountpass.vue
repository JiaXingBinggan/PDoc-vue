<template>
  <div class="account-pass">
  	{{msg}}
  </div>
</template>

<script>
export default {
  name: 'account-pass',
  data () {
    return {
      msg: '这是用户管理密码页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-pass
  width 100%
  height 100%
</style>
