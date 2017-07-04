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
    <div id="mdEditor">
      <markdown-editor v-if="isMd" v-model="mdContent" :configs="configs" ref="markdownEditor" :custom-theme="true" class="mdInput"></markdown-editor>
    </div>
    <div class="buttonInput">
      <mu-raised-button label="提交" class="demo-raised-button" @click="updateDoc" primary/>
      <mu-raised-button label="重置" class="demo-raised-button"/>
    </div>
  </div>	
</template>

<script>
import docApi from '../../api/docApi'
import imgApi from '../../api/imgApi'
export default {
  name: 'edit-doc',
  data () {
    return {
      msg: '这是首页',
      isMd: false,
      editLabel: '',
      currentFd: [],
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
    // mdContent: function (val) {
    //   var mdEditor = document.getElementById('mdEditor');
    //   this.editorEvent(mdEditor, val)
    // }
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
          var mdEditor = document.getElementById('mdEditor');
          _this.editorEvent(mdEditor)
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
    },
    editorEvent (el, mdContent) {
      let _this = this
      // 为 <textarea> 元素绑定粘贴事件事件 ,程序将粘贴事件绑定到 pasteTarget 上
      el.addEventListener('paste', function(e) {
          // 添加到事件对象中的访问系统剪贴板的接口
          var cbd = e.clipboardData;
          var ua = window.navigator.userAgent;
          // 如果是 Safari 直接 return
          if (!(e.clipboardData && e.clipboardData.items)) {
              return;
          }

          // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
          if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
              cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
              ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
              return;
          }

          var blob = null;
          for (var i = 0; i < cbd.items.length; i++) {
              var item = cbd.items[i];

              // 判断是否为图片数据
              if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                  blob = item.getAsFile();
                  if (blob.size === 0) {
                      return;
                  }
              }
          }

          if (blob !== null && blob != undefined) {
              var extension = blob.type.match(/\/([a-z0-9]+)/i)[1].toLowerCase(); // 后缀名

              // 利用FormData对象模拟一个完整的表单,然后送这个"表单".
              var fd = new FormData();
              fd.append('file', blob, "paste." + extension);

              imgApi.addMdImgs(fd)
                .then(function (res) {
                  if (res.data.code == 1) {
                    _this.mdContent = _this.mdContent + res.data.result.wmdImgUrl
                  }
                })
          }
        }, false);

        //  当拖拽元素进入放置区域时由放置元素频繁触发的事件
        el.addEventListener('dragover', function(e) {
            // 阻止默认事件的触发
            e.preventDefault();
        }, false);

        // 当拖拽元素在放置区域放置时由放置元素触发的事件
        el.addEventListener('drop', function(e) {
            // 阻止默认事件的触发
            e.preventDefault();

            // 获取文件对象
            var fileList = e.dataTransfer.files;
            // 检测是否是拖拽文件到页面的操作
            if (fileList.length == 0) {
                return false;
            }

            // 检测文件是不是图片
            if (fileList[0].type.indexOf('image') === -1) {
                // toastr.warning('您拖放的不是图片 ');
                return false;
            }

            var fd = new FormData();
            fd.append('files', fileList[0]);

        }, false);
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
