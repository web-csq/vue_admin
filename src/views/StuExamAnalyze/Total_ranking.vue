<template>
  <div>
    <div class="">

    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
import { totalScoreAndRanking } from "@/api/stuAnalyze"
import { mapState } from "vuex"
const data=[
    {
    "Class": "高一一班",
    "Grade": "C",
    "Score": 72.5
    },
    {
    "Class": "高一二班",
    "Grade": "C",
    "Score": 77.5
    },
    {
    "Class": "高一一班",
    "Grade": "B",
    "Score": 87.5
    },
    {
    "Class": "高一二班",
    "Grade": "A",
    "Score": 91
    },
    {
    "Class": "高一三班",
    "Grade": "A",
    "Score": 91.5
    },
    {
    "Class": "高一二班",
    "Grade": "A",
    "Score": 90.5
    },
    {
    "Class": "高一一班",
    "Grade": "A",
    "Score": 90.5
    }
]
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
  methods:{
    initChart(data){
       const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 400
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
        grid: null
      });
      // x轴的栅格线居中
      chart.axis('Class', {
        tickLine: null,
        subTickCount: 1, // 次刻度线个数
        subTickLine: {
          lineWidth: 1,
          stroke: '#BFBFBF',
          length: 4
        },
        grid: {
          align: 'center', // 网格顶点从两个刻度中间开始
          lineStyle: {
            stroke: '#8C8C8C',
            lineWidth: 1,
            lineDash: [ 3, 3 ]
          }
        }
      });
      chart.point().position('Class*Score')
        .color('Grade')
        .adjust('jitter')
        .shape('circle')
        .opacity(0.65)
        .size(5);
      chart.legend(false)
      chart.render();
    }
  },
  created(){
    totalScoreAndRanking({
      examId:this.examInfo.id,
      gradeId:this.examInfo.gradeId,
      schoolId:this.examInfo.schoolId
    }).then(res=>{
      let list=[]
      for(let item of res.data){
        let obj={}
        obj.Class=item.className
        obj.Grade=item.userName
        obj.Score=item.score
        list.push(obj)
      }
      this.initChart(list)
    })
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>