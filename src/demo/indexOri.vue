/**
*Desc:iips-table用法示例
*Create by: liuxx
*Create time:2020/6/29/21:30
*/
<template>
  <div>
    <!--表格-->
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="日期">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="日期">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column prop="exeStatus" label="日期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.exeStatus==='200'" size="mini" type="success">{{ scope.row.exeStatus }}</el-tag>
          <el-tag v-else size="mini">{{ scope.row.exeStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="desc1" label="desc1">
        <template slot-scope="scope">
          {{scope.row.desc1}}
        </template>
      </el-table-column>
      <el-table-column prop="desc2" label="desc2">
        <template slot-scope="scope">
          {{scope.row.desc2}}
        </template>
      </el-table-column>
      <el-table-column prop="desc3" label="desc3">
        <template slot-scope="scope">
          {{scope.row.desc3}}
        </template>
      </el-table-column>
      <el-table-column prop="desc4" label="desc4">
        <template slot-scope="scope">
          {{scope.row.desc4}}
        </template>
      </el-table-column>
      <el-table-column prop="desc5" label="desc5" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.desc5}}
        </template>
      </el-table-column>
      <el-table-column prop="desc5" label="操作">
        <template>
          <el-button  type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    props: {},
    data() {
      return {
        // 表头-数据列
        tableHeader: [
          {
            prop: 'name', // 对应字段名
            label: '项目名称'// 列名
          },
          {
            prop: 'code', // 对应字段名
            label: '项目简称', // 列名
            width: '100'
          },
          {
            prop: 'status', // 对应字段名
            label: '项目状态'// 列名
          },
          {
            prop: 'exeStatus', // 对应字段名
            label: '项目执行状态' // 列名
          },
          {
            prop: 'desc1', // 对应字段名
            label: '描述1'// 列名
          },
          {
            prop: 'desc2', // 对应字段名
            label: '描述2'// 列名
          },
          {
            prop: 'desc3', // 对应字段名
            label: '描述3'// 列名
          },
          {
            prop: 'desc4', // 对应字段名
            label: '描述4', // 列名
            tooltip: true // 内容过长显示省略号
          },
          {
            prop: 'desc5', // 对应字段名
            label: '描述5', // 列名
            show: false
          }
        ],
        // 操作列
        operateColumn: {
          label: '操作',
          align: 'center',
          fixed: true, // 固定列位置，默认值是true 相当于left（ true left right ）
          // prop:'operatesBtn', //个性化 必须需配合
          // show: false,
          btns: [
            {
              label: '查看',
              show: true,
              method: (row) => {
                this.viewRowData(row);
              }
            },
            {
              label: '编辑',
              disabled: true,
              // show: false,
              method: (row) => {
                this.eidteRowData(row);
              }
            }, {
              label: '删除',
              disabled: false,
              method: (row) => {
                this.deleteRowData(row);
              }
            }
          ]
        },
        // 表格数据源
        tableData: [
          {
            name: '智能资讯推送管理平台',
            code: '资讯平台',
            status: '1',
            exeStatus: '100',
            desc1: 'desc1设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc2: 'desc2设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc3: 'desc3设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc4: 'desc4设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc5: 'desc5设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...'
          },
          {
            name: '智能资讯推送管理平台',
            code: '资讯平台',
            status: '2',
            exeStatus: '200',
            desc1: 'desc1设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc2: 'desc2设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc3: 'desc3设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc4: 'desc4设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
            desc5: 'desc5设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...'
          }
        ]
      };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      /**
       * @description 查看
       * @param {Object}  row 当前行的数据
       * */
      viewRowData(row) {
        this.$message(JSON.stringify(row, null, 2));
      },
      /**
       * @description 编辑
       * @param {Object}  row 当前行的数据
       * */
      eidteRowData(row) {
        this.$message(`${JSON.stringify(row, null, 2)}`);
      },
      /**
       * @description 删除
       * @param {Object}  row 当前行的数据
       * */
      deleteRowData(row) {
        this.$message(`${JSON.stringify(row, null, 2)}`);
      },
      /**
       * @description checkbox选择项发生变化时会触发该事件
       * @param {Array}  对象数组
       * */
      handleSelectionChange(val) {
        this.$message(`${JSON.stringify(val, null, 2)}`);
      }
    }

  };
</script>

<style lang="scss" scoped>
</style>
