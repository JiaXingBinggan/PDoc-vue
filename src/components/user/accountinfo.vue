<template>
  <div class="account-info">
    <mu-card>
      <mu-content-block>
        <mu-card-header :title="userName" :subTitle="userEmail">
          <mu-avatar slot="avatar" icon="person"/>
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
      userDesc: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let id = this.getCookie('uid')
      let _this = this
      userApi.getSingleUser(id)
        .then(function (res) {
          console.log(res)
          if (res.data.code == 1) {
            _this.userName = res.data.result.name;
            _this.userEmail = res.data.result.email;
            if (res.data.result.sex == 0) {
              _this.userSex = '男'
            } else {
              _this.userSex = '女'
            }
            _this.birthDate = res.data.result.birthdate;
            _this.telphone = res.data.result.tel;
            _this.userDesc = res.data.result.desc;
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
