<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px" @on-change="getData">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
    </div>
    <div class="top_ranking" v-if="!loading" id="dd1">
      <div class="ranking-box" v-for="(item,index) in rankingData" :key="index">
        <div class="box-top">
            <h4>姓名：<span style="color:#409EFF">{{item.userName}}</span> </h4>
            <h4>班级：<span style="color:#409EFF">{{item.className}} </span> </h4>
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
      <Table border ref="table1" :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="goAnalyze(row)">查看</Button>
        </template>
      </Table>
    </div>
    <!-- 查看个人详情 -->
    <Modal
        :title='"《"+examInfo.name +"》考试："+ userName+"个人成绩"'
        v-model="modal8"
        :footer-hide="true"
        :mask-closable="false">
          <div class="tab-c">
            <div id="modelChart"></div>
          </div>
    </Modal>

  </div>
</template>

<script>
import { listStudentExamResultInfo } from "@/api/classAnalyze"
import { listEachSubjectScoreInfo } from "@/api/schoolAnalyze"
import { mapState } from 'vuex';
let _this
export default {
  name:"s_total_all_ranking",
  data(){
    return{
      loading:false,
      current:0,
      contrastVisible:false,
      list:[],
      rankingData:[],
      columns: [],
      tableData: [],
      model: '',
      schoolScore:[],//校级各科最高分集合
      modal8:false,
      userName:"",
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("dd1","班级总分排名")
    },
    goAnalyze(row){//查看个人成绩
      this.modal8 = true
      this.userName = row.name
      // console.log(row)
      let sigleData = [];
      for(let items of row.list){
        for(let s_items of this.schoolScore){
          if(s_items.item == items.subjectName.substring(2)){
            let objs = {};
            objs.item = items.subjectName.substring(2);
            objs['学生该科得分'] = items.score;
            objs['该科最高分'] = s_items['该科最高分'];
            objs['该科平均分'] = s_items['该科平均分'];
            objs['该科最低分'] = s_items['该科最低分'];
            sigleData.push(objs);
          }
        }
        
      }
      this.$nextTick( ()=>{
        this.genarateCharts('modelChart',sigleData)
      })
    },
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
        fields: [ "该科最高分","学生该科得分",'该科平均分','该科最低分'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      });
      const chart = new this.$G2.Chart({
        container: id,
        forceFit: true,
        height: 350,
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
      chart.line().position('item*score').color('user',function(user){
        if(user == "该科最低分"){
          return 'red'
        }
      }).size(2);
      chart.point().position('item*score').color('user',function(user){
        if(user == "该科最低分"){
          return 'red'
        }
      }).shape('circle')
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
        let arrList = [];
        for(let s_item of this.schoolScore){
          for(let c_item of this.rankingData[i].dataList){
            if(s_item.item == c_item.item){
              let c_obj = {}
              c_obj.item = s_item.item;
              c_obj['该科最高分'] = s_item['该科最高分'];
              c_obj['学生该科得分'] = c_item['学生该科得分'];
              c_obj['该科平均分'] = s_item['该科平均分'];
              c_obj['该科最低分'] = s_item['该科最低分'];
              arrList.push(c_obj);
            }
          }
        }
        this.genarateCharts("d"+(i+1),arrList)
      }
    },
    getData(){
      _this.loading=true;
      _this.tableData = [];
      _this.columns = [];
      listStudentExamResultInfo({
        examId :this.examInfo.id,
        classId:this.model
      }).then(res=>{
        if(res.code==="0000"){
          if(res.data.length===0) return _this.$message.warning("没有此班级数据")
          let list=[];
          this.tableData=[];
          _this.columns=[{
                  title: '姓名',
                  key: 'name',
                  align:'center',
                  minWidth:90,
              },
              {
                title: '班级排名',
                key: 'ranking',
                align:'center',
                minWidth:90,
              },
              {
                title: '年级排名',
                key: 'gradeRanking',
                align:'center',
                minWidth:90,
              },
              {
                  title: '总分',
                  key: 'total',
                  align:'center',
                  minWidth:90,
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
            obj1.list=res.data[i].studentAnswerSheetList
            
            for(let item of res.data[i].studentAnswerSheetList){
              let dataObj={}
              dataObj.item=item.subjectName.substring(2);
              dataObj["学生该科得分"]=item.score;
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
            obj.minWidth = 90
            _this.columns.push(obj)
          }
          _this.columns.push({
            align:'center',
            minWidth:80,
            title:'操作',
            slot:'action',
            fixed:'right'
          })
          _this.rankingData=list.slice(0,10)
          _this.loading=false
        }
      })
    },
    async getListEachSubjectScoreInfo(){//年级最高分
      listEachSubjectScoreInfo({
        examId :this.examInfo.id,
        gradeId :this.examInfo.gradeId,
        schoolId :this.examInfo.schoolId
      }).then( res => {
        this.schoolScore = [];
        if(res.data != null && res.data.length != 0){
          for(let item of res.data){
            let s_obj = {};
            s_obj.item = item.subjectName.substring(2);
            s_obj['该科最高分'] = item.maxScore;
            s_obj['该科平均分'] = item.avgScore;
            s_obj['该科最低分'] = item.minScore;
            this.schoolScore.push(s_obj);
          }
          // console.log(this.schoolScore)
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
    _this.getListEachSubjectScoreInfo();
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
.chart-cc{
  width: 600px;
}
.intr{
  >div{
    margin: 0 0 15px 0;
  }
}
</style>