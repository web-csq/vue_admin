<template>
  <div>
    <div class="top_ranking">
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第一</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d1"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第二</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d2"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第三</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d3"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第四</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d4"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第五</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d5"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第六</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d6"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第七</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d7"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第八</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d8"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第九</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d9"></div>
        </div>
      </div>
      <div class="ranking-box">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：慧小海</h4>
            <h6>年级：高一三班</h6>
            <h6>排名：第十</h6>
          </div>
        </div>
        <div class="tab-c">
          <div id="d10"></div>
        </div>
      </div>
    </div>
    
    <div class="tab-container">
      <div class="tab-title">总分排名</div>
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="goAnalyze(index)">分析</Button>
               
            </template>
      </Table>
    </div>

  </div>
</template>

<script>
export default {
  name:"s_total_all_ranking",
  data(){
    return{
      imgHolder:"https://via.placeholder.com/95x95?text=75 x 75",
      columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年级',
                key: 'class'
            },
            {
                title: '总分',
                key: 'total'
            },
            {
                title: '语文',
                key: 'chinese'
            },
            {
                title: '数学',
                key: 'math'
            },
            {
                title: '英语',
                key: 'english'
            },
            {
                title: '物理',
                key: 'physics'
            },
            {
                title: '化学',
                key: 'chemistry'
            },
            {
                title: '生物',
                key: 'biology'
            },{
              "title": "操作",
              "key": "action",
              "slot": 'action',
              "align":"center",
              "width":150
            }
        ],
       data: [
          {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          },
           {
              name:"惠小海",
              class:"高一一班",
              total:564,
              chinese:166,
              math:140,
              english:115,
              physics:89,
              chemistry:69,
              biology:75
          }
      ]
    }
  },
  methods:{
    goAnalyze(index){
      console.log(index)
    },
    genarateCharts(id){
      const data = [
        { item: '语文', a: 140 },
        { item: '数学', a: 145 },
        { item: '英语', a: 144 },
        { item: '物理', a: 70 },
        { item: '化学', a: 60 },
        { item: '生物', a: 68 }

      ];
      const dv = new this.$DataSet.DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ 'a'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });
      const chart = new this.$G2.Chart({
        container: id,
        forceFit: true,
        height: 300,
        padding: [ 10, 10, 10, 10 ]
      });
      chart.source(dv, {
        score: {
          min: -150,
          max: 150
        }
      });
      chart.coord('polar', {
        radius: 0.8
      });
      chart.axis('item', {
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      });
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          },
          alternateColor: 'rgba(0, 0, 0, 0.04)'
        }
      });
      chart.legend("user", false)
      chart.line().position('item*score').color('user')
        .size(2);
      chart.point().position('item*score').color('user')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        });
      chart.render();
    },
    genarate(){
      for(let i=1;i<=10;i++){
        this.genarateCharts("d"+i)
      }
    }
  },
  mounted(){
      this.genarate();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.box-top{
  display: flex;
  justify-content: space-around;
  .intr{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }
}
.top_ranking{
  display: flex;
  flex-wrap: wrap;
}
.ranking-box{
  // display: flex;
  // border: 1px solid #ddd;
  padding: 10px;
  width: 250px;
  margin:0 50px 0 0 ;
}
</style>