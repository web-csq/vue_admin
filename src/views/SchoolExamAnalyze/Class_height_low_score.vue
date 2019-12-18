<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">班级最高/低分报表</div>
      <Table border :columns="columns" :data="data"></Table>
    </div>

  </div>
</template>

<script>
export default {
  name:"s_class_height_low",
  data(){
    return{
      columns: [
            {
                title: '分值',
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
              section:"最高分",
              classOne:44,
              classTwo:23.5,
              classThree:66,
              classFour:50,
              classFive:15,
              classSix:36,
              classSeven:75,
              classEight:56
          },
           {
              section:"最低分",
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
    const data = [
      { x: '高一一班', low: 23, high: 89 },
      { x: '高一二班', low: 33, high: 56 },
      { x: '高一三班', low: 26, high: 55 },
      { x: '高一四班', low: 16, high: 63 },
      { x: '高一五班', low: 0, high: 99 },
      { x: '高一六班', low: 35, high: 68 },
      { x: '高一七班', low: 21, high: 64 },
      { x: '高一八班', low: 13, high: 67 }
    ];
    const dv = new this.$DataSet.DataView().source(data);
    dv.transform({
      type: 'map',
      callback: obj => {
        obj.range = [ obj.low,obj.high ];
        return obj;
      }
    });
    const chart = new this.$G2.Chart({
      container: 'd1',
      forceFit: true,
      height: 500
      // padding: [ 20, 120, 95 ]
    });
    chart.source(dv, {
      range: {
        // max: 35
      }
    });
    chart.tooltip({
      showTitle: false,
      crosshairs: {
        type: 'rect'
      },
      itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}<br/>'
        + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
        + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
        + '</li>'
    });
    chart.schema().position('x*range')
      .shape('box')
      .tooltip('x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
        return {
          name: x,
          low,
          q1,
          median,
          q3,
          high
        };
      })
      .style({
        stroke: '#545454',
        fill: '#1890FF',
        fillOpacity: 0.3
      });
    chart.render();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>