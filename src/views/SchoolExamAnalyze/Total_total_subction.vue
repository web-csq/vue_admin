<template>
  <div>
    <div class="top">
      分数间隔：<Input style="width:60px;" size="small" :min="1" :step="10" v-model="section" @keydown.enter.native='setModel' />
      <Button style="margin-left:10px;" size="small" type="primary" @click="setModel" :loading="loading">设置分段</Button>
    </div>
    <div class="chart-c">
      <div style="text-align:right" >
        <span @click="downloadImg">下载图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分全体分段报表
        <Button class="fr" type="primary" size="small" @click="exportData"><Icon type="ios-download-outline"></Icon>导出数据</Button>
      </div>
      <Table border ref="table1" :columns="columns" :data="data" :loading='tabLoading'></Table>
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
      tabLoading:false,
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
    downloadImg(){
      this.$downloadChart("d1","总分全体分段报表")
    },
    exportData(){//导出全校排名数据
        this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'总分全体分段报表'
      });
    },
    setLineChart(data){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500,
      });
      chart.source(data,{
        "sales":{
          min: 0,
          // max: 600,
          alias:"人数",
          // tickCount: 12
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
      chart.line().position('year*sales').color("#d9d9d9").shape('smooth');
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
      this.chartList = [];
      selectGradeDifSection({
        examId : this.examInfo.id,
        section : this.section,
        schoolId:this.examInfo.schoolId
      }).then( res => {
        // console.log( res );
        this.loading = false;
        this.tabLoading = false;
        
        if (res.code == "0000") {
          this.data.push(res.data.examSchool);
          for(let i in res.data.scoreSetion){
            let obj = {};
            obj.year = res.data.scoreSetion[i].name
            obj.sales = res.data.scoreSetion[i].count;
            this.chartList.push(obj)
          }
          this.setLineChart(this.chartList);
          // console.log( this.chartList)
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