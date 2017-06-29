<template>
	<div class="docs-view">
    <mu-row gutter>
      <mu-col width="100" tablet="25" desktop="25">
        <mu-text-field hintText="search" class="searchInput"/>
        <mu-raised-button class="mu-raised-button" @click="newRootDoc" primary><mu-icon value="add"></mu-icon></mu-raised-button>
        <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :default-expand-all="false" accordion></el-tree>
      </mu-col>
      <mu-col width="100" tablet="75" desktop="75">
         <router-view name="docView"></router-view>
      </mu-col>
    </mu-row>
  </div>	
</template>

<script>
import docApi from '../api/docApi'
import Store from '../utils/store'
export default {
  name: 'docs-view',
  data () {
    return {
      msg: '这是首页',
      mdInput: 'dddd',
      renderContentStatus: false, // 是否显示右侧button
      currentNode: {
        id: null,
        p_id: null,
        level: null,
        label: '',
        children: []
      }, // 当前节点
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    localStorage () {
      // window.localStorege.user转换为json
      return Store.fetch('user')
    }
  },
  created () {
    this.getTreeNodes(this.localStorage.userInfo.email)
  },
  methods: {
    newRootDoc () {
      this.$router.push('/docsview/add-doc/' + 0);
    },
    handleNodeClick (data) {
      this.currentNode = {
        id: data.id,
        p_id: data.p_id,
        level: data.level,
        label: data.label,
        children: data.children
      }
      this.renderContentStatus = true
      // this.$router.push('/docsview/view-doc')
    },
    getTreeNodes (email) {
      let _this = this
      docApi.getDocs(email)
        .then(function (res) {
          _this.treedata = [];
          for (var i = 0; i < res.data.result.length; i++) {
            _this.treedata.push(res.data.result[i])
          }
        })
    },
    renderContent: function(createElement, { node, data, store }) {
      var _this = this;
      if (this.renderContentStatus) {
        return createElement('span', {attrs: {
            id: data._id
          }}, [
          createElement('span', node.label),
          createElement('span', {attrs: {
              style: "line-height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block;font-size: 15px;color: #666e80;position:absolute;right:870px"
          }}, [
              createElement('mu-icon', {attrs: {
                  value: "add",
                  size: 16,
                  title: '新增文档'
              },
              on: {
                  click: function() {
                    _this.$router.push('/docsview/add-doc/' + data._id);
                  }
              }}, "添加"),
              createElement('mu-icon', {attrs: {
                  value: "visibility",
                  size: 16,
                  title: '查看文档'
              },
              on: {
                  click: function() {
                    _this.$router.push('/docsview/view-doc/' + data._id);
                  }
              }}, "查看"),
              createElement('mu-icon', {attrs: {
                  value: "edit",
                  size: 16,
                  title: '编辑文档'
              },
              on: {
                  click: function () {
                      _this.$router.push('/docsview/edit-doc/' + data._id);
                  }
              }}, "编辑"),
              createElement('mu-icon', {attrs: {
                  value: "delete",
                  size: 16,
                  title: '删除文档'
              },
              on: {
                  click: function () {
                      docApi.deleteDoc(data._id)
                        .then(function (res) {
                          if (res.data.code == 1) {
                            _this.$notify.success({
                              title: '成功',
                              message: '删除文档成功'
                            })
                            _this.getTreeNodes(_this.localStorage.userInfo.email)
                          }
                          if (res.data.code == -1) {
                            _this.$notify.error({
                              title: '错误',
                              message: '删除文档失败'
                            })
                          }
                        })
                  }
              }}, "删除")
          ])
        ])
      } else {
        return createElement('span', [
          createElement('span', node.label)
        ])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.docs-view
  width 1200px
  height 900px
  margin 0px auto 
  margin-top 60px
.mu-raised-button
  min-width 40px
  top 5px
.searchInput
  margin auto
  width 80%
.contentInput
  width 100%
  margin-left 15px
.mdInput
  width 100%
  height 400px
  margin-left 15px
</style>
