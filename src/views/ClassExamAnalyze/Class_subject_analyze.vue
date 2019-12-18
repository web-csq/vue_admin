<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px">
          <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      &nbsp;&nbsp;&nbsp;
      选择学科：
      <Select v-model="subject" style="width:200px">
          <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
     <div class="tab-title">学科成绩分布报表</div>
     <Table border :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
const data = [
  { year: '0-10', value: 0 },
  { year: '11-20', value: 0 },
  { year: '21-30', value: 0 },
  { year: '31-40', value: 0 },
  { year: '41-50', value: 10 },
  { year: '51-60', value: 3 },
  { year: '61-70', value: 10 },
  { year: '71-80', value: 20 },
  { year: '81-90', value: 50 },
  { year: '91-100', value: 40 }
];
export default {
  name:"c_class_subject_analyze",
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
        subjectList:[
          {
            value: 'chinese',
            label: '语文'
          },
          {
            value: 'math',
            label: '数学'
          },
          {
            value: 'english',
            label: '英语'
          },
          {
            value: 'physics',
            label: '物理'
          }
        ],
        subject:"chinese",
        columns: [
            {
                title: '年级',
                key: 'class'
            },
            {
                title: '0-10',
                key: 'zero'
            },
            {
                title: '11-20',
                key: 'one'
            },
            {
                title: '21-30',
                key: 'two'
            },
            {
                title: '31-40',
                key: 'three'
            },
            {
                title: '41-50',
                key: 'four'
            },
            {
                title: '51-60',
                key: 'five'
            },
            {
                title: '61-70',
                key: 'six'
            },
            {
                title: '71-80',
                key: 'seven'
            },
            {
                title: '81-90',
                key: 'eight'
            },
            {
                title: '91-100',
                key: 'nine'
            },

        ],
       data: [
            {
                class:"高一一班",
                zero:35,
                one:351,
                two:100,
                three:12,
                four:56,
                five:79,
                six:201,
                seven:201,
                eight:201,
                nine:201,
            },
            {
                class:"高一二班",
                zero:135,
                one:51,
                two:110,
                three:120,
                four:76,
                five:68,
                six:51,
                seven:31,
                eight:111,
                nine:21,
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
    chart.line().position('year*value').shape('smooth');
    chart.area().position('year*value').shape('smooth');
    chart.point().position('year*value')
      .size(2)
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
@import "@/styles/index.scss"
</style>