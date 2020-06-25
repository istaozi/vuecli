<!--封装表格的使用-->
<template>
    <div>
        <hi-table :columns="tableHeader" :data="tableData" :operates="operateColumn"
                   :tableConfig="tableConfig" @handleSelectionChange="handleSelectionChange">
            <!--v-slot简写为：#-->
            <!--obj:写成obj为了告知此处接受的是一个对象，名字可随意命名，-->
            <!--数据列：状态列个性化颜色-->
            <template #exeStatus="obj">
                <el-tag type="success" v-if="obj.value==='200'">{{obj.value}}</el-tag>
                <el-tag v-else>{{obj.value}}</el-tag>
            </template>
            <!--操作列：按钮个性化定制-->
            <template #operatesBtn="obj">
                 {{obj.value}}
            </template>
        </hi-table>
    </div>

</template>

<script>
import HiTable from "../components/HiTable/index";
export default {
    name: "table01",
    components: {
       HiTable
    },
    methods: {
        /**
         * @description 查看
         * @param {Object}  row 当前行的数据
         * */
        viewRowData(row) {
            this.$message(JSON.stringify(row, null, 2))
        },
        /**
         * @description 编辑
         * @param {Object}  row 当前行的数据
         * */
        eidteRowData(row) {
            this.$message(`${JSON.stringify(row, null, 2)}`)
        },
        /**
         * @description 删除
         * @param {Object}  row 当前行的数据
         * */
        deleteRowData(row) {
            this.$message(`${JSON.stringify(row, null, 2)}`)
        },
        /**
         * @description checkbox选择项发生变化时会触发该事件
         * */
        handleSelectionChange(val) {
            this.$message(`${JSON.stringify(val, null, 2)}`)
        }
    },
    data() {
        return {
            //表格的配置信息
            tableConfig:{
                hasCheckbox:false,
                loading:false,
            },
            //表头-数据列
            tableHeader: [
                {
                    prop: 'name',//对应字段名
                    label: '项目名称',//列名
                },
                {
                    prop: 'code',//对应字段名
                    label: '项目简称',//列名
                    width: '100'
                },
                {
                    prop: 'status',//对应字段名
                    label: '项目状态',//列名
                },
                {
                    prop: 'exeStatus',//对应字段名
                    label: '项目执行状态',//列名
                    customized: true,
                },
                {
                    prop: 'desc1',//对应字段名
                    label: '描述1',//列名
                },
                {
                    prop: 'desc2',//对应字段名
                    label: '描述2',//列名
                },
                {
                    prop: 'desc3',//对应字段名
                    label: '描述3',//列名
                },
                {
                    prop: 'desc4',//对应字段名
                    label: '描述4',//列名
                },
                {
                    prop: 'desc5',//对应字段名
                    label: '描述5',//列名
                    show: false,
                },

            ],
            //操作列
            operateColumn: {
                label: '操作',
                align:'center',
                //列相关的默认参数
                tooltip: true,//内容过长显示省略号
                width: '200',//对应列宽
                fixed: true,//固定列位置，默认值是true 相当于left（ true left right ）

                //customized:true,//个性化 必须需配合prop属性才起作用
                //prop:'operatesBtn', //个性化 必须需配合customized属性才起作用
                //操作列的按钮特有 s
                show: true,
                //操作列的按钮特有 e
                btns: [
                    {
                        label: '查看',
                        show: true,
                        method: (row) => {
                            this.viewRowData(row)
                        }
                    },
                    {
                        label: '编辑',
                        disabled: true,
                        method: (row) => {
                            this.eidteRowData(row)
                        }
                    }, {
                        label: '删除',
                        disabled: true,
                        method: (row) => {
                            this.deleteRowData(row)
                        }
                    },
                ]
            },
            //表格数据源
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
                    desc5: 'desc5设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',

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
                    desc5: 'desc5设置舆情规则-1.新闻舆情：公告、新闻媒体、正面、负面、一般负面...，2.风险事件：债券违约、股权冻结、异常运营、严重违法、行政处罚...，3.工商变更：股权变更、负责人变更、注册资本变更、高管变更...',
                },
            ],

        }
    },
}
</script>

<style scoped>
</style>
