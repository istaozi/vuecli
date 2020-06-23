<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column type="index" width="50"></el-table-column>
            <template v-for="(val,key,index) in tableColumnConfig">

                <!--ID列 s-->
                <!--如果是ID列且列的hidden:false显示-->
                <template v-if='key === "id"&&val["hidden"]'>
                    <el-table-column :prop="key" :label='val["label"]' :key='index' :hidden='val["hidden"]'></el-table-column>
                </template>
                <!--ID列 e-->

                <!--操作列，判断操作按钮（查看，编辑，删除）是否展示 s-->
                <template v-if='key === "handler"'>
                    <el-table-column :key='index' :label='val["label"]'>
                        <template v-slot="scope">
                            <el-button v-if='val["view"]' @click="handlerBtn(scope.row,'view')" type="text" size="small" >查看</el-button>
                            <el-button v-if='val["edite"]' @click="handlerBtn(scope.row,'edite')" type="text" size="small" >编辑</el-button>
                            <el-button v-if='val["delete"]' @click="handlerBtn(scope.row,'delete')" type="text" size="small" >删除</el-button>
                        </template>
                    </el-table-column>
                </template>
                <!--操作列，判断操作按钮（查看，编辑，删除）是否展示 e-->

                <!--非ID+操作列，普通展示 s-->
                <template v-if='key !== "handler"&&key !== "id"'>
                    <el-table-column :prop="key" :label='val' :key='index'></el-table-column>
                </template>
                <!--非ID+操作列，普通展示 e-->

            </template>

        </el-table>
    </div>

</template>

<script>
export default {
    name: "table01xx",
    methods: {
        handlerBtn(row, mark) {
            this.$emit('handleClick',row, mark)
            console.log(`当前操作按钮:${mark}   当前操作行的数据：${JSON.stringify(row)}`);
           /* switch (mark) {
                case 'view':
                    console.log(`view`)
                    break;
                case 'edite':
                    console.log(`edite`)
                    break;
                default:
                    console.log(`delete`)
                    break;
            }*/

        }
    },
    props:{
        //配置列
        tableColumnConfig:{
            type:Object,
        }
    },
    data() {
        return {
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
            ]
        }
    },
}
</script>

<style scoped>

</style>
