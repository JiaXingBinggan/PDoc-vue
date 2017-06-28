<template>
	<div class="docs-view">
    <mu-row gutter>
      <mu-col width="100" tablet="25" desktop="25">
        <mu-text-field hintText="search" class="searchInput"/>
        <mu-raised-button class="mu-raised-button" primary><mu-icon value="add"></mu-icon></mu-raised-button>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :expand-on-click-node="false" accordion @node-collapse="test"></el-tree>
      </mu-col>
      <mu-col width="100" tablet="75" desktop="75">
         <router-view name="docView"></router-view>
      </mu-col>
    </mu-row>
  </div>	
</template>

<script>
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
      data: [{
          id: 1,
          p_id: 0,
          level: 1,
          label: '一级 1',
          children: [{
            id: 2,
            level: 2,
            p_id: 1,
            label: '二级 1-1',
            children: [{
              id: 3,
              level: 3,
              p_id: 2,
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  methods: {
    test (data) {
      this.renderContentStatus = false
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
    renderContent: function(createElement, { node, data, store }) {
      var _this = this;
      if (this.renderContentStatus) {
        return createElement('span', {attrs: {
            id: node.id
          }}, [
          createElement('span', node.label),
          createElement('span', {attrs: {
              style: "line-height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block;font-size: 15px;color: #666e80;position:absolute;right:870px"
          }}, [
              createElement('mu-icon', {attrs: {
                  value: "add",
                  size: 16
              },
              on: {
                  click: function() {
                    _this.$router.push('/docsview/view-doc');
                  }
              }}, "添加"),
              createElement('mu-icon', {attrs: {
                  value: "visibility",
                  size: 16
              },
              on: {
                  click: function() {
                    _this.$router.push('/docsview/add-doc');
                  }
              }}, "查看"),
              createElement('mu-icon', {attrs: {
                  value: "edit",
                  size: 16
              },
              on: {
                  click: function () {
                      _this.$router.push('/docsview/edit-doc');
                  }
              }}, "编辑"),
              createElement('mu-icon', {attrs: {
                  value: "delete",
                  size: 16
              },
              on: {
                  click: function () {
                      store.remove(data);
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
