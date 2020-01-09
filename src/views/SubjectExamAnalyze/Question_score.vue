<template>
  <div>
    <div>
      选择学科：
      <RadioGroup v-model="subject" type="button" @on-change="getQuestions">
        <Radio
          v-for="item in classList"
          :label="item.subjectId"
          :key="item.subjectId"
        >{{item.subjectName}}</Radio>
      </RadioGroup>
    </div>
    <div style="margin:15px 0 0 0;">
      选择小题：
      <Select v-model="question" style="width:200px" @on-change="getJson">
        <Option
          v-for="item in questionList"
          :value="item.order"
          :key="item.order"
        >第{{ item.order }}题</Option>
      </Select>
    </div>
    <div class="chart-c" style="margin:20px 0 0 0;" v-if="chartShow">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
  </div>
</template>

<script>
import {
  listStudentAnswerSheetDetail,
  listExamSubjectAnswer
} from "@/api/subjectAnalyze";
import { mapState } from "vuex";
let _this;
export default {
  name: "subject_question_score",
  data() {
    return {
      chartShow: true,
      subject: "",
      classList: [],
      subject: "",
      questionList: [],
      question: ""
    };
  },
  computed: {
    ...mapState({
      examInfo: state => state.app.analyzeExam
    })
  },
  methods: {
    downloadImg(){
      this.$downloadChart("d1","年级班级总分分布")
    },
    getQuestions() {
      listExamSubjectAnswer({
        examId: this.examInfo.id,
        subjectId: this.subject
      }).then(res => {
        if (res.data.length !== 0) {
          _this.chartShow = true;
          _this.questionList = res.data;
          _this.question = _this.questionList[0].order;
          _this.getJson();
        } else {
          _this.chartShow = false;
          _this.questionList = [];
          _this.$message.warning("该学科暂无数据");
        }
      });
    },
    getJson() {
      listStudentAnswerSheetDetail({
        examId: this.examInfo.id,
        gradeId: this.examInfo.gradeId,
        schoolId: this.examInfo.schoolId,
        subjectId: this.subject,
        order: this.question
      }).then(res => {
        if (res.data.length === 0) {
          _this.chartShow = false;
          return _this.$message.warning("该学科暂无数据");
        }
        _this.chartShow = true;
        let list = [];
        for (let item of res.data) {
          let obj = {};
          obj["班级"] = item.className;
          obj["分数"] = item.score;
          obj.Grade = "第" + item.order + "题";
          obj.Name = item.userName;
          list.push(obj);
        }
        this.$nextTick(()=>{
          _this.initChart(list);
        })
        
      });
    },
    initChart(data) {
      const chart = new this.$G2.Chart({
        container: "d1",
        forceFit: true,
        height: 500
      });
      chart.source(data, {
        分数: {
          min: -10,
          max: 50
        }
      });
      chart.tooltip({
        crosshairs: {
          type: "cross"
        }
      });
      chart.legend({
        reversed: true // 图例项逆序显示
      });
      chart.axis("分数", {
        alias: "分数",
        grid: null,
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: "center", // 文本对齐方式
            fill: "#000" // 文本颜色
            // ...
          }
        }
      });
      // x轴的栅格线居中
      chart.axis("班级", {
        alias: "班级",
        tickLine: null,
        nice: true,
        subTickCount: 1, // 次刻度线个数
        subTickLine: {
          lineWidth: 1,
          stroke: "#BFBFBF",
          length: 10
        },
        grid: {
          align: "center", // 网格顶点从两个刻度中间开始
          lineStyle: {
            stroke: "#8C8C8C",
            lineWidth: 1,
            lineDash: [3, 3]
          }
        },
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: "center", // 文本对齐方式
            fill: "#000" // 文本颜色
            // ...
          }
        }
      });
      chart
        .point()
        .position("班级*分数")
        .color("班级")
        .adjust("jitter")
        .shape("circle")
        .opacity(0.65)
        .size(4)
        .tooltip("Name*Grade*分数");
      // chart.legend(false)
      chart.render();

      _this.$nextTick(() => {
        if (document.getElementById("d1").children.length > 1) {
          document
            .getElementById("d1")
            .removeChild(document.getElementById("d1").firstChild);
        }
      });
    }
  },
  async created() {
    _this = this;
    this.classList = this.examInfo.subjectList;
    this.subject = this.classList[0].subjectId;
    await _this.getQuestions();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>