<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">班级平均分报表</div>
      <Table border :columns="columns" :data="data"></Table>
    </div>

  </div>
</template>

<script>
import { selectGradeListClassAvgScoreOrHighLowScore } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"s_class_avg",
  data(){
    return{
      columns: [
            // {
            //     title: '年级',
            //     key: 'gradeName'
            // },
            {
                title: '班级',
                key: 'className',
                align:'center'
            },
            {
                title: '班级平均分',
                key: 'avgScore',
                align:'center'
            },
            {
                title: '最高分',
                key: 'maxScore',
                align:'center'
            },
            {
                title: '最低分',
                key: 'minScore',
                align:'center'
            },
            {
                title: '方差',
                key: 'standardDeviation',
                align:'center'
            },
            
        ],
      data: [],
      avgClassList:[],
    }
  },

  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    setLintChart(data){
      const chart = new G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500,
      });
      chart.source(data);
      chart.scale('value', {
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
      chart.line().position('year*value');//.shape('smooth')曲线;
      chart.point().position('year*value')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
    },
    async setSelectGradeListClassAvgScoreOrHighLowScore(){//班级平均分
      selectGradeListClassAvgScoreOrHighLowScore({
        examId:this.examInfo.id
      }).then( res => {
        // console.log( res );
        if (res.code == "0000") {
          if (res.data != null) {
            if (res.data.length > 0) {
              for(let i in res.data){
                let obj = {};
                obj.year = res.data[i].className;
                obj.value = res.data[i].avgScore;
                this.avgClassList.push(obj);
              }
              // console.log(this.avgClassList)
              this.data = res.data
            }
          }
        }
      })
    }
  },
  mounted(){
    this.setSelectGradeListClassAvgScoreOrHighLowScore();
  },
  updated(){
    this.setLintChart(this.avgClassList);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";


</style>