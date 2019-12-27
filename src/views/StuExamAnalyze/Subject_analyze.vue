<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px;margin:0 20px 0 0" @on-change="getStus">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <!-- <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5> -->
    <div>
      学生列表：
    </div>
    <div style="margin-top: 20px;width:80%" class="radio-group">
      <el-radio-group v-model="stu" size="small" @change="select">
        <el-radio v-for="(item,index) in stuList" :key="index" :label="item.id" border>{{item.truename}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { subjectAnalysis } from "@/api/stuAnalyze" 
import { listUserByRoleIdAndPage } from "@/api/user"
import { mapState } from 'vuex';
let _this
export default {
  name:"",
  data(){
    return{
      model:"",
      stuList:[],
      stu:0,
      type:1
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
  created(){
    _this=this
    _this.model=_this.classList[0].id
    this.getStus()
    
  },
  methods:{
    select(value){
      subjectAnalysis({
        examId:this.examInfo.id,
        userId:_this.stu
      }).then(res=>{
        let list=[]
        for(let items of res.data){
          let obj={}
          console.log(items)
          obj["subject"]=items.subjectName.substr(2)
          obj["班级名次"]=items.classRank
          obj["年级名次"]=items.gradeRank
          list.push(obj)
        }
        console.log(list)
        _this.initChart(list)
        _this.type++
        
      })
    },
    getStus(){
      listUserByRoleIdAndPage({
        roleId:4,
        classId:this.model,
        enabled:1,
        pageSize:1000
      }).then(res=>{
        if(res.data===null) {
          _this.$message.warning("暂无数据")
          _this.stuList=[]
        } 
        if(res.code==="0000"){
          _this.stuList=res.data
          _this.stu=res.data[0].id
          _this.select()
        }
      })
    },
    initChart(data){
        const { DataView } = this.$DataSet;
      // const data = [
      //   { subject: '语文', 班级名次: 70, 年级名次: 30 },
      //   { subject: '数学', 班级名次: 60, 年级名次: 70 },
      //   { subject: '物理', 班级名次: 50, 年级名次: 60 },
      //   { subject: '英语', 班级名次: 20, 年级名次: 80 },
      //   { subject: '化学', 班级名次: 40, 年级名次: 50 },
      //   { subject: '生物', 班级名次: 60, 年级名次: 70 }

      // ];
      const dv = new DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ '班级名次', '年级名次' ], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500,
        padding: [ 20, 20, 95, 20 ]
      });
      chart.source(dv, {
        // score: {
        //   min: 0,
        //   max: 80
        // }
      });
      chart.coord('polar', {
        radius: 0.8
      });
      chart.axis('subject', {
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      });
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          },
          alternateColor: 'rgba(0, 0, 0, 0.04)'
        }
      });
      chart.legend('user', {
        marker: 'circle',
        offset: 30
      });
      chart.line().position('subject*score').color('user')
        .size(2);
      chart.point().position('subject*score').color('user')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        });
      chart.render();

      if(this.type!==1){
       
         _this.$nextTick(()=>{
           if(document.getElementById("d1").children.length>1){
             document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
           }
        })
      }
    }
  },
  mounted(){
    
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.radio-group >>> .el-radio{
  margin: 0;
}
</style>