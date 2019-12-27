<template>
  <div>
    <div class="top_ranking">

      <div class="ranking-box" v-for="(item,index) in rankingData" :key="item.userId">
        <div class="box-top">
          <img :src="imgHolder" alt="">
          <div class="intr">
            <h4>姓名：{{item.userName}}</h4>
            <h6>年级：{{item.gradeName}}</h6>
            <h6>排名：{{item.gradeRank}}</h6>
          </div>
        </div>
        <div class="tab-c">
          <div :id="'d'+(index+1)" ></div>
        </div>
      </div>
  

    </div>
    
    <div class="tab-container">
      <div class="tab-title">总分排名</div>
      <Table border :columns="columns" :data="data" :loading="loading">
            <!-- <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="goAnalyze(row)">分析</Button>
            </template> -->
      </Table>
    </div>

  </div>
</template>

<script>
import { listStudentExamResultInfo } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"s_total_all_ranking",
  data(){
    return{
      imgHolder:"https://via.placeholder.com/95x95?text=75 x 75",
      columns: [],
      data: [],
      loading:true,
      rankingData:[],
    }
  },
  methods:{
    goAnalyze(row){
      console.log(row)
    },
    genarateCharts(id,data){
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
      for(let i = 1;i <= this.rankingData.length;i++){
        let data = [];
        for(let j=0;j<this.rankingData[i-1].studentAnswerSheetList.length;j++){
          let newObj = {};
          let disName = this.rankingData[i-1].studentAnswerSheetList[j].subjectName;
          let disLength = disName.length;
          disName= disName.substring(disLength-2,disLength);
          newObj.item = disName;
          newObj.a = this.rankingData[i-1].studentAnswerSheetList[j].score;
          data.push(newObj);
        }
        this.genarateCharts("d"+i,data);
      }
    },
    async getListStudentExamResultInfo(){//年级总排名
      this.data = [];
      this.columns = [];
      listStudentExamResultInfo({
        examId:this.examInfo.id,
        gradeId: this.examInfo.gradeId,
        schoolId: this.examInfo.schoolId
      }).then( res => {
        // console.log(res)
        this.loading = false;
        if (res.code == "0000") {
          if (res.data != null) {
            if (res.data.length > 0) {
              this.columns.push(
                {
                    title: '姓名',
                    key: 'userName',
                    align:'center',
                },
                {
                    title: '年级',
                    key: 'gradeName',
                    align:'center'
                },
                {
                  title:'班级',
                  key:'className',
                  align:'center'
                },
                {
                  title:'年级排名',
                  key:'gradeRank',
                  align:'center'
                },
                {
                  title:'班级排名',
                  key:'classRank',
                  align:'center'
                },
                {
                    title: '总分',
                    key: 'score',
                    align:'center'
                }
              )
              for(let item of res.data[0].studentAnswerSheetList){
                let obj={}
                obj.title=item.subjectName.substring(2)
                obj.key=item.subjectName.substring(2)
                obj.align='center'
                this.columns.push(obj)
              }
              for (let i in res.data) {
                let newObj = {};
                  if (i < 10) {
                    this.rankingData.push(res.data[i]);
                  }
                  newObj.userName = res.data[i].userName;
                  newObj.gradeName = res.data[i].gradeName;
                  newObj.className = res.data[i].className;
                  newObj.gradeRank = res.data[i].gradeRank;
                  newObj.classRank = res.data[i].classRank;
                  newObj.score = res.data[i].score;

                for(let item of res.data[i].studentAnswerSheetList){
                  newObj[item.subjectName.substring(2)]=item.score;
                }
                this.data.push(newObj);
              }
              
            }
          }
        }
      })
    },
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  mounted(){
      // console.log(this.examInfo)
  },
  created(){
    this.getListStudentExamResultInfo();
    
  },
  updated(){
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