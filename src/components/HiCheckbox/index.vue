/**
*Desc:咨询信息管理
*Create by: liuxx
*Create time:2020/6/24/9:44
*/
<template>
    <div>
        <ul class="ul-wrapper">
            <el-checkbox-group
                    v-model="checkedIds[firstArrayKey]"
            >
                <!--一级数据循环 S-->
                <li v-for="(firstItem,firstItemIndex) in checkboxData" :key="firstItemIndex">
                    <div class="firstItem-wrapper" style="float:left;">
                        <el-checkbox
                                :key="firstItem.id"
                                :label="firstItem.id"
                                @change="handleCheckChange(firstItem,$event,firstItemIndex,1)"
                        >
                            {{ firstItem.id }}=={{ firstItem.name }}
                        </el-checkbox>
                    </div>
                    <div class="secondItem-wrapper">
                        <ul>
                            <el-checkbox-group
                                    :key="firstItem.id+'-2group'"
                                    v-model="checkedIds[firstItem.id]">
                                <!--二级数据循环 S-->
                                <li v-for="(secondItem,secondItemIndex) in firstItem.children" :key="secondItemIndex">
                                    <div class="secondItem-inner">
                                        <el-checkbox
                                                :key="secondItem.id"
                                                style="float:left;"
                                                :label="secondItem.id"
                                                :value="secondItem.id"
                                                @change="handleCheckChange(firstItem,secondItem,$event,2)"
                                        >
                                            {{ secondItem.id }}=={{ secondItem.name }}
                                        </el-checkbox>
                                    </div>
                                    <!--三级 S-->
                                    <div v-if="secondItem.children" class="thirdItem-wrapper">
                                        <el-checkbox-group
                                                :key="secondItem.id+'-3group'"
                                                v-model="checkedIds[secondItem.id]"
                                                style="float:left;margin-left:30px;"
                                        >

                                            <template v-for="(thirdItem) in secondItem.children">
                                                <el-checkbox :key="thirdItem.id"
                                                             :label="thirdItem.id"
                                                             @change="handleCheckChange(firstItem,secondItem,$event,3)"
                                                >
                                                    {{ thirdItem.id }}=={{ thirdItem.name }}
                                                </el-checkbox>
                                            </template>
                                        </el-checkbox-group>
                                    </div>
                                    <!--三级 E-->

                                </li>

                            </el-checkbox-group>
                            <!--二级数据循环  E-->

                        </ul>

                    </div>

                </li>
                <!--一级数据循环 E-->

            </el-checkbox-group>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'Index',
    props: {},
    data() {
        return {
            isCheckedRules: [],
            checkboxData:
                [{
                    'id': '11',
                    'name': '新闻舆情',
                    'children': [
                        {
                            'id': '12', 'name': '来源：',
                            'children': [
                                {
                                    'id': '13', 'name': '公告',
                                },
                                {
                                    'id': '14', 'name': '新闻媒体',
                                },
                                {
                                    'id': '15', 'name': '短视频',
                                }
                            ]
                        },
                        {
                            'id': '16', 'name': '情感',
                            'children': [
                                {
                                    'id': '133', 'name': '正面',
                                },
                                {
                                    'id': '144', 'name': '负面',
                                },
                                {
                                    'id': '155', 'name': '严重负面',
                                }
                            ]
                        },
                        {
                            'id': '18', 'name': '关联',
                        }
                    ]
                },
                    {
                        'id': '22',
                        'name': 'B类型',
                        'children': [
                            {
                                'id': '23', 'name': 'B1',
                            },
                            {
                                'id': '24',
                                'name': 'B2',

                            }]
                    }],
            firstArrayKey:'001',
            firstCheckedIds: [],
            checkedIds: {}
        };
    },
    computed: {},
    watch: {},
    created() {
        this.setCheckedIds(this.checkboxData);
        this.$set(this.checkedIds, this.firstArrayKey, [])
    },
    mounted() {

    },
    methods: {
        hasOwnProp(obj, attr) {
            return Object.prototype.hasOwnProperty.call(obj, attr);
        },
        handleCheckChange() {
            const lastArg = arguments[arguments.length - 1];
            var parentObj;
            var currentObj;
            var checkedIds;
            var checkStatus;
            switch (lastArg) {
                case 3:
                    parentObj = arguments[1];
                    checkedIds = this.checkedIds[parentObj.id];
                    //处理上级
                    if (checkedIds.length === parentObj.children.length) {
                        if(!this.checkedIds[arguments[0].id].includes(parentObj.id)) {
                            this.checkedIds[arguments[0].id].push(parentObj.id)
                        }

                        if(this.checkedIds[arguments[0].id].length===arguments[0].children.length){
                            this.checkedIds[this.firstArrayKey].push(arguments[0].id);
                        }
                    } else {
                        if(this.checkedIds[arguments[0].id].includes(parentObj.id)) {
                            this.checkedIds[arguments[0].id]
                                .splice(this.checkedIds[arguments[0].id].indexOf(parentObj.id), 1)
                        }
                        if(this.checkedIds[this.firstArrayKey].includes(arguments[0].id)) {
                            this.checkedIds[this.firstArrayKey]
                                .splice(this.checkedIds[this.firstArrayKey].indexOf(arguments[0].id), 1)
                        }
                    }
                    break;
                case 2: //第二级 中间级
                    //上级对象
                    parentObj = arguments[0];
                    checkedIds = this.checkedIds[parentObj.id];
                    //当前对象
                    currentObj = arguments[1];
                    checkStatus = arguments[2]

                    //处理当前对象及其下级
                    this.handlerCurrentObj(currentObj, checkStatus)
                    //判断是勾选还是取消勾选
                    if (checkStatus) {
                        //处理上级
                        if (checkedIds.length === parentObj.children.length) {
                            if(!this.checkedIds[this.firstArrayKey].includes(parentObj.id))
                            this.checkedIds[this.firstArrayKey].push(parentObj.id)
                            this.firstCheckedIds.push(parentObj.id)
                        } else {
                            if(this.firstCheckedIds.indexOf(parentObj.id)!=-1){
                                this.firstCheckedIds.splice(this.firstCheckedIds.indexOf(parentObj.id), 1);

                            }
                        }

                    } else {
                        if(this.checkedIds[this.firstArrayKey].indexOf(parentObj.id)!=-1){
                            this.checkedIds[this.firstArrayKey].splice(this.checkedIds[this.firstArrayKey].indexOf(parentObj.id),1)
                        }
                        if(this.firstCheckedIds.indexOf(parentObj.id)!=-1){
                            this.firstCheckedIds.splice(this.firstCheckedIds.indexOf(parentObj.id), 1);
                        }
                    }
                    break;
                default: //一级触发事件
                    parentObj = arguments[0];
                    this.handlerCurrentObj(parentObj, arguments[1])
                    if (arguments[1]) {
                        this.firstCheckedIds.push(parentObj.id)
                    }
                    break;
            }
            console.log("checkedIds"+JSON.stringify(this.checkedIds))
        },
        //处理当前对象及其下级
        handlerCurrentObj(currentObj, isChecked) {
            currentObj.children && currentObj.children.map(item => {
                if (isChecked) {
                    if (!this.checkedIds[currentObj.id].includes(item.id))
                        this.checkedIds[currentObj.id].push(item.id)
                }else {
                    this.checkedIds[currentObj.id].splice(this.checkedIds[currentObj.id].indexOf(item.id), 1)
                }
                this.handlerCurrentObj(item, isChecked)

                return true;
            })

        },
        setCheckedIds(data) {
            for (const item of data) {
                this.$set(this.checkedIds, item.id, []);
                if (item.children) {
                    this.setCheckedIds(item.children);
                }
            }
        }

    }

};
</script>

<style lang="less" scoped>
    .ul-wrapper {
        li {
            list-style: none;
            clear: both;

            .firstItem-wrapper {

            }

            .secondItem-wrapper {
                .secondItem-inner {
                }

                .thirdItem-wrapper {
                }
            }

        }
    }
</style>
