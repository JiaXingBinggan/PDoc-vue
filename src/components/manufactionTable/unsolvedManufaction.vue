<template>
  <div class="unsolved-manufaction">
      <div class="searchInput">
        <el-select v-model="levelValue" placeholder="请选择故障等级">
          <el-option
          v-for="levelitem in leveloptions"
          :value="levelitem.value"
          :label="levelitem.label"
          >
            <div @click="level_select(levelitem)">{{levelitem.label}}</div>
        </el-option>
      </el-select>
      <el-select v-model="searchType" placeholder="请选择">
          <el-option
          v-for="searchitem in searchInputOptions"
          :label="searchitem.label"
          :value="searchitem.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="searchStartTime"
        type="date"
        placeholder="选择开始日期">
      </el-date-picker>
      <el-date-picker
        v-model="searchEndTime"
        type="date"
        placeholder="选择结束日期">
      </el-date-picker>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="warning" @click="reform">重置</el-button>
      <el-button type="success" @click="tableRefresh">刷新</el-button>
      </div>
      <el-table
        :data="currentManufaction"
        border
        style="width: 100%;text-align:center"
        >
            <el-table-column
              prop="id"
              label="故障编号"
              width="277"
              show-overflow-tooltip
              align="center">
              <!-- <template scope="scope">{{ scope.row.id }}</template> -->
            </el-table-column>
            <el-table-column
              prop="proposer"
              label="故障提出者"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="proposeTime"
              label="故障提出时间"
              width="200"
              sortable
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="description"
              label="故障描述"
              width="300"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="level"
              label="故障等级"
              width="100"
              :formatter="levelFormatter"
              align="center">
            </el-table-column>
            <el-table-column
              prop="status"
              label="故障状态"
              width="107"
              :formatter="statusFormatter"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="95"
              align="center">
              <template scope="scope">
              <el-tooltip class="item" effect="dark" content="处理故障" placement="top">
              <i class="el-icon-setting" @click="handleManufaction(scope.row.id)"></i>
              </el-tooltip> 
              <el-tooltip class="item" effect="dark" content="修改故障" placement="top"><i class="el-icon-edit" @click="updateManufaction(scope.row.id)"></i></el-tooltip> 
              <el-tooltip class="item" effect="dark" content="删除故障" placement="top"><i class="el-icon-delete" @click="deleteManufaction(scope.row.id)"></i></el-tooltip>
           </template>
          </el-table-column>
      </el-table>
    <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="sizePerOnePage"
        layout="total, prev, pager, next, jumper"
        :total="totalCommentSize">
      </el-pagination>
      <el-dialog title="处理故障" v-model="handleManufactionDialogVisible">
        <el-form :model="handleManufactionForm" :rules="handleRules" ref="handleManufactionForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="处理人" prop="handler">
            <el-input v-model="handleManufactionForm.handler"></el-input>
          </el-form-item>
          <el-form-item label="诊断原因" prop="diagnosis">
            <el-input type="textarea" v-model="handleManufactionForm.diagnosis"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitHandleForm('handleManufactionForm')">提交</el-button>
            <el-button @click="resetForm('handleManufactionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="处理故障" v-model="updateManufactionDialogVisible">
        <el-form :model="updateManufactionForm" :rules="updateRules" ref="updateManufactionForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="故障提出者" prop="proposer">
            <el-input v-model="updateManufactionForm.proposer"></el-input>
          </el-form-item>
          <el-form-item label="故障等级" prop="level">
            <el-select v-model="updateManufactionForm.level" placeholder="请选择故障等级">
              <el-option label="轻微" value="3"></el-option>
              <el-option label="一般" value="2"></el-option>
              <el-option label="严重" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提出时间" required>
            <el-col :span="11">
              <el-form-item prop="proposeTime1">
                <el-date-picker type="date" placeholder="选择日期" v-model="updateManufactionForm.proposeTime1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">------</el-col>
            <el-col :span="11">
              <el-form-item prop="proposeTime2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="updateManufactionForm.proposeTime2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="故障描述" prop="description">
            <el-input type="textarea" v-model="updateManufactionForm.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpdateForm('updateManufactionForm')">提交</el-button>
            <el-button @click="resetForm('updateManufactionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import manufactionApi from '../../api/manufactionApi'
