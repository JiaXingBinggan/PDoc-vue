<template>
	<div class="add-doc">
    <mu-card-title title="新增文档"/>
    <mu-sub-header><b>标题</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>文本内容</b></mu-sub-header>
    // TODO markdown编辑器
  </div>	
</template>

<script>
export default {
  name: 'add-doc',
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
.contentInput
  width 100%
  margin-left 15px
.mdInput
  width 100%
  height 400px
  margin-left 15px
</style>
