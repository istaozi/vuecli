<template>
  <div>
    <el-table
      v-loading="loading"
      :border="border"
      :stripe="stripe"
      :highlight-current-row="highlightCurrentRow"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <!--checkbox列-->
      <el-table-column v-if="checkbox" type="selection" width="55" fixed />
      <!--索引列 -->
      <el-table-column type="index" width="50" label="序号" fixed />

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
            :show-overflow-tooltip="column.tooltip"
          >
            <!-- 通过提供的默认插槽 拿到当前行的数据；-->
            <template v-slot="scope">
              <!--将当前字段名作为插槽名称；通过行+列，匹配到具体值并利用属性prop将需要个性化处理的数据传递出去-->
              <slot :name="column.prop" :value="scope.row[column.prop]">
                {{ scope.row[column.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </template>
      <!--数据列 end-->

      <!--操作列 start-->
      <template v-if="(!(hasOwnProp(operates,'show')&&operates.show===false))">
        <el-table-column
          :prop="operates.prop"
          :label="operates.label"
          :fixed="operates.fixed || defaultOptions.fixed"
          :width="operates.width || defaultOptions.width"
          :align="operates.align || defaultOptions.align"
        >
          <template v-slot="scope">
            <!--按钮个性化：需要显示指定prop字段-->
            <slot :name="operates.prop" :value="scope.row">
              <template v-for="(operateColumn,index) in operates.btns">
                <el-button
                  v-if="!(hasOwnProp(operateColumn,'show')&&operateColumn.show===false)"
                  :key="index"
                  :disabled="operateColumn.disabled || defaultOptions.disabled"
                  size="small"
                  :type="operateColumn.type?operateColumn.type:'text'"
                  @click.native.prevent="operateColumn.method(scope.row)"
                >
                  {{ operateColumn.label }}
                </el-button>
              </template>

            </slot>

          </template>
        </el-table-column>
      </template>
      <!--操作列 end-->
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'HiTable',
  props: {
    loading: { // loading
      type: Boolean,
      default: false
    },
    border: { // 是否带有纵向边框
      type: Boolean,
      default: false
    },
    checkbox: { // 是否显示多选框
      type: Boolean,
      default: true
    },
    stripe: { // 是否为斑马纹table boolean
      type: Boolean,
      default: false
    },
    highlightCurrentRow: { // 是否高亮当前行
      type: Boolean,
      default: false
    },
    // 数据列
    columns: {
      type: Array,
      default: () => []

    },
    // 数据源
    data: {
      type: Array,
      default: () => []
    },
    // 操作列
    operates: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      defaultOptions: {
        align: 'center', // 文字位置
        tooltip: true, // 内容过长显示省略号
        width: 'auto', // 列宽
        fixed: true, // 固定列位置，默认值是true 相当于left（ true left right ）
        show: true, // 是否显示当前列
        disabled: false //* * 操作列的按钮特有
      },
      multipleSelection: []
    };
  },
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
      // 将数据传递给调用者
      this.$emit('handleSelectionChange', val);
    },
    /**
       * @desc 检测是否所有操作按钮都设置了show:false
       * @param {Array} 操作按钮数组
       * @return {Boolean} 按钮show:false数量少于按钮个数，返回true
       *
       * */
    isAllOperateBtnsHidden(arry) {
      return arry.filter(_item => _item.show === false).length < arry.length;
    }
  }
};
</script>

<style scoped>

</style>

