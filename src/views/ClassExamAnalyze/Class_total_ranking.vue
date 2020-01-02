<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px" @on-change="getData">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <div class="top_ranking" v-if="!loading">
      <div class="ranking-box" v-for="(item,index) in rankingData" :key="index">
        <div class="box-top">
            <h4>姓名：<span style="color:#409EFF">{{item.userName}}</span> </h4>
            <h4>班级：<span>{{item.className}} </span> </h4>
            <h6>排名：{{item.ranking}}</h6>
        </div>
        <div class="tab-c">
          <div :id="'d'+(index+1)"></div>
        </div>
      </div>
    </div>
    
    <div class="tab-container" v-if="!loading">
      <div class="tab-title">
        总分排名
        <Button class="fr" type="primary" size="small" @click="exportData">导出数据</Button>
      </div>
      <Table border ref="table1" :columns="columns" :data="tableData"></Table>
    </div>

  </div>
</template>

<script>
import { listStudentExamResultInfo } from "@/api/classAnalyze"
import { mapState } from 'vuex';
let _this
export default {
  name:"s_total_all_ranking",
  data(){
    return{
      loading:false,
      rankingData:[],
      columns: [],
      tableData: [],
      model: '',
    }
  },
  methods:{
    exportData(){
      let name;
      for(let item in this.classList){
        if(this.classList[item].id===this.model) name=this.classList[item].name
      }
      this.$refs.table1.exportCsv({
          filename: name+"-"+this.examInfo.name +'成绩总计'
      });
    },
    genarateCharts(id,data){
      const dv = new this.$DataSet.DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ "分数"], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });
      const chart = new this.$G2.Chart({
        container: id,
        forceFit: true,
        height: 300,
        padding: [ 10, 20, 10, 20 ]
      });
      chart.source(dv, {
        score: {
          min: 0,
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
      _this.$nextTick(()=>{
          if(document.getElementById(id).children.length>1){
            document.getElementById(id).removeChild(document.getElementById(id).firstChild)
          }
       })

    },
    genarate(){
      for(let i=0;i<this.rankingData.length;i++){
        this.genarateCharts("d"+(i+1),this.rankingData[i].dataList)
      }
    },
    getData(){
      _this.loading=true;
    listStudentExamResultInfo({
      examId :this.examInfo.id,
      classId:this.model
    }).then(res=>{
      if(res.code==="0000"){
        if(res.data.length===0) return _this.$message.error("没有此班级数据")
        let list=[];
        this.tableData=[];
        _this.columns=[{
                title: '姓名',
                key: 'name',
                align:'center'
            },
            {
              title: '班级排名',
              key: 'ranking',
              align:'center'
            },
            {
              title: '年级排名',
              key: 'gradeRanking',
              align:'center'
            },
            {
                title: '总分',
                key: 'total',
                align:'center'
            }];
        for(let i=0;i<res.data.length;i++){
          let obj={},obj1={}
          obj.userName=res.data[i].userName;
          obj.className=res.data[i].className;
          obj.ranking="第"+(res.data[i].classRank)+"名";
          obj.dataList=[];
          obj1.name=obj.userName
          obj1.total=res.data[i].score
          obj1.ranking=res.data[i].classRank
          obj1.gradeRanking=res.data[i].gradeRank
          
          for(let item of res.data[i].studentAnswerSheetList){
            let dataObj={}
            dataObj.item=item.subjectName.substring(2);
            dataObj["分数"]=item.score;
            obj1[item.subjectName.substring(2)]=item.score
            obj.dataList.push(dataObj)
            
          }
          _this.tableData.push(obj1)
          list.push(obj)
        }
        for(let item of res.data[0].studentAnswerSheetList){
          let obj={}
          obj.title=item.subjectName.substring(2)
          obj.key=item.subjectName.substring(2)
          obj.align = 'center'
          _this.columns.push(obj)
        }
        _this.rankingData=list.slice(0,10)
        _this.loading=false
      }
    })
  },
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
 
  created(){
    _this=this;
    _this.model=_this.classList[0].id
    _this.getData()
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
  justify-content: space-between;
  h6{
    background-color: #409EFF;
    color:#fff;
    padding: 5px 10px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    margin: -10px -10px 0 0;
  }
  
}
.top_ranking{
  display: flex;
  flex-wrap: wrap;
}
.ranking-box{
  // display: flex;
  border: 1px solid #ddd;
  padding: 10px;
  width: 480px;
  margin:10px 30px 0 0 ;
  border-radius: 8px;
}
</style>