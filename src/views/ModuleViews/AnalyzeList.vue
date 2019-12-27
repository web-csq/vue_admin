<template>
  <div>
       <div class="top" style="padding:0 20px 0 20px">
         <!-- <div>
            区域选择：<Cascader 
                        class="cascader" 
                        :change-on-select="true" 
                        size="small" 
                        placeholder="请选择" 
                        trigger="click" 
                        :data="citys" 
                        v-model="city_value"
                        @on-change="city_change"
                        ></Cascader>
          </div>-->
          <div>
            按名称查找：<Input suffix="ios-search"
                              autocomplete="on" 
                              type="text" 
                              search 
                              v-model="name_value" 
                              size="small" 
                              placeholder="输入考试名称" 
                              style="width: 150px" 
                              @on-enter="nameEnter"
                              @on-click="nameClick"
                              />
          </div>
        </div>
        <div class="tab-container" style="margin-left:20px"> 
          <Table 
            width="auto" 
            :border="true"
            :columns="columns" 
            :data="tableData" 
            :highlight-row="true"
            size="small" 
            :loading="tableLoading"
            ref="table">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="goAnalyze(row)">查看报表</Button>
                <Button type="error" size="small" @click="remove(index)">设置</Button>
                
            </template>
            </Table>
        </div>

        <!-- 分页 -->
        <div class="line"></div>
        <div class="cent">
          <Page 
            :total="count" 
            :page-size="10" 
            :current="pageNum"
            @on-change="pageChange" 
            show-total
            show-elevator 
          />
        </div>
        
      
      
     
  </div>
</template>

<script>
import { listExamBySchoolId } from "@/api/test"
import { listClass } from "@/api/user"
import { mapMutations, mapState } from "vuex"
let _this;
export default {
  name:"testmanager",
  data(){
    return{
        count:0,
        pageNum:1,
          citys:[{
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫'
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [
                    {
                        value: 'nanjing',
                        label: '南京',
                        children: [
                            {
                                value: 'fuzimiao',
                                label: '夫子庙',
                            }
                        ]
                    },
                    {
                        value: 'suzhou',
                        label: '苏州',
                        children: [
                            {
                                value: 'zhuozhengyuan',
                                label: '拙政园',
                            },
                            {
                                value: 'shizilin',
                                label: '狮子林',
                            }
                        ]
                    }
                ],
            }],
          city_value:[],
          name_value:"",
          tableLoading:false,
          columns:[
            {
              "title": "考试名称",
              "key": "name",
              "width":200
            },
            {
              "title": "科目",
              "key": "subjectLists"
            },
            {
              "title": "状态",
              "key": "status",
              'width':120
            },
            {
              "title": "考试时间",
              "key": "createTime",
              "width":120
            },
            {
              "title": "操作",
              "key": "action",
              "slot": 'action',
              "align":"center",
              "width":150
            }
          ],
          tableData: []
        }

      },
      methods:{
        ...mapMutations("app",["ADDANALYZEEXAM","SETCLASSLIST"]),
        cancel(){

        },
        
        pageChange(value){
          console.log(value);
          this.pageNum = value;
          this.listExamBySchoolId();
        },
        filterMethod (value, option) {
          return option.indexOf(value) !== -1;
        },
        nameEnter(value){
          console.log(value)
        },
        nameClick(value){
          console.log(value)
        },
        city_change(value){
          console.log(value)
        },
        goAnalyze(row){
          this.ADDANALYZEEXAM(row);
          listClass({
            gradeId:row.gradeId,
            schoolId:row.schoolId,
            term:this.term,
            year:this.year
          }).then(res=>{
            if(res.code==="0000")
            _this.SETCLASSLIST(res.data)
          })
          this.$router.push("/")
          
        },
        remove(index){
          
          console.log(index)
        },
        jumpAddEaxm(){
          
        }
      },
      computed:{
        ...mapState({
          term:state=>state.user.term,
          year:state=>state.user.year
        })
        
      },
      components:{

      },
      created(){
        _this=this
        listExamBySchoolId({
          status:2,
          pageNum:this.pageNum,
          pageSize:10
        }).then(res=>{
          if(res.code==="0000"){
            if(res.count > 0){
              _this.tableData=res.data;
              for(let item of _this.tableData){
                item.subjectLists=new Array();
                for(let items of item.subjectList){
                  item.subjectLists.push(items.subjectName)
                }
                item.subjectLists= item.subjectLists.join("　|　")
                item.createTime= item.createTime.substring(0,10)
                switch(item.status){
                    case 0:
                      item.status="未上传";
                      break;
                    case 1:
                      item.status="未分析";
                      break;
                    case 2:
                      item.status="已分析";
                      break;
                  }
              }
            }
            _this.count=res.count
          
          }
        })
      },
  
      components:{

      }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
.contain >>> .ivu-table-wrapper{
  overflow: visible;
}
.contain >>> .ivu-table-wrapper{
  overflow: visible;
}
.top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  >div{
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  div:nth-child(2){
    margin: 25px !important;
  }
  >>> .ivu-input-icon-normal+.ivu-input{
    padding-right: 0px;
  }
  .cascader{
    display: inline-block;
  }
}

.line{
  height: 1rem;
}
</style>