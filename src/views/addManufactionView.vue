<template>
  <div class="index-view">
    <add-manufaction></add-manufaction>
  </div>
</template>

<script>
import AddManufaction from '../components/AddManufaction.vue'
export default {
  name: 'index-view',
  components: {
    AddManufaction
  },
  data () {
    return {
      msg: '这是首页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.index-view
  width 800px
  height 400px
  margin 0px auto 
  margin-top 20px
  border 1px solid #ADADAD	
  border-radius 5px
</style>
