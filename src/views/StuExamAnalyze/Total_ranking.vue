<template>
  <div>
    选择班级：<Select v-model="selClassId" style="width:200px" @on-change="selClassFn">
              <Option :value="item.id" v-for="item in classArr" :key="item.id">{{item.name}}</Option>
          </Select>
    <div class="chart-c">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
    <div class="tab-container" >
      <div class="tab-title">
        总分与名次报表
        <Button class="fr" type="primary" size="small" icon="ios-download-outline" @click="exportData">导出数据</Button>
      </div>
      <Table border :columns="columns" :loading="btnLoading" :data="tableData" ref="table1">
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
import { totalScoreAndRanking } from "@/api/stuAnalyze"
import { listClass } from "@/api/user"
import { listEachSubjectScoreInfo } from "@/api/schoolAnalyze"
import { mapState } from "vuex"
import { get } from 'http'
export default {
  data(){
    return{
      btnLoading:true,
      columns:[],
      tableData:[],
      selClassId:0,
      classArr:[],//班级列表
      modal8:false,
      userName:'',//学生名
      schoolScore:[],//
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList
    })
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","总分与名次")
    },
    selClassFn(){
      this.getTotalScoreAndRanking();
    },
    goAnalyze(row){
      this.modal8 = true;
      this.userName = row.name;
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
      this.$nextTick(()=>{
        if(document.getElementById(id).children.length>1){
          document.getElementById(id).removeChild(document.getElementById(id).firstChild)
        }
      })
    },
    exportData(){
      this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'-总分与名次'
      });
    },
    initChart(data){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
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
      chart.legend({
        reversed: false // 图例项逆序显示
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
          length: 2
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
      chart.legend(false)
      chart.render();
      this.$nextTick( () => {
        if(document.getElementById("d1").children.length>1){
          document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
        }
      })
    },
    async getClassList(){//得到班级列表
      this.classArr = [];
      listClass({
        schoolId:this.examInfo.schoolId,
        gradeId: this.examInfo.gradeId
      }).then( res => {
        if(res.code == "0000"){
          this.selClassId = res.data[0].id
          this.classArr = res.data;
          this.getTotalScoreAndRanking();

        }
      })
    },
    async getTotalScoreAndRanking(){//总分与名次
      this.columns = [];
      this.tableData = [];
      totalScoreAndRanking({
        examId:this.examInfo.id,
        gradeId:this.examInfo.gradeId,
        schoolId:this.examInfo.schoolId,
        classId :this.selClassId
      }).then( res => {
        this.btnLoading=false;
        let list=[];
        this.columns = [
          {
              title: '班级',
              key: 'className',
              align:'center',
              minWidth:90,
              fixed:'left'
          },{
              title: '姓名',
              key: 'name',
              align:'center',
              minWidth:90,
              fixed:'left'
          },
          {
            title: '班级排名',
            key: 'classRank',
            align:'center',
            minWidth:90,
            fixed:'left'
          },
          {
            title: '年级排名',
            key: 'gradeRank',
            align:'center',
            minWidth:90,
            fixed:'left'
          },
          {
              title: '总分',
              key: 'score',
              align:'center',
              minWidth:90,
              fixed:'left'
          }];
        for(let item of res.data[0].studentAnswerSheetList){
          let obj={}
          obj.title=item.subjectName.substring(2)
          obj.key=item.subjectName.substring(2)
          obj.align = 'center'
          obj.minWidth = 90
          this.columns.push(obj)
        }
        this.columns.push({
          align:'center',
          minWidth:80,
          title:'操作',
          slot:'action',
          fixed:'right'
        })
        for(let item of res.data){
          let obj={};
          let t_obj = {};
          obj.Class=item.className
          obj.Grade=item.userName
          obj.Score=item.score
          list.push(obj)
          t_obj.className = item.className;
          t_obj.name = item.userName;
          t_obj.classRank = item.classRank;
          t_obj.gradeRank = item.gradeRank;
          t_obj.score = item.score;
          t_obj.list = item.studentAnswerSheetList;
          for(let s_item of item.studentAnswerSheetList){
            t_obj[s_item.subjectName.substring(2)] = s_item.score
          }
          this.tableData.push(t_obj)
        }
        this.initChart(list)

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
  created(){
    this.getClassList();
    this.getListEachSubjectScoreInfo();
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>