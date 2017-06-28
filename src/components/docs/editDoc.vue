<template>
	<div class="edit-doc">
    <mu-card-title title="编辑文档" subTitle="节点1"/>
    <mu-sub-header><b>标题</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>文本内容</b></mu-sub-header>
    <quill-editor v-if="!isMd" v-model="editorContent"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      class="editorInput">
    </quill-editor> 
    <!-- TODOmd -->
    <markdown-editor v-if="isMd" v-model="mdContent" :configs="configs" ref="markdownEditor" class="mdInput"></markdown-editor>
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
      msg: '这是首页',
      isMd: true,
      editorContent: '',
      editorOption: {},
      mdContent: '',
      configs: {
        status: true,
        initialValue: 'Hello BBK',
        toolbarTip: true
      }
    }
  },
  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchInput
  margin auto
  width 100%
.buttonInput
  margin-left 15px
.contentInput
  width 100%
  margin-left 15px
.editorInput
  width 100%
  height 400px
  margin-left 15px
  margin-bottom 70px
.mdInput
  width 100%
  height 400px
  margin-left 15px
  margin-bottom -25px
</style>
