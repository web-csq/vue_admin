<template>
  <div>
    <div>
      选择学科：
      <RadioGroup v-model="subject" type="button" @on-change="getJson">
        <Radio
          v-for="item in examInfo.subjectList"
          :label="item.subjectId"
          :key="item.subjectId"
        >{{item.subjectName}}</Radio>
      </RadioGroup>
    </div>
    <div class="chart-c" v-if="chartShow" style="margin:20px 0 0 0">
      <div id="d1"></div>
    </div>
    <div class="tab-container" style="margin-top:20px;padding:20rpx" v-if="chartShow">
      <div class="tab-title">学科总分准优秀学生班级报表</div>
      <Table border :columns="columns" :data="dataList"></Table>
    </div>
  </div>
</template>

<script>
import { subjectResultsClassLevelTwo } from "@/api/subjectAnalyze";
import { mapState } from "vuex";
let _this;
export default {
  name: "subject_subexec_stu_class",
  data() {
    return {
      chartShow: false,
      subject: "",
      columns: [
        {
          title: "班级",
          key: "className",
          align: "center"
        },{
          title: "学生",
          key: "userName",
          align: "center"
        },{
          title: "总分",
          key: "score",
          align: "center"
        },
        {
          title: "排名",
          key: "gradeRank",
          align: "center"
        }
      ],
      dataList: [],
      absoluteList: []
    };
  },
  methods: {
    getJson() {
      _this.dataList = [];
      subjectResultsClassLevelTwo({
        examId: this.examInfo.id,
        subjectId: this.subject
      }).then(res => {
        if (res.data.length === 0 || res.data === null) {
          this.$message.warning("暂无数据")
          this.chartShow = false;
        } else {
          this.chartShow = true;
          let absoluteData = res.data;

          for (let i in absoluteData) {
            let classnames = absoluteData[i].className;
            for (let j in absoluteData[i].sheetList) {
              let obj = {};
              let tabData = {};
              obj.Class = classnames;
              obj.Grade = absoluteData[i].sheetList[j].userName;
              obj["名次"] = absoluteData[i].sheetList[j].gradeRank;
              this.absoluteList.push(obj);
              tabData.className = absoluteData[i].className;
              tabData.userName = absoluteData[i].sheetList[j].userName;
              tabData.score = absoluteData[i].sheetList[j].score;
              tabData.gradeRank = absoluteData[i].sheetList[j].gradeRank;
              _this.dataList.push(tabData);
            }
          }
          _this.$nextTick(() => {
            _this.initChart("d1", this.absoluteList);
          });
        }
      });
    },
    initChart(dom, data) {
      const chart = new this.$G2.Chart({
        container: dom,
        forceFit: true,
        height: 500
      });
      chart.clear();
      chart.source(data, {
        "名次": {
          min: -10
        }
      });
      chart.tooltip({
        crosshairs: {
          type: "cross"
        }
      });
      chart.axis("名次", {
        grid: null,
        title: {
          textStyle: {
            fill: "#000",
            fontSize: 12,
            textAlign: "center"
          }
        }
      });
      // x轴的栅格线居中
      chart.axis("Class", {
        tickLine: null,
        subTickCount: 1, // 次刻度线个数
        subTickLine: {
          lineWidth: 1,
          stroke: "#BFBFBF",
          length: 4
        },
        grid: {
          align: "center", // 网格顶点从两个刻度中间开始
          lineStyle: {
            stroke: "#8C8C8C",
            lineWidth: 1,
            lineDash: [3, 3]
          }
        }
      });
      chart
        .point()
        .position("Class*名次")
        .color("Grade")
        .adjust("jitter")
        .shape("circle")
        .opacity(0.65)
        .size(4);
      chart.legend(false);
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
  computed: {
    ...mapState({
      examInfo: state => state.app.analyzeExam
    })
  },
  created() {
    _this = this;
    _this.subject = this.examInfo.subjectList[0].subjectId;
    this.getJson();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
</style>