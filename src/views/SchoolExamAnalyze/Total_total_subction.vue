<template>
  <div>
    <div class="top">
      <Button size="small" type="primary" >设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <Table border :columns="columns" :data="data"></Table>
    </div>
    <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5>
    
  </div>
</template>

<script>


const data = [
  { year: '0-100', sales: 100 },
  { year: '101-200', sales: 50 },
  { year: '201-300', sales: 2 },
  { year: '301-400', sales: 145 },
  { year: '401-500', sales: 300 },
  { year: '501-600', sales: 38 },
  { year: '601-700', sales: 38 }
];
export default {
  name:"S_total_total_subction",
  data(){
    return{
       columns: [
            {
                title: '最高分',
                key: 'max'
            },
            {
                title: '最低分',
                key: 'min'
            },
            {
                title: '平均数',
                key: 'ads'
            },
            {
                title: '中数',
                key: 'middle'
            },
            {
                title: '标准差',
                key: 'norm'
            },
            {
                title: '方差',
                key: 'square'
            },
            {
                title: '峰度',
                key: 'peak'
            },
            {
                title: '偏度',
                key: 'diverge'
            }
        ],
       data: [
            {
                max:351,
                min:35,
                ads:351,
                middle:100,
                norm:12,
                square:56,
                peak:79,
                diverge:201,
            }
        ]
    }
  },
  mounted(){
    
    const chart = new this.$G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 350
    });
    chart.source(data,{
      "sales":{
        min: 0,
        max: 600,
        alias:"人数",
        tickCount: 7
      },
      "year":{
         alias:"分段",
         
      }
    });
    chart.axis('year', {
      title: {
        textStyle: {
          fontSize: 14, // 文本大小
          textAlign: 'center', // 文本对齐方式
          fill: '#000', // 文本颜色
          // ...
        }
      },
    });
     chart.axis('sales', {
      title: {
        textStyle: {
          fontSize: 14, // 文本大小
          textAlign: 'end', // 文本对齐方式
          fill: '#000', // 文本颜色
          // ...
        }
      }
    });
    chart.legend({
      position: 'bottom', // 设置图例的显示位置
      itemGap: 20 // 图例项之间的间距
    });
    chart.line().position('year*sales').style({
      stroke: '#969696',
      lineDash: [ 3, 3 ]
    }).shape("smooth").tooltip(false);
    chart.interval().position('year*sales');
    chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>