<template>
  <div>
    <div>
      选择班级：
      <Select v-model="subject" size="small" style="width:100px" @on-change="getJson">
        <Option v-for="item in classList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
      </Select>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
const data = [
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 408 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 628 },
  { country: 'Europe', year: '2100', value: 828 },
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 947 },
  { country: 'Asia', year: '1950', value: 1402 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 5268 },
  { country: 'Asia', year: '2100', value: 7268 }
];
import { listStudentAnswerSheetDetail } from "@/api/subjectAnalyze"
import { mapState } from 'vuex'
let _this
export default {
  name:"subject_question_score_class",
  data(){
    return{
      subject:"",
      classList:[],
      subject:""
    }
  },
  methods:{
    getJson(){
      listStudentAnswerSheetDetail({
      examId:this.examInfo.id,
      gradeId:this.examInfo.gradeId,
      schoolId:this.examInfo.schoolId,
      subjectId:this.subject,
      }).then(res=>{
        if(res.data.length===0) return _this.$message.warning("该科目暂无数据")
        let list=[]
        for(let item of res.data){
          let obj={}
          obj.country="第"+item.order+"题"
          obj.year=item.className
          obj.value=item.score
          list.push(obj)
        }
        _this.initChart(list)
      })
    },
    initChart(data){
      const ds = new this.$DataSet();
      const dv = ds.createView()
        .source(data)
        .transform({
          type: 'percent',
          field: 'value',       // 统计销量
          dimension: 'country',   // 每年的占比
          groupBy: [ 'year' ], // 以不同产品类别为分组
          as: 'percent'
        });
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.source(dv, {
        percent: {
          min: 0,
          formatter(val) {
            return (val * 100).toFixed(2);
          }
        }
      });
      chart.intervalStack()
        .position('year*percent')
        .color('country');
      chart.render();
      _this.$nextTick(()=>{
         if(document.getElementById("d1").children.length>1){
           document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
         }
      })
    }
  },
  computed:{
     ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  created(){
    _this=this
    this.classList=this.examInfo.subjectList
    this.subject=this.classList[0].subjectId
    this.getJson()
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>

</style>