<template>
  <div class="account-manage">
    <mu-card>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="60">
          <mu-card-title title="信息修改" subTitle=""/>
          <mu-sub-header>昵称</mu-sub-header>
          <mu-text-field hintText="昵称修改" class="infoInput"/>
          <mu-sub-header>性别</mu-sub-header>
          <mu-radio label="男" name="group" nativeValue="male" v-model="userMale" class="infoInput"/>
          <mu-radio label="女" name="group" nativeValue="female" v-model="userMale"  class="infoInput"/>
          <mu-sub-header>出生日期</mu-sub-header>
          <mu-date-picker mode="landscape" hintText="出生日期" class="infoInput"/>
          <mu-sub-header>个人简介</mu-sub-header>
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
