<template>
  <div>
    <div class="chart-c">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
// const data = [
//   { name: 'London', 月份: 'Jan.', 分数: 18.9 },
//   { name: 'London', 月份: 'Feb.', 分数: 28.8 },
//   { name: 'London', 月份: 'Mar.', 分数: 39.3 },
//   { name: 'London', 月份: 'Apr.', 分数: 81.4 },
//   { name: 'London', 月份: 'May', 分数: 47 },
//   { name: 'London', 月份: 'Jun.', 分数: 20.3 },
//   { name: 'London', 月份: 'Jul.', 分数: 24 },
//   { name: 'London', 月份: 'Aug.', 分数: 35.6 },
//   { name: 'Berlin', 月份: 'Jan.', 分数: 12.4 },
//   { name: 'Berlin', 月份: 'Feb.', 分数: 23.2 },
//   { name: 'Berlin', 月份: 'Mar.', 分数: 34.5 },
//   { name: 'Berlin', 月份: 'Apr.', 分数: 99.7 },
//   { name: 'Berlin', 月份: 'May', 分数: 52.6 },
//   { name: 'Berlin', 月份: 'Jun.', 分数: 35.5 },
//   { name: 'Berlin', 月份: 'Jul.', 分数: 37.4 },
//   { name: 'Berlin', 月份: 'Aug.', 分数: 42.4 }
// ];
import { listExamSchoolSubject } from "@/api/subjectAnalyze"
import { mapState } from "vuex"
export default {
  name:"subject_total_distribution",
  data(){
    return{

    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","学科成绩总体分布")
    },
    initChart(data){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.axis('科目', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'center', // 文本对齐方式
            fill: '#000', // 文本颜色
            // ...
          }
        }
      });
      chart.axis('分数', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'center', // 文本对齐方式
            fill: '#000', // 文本颜色
            // ...
          }
        }
      });
      chart.interval().position('科目*分数').color('name')
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
      // chart.legend(false)
      chart.render();
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  mounted(){
  },
  created(){
    listExamSchoolSubject({
      examId:this.examInfo.id,
      gradeId :this.examInfo.gradeId ,
      schoolId:this.examInfo.schoolId
    }).then(res=>{
      if(res.code==="0000"){
        let list=[];
        for(let item of res.data){
          let obj={}
          if(item.maxScore!==null){
            obj.name="最高分"
            obj["科目"]=item.subjectName
            obj["分数"]=item.maxScore
            list.push(obj)
          }
          if(item.avgScore!==null){
            obj={}
            obj.name="平均分"
            obj["科目"]=item.subjectName
            obj["分数"]=item.avgScore
            list.push(obj)
          }
           if(item.minScore!==null){
            obj={}
            obj.name="最低分"
            obj["科目"]=item.subjectName
            obj["分数"]=item.minScore
            list.push(obj)
          }
        }
        this.initChart(list)
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>