<template>
  <div>
    <div class="top">
      分数间隔：<InputNumber  :min="1" :step="10" v-model="sectionList"></InputNumber>
      <Button style="margin-left:10px;" size="small" type="primary" @click="selScore" :loading="loading">设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">总分年级分段报表</div>
      <Table border :columns="columns" :data="data" :loading="loadingTab"></Table>
    </div>
  </div>
</template>

<script>
const data = [
  { name: '高一一班', 分段: '0-100', 分数: 318 },
];
import { selectGradeListClassDifSection } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
  name:"total_class_subction",
  data(){
    return{
      sectionList :50,
      loading:false,
      loadingTab:true,
      columns: [],
      data: [],
      chartData:[],
      type:0,
    }
  },
  methods:{
    selScore(){
      this.loading = true;
      this.type ++ ;
      this.setSelectGradeListClassDifSection();
    },
    setChart(data){
      const chart = new G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.clear();
      chart.source(data,{
        "分数":{
          min:0,
          max:1000,
          tickCount:11
        }
      });
      chart.axis("分段",{
          title: {
            textStyle: {
              fontSize: 14, // 文本大小
              textAlign: 'center', // 文本对齐方式
              fill: '#000', // 文本颜色
              // ...
            }
          },
          }
        );
      chart.interval().position('分段*分数').color('name')
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
      chart.render();
      if(this.type != 0){
        this.$nextTick(()=>{
          if(document.getElementById("d1").children.length>1){
            document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
          }
        })
      }
    },
    async setSelectGradeListClassDifSection(){//总分班级
        this.data = [];
        this.columns = [];
        this.chartData = [];
        selectGradeListClassDifSection({
          examId :this.examInfo.id,
          section :this.sectionList 
        }).then( res => {
          this.loading = false;
          this.loadingTab = false;
          if (res.code == "0000") {
            if (res.data != null) {
              if (res.data.classSectionList != null) {
                let tabList = res.data.classSectionList;
                let titles = [];
                for(let i in tabList){
                  titles = tabList[i];
                  let obj = {};
                  obj.section = i;
                  let name = i;
                  for(let k in tabList[i]){
                    obj[tabList[i][k].name] = tabList[i][k].count;
                    let newChartObj = {};
                    newChartObj.name = name;
                    newChartObj['分数'] = tabList[i][k].count;
                    newChartObj['分段'] = tabList[i][k].name;
                    this.chartData.push(newChartObj);
                  }
                  this.data.push(obj);
                  
                }
                // console.log('数据',this.chartData)
                this.columns.push({title: '班级',key: 'section',align:'center'})
                for(let  j in titles){
                  this.columns.push({ title:titles[j].name,key:titles[j].name,align:'center'})
                }
                this.setChart(this.chartData);
              }

            }
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
    this.setSelectGradeListClassDifSection();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>