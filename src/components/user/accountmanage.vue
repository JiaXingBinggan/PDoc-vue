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
              <img height="120" :src="imgSrcUrl"/>
              <mu-raised-button class="demo-raised-button" label="选择文件" fullWidth>
                <input type="file" class="file-button" @change="uploadImg">
              </mu-raised-button>
            </mu-card-media>
          </div>
        </mu-col>
      </mu-row>
    </mu-card>
  </div>
</template>

<script>
import imgApi from '../../api/imgApi'
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
      errorTelText: '',
      imgSrcUrl: ''
    }
  },
  created () {
    this.getPortrait()
  },
  computed: {
    localStorage () {
      // window.localStorege.user转换为json
      return JSON.parse(window.localStorage.user || '[]')
    },
    userId () {
      return this.localStorage.userInfo.uid
    }
  },
  watch: {
    updateTel: function(val) {
      let re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (val) {
        if (val.length < 11) {
          this.errorTelText = '电话号码长度不够'
        } else if (val.length == 11 && !re.test(val)) {
          this.errorTelText = '电话号码格式有问题哟'
        } else {
          this.errorTelText = ''
        }
      }
    }
  },
  methods: {
    updateUserInfo () {
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
      userApi.updateUser(this.userId, this.updateName, this.updateTel, this.updateBirthDate, this.updateSex, this.updateDesc)
        .then(function (res) {
          if (res.data.code == 1) {
            _this.$store.dispatch('updateuser', updateUserInfo);
            _this.$notify.success({
              title: '成功',
              message: '修改信息成功'
            })
            _this.$router.push('/userinfo/account-info');
          }
          if (res.data.code == -1) {
            _this.$notify.error({
              title: '错误',
              message: '修改信息失败'
            })
          }
        })
    },
    reset () {
      this.updateName = ''
      this.updateTel = ''
      this.updateUserMale = ''
      this.updateBirthDate = ''
      this.updateDesc = ''
    },
    uploadImg: function (event) {
      let _this = this
      let formdata = new FormData();
      formdata.append('file', event.target.files[0]);
      if (formdata) {
        imgApi.addQiniuPortrait(this.userId, formdata)
          .then(function (res) {
          if (res.data.code == 1) {
            _this.$notify.success({
              title: '成功',
              message: '头像上传成功'
            })
            _this.getPortrait()
          }
          if (res.data.code == -1) {
            _this.$notify.error({
              title: '失败',
              message: '头像上传失败'
            })
          }
        })
      } else {
        _this.$notify.error({
          title: '错误',
          message: '请选择您想要上传的文件'
        })
      }
    },
    getPortrait () {
      let _this = this
      userApi.getSingleUser(this.userId)
        .then(function (response) {
          if (response.data.code == 1) {
            _this.updateName = response.data.result.name
            _this.updateTel = response.data.result.tel
            _this.updateSex = response.data.result.sex
            _this.updateBirthDate = response.data.result.birthdate
            _this.updateDesc = response.data.result.desc
            imgApi.getQiniuPortrait(_this.userId)
              .then(function (res) {
                if (res.data.code == 1) {
                  _this.imgSrcUrl = '/portrait/' + res.data.result
                }
                if (res.data.code == -1) {
                  _this.$notify.error({
                    title: '错误',
                    message: '获取头像失败'
                  })
                }
              })
          }
        })
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
.demo-raised-button
  margin 0px auto
.file-button
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  opacity 0
</style>
