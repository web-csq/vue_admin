<template>
  <div>
    <div>
      选择学科：
      <RadioGroup v-model="subject" type="button" @on-change="getQuestions">
        <Radio v-for="item in classList" :label="item.subjectId" :key="item.subjectId">{{item.subjectName}}</Radio>
      </RadioGroup>
    </div>
    <div style="margin:15px 0 0 0;">
      选择小题：
      <Select v-model="question" style="width:200px" @on-change='getJson'>
          <Option v-for="item in questionList" :value="item.order" :key="item.order">第{{ item.order }}题</Option>
      </Select>
    </div>
    <div class="chart-c" v-show="chartShow">
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
const data=[
{
"Class": "Summer 2013",
"Grade": "C",
"Score": 72.5
},
{
"Class": "Summer 2013",
"Grade": "C",
"Score": 77.5
},
{
"Class": "Summer 2013",
"Grade": "B",
"Score": 87.5
},
{
"Class": "Summer 2013",
"Grade": "A",
"Score": 91
},
{
"Class": "Summer 2013",
"Grade": "A",
"Score": 91.5
},
{
"Class": "Summer 2013",
"Grade": "A",
"Score": 90.5
}]
import { listStudentAnswerSheetDetail,listExamSubjectAnswer } from "@/api/subjectAnalyze"
import { mapState } from 'vuex'
let _this;
export default {
  name:"subject_question_score",
  data(){
    return{
      chartShow:true,
      subject:"",
      classList:[],
      subject:"",
      questionList:[],
      question:""
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    getQuestions(){
      listExamSubjectAnswer({
        examId:this.examInfo.id,
        subjectId:this.subject
      }).then(res=>{
        if(res.data.length!==0){
          _this.questionList=res.data;
          _this.$message.warning("该学科暂无数据")
        }else{
           _this.questionList=[]
        }
      })
    },
    getJson(){
      listStudentAnswerSheetDetail({
        examId:this.examInfo.id,
        gradeId:this.examInfo.gradeId,
        schoolId:this.examInfo.schoolId,
        subjectId:this.subject,
        order:this.question
      }).then(res=>{
        if(res.data.length===0){
          _this.chartShow=false
          return _this.$message.warning("该学科暂无数据")
        }
        _this.chartShow=true
        let list=[];
        for(let item of res.data){
          let obj={}
          obj.Class=item.className
          obj.Score=item.score
          obj.Grade="第"+item.order+"题"
          obj.Name=item.userName
          list.push(obj)
        }
        _this.initChart(list)
      })
    },
    initChart(data){
       const chart = new this.$G2.Chart({
          container: 'd1',
          forceFit: true,
          height: 300
        });
        chart.source(data);
        chart.tooltip({
          crosshairs: {
            type: 'cross'
          }
        });
        chart.legend({
          reversed: true // 图例项逆序显示
        });
        chart.axis('Score', {
          grid: null,
          max: 200, // 自定义最大值
          min: -20, // 自定义最小是
        });
        // x轴的栅格线居中
        chart.axis('Class', {
          tickLine: null,
          nice: true,
          subTickCount: 1, // 次刻度线个数
          subTickLine: {
            lineWidth: 1,
            stroke: '#BFBFBF',
            length: 10
          },
          grid: {
            align: 'center', // 网格顶点从两个刻度中间开始
            lineStyle: {
              stroke: '#8C8C8C',
              lineWidth: 1,
              lineDash: [ 3, 3 ]
            }
          },
          alias:"小题"
        });
        chart.point().position('Class*Score')
          .color('Class')
          .adjust('jitter')
          .shape('circle')
          .opacity(0.65)
          .size(4)
          .tooltip('Name*Grade*Score');
        // chart.legend(false)
        chart.render();


       _this.$nextTick(()=>{
         if(document.getElementById("d1").children.length>1){
           document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
         }
      })
    }
  },
  created(){
    _this=this
    this.classList=this.examInfo.subjectList
    this.subject=this.classList[0].subjectId
    _this.getQuestions()
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>

</style>