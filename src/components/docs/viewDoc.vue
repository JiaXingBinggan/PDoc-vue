<template>
 <div class="view-doc">
   <mu-card>
	  <mu-card-title :title="label" :subTitle="desc"/>
	  <mu-card-text>
	    {{content}}
	  </mu-card-text>
	</mu-card>
  </div>	
</template>

<script>
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
          _this.content = res.data.result.doc_content;
        })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
