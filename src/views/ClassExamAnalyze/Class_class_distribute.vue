<template>
  <div>
    <div class="chart-c" style="margin:30px 0 0 0;">
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
const data = [
  { year: '高一一班', value: 556 },
  { year: '高一二班', value: 456 },
  { year: '高一三班', value: 778 },
  { year: '高一四班', value: 354 },
  { year: '高一五班', value: 400 },
  { year: '高一六班', value: 600 },
  { year: '高一七班', value: 700 },
  { year: '高一八班', value: 590 },
  { year: '高一九班', value: 561 }
];
export default {
  name:"c_class_class_distribute",
  data(){
    return{
      classList: [
          {
              value: 'class1',
              label: '高一一班'
          },
          {
              value: 'class2',
              label: '高一二班'
          },
          {
              value: 'class3',
              label: '高一三班'
          },
          {
              value: 'class4',
              label: '高一四班'
          },
          {
              value: 'class5',
              label: '高一五班'
          },
          {
              value: 'class6',
              label: '高一六班'
          }
        ],
        model: 'class1',
    }
  },
  mounted(){
    const chart = new this.$G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 500
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
    chart.line().position('year*value');
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