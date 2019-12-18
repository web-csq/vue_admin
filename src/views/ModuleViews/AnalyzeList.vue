<template>
  <div>
       <div class="top" style="padding:0 20px 0 0">
          <div>
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
          </div>
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
        <div class="tab-container"> 
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
                <Button type="primary" size="small" style="margin-right: 5px" @click="goAnalyze(index)">分析</Button>
                <Button type="error" size="small" @click="remove(index)">设置</Button>
                
            </template>
            </Table>
        </div>

        <!-- 分页 -->
        <div class="line"></div>
        <div class="cent">
          <Page :total="100" :page-size="10" @on-change="pageChange" show-elevator />
        </div>
        
      
      
     
  </div>
</template>

<script>

export default {
  name:"testmanager",
  data(){
    return{
      
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
              "key": "examName",
            },
            {
              "title": "科目",
              "key": "subject",
            },
            {
              "title": "年级",
              "key": "grade",
              'width':120
            },
            {
              "title": "考试时间",
              "key": "examTime",
              "width":100
            },
            {
              "title": "操作",
              "key": "action",
              "slot": 'action',
              "align":"center",
              "width":150
            }
          ],
          
          tableData: [
              {
                  grade: '高一',
                  examName: '第一次月考',
                  examTime: '2016-10-03',
                  subject:["语文","数学"].join(" | ")
              },
              {
                  grade: '高二',
                  examName: '第二次月考',
                  examTime: '2016-10-01'
              },
              {
                  grade: '高三',
                  examName: '模拟考试',
                  examTime: '2016-10-02'
              },
              {
                  grade: '初一',
                  examName: '期中考试',
                  examTime: '2016-10-04'
              },
              {
                  grade: '高一',
                  examName: '第一次月考',
                  examTime: '2016-10-03',
                  subject:["语文","数学"].join(" | ")
              },
              {
                  grade: '高二',
                  examName: '第二次月考',
                  examTime: '2016-10-01'
              },
              {
                  grade: '高三',
                  examName: '模拟考试',
                  examTime: '2016-10-02'
              },
              {
                  grade: '初一',
                  examName: '期中考试',
                  examTime: '2016-10-04'
              }
          ]
        }

      },
      methods:{
        cancel(){

        },
        
        pageChange(value){
          console.log(value)
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
        goAnalyze(index){
          console.log(index)
          this.$router.push("/")
        },
        remove(index){
          
          console.log(index)
        },
        jumpAddEaxm(){
          
        }
      },
      computed:{

      },
      components:{

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