<template>
  <div>
    <div>
      选择学科：
       <RadioGroup v-model="subject" type="button" @on-change="getJson">
        <Radio v-for="item in subjectList" :label="item.subjectId" :key="item.subjectId">{{item.subjectName}}</Radio>
      </RadioGroup>
    </div>
    <div class="chart-c" v-if="chartShow">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
import { listStudentAnswerSheetDetail } from "@/api/subjectAnalyze"
import { mapState } from 'vuex'
let _this;
export default {
  name:"subject_question_score_class",
  data(){
    return{
      chartShow:true,
      subject:"",
      subjectList:[],
      classList:[]
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","年级班级总分分布")
    },
    getJson(){
      listStudentAnswerSheetDetail({
      examId:this.examInfo.id,
      gradeId:this.examInfo.gradeId,
      schoolId:this.examInfo.schoolId,
      subjectId:this.subject,
      }).then(res=>{
        if(res.data.length===0){
          _this.chartShow=false
          return _this.$message.warning("该学科暂无数据")
        }
        _this.chartShow=true
        let list=[]
        for(let item of res.data){
          let obj={}
          obj.country="第"+item.order+"题"
          obj.year=item.className
          obj.value=item.score
          list.push(obj)
        }
        this.$nextTick(()=>{
          _this.initChart(list)
        })
        
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
    this.subjectList=this.examInfo.subjectList
    this.subject=this.subjectList[0].subjectId
    this.getJson()
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>

</style>