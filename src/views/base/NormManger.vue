<template>
  <div>
    <div>
      选择年级：
      <Select
        style="margin-right:10px;width:200px"
        v-model="grade"
        @on-change="getExamSchoolTarget"
        :label-in-value="true"
      >
        <Option v-for="(item,index) in gradeList" :value="item.id" :key="index">{{ item.name }}</Option>
      </Select>
    </div>
    <div style="margin:15px;display:flex">
      <div>
        <div style="margin:0 0 20px 0">
          <div style="font-size:18px;font-weight:600;margin:0 0 20px 0">总分分段设置：</div>选择类型：
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="1">名次</el-radio-button>
            <el-radio-button label="2">分数</el-radio-button>
          </el-radio-group>
        </div>
        <div class="disflex">
          <span v-if="type==='2'">总分：</span>
          <Input
            type="number"
            v-if="type==='2'"
            v-model.trim="totalObj.score"
            :maxlength="3"
            clearable
            style="width:80px;margin:0"
          />
        </div>
        <div v-if="type==='2'">
          <div class="disflex">
            <span>优秀分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelOneScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelOneScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准优秀分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelTwoScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelTwoScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>良好分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelThreeScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelThreeScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准良好分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFourScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFourScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>及格分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFiveScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFiveScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>学困分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelSixScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelSixScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
        </div>
        <div v-if="type==='1'">
          <div class="disflex">
            <span>优秀名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelOneRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelOneRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准优秀名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelTwoRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelTwoRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>良好名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelThreeRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelThreeRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准良好名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFourRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="totalObj.levelFourRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <el-checkbox v-model="defaultSet">默认设置到科目</el-checkbox>
          </div>
        </div>
        <div style="text-align:right">
          <span></span>
          <Button
            type="primary"
            size="default"
            style="margin:0 20px 0 0"
            @click="submitTotalRanking"
          >提交</Button>
        </div>
      </div>

      <!-- 分割线-------------------------- -->
      <div style="margin:0 0 0 230px">
        <div style="margin:0 0 20px 0">
          <div style="font-size:18px;font-weight:600;margin:0 0 20px 0">学科分数分段设置：</div>选择科目：
          <el-radio-group v-model="subject" size="small" @change="subjectChange">
            <el-radio-button
              v-for="(item,index) in subjectList"
              :key="index"
              :label="item.dictdataValue"
            >{{item.dictdataName}}</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin:0 0 20px 0">
          选择类型：
          <el-radio-group v-model="subjectType" size="small">
            <el-radio-button label="1">名次</el-radio-button>
            <el-radio-button label="2">分数</el-radio-button>
          </el-radio-group>
        </div>
        <div class="disflex">
          <span v-if="subjectType==='2'">总分：</span>
          <Input
            type="number"
            v-if="subjectType==='2'"
            v-model.trim="subjectObj.score"
            :maxlength="3"
            clearable
            style="width:80px;margin:0"
          />
        </div>
        <div v-if="subjectType==='2'">
          <div class="disflex">
            <span>优秀分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelOneScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelOneScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准优秀分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelTwoScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelTwoScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>良好分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelThreeScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelThreeScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准良好分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFourScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFourScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>及格分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFiveScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFiveScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>学困分数段：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelSixScoreBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelSixScoreEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
        </div>
        <div v-if="subjectType==='1'">
          <div class="disflex">
            <span>优秀名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelOneRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelOneRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准优秀名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelTwoRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelTwoRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>良好名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelThreeRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelThreeRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
          <div class="disflex">
            <span>准良好名次：</span>
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFourRankBegin"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 0;"
            />—
            <Input
              type="number"
              clearable
              v-model.trim="subjectObj.levelFourRankEnd"
              :maxlength="2"
              style="width:80px;margin:0 5px 0 5px;"
            />
          </div>
        </div>
        <div style="text-align:right">
          <span></span>
          <Button
            type="primary"
            size="default"
            style="margin:0 20px 0 0"
            @click="setSubjectScore"
          >提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getGradeListBySessions } from "@/assets/js/common.js";
import {
  selectExamSchoolTarget,
  insertExamTarget,
  updateExamTarget,
  selectExamSchoolSubjectTarget,
  listSchoolSubjectsTarget,
  insertExamSchoolSubjectTarget,
  updateExamSchoolSubjectTarget
} from "@/api/schoolTarget";

