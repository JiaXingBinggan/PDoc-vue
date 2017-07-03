<template>
	<div class="edit-doc">
    <mu-card-title title="编辑文档" subTitle="节点1"/>
    <mu-sub-header ><b>标题</b></mu-sub-header>
    <mu-text-field hintText="label" class="contentInput" v-model="editLabel"/>
    <mu-sub-header><b>描述</b></mu-sub-header>
    <mu-text-field hintText="description" class="contentInput" v-model="editDesc"/>
    <mu-sub-header><b>文本内容</b></mu-sub-header>
    <quill-editor v-if="!isMd" v-model="editorContent"
      ref="myQuillEditor"
      :options="editorOption"
      class="editorInput">
    </quill-editor> 
    <!-- TODOmd -->
    <markdown-editor v-if="isMd" v-model="mdContent" :configs="configs" ref="markdownEditor" :custom-theme="true" class="mdInput"></markdown-editor>
    <div class="buttonInput">
      <mu-raised-button label="提交" class="demo-raised-button" @click="updateDoc" primary/>
      <mu-raised-button label="重置" class="demo-raised-button"/>
    </div>
  </div>	
</template>

<script>
import docApi from '../../api/docApi'
export default {
  name: 'edit-doc',
  data () {
    return {
      msg: '这是首页',
      isMd: false,
      editLabel: '',
      editDesc: '',
      editorContent: '',
      editorOption: {},
      mdContent: '',
      configs: {
        status: true,
        toolbarTip: true
      },
      currentDocContent: ''
    }
  },
  watch: {
    '$route': 'getCurrentDoc'
  },
  created () {
    this.getCurrentDoc()
  },
  methods: {
    getCurrentDoc () {
      let _this = this;
      let id = this.$route.params.id;
      docApi.getSingleDoc(id)
        .then(function (res) {
          _this.editLabel = res.data.result.label;
          _this.editDesc = res.data.result.desc;
          _this.isMd = res.data.result.doc_type;
          if (res.data.result.doc_type == true) {
            _this.mdContent = res.data.result.doc_content;
          } else {
            _this.editorContent = res.data.result.doc_content;
          }
        })
    },
    updateDoc () {
      let _this = this
      let id = this.$route.params.id;
      if (this.isMd == true) {
        this.currentDocContent = this.mdContent
      } else {
        this.currentDocContent = this.editorContent
      }
      docApi.modifyDoc(id, this.editLabel, this.editDesc, this.currentDocContent)
        .then(function (res) {
          if (res.data.code == 1) {
            _this.$notify.success({
              title: '成功',
              message: '修改文档成功'
            })
            docApi.getDocs(_this.$store.state.user.userInfo.email)
              .then(function (res) {
                var docInfo = {
                  newTreeNodes: res.data.result
                }
                _this.$store.dispatch('updatedoc', docInfo);
                _this.$router.push('/docsview/view-doc/' + _this.$route.params.id);
              })
          }
          if (res.data.code == -1) {
            _this.$notify.error({
              title: '错误',
              message: '修改文档失败'
            })
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchInput
  margin auto
  width 100%
.buttonInput
  position flex
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
  margin-left 15px
  margin-bottom -10px
</style>
