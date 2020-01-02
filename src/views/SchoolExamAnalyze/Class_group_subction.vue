<template>
  <div>
    <div class="dis">
      科目：<el-checkbox-group v-model="subject" size="small"  @change="selCurrSubject">
            <el-checkbox-button v-for="city in gradeList" :label="city.id" :key="city.id" >{{city.name}}</el-checkbox-button>
          </el-checkbox-group>
    </div>
    <div style="margin-bottom:10px;">
        分数间隔：<InputNumber  :min="1" :step="10" v-model="setSession"></InputNumber>
        <Button size="small" style="margin-left:10px" type="primary" @click="setScore" :loading="loading">设置分段</Button>
      </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分年级分段报表</div>
      <Table border :columns="columns" :data="tabData" :loading="tabLoading"></Table>
    </div>
    <!-- 设置分数段 -->
  </div>
</template>

<script>
import { listSubjectCombinationSection } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"Class_group_subction.vue",
  data(){
    return{
      subject:[],
      gradeList: [],
      columns: [],
      tabData: [],
      chartData:[],
      setSession:20,
      loading:false,
      tabLoading:true,
      type:0,
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  methods:{
    setScore(){
      this.type ++;
      if(this.subject.length == 0){
        this.$Message.warning('亲，科目至少选择一项');
        return false;
      }
      this.loading = true;
      this.setListSubjectCombinationSection();
    },
    selCurrSubject(value){//多选
      this.type ++ ;
      if(this.subject.length == 0){
        this.$Message.warning('亲，科目至少选择一项');
        return false;
      }
      this.setListSubjectCombinationSection();
    },
    setCharts(data){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 350,
      });
      chart.source(data,{
        "sales":{
          min: 0,
          // max: 600,
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
    async setListSubjectCombinationSection(){
      this.chartData = [];
      this.tabData = [];
      this.columns = [];
      listSubjectCombinationSection({
        examId :this.examInfo.id,
        gradeId :this.examInfo.gradeId,
        schoolId : this.examInfo.schoolId,
        section :this.setSession,
        subjectIdList: this.subject
      },{
        "content-type":"application/json"
      }).then( res => {
        // console.log( res )
        this.loading = false;
        this.tabLoading = false;
        if(res.code == "0000"){
          if(res.data != null){
            if(res.data.length > 0){
              this.columns.push({
                title: "分数段",
                key: 'types',
                align:'center',
                width:90,
              })
              let tabObj = {'types':'人数'};
              for(let i in res.data){
                let obj = {};
                obj.year = res.data[i].name;
                obj.sales = res.data[i].count;
                this.chartData.push(obj);
                this.columns.push({
                  title: res.data[i].name,
                  key: res.data[i].name,
                  align:'center',
                  minWidth:90
                })
                tabObj[res.data[i].name] = res.data[i].count
              }
              this.tabData.push(tabObj) 
              this.setCharts(this.chartData);
            }
          }
          
        }
      })
    }
  },
  mounted(){
    for(let i in this.examInfo.subjectList){
      let obj = {};
      let disName =this.examInfo.subjectList[i].subjectName;
      let disLength = disName.length;
      disName = disName.substring(disLength-2,disLength);
      obj.id = this.examInfo.subjectList[i].subjectId;
      obj.name = disName
      this.gradeList.push(obj);
    }
    let sbId = [];
    sbId.push(this.examInfo.subjectList[0].subjectId);
    this.subject = sbId;
    this.setListSubjectCombinationSection();
  },
  updated(){
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.dis{
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
}
</style>