<template>
  <div>
    <div >
      <div>绝对进(退)步学生人数</div>
      <div class="chart-c">
        <div style="text-align:right">
          <span @click="downloadImg">下载图表图片</span>
        </div>
        <div id="d1"></div>
      </div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分绝对进(退)步学生名单
        <Button class="fr" type="primary" size="small" @click="exportData"><Icon type="ios-download-outline"></Icon>导出数据</Button>
      </div>
      <Table ref="table1" border :columns="columns" :data="tabData" :loading='loading'></Table>
    </div>
  </div>
</template>

<script>

import { selectGradeListClassProgressOrRetrogress } from "@/api/schoolAnalyze"
import { mapState } from "vuex"
const data = [
  { name: '绝对进步', 班级: 'Jan.', 人数: 18.9 },
  { name: '绝对进步', 班级: 'Feb.', 人数: 28.8 },
  { name: '绝对退步', 班级: 'Jul.', 人数: 37.4 },
  { name: '绝对退步', 班级: 'Aug.', 人数: 42.4 }
];
export default {
  name: "s_total_pro_stu_class",
  data() {
    return {
      absoluteList:[],//绝对
      tabData:[],
      columns:[
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
          title: "进(退)步名次('-'表退步)",
          key: 'gradeRank',
          align:'center'
        }
      ],
      loading:true,
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","总分绝对进(退)步学生名单")
    },
    exportData(){//导出全校排名数据
      if(this.tabData.length != 0){
        this.$refs.table1.exportCsv({
          filename: this.examInfo.name +'总分绝对进(退)步学生名单'
        });
      }else{
        this.$Message.warning('表格暂无数据,数据不能导出')
      }
    },
    setBar(dom,data){
      const chart = new this.$G2.Chart({
        container: dom,
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.interval().position('班级*人数').color('name',function(name){
        if(name == "绝对进步"){
          return 'green'
        }else{
          return 'red'
        }
      })
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
      chart.render();
    },
    async setSelectGradeListClassProgressOrRetrogress(){
      this.absoluteList = [];
      this.tabData = [];
      selectGradeListClassProgressOrRetrogress({
        examId:this.examInfo.id,//97
      }).then( res => {
          // console.log(res);
          this.loading = false
          if(res.data.absolute != null){//绝对
            let absoluteData = res.data.absolute;
            for(let a_item of absoluteData){
              let progressCount = 0;
              let regCount = 0;
              
              for(let a_c_item of a_item.list){
                let tabDataList = {};
                tabDataList.className = a_item.className;
                tabDataList.userName = a_c_item.userName;
                tabDataList.gradeRank = -a_c_item.gradeRank;
                this.tabData.push(tabDataList);
                if(a_c_item.gradeRank < 0){
                  progressCount ++
                }else{
                  regCount ++
                }

              }
              if(progressCount >=0){
                let a_obj = {}
                a_obj['人数'] = progressCount;
                a_obj.name = '绝对进步';
                a_obj['班级'] = a_item.className;
                this.absoluteList.push(a_obj);
              }
              if(regCount >= 0){
                let a_obj = {}
                a_obj['人数'] = regCount;
                a_obj.name = '绝对退步';
                a_obj['班级'] = a_item.className;
                this.absoluteList.push(a_obj);
              }
            }
            // console.log(this.absoluteList);
            this.$nextTick( ()=> {
              this.setBar('d1',this.absoluteList)
            })
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
    this.setSelectGradeListClassProgressOrRetrogress();
    // this.setBar('d2');
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
</style>