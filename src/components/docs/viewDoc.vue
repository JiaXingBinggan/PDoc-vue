<template>
 <div class="view-doc">
   <mu-card>
	  <mu-card-title :title="label" :subTitle="desc"/>
	  <mu-card-text>
      <div id="docContent"></div>
	  </mu-card-text>
	</mu-card>
  </div>	
</template>

<script>
// import {markdown} from 'markdown'
import docApi from '../../api/docApi'
export default {
  name: 'view-doc',
  data () {
    return {
      msg: '查看详情',
      label: '',
      desc: '',
      content: ''
    }
  },
  watch: {
    '$route': 'getCurrentDoc'
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
          _this.label = res.data.result.label;
          _this.desc = res.data.result.desc;
          if (res.data.result.doc_type == true) {
            document.getElementById('docContent').innerHTML = res.data.result.md_html
          } else {
            document.getElementById('docContent').innerHTML = res.data.result.doc_content
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.view-doc
  height 100%
</style>
