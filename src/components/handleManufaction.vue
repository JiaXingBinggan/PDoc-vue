<template>
	<div class="handle-manufaction">
  <el-tabs v-model="activeName">
    <el-tab-pane label="未处理" name="first">
      <unsolved-manufaction></unsolved-manufaction>
    </el-tab-pane>
    <el-tab-pane label="进行中" name="second">
      <handling-manufaction></handling-manufaction>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="third">
      <handled-manufaction></handled-manufaction>
    </el-tab-pane>
    <el-tab-pane label="全部" name="fourth">
      <all-manufaction></all-manufaction>
    </el-tab-pane>
  </el-tabs>
	</div>
</template>

<script>
import unsolvedManufaction from './manufactionTable/unsolvedManufaction'
import handlingManufaction from './manufactionTable/handlingManufaction'
import handledManufaction from './manufactionTable/handledManufaction'
import allManufaction from './manufactionTable/allManufaction'

export default {
  name: 'handle-manufaction',
  components: {
    unsolvedManufaction,
    handlingManufaction,
    handledManufaction,
    allManufaction
  },
  data () {
    return {
      msg: '这个是故障处理页面',
      activeName: 'first'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
