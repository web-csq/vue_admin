<template>
  <div>
       <div class="top" style="padding:0 20px 0 0">
         <div>
           <Button type="primary" @click="modalShow=true">添加考试</Button>
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
                <Button type="primary" size="small" style="margin-right: 5px" @click="lead(index)">导入成绩</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
                
            </template>
            </Table>
        </div>

        <!-- 分页 -->
        <div class="line"></div>
        <div class="cent">
          <Page :total="100" :page-size="10" @on-change="pageChange" show-elevator />
        </div>
        
        <!-- 添加考试弹窗 -->
        <Modal
            title="添加考试"
            :scrollable="false"
            v-model="modalShow"
            @on-ok="addExam"
            @on-cancel="modalShow=false"
            :closable="false">
             <div class="dis">
              考试名称：<Input v-model="examName" placeholder="Enter something..." clearable style="width: 200px" />
            </div>
            <div class="dis">
              年级：<Select v-model="grade" style="width:200px">
                      <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
            </div>
            <div class="dis">
              科目：<el-checkbox-group v-model="subject" size="small">
                      <el-checkbox-button v-for="city in gradeList" :label="city.name" :key="city.id">{{city.name}}</el-checkbox-button>
                    </el-checkbox-group>
            </div>
        </Modal>

        <!-- 导入成绩 -->
        <el-dialog
          title="导入成绩表格"
          :visible.sync="dialogVisible"
          width="30%"
          >
          
          <div class="con">
            <div>总分表模板下载</div>
            <div>小题得分表模板下载</div>
            <div>答案表模板下载</div>
          </div>
          <Upload ref="upload1" :format="['xlsx','xls']" accept=".xlsx,xls" :multiple="true" action="//proxy_api/jsonplaceholder.typicode.com/posts/">
            <Button type="primary" size="small" style="margin-right: 5px" @click="leadIn(0)">导入总分</Button>
          </Upload>
          <Upload ref="upload2" :format="['xlsx','xls']" accept=".xlsx,xls" :multiple="true" action="//jsonplaceholder.typicode.com/posts/">
            <Button type="primary" size="small" style="margin-right: 5px" @click="leadIn(1)">导入小题分</Button>
          </Upload>
          <Upload ref="upload3" :format="['xlsx','xls']" accept=".xlsx,xls" action="//jsonplaceholder.typicode.com/posts/">
            <Button type="primary" size="small" style="margin-right: 5px" @click="leadIn(2)">导入答案</Button>
          </Upload>
          
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
          </span>
        </el-dialog>
         
     
  </div>
</template>

<script>

export default {
  name:"testmanager",
  data(){
    return{
      dialogVisible:false,
      examName:"",
      grade:[],
      subject:[],
      cities:['语文', '北京', '广州', '深圳'],
       gradeList: [
          {
              id: '1',
              name: '高一'
          },
          { 
              id: '2',
              name: '高二'
          }
       ],
        modalShow:false,
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
        addExam(){
          this.$Message.success('添加成功');
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
        lead(index){
          this.dialogVisible=true;
        },
        leadIn(type){
          console.log(type)
          
        },
        remove(index){
          
          console.log(index)
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
.dis{
  display: flex;
  align-items: center;
  margin: 0 0 30px 0;
}
.line{
  height: 1rem;
}

.con{
  display: flex;
  align-items: center;
  margin-bottom:10px; 
  div:first-child{
    margin-left: 0 !important;
  }
  div{
    margin: 0 20px;
    border: 1px solid #ccc;
    border-radius:5px;
    padding: 2px 10px;
  }
}
</style>