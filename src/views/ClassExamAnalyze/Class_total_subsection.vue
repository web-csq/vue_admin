<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px">
          <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
     <div class="tab-title">总分年级分段报表</div>
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
  { year: '101-200', sales: 62 },
  { year: '201-300', sales: 22 },
  { year: '301-400', sales: 25 },
  { year: '401-500', sales: 100 },
  { year: '501-600', sales: 33},
  { year: '601-700', sales: 38 }
];
export default {
  name:"",
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
        height: 400
      });
      chart.source(data);
      chart.tooltip({
        crosshairs: false,
        inPlot: false,
        position: 'top'
      });
      chart.axis('value', {
        label: {
          formatter: val => {
            if ((val % 2)) {
              return val;
            }
            return '';
          }
        }
      });
      chart.interval().position('year*sales');
      
      chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>