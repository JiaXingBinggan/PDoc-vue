<template>
  <div class="search-bar">
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
      <el-button type="primary" icon="search" @click="search">查询</el-button>
      <el-button type="success" @click="tableRefresh"><i class="el-icon-caret-left"></i>刷新</el-button>
  </div>
</template>

<script>
import manufactionApi from '../../api/manufactionApi'
export default {
  name: 'search-bar',
  data () {
    return {
      msg: '这是搜索条',
      currentPage: 1,
      sizePerOnePage: 8,
      currentManufaction: [],
      tableData: [],
      fixedHeader: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckbox: true,
      height: '400px',
      searchStartTime: '',
      searchEndTime: '',
      leveloptions: [{
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
      searchInputOptions: [{
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
    getCurrentManufaction (page) {
      var size = this.tableData.length

      var startManufaction = this.sizePerOnePage * (page - 1)
      var endManufaction = startManufaction + this.sizePerOnePage
      endManufaction = endManufaction < size ? endManufaction : size
      this.currentManufaction = []
      for (var i = startManufaction; i < endManufaction; i++) {
        this.currentManufaction.push(this.tableData[i])
      }
    },
    level_select (item) {
      var _this = this
      manufactionApi.getManufaction(item.value, '1', '', '', '', '10', '0')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
    search () {
      var startTime = this.ymdFilter(this.searchStartTime)
      var endTime = this.ymdFilter(this.searchEndTime)
      var _this = this
      manufactionApi.getManufaction(this.levelValue, '1', this.searchType, startTime, endTime, '10', '0')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tableRefresh () {
      var _this = this
      manufactionApi.getManufaction('', '1', '', '', '', '', '')
        .then(function (response) {
          _this.tableData = response.data.result.data
          _this.getCurrentManufaction(1)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.search-bar
  width 100%
  height 40px
  float right
</style>
