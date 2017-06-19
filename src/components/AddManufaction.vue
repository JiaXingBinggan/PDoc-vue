<template>
	<div class="add-manufaction">
    <el-form :model="addManufactionForm" :rules="rules" ref="addManufactionForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="故障提出人" prop="proposer">
        <el-input v-model="addManufactionForm.proposer"></el-input>
      </el-form-item>
      <el-form-item label="提出时间" required>
        <el-col :span="11">
          <el-form-item prop="proposeTime1">
            <el-date-picker type="date" placeholder="选择日期" v-model="addManufactionForm.proposeTime1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">------</el-col>
        <el-col :span="11">
          <el-form-item prop="proposeTime2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="addManufactionForm.proposeTime2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="故障等级" prop="level">
        <el-radio-group v-model="addManufactionForm.level">
          <el-radio label="轻微" value="3"></el-radio>
          <el-radio label="一般" value="2"></el-radio>
          <el-radio label="严重" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="故障描述" prop="description">
        <el-input type="textarea" v-model="addManufactionForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addManufactionForm')">新增</el-button>
        <el-button @click="resetForm('addManufactionForm')">重置</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
import manufactionApi from '../api/manufactionApi'
export default {
  name: 'add-manufaction',
  data () {
    return {
      addManufactionForm: {
        proposer: '',
        proposeTime1: '',
        proposeTime2: '',
        level: '',
        description: ''
      },
      rules: {
        proposer: [
          { required: true, message: '请输入故障提出人', trigger: 'change' }
        ],
        proposeTime1: [
          { type: 'date', message: '请选择年月日', trigger: 'change' }
        ],
        proposeTime2: [
          { type: 'date', message: '请选择时分秒', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择故障等级', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写故障描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ymdFilter: function (value) {
      var date = new Date(value)
      var Y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      var t = Y + '-' + m + '-' + d
      return t
    },
    hisFilter: function (value) {
      var date = new Date(value)
      var H = date.getHours()
      var i = date.getMinutes()
      var s = date.getSeconds()
      if (H < 10) {
        H = '0' + H
      }
      if (i < 10) {
        i = '0' + i
      }
      if (s < 10) {
        s = '0' + s
      }
      var t = H + ':' + i + ':' + s
      return t
    },
    submitForm (formName) {
      var proposeTimeYMD = this.ymdFilter(this.addManufactionForm.proposeTime1)
      var proposeTimeHIS = this.hisFilter(this.addManufactionForm.proposeTime2)
      var proposeTime = proposeTimeYMD + ' ' + proposeTimeHIS
      var _this = this
      var level = 0
      if (this.addManufactionForm.level === '轻微') {
        level = 3
      }
      if (this.addManufactionForm.level === '一般') {
        level = 2
      }
      if (this.addManufactionForm.level === '严重') {
        level = 1
      }
      manufactionApi.addManufaction(this.addManufactionForm.proposer, proposeTime, this.addManufactionForm.description, level)
          .then(function (response) {
            _this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            _this.resetForm('addManufactionForm')
          })
        .catch(function (error) {
          console.log(error)
          _this.$notify.error({
            title: '错误',
            message: '新增失败'
          })
        })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-manufaction
  width 100%
  height 100%
  margin 50px 0px 0px 0px
</style>
