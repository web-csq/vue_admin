<template>
  <div>
    <div>
      选择班级：
      <Select v-model="subject" size="small" style="width:100px" @on-change="getJson">
        <Option v-for="item in classList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
      </Select>
    </div>
    <div class="chart-c">
      <div id="d1">

      </div>
    </div>
  </div>
</template>

<script>
import { listStudentAnswerSheetDetail } from "@/api/subjectAnalyze"
import { mapState } from 'vuex'
let _this;
export default {
  name:"subject_question_score",
  data(){
    return{
      subject:"",
      classList:[],
      subject:""
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    getJson(){
      listStudentAnswerSheetDetail({
      examId:this.examInfo.id,
      gradeId:this.examInfo.gradeId,
      schoolId:this.examInfo.schoolId,
      subjectId:this.subject,
      }).then(res=>{
        if(res.data.length===0) return _this.$message.warning("暂无数据")
        let list=[];
        console.log(res.data)
      })
    },
    initChart(){
      
    }
  },
  created(){
    _this=this
    this.classList=this.examInfo.subjectList
    this.subject=this.classList[0].subjectId
    this.getJson()
  }
}
</script>

<style lang="scss" scoped>

</style>