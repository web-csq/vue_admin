<template>
  <div>
    <div>
      选择班级：
      <Select v-model="model" style="width:200px;margin:0 20px 0 0" @on-change="getStus">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <div class="chart-c">
      <div id="d1"></div>
    </div>
    <div>
      学生列表：
    </div>
    <div style="margin-top: 20px;width:80%" class="radio-group">
      <el-radio-group v-model="stu" size="small" @change="select">
        <el-radio v-for="(item,index) in stuList" :key="index" :label="item.id" border>{{item.truename}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { subjectDirection } from "@/api/stuAnalyze"
import { listUserByRoleIdAndPage } from "@/api/user"

import { mapState } from "vuex"
let _this;
export default {
  name:"",
  data(){
    return{
      stuList:[],
      stu:0,
      type:1
    }
  },
  computed:{
    ...mapState({
      examInfo:state=>state.app.analyzeExam,
      classList:state=>state.app.classList,
      term:state=>state.user.term,
      year:state=>state.user.year,
    })
  },
  methods:{
    select(value){
      subjectDirection({
        term:_this.term,
        userId :_this.stu,
        year:_this.year
      }).then(res=>{
        if(res.code==="0000"){
          let list=[]
          for(let item of res.data){
            let obj={}
            obj.month=item.examName
            obj.city=item.subjectName.substr(2)
            obj.temperature=item.score
            list.push(obj)
          }
          console.log(list)
          _this.initChart(list)
          _this.type++
        }
      })
    },
    getStus(){
      listUserByRoleIdAndPage({
        roleId:4,
        classId:this.model,
        enabled:1,
        pageSize:1000
      }).then(res=>{
        if(res.data===null) {
          _this.$message.warning("暂无数据")
          _this.stuList=[]
        } 
        if(res.code==="0000"){
          _this.stuList=res.data
          _this.stu=res.data[0].id
          _this.select()
        }
      })
    },
    initChart(data){
      
      const chart = new this.$G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 400
      });
      chart.source(data, {
        month: {
          range: [ 0, 1 ]
        }
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.axis('temperature', {
        label: {
          formatter: val => {
            return val + '分';
          }
        }
      });
      chart.line().position('month*temperature').color('city');
      chart.point().position('month*temperature').color('city')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
      if(this.type!==1){
       
         _this.$nextTick(()=>{
           if(document.getElementById("d1").children.length>1){
             document.getElementById("d1").removeChild(document.getElementById("d1").firstChild)
           }
        })
      }
    }
  },
  created(){
    _this=this
    _this.model=_this.classList[0].id
    this.getStus()
  },
  mounted(){
    


  }
}
</script>

<style lang="scss" scoped>

.radio-group >>> .el-radio{
  margin: 0;
}
</style>