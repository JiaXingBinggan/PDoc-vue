<template>
	<div class="index-view">
   <mu-row gutter>
    <mu-col v-for="doc, index in rootDocs" width="80" tablet="80" :desktop="desktopWidth">
      <div class="docCard" @click="goToDoc(doc._id)">
        <mu-card>
          <mu-card-title :title="doc.label" :subTitle="doc.desc"/>
        </mu-card>
      </div>
    </mu-col>
  </mu-row> 
  </div>	
</template>

<script>
import docApi from '../api/docApi'
export default {
  name: 'index-view',
  data () {
    return {
      msg: '这是首页',
      desktopWidth: '30'
    }
  },
  computed: {
    rootDocs () {
      return this.$store.state.docs.treeNodes
    }
  },
  beforeCreate () {
    if (this.$store.state.user.login == false) {
      this.$router.push('/login')
    }
  },
  created () {
    this.getRootDocs(this.$store.state.user.userInfo.email)
  },
  methods: {
    getRootDocs(email) {
      let _this = this
      docApi.getDocs(this.$store.state.user.userInfo.email)
        .then(function (res) {
          if (res.data.result.length == 3) {
            _this.desktopWidth = '30'
          } else if (res.data.result.length >= 4) {
            _this.desktopWidth = '25'
          } else if (res.data.result.length == 2) {
            _this.desktopWidth = '50'
          } else {
            _this.desktopWidth = '30'
          }
          var docInfo = {
            newTreeNodes: res.data.result
          }
          _this.$store.dispatch('updatedoc', docInfo)
        })
    },
    goToDoc (id) {
      this.$router.push('/docsview/view-doc/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.index-view
  width 1200px
  min-height 600px
  margin 0px auto 
  margin-top 40px
.index-view div[class*="col-"]
  background #fff
  text-align center
  padding 8px
  margin-bottom 8px
.docCard:hover
  cursor pointer
</style>
