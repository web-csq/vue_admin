<template>
  <div>
       <div class="top" style="padding:0 20px 0 20px">
         <div>
           <Button type="primary" size="small" @click="modalShow=true">添加考试</Button>
         </div>
          <!-- <div>
            按名称查找：
            <Input icon="ios-search"
                autocomplete="on" 
                type="text" 
                search 
                v-model="name_value" 
                size="small" 
                placeholder="输入考试名称" 
                style="width: 150px" 
                @on-enter="nameClick"
                @on-click="nameClick"
                />
          </div> -->
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
                <Button type="primary" size="small" style="margin-right: 5px" @click="lead(index)">详情</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
                
            </template>
            </Table>
        </div>

        <!-- 分页 -->
        <div class="line"></div>
        <div class="cent">
          <Page :total="count" :current="pageNum" :page-size="pageSize" @on-change="pageChange" show-total show-elevator />
        </div>
        
        <!-- 添加考试弹窗 -->
        <Modal
            title="添加考试"
            :scrollable="false"
            v-model="modalShow"
            :loading="modelLoading"
            :mask-closable="false"
            @on-ok="handleSubmit('formValidate')"
            @on-cancel="modalShow=false"
            :closable="false">
            <el-form :model="ruleForm" :rules="rules"  ref="formValidate" label-width="60px" class="demo-ruleForm">
              <el-form-item label="名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入考试名称"></el-input>
              </el-form-item>
              <el-form-item label="年级:" prop="grade" required>
                <el-select v-model="ruleForm.grade" placeholder="选择年级">
                  <el-option v-for="(item,index) in classList" :key="index" :label="item.dictdataName" :value="item.dictdataValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:" prop="type" required>
                <el-select v-model="ruleForm.type" placeholder="选择考试类型">
                  <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学科:" prop="subjectList" class="check" required >
                <el-checkbox-group v-model="ruleForm.subjectList" size="mini">
                  <el-checkbox v-for="(item,index) in subjectList" :label="item.dictdataName" :key="index" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="学校:" v-if="ruleForm.type==3" required prop="schoolList" class="check">
                <el-checkbox-group v-model="ruleForm.schoolList" size="mini">
                  <el-checkbox v-for="(item,index) in schoolList" :label="item.dictdataName" :key="index" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
        </Modal>

  </div>
</template>

<script>
import { listExamBySchoolId,addExam,deleteExam } from "@/api/test"
import { mapState } from "vuex";
let _this;
export default {
  name:"testmanager",
  data(){
    return{
      dialogVisible:false,
      classcity:[],
      modelLoading:true,
      ruleForm: {
        name: '',
        grade: '',
        subjectList:[],
        schoolList:[]
      },
      rules: {
        name: [
          { required: true, message: '请输入考试名称', trigger: 'blur' },
        ],
        grade: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择考试类型', trigger: 'blur' }
        ],
        subjectList: [
          { required: true, message: '请选择学科', trigger: 'blur' }
        ],
        schoolList: [
          { required: true, message: '请选择学校', trigger: 'blur' }
        ]
      },
      examName:"",
      examPerson:"",
      count:0,
      pageSize:10,
      pageNum:1,
      grade:[],
      subject:[],
      cities:['语文', '北京', '广州', '深圳'],
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
              "key": "name",
              'width':150
            },
            {
              "title": "科目",
              "key": "subjectLists",
            },
            {
              "title": "年级",
              "key": "gradeName",
              'width':120
            },
            {
              "title": "创建时间",
              "key": "createTime",
              "width":120
            },
            {
              "title": "状态",
              "key": "status",
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
        cancel(){

        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
            if (valid) {
              let list=[],gradeName="";
              for(let item in _this.subjectList){
                if(_this.ruleForm.subjectList.includes(_this.subjectList[item]["dictdataName"])){
                  let obj = new Object();
                  obj.subjectId=_this.subjectList[item].dictdataValue;
                  obj.subjectName=_this.subjectList[item].dictdataName;
                  list.push(obj)
                }
              }
              for(let item in _this.classList){
                if(_this.classList[item].dictdataValue==_this.ruleForm.grade){
                  gradeName=_this.classList[item].dictdataName
                }
              }
              
              addExam({
                name:_this.ruleForm.name,
                gradeId:_this.ruleForm.grade,
                gradeName,
                type:_this.ruleForm.type,
                subjectList: list
              },{
                "content-type":"application/json"
              }).then(res=>{
                if(res.code!=="0000"){
                  _this.modelLoading=false
                  setTimeout(()=>{
                    _this.modelLoading=true
                  },100)
                }else{
                  _this.$message.success(res.message);
                  setTimeout(()=>{
                    _this.$router.go(0)
                  },800)
                
                }
                
              })
              
            } else{
              _this.modelLoading=false
              setTimeout(()=>{
                _this.modelLoading=true
              },100)
            }
            
          });
        },
        pageChange(value){
           _this.getList(value)
        },
        filterMethod (value, option) {
          return option.indexOf(value) !== -1;
        },
        nameClick(value){
          console.log(12312)
        },
        city_change(value){
          console.log(value)
        },
        lead(index){
          console.log(_this.tableData[index])
          window.sessionStorage.examId=_this.tableData[index].id
          this.$router.push({
            path:"/testdetail"
          })
        },
        leadIn(type){
          console.log(type)
          
        },
        remove(row){
          this.$Modal.confirm({
            title: '提示',
            content: '确认删除此次考试？',
            onOk: () => {
                deleteExam({
                    examId:row.id
                  }).then(res=>{
                    if(res.code==="0000")
                    _this.$message.success(res.message)
                    setTimeout(()=>{
                      _this.$router.go(0);
                    },300)
                    
                  })
            },
            onCancel: () => {
            }
          });
          return
          
        },
        getList(pageNum){
          _this.tableLoading=true
          listExamBySchoolId({
            pageNum,
            pageSize:_this.pageSize
          }).then(res=>{
            if (res.count > 0) {
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
            _this.count=res.count;
            _this.tableLoading=false;
          })
        }
      },
      created(){
        _this=this
        _this.getList(1)
      },
      computed:{
        ...mapState({
          classList:state=>state.user.classList,
          typeList:state=>state.app.examType,
          subjectList:state=>state.user.subjectList
        })
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
  justify-content: flex-start;
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
.demo-ruleForm{
  text-align: left;
}
.check >>> .el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin-left: 0px;
}
</style>