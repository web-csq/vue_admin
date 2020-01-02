<template>
  <div>
    <div style="display:flex;align-items:center">
      选择班级：
      <Select v-model="model" style="width:200px;margin:0 20px 0 0" @on-change="setSection">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      分数间隔：
      <div style="display:flex;width:80px">
        <Input v-model="section"  size="small" placeholder="输入分数段" />
      </div>
      
      <Button type="primary" style="margin:0 0 0 10px" :loading="btnLoading" @click="setSection" size="small">设置分段</Button>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div class="tab-container">
      <div class="tab-title">班级总分分段报表</div>
      <Table border :columns="columns" :data="tableData"></Table>
    </div>
    <!-- <h5 style="margin:20px 0 0 0;">
      诊断分析：<span style="color:#f10215">峰度大，成绩相比不稳定</span>
    </h5> -->

  </div>
</template>

<script>
import { listStudentTotalScoreGroupByClass } from "@/api/classAnalyze"
import { listClass } from "@/api/user"
import { mapState } from 'vuex';
let _this
export default {
  name:"",
  data(){
    return{
      section:20,
      btnLoading:false,
      type:1,
      model: '',
      columns: [],
      chartData:[],
      tableData: []
    }
  },
  methods:{
    setSection(){
      _this.btnLoading=true;
      listStudentTotalScoreGroupByClass({
        classId:_this.model,
        examId:this.examInfo.id,
        section:_this.section
      }).then(res=>{
        if(res.code==="0000"){
          if(res.data.length===0) _this.$message.error("暂无数据")
          let list=[];
          _this.columns=[{
                title: '分段',
                key: 'subsc',
                align:'center',
                minWidth: 80,
            }]
          _this.tableData=[];
          let obj2={subsc:"数量"}
          for(let item of res.data){
            let obj={},obj1={}
            obj.year=item.name;
            obj["数量"]=item.count;
            obj1.title=item.name;
            obj1["key"]=item.name
            obj1.align = 'center'
            obj1.minWidth = 90
            obj2[item.name]=item.count
            list.push(obj)
            _this.columns.push(obj1)
            
          }
          console
          _this.tableData.push(obj2)
          _this.initCharts(list,_this.type)
          _this.type++
        }
      })
    },
    initCharts(data,type){
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.tooltip({
        crosshairs: false,
        inPlot: false,
        position: 'top'
      });
      chart.axis('value', {
        label: {
          formatter: val => {
            if ((val % 2)) {
              return val;
            }
            return '';
          }
        }
      });
        chart
        .line()
        .position('year*数量')
        .color("#d9d9d9")
        .shape('smooth');
        chart.interval().position('year*数量');
        chart.changeData(data);
        chart.source(data);
     
        
         _this.$nextTick(()=>{
           if(document.getElementById("d1").children.length>1){
             document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
           }
        })
      _this.btnLoading=false;
        
      
      
     
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      term:state=>state.user.term,
      year:state=>state.user.year,
      classList:state=>state.app.classList
    })
  },
  created(){
    _this=this
    _this.model=_this.classList[0].id
    _this.setSection();
   
    
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";

</style>