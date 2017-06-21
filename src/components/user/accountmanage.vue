<template>
  <div class="account-manage">
    <mu-card>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="60">
          <mu-card-title title="信息管理" subTitle=""/>
          <mu-sub-header><b>昵称</b></mu-sub-header>
          <mu-text-field class="infoInput"/>
          <mu-sub-header><b>性别</b></mu-sub-header>
          <mu-radio label="男" name="group" nativeValue="male" v-model="userMale" class="infoInput"/>
          <mu-radio label="女" name="group" nativeValue="female" v-model="userMale"  class="infoInput"/>
          <mu-sub-header><b>电话号码</b></mu-sub-header>
          <mu-text-field class="infoInput"/>
          <mu-sub-header><b>出生日期</b></mu-sub-header>
          <mu-date-picker mode="landscape" class="infoInput"/>
          <mu-sub-header><b>个人简介</b></mu-sub-header>
          <mu-text-field multiLine :rows="3" :rowsMax="6" class="infoInput"/>
          <mu-card-actions>
            <mu-raised-button label="提交" primary/> 
            <mu-raised-button label="重置"/>
          </mu-card-actions>
        </mu-col>
        <mu-col width="100" tablet="50" desktop="30">
          <div class="face-area">
            <mu-card-title title="头像" subTitle=""/>
            <mu-card-media>
              <img height="100" src="../../assets/captchaback.png" />
              <mu-raised-button label="上传图片" fullWidth/>
            </mu-card-media>
          </div>
        </mu-col>
      </mu-row>
    </mu-card>
  </div>
</template>

<script>
export default {
  name: 'account-manage',
  data () {
    return {
      msg: '这是用户信息管理页面',
      userMale: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-manage
  width 100%
  height 100%
  text-align left
.face-area
  margin 20px
.infoInput
  margin-left 15px
</style>
