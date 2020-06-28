<!--封装表格+分页的使用-->
<template>
    <div style="text-align: left">
        <!--查询条件-->
        <div class="conditionWrapp">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchFormRef">
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
                    <el-button @click="resetFormx('searchFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--操作-->
        <el-row class="handleRowWrapp">
            <el-col :span="12">
                <!--
                action 上传地址
                auto-upload 是否在选取文件后立即进行上传
                -->
                <el-upload style="display: inline-block" action
                           :auto-upload="false"
                           accept=".xlsx,.xls"
                           :show-file-list="false"
                           :on-change="handleInportxlsxData"
                >
                    <el-button type="primary">模板导人</el-button>
                </el-upload>
                <el-button>下载模版</el-button>
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-button type="primary">新增</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>

        <!--表格-->
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
//import xlsx from 'xlsx'
import {readFile, exportExcel} from '../utils/index'
import xlsx from "xlsx";

export default {
    name: "table01",
    components: {
        HiTable,
        Pagination
    },
    methods: {
        /**
         *@description 导入表格数据到表
         * */
        async handleInportxlsxData(event) {
            const file = event.raw;
            //如果文件不存在，直接return
            if (!file) return;
            //读取File中的数据 二进制
            let data = await readFile(file)
            /*  const jsondata=binaryDataToJson(data,this.tableHeader)
             console.log(jsondata)*/


            //通过xlsx读取二进制数据 生成表格
            const workbook = xlsx.read(data, {type: "binary"})
            // console.log("workBook:" + JSON.stringify(workbook))
            //拿到第一个表格sheet
            const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]]

            //获取表头数据 s
            const fromTo = firstWorkSheet['!ref'];// A1:B5

            let excelHeader=[]
            const char=fromTo.split(':')[1].substring(0,1)
            const charInd="ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char)
            //const num=fromTo.split(':')[1].substring(1)
            for(let i=0;i<=charInd;i++){
               const code= String.fromCharCode(65+i)
                //获取指定A1的cell数据
                const cellV=firstWorkSheet[code+1]&&firstWorkSheet[code+1].h
                console.log("cellV:"+cellV)
                excelHeader.push(cellV)
            }
            console.log("A1····A5 的数据"+excelHeader) //A1····A5 的数据
            //获取表头数据 e

            //表格模板的标准头部数据（跟定义的表格头一致）
            const headerM = this.tableHeader.map(item => {
                return item.label
            })
            //对比表格的头是否模板一致
            const result=headerM.every((item,indx)=>{
                const temp= excelHeader[indx];
                return temp===item
            })
            if(!result){
                return   this.$message.error(`模板格式错误，请使用正确模板填写上传。`)
            }
            console.log('============')

            //通过xlsx将数据转为json数据
            data = xlsx.utils.sheet_to_json(firstWorkSheet)
            console.log("JSON" + JSON.stringify(data))


            //将数据中的中文key变为字段名
            let arr = []
          /*  data.map((item) => {
                let obj = {}
                this.tableHeader.map((headerItem) => {
                    // eslint-disable-next-line no-prototype-builtins
                    if ((headerItem.hasOwnProperty('required') && headerItem['required'] === true) && !(item[headerItem['label']])) {
                        //this.$message.error(`第【${item.__rowNum__+1}行】 【${headerItem['label']}列】 数据有误，请修改后再次上传。`)
                        this.$message.error(`第【${item.__rowNum__ + 1}行】数据有误，请修改后再次上传。`)
                        return
                    }
                    obj[headerItem['prop']] = item[headerItem['label']]


                })
                arr.push(obj)
                console.table("arrr" + JSON.stringify(arr))
                this.tableData = arr
            })*/
            for (let item of data) {
                let obj = {}
                for (let headerItem of this.tableHeader) {
                    // eslint-disable-next-line no-prototype-builtins
                    if ((headerItem.hasOwnProperty('required') && headerItem['required'] === true) && !(item[headerItem['label']])) {
                        //this.$message.error(`第【${item.__rowNum__+1}行】 【${headerItem['label']}列】 数据有误，请修改后再次上传。`)
                        this.$message.error(`第【${item.__rowNum__ + 1}行】数据有误，请修改后再次上传。`)
                        return
                    }
                    obj[headerItem['prop']] = item[headerItem['label']]
                }
                arr.push(obj)
                console.table("arrr" + JSON.stringify(arr))
                this.tableData = arr
            }


            // this.tableData=arr
            //TODO 调用后端接口 将jsondata传给后台
            // TODO  成功后刷新当前列表
        },
        /**
         * @description 导出数据
         * */
        exportExcel() {
            const exportData = this.tableData
            if (exportData.length === 0) {
                return this.$message.error("目前表格没有数据不能导出");
            }

            exportExcel(exportData, this.tableHeader, '二级投资')
        },
        onSubmit() {
            // eslint-disable-next-line no-debugger
            debugger;
            this
            //this.$root.resetFormx('searchFormRef') //无效
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
            //表格的配置信息
            tableConfig: {
                hasCheckbox: true,
                loading: false,
            },
            //表头-数据列
            tableHeader: [
                {
                    prop: 'name',//对应字段名
                    label: '项目名称',//列名
                    required: true, //导入表格必填项目
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


            ],
            //操作列
            operateColumn: {
                label: '操作',
                align: 'center',
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

                },
                {
                    name: '智能资讯推送管理平台',
                    code: '资讯平台',
                    status: '2',
                }, {
                    name: '智能资讯推送管理平台',
                    code: '资讯平台',
                    status: '1',
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
