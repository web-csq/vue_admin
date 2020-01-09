<template>
  <div>
    <!-- 良好学生 -->
    <div class="chart-c">
      <div style="text-align:right">
        <span @click="downloadImg">下载图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分及格学生班级报表
        <Button class="fr" type="primary" size="small" @click="exportData"><Icon type="ios-download-outline"></Icon>导出数据</Button>
      </div>
      <Table border ref="table1" :columns="columns" :data="data" :loading='loading'></Table>
    </div>
    <!-- <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5> -->
  </div>
</template>

<script>
import { selectGradeListClassLevleFive } from "@/api/schoolAnalyze"
import { mapState } from "vuex"
// const data = [{ country: '巴西', population: 18203 },];
export default {
  name:"s_total_score_pass_stu",
  data(){
    return{
      loading:true,
      columns: [
            {
                title: '班级',
                key: 'className',
                align:'center'
            },
            {
                title: '学生',
                key: 'userName',
                align:'center'
            },
            {
                title: '总分',
                key: 'score',
                align:'center'
            },
            {
                title: '排名',
                key: 'gradeRank',
                align:'center'
            },
        ],
      data: [],
      section:50,
      chartList:[],
      type:0,
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","总分及格学生班级报表")
    },
    exportData(){//导出全校排名数据
        if(this.data.length!=0){
          this.$refs.table1.exportCsv({
              filename: this.examInfo.name +'总分及格学生班级报表'
          });
        }else{
          this.$Message.warning('表格暂无数据,数据不能导出')
        }
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
          // tickCount: 10
        },
        "year":{
          alias:"班级",
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
      
      chart.legend(false);
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
    async setSelectGradeListClassLevleFive(){//总分及格学生班级分布图
      this.data = [];
      this.chartList = [];
      selectGradeListClassLevleFive({
        examId : this.examInfo.id,//97
      }).then( res => {
        // console.log( res );
        this.loading = false;
        if (res.code == "0000") {
          if(res.data != null){
            if(res.data.length != 0){
              for(let item of res.data){
                let obj = {};
                obj.year = item.className
                obj.sales = item.list.length 
                this.chartList.push(obj);
                for(let itemList of item.list){
                  let tabObj = {};
                  tabObj.className = item.className
                  tabObj.userName = itemList.userName
                  tabObj.gradeRank = itemList.gradeRank
                  tabObj.score = itemList.score
                  this.data.push(tabObj);
                }
              }
              this.setLineChart(this.chartList);
            }
          }
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
    this.setSelectGradeListClassLevleFive();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>