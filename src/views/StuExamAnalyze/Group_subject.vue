<template>
  <div>
    <div class="dis" style="margin-top:-10px;">
      <div style="width:45px;margin:10px 0 0 0">
        科目：
      </div>
      <div class="checkbox-group">
          <el-checkbox-group v-model="subject" size="small" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in list" :key="index" :label="item.subjectId" border>{{item.subjectName}}</el-checkbox>
          </el-checkbox-group>
        </div>
    </div>
    <div  style="margin-bottom:10px;">
      选择班级：<Select v-model="selClassId" style="width:200px" @on-change="selClassFn">
              <Option :value="item.id" v-for="item in classArr" :key="item.id">{{item.name}}</Option>
          </Select>
    </div>
    <div class="center">
      全选：<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <Button style="margin:0 0 0 20px" size="small" type="primary" :loading="btnLoading" @click="comfirm">确定</Button>
    </div>
    
    <div class="chart-c" style="margin:20px 0 0 0">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
import { subjectCombinationAnalysis } from "@/api/stuAnalyze" 
import { listClass } from "@/api/user"
import { mapState } from "vuex"
let _this;
export default {
  data(){
    return{
      subject:[],
      checkAll: false,
      btnLoading:false,
      list:[],
      chartData:[],
      isIndeterminate:false,
      gradeList: [
          {
              id: '1',
              name: '物理'
          },
          { 
              id: '2',
              name: '化学'
          },
          { 
              id: '3',
              name: '生物'
          }
      ],
      selClassId:0,
      classArr:[],
    }
  },
  methods:{
    downloadImg(){
      this.$downloadChart("d1","学科组合分析")
    },
    selClassFn(){
      this.comfirm();
      // console.log(this.selClassId)
    },
    comfirm(){
      this.btnLoading=true
      if(this.subject.length===0) {
        this.btnLoading=false
        return this.$message.warning("请选择科目")
      }
      let list="";
      for(let item of this.subject){
        list+=item+","
      }
      subjectCombinationAnalysis({
        classId:this.selClassId,
        schoolId:this.examInfo.schoolId,
        gradeId:this.examInfo.gradeId,
        examId:this.examInfo.id,
        subjectIdList:list
      }).then(res=>{
        _this.chartData=[]
        if(res.code==="0000"){
          for(let item of res.data){
            let obj={}
            obj.Class=item.className
            obj.Grade=item.userName
            obj.Score=item.score
            _this.chartData.push(obj)
          }
          _this.initchart(_this.chartData);
        }
      })
    },
    handleCheckAllChange(val) {
      let list=[];
      for(let item of this.list){
        list.push(item.subjectId)
      }
      this.subject = val ? list : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
    },
    initchart(data){
      this.btnLoading=false
      const chart = new this.$G2.Chart({
        container: "d1",
        forceFit: true,
        height: 500
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
       _this.$nextTick(()=>{
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
          this.comfirm();
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
    
  },
  created(){
    _this=this;
  
    this.classList=this.examInfo.subjectList
    this.list=[];
    for(let item in this.classList){
      this.list.push(this.classList[item])
    }
    this.subject=[this.list[0].subjectId]
    if(this.list.length>1){
      this.checkAll=false
    }else{
      this.checkAll=true
    }
    _this.getClassList();
  }
}
</script>

<style lang="scss" scoped>
.dis{
  display: flex;
  margin: 0 0 15px 0;
  width: 100%;
}
.checkbox-group >>> .el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin:10px 15px 0 0;
}
.checkbox-group >>> .el-checkbox{
    margin-right:15px;
  }
.center{
  display: flex;
  align-items: center;
}

</style>