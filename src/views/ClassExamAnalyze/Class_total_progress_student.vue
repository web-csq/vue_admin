<template>
  <div>
    选择班级：<Select  v-model="selClassId" style="width:200px" @on-change="selClassFn">
                <Option :value="item.id" v-for="item in classList" :key="item.id">{{item.name}}</Option>
            </Select>
    <!-- 班级进步学生 -->
    <div class="divbox" v-if='isShow'>
      <div>绝对名次分布</div>
      <div class="chart-c">
        <div id="d1"></div>
      </div>
    </div>
    <div v-if="isShow">
      <div>相对名次分布</div>
      <div class="chart-c">
        <div id="d2"></div>
      </div>
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
import { selectGradeListClassProgressOrRetrogress } from "@/api/classAnalyze"
import { listClass } from "@/api/user"

import { mapState } from "vuex"
export default {
  name: "c_class_total_pro_stu",
  data() {
    return {
      absoluteList:[],//绝对
      relativeList:[],
      classList:[],//班级列表
      selClassId:0,//classID
      type:0,
      isShow:false
    }
  },
  methods:{
    selClassFn(){
      this.type++;
      // console.log(this.selClassId)
      this.setSelectGradeListClassProgressOrRetrogress();
    },
    setChart(dom,data){
      const chart = new this.$G2.Chart({
        container: dom,
        forceFit: true,
        height: 400
      });
      chart.clear();
      chart.source(data,{
        Score:{
          min: 0,
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
        .size(4);
        chart.legend(false);
      chart.render();

      if( this.type != 0){
          this.$nextTick(()=>{
            if(document.getElementById("d1").children.length>1){
              document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
            }
            if(document.getElementById("d2").children.length>1){
              document.getElementById("d2").removeChild(document.getElementById("d2").firstChild)
            }
        })
      }
    },
    async setSelectGradeListClassProgressOrRetrogress(){
      this.absoluteList = [];
      this.relativeList = [];
      selectGradeListClassProgressOrRetrogress({
        examId:this.examInfo.id,//97
        classId : this.selClassId,//calssID
        schoolId: this.examInfo.schoolId
      }).then( res => {
          // console.log(res);
          if(res.code == "0000"){
          if(res.data.absolute != null){//绝对
            this.isShow = true
            let absoluteData = res.data.absolute;
            for( let i in absoluteData){
              let classnames = absoluteData[i].className;
              for(let j in absoluteData[i].list){
                let obj = {};
                obj.Class = classnames;     
                if(absoluteData[i].list[j].gradeRank < 0){
                  obj.Grade = absoluteData[i].list[j].userName       
                  obj.Score = -absoluteData[i].list[j].gradeRank
                }
                this.absoluteList.push(obj);
              }
            }
            this.$nextTick( ()=> {
              this.setChart('d1',this.absoluteList);
            })
            
          }
          if(res.data.relative != null){
            this.isShow = true
            let relativeData = res.data.relative;
            for( let i in relativeData){
              let classnames = relativeData[i].className;
              for(let j in relativeData[i].list){
                  let obj = {};
                  obj.Class = classnames;
                  if(relativeData[i].list[j].gradeRank < 0){
                    obj.Grade = relativeData[i].list[j].userName
                    obj.Score = -relativeData[i].list[j].gradeRank
                  }
                  this.relativeList.push(obj);
              }
            }
            this.$nextTick(()=>{
              this.setChart('d2',this.relativeList);
            })
          }
          if(res.data.relative == null || res.data.absolute == null){
            this.$Message.warning('暂无分析数据');
            this.isShow = false
          }
        }
      })
    },
    async getClassList(){//得到班级列表
      this.classList = [];
      listClass({
        schoolId:this.examInfo.schoolId,
        gradeId: this.examInfo.gradeId
      }).then( res => {
        if(res.code == "0000"){
          this.selClassId = res.data[0].id
          this.classList = res.data;
          this.setSelectGradeListClassProgressOrRetrogress();
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
    // console.log(this.examInfo);
    this.getClassList();
    
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.divbox{
  margin: 10px 0;
}
</style>