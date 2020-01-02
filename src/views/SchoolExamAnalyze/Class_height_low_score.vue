<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">班级最高/低分报表</div>
      <Table border :columns="columns" :data="data"></Table>
    </div>

  </div>
</template>

<script>
import { selectGradeListClassAvgScoreOrHighLowScore } from "@/api/schoolAnalyze"
import { mapState } from "vuex"
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
  name:"s_class_height_low",
  data(){
    return{
      columns: [
            {
                title: '班级',
                key: 'className',
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
            }
        ],
      data: [],
      chartList:[],
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
      setChart(data){
        const dv = new this.$DataSet.DataView().source(data);
        dv.transform({
          type: 'map',
          callback: obj => {
            obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high ];
            return obj;
          }
        });
        const chart = new this.$G2.Chart({
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
            + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
            + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
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
      },
      async setSelectGradeListClassAvgScoreOrHighLowScore(){//最高/低 分
          selectGradeListClassAvgScoreOrHighLowScore({
            examId:this.examInfo.id
          }).then( res => {
            // console.log(res);
            if (res.code == "0000") {
              if (res.data != null) {
                  if (res.data.length > 0) {
                    for(let i in res.data){
                      let obj = {};
                      obj.x = res.data[i].className;
                      obj.low = res.data[i].minScore;
                      obj.high = res.data[i].maxScore;
                      obj.median = res.data[i].medianScore;//中位数
                      obj.q3 = (res.data[i].maxScore+res.data[i].medianScore)/2;//上四分位
                      obj.q1 = (res.data[i].minScore+res.data[i].medianScore)/2;//下四分位
                      this.chartList.push(obj);
                    }
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
    this.setChart(this.chartList);
    // this.setChart();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>