<template>
  <div>
    <div class="dis">
      科目：<el-checkbox-group v-model="subject" size="small">
            <el-checkbox-button v-for="city in gradeList" :label="city.name" :key="city.id">{{city.name}}</el-checkbox-button>
          </el-checkbox-group>

      <Button size="small" style="margin:0 0 0 50px" type="primary" >设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <Table border :columns="columns" :data="data"></Table>
    </div>
    
  </div>
</template>

<script>
const data = [
  { year: '0-100', sales: 100 },
  { year: '101-200', sales: 350 },
  { year: '201-300', sales: 22 },
  { year: '301-400', sales: 545 },
  { year: '401-500', sales: 100 },
  { year: '501-600', sales: 138 },
  { year: '601-700', sales: 38 }
];
export default {
  name:"Class_group_subction.vue",
  data(){
    return{
      subject:[],
      gradeList: [
          {
              id: '1',
              name: '物理'
          },
          { 
              id: '2',
              name: '化学'
          },
          { 
              id: '3',
              name: '生物'
          }
       ],
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
      height: 350,
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
    chart.interval().position('year*sales').color("year",()=>{
      return "#4ECB73"
    });
    chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.dis{
  display: flex;
  align-items: center;
  margin: 0 0 30px 0;
}
</style>