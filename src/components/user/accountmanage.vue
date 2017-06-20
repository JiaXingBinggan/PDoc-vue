<template>
  <div class="account-manage">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'account-manage',
  data () {
    return {
      msg: '这是用户信息管理页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-manage
  width 100%
  height 100%
</style>
