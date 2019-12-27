<template>
  <div class="contain">
      <Row class="divBox">
          <Col span="6">
            <div class="topBox">
              <strong>{{count.schoolCount}}</strong>
              <p>参与学校数</p>
            </div>
          </Col>
          <Col span="6">
            <div class="topBox">
              <strong>{{count.classCount}}</strong>
              <p>参与班级数</p>
            </div>
          </Col>
          <Col span="6">
            <div class="topBox">
              <strong>{{count.subjectCount}}</strong>
              <p>参与学科数</p>
            </div>
          </Col>
          <Col span="6">
            <div class="topBox">
              <strong>{{count.studentCount}}</strong>
              <p>参与考生数</p>
            </div>
          </Col>
      </Row>
      <!-- 综合报表 -->
      <div class="tab-container tab-container1">
        <div class="tab-title"><Icon type="md-radio-button-on" />&nbsp;综合报表</div>
          <Row >
            <Col span="4">
              <div class="divCenter">
                <strong>{{schoolInfo.avgScore}}</strong>
                <p>平均分</p>
              </div>
            </Col>
            <Col span="5">
              <div class="divCenter">
                <strong>{{schoolInfo.medianScore}}</strong>
                <p>中位数</p>
              </div>
            </Col>
            <Col span="5">
              <div class="divCenter">
                <strong>{{schoolInfo.maxScore}}</strong>
                <p>最高分</p>
              </div>
            </Col>
            <Col span="5">
              <div class="divCenter">
                <strong>{{schoolInfo.minScore}}</strong>
                <p>最低分</p>
              </div>
            </Col>
            <Col span="5">
              <div class="divCenter">
                <strong>{{schoolInfo.standardDeviation}}</strong>
                <p>方差</p>
              </div>
            </Col>
        </Row>
      </div>
      <!-- 卷面分析 -->
      <div class="tab-container" style="margin-top:30px;">
          <div class="tab-title"><Icon type="md-list-box" />&nbsp;学科报表</div>
          <Tabs :value="idx">
              <TabPane v-for="item in subjectList" :key="item.id" :label="item.subjectName" >
                  <Row >
                    <Col span="4">
                      <div class="divCenter">
                        <strong class="strong">{{item.avgScore != null? item.avgScore : 0}}</strong>
                        <p class="p">平均分</p>
                      </div>
                    </Col>
                    <Col span="5">
                      <div class="divCenter">
                        <strong class="strong">{{item.medianScore != null? item.medianScore : 0}}</strong>
                        <p class="p">中位数</p>
                      </div>
                    </Col>
                    <Col span="5">
                      <div class="divCenter">
                        <strong class="strong">{{item.maxScore != null? item.maxScore : 0}}</strong>
                        <p class="p">最高分</p>
                      </div>
                    </Col>
                    <Col span="5">
                      <div class="divCenter">
                        <strong class="strong">{{item.minScore != null? item.minScore : 0}}</strong>
                        <p class="p">最低分</p>
                      </div>
                    </Col>
                    <Col span="5">
                      <div class="divCenter">
                        <strong class="strong">{{item.standardDeviation != null? item.standardDeviation : 0}}</strong>
                        <p class="p">方差</p>
                      </div>
                    </Col>
                </Row>
              </TabPane>
          </Tabs>
      </div>
  </div>
</template>
<script>
import { dataKanban } from "@/api/schoolAnalyze"
import { mapState } from "vuex"

export default {
    name: 'home',
    data(){
      return{
        count:{
          schoolCount:0,
          studentCount:0,
          classCount:0,
          subjectCount:0,
        },
        schoolInfo:{
          avgScore:0,
          medianScore:0,
          maxScore:0,
          minScore:0,
          standardDeviation:0,
        },
        subjectList:[],
        idx:0,
      }
    },
    methods:{
      async setDataKanban(){//数据看板
        dataKanban({
          examId :this.examInfo.id,
          gradeId :this.examInfo.gradeId ,
          schoolId :this.examInfo.schoolId
        }).then( res => {
          console.log( res );
          if( res.code == "0000"){
            this.count = {
              schoolCount:res.data.schoolCount,
              studentCount:res.data.studentCount,
              classCount:res.data.classCount,
              subjectCount:res.data.subjectCount,
            }
            this.schoolInfo = {//examSchool
              avgScore: res.data.examSchool.avgScore,//平均分
              medianScore: res.data.examSchool.medianScore,//中位数
              maxScore: res.data.examSchool.maxScore,//最高分
              minScore: res.data.examSchool.minScore,//最高分
              standardDeviation: res.data.examSchool.minScore
            }
            this.subjectList = res.data.examSchoolSubjectList;
          }
        })
      },
    },
    computed:{
      ...mapState({
        examInfo:state=>state.app.analyzeExam
      })
    },
    components:{

    },
    mounted(){
      // console.log(this.examInfo);
      this.setDataKanban();
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.topBox{
    width: 200px;
    box-shadow: 3px 3px 11px #ab97fd;
    background-image: url(../../assets/imgs/x_img.png);
    text-align: center;
    display: inline-block;
    color: #fff;
    padding-left: 20px;
    padding-top: 30px;
    border-radius: 15px;
    padding-bottom: 20px;
    strong {
      font-size: 30px;
      font-weight: bolder;
    }
    p{
      font-size: 16px;
    }
  }
  .tab-container{
    .tab-title{
      font-size: 16px!important;
      font-weight: bolder;
      text-align: left;
    }
    .divCenter{
      text-align: center;
    }
    strong {
      font-size: 34px;
      color: #333;
      font-weight: 700;
    }
    p{
      width: 100%;
      text-align: center;
      color: #828282;
      font-size: 20px;
    }
  }
  .strong{
    font-size: 20px !important;
  }
  .p{
    font-size: 16px!important;
  }
  .divBox{
    margin-bottom:50px; 
  }
</style>
<style scoped>
  
</style>