<template>
  <div>
    <!-- 良好学生 -->
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分及格学生班级报表</div>
      <Table border :columns="columns" :data="data" :loading='loading'></Table>
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
                title: '排名',
                key: 'gradeRank',
                align:'center'
            },
            {
                title: '总分',
                key: 'score',
                align:'center'
            },
            {
                title: '学生',
                key: 'userName',
                align:'center'
            },
            {
                title: '班级',
                key: 'className',
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
    setLineChart(data){
        const chart = new G2.Chart({
          container: 'd1',
          forceFit: true,
          height: 500
        });
        chart.source(data);
        chart.axis('country', {
          label: {
            offset: 12
          }
        });
        chart.coord().transpose();
        chart.interval().position('country*人数');
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
          for(let item of res.data){
            let obj = {};
            obj.country = item.className
            obj['人数'] = item.list.length 
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