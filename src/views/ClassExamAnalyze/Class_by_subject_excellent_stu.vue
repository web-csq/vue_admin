<template>
  <div>
    <div class="loading" v-if='loadShow'>
      <Spin class="img">
        <Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
        <div>数据正在拼命加载中...</div>
      </Spin>
    </div>
  <!-- 内容 -->
    <div v-if="selLoading">
      选择班级：<Select  v-model="selClassId" style="width:200px" @on-change="selClassFn" >
        <Option :value="0" >全部</Option>
          <Option :value="item.id" v-for="item in classList" :key="item.id">{{item.name}}</Option>
      </Select>
    </div>
    <div class="chart-c divbox" v-show="isShow">
      <div id="d1"></div>
    </div>
    <div class="tab-container" v-show="isShow">
      <div class="tab-title">班级分学科准优秀学生报表</div>
      <Table border :columns="columns" :data="dataList" :loading='loading'></Table>
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
import { selectGradeListClassLevleTwo } from "@/api/classAnalyze"
import { listClass } from "@/api/user"
import { mapState } from "vuex"
export default {
  name: "c_class_by_subject_excellent_stu",
  data() {
    return {
      loadShow:true,
      selLoading:false,
      absoluteList:[],//绝对
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
      selClassId:'',
      classList:[],
      type:0,
      loading:true,
      isShow:false,
    }
  },
  methods:{
    selClassFn(){
      this.type ++
      this.loading = true;
      this.setSelectGradeListClassLevleTwo();
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
        .size(4);
      chart.legend(false);
      chart.render();
      if(this.type != 0){
        this.$nextTick(()=>{
            if(document.getElementById('d1').children.length>1){
                document.getElementById('d1').removeChild(document.getElementById('d1').firstChild)
            }
        })
      }
    },
    async setSelectGradeListClassLevleTwo(){
      this.absoluteList = [];
      this.dataList = [];
      let obja = {}
      if(this.selClassId != ''){
        obja.classId = this.selClassId;
      }
      obja.examId = this.examInfo.id;
      selectGradeListClassLevleTwo(obja).then( res => {
          // console.log(res);
          this.loadShow = false;
          this.selLoading = true;
        if(res.code == "0000"){
          this.loading = false
          if(res.data != null){//绝对
            if(res.data.length >0){
              this.isShow = true
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
              this.$nextTick( ()=> {
                this.setChart('d1',this.absoluteList);
              })
            }else{
              this.isShow = false
              this.$Message.warning('暂无分析数据');
            }
          }else{
            this.isShow = false
            this.$Message.warning('暂无分析数据');
          }
        }
      })
    },
    async getClassList(){
      listClass({
        schoolId:this.examInfo.schoolId,
        gradeId:this.examInfo.gradeId
      }).then( res => {
        this.classList = res.data;
      })
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam
    })
  },
  mounted() {
    this.getClassList();
    this.setSelectGradeListClassLevleTwo();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.divbox{
  margin: 20px 0 10px 0;
}
</style>