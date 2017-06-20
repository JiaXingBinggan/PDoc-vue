<template>
  <div class="account-manage">
    <mu-flexbox class="mt8" orient="vertical">
      <mu-flexbox-item order="0" class="flex-demo">
        9
      </mu-flexbox-item>
      <mu-flexbox-item order="2" class="flex-demo">
        10
      </mu-flexbox-item>
      <mu-flexbox-item order="0" class="flex-demo">
        9
      </mu-flexbox-item>
      <mu-flexbox-item order="2" class="flex-demo">
        10
      </mu-flexbox-item>
      <mu-flexbox-item order="0" class="flex-demo">
        9
      </mu-flexbox-item>
      <mu-flexbox-item order="2" class="flex-demo">
        10
      </mu-flexbox-item>
    </mu-flexbox>
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
.mt8 
  margin-top 0px
.flex-demo 
  height 50px
  text-align center
  line-height 32px
  background-color #e0e0e0
</style>
