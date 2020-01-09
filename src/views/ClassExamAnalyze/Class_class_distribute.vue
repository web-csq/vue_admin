<template>
  <div>
    <div class="chart-c" style="margin:30px 0 0 0;">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">年级班级总分分布报表
        <Button class="fr" type="primary" size="small" icon="ios-download-outline" @click="exportData">导出数据</Button>

      </div>
        <Table border ref="table1" :columns="columns" :data="tableData"></Table>
      </div>
  </div>
</template>

<script>
let data = [
  { className: '高一一班', maxScore: 556 },
];
import { listExamClass } from "@/api/classAnalyze"
import { mapState } from "vuex"
let _this;
export default {
  name:"c_class_class_distribute",
  data(){
    return{
      analyzedata:[],
      columns:[],
      tableData:[]
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","年级班级总分分布")
    },
    exportData(){
      this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'-年级班级总分分布'
      });
    },
    initChart(data){
        const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.scale('score', {
        // min: 0
      });
      chart.scale('className', {
        // range: [ 0, 1 ]
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.line().position('className*score').color("type");
      chart.point().position('className*score').color("type")
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
      
    }
  },
  created(){
    _this=this
    listExamClass({
      examId:this.examInfo.id,
      gradeId:this.examInfo.gradeId,
      schoolId :this.examInfo.schoolId
    }).then(res=>{
      _this.columns=[{
        title:"年级",
        key:"class",
        align:'center',
      }]
      _this.tableData=[]
      for(let item of res.data){
        
        let obj={},obj1={}
        if(item.maxScore){
          obj.type="最高分"
          obj.score=item.maxScore
          obj.className=item.className
          _this.analyzedata.push(obj)
        }
        obj={}
        if(item.minScore){
          obj.type="最低分"
          obj.score=item.minScore
          obj.className=item.className
          _this.analyzedata.push(obj)
        }
        obj={}
        if(item.avgScore){
          obj.type="平均分"
          obj.score=item.avgScore
          obj.className=item.className
          _this.analyzedata.push(obj)
        }
        obj1.class=item.className
        obj1.minScore=item.minScore
        obj1.avgScore=item.avgScore
        obj1.maxScore=item.maxScore
        obj1.standardDeviation=item.standardDeviation
        obj1.medianScore=item.medianScore
        obj1.variance=item.variance
        _this.tableData.push(obj1)

      }
      for(let item in res.data[0]){
        if(item==="maxScore"){
          let obj={}
          obj.title="最高分"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        if(item==="minScore"){
          let obj={}
          obj.title="最低分"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        if(item==="avgScore"){
          let obj={}
          obj.title="平均分"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        if(item==="medianScore"){
          let obj={}
          obj.title="中位数"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        if(item==="variance"){
          let obj={}
          obj.title="方差"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        if(item==="standardDeviation"){
          let obj={}
          obj.title="标准差"
          obj.key=item
          obj.align='center'
          _this.columns.push(obj)
        }
        
      }
      _this.initChart(_this.analyzedata)
      
    })
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>