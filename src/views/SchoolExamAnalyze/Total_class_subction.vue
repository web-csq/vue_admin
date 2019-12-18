<template>
  <div>
    <div class="top">
      <Button size="small" type="primary" >设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分年级分段报表</div>
      <Table border :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
const data = [
  { name: '高一一班', 分段: '0-100', 分数: 318 },
  { name: '高一一班', 分段: '101-200', 分数: 528 },
  { name: '高一一班', 分段: '201-300', 分数: 439 },
  { name: '高一一班', 分段: '301-400', 分数: 281 },
  { name: '高一一班', 分段: '401-500', 分数: 747 },
  { name: '高一一班', 分段: '501-600', 分数: 920 },
  { name: '高一一班', 分段: '601-700', 分数: 524 },
  { name: '高一二班', 分段: '0-100', 分数: 312 },
  { name: '高一二班', 分段: '101-200', 分数: 523 },
  { name: '高一二班', 分段: '201-300', 分数: 434 },
  { name: '高一二班', 分段: '301-400', 分数: 199 },
  { name: '高一二班', 分段: '401-500', 分数: 52 },
  { name: '高一二班', 分段: '501-600', 分数: 135 },
  { name: '高一二班', 分段: '601-700', 分数: 137 },
];
export default {
  name:"total_class_subction",
  data(){
    return{
      columns: [
            {
                title: '班级',
                key: 'section'
            },
            {
                title: '0-100',
                key: 'classOne'
            },
            {
                title: '101-200',
                key: 'classTwo'
            },
            {
                title: '201-300',
                key: 'classThree'
            },
            {
                title: '301-400',
                key: 'classFour'
            },
            {
                title: '401-500',
                key: 'classFive'
            },
            {
                title: '501-600',
                key: 'classSix'
            },
            {
                title: '600-700',
                key: 'classSeven'
            }
        ],
       data: [
            {
                section:"高一一班",
                classOne:35,
                classTwo:251,
                classThree:250,
                classFour:250,
                classFive:250,
                classSix:250,
                classSeven:360
            },
            {
                section:"高一二班",
                classOne:35,
                classTwo:251,
                classThree:60,
                classFour:350,
                classFive:350,
                classSix:350,
                classSeven:350
            }
        ]
    }
  },
  mounted(){
    const chart = new G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 500
    });
    chart.source(data,{
      "分数":{
        min:0,
        max:1000,
        tickCount:11
      }
    });
    chart.axis("分段",{
        title: {
          textStyle: {
            fontSize: 14, // 文本大小
            textAlign: 'center', // 文本对齐方式
            fill: '#000', // 文本颜色
            // ...
          }
        },
        }
      );
    chart.interval().position('分段*分数').color('name')
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
    chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>