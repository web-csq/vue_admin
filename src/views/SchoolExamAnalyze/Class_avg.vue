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
const data = [
  { year: '年级平均分', value: 39 },
  { year: '高一一班', value: 44 },
  { year: '高一二班', value: 23.5 },
  { year: '高一三班', value: 66 },
  { year: '高一四班', value: 50 },
  { year: '高一五班', value: 15 },
  { year: '高一六班', value: 36},
  { year: '高一七班', value: 76},
  { year: '高一八班', value: 56 }
];
export default {
  name:"s_class_avg",
  data(){
    return{
      columns: [
            {
                title: '班级平均分',
                key: 'section'
            },
            {
                title: '高一一班',
                key: 'classOne'
            },
            {
                title: '高一二班',
                key: 'classTwo'
            },
            {
                title: '高一三班',
                key: 'classThree'
            },
            {
                title: '高一四班',
                key: 'classFour'
            },
            {
                title: '高一五班',
                key: 'classFive'
            },
            {
                title: '高一六班',
                key: 'classSix'
            },
            {
                title: '高一七班',
                key: 'classSeven'
            },
            {
                title: '高一八班',
                key: 'classEight'
            }
        ],
       data: [
          {
              section:39,
              classOne:44,
              classTwo:23.5,
              classThree:66,
              classFour:50,
              classFive:15,
              classSix:36,
              classSeven:75,
              classEight:56
          }
      ]
    }
  },
  mounted(){
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
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";


</style>