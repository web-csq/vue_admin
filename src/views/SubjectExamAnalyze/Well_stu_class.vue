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
    <div class="chart-c" v-if="chartShow">
      <div id="d1"></div>
    </div>
    <div class="tab-container" v-show="chartShow">
      <div class="tab-title">学科总分良好学生班级报表</div>
      <Table border :columns="columns" :data="data" :loading="loading"></Table>
    </div>
  </div>
</template>

<script>
import { subjectResultsClassLevelThree } from "@/api/subjectAnalyze";
import { mapState } from "vuex";
let _this;
export default {
  name: "subject_well_stu_class",
  data() {
    return {
      chartShow: false,
      subject: "",
      loading: true,
      columns: [
        {
          title: "班级",
          key: "className",
          align: "center"
        },{
          title: "学生",
          key: "userName",
          align: "center"
        },
        {
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
      data: [],
      chartList: [],
      type: 0
    };
  },
  methods: {
    getJson() {
      subjectResultsClassLevelThree({
        examId: this.examInfo.id,
        subjectId: this.subject
      }).then(res => {
        this.loading = false;
        if(res.code==="0000"){
        if (res.data === null || res.data.length === 0) {
          this.chartShow = false;
          this.$message.warning("暂无数据")

        } else {
          this.chartShow = true;
          this.data = [];
          for (let item of res.data) {
            let obj = {};
            obj.country = item.className;
            obj["数量"] = item.sheetList.length;
            this.chartList.push(obj);
            for (let itemList of item.sheetList) {
              let tabObj = {};
              tabObj.className = item.className;
              tabObj.userName = itemList.userName;
              tabObj.gradeRank = itemList.gradeRank;
              tabObj.score = itemList.score;
              this.data.push(tabObj);
            }
          }
          _this.$nextTick(() => {
            this.setLineChart(this.chartList);
          });
        }}
      });
    },
    setLineChart(data) {
      const chart = new G2.Chart({
        container: "d1",
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.axis("country", {
        label: {
          offset: 12
        }
      });
      chart.coord().transpose();
      chart.interval().position("country*数量");
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