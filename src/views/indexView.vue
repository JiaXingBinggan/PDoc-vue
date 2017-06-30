<template>
	<div class="index-view">
   <mu-row gutter>
    <mu-col v-for="doc, index in rootDocs" width="100" tablet="50" desktop="25">
      <div class="docCard" @click="goToDoc(doc._id)">
        <mu-card>
          <mu-card-title :title="doc.label.slice(0,5)" :subTitle="doc.desc"/>
          <mu-card-text>
            {{doc.doc_content.slice(0,50)}}
          </mu-card-text>
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
      msg: '这是首页'
    }
  },
  computed: {
    rootDocs () {
      return this.$store.state.docs.treeNodes
    }
  },
  created () {
    this.getRootDocs(this.$store.state.user.userInfo.email)
  },
  methods: {
    getRootDocs(email) {
      let _this = this
      docApi.getDocs(email)
        .then(function (res) {
          var docInfo = {
            newTreeNodes: res.data.result
          }
          _this.$store.dispatch('updatedoc', docInfo)
        })
    },
    goToDoc (id) {
      console.log('dd')
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
