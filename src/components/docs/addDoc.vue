<template>
	<div class="add-doc">
    <mu-card-title title="新增文档"/>
    <mu-sub-header><b>标题</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="search" class="contentInput"/>
    <mu-sub-header><b>markdown文本<mu-switch class="demo-switch" v-model="isMd"/></b> </mu-sub-header>
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
import { markdownEditor } from 'vue-simplemde'
export default {
  name: 'add-doc',
  components: {
    markdownEditor
  },
  data () {
    return {
      msg: '这是首页',
      isMd: false,
      editorContent: '',
      editorOption: {},
      mdContent: '',
      configs: {
        status: false,
        initialValue: 'Hello BBK'
      }
    }
  },
  mounted() {
    // you can use current editor object to do something(quill methods)
    console.log('this is current quill instance object', this.editor)
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
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
.demo-switch
  top 3px
  margin-left 10px
.buttonInput
  top 0px
  margin-left 15px
.searchInput
  margin auto
  width 100%
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
