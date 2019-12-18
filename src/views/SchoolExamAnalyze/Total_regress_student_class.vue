<template>
  <div>
    <div>绝对名次分布</div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div>相对名次分布</div>
    <div class="chart-c">
      <div id="d2"></div>
    </div>
    <div>持续跟踪分布</div>
    <div class="chart-c">
      <div id="d3"></div>
    </div>
  </div>
</template>

<script>
const data = [
  { name: '本次考试', 月份: '慧大海', 月均降雨量: 18 },
  { name: '本次考试', 月份: '慧二海', 月均降雨量: 23 },
  { name: '本次考试', 月份: '慧三海', 月均降雨量: 19 },
  { name: '本次考试', 月份: '慧四海', 月均降雨量: 23 },
  { name: '本次考试', 月份: '慧五海', 月均降雨量: 34 },
  { name: '本次考试', 月份: '慧六海', 月均降雨量: 16 },
  { name: '本次考试', 月份: '慧七海', 月均降雨量: 24 },
  { name: '本次考试', 月份: '慧八海', 月均降雨量: 5},
  { name: '进班名次', 月份: '慧大海', 月均降雨量:65},
  { name: '进班名次', 月份: '慧二海', 月均降雨量: 33},
  { name: '进班名次', 月份: '慧三海', 月均降雨量: 65 },
  { name: '进班名次', 月份: '慧四海', 月均降雨量: 34 },
  { name: '进班名次', 月份: '慧五海', 月均降雨量: 52 },
  { name: '进班名次', 月份: '慧六海', 月均降雨量: 35 },
  { name: '进班名次', 月份: '慧七海', 月均降雨量: 37 },
  { name: '进班名次', 月份: '慧八海', 月均降雨量: 42 }
];
const data1 = [
  { name: '本次考试', 月份: '慧大海', 月均降雨量: 18.9 },
  { name: '本次考试', 月份: '慧二海', 月均降雨量: 28.8 },
  { name: '本次考试', 月份: '慧三海', 月均降雨量: 39.3 },
  { name: '本次考试', 月份: '慧四海', 月均降雨量: 81.4 },
  { name: '本次考试', 月份: '慧五海', 月均降雨量: 47 },
  { name: '本次考试', 月份: '慧六海', 月均降雨量: 20.3 },
  { name: '本次考试', 月份: '慧七海', 月均降雨量: 24 },
  { name: '本次考试', 月份: '慧八海', 月均降雨量: 35.6 },
  { name: '上次考试', 月份: '慧大海', 月均降雨量: 12.4 },
  { name: '上次考试', 月份: '慧二海', 月均降雨量: 23.2 },
  { name: '上次考试', 月份: '慧三海', 月均降雨量: 34.5 },
  { name: '上次考试', 月份: '慧四海', 月均降雨量: 99.7 },
  { name: '上次考试', 月份: '慧五海', 月均降雨量: 52.6 },
  { name: '上次考试', 月份: '慧六海', 月均降雨量: 35.5 },
  { name: '上次考试', 月份: '慧七海', 月均降雨量: 37.4 },
  { name: '上次考试', 月份: '慧八海', 月均降雨量: 42.4 }
];
const data2 = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 }
];
export default {
  name: "s_total_reg_stu_class",
  data() {
    return {};
  },
  mounted() {
    const chart = new this.$G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 500
    });
    chart.source(data);
    chart.interval().position('月份*月均降雨量').color('name')
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
    chart.render();

    const chart1 = new this.$G2.Chart({
      container: 'd2',
      forceFit: true,
      height: 500
    });
    chart1.source(data1);
    chart1.interval().position('月份*月均降雨量').color('name')
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
    chart1.render();


    const chart3 = new this.$G2.Chart({
      container: 'd3',
      forceFit: true,
      height: 500
    });
    chart3.source(data2);
    chart3.scale('value', {
      min: 0
    });
    chart3.scale('year', {
      range: [ 0, 1 ]
    });
    chart3.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart3.line().position('year*value');
    chart3.point().position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart3.render();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>