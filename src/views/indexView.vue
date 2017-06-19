<template>
	<div class="index-view">{{msg}}</div>	
</template>

<script>
export default {
  name: 'index-view',
  data () {
    return {
      msg: '这是首页'
    }
  }
}
</script>

<style lang="stylus" scoped>
.index-view
  width 800px
  height 400px
  margin 0px auto 
  margin-top 20px
  background green
</style>
