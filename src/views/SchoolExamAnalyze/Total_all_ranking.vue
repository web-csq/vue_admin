<template>
  <div>
    <div class="top_ranking">
      <div style="width:100%;">
        <div style="text-align:right;">
          <span @click="downloadImg">下载图表图片</span>
        </div>
        <ul style="text-align:center;" class="uls">
          <li>该科最高分</li>
          <li>学生该科得分</li>
          <li>该科平均分</li>
          <li>该科最低分</li>
        </ul>
      </div>
      <div class="top_ranking" id="totall_ranking">
        <div class="ranking-box" v-for="(item,index) in rankingData" :key="index">
          <div class="box-top">
              <h4>姓名：<span style="color:#409EFF">{{item.userName}}</span> </h4>
              <h4>班级：<span>{{item.className}} </span> </h4>
              <h6>排名：{{item.rankings}}</h6>
          </div>
          <div class="tab-c">
            <div :id="'d'+(index+1)"></div>
          </div>
        </div>
      </div>

    </div>
    <!-- 分段 -->
    <div style="margin-top:20px;">
        排名阶段:
        <Input size="small" min='1' v-model="startGradeRank" placeholder="开始年级排名"  style="width: 90px" @keydown.enter.native="rankingBtn" /> 至
        <Input size="small" min='2' v-model="endGradeRank" placeholder="结束年级排名"  style="width: 90px" @keydown.enter.native='rankingBtn' />
        <Button :loading='btnLoading' style="margin-left:10px;" type="primary" size='small' @click="rankingBtn">确定</Button>
    </div>
    <!-- 表格 -->
    <div class="tab-container">
      <div class="tab-title">
        总分排名
        <Button class="fr" type="primary" size="small" @click="exportData"><Icon type="ios-download-outline"></Icon>导出数据</Button>
      </div>
      <Table border ref="table1" :columns="columns" :data="data" :loading="loading">
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
import { listStudentExamResultInfoByGradeRank,listEachSubjectScoreInfo } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"s_total_all_ranking",
  data(){
    return{
      columns: [],
      data: [],
      loading:true,
      btnLoading:false,
      rankingData:[],
      modal8:false,
      type:0,
      userName:'',
      schoolScore:[],//校级各科最高分集合
      endGradeRank:50,//结束年级排名
      startGradeRank:1,//开始年级排名
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("totall_ranking","总分全体排名-前10名")
    },
    rankingBtn(){//排名
      this.type ++;
      if(this.endGradeRank == 0 || this.startGradeRank == 0){
        this.$Message.warning('开始年级排名或者结束年级排名不能为0')
        return
      }
      if(this.startGradeRank >= this.endGradeRank){
        this.$Message.warning('开始年级排名不能大于结束年级排名不能为0')
        return
      }
      this.loading = true;
      this.btnLoading = true;
      this.getListStudentExamResultInfoByGradeRank();
    },
    exportData(){//导出全校排名数据
        this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'成绩总计'
      });
    },
    goAnalyze(row){//查看详情
      this.modal8 = true
      this.userName = row.userName
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
    genarateCharts(id,data){
      const dv = new this.$DataSet.DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ '该科最高分','学生该科得分','该科平均分','该科最低分'], // 展开字段集
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
      chart.line().position('item*score').color('user',function(user){
        if( user == "该科最低分"){
          return 'red'
        }
      }).size(2);
      chart.point().position('item*score').color('user',function(user){
        if( user == "该科最低分"){
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
      this.$nextTick(()=>{
        if(document.getElementById(id).children.length>1){
          document.getElementById(id).removeChild(document.getElementById(id).firstChild)
        }
      })
    },
    genarate(){
      for(let i = 1;i <= this.rankingData.length;i++){
        let data = [];
        for(let j=0;j<this.rankingData[i-1].studentAnswerSheetList.length;j++){
          
          let disName = this.rankingData[i-1].studentAnswerSheetList[j].subjectName;
          let disLength = disName.length;
          disName= disName.substring(disLength-2,disLength);
          for(let s_item of this.schoolScore){
            if(s_item.item == disName){
              let newObj = {};
              newObj.item = disName;
              newObj['该科最高分'] = s_item['该科最高分']
              newObj['学生该科得分'] = this.rankingData[i-1].studentAnswerSheetList[j].score;
              newObj['该科最低分'] = s_item['该科最低分']
              newObj['该科平均分'] = s_item['该科平均分']
              data.push(newObj);
            }
          }
          

        }
        // console.log(data);
        this.genarateCharts("d"+i,data);
      }
    },
    async getListStudentExamResultInfoByGradeRank(){//年级总分排名(含排名筛选)
      this.data = [];
      this.columns = [];
      listStudentExamResultInfoByGradeRank({
        endGradeRank : this.endGradeRank,
        startGradeRank: this.startGradeRank,
        schoolId : this.examInfo.schoolId,
        gradeId :this.examInfo.gradeId,
        examId : this.examInfo.id
      }).then( res => {
        // console.log( res );
        this.loading = false;
        this.btnLoading = false
        if(res.code == '0000'){
          if (res.data != null && res.data.length > 0) {
              this.columns.push(
                {
                  title:'班级',
                  key:'className',
                  align:'center',
                  minWidth:90,
                  fixed:'left'
                },
                {
                    title: '姓名',
                    key: 'userName',
                    align:'center',
                    minWidth:90,
                    fixed:'left'
                },
                
                {
                  title:'年级排名',
                  key:'gradeRank',
                  align:'center',
                  minWidth:90,
                  fixed:'left'
                },
                {
                  title:'班级排名',
                  key:'classRank',
                  align:'center',
                  minWidth:100,
                },
                {
                    title: '总分',
                    key: 'score',
                    align:'center',
                    minWidth:80,
                }
              )
              for(let item of res.data[0].studentAnswerSheetList){
                let obj={}
                obj.title=item.subjectName.substring(2)
                obj.key=item.subjectName.substring(2)
                obj.align='center';
                obj.minWidth=90,
                this.columns.push(obj)
              }
              this.columns.push({
                align:'center',
                minWidth:90,
                title:'操作',
                slot:'action',
                fixed:'right'
              })
              for (let i in res.data) {
                let newObj = {};
                  if(this.type == 0){
                    if (i < 10) {
                      res.data[i].rankings = "第" + res.data[i].gradeRank + '名'
                      this.rankingData.push(res.data[i]);
                    }
                  }
                  newObj.userName = res.data[i].userName;
                  newObj.gradeName = res.data[i].gradeName;
                  newObj.className = res.data[i].className;
                  newObj.gradeRank = res.data[i].gradeRank;
                  newObj.classRank = res.data[i].classRank;
                  newObj.score = res.data[i].score;
                  newObj.list = res.data[i].studentAnswerSheetList;
                for(let item of res.data[i].studentAnswerSheetList){
                  newObj[item.subjectName.substring(2)]=item.score;
                }
                this.data.push(newObj);
              }
              // console.log(this.rankingData);
            }
        }

      })

    },
    async getListEachSubjectScoreInfo(){//列出年级最高分
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
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  mounted(){
      // console.log(this.examInfo)
      this.getListEachSubjectScoreInfo()
      this.getListStudentExamResultInfoByGradeRank();
  },
  created(){
    
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
.uls li{
  display: inline-block;
  margin-left: 10px;
}
.uls li::before{
  display: inline-block;
  width: 10px;
  height: 10px;
  content: '';
  border-radius: 50%;
  margin-right: 5px;
}
.uls li:nth-of-type(1):before{
  background: #409EFF;
}
.uls li:nth-of-type(2):before{
  background: #2FC25B;
}
.uls li:nth-of-type(3):before{
  background: #FACC14;
}
.uls li:nth-of-type(4):before{
  background: #F00;
}
</style>