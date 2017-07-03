<template>
	<div class="docs-view">
    <mu-row gutter>
      <mu-col width="30" tablet="30" desktop="25">
        <mu-text-field hintText="文档名称" class="searchInput" v-model="nodeSearchText"/>
        <mu-raised-button class="mu-raised-button" @click="seachOperation" primary><mu-icon :value="searchIcon"></mu-icon></mu-raised-button>
        <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :default-expand-all="false" accordion></el-tree>
      </mu-col>
      <mu-col width="80" tablet="80" desktop="75">
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
      renderContentStatus: false, // 是否显示树节点右侧button
      currentNode: {
        id: null,
        p_id: null,
        level: null,
        label: '',
        children: []
      }, // 当前节点
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchIcon: 'add',
      nodeSearchText: ''
    }
  },
  watch: {
    nodeSearchText: function (val) {
      if (val != '') {
        this.searchIcon = 'search'
      }
    }
  },
  computed: {
    localUserStorage () {
      // window.localStorege.user转换为json
      return Store.fetch('user')
    },
    localDocStorage () {
      return Store.fetch('docs')
    },
    treedata () {
      return this.$store.state.docs.treeNodes
    }
  },
  created () {
    this.getTreeNodes(this.localUserStorage.userInfo.email)
  },
  methods: {
    seachOperation () {
      let _this = this
      if (this.searchIcon == 'add') {
        this.$router.push('/docsview/add-doc/' + 0);
      }
      if (this.searchIcon == 'search') {
        docApi.getDocByLabel(this.nodeSearchText)
          .then(function (res) {
            if (res.data.result) {
              _this.$router.push('/docsview/view-doc/' + res.data.result);
            } else {
              _this.$notify.error({
                title: '错误',
                message: '未找到该文档 请输入正确的文档名'
              })
            }
          })
      }
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
      if (this.localUserStorage.login == true) {
        docApi.getDocs(email)
        .then(function (res) {
          var docInfo = {
            newTreeNodes: res.data.result
          }
          _this.$store.dispatch('updatedoc', docInfo)
        })
      } else {
        this.$router.push('/login')
      }
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
                    docApi.getSingleDoc(data._id)
                      .then(function (res) {
                        if (res.data.result.level == 3) {
                          _this.$notify.error({
                            title: '错误',
                            message: '文档不能超过三级'
                          })
                        }
                        if (res.data.result.level == 1 || res.data.result.level == 2) {
                          _this.$router.push('/docsview/add-doc/' + data._id);
                        }
                      })
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
                      docApi.getSingleDoc(data._id)
                        .then(function (ret) {
                          if (ret.data.result.children.length != 0) {
                            _this.$confirm('该文档有子节点, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                              docApi.deleteDoc(data._id)
                                .then(function (res) {
                                  if (res.data.code == 1) {
                                    _this.$notify.success({
                                      title: '成功',
                                      message: '删除文档成功'
                                    })
                                    docApi.getDocs(_this.localUserStorage.userInfo.email)
                                      .then(function (res) {
                                        var docInfo = {
                                          newTreeNodes: res.data.result
                                        }
                                        _this.$store.dispatch('updatedoc', docInfo);
                                        _this.$router.push('/docsview');
                                      })
                                  }
                                  if (res.data.code == -1) {
                                    _this.$notify.error({
                                      title: '错误',
                                      message: '删除文档失败'
                                    })
                                  }
                                })
                            })
                          } else {
                            _this.$confirm('您将要删除此文档, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                              docApi.deleteDoc(data._id)
                                .then(function (res) {
                                  if (res.data.code == 1) {
                                    _this.$notify.success({
                                      title: '成功',
                                      message: '删除文档成功'
                                    })
                                    docApi.getDocs(_this.localUserStorage.userInfo.email)
                                      .then(function (res) {
                                        var docInfo = {
                                          newTreeNodes: res.data.result
                                        }
                                        _this.$store.dispatch('updatedoc', docInfo);
                                        _this.$router.push('/docsview/view-doc/' + 0);
                                      })
                                  }
                                  if (res.data.code == -1) {
                                    _this.$notify.error({
                                      title: '错误',
                                      message: '删除文档失败'
                                    })
                                  }
                                })
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
  min-height 600px
  margin 0px auto 
  margin-top 40px
.demo-view div[class*="col-"]
  background #fff
  text-align center
  color #000
  border 1px solid #ddd
  padding 8px
  margin-bottom 20px
.mu-raised-button
  min-width 15%
  top 5px
.searchInput
  margin auto
  width 83%
.contentInput
  width 100%
  margin-left 15px
.mdInput
  width 100%
  height 400px
  margin-left 15px
</style>
