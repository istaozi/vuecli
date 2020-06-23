<template>
    <div>
        <p>普通表格</p>
        <!--未经封装的table s-->
        <el-table :data="tableData" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="skill" label="技能点"></el-table-column>
            <el-table-column prop="level" label="等级"></el-table-column>
            <el-table-column label="操作列">
                <template v-slot="scope">
                    <el-button @click="handleClick(scope.row,'view')" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick(scope.row,'edite')" type="text" size="small">编辑</el-button>
                    <el-button @click="handleClick(scope.row,'delete')" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--未经封装的table e-->

        <p>封装1.0后的表格</p>
        <!--封装后的table s-->
        <table01xx :tableColumnConfig="tableColumn" @handleClick="handleClick" v-on="$listeners"></table01xx>
        <!--封装后的table e-->

        <p>封装2.0后的表格</p>
        <!--封装后的table s-->
        <table01xx2 :tableColumnConfig="tableColumn2" :tableData="tableData" @handleClick="handleClick" v-on="$listeners"></table01xx2>
        <!--封装后的table e-->
    </div>

</template>

<script>

import table01xx from "./table01xx";
import table01xx2 from "./table01xx2";

export default {
    name: "table01",
    components: {
        table01xx,
        table01xx2
    },
    methods: {
        handleClick(row, mark) {
            switch (mark) {
                case 'view':
                    console.log(`view`)
                    break;
                case 'edite':
                    console.log(`edite`)
                    break;
                default:
                    console.log(`delete`)
                    break;
            }

        }
    },
    data() {
        return {
            //表格数据源
            tableData: [
                {
                    id: 11,
                    skill: 'vue',
                    level: 5,
                },
                {
                    id: 22,
                    skill: 'react',
                    level: 5,
                },
            ],
            //配置表格列参数
            tableColumn: {
                skill: '技能点',
                level: '等级',
                handler: {
                    label: '操作',
                    view: true,
                    edite: true,
                    delete: true,
                },
            },
            //配置表格列参数
            tableColumn2: {
                columns:{
                    skill: '技能点',
                    level: '等级',
                    handler: {
                        label: '操作',
                        view: true,
                        edite: true,
                        delete: true,
                    },
                },
                //全选功能默认为false
                selection:true,

            },
        }
    },
}
</script>

<style scoped>

</style>