export default {
  name: 'unsolved-manufaction',
  created () {
    this.getUnsolvedManufaction()
  },
  data () {
    return {
      currentId: '', // 当前id
      searchStartTime: '', // 搜索开始时间
      searchEndTime: '',  // 搜索结束时间
      currentPage: 1, // 当前页数
      sizePerOnePage: 10, // 每页数据条数
      currentManufaction: [], // 当前故障
      tableData: [], // 表格数据
      fixedHeader: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckbox: true,
      height: '400px',
      handleManufactionDialogVisible: false, // 处理故障对话框
      updateManufactionDialogVisible: false,
      // 修改故障对话框
      handleManufactionForm: { // 处理故障表单
        handler: '',
        diagnosis: ''
      },
      handleRules: { // 处理故障表单校验规则
        handler: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        diagnosis: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ]
      },
      updateManufactionForm: { // 修改故障表单
        proposer: '',
        proposeTime1: '',
        proposeTime2: '',
        description: '',
        level: ''
      },
      updateRules: { // 修改故障表单校验规则
        proposer: [
          { required: true, message: '请输入故障提出者', trigger: 'blur' }
        ],
        proposeTime1: [
          { type: 'date', message: '请选择年月日', trigger: 'change' }
        ],
        proposeTime2: [
          { type: 'date', message: '请选择时分秒', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写故障描述', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择故障等级', trigger: 'change' }
        ]
      },
      leveloptions: [{ // 故障等级查询
        value: '',
        label: '故障等级'
      }, {
        value: '3',
        label: '轻微'
      }, {
        value: '2',
        label: '一般'
      }, {
        value: '1',
        label: '严重'
      }],
      levelValue: '',
      searchInputOptions: [{ // 时间类型查询
        value: '',
        label: '全部提出时间'
      }, {
        value: 'proposeTime',
        label: '故障提出时间'
      }, {
        value: 'startTime',
        label: '开始处理时间'
      }, {
        value: 'endTime',
        label: '结束处理时间'
      }],
      searchType: ''
    }
  },
  methods: {
    level_select (item) { // 等级选择渲染表格数据
      var _this = this
      manufactionApi.getManufaction(item.value, '1', '', '', '', '10', '0')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    levelFormatter (row, column) { // 等级格式化
      if (row.level === 1) {
        row.column = '严重'
        return row.column
      }
      if (row.level === 2) {
        row.column = '一般'
        return row.column
      }
      if (row.level === 3) {
        row.column = '轻微'
        return row.column
      }
    },
    statusFormatter (row, column) { // 状态格式化
      if (row.status === 1) {
        row.column = '未处理'
        return row.column
      }
      if (row.status === 2) {
        row.column = '进行中'
        return row.column
      }
      if (row.status === 3) {
        row.column = '已完成'
        return row.column
      }
    },
    ymdFilter: function (value) { // 年月日过滤器
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
    hisFilter: function (value) { // 时分秒过滤器
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
    handleSizeChange (val) { // 控制表格大小
      console.log(val)
    },
    handleCurrentChange (val) { // 控制当前页面改变
      this.currentPage = val
      this.getCurrentManufaction(val)
    },
    getCurrentManufaction (page) { // 获得当前页面表格数据
      var size = this.tableData.length

      var startManufaction = this.sizePerOnePage * (page - 1)
      var endManufaction = startManufaction + this.sizePerOnePage
      endManufaction = endManufaction < size ? endManufaction : size
      this.currentManufaction = []
      for (var i = startManufaction; i < endManufaction; i++) {
        this.currentManufaction.push(this.tableData[i])
      }
    },
    getUnsolvedManufaction: function () { // 获得未处理的故障数据
      console.log(this.levelValue)
      var _this = this
      manufactionApi.getManufaction(this.levelValue, '1', this.searchType, this.searchStartTime, this.searchEndTime, '10', '0')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteManufaction (id) { // 删除数据
      this.$confirm('此操作将永久删除该故障, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this
        manufactionApi.deleteManufaction(id)
          .then(function (response) {
            _this.tableRefresh()
            _this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              title: '错误',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleManufaction (id) { // 弹出处理故障对话框
      this.currentId = id
      this.handleManufactionDialogVisible = true
    },
    updateManufaction (id) { // 弹出修改故障对话框
      this.currentId = id
      this.updateManufactionDialogVisible = true
      var _this = this
      manufactionApi.getSingleManufaction(id)
        .then(function (response) {
          _this.updateManufactionForm.proposer = response.data.result.proposer
          _this.updateManufactionForm.description = response.data.result.description
          if (response.data.result.level === 1) {
            _this.updateManufactionForm.level = '严重'
          }
          if (response.data.result.level === 2) {
            _this.updateManufactionForm.level = '一般'
          }
          if (response.data.result.level === 3) {
            _this.updateManufactionForm.level = '轻微'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitHandleForm (formName) { // 提交处理故障表单
      var _this = this
      manufactionApi.handleManufactionStart(this.currentId, this.handleManufactionForm.handler, this.handleManufactionForm.diagnosis)
        .then(function (response) {
          _this.handleManufactionDialogVisible = false
          _this.tableRefresh()
          _this.handleManufactionForm.handler = ''
          _this.handleManufactionForm.diagnosis = ''
          _this.$notify({
            title: '成功',
            message: '故障开始处理',
            type: 'success'
          })
        })
        .catch(function (error) {
          console.log(error)
          _this.$notify.error({
            title: '错误',
            message: '处理失败'
          })
        })
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitUpdateForm (formName) { // 提交修改故障表单
      var proposeTimeYMD = this.ymdFilter(this.updateManufactionForm.proposeTime1)
      var proposeTimeHIS = this.hisFilter(this.updateManufactionForm.proposeTime2)
      var proposeTime = proposeTimeYMD + ' ' + proposeTimeHIS
      console.log(proposeTime)
      var _this = this
      manufactionApi.updateManufaction(this.currentId, this.updateManufactionForm.level, this.updateManufactionForm.proposer, proposeTime, this.updateManufactionForm.description)
        .then(function (response) {
          _this.updateManufactionDialogVisible = false
          _this.tableRefresh()
          _this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
        })
        .catch(function (error) {
          console.log(error)
          _this.$notify.error({
            title: '错误',
            message: '修改失败'
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
    resetForm (formName) { // 重置表单
      this.$refs[formName].resetFields()
    },
    search () { // 点击搜索按钮触发搜索
      var startTime = this.ymdFilter(this.searchStartTime)
      var endTime = this.ymdFilter(this.searchEndTime)
      var _this = this
      manufactionApi.getManufaction(this.levelValue, '1', this.searchType, startTime, endTime, '10', '0')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reform () { // 重置按钮点击触发
      this.levelValue = ''
      this.searchType = ''
      this.searchStartTime = ''
      this.searchEndTime = ''
    },
    tableRefresh () { // 刷新按钮点击触发
      var _this = this
      manufactionApi.getManufaction('', '1', '', '', '', '', '')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
    totalCommentSize () { // 计算表格数据长度
      return this.tableData.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.searchInput
  width 100%
  height 40px
  float right
.el-icon-setting:hover
  cursor pointer
.el-icon-edit:hover
  cursor pointer
.el-icon-delete:hover
  cursor pointer
</style>
