<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px;margin:0 20px 0 0" @on-change="getStus">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    
    <div class="chart-c">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1" v-if="chartShow"></div>
    </div>
    <!-- <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5> -->
    <div style="max-width:80%" class="radio-group" v-if="chartShow">
      学生列表：
      <el-radio-group v-model="stu" size="small" @change="select">
        <el-radio v-for="(item,index) in stuList" :key="index" :label="item.id" border>{{item.truename}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { subjectAnalysis } from "@/api/stuAnalyze" 
import { listEachSubjectScoreInfo } from "@/api/schoolAnalyze"
import { listUserByRoleIdAndPage } from "@/api/user"
import { mapState } from 'vuex';
let _this
export default {
  name:"",
  data(){
    return{
      chartShow:false,
      model:"",
      stuList:[],
      stu:0,
      type:1,
      schoolScore:[],
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
    this.getListEachSubjectScoreInfo();
    this.getStus()
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","学科分析")
    },
    select(value){
      subjectAnalysis({
        examId:this.examInfo.id,
        userId:_this.stu
      }).then(res=>{
        if(res.data.length!==0){
        this.chartShow=true
        let list=[]
        // console.log(this.schoolScore)
        for(let items of res.data){
          // obj["年级名次"]=items.gradeRank
          for( let s_item of this.schoolScore){
            let obj={}
            if( s_item.item ==  items.subjectName.substr(2)){
              obj["subject"]=items.subjectName.substr(2)
              obj["学生该科得数"]=items.score
              obj["该科最高分"]=s_item['该科最高分']
              obj["该科平均分"]=s_item['该科平均分']
              obj["该科最低分"]=s_item['该科最低分']
              list.push(obj)
            }
          }
        }
        // console.log(list)
        _this.$nextTick(()=>{
          _this.initChart(list)
        })
        _this.type++
        }else{
          this.chartShow=false
          _this.$message.warning("暂无数据！")
        }
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
      const dv = new DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ '该科最高分','学生该科得数','该科平均分','该科最低分' ], // 展开字段集 '年级名次' 
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
        score: {
          min: 0,
          max: 150
        }
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
      chart.line().position('subject*score').color('user',function(user){
        if( user == "该科最低分"){
          return 'red'
        }
      }).size(2);
      chart.point().position('subject*score').color('user',function(user){
        if( user == "该科最低分"){
          return 'red'
        }
      }).shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        });
      chart.render();
      if(document.getElementById("d1").children.length>1){
        document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
      }
    },
    async getListEachSubjectScoreInfo(){//列出年级最高分
      listEachSubjectScoreInfo({
        examId :this.examInfo.id,
        gradeId :this.examInfo.gradeId,
        schoolId :this.examInfo.schoolId
      }).then( res => {
        this.schoolScore = [];
        if(res.data != null && res.data.length != 0){
          for(let item of res.data){
            let s_obj = {};
            s_obj.item = item.subjectName.substring(2);
            s_obj['该科最高分'] = item.maxScore;
            s_obj['该科平均分'] = item.avgScore;
            s_obj['该科最低分'] = item.minScore;
            this.schoolScore.push(s_obj);
          }
          // console.log(this.schoolScore)
        }

      })
    }
  },
  mounted(){
    
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.radio-group >>> .el-radio.is-bordered+.el-radio.is-bordered{
  margin-left: 0px; 
  margin-right: 15px ;
  margin-top:10px;
}
.radio-group >>> .el-radio{
  margin-right: 15px ;
}
</style>