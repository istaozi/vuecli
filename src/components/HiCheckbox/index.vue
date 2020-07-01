/**
*Desc:咨询信息管理
*Create by: liuxx
*Create time:2020/6/24/9:44
*/
<template>
  <div>
    <!--查询条件-->
    <div class="conditionWrapp">
      <el-form ref="queryFormRef" :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="获取时间">
          <el-date-picker
                  v-model="queryForm.aa"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="queryForm.a" placeholder="请输入资讯标题"/>
        </el-form-item>
        <el-form-item label="企业主体">
          <el-input v-model="queryForm.b" placeholder="请输入企业主体"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
          <el-link type="primary">更多</el-link>
        </el-form-item>
        <el-form-item style="display: block">
          <!--遍历标签类型-->
          <!--一级-->
          <template v-for="(firstItme,index) of initData.warningRule">
            <div :key="index+'xx'">
              <el-checkbox-group v-model="checkedAllFirst[firstItme.id]"
                           :key="index+'first'"
                           :label="firstItme.id"
                           @change="firstCheckChange(firstItme,$event)">{{firstItme.name}} =={{firstItme.id}}
                <el-checkbox
                        :checked="firstItme.checked"
                        v-model="firstItme.id"
                        :key="index+'second'"
                        :label="firstItme.id">{{firstItme.name}}=={{firstItme.id}}
                </el-checkbox>

              <!--</el-checkbox-group>-->

              <!--二级-->
              <div style="margin-left: 20px;margin-top:5px;"  v-for="(secondItem,index) in firstItme.children" :key="index+'a'">
                <el-checkbox-group v-model="checkedAllSecond[secondItem.id]"
                                   :key="index+'firstG'"
                                   @change="secondCheckChange(firstItme,secondItem,$event)">

                    <el-checkbox
                            :checked="secondItem.checked"
                            v-model="secondItem.id"
                            :key="index+'second'"
                            :label="secondItem.id">{{secondItem.name}}=={{secondItem.id}}
                    </el-checkbox>
                    <div>

                    <div style="margin-left: 20px;margin-top:5px;" v-if="hasOwnProp(secondItem,'children')">
                      <div v-for="(thirdItem,index) in secondItem.children" :key="index+'thi'">
                        <!--v-model="checkedAllThird[thirdItem.id]"-->
                        <el-checkbox-group v-model="checkedAllThird[thirdItem.id]"
                                           :key="index+'th'"

                                           @change="thirdCheckChange(firstItme,secondItem,thirdItem,$event)">
                          <!--三级-->
                          <!--:checked="checkedAllThird[thirdItem.id]" :checked="thirdItem.checked"-->
                          <el-checkbox

                                  :checked="thirdItem.checked"
                                  v-model="thirdItem.id"
                                  :key="index+'third'"
                                  :label="thirdItem.id">{{thirdItem.name}}=={{thirdItem.id}}
                          </el-checkbox>

                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
              <!--遍历标签类型下的标签 e-->

            </el-checkbox-group> </div>
          </template>
        </el-form-item>
        <el-form-item style="display: block">
          企业主体企业主体企业主体企业主体企业主体企业主体
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:40px;">

    </div>

    <!--分页 total:总条数 page:当前页面 limit:每页显示条数 pagination:当 limit 或者 page 发生改变时会触发,回调参数{page,limit}-->
    <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'Index',
  components: {Pagination},
  props: {},
  data() {
    return {
      isindeterminate: false,
      checkedAll: false,
      checkedRules: [],
      initData: {
        //标签类型细分
        labelTypes: [
          {id: "1", name: "来源"},
          {id: "2", name: "情感"},
          {id: "3", name: "关联度"},
          {id: "4", name: "风险标签"},
        ],
        warningRule: [{
          "id": "11",
          "name": "A类型", "checked": false,
          "children": [
            {
              "id": "12", "name": "A1", "labelType": "1", "checked": false,
              "children": [
                {
                  "id": "13", "name": "A11", "checked": false
                },
                {
                  "id": "14", "name": "A22", "checked": false
                },
                {
                  "id": "15", "name": "A33", "checked": false
                }
              ]
            },
            {
              "id": "16", "name": "A2", "checked": false,
            },
            {
              "id": "18", "name": "A3","checked": false,
            }
          ]
        }, {
          "id": "22",
          "name": "B类型", "checked": false,
          "children": [{"id": "23", "name": "B1", "checked": false,}, {"id": "24", "name": "B2", "checked": false,}]
        }]
      },
      //用来存储Id以及相应的选中状态checked S
      checkedAllFirst: {},
      checkedAllSecond: {},
      checkedAllThird: {},
      //用来存储Id以及相应的选中状态checked D
      //用来存储ID S
      checkedFirstIds:[],
      checkedSecondIds:[],
      checkedThirdIds:[],
      //用来存储ID D
      queryForm: {
        aa: '',
        a: '',
        b: ''
      },
      total: 20, // 分页相关参数、查询条件
      listQuery: {
        page: 1,
        limit: 10
      },
      // 表头
      tableHeader: [
        {
          prop: 'a',
          label: '获取时间'
        },
        {
          prop: 'b',
          label: '企业主体'
        },
        {
          prop: 'c',
          label: '资讯标题'
        },
        {
          prop: 'd',
          label: '资讯标题'
        },
        {
          prop: 'e',
          label: '舆情标签'
        },
        {
          prop: 'f',
          label: '来源'
        }
      ],
      // 操作列
      operateColumn: {
        label: '资讯详情',
        btns: [
          {
            label: '查看',
            method: (row) => {
              this.viewRowData(row);
            }
          }
        ]
      },
      // 表数据源
      tableData: [
        {
          a: 'a',
          b: 'a',
          c: 'a',
          d: 'a',
          e: 'a',
          f: 'a',
        },

      ],
    };
  },
  computed: { },
  watch: {},
  created() {
    this.initDataMethods();
    for (var firstObj of this.initData.warningRule) {

      this.$set(this.checkedAllFirst, firstObj.id, firstObj.checked)
      if (firstObj.children) {
        for (let secondObj of firstObj.children) {
          this.$set(this.checkedAllSecond, secondObj.id, secondObj.checked)

          if (secondObj.children) {
            for (let thirdObj of secondObj.children) {
              this.$set(this.checkedAllThird, thirdObj.id, thirdObj.checked)
            }
          }
        }


      }

    }
    console.log(`checkedAllFirst:${JSON.stringify(this.checkedAllFirst)}`)
    console.log(`checkedAllSecond:${JSON.stringify(this.checkedAllSecond)}`)
    console.log(`checkedAllThird:${JSON.stringify(this.checkedAllThird)}`)
  },
  mounted() {
  },
  methods: {
    hasOwnProp(obj, attr) {
      return Object.prototype.hasOwnProperty.call(obj, attr);
    },
    // 初始化数据
    initDataMethods() {
    },
    // 列表数据
    getList() {
    },
    /**
     * @description 查看
     * @param {Object}  row 当前行的数据
     * */
    viewRowData(row) {
      this.$message(JSON.stringify(row, null, 2));
    },
    getCheckedIds(){
      Object.keys(this.checkedAllThird).forEach((item)=>{
        console.log("keys: "+ item)
        if(this.checkedAllThird[item]){
          this.checkedThirdIds.push(item);
        }
      })
    },
    /**
     * @description 一级类型全选
     * @param typeObj [object]  当前类型完整对象
     * @param val [boolean] true：全选 false:取消全选
     * **/
    firstCheckChange(typeObj, val) {
    console.log(val)
        console.log("sec: "+JSON.stringify(this.checkedAllSecond))
        typeObj.children.forEach((item)=>{
          this.checkedAllSecond[item.id]=val;
          this.secondCheckChange(typeObj,item,val)
        })
        console.log("sec: "+JSON.stringify(this.checkedAllSecond))



      // eslint-disable-next-line no-debugger
      // debugger
      //   const mark = typeObj.id
      //   this.checkedAllFirst[mark]
      //   // eslint-disable-next-line no-debugger
      //   // debugger
      //   if (!val) {
      //     this.checkedAllSecond[mark] = []
      //     console.log(`${typeObj.name} 类型的选中值 ` + this.checkedAllSecond[mark])
      //     return
      //   }
      //   const childrenVal = typeObj.children.map(item => item.id)
      // typeObj.children.map(item => item.checked=true)
      //   this.checkedAllSecond[mark] = childrenVal
      //   //this.isindeterminate = false
      //   this.checkedAllSecond
      //   // eslint-disable-next-line no-debugger
      //   //debugger
      //   console.log(`${typeObj.name} 类型的选中值   ${val}`)
    },
    /**
     * @description 二级checkbox
     * @param typeObj [object]  当前类型完整对象
     * @param tyeCount [number] 当前标签类型下children个数
     * @param val [array] 所有选择的checkbox值
     * **/
    secondCheckChange(firstItme,secondItem,event) {

      console.log("before start checkedAllSecond: "+JSON.stringify(this.checkedAllSecond))
      // eslint-disable-next-line no-debugger
      debugger
      console.log("111")
      if(event){ //勾选
        //this.checkedSecondIds.push(secondItem.id)
        console.log("222FFchildren"+JSON.stringify(firstItme.children))
        console.log("222F"+firstItme.children.length)
        console.log("222CcheckedSecondIds"+this.checkedSecondIds)
        console.log("222C"+this.checkedSecondIds.length)
        // 处理上级 数据 S
        //根据当前点击的多选框 遍历checkedAllSecond中跟当前父元素对应的子元素 判断所有对应子元素的选中状态
        let childbool = true
        firstItme.children.forEach((item)=>{
          if(!this.checkedAllSecond[item.id]){
              childbool = false
          }
        })
        if(childbool)this.checkedAllFirst[firstItme.id]=true

       // if(firstItme.children.length===this.checkedSecondIds.length) {
         // console.log("before  firstItem:"+JSON.stringify(this.checkedAllFirst))
          //this.checkedAllFirst[firstItme.id]=true
         // console.log("after  firstItem:"+JSON.stringify(this.checkedAllFirst))
          //firstItme.checked=true
          //this.$set(this.checkedAllFirst, firstItme.checked, true)
          /* const secondIds=this.checkedSecondIds
           this.checkedAllFirst[firstItme.id]=[...secondIds]*/
       // }
        // 处理上级 数据 E

        // 处理下级 数据 S
        secondItem.children&&secondItem.children.map(item=>{

             this.checkedAllThird[item.id]= true
        })


        console.log("after start checkedAllSecond: "+JSON.stringify(this.checkedAllSecond))
        // 处理下级 数据 E
      }else{ //取消勾选
        console.log("333")
        // 处理上级 数据 S
        this.checkedAllFirst[firstItme.id]=false
        console.log("444"+JSON.stringify(secondItem.children))
        // this.checkedFirstIds.forEach((item, i) => {
        //   if (item == secondItem.id) {
        //     this.checkedFirstIds.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
        //   }
        // })
        // 处理上级 数据 E

        // 处理下级 数据 S
        //=公共方法
        //this.checkedSecondIds.pop(event)
        // this.checkedSecondIds.forEach((item, i) => {
        //   if (item == secondItem.id) {
        //     this.checkedSecondIds.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
        //   }
        // })
        secondItem.children&&secondItem.children.forEach((item)=>{

          console.log("5555")

          this.checkedAllThird[item.id]= false;
        })
        console.log("处理下级: "+JSON.stringify(this.checkedAllThird))
        // 处理下级 数据 E
      }

      console.log(`checkedAllThird:${JSON.stringify(this.checkedAllThird)}`)
      console.log(`checkedSecondIds:${this.checkedSecondIds}`)
      /* const checkedCount = val.length
       // eslint-disable-next-line no-debugger
       debugger
       this.checkedAllFirst[typeObj.id] = checkedCount === tyeCount
       // this.isindeterminate = checkedCount > 0 && checkedCount < tyeCount*/
      console.log(`${JSON.stringify(firstItme)} 类型的选中值   ${JSON.stringify(secondItem)}===== ${event}`)

      console.log("checkedThirdIds: "+this.checkedThirdIds)
    },


    /**
     * @description 三级checkbox
     * @param typeObj [object]  当前类型完整对象
     * @param tyeCount [number] 当前标签类型下children个数
     * @param val [array] 所有选择的checkbox值
     * **/
    thirdCheckChange(firstItme,secondObj,currentObj,event) {

      console.log(event)
      const sum=secondObj.children.length
      //this.checkedAllThird[currentObj.id]
      //当前选中
      if(event){
        //this.checkedThirdIds.push(currentObj.id)
        this.checkedAllThird[currentObj.id] = true;
        //this.checkedAllThird[currentObj.id].push(currentObj.id)
      }else{
        //this.checkedThirdIds.pop(currentObj.id)
        // this.checkedAllThird[currentObj.id].pop(currentObj.id)
        // this.checkedThirdIds.forEach((item, i) => {
        //   if (item == currentObj.id) {
        //     this.checkedThirdIds.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
        //   }
        // })

        this.checkedAllThird[currentObj.id]=false;
        this.checkedAllFirst[firstItme.id]=false;
      }


      let thiredchildbool = true
      secondObj.children.forEach((item)=>{
        if(!this.checkedAllThird[item.id]){
          thiredchildbool = false
        }
      })
      if(thiredchildbool){
        this.checkedAllSecond[secondObj.id]=true
        this.secondCheckChange(firstItme,secondObj,event);
      }
      else{
        this.checkedAllSecond[secondObj.id]=false
      }
      //let allbool = true;
      console.log("this.checkedAllSecond : "+ JSON.stringify(this.checkedAllSecond))

      //this.$set(this.checkedAllSecond, secondObj.id, this.checkedThirdIds)
      console.log("3nd: "+JSON.stringify(this.checkedAllThird)+"   "+thiredchildbool)


      console.log("checkedThirdIds: "+this.checkedThirdIds)
      //this.secondCheckChange(firstItme,secondObj,event);
      if(sum===this.checkedThirdIds.length){

        // eslint-disable-next-line no-debugger
        debugger

      }

      //this.checkedAllThird[currentObj.id]= sum===checkedIds.length

      /* debugger
      this.checkedAllSecond()[typeObj.id] = checkedCount === tyeCount
      console.log(`${typeObj.name} 类型的选中值   ${val}=====` + checkedCount)*/
    }
  },

};
</script>

<style lang="scss" scoped>

</style>
