<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
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
    const data = [
      { month: '第一次月考', city: '语文', temperature: 7 },
      { month: '第一次月考', city: '数学', temperature: 3.9 },
      { month: '第一次月考', city: '物理', temperature: 6 },
      { month: '模拟考试', city: '语文', temperature: 6.9 },
      { month: '模拟考试', city: '数学', temperature: 4.2 },
      { month: '模拟考试', city: '物理', temperature: 5},
      { month: '期中考试', city: '语文', temperature: 9.5 },
      { month: '期中考试', city: '数学', temperature: 14.2 },
      { month: '期中考试', city: '物理', temperature: 10 },
      { month: '第二次月考', city: '语文', temperature: 14.5 },
      { month: '第二次月考', city: '数学', temperature: 6.2 },
      { month: '第二次月考', city: '物理', temperature: 20 },
      { month: '限时考试', city: '语文', temperature: 18.4 },
      { month: '限时考试', city: '数学', temperature: 15.2 },
      { month: '限时考试', city: '物理', temperature: 4 },
      { month: '年级联考', city: '语文', temperature: 21.5 },
      { month: '年级联考', city: '数学', temperature: 8.2 },
      { month: '年级联考', city: '物理', temperature: 3 },
      { month: '分科考试', city: '语文', temperature: 25.2 },
      { month: '分科考试', city: '数学', temperature: 16.2 },
      { month: '分科考试', city: '物理', temperature: 13 },
      { month: '期末考试', city: '语文', temperature: 26.5 },
      { month: '期末考试', city: '数学', temperature: 7.2 },
      { month: '期末考试', city: '物理', temperature: 15 }
    ];

    const chart = new this.$G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 400
    });
    chart.source(data, {
      month: {
        range: [ 0, 1 ]
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('temperature', {
      label: {
        formatter: val => {
          return val + '分';
        }
      }
    });
    chart.line().position('month*temperature').color('city');
    chart.point().position('month*temperature').color('city')
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

</style>