<template>
	<div class="add-doc">
    <mu-card-title title="新增文档"/>
    <mu-sub-header><b>标题</b></mu-sub-header>
    <mu-text-field hintText="label" class="contentInput" v-model="newLabel"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="description" class="contentInput" v-model="newDesc"/>
    <mu-sub-header><b>markdown文本<mu-switch class="demo-switch" v-model="isMd"/></b> </mu-sub-header>
    <quill-editor v-if="!isMd" v-model="newEditorContent"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      class="editorInput">
    </quill-editor> 
    <!-- TODOmd -->
    <markdown-editor v-if="isMd" v-model="newMdContent" :configs="configs" ref="markdownEditor" class="mdInput"></markdown-editor>
    <div class="buttonInput">
      <mu-raised-button label="提交" class="demo-raised-button" @click="addNewDoc" primary/>
      <mu-raised-button label="重置" class="demo-raised-button"/>
    </div>
  </div>	
</template>

<script>
import docApi from '../../api/docApi'
import Store from '../../utils/store'
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
      newLabel: '',
      newDesc: '',
      newEditorContent: '',
      editorOption: {},
      newMdContent: '',
      configs: {
        status: false
      }
    }
  },
  computed: {
    localStorage () {
      // window.localStorege.user转换为json
      return Store.fetch('user')
    },
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // you can use current editor object to do something(quill methods)
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    addNewDoc () {
      let _this = this;
      let pid = this.$route.params.id;
      let isRoot = 0;
      if (pid != 0) {
        isRoot = 1
      }
      let docContent = '';
      if (this.isMd == true) {
        docContent = this.newEditorContent
      } else {
        docContent = this.newMdContent
      }
      docApi.addDoc(isRoot, pid, this.newLabel, this.newDesc, docContent, this.isMd, this.localStorage.userInfo.email)
        .then(function (res) {
          if (res.data.code == 1) {
            _this.$notify.success({
              title: '成功',
              message: '新增文档成功'
            })
            _this.$router.push('/')
          }
          if (res.data.code == -1) {
            _this.$notify.error({
              title: '失败',
              message: '新增文档失败'
            })
          }
        })
    },
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
