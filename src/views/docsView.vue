<template>
	<div class="docs-view">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="25">
        <mu-text-field hintText="search" class="searchInput"/>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
      </mu-col>
      <mu-col width="100" tablet="50" desktop="75">
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
      data: [{
          id: 1,
          level: 1,
          label: '一级 1',
          children: [{
            level: 2,
            label: '二级 1-1',
            children: [{
              level: 3,
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
    handleNodeClick (data) {
      console.log(data)
    },
    renderContent: function(createElement, { node, data, store }) {
      var self = this;
      return createElement('span', [
          createElement('span', node.label),
          createElement('span', {attrs: {
              style: "float:right"
          }}, [
              createElement('mu-icon', {attrs: {
                  value: "add",
                  size: 18
              },
              on: {
                  click: function() {
                    self.$router.push('/docsview/add-doc');
                    console.info("点击了节点" + data.id + "的添加按钮");
                    store.append({ id: self.baseId++, label: 'testtest', children: [] }, data);
                  }
              }}, "添加"),
              createElement('mu-icon', {attrs: {
                  value: "edit",
                  size: 18
              },
              on: {
                  click: function () {
                      self.$router.push('/docsview/edit-doc')
                      console.info("点击了节点" + data.id + "的编辑按钮");
                  }
              }}, "编辑"),
              createElement('mu-icon', {attrs: {
                  value: "delete",
                  size: 18
              },
              on: {
                  click: function () {
                      console.info("点击了节点" + data.id + "的删除按钮");
                      store.remove(data);
                  }
              }}, "删除")
          ])
      ])
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
