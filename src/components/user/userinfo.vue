<template>
  <div class="user-info">{{msg}}</div>
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {
      msg: '这是用户信息页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-info
  width 800px
  height 400px
  margin 0px auto 
  margin-top 20px
  background orange
</style>
