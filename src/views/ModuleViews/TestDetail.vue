<template>
  <div style="padding:0 20px" v-if="!tableLoading">
    <div style="display:flex;align-items:center;">
      <Button type="primary" size="small" @click="$router.push('/testmanager')">返回列表</Button>
    </div>
    <div>
      <div class="exam-t">
        <span style="margin:0">
          名称 ：
          <strong>{{examInfo.name}}</strong>
        </span>
        <span>
          当前状态：
          <span
            style="color:#f30215"
          >{{examInfo.status===0 || examInfo.status===null ?"未导入成绩":(examInfo.status===1?"未分析":"已分析")}}</span>
          <span style="font-size:14px;margin:0 0 0 10px">(注：导入成绩后方可生成报表)</span>
        </span>
        <span style="margin-left:auto" class="cent">
          <Button type="primary" size="small" :loading="analyzeButton" @click="examAnalyze">生成报表</Button>
        </span>
      </div>
    </div>

    <div class="tab-c">
      <Table border :columns="columns" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="lead(index)">导入分数</Button>
          <Button
            type="error"
            size="small"
            style="margin-right: 5px"
            @click="setSubsection(row)"
          >设置分段</Button>
        </template>
      </Table>
    </div>

    <Modal
      title="导入成绩"
      :loading="tableLoading"
      :scrollable="false"
      v-model="modalShow"
      :mask-closable="false"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="modalShow=false"
      :closable="false"
    >
      <div class="con" style="margin:0">
        <div @click="download(1)">总分表模板下载</div>
        <div>小题得分表模板下载</div>
        <div>答案表模板下载</div>
      </div>
      <div style="margin:10px 0 0 0">
        <Upload
          ref="upload2"
          :on-success="successUp"
          :with-credentials="true"
          :format="['xlsx','xls']"
          accept=".xlsx, xls"
          name="file"
          :data="{examId:examId,subjectId:tableData[subjecIndex].subjectId,subjectName:tableData[subjecIndex].subjectName}"
          :multiple="true"
          :action="baseURL+'/exam/importSubjectScoreByExcel'"
        >
          <Button type="primary" size="small" style="margin-right: 5px">导入学科总分</Button>
        </Upload>
        <Upload
          ref="upload3"
          :on-success="successUp"
          :with-credentials="true"
          :format="['xlsx','xls']"
          accept=".xlsx, xls"
          :data="{examId:examId,subjectId:tableData[subjecIndex].subjectId,subjectName:tableData[subjecIndex].subjectName}"
          :action="baseURL+'/exam/importSubjectItemScoreByExcel'"
        >
          <Button type="primary" size="small" style="margin-right: 5px">导入小题分数</Button>
        </Upload>
      </div>
    </Modal>
    <div class="upload">
      <div style="float:right">
        <Button type="error" size="small" style="margin-right: 5px" @click="setTotalsection()">设置分段</Button>
      </div>
      
      <div style="float:right">
        <Upload
        ref="upload1"
        :on-success="successUp"
        :with-credentials="true"
        :format="['xlsx','xls']"
        name="file"
        :data="{examId:examId}"
        accept=".xlsx, xls"
        :multiple="true"
        :action="baseURL+'/exam/importExamScoreByExcel'"
        >
          <Button type="primary" size="small" style="margin-right: 5px">导入总成绩</Button>
        </Upload>
      </div>
      
      
    </div>

    <!-- 设置学科分段弹窗 -->
    <el-dialog title="设置分段" :visible.sync="subjectVisible">
      <div class="disflex">
        <span>总分：</span>
        <Input type="number" v-model.trim="subjectObj.score" :maxlength="3" clearable style="width:80px;margin:0" />
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="名次" ></el-radio-button>
          <el-radio-button label="分数"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="type==='分数'">
        <div class="disflex">
          <span>优秀率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelOnePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelOnePercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>准优秀率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelTwoPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelTwoPercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>良好率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelThreePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelThreePercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>准良好率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelFourPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelFourPercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>及格率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelFivePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelFivePercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>学困率：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelSixPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(subjectObj.levelSixPercent*subjectObj.score)*0.01)}}分</div>
        </div>
        <div style="text-align:right">
          <Button type="primary" size="default" style="margin:0 20px 0 0" @click="setSubject">提交</Button>
        </div>
      </div>
      <div v-if="type==='名次'">
        <div class="disflex">
          <span>优秀名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelOneRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelOneRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>准优秀名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelTwoRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelTwoRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>良好名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelThreeRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelThreeRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>准良好名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelFourRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelFourRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>及格名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelFiveRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelFiveRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>学困名次：</span>
          <Input type="number" clearable v-model.trim="subjectObj.levelSixRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="subjectObj.levelSixRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div style="text-align:right">
          <Button type="primary" size="default" style="margin:0 20px 0 0" @click="submitSubRanking">提交</Button>
        </div>
      </div>
    </el-dialog>

    <!-- 设置考试分段弹窗 -->
    <el-dialog title="设置分段" :visible.sync="dialogFormVisible">
      <div class="disflex">
        <span>总分：</span>
        <Input type="number" v-model.trim="totalObj.score" :maxlength="3" clearable style="width:80px;margin:0" />
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="名次" ></el-radio-button>
          <el-radio-button label="分数"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="type==='分数'">
        <div class="disflex">
          <span>优秀率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelOnePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelOnePercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>准优秀率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelTwoPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelTwoPercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>良好率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelThreePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelThreePercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>准良好率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelFourPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelFourPercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>及格率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelFivePercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelFivePercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div class="disflex">
          <span>学困率：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelSixPercent" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />%
          <div>分数线： {{parseInt(parseInt(totalObj.levelSixPercent*totalObj.score)*0.01)}}分</div>
        </div>
        <div style="text-align:right">
          <Button type="primary" size="default" style="margin:0 20px 0 0" @click="set">提交</Button>
        </div>
      </div>
      <div v-if="type==='名次'">
        <div class="disflex">
          <span>优秀名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelOneRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelOneRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>准优秀名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelTwoRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelTwoRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>良好名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelThreeRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelThreeRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>准良好名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelFourRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelFourRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>及格名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelFiveRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelFiveRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div class="disflex">
          <span>学困名次：</span>
          <Input type="number" clearable v-model.trim="totalObj.levelSixRankBegin" :maxlength="2" style="width:80px;margin:0 13px 0 0;" />
          —　
          <Input type="number" clearable v-model.trim="totalObj.levelSixRankEnd" :maxlength="2" style="width:80px;margin:0 5px 0 0;" />
        </div>
        <div style="text-align:right">
          <Button type="primary" size="default" style="margin:0 20px 0 0" @click="submitTotalRanking">提交</Button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  download,
  listExamSubject,
  analysisSubjects,
  selectExamSchoolTarget,
  insertExamTarget,
  updateExamTarget,
  listSchoolSubjectsTarget,
  insertExamSchoolSubjectTarget,
  updateExamSchoolSubjectTarget
} from "@/api/test";
let _this;
export default {
  name: "testdetail",
  data() {
    return {
      subjectVisible:false,
      type:"名次",
      totalStatus:0,
      sebsectionId:0,
      subjectStatus:0,
      totalObj:{
        id:0,
        score: "",
        levelOnePercent: "",
        levelTwoPercent: "",
        levelThreePercent: "",
        levelFourPercent: "",
        levelFivePercent: "",
        levelSixPercent: "",
      },
      subjectObj:{
        id:0,
        score: "",
        levelOnePercent: "",
        levelTwoPercent: "",
        levelThreePercent: "",
        levelFourPercent: "",
        levelFivePercent: "",
        levelSixPercent: "",
      },
      listTarget:[],
      examId: "",
      baseURL: "",
      analyzeButton: false,
      tableLoading: true,
      subjecIndex: 0,
      examInfo: {},
      subject: {},
      modalShow: false,
      dialogFormVisible: false,
      columns: [
        {
          title: "科目",
          key: "subjectName"
        },
        {
          title: "导入人数",
          key: "importNumber"
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          key: "action"
        }
      ],
      tableData: []
    };
  },
  computed: {},
  methods: {
    updateTotalRanking(){
      if (!this.totalObj.score) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOneRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOneRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreeRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreeRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFiveRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFiveRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixRankEnd) return this.$message.warning("请完善数据");
      updateExamTarget({
        type:1,
        id:this.totalObj.id,
        examId:this.examId,
        score:this.totalObj.score,
        levelOneRankBegin:this.totalObj.levelOneRankBegin,
        levelOneRankEnd:this.totalObj.levelOneRankEnd,
        levelTwoRankBegin:this.totalObj.levelTwoRankBegin,
        levelTwoRankEnd:this.totalObj.levelTwoRankEnd,
        levelThreeRankBegin:this.totalObj.levelThreeRankBegin,
        levelThreeRankEnd:this.totalObj.levelThreeRankEnd,
        levelFourRankBegin:this.totalObj.levelFourRankBegin,
        levelFourRankEnd:this.totalObj.levelFourRankEnd,
        levelFiveRankBegin:this.totalObj.levelFiveRankBegin,
        levelFiveRankEnd:this.totalObj.levelFiveRankEnd,
        levelSixRankBegin:this.totalObj.levelSixRankBegin,
        levelSixRankEnd:this.totalObj.levelSixRankEnd
      }).then(res=>{
        this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
      })
    },
    insertTotalRanking(){
      if (!this.totalObj.score) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOneRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOneRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreeRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreeRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFiveRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFiveRankEnd) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixRankBegin) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixRankEnd) return this.$message.warning("请完善数据");
      insertExamTarget({
        type:1,
        examId:this.examId,
        score:this.totalObj.score,
        levelOneRankBegin:this.totalObj.levelOneRankBegin,
        levelOneRankEnd:this.totalObj.levelOneRankEnd,
        levelTwoRankBegin:this.totalObj.levelTwoRankBegin,
        levelTwoRankEnd:this.totalObj.levelTwoRankEnd,
        levelThreeRankBegin:this.totalObj.levelThreeRankBegin,
        levelThreeRankEnd:this.totalObj.levelThreeRankEnd,
        levelFourRankBegin:this.totalObj.levelFourRankBegin,
        levelFourRankEnd:this.totalObj.levelFourRankEnd,
        levelFiveRankBegin:this.totalObj.levelFiveRankBegin,
        levelFiveRankEnd:this.totalObj.levelFiveRankEnd,
        levelSixRankBegin:this.totalObj.levelSixRankBegin,
        levelSixRankEnd:this.totalObj.levelSixRankEnd
      }).then(res=>{
        this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
        
      })

    },
    submitTotalRanking(){
      if(_this.totalStatus===0){
        this.insertTotalRanking()
      }else{
        this.updateTotalRanking()
      }
    },
    insertSubRanking(){
      if (!this.subjectObj.score) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOneRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOneRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreeRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreeRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFiveRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFiveRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixRankEnd) return this.$message.warning("请完善数据");
      insertExamSchoolSubjectTarget({
        type:1,
        examId:this.examId,
        subjectId:this.subjectObj.subjectId,
        subjectName:this.subjectObj.subjectName,
        score:this.subjectObj.score,
        levelOneRankBegin:this.subjectObj.levelOneRankBegin,
        levelOneRankEnd:this.subjectObj.levelOneRankEnd,
        levelTwoRankBegin:this.subjectObj.levelTwoRankBegin,
        levelTwoRankEnd:this.subjectObj.levelTwoRankEnd,
        levelThreeRankBegin:this.subjectObj.levelThreeRankBegin,
        levelThreeRankEnd:this.subjectObj.levelThreeRankEnd,
        levelFourRankBegin:this.subjectObj.levelFourRankBegin,
        levelFourRankEnd:this.subjectObj.levelFourRankEnd,
        levelFiveRankBegin:this.subjectObj.levelFiveRankBegin,
        levelFiveRankEnd:this.subjectObj.levelFiveRankEnd,
        levelSixRankBegin:this.subjectObj.levelSixRankBegin,
        levelSixRankEnd:this.subjectObj.levelSixRankEnd
      }).then(res=>{
        this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
      })
    },
    updateSubRanking(){
      if (!this.subjectObj.score) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOneRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOneRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreeRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreeRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFiveRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFiveRankEnd) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixRankBegin) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixRankEnd) return this.$message.warning("请完善数据");
      updateExamSchoolSubjectTarget({
        type:1,
        examId:this.examId,
        id:this.subjectObj.id,
        score:this.totalObj.score,
        levelOneRankBegin:this.subjectObj.levelOneRankBegin,
        levelOneRankEnd:this.subjectObj.levelOneRankEnd,
        levelTwoRankBegin:this.subjectObj.levelTwoRankBegin,
        levelTwoRankEnd:this.subjectObj.levelTwoRankEnd,
        levelThreeRankBegin:this.subjectObj.levelThreeRankBegin,
        levelThreeRankEnd:this.subjectObj.levelThreeRankEnd,
        levelFourRankBegin:this.subjectObj.levelFourRankBegin,
        levelFourRankEnd:this.subjectObj.levelFourRankEnd,
        levelFiveRankBegin:this.subjectObj.levelFiveRankBegin,
        levelFiveRankEnd:this.subjectObj.levelFiveRankEnd,
        levelSixRankBegin:this.subjectObj.levelSixRankBegin,
        levelSixRankEnd:this.subjectObj.levelSixRankEnd
      }).then(res=>{
        this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
      })
    },
    submitSubRanking(){
      if(_this.subjectStatus===0){
        this.insertSubRanking()
      }else{
        this.updateSubRanking()
      }
    },
    insertTotal(){
      if (!this.totalObj.score) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOnePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoPercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourPercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFivePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixPercent) return this.$message.warning("请完善数据");
      insertExamTarget({
        type:2,
        examId:this.examId,
        score:this.totalObj.score,
        levelOnePercent:this.totalObj.levelOnePercent,
        levelOneScore:parseInt(parseInt(this.totalObj.levelOnePercent*this.totalObj.score)*0.01),
        levelTwoPercent:this.totalObj.levelTwoPercent,
        levelTwoScore:parseInt(parseInt(this.totalObj.levelTwoPercent*this.totalObj.score)*0.01),
        levelThreePercent:this.totalObj.levelThreePercent,
        levelThreeScore:parseInt(parseInt(this.totalObj.levelThreePercent*this.totalObj.score)*0.01),
        levelFourPercent:this.totalObj.levelFourPercent,
        levelFourScore:parseInt(parseInt(this.totalObj.levelFourPercent*this.totalObj.score)*0.01),
        levelFivePercent:this.totalObj.levelFivePercent,
        levelFiveScore:parseInt(parseInt(this.totalObj.levelFivePercent*this.totalObj.score)*0.01),
        levelSixPercent:this.totalObj.levelSixPercent,
        levelSixScore:parseInt(parseInt(this.totalObj.levelSixPercent*this.totalObj.score)*0.01),
      }).then(res=>{
        if(res.code==="0000"){
          this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
        }
      })
    },
    updateTotal(){
      if (!this.totalObj.score) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelOnePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelTwoPercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelThreePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFourPercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelFivePercent) return this.$message.warning("请完善数据");
      if (!this.totalObj.levelSixPercent) return this.$message.warning("请完善数据");
      updateExamTarget({
        type:2,
        examId:this.examId,
        score:this.totalObj.score,
        id:this.totalObj.id,
        levelOnePercent:this.totalObj.levelOnePercent,
        levelOneScore:parseInt(parseInt(this.totalObj.levelOnePercent*this.totalObj.score)*0.01),
        levelTwoPercent:this.totalObj.levelTwoPercent,
        levelTwoScore:parseInt(parseInt(this.totalObj.levelTwoPercent*this.totalObj.score)*0.01),
        levelThreePercent:this.totalObj.levelThreePercent,
        levelThreeScore:parseInt(parseInt(this.totalObj.levelThreePercent*this.totalObj.score)*0.01),
        levelFourPercent:this.totalObj.levelFourPercent,
        levelFourScore:parseInt(parseInt(this.totalObj.levelFourPercent*this.totalObj.score)*0.01),
        levelFivePercent:this.totalObj.levelFivePercent,
        levelFiveScore:parseInt(parseInt(this.totalObj.levelFivePercent*this.totalObj.score)*0.01),
        levelSixPercent:this.totalObj.levelSixPercent,
        levelSixScore:parseInt(parseInt(this.totalObj.levelSixPercent*this.totalObj.score)*0.01),
      }).then(res=>{

        this.$message.success(res.message);
        setTimeout(() => {
          _this.$router.go(0);
        }, 800);
      })
    },
    set() {
      if(_this.totalStatus===0){
        this.insertTotal()
      }else{
        this.updateTotal()
      }
    },
    setSub(){
      if (!this.subjectObj.score) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOnePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoPercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourPercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFivePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixPercent) return this.$message.warning("请完善数据");
      insertExamSchoolSubjectTarget({
        type:2,
        examId:this.examId,
        subjectId:this.subjectObj.subjectId,
        subjectName:this.subjectObj.subjectName,
        score:this.subjectObj.score,
        levelOnePercent:this.subjectObj.levelOnePercent,
        levelOneScore:parseInt(parseInt(this.subjectObj.levelOnePercent*this.subjectObj.score)*0.01),
        levelTwoPercent:this.subjectObj.levelTwoPercent,
        levelTwoScore:parseInt(parseInt(this.subjectObj.levelTwoPercent*this.subjectObj.score)*0.01),
        levelThreePercent:this.subjectObj.levelThreePercent,
        levelThreeScore:parseInt(parseInt(this.subjectObj.levelThreePercent*this.subjectObj.score)*0.01),
        levelFourPercent:this.subjectObj.levelFourPercent,
        levelFourScore:parseInt(parseInt(this.subjectObj.levelFourPercent*this.subjectObj.score)*0.01),
        levelFivePercent:this.subjectObj.levelFivePercent,
        levelFiveScore:parseInt(parseInt(this.subjectObj.levelFivePercent*this.subjectObj.score)*0.01),
        levelSixPercent:this.subjectObj.levelSixPercent,
        levelSixScore:parseInt(parseInt(this.subjectObj.levelSixPercent*this.subjectObj.score)*0.01),
      }).then(res=>{
        if(res.code==="0000"){
          this.$message.success(res.message);
          setTimeout(() => {
            _this.$router.go(0);
          }, 800);
        }
      })
    },
    updateSub(){
      if (!this.subjectObj.score) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelOnePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelTwoPercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelThreePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFourPercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelFivePercent) return this.$message.warning("请完善数据");
      if (!this.subjectObj.levelSixPercent) return this.$message.warning("请完善数据");
      updateExamSchoolSubjectTarget({
        type:2,
        examId:this.examId,
        id:this.subjectObj.id,
        subjectId:this.subjectObj.subjectId,
        subjectName:this.subjectObj.subjectName,
        score:this.subjectObj.score,
        levelOnePercent:this.subjectObj.levelOnePercent,
        levelOneScore:parseInt(parseInt(this.subjectObj.levelOnePercent*this.subjectObj.score)*0.01),
        levelTwoPercent:this.subjectObj.levelTwoPercent,
        levelTwoScore:parseInt(parseInt(this.subjectObj.levelTwoPercent*this.subjectObj.score)*0.01),
        levelThreePercent:this.subjectObj.levelThreePercent,
        levelThreeScore:parseInt(parseInt(this.subjectObj.levelThreePercent*this.subjectObj.score)*0.01),
        levelFourPercent:this.subjectObj.levelFourPercent,
        levelFourScore:parseInt(parseInt(this.subjectObj.levelFourPercent*this.subjectObj.score)*0.01),
        levelFivePercent:this.subjectObj.levelFivePercent,
        levelFiveScore:parseInt(parseInt(this.subjectObj.levelFivePercent*this.subjectObj.score)*0.01),
        levelSixPercent:this.subjectObj.levelSixPercent,
        levelSixScore:parseInt(parseInt(this.subjectObj.levelSixPercent*this.subjectObj.score)*0.01),
      }).then(res=>{
        this.$message.success(res.message);
        setTimeout(() => {
          _this.$router.go(0);
        }, 800);
      })
    },
    setSubject(){
      if(this.subjectStatus===0){
        this.setSub()
      }else{
        this.updateSub()
      }
    },
    setSubsection(row) {
      this.subjectVisible = true;
      if(_this.listTarget.length!==0){
        for(let item of _this.listTarget){
          if(item.subjectId===row.subjectId){
            this.subjectObj=item
            this.subjectStatus=1
            return
          }else{
            this.subjectObj={
              subjectId:row.subjectId,
              subjectName:row.subjectName,
              score: "",
              levelOnePercent: "",
              levelTwoPercent: "",
              levelThreePercent: "",
              levelFourPercent: "",
              levelFivePercent: "",
              levelSixPercent: "",
              levelOneRankBegin:"",
              levelOneRankEnd:"",
              levelTwoRankBegin:"",
              levelTwoRankEnd:"",
              levelThreeRankBegin:"",
              levelThreeRankEnd:"",
              levelFourRankBegin:"",
              levelFourRankEnd:"",
              levelFiveRankBegin:"",
              levelFiveRankEnd:"",
              levelSixRankBegin:"",
              levelSixRankEnd:""
            }
            this.subjectStatus=0
          }
        }
      }else{
        this.subjectObj={
          subjectId:row.subjectId,
          subjectName:row.subjectName,
          score: "",
          levelOnePercent: "",
          levelTwoPercent: "",
          levelThreePercent: "",
          levelFourPercent: "",
          levelFivePercent: "",
          levelSixPercent: "",
          levelOneRankBegin:"",
          levelOneRankEnd:"",
          levelTwoRankBegin:"",
          levelTwoRankEnd:"",
          levelThreeRankBegin:"",
          levelThreeRankEnd:"",
          levelFourRankBegin:"",
          levelFourRankEnd:"",
          levelFiveRankBegin:"",
          levelFiveRankEnd:"",
          levelSixRankBegin:"",
          levelSixRankEnd:""
        }
      }
    },
    setTotalsection(){
      this.dialogFormVisible = true;
    },
    examAnalyze() {
      this.analyzeButton = true;
      analysisSubjects({
        examId: this.examInfo.id
      }).then(res => {
        if (res.code === "0000") {
          _this.$message.success(res.message);
          _this.$router.push({
            name: "analyzelist"
          });
        }
        _this.analyzeButton = false;
      });
    },
    successUp(res) {
      if (res.code === "0000") {
        this.$message.success(res.message);
        setTimeout(() => {
          _this.$router.go(0);
        }, 800);
      } else {
        this.$message.error(res.message);
      }
    },
    lead(index) {
      this.modalShow = true;
      this.subjecIndex = index;
    },
    download(type) {
      switch (type) {
        case 1:
          download({
            fileName: "总分表模板下载.xlsx"
          }).then(res => {
            console.log(res);
          });
      }
    }
  },
  created() {
    _this = this;
    _this.baseURL = process.env.VUE_APP_URL;
    this.examId = window.sessionStorage.examId;
    listExamSubject({
      examId: this.examId
    }).then(res => {
      _this.tableData = res.data.subjectList;
      for (let item of _this.tableData) {
        if (item.status === 0 || item.status === null) {
          item.status = "未上传";
        } else if (item.status === 1) {
          item.status = "已导入成绩(未分析)";
        } else if (item.status === 2) {
          item.status = "已分析";
        }
      }
      _this.examInfo = res.data.exam;
      _this.tableLoading = false;
    });
    selectExamSchoolTarget({
      examId:this.examId
    }).then(res=>{
      if(res.data!==null){
        this.totalObj=res.data
        this.totalStatus=1
        this.sebsectionId=Number(res.data.id)
      }
    })
    listSchoolSubjectsTarget({
      examId:this.examId
    }).then(res=>{
      if(res.data.length!==0){
        _this.listTarget=res.data
        _this.subjectStatus=1
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.con {
  display: flex;
  align-items: center;
  margin: 0 0 0 200px;
  div:first-child {
    margin-left: 0 !important;
  }
  div {
    margin: 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 2px 10px;
    cursor: pointer;
  }
}
.exam-t {
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
  font-size: 16px;
  > span {
    margin: 0 0 0 20px;
  }
}
.tab-c >>> .ivu-upload {
  display: inline-block;
}
.upload {
  margin: 20px 0 0 0;
  text-align: right;
  overflow: hidden;
  > div {
    display: inline-block;
  }
}
.disflex {
  display: flex;
  margin: 0 0 10px 0;
  align-items: center;
  span {
    width: 100px;
    text-align: right;
  }
  div {
    margin: 0 0 0 20px;
  }
}
</style>