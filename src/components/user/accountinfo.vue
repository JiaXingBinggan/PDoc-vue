<template>
  <div class="account-info">
    <mu-card>
      <mu-content-block>
        <mu-card-header :title="userName" :subTitle="userEmail">
          <mu-avatar slot="avatar" :icon="avatarIcon" :src="portraitUrl"/>
        </mu-card-header>
        <mu-card-text>
          <mu-row gutter>
            <mu-col width="100" tablet="20" desktop="20"><b>性别</b><span> {{userSex}}</span></mu-col>
            <mu-col width="100" tablet="40" desktop="40"><b>出生日期</b><span> {{birthDate}}</span></mu-col>
            <mu-col width="100" tablet="40" desktop="40"><b>电话号码</b><span> {{telphone}}</span></mu-col>
          </mu-row>
          </mu-card-text>
        <mu-card-text>
            <mu-row gutter>
            <mu-col width="100" tablet="100" desktop="100"><b>个人简介</b> <span>{{userDesc}}</span></mu-col>
          </mu-row>
        </mu-card-text>
      </mu-content-block>
    </mu-card>
  </div>
</template>

<script>
import userApi from '../../api/userApi'
import imgApi from '../../api/imgApi'
export default {
  name: 'account-info',
  data () {
    return {
      msg: '这是用户信息页面',
      userName: '',
      userEmail: '',
      userSex: '',
      birthDate: '',
      telphone: '',
      userDesc: '',
      portraitUrl: '',
      avatarIcon: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let id = this.$store.state.user.userInfo.uid
      let _this = this
      userApi.getSingleUser(id)
        .then(function (res) {
          if (res.data.code == 1) {
            _this.userName = res.data.result.name;
            _this.userEmail = res.data.result.email;
            if (res.data.result.sex == 0) {
              _this.userSex = '男'
            } else if (res.data.result.sex == 1) {
              _this.userSex = '女'
            } else {
              _this.userSex = '暂无'
            }
            if (res.data.result.birthdate == null) {
              _this.birthdate = '暂无'
            } else {
              _this.birthDate = res.data.result.birthdate
            }
            if (res.data.result.tel == null) {
              _this.telphone = '暂无'
            } else {
              _this.telphone = res.data.result.tel
            }
            if (res.data.result.desc == null) {
              _this.userDesc = '暂无'
            } else {
              _this.userDesc = res.data.result.desc;
            }
            imgApi.getQiniuPortrait(id)
              .then(function (response) {
                if (res.data.code == 1) {
                  _this.portraitUrl = '/portrait/' + response.data.result;
                  _this.avatarIcon = '';
                }
                if (res.data.code == -1) {
                  _this.portraitUrl = '';
                  _this.avatarIcon = 'person';
                  _this.$notify.error({
                    title: '错误',
                    message: '获取头像失败'
                  })
                }
              })
          }
          if (res.data.code == -1) {
            _this.$notify.error({
              title: '错误',
              message: '获取信息失败'
            })
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-info
  width 100%
  height 100%
  text-align left
.test
  margin-top 20px
</style>
