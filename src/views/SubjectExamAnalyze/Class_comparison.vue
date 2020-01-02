<template>
  <div>
    <div>
      选择学科：
      <RadioGroup v-model="subject" type="button" @on-change="getJson">
        <Radio
          v-for="item in classList"
          :label="item.subjectId"
          :key="item.subjectId"
        >{{item.subjectName}}</Radio>
      </RadioGroup>
    </div>
    <div class="chart-c" style="max-width:1280px">
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
import { listExamClassSubject } from "@/api/subjectAnalyze"
import { mapState } from "vuex"
let _this
const data = [
  { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
  { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
  { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
  { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
  { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
  { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30 },
  { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
  { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 }
];
export default {
  name:"subject_class_comparison",
  data(){
    return{
      classList:[],
      subject:""
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    initChart(data){
      const dv = new this.$DataSet.DataView().source(data);
      dv.transform({
        type: 'map',
        callback: obj => {
          obj.range = [ obj.low, obj.q1, obj.median, obj.q3, obj.high ];
          return obj;
        }
      });
      const chart = new G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
        // padding: [ 20, 120, 95 ]
      });
      chart.source(dv, {
        range: {
          // max: 35
        }
      });
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'rect'
        },
        itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
          + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
          + '{name}<br/>'
          + '<span style="padding-left: 16px">最高分：{high}</span><br/>'
          + '<span style="padding-left: 16px">上四分位数：{q3}</span><br/>'
          + '<span style="padding-left: 16px">平均分：{median}</span><br/>'
          + '<span style="padding-left: 16px">下四分位数：{q1}</span><br/>'
          + '<span style="padding-left: 16px">最低分：{low}</span><br/>'
          + '</li>'
      });
      chart.schema().position('x*range')
        .shape('box')
        .tooltip('x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
          return {
            name: x,
            low,
            q1,
            median,
            q3,
            high
          };
        })
        .style({
          stroke: '#545454',
          fill: '#1890FF',
          fillOpacity: 0.3
        });
      chart.render();
      _this.$nextTick(()=>{
         if(document.getElementById("d1").children.length>1){
           document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
         }
      })
    },
    getJson(){
      listExamClassSubject({
      examId :this.examInfo.id,
      gradeId :this.examInfo.gradeId,
      schoolId:this.examInfo.schoolId,
      subjectId:this.subject
    }).then(res=>{
      if(res.code==="0000"){
        let list=[],classList=[]
        for(let item of res.data){
          let obj={};
          obj.x=item.className
          obj.q1=(item.medianScore+item.minScore)*0.5
          obj.low=item.minScore
          obj.q3=(item.medianScore+item.maxScore)*0.5
          obj.high=item.maxScore
          obj.median=item.avgScore
          list.push(obj)
        }
        
        this.initChart(list)

      }
    })
    }
  },
  mounted(){
    
  },
  created(){
    this.classList = this.examInfo.subjectList;
    this.subject=this.examInfo.subjectList[0].subjectId
    _this=this
    this.getJson()
  }
}
</script>

<style lang="scss" scoped>

</style>