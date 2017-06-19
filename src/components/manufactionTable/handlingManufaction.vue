<template>
  <div class="handling-manufaction">
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
      <el-button type="success" @click="tableRefresh">刷新</i></el-button>
      </div>
      <el-table
        :data="currentManufaction"
        border
        style="width: 100%;text-align:center"
        >
            <el-table-column
              prop="id"
              label="编号"
              width="163"
              show-overflow-tooltip
              align="center">
              <!-- <template scope="scope">{{ scope.row.id }}</template> -->
            </el-table-column>
            <el-table-column
              prop="proposer"
              label="提出者"
              width="90"
              align="center">
            </el-table-column>
            <el-table-column
              prop="proposeTime"
              label="提出时间"
              width="135"
              show-overflow-tooltip
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="160"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="level"
              label="等级"
              width="80"
              :formatter="levelFormatter"
              align="center">
            </el-table-column>
            <el-table-column
              prop="handler"
              label="处理人"
              width="90"
              align="center">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间"
              width="150"
              show-overflow-tooltip
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="diagnosis"
              label="故障原因"
              width="160"
              align="center">
            </el-table-column>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="90"
              :formatter="statusFormatter"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template scope="scope">
              <el-tooltip class="item" effect="dark" content="确认处理故障" placement="top">
            <i class="el-icon-check" @click="confirmManufaction(scope.row.id)"></i>
            </el-tooltip> <el-tooltip class="item" effect="dark" content="删除故障" placement="top"><i class="el-icon-delete" @click="deleteManufaction(scope.row.id)"></i></el-tooltip></template>
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
      <el-dialog title="处理故障" v-model="handleConfirmDialogVisible">
      <el-form :model="handleConfirmForm" :rules="confirmRules" ref="handleConfirmForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="处理步骤" prop="prosessStep">
          <el-input type="textarea" v-model="handleConfirmForm.prosessStep"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitConfirmForm('handleConfirmForm')">提交</el-button>
          <el-button @click="resetForm('handleConfirmForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
  </div>
</template>

<script>
import manufactionApi from '../../api/manufactionApi'
export default {
  name: 'handling-manufaction',
  created () {
    this.getHandlingManufaction()
  },
  data () {
    return {
      currentId: '', // 当前id
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
      handleConfirmDialogVisible: false,
      // 确认处理故障对话框
      handleConfirmForm: { // 确认处理故障表单
        prosessStep: ''
      },
      confirmRules: { // 确认处理故障表单校验规则
        prosessStep: [
          { required: true, message: '请输入处理步骤', trigger: 'blur' }
        ]
      },
      searchStartTime: '', // 搜索开始时间
      searchEndTime: '', // 搜索结束时间
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
      manufactionApi.getManufaction(item.value, '2', '', '', '', '10', '0')
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
    getHandlingManufaction: function () { // 获得未处理的故障数据
      var _this = this
      manufactionApi.getManufaction('', '2', '', '', '', '', '')
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
    confirmManufaction (id) { // 弹出确认处理故障对话框
      this.currentId = id
      this.handleConfirmDialogVisible = true
    },
    submitConfirmForm (formName) { // 提交确认处理故障表单
      var _this = this
      manufactionApi.handleManufactionConfirm(this.currentId, this.handleConfirmForm.prosessStep)
       .then(function (response) {
         _this.handleConfirmDialogVisible = false
         _this.tableRefresh()
         _this.handleConfirmForm.prosessStep = ''
         _this.$notify({
           title: '成功',
           message: '处理完成',
           type: 'success'
         })
       })
       .catch(function (error) {
         console.log(error)
         _this.$notify({
           title: '错误',
           message: '处理失败'
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
      manufactionApi.getManufaction(this.levelValue, '2', this.searchType, startTime, endTime, '10', '0')
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
      manufactionApi.getManufaction('', '2', '', '', '', '', '')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
          console.log(response)
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
.el-icon-delete:hover
  cursor pointer
.el-icon-check:hover
  cursor pointer
</style>
