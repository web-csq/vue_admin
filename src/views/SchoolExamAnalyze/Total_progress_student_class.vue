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
  </div>
</template>

<script>
const data=[
    {
    "Class": "高一一班",
    "Grade": "男",
    "Score": 10
    },
    {
    "Class": "高一二班",
    "Grade": "男",
    "Score": 23
    },
    {
    "Class": "高一一班",
    "Grade": "男",
    "Score": 2
    },
    {
    "Class": "高一二班",
    "Grade": "男",
    "Score": 5
    },
    {
    "Class": "高一三班",
    "Grade": "女",
    "Score": 8
    },
    {
    "Class": "高一二班",
    "Grade": "女",
    "Score": 6
    },
    {
    "Class": "高一一班",
    "Grade": "女",
    "Score": 7
    }
]
export default {
  name: "s_total_pro_stu_class",
  data() {
    return {};
  },
  mounted() {
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
      .size(4);
    chart.render();


    const chart1 = new this.$G2.Chart({
      container: 'd2',
      forceFit: true,
      height: 400
    });
    chart1.source(data);
    chart1.tooltip({
      crosshairs: {
        type: 'cross'
      }
    });
    chart1.legend({
      reversed: true // 图例项逆序显示
    });
    chart1.axis('Score', {
      grid: null
    });
    // x轴的栅格线居中
    chart1.axis('Class', {
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
    chart1.point().position('Class*Score')
      .color('Grade')
      .adjust('jitter')
      .shape('circle')
      .opacity(0.65)
      .size(4);
    chart1.render();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>