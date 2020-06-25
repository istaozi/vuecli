<template>
    <div>
        <el-table :data="data" :border="tableConfig.border" @selection-change="handleSelectionChange"
                  v-loading="tableConfig.loading">
            <!--checkbox列-->
            <el-table-column v-if="tableConfig.hasCheckbox||defaultOptions.hasCheckbox" type="selection" width="50" fixed></el-table-column>
            <!--索引列 -->
            <el-table-column type="index" width="50" label="序号" fixed></el-table-column>

            <!--数据列 start-->
            <template v-for="(column,index) in columns">
                <template v-if="!(hasOwnProp(column,'show')&&column.show===false)">
                    <el-table-column
                            :key="index"
                            :prop="column.prop"
                            :label="column.label"
                            :fixed="column.fixed || defaultOptions.fixed"
                            :width="column.width ||defaultOptions.width"
                            :align="column.align ||defaultOptions.align"
                            :show-overflow-tooltip="column.tooltip ||defaultOptions.tooltip">
                        <!-- 通过提供的默认插槽 拿到当前行的数据；-->
                        <template v-slot="scope">
                            <!--是否需要个性化判断-->
                            <template v-if="column.customized">
                                <!--将当前字段名作为插槽名称；通过行+列，匹配到具体值并利用属性prop将需要个性化处理的数据传递出去-->
                                <slot :name="column.prop" :value="scope.row[column.prop]"></slot>
                            </template>
                            <template v-else> {{scope.row[column.prop]}}</template>
                        </template>
                    </el-table-column>
                </template>
            </template>
            <!--数据列 end-->

            <!--操作列 start-->
            <template v-if="operates.show&&isAllOperateBtnsHidden(operates.btns)">
                <el-table-column
                        :prop="operates.prop"
                        :label="operates.label"
                        :fixed="operates.fixed || defaultOptions.fixed"
                        :width="operates.width || defaultOptions.width"
                        :align="operates.align || defaultOptions.align">
                    <template v-slot="scope">
                        <!--是否需要个性化判断-->
                        <template v-if="operates.customized&&(hasOwnProp(operates,'prop'))">
                            <!--按钮个性化的时候将当前行数据传递出去-->
                            <slot :name="operates.prop" :value="scope.row"></slot>
                        </template>
                        <template v-else>
                            <template v-for="(operateColumn,index) in operates.btns">
                                <el-button :key="index"
                                           v-if="!(hasOwnProp(operateColumn,'show')&&operateColumn.show===false)"
                                           :disabled="operateColumn.disabled || defaultOptions.disabled"
                                           :type="operateColumn.type || 'text'"
                                           @click.native.prevent="operateColumn.method(scope.row)">
                                    {{operateColumn.label}}
                                </el-button>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </template>
            <!--操作列 end-->
        </el-table>
    </div>

</template>

<script>
export default {
    name: "HiTable",
    methods: {
        /**
         * @description 检测对象自身是否存在某个属性
         * @param {Object} 被检测对象
         * @param {String} 被检测属性
         * @return {Boolean} 存在则返回true,不存在返回false
         *
         * */
        hasOwnProp(obj, attr) {
            return Object.prototype.hasOwnProperty.call(obj, attr);
        },

        /**
         * @description 当checkbox选择项发生变化时会触发该事件
         * @param {Array} 由被选中的数据组成的对象数组
         *
         **/
        handleSelectionChange(val) {
            this.multipleSelection = val;
            //将数据传递给调用者
            this.$emit('handleSelectionChange', val)

        },
        /**
         * @desc 检测是否所有操作按钮都设置了show:false
         * @param {Array} 操作按钮数组
         * @return {Boolean} 按钮show:false数量少于按钮个数，返回true
         *
         * */
        isAllOperateBtnsHidden(arry) {
            return arry.filter(_item => _item.show === false).length < arry.length
        }
    },
    props: {
        //数据列
        columns: {
            type: Array,
            default: () => []

        },
        //数据源
        data: {
            type: Array,
            default: () => []
        },
        //操作列
        operates: {
            type: Object,
            default: () => {
            }
        },
        //表格的参数
        tableConfig: {
            type: Object,
            default: () => {
            }
        },
    },
    data() {
        return {
            defaultOptions: {
                //表格相关参数 s
                hasCheckbox:false,
                loading:false,
                border: false,//是否带有纵向边框 boolean 默认false
                stripe: false,//是否为斑马纹table boolean 默认false
                highLightCurrentRow: false,//是否高亮当前行 boolean 默认false
                //表格相关参数 e

                //列相关参数 s
                align: 'left',//文字位置
                tooltip: true,//内容过长显示省略号
                width: 'auto',//列宽
                fixed: true,//固定列位置，默认值是true 相当于left（ true left right ）
                show: true,//是否显示当前列

                disabled: false, //** 操作列的按钮特有
                //列相关参数 e
            },
            multipleSelection: [],
        }
    },
}
</script>

<style scoped>

</style>
