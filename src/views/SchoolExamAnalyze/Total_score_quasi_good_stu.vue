<template>
  <div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分准良好学生班级报表</div>
      <Table border :columns="columns" :data="dataList" :loading="loading"></Table>
    </div>
  </div>
</template>

<script>
const data=[
    {
    "Class": "高一一班",
    "Grade": "男",
    "Score": 10
    },
    {
    "Class": "高一二班",
    "Grade": "男",
    "Score": 23
    },
    {
    "Class": "高一一班",
    "Grade": "男",
    "Score": 2
    },
    {
    "Class": "高一二班",
    "Grade": "男",
    "Score": 5
    },
    {
    "Class": "高一三班",
    "Grade": "女",
    "Score": 8
    },
    {
    "Class": "高一二班",
    "Grade": "女",
    "Score": 6
    },
    {
    "Class": "高一一班",
    "Grade": "女",
    "Score": 7
    },
    {
    "Class": "高一一班",
    "Grade": "男",
    "Score": 10
    }
]
import { selectGradeListClassLevleFour } from "@/api/schoolAnalyze"
import { mapState } from "vuex"
export default {
  name: "s_total_score_quasi_good_stu",
  data() {
    return {
      absoluteList:[],//绝对
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
        dataList:[],
    }
  },
  methods:{
    setChart(dom,data){
      const chart = new this.$G2.Chart({
        container: dom,
        forceFit: true,
        height: 400
      });
      chart.clear();
      chart.source(data,{
        Score:{
          min:0,
        }
      });
      chart.tooltip({
        crosshairs: {
          type: 'cross'
        }
      });
      chart.axis('Score', {
        grid: null
      });
      // x轴的栅格线居中
      chart.axis('Class', {
        tickLine: null,
        subTickCount: 1, // 次刻度线个数
        subTickLine: {
          lineWidth: 1,
          stroke: '#BFBFBF',
          length: 4
        },
        grid: {
          align: 'center', // 网格顶点从两个刻度中间开始
          lineStyle: {
            stroke: '#8C8C8C',
            lineWidth: 1,
            lineDash: [ 3, 3 ]
          }
        }
      });
      chart.point().position('Class*Score')
        .color('Grade')
        .adjust('jitter')
        .shape('circle')
        .opacity(0.65)
        .size(3);
        chart.legend(false);
      chart.render();
    },
    async setSelectGradeListClassLevleFour(){
      this.absoluteList = [];
      this.data = [];
      selectGradeListClassLevleFour({
        examId: this.examInfo.id,//97
      }).then( res => {
        this.loading = false
        if(res.code == "0000"){//相对
          // console.log(res);
          if(res.data != null){//绝对
            if(res.data.length >0){
              let absoluteData = res.data;
              for( let i in absoluteData){
                let classnames = absoluteData[i].className;
                for(let j in absoluteData[i].list){
                    let obj = {};
                    let tabData = {};
                    obj.Class = classnames;
                    obj.Grade = absoluteData[i].list[j].userName
                    obj.Score = absoluteData[i].list[j].gradeRank
                    this.absoluteList.push(obj);

                    tabData.className = absoluteData[i].className;
                    tabData.userName = absoluteData[i].list[j].userName;
                    tabData.score = absoluteData[i].list[j].score;
                    tabData.gradeRank = absoluteData[i].list[j].gradeRank;
                    this.dataList.push(tabData);
                }
              }
              this.setChart('d1',this.absoluteList);
              
            }else{
              this.$Message.warning('暂无分析数据');
            }
          }else{
            this.$Message.warning('暂无分析数据');
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
  mounted() {
    this.setSelectGradeListClassLevleFour();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>