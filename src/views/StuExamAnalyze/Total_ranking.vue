<template>
  <div>
    <div class="">

    </div>
    <div class="chart-c" style="max-width:1280px">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">
        总分与名次报表
        <Button class="fr" type="primary" size="small" @click="exportData">导出数据</Button>
      </div>
      <Table border :columns="columns" :loading="btnLoading" :data="tableData" ref="table1"></Table>
    </div>
  </div>
</template>

<script>
import { totalScoreAndRanking } from "@/api/stuAnalyze"
import { mapState } from "vuex"
export default {
  data(){
    return{
      btnLoading:true,
      columns:[
        {
          title: '班级',
          key: 'className',
          align:'center'
        },
        {
          title: '姓名',
          key: 'userName',
          align:'center'
        },
        {
          title: '考试总分',
          key: 'score',
          align:'center'
        },
        {
          title: '班级名次',
          key: 'classRank',
          align:'center'
        },
        {
          title: '年级名次',
          key: 'gradeRank',
          align:'center'
        },
        
      ],
      tableData:[]
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
  methods:{
     exportData(){
      let name;
      this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'-总分与名次'
      });
    },
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
        reversed: false // 图例项逆序显示
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
      this.tableData=res.data;
      for(let item of res.data){
        let obj={}
        obj.Class=item.className
        obj.Grade=item.userName
        obj.Score=item.score
        list.push(obj)
      }
      this.initChart(list)
      this.btnLoading=false
    })
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>