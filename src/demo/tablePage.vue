<!--封装表格+分页的使用-->
<template>
    <div style="text-align: left">
        <!--查询条件-->
        <div class="conditionWrapp">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchFormRef" >
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button  @click="resetFormx('searchFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--操作-->
        <el-row class="handleRowWrapp">
            <el-col :span="12">
                <el-button type="primary">模板导人</el-button>
                <el-button>下载模版</el-button>
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导出</el-button>
            </el-col>
        </el-row>

        <!--表格-->
        <hi-table 
            :columns="tableHeader"
              :data="tableData"
              :operates="operateColumn"
              :loading="false"
              :border="false"
              :stripe="true"
              :highlight-current-row="true"
              :checkbox="true"
              @handleSelectionChange="handleSelectionChange"
        >
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
        <!--分页-->
        <div style="text-align: right">
            <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="getList"
                    layout='prev, pager, next,sizes, ->,jumper,total'/>
        </div>

    </div>
</template>

<script>
import HiTable from "../components/HiTable/index";
import Pagination from '../components/Pagination' //Pagination 组件主要是基于 Element 的 el-pagination进行了二次封装，并拓展了自动滚动的功能。

export default {
    name: "table01",
    components: {
        HiTable,
        Pagination
    },
    methods: {
        resetFormx(){},
        onSubmit() {
            // eslint-disable-next-line no-debugger
            debugger;
            this
            this.$root.resetFormx('searchFormRef') //无效
            //resetFormx('searchFormRef') //报错
            console.log('submit!');
        },
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
         * @param {Array}  对象数组
         * */
        handleSelectionChange(val) {
            this.$message(`${JSON.stringify(val, null, 2)}`)
        },
        getList() {
            // 获取数据
        },

    },
    data() {
        return { 
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
                align: 'center',
                //列相关的默认参数
                tooltip: true,//内容过长显示省略号
                width: '200',//对应列宽
                fixed: true,//固定列位置，默认值是true 相当于left（ true left right ） 
                //prop:'operatesBtn', //个性化 必须需配合customized属性才起作用
                //show: false,
           
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
                }, {
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
                }, {
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
                }, {
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
                }, {
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
            //分页设置
            total: 100,
            listQuery: {
                page: 1,
                limit: 10
            },
            formInline: {
                user: '',
                region: ''
            }

        }
    },
}
</script>

<style scoped>
    @import "../styles/table.less";
</style>
