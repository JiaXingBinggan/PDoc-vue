<template>
  <div class="other-view">
    <handle-manufaction></handle-manufaction>
  </div>
</template>

<script>
import handleManufaction from '../components/handleManufaction.vue'
export default {
  name: 'other-view',
  components: {
    handleManufaction
  },
  data () {
    return {
      msg: '这是故障表格页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.other-view
  width 1400px
  height 650px
  margin 0px auto
  margin-top 20px
</style>
