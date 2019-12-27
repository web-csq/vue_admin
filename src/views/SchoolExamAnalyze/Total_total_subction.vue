<template>
  <div>
    <div class="top">
      分数间隔：<InputNumber  :min="1" :step="10" v-model="section"></InputNumber>
      <Button style="margin-left:10px;" size="small" type="primary" @click="setModel" :loading="loading">设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分全体分段报表</div>
      <Table border :columns="columns" :data="data"></Table>
    </div>
    <!-- <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5> -->
    
  </div>
</template>

<script>
import { selectGradeDifSection } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"S_total_total_subction",
  data(){
    return{
      columns: [
            {
                title: '最高分',
                key: 'maxScore',
                align:'center'
            },
            {
                title: '最低分',
                key: 'minScore',
                align:'center'
            },
            {
                title: '平均数',
                key: 'avgScore',
                align:'center'
            },
            {
                title: '中数',
                key: 'medianScore',
                align:'center'
            },
            {
                title: '标准差',
                key: 'standardDeviation',
                align:'center'
            },
            {
                title: '方差',
                key: 'variance',
                align:'center'
            }
        ],
      data: [],
      section:50,
      chartList:[],
      loading:false,
      type:0,
    }
  },
  methods:{
    setLineChart(data){
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
          tickCount: 12
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
          }
        },
      });
      chart.axis('sales', {
        title: {
          textStyle: {
            fontSize: 14, // 文本大小
            textAlign: 'end', // 文本对齐方式
            fill: '#000', // 文本颜色
          }
        }
      });
      
      chart.legend({
        position: 'bottom', // 设置图例的显示位置
        itemGap: 20 // 图例项之间的间距
      });
      chart.interval().position('year*sales').color("year",()=>{
        return "#2D8CF0"
      });

      chart.render();
      if(this.type != 0){
        this.$nextTick(()=>{
          if(document.getElementById("d1").children.length>1){
            document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
          }
        })
      }
    },
    setModel(){
      this.type++;
      this.loading = true;
      this.setSelectGradeDifSection();
    },
    async setSelectGradeDifSection(){//总分全体分段统计
      this.data = [];

      selectGradeDifSection({
        examId : this.examInfo.id,
        section : this.section,
        schoolId:this.examInfo.schoolId
      }).then( res => {
        // console.log( res );
        this.loading = false;
        if (res.code == "0000") {
          this.data.push(res.data.examSchool);
          for(let i in res.data.scoreSetion){
            let obj = {};
            obj.year = res.data.scoreSetion[i].name
            obj.sales = res.data.scoreSetion[i].count;
            this.chartList.push(obj)
          }
          this.setLineChart(this.chartList);
        }
      })
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  mounted(){
    
    this.setSelectGradeDifSection();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>