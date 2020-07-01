<template>
    <div>
        <!--遍历标签类型-->
        <template v-for="(typeObj,index) in initData.warningRule">
            <div :key="index+'xx'">
                <el-checkbox v-model="checkedAllObj[typeObj.id]"
                             :key="index"
                             :label="typeObj.id"
                             @change="labelTypeCheckAllChannge(typeObj,$event)">{{typeObj.name}}
                </el-checkbox>
               <!-- {{checkedAllObj[typeObj.id]}}-->
                <div style="margin-left: 20px;margin-top:5px;">
                    <el-checkbox-group v-model="checkedRulesObj[typeObj.id]"
                                       :key="index+'on'"
                                       @change="labelCheckChannge(typeObj,typeObj.children.length,$event)">
                        <template v-for="(item,index) in typeObj.children">

                            <!--二级对象有children属性，二级对象当做标签 渲染，三级对象当做CheckBox-->
                            <template v-if="item.children">
                                <p :key="index+'p'" style="margin-bottom: 5px;">
                                   <!-- <el-tag style="margin-right:10px" size="mini" :key="index+'tag'">{{item.name}}
                                    </el-tag>-->
                                    <el-checkbox
                                            :key="index+'tag'"
                                            :label="item.id">{{item.name}}
                                    </el-checkbox>
                                    <template v-for="(items,indexs) in item.children">
                                        <el-checkbox
                                                :key="indexs"
                                                :label="items.id">{{items.name}}
                                        </el-checkbox>
                                    </template>
                                </p>
                            </template>
                            <!--二级对象没有children属性，当做CheckBox-->
                            <template v-else>
                                <el-checkbox
                                        :key="index"
                                        :label="item.id">{{item.name}}

                                </el-checkbox>
                            </template>

                        </template>
                    </el-checkbox-group>
                </div>
                <!--遍历标签类型下的标签 e-->
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            checkedAll: false,
            checkedRules: [],
            initData: {
                warningRule: [{
                    "id": "11",
                    "name": "A类型",
                    "children": [
                        {
                            "id": "12", "name": "情感",
                            "children": [
                                {"id": "13", "name": "哭",},
                                {"id": "14", "name": "笑",},
                            ]
                        }, {
                            "id": "15", "name": "天气",
                            "children": [
                                {"id": "16", "name": "阴",},
                                {"id": "17", "name": "晴",},
                            ]
                        }, {

                            "id": "18",
                            "name": "双面",
                            "children": [
                                {"id": "19", "name": "正",},
                                {"id": "20", "name": "反",},
                            ]
                        }]
                }, {
                    "id": "22",
                    "name": "B类型",
                    "children": [{"id": "23", "name": "哈哈"}, {"id": "24", "name": "嘿嘿"}]
                }]
            },
            checkedAllObj: {},
            checkedRulesObj: {},
        }
    },
    methods: {
        /**
         * @description 某个标签类型全选
         * @param typeObj [object]  当前类型完整对象
         * @param val [boolean] true：全选 false:取消全选
         * **/
        labelTypeCheckAllChannge(typeObj, val) {
            const mark = typeObj.id
            this.checkedAllObj[mark]
            // eslint-disable-next-line no-debugger
            // debugger
            if (!val) {
                this.checkedRulesObj[mark] = []
                console.log(`${typeObj.name} 类型的选中值 ` + this.checkedRulesObj[mark])
                return
            }
            const childrenVal = typeObj.children.map(item => item.id)
            this.checkedRulesObj[mark] = childrenVal
            //this.isindeterminate = false
            this.checkedRulesObj
            // eslint-disable-next-line no-debugger
            //debugger
            console.log(`${typeObj.name} 类型的选中值   ${childrenVal}`)
        },
        /**
         * @description 某个标签类型下单个checkbox
         * @param typeObj [object]  当前类型完整对象
         * @param tyeCount [number] 当前标签类型下children个数
         * @param val [array] 所有选择的checkbox值
         * **/
        labelCheckChannge(typeObj, tyeCount, val) {
            //TODO 三级的时候tyeCount计算三级相加
            const checkedCount = val.length
            // eslint-disable-next-line no-debugger
           debugger
            this.checkedAllObj[typeObj.id] = checkedCount === tyeCount
            // this.isindeterminate = checkedCount > 0 && checkedCount < tyeCount
            console.log(`${typeObj.name} 类型的选中值   ${val}=====` + checkedCount)
        }
    },
    created() {
        for (let key in this.initData.warningRule) {

            this.$set(this.checkedRulesObj, this.initData.warningRule[key].id, [])
            this.$set(this.checkedAllObj, this.initData.warningRule[key].id, [])
        }
        this.checkedRulesObj
        this.checkedAllObj
        // eslint-disable-next-line no-debugger
        // debugger
    },
}
</script>

<style scoped>

</style>
