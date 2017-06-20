<template>
  <div class="user-info">
  	<mu-row>
	    <mu-col width="100" tablet="50" desktop="20">
	    	<div class="info-menu">
	    		<mu-paper class="demo-menu">
				    <mu-menu>
				      <mu-menu-item title="个人信息" @click="goToUser(1)"/>
				      <mu-menu-item title="账户修改" @click="goToUser(2)"/>
				      <mu-menu-item title="修改密码" @click="goToUser(3)"/>
				    </mu-menu>
				  </mu-paper>
	    	</div>
	    </mu-col>
	    <mu-col width="100" tablet="50" desktop="80">
	    	<div class="info-block">
            <router-view name="userView"></router-view>
        </div>
	    </mu-col>
	  </mu-row>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {
      msg: '这是用户信息页面'
    }
  },
  methods: {
    goToUser (type) {
      if (type == 1) {
        this.$router.push('/userinfo/account-info');
      }
      if (type == 2) {
        this.$router.push('/userinfo/account-manage');
      }
      if (type == 3) {
        this.$router.push('/userinfo/account-password');
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-info
  width 1000px
  height 600px
  margin 0px auto 
  margin-top 20px
.user-info div[class*="col-"] 
  background #fff
  text-align center
  color #000
.info-menu 
  width 100%
  height 500px
	.demo-menu 
	  display inline-block
.info-block
  width 100%
  height 500px
</style>
