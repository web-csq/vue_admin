<template>
  <div>
    <div class="chart-c" v-if="hasData">
      <div class="downImg">
        <span @click="downloadImg">保存图表图片</span>
      </div>
      <div id="d1"></div>
    </div>
    <div v-else>
      <null-data></null-data>
    </div>
  </div>
</template>

<script>
import { totalScoreRankTrack } from "@/api/stuAnalyze";
import { mapState } from "vuex"
export default {
  data() {
    return {
      hasData:true
    };
  },
  computed:{
    ...mapState({
      examInfo: state => state.app.analyzeExam,
    })
  },
  methods: {
    downloadImg(){
      this.$downloadChart("d1","持续跟踪")
    },
    fetchData(){
      totalScoreRankTrack({
        gradeId:this.examInfo.gradeId
      }).then(res=>{
        if(res.data.rankList!==null && res.data.rankList.length!=0){
          
        let list=[]
         for( let item of res.data.rankList){
          //名次类型
          let obj={}
          obj.考试名称=item.examName
          //1.名次  2.分数
          res.data.target.type===1?(obj.名次=item.gradeRank):(obj.分数=item.score)
          list.push(obj)
         }
         let range=[]
         res.data.target.type===1?(range=[res.data.target.levelTwoRankBegin,res.data.target.levelTwoRankEnd],this.initChart1(list,range,res.data.rankCount))
          :
         (range=[res.data.target.levelTwoScoreBegin,res.data.target.levelTwoScoreEnd],this.initChart2(list,range))
          console.log(range)
        }else{
          this.hasData=false
        }
        
      })
    },
    initChart2(data,range) {
      const chart = new G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500,
      });
      chart.source(data);
      chart.scale('分数', {
        min: 0,
        max:900
      });
      chart.scale('考试名称', {
        // range: [ 0, 1 ]
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.axis('考试名称', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'end', // 文本对齐方式
            fill: '#000', // 文本颜色
          }
        }
      });
      chart.axis('分数', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'end', // 文本对齐方式
            fill: '#000', // 文本颜色
          }
        }
      });
      chart.guide().line({
        start: ['start', range[0]],
        end: ['end', range[0]],
        lineStyle: {
          stroke: '#f00', // 线的颜色
          lineDash: [ 0, 5, 4 ], // 虚线的设置
          lineWidth: 2 // 线的宽度
        }, // 图形样式配置
        text: {
          content: '',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'end',
          },
        },
      });
       chart.guide().line({
        start: ['start', range[1]],
        end: ['end', range[1]],
        lineStyle: {
          stroke: '#f00', // 线的颜色
          lineDash: [ 0, 5, 4 ], // 虚线的设置
          lineWidth: 2 // 线的宽度
        }, // 图形样式配置
        text: {
          content: '准优秀分数区间',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'start',
            fill:"#1890FF"
          },
        },
      });
      chart.guide().line({
        start: ["start", range[0]],
        end: ["start", range[1]],
        lineStyle: {
          stroke: '#1890FF', // 线的颜色
          lineDash: [ 120, 1, 1 ], // 虚线的设置
          lineWidth: 1, // 线的宽度
          endArrow:true,
          startArrow:true
        }, // 图形样式配置
        text: {
          content: '',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'end',
          },
        },
      });
      chart.line().position('考试名称*分数');
      chart.point().position('考试名称*分数')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });

      chart.render();
      this.$nextTick(() => {
        if (document.getElementById("d1").children.length > 1) {
          document
            .getElementById("d1")
            .removeChild(document.getElementById("d1").firstChild);
        }
      });
    },
    initChart1(data,range,count) {
      const chart = new G2.Chart({
        container: 'd1',
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.scale('名次', {
        min: 0,
        max:count
      });
      chart.axis('名次', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'end', // 文本对齐方式
            fill: '#000', // 文本颜色
          }
        },
      });
      chart.axis('考试名称', {
        title: {
          textStyle: {
            fontSize: 12, // 文本大小
            textAlign: 'end', // 文本对齐方式
            fill: '#000', // 文本颜色
          }
        },
      });
      chart.scale('考试名称', {
        // range: [ 0, 1 ]
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.guide().line({
        start: ['start', range[0]],
        end: ['end', range[0]],
        lineStyle: {
          stroke: '#f00', // 线的颜色
          lineDash: [ 0, 5, 4 ], // 虚线的设置
          lineWidth: 2 // 线的宽度
        }, // 图形样式配置
        text: {
          content: '',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'end',
          },
        },
      });
       chart.guide().line({
        start: ['start', range[1]],
        end: ['end', range[1]],
        lineStyle: {
          stroke: '#f00', // 线的颜色
          lineDash: [ 0, 5, 4 ], // 虚线的设置
          lineWidth: 2 // 线的宽度
        }, // 图形样式配置
        text: {
          content: '准优秀名次区间',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'start',
            fill:"#1890FF"
          },
        },
      });
      chart.guide().line({
        start: ['start', range[0]],
        end: ['start', range[1]],
        lineStyle: {
          stroke: '#1890FF', // 线的颜色
          lineDash: [ 1, 0, 0 ], // 虚线的设置
          lineWidth: 1, // 线的宽度
          endArrow:true,
          startArrow:true,
          arrowRadius:1
        }, // 图形样式配置
        text: {
          content: '',
          position: 'start',
          fontSize:"18px",
          style: {
            textAlign: 'end',
            fill:"#1890FF"
          },
        },
      });
      chart.line().position('考试名称*名次');
      chart.point().position('考试名称*名次')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
      this.$nextTick(() => {
        if (document.getElementById("d1").children.length > 1) {
          document
            .getElementById("d1")
            .removeChild(document.getElementById("d1").firstChild);
        }
      });
    }
  },
  created(){
    this.fetchData()
  }
};
</script>

<style lang="scss" scoped>
</style>