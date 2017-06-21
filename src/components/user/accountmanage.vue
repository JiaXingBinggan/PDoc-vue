<template>
  <div class="account-manage">
    <mu-card>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="60">
          <mu-card-title title="信息管理" subTitle=""/>
          <mu-sub-header><b>昵称</b></mu-sub-header>
          <mu-text-field v-model="updateName" class="infoInput"/>
          <mu-sub-header><b>性别</b></mu-sub-header>
          <mu-radio label="男" name="group" nativeValue="0" v-model="updateSex" class="infoInput"/>
          <mu-radio label="女" name="group" nativeValue="1" v-model="updateSex"  class="infoInput"/>
          <mu-sub-header><b>电话号码</b></mu-sub-header>
          <mu-text-field v-model="updateTel" :errorText="errorTelText" class="infoInput"/>
          <mu-sub-header><b>出生日期</b></mu-sub-header>
          <mu-date-picker v-model="updateBirthDate" mode="landscape" class="infoInput"/>
          <mu-sub-header><b>个人简介</b></mu-sub-header>
          <mu-text-field v-model="updateDesc" multiLine :rows="3" :rowsMax="6" class="infoInput"/>
          <mu-card-actions>
            <mu-raised-button label="提交" @click="updateUserInfo" primary/> 
            <mu-raised-button label="重置" @click="reset"/>
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
import userApi from '../../api/userApi'
export default {
  name: 'account-manage',
  data () {
    return {
      msg: '这是用户信息管理页面',
      updateName: '',
      updateTel: '',
      updateSex: '',
      updateBirthDate: '',
      updateDesc: '',
      errorTelText: ''
    }
  },
  computed: {
    localStorage () {
      // window.localStorege.user转换为json
      return JSON.parse(window.localStorage.user || '[]')
    }
  },
  watch: {
    updateTel: function(val) {
      let re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (val.length < 11) {
        this.errorTelText = '电话号码长度不够'
      } else if (val.length == 11 && !re.test(val)) {
        this.errorTelText = '电话号码格式有问题哟'
      } else {
        this.errorTelText = ''
      }
    }
  },
  methods: {
    updateUserInfo () {
      let id = this.localStorage.userInfo.uid
      console.log(id)
      let _this = this
      let updateUserInfo = {
        email: this.localStorage.userInfo.email,
        name: this.updateName ? this.updateName : this.localStorage.userInfo.name,
        sex: this.updateSex,
        tel: this.updateTel,
        birthdate: this.updateBirthDate,
        desc: this.updateDesc,
        uid: this.localStorage.userInfo.uid
      }
      userApi.updateUser(id, this.updateName, this.updateTel, this.updateBirthDate, this.updateSex, this.updateDesc)
        .then(function (res) {
          console.log(res)
          _this.$store.commit('DOLOGIN', updateUserInfo)
          _this.$router.push('/userinfo/account-info');
        })
    },
    reset () {
      this.updateName = ''
      this.updateTel = ''
      this.updateUserMale = ''
      this.updateBirthDate = ''
      this.updateDesc = ''
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
