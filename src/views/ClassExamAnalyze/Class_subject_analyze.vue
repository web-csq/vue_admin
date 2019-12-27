<template>
  <div>
    <div style="display:flex;align-items:center;">
      选择班级：
      <Select v-model="model" style="width:200px" @on-change="getData">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      &nbsp;&nbsp;&nbsp;
      选择学科：
      <Select v-model="subject" style="width:200px;margin:0 15px 0 0;" @on-change="getData">
          <Option v-for="item in examInfo.subjectList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
      </Select>
      分数间隔：
       <div style="display:inline-block;width:80px;">
         
        <Input v-model="section"  size="small" placeholder="输入分数段" />
      </div>
      
      <Button type="primary" style="margin:0 0 0 10px" :loading="btnLoading" @click="getData" size="small">设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
     <div class="tab-title">学科成绩分段报表</div>
     <Table border :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
import { listStudentScoreGroupByClass } from "@/api/classAnalyze"
import { mapState } from 'vuex';
let _this;
export default {
  name:"c_class_subject_analyze",
  data(){
    return{
      section:10,
      type:1,
      btnLoading:false,
        model: '',
        subjectList:[
          {
            value: 'chinese',
            label: '语文'
          },
          {
            value: 'math',
            label: '数学'
          },
          {
            value: 'english',
            label: '英语'
          },
          {
            value: 'physics',
            label: '物理'
          }
        ],
        subject:"chinese",
        columns: [],
       tableData: []
    }
  },
  methods:{
    getData(){
      this.btnLoading=true
      listStudentScoreGroupByClass({
        examId :this.examInfo.id,
        section:this.section,
        classId:_this.model,
        subjectId:this.subject
      }).then(res=>{
        _this.btnLoading=false;
        if(res.data.length===0) _this.$message.error("暂无数据")
        
        if(res.code==="0000"){
          let list=[];
          _this.columns=[]
          _this.tableData=[];
          let tabObj={}
          for(let item of res.data){
            let obj={},obj1={}
            obj.year=item.name;
            obj["数量"]=item.count
            list.push(obj)
            obj1.title=item.name;
            obj1.key=item.name
            _this.columns.push(obj1)
            tabObj[item.name]=item.count
          }
          _this.tableData.push(tabObj)
          _this.initChart(list)
          _this.type++
        }
      })
    },
    initChart(data){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 400
      });
      chart.source(data);
      chart.scale('数量', {
        min: 0
      });
      chart.scale('year', {
        range: [ 0, 1 ]
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      

      if(_this.type==1){
        chart.line().position('year*数量').shape('smooth');
        chart.area().position('year*数量').shape('smooth');
        chart.point().position('year*数量')
          .size(2)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });
        chart.render();
        chart.source(data);
      }else{
       chart.line().position('year*数量').shape('smooth');
        chart.area().position('year*数量').shape('smooth');
        chart.point().position('year*数量')
          .size(2)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });
        chart.changeData(data);
         _this.$nextTick(()=>{
           if(document.getElementById("d1").children.length>1){
             document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
           }
        })
      }
      

    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
  created(){
    _this=this;
    _this.model=_this.classList[0].id
    _this.subject=_this.examInfo.subjectList[0].subjectId
    _this.getData()
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss"
</style>