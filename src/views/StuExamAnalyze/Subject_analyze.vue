<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5>
    
  </div>
</template>

<script>
export default {
  name:"",
  data(){
    return{

    }
  },
  mounted(){
    const { DataView } = this.$DataSet;
    const data = [
      { item: '语文', 班级名次: 70, 学校名次: 30 },
      { item: '数学', 班级名次: 60, 学校名次: 70 },
      { item: '物理', 班级名次: 50, 学校名次: 60 },
      { item: '英语', 班级名次: 20, 学校名次: 80 },
      { item: '化学', 班级名次: 40, 学校名次: 50 },
      { item: '生物', 班级名次: 60, 学校名次: 70 }

    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ '班级名次', '学校名次' ], // 展开字段集
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
        max: 80
      }
    });
    chart.coord('polar', {
      radius: 0.8
    });
    chart.axis('item', {
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
    chart.line().position('item*score').color('user')
      .size(2);
    chart.point().position('item*score').color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1
      });
    chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>