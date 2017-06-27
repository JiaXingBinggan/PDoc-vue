<template>
	<div class="edit-doc">
    <mu-card-title title="编辑" subTitle="节点1"/>
    <mu-sub-header><b>标题</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>出生日期</b></mu-sub-header>
    // TODO markdown编辑器
    <div class="buttonInput">
      <mu-raised-button label="提交" class="demo-raised-button" primary/>
      <mu-raised-button label="重置" class="demo-raised-button"/>
    </div>
  </div>	
</template>

<script>
export default {
  name: 'edit-doc',
  data () {
    return {
      msg: '这是首页'
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchInput
  margin auto
  width 100%
.buttonInput
  margin-top 20px
  margin-left 15px
.contentInput
  width 100%
  margin-left 15px
.mdInput
  width 100%
  height 400px
  margin-left 15px
</style>