export default {
  data() {
    return {
      gradeList: [],
      subjectSetList:[],
      defaultSet:true,
      subject: "",
      type: "1",
      totalType: -1,
      subjectType: "1",
      submitSubjectType:1,
      grade: "",
      subjectObj: {
        score: "",
        levelOneScoreBegin: "",
        levelOneScoreEnd: "",
        levelTwoScoreBegin: "",
        levelTwoScoreEnd: "",
        levelThreeScoreBegin: "",
        levelThreeScoreEnd: "",
        levelFourScoreBegin: "",
        levelFourScoreEnd: "",
        levelFiveScoreBegin: "",
        levelFiveScoreEnd: "",
        levelSixScoreBegin: "",
        levelSixScoreEnd: "",
        levelOneRankBegin: "",
        levelOneRankEnd: "",
        levelTwoRankBegin: "",
        levelTwoRankEnd: "",
        levelThreeRankBegin: "",
        levelThreeRankEnd: "",
        levelFourRankBegin: "",
        levelFourRankEnd: "",
        levelFiveRankBegin: "",
        levelFiveRankEnd: "",
        levelSixRankBegin: "",
        levelSixRankEnd: ""
      },
      totalObj: {
        score: "",
        levelOneScoreBegin: "",
        levelOneScoreEnd: "",
        levelTwoScoreBegin: "",
        levelTwoScoreEnd: "",
        levelThreeScoreBegin: "",
        levelThreeScoreEnd: "",
        levelFourScoreBegin: "",
        levelFourScoreEnd: "",
        levelFiveScoreBegin: "",
        levelFiveScoreEnd: "",
        levelSixScoreBegin: "",
        levelSixScoreEnd: "",
        levelOneRankBegin: "",
        levelOneRankEnd: "",
        levelTwoRankBegin: "",
        levelTwoRankEnd: "",
        levelThreeRankBegin: "",
        levelThreeRankEnd: "",
        levelFourRankBegin: "",
        levelFourRankEnd: "",
        levelFiveRankBegin: "",
        levelFiveRankEnd: "",
        levelSixRankBegin: "",
        levelSixRankEnd: ""
      }
    };
  },
  computed: {
    ...mapState({
      school: state => state.user.school,
      getTerms: state => state.user.term,
      subjectList: state => state.user.subjectList
    })
  },
  methods: {
    getExamSchoolTarget() {
      selectExamSchoolTarget({
        gradeId: this.grade
      }).then(res => {
        if (res.data !== null) {
          this.totalType = 2;
          this.totalObj = res.data;
          this.type=String(res.data.type) 
        } else {
          this.totalType = 1;
          this.totalObj = {
            score: "",
            levelOneScoreBegin: "",
            levelOneScoreEnd: "",
            levelTwoScoreBegin: "",
            levelTwoScoreEnd: "",
            levelThreeScoreBegin: "",
            levelThreeScoreEnd: "",
            levelFourScoreBegin: "",
            levelFourScoreEnd: "",
            levelFiveScoreBegin: "",
            levelFiveScoreEnd: "",
            levelSixScoreBegin: "",
            levelSixScoreEnd: "",
            levelOneRankBegin: "",
            levelOneRankEnd: "",
            levelTwoRankBegin: "",
            levelTwoRankEnd: "",
            levelThreeRankBegin: "",
            levelThreeRankEnd: "",
            levelFourRankBegin: "",
            levelFourRankEnd: "",
            levelFiveRankBegin: "",
            levelFiveRankEnd: "",
            levelSixRankBegin: "",
            levelSixRankEnd: ""
          };
        }
      });
      listSchoolSubjectsTarget({
        gradeId: this.grade
      }).then(res => {
        if(res.data.length!=0){
          this.subjectSetList=res.data;
          this.submitSubjectType=2;
          let list= this.subjectSetList.filter((item)=> this.subject==item.subjectId)
          if(list.length>0){
            this.subjectObj=list[0]
            this.subjectType = String(this.subjectObj.type)
          }else{
            this.subjectObj={
              score: "",
              levelOneScoreBegin: "",
              levelOneScoreEnd: "",
              levelTwoScoreBegin: "",
              levelTwoScoreEnd: "",
              levelThreeScoreBegin: "",
              levelThreeScoreEnd: "",
              levelFourScoreBegin: "",
              levelFourScoreEnd: "",
              levelFiveScoreBegin: "",
              levelFiveScoreEnd: "",
              levelSixScoreBegin: "",
              levelSixScoreEnd: "",
              levelOneRankBegin: "",
              levelOneRankEnd: "",
              levelTwoRankBegin: "",
              levelTwoRankEnd: "",
              levelThreeRankBegin: "",
              levelThreeRankEnd: "",
              levelFourRankBegin: "",
              levelFourRankEnd: "",
              levelFiveRankBegin: "",
              levelFiveRankEnd: "",
              levelSixRankBegin: "",
              levelSixRankEnd: ""
            }
          }
          
        }else{
          this.submitSubjectType=1
          this.subjectSetList=res.data;
          this.subjectObj={
            score: "",
            levelOneScoreBegin: "",
            levelOneScoreEnd: "",
            levelTwoScoreBegin: "",
            levelTwoScoreEnd: "",
            levelThreeScoreBegin: "",
            levelThreeScoreEnd: "",
            levelFourScoreBegin: "",
            levelFourScoreEnd: "",
            levelFiveScoreBegin: "",
            levelFiveScoreEnd: "",
            levelSixScoreBegin: "",
            levelSixScoreEnd: "",
            levelOneRankBegin: "",
            levelOneRankEnd: "",
            levelTwoRankBegin: "",
            levelTwoRankEnd: "",
            levelThreeRankBegin: "",
            levelThreeRankEnd: "",
            levelFourRankBegin: "",
            levelFourRankEnd: "",
            levelFiveRankBegin: "",
            levelFiveRankEnd: "",
            levelSixRankBegin: "",
            levelSixRankEnd: ""
          }
        }
      });
    },
    setSubjectScore() {
      let [obj] = this.gradeList.filter(item => item.id === this.grade);
      let subjectObj={}
      for(let item in this.subjectList){
        if(this.subjectList[item].dictdataValue==this.subject) subjectObj=this.subjectList[item]
      }
      this.submitSubjectType===1?(
        insertExamSchoolSubjectTarget({
          ...this.subjectObj,
          subjectId:subjectObj.dictdataValue,
          subjectName:subjectObj.dictdataName,
          gradeId:obj.id,
          gradeName: obj.name,
          type:this.subjectType
        }).then(res=>{
          if(res.code==="0000"){
            this.$message.success(res.message)
            setTimeout(()=>{
              this.$router.go(0)
            },300)
          }
        })
      ):(
        delete this.subjectObj.createTime,
        delete this.subjectObj.updateTime,
        delete this.subjectObj.type,
        updateExamSchoolSubjectTarget({
          ...this.subjectObj,
          type: this.subjectType,
          gradeId:obj.id,
          gradeName:obj.name
        }).then(res=>{
          if(res.code==="0000"){
            this.$message.success(res.message)
            setTimeout(()=>{
              this.$router.go(0)
            },300)
          }
        })
      )
    },
    submitTotalRanking() {
      let [obj] = this.gradeList.filter(item => item.id === this.grade);
      if(this.type==1){
        this.totalObj.flag=this.defaultSet?1:0
      }
      this.totalType === 1
        ? insertExamTarget({
            ...this.totalObj,
            gradeId: obj.id,
            gradeName: obj.name,
            type: this.type
          }).then(res => {
            this.$message.success(res.message);
            setTimeout(() => {
              this.$router.go(0);
            }, 300);
          })
        : (delete this.totalObj.createTime,
          delete this.totalObj.updateTime,
          delete this.totalObj.type,
          updateExamTarget({
            ...this.totalObj,
            type: this.type,
            gradeId: obj.id,
            gradeName: obj.name,
          }).then(res => {
            this.$message.success(res.message);
            setTimeout(() => {
              this.$router.go(0);
            }, 300);
          }));
    },
    subjectChange() {
        let list = this.subjectSetList.filter((item)=> 
          this.subject == item.subjectId
        )
        if(list.length>0){
          this.subjectObj=list[0]
          this.submitSubjectType=2
          this.subjectType = String(this.subjectObj.type)
        }else{
          this.submitSubjectType=1
          this.subjectObj={
            score: "",
            levelOneScoreBegin: "",
            levelOneScoreEnd: "",
            levelTwoScoreBegin: "",
            levelTwoScoreEnd: "",
            levelThreeScoreBegin: "",
            levelThreeScoreEnd: "",
            levelFourScoreBegin: "",
            levelFourScoreEnd: "",
            levelFiveScoreBegin: "",
            levelFiveScoreEnd: "",
            levelSixScoreBegin: "",
            levelSixScoreEnd: "",
            levelOneRankBegin: "",
            levelOneRankEnd: "",
            levelTwoRankBegin: "",
            levelTwoRankEnd: "",
            levelThreeRankBegin: "",
            levelThreeRankEnd: "",
            levelFourRankBegin: "",
            levelFourRankEnd: "",
            levelFiveRankBegin: "",
            levelFiveRankEnd: "",
            levelSixRankBegin: "",
            levelSixRankEnd: ""
          }
        }
    }
  },
  created() {
    this.gradeList = getGradeListBySessions(Number(this.school.section));
    this.grade = this.gradeList[0].id;
    this.getExamSchoolTarget();
    this.subject = this.subjectList[0].dictdataValue;
  }
};
</script>

<style lang="scss" scoped>
.disflex {
  display: flex;
  margin: 0 0 10px 0;
  align-items: center;
  span {
    width: 87px;
    text-align: right;
  }
  div {
    margin: 0 0 0 20px;
  }
}
</style>