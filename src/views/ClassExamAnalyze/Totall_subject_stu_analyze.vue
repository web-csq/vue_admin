<template>
    <div>
        <div class="loading" v-if='loadShow'>
            <Spin class="img">
                <Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
                <div>数据正在拼命加载中...</div>
            </Spin>
        </div>
        <div v-if='contLoading'>
            <!-- 全体学科学生分析---雷达图 -->
            选择班级：  <Select v-model="selClassId" style="width:200px" @on-change="selClassFn" :label-in-value='true'>
                            <Option :value="item.id" v-for="item in classList" :key="item.id">{{item.name}}</Option>
                        </Select>
            <div class="divBox" v-if='isShow'>
                <div class="tit">全体学生学科分析</div>
                <div class="chart-c">
                    <div id="d1"></div>
                </div>
            </div>
            <Row>
                <Col span="12">
                    <div>
                        <div class="tits">班级优秀学生学科分析</div>
                        <div class="chart-c" v-if="isShow2">
                            <div id="d2"></div>
                        </div>
                        <p v-if="warning2" class="p">(班级暂无优秀学生学科分析!!)</p>
                    </div>
                </Col>
                <Col span="12">
                    <div>
                        <div class="tits">班级良好学生学科分析</div>
                        <div class="chart-c" v-if='isShow3'>
                            <div id="d3"></div>
                        </div>
                        <p v-if="warning3" class="p">(班级暂无良好学生学科分析!!)</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div>
                        <div class="tits">班级及格学生学科分析</div>
                        <div class="chart-c" v-if='isShow4'>
                            <div id="d4"></div>
                        </div>
                        <p v-if="warning4" class="p">(班级暂无及格学生学科分析!!)</p>
                    </div>
                </Col>
                <Col span="12">
                    <div>
                        <div class="tits">班级学困学生学科分析</div>
                        <div class="chart-c" v-if='isShow5'>
                            <div id="d5"></div>
                        </div>
                        <p v-if="warning5" class="p">(班级暂无学困学生学科分析!!)</p>
                    </div>
                </Col>
            </Row>        
        </div>
    </div>
</template>
<script>
import { selectClassSubjectsAnalysis } from "@/api/classAnalyze"
import { listClass } from "@/api/user"
import { mapState } from 'vuex';
export default {
    name:'c_totall_subject_stu_analyze',
    data(){
        return{
            loadShow:true,
            contLoading: false,
            selClassId:0,
            classList:[],//班级列表
            type:0,
            chartData:[],//全体
            chartData2:[],//学困
            chartData3:[],//及格
            chartData4:[],//良好
            chartData5:[],//优秀
            warning2:false, //提示
            warning3:false,
            warning4:false,
            warning5:false,
            isShow:false,//图形
            isShow2:false,
            isShow3:false,
            isShow4:false,
            isShow5:false,
            dataYName:'',
        }
    },
    methods:{
        selClassFn(data){//选择班级
            this.selClassId = data.value;
            this.dataYName = data.label;
            this.loadShow = true;
            this.contLoading = false;
            this.warning2 = false;
            this.warning3 = false;
            this.warning4 = false;
            this.warning5 = false;
            this.type ++
            this.getSelectClassSubjectsAnalysis();
        },
        setChart(dom,data,dataY,heights){
            const dv = new this.$DataSet.DataView().source(data);
            dv.transform({
                type: 'fold',
                fields: [ '年级', dataY ], // 展开字段集
                key: 'user', // key字段
                value: 'score' // value字段
            });
            const chart = new this.$G2.Chart({
                container: dom,
                forceFit: true,
                width:300,
                height: heights,
                padding: [ 20, 20, 95, 20 ]
            });
            chart.clear();
            chart.source(dv, {
            score: {
                min: 0,
                max: 200
            }
            });
            chart.coord('polar', {
                radius: 0.8
            });
            chart.axis('item', {
            line: null,
            tickLine: null,
            grid: {
                lineStyle: {
                lineDash: null
                },
                hideFirstLine: false
            }
            });
            chart.axis('score', {
            line: null,
            tickLine: null,
            grid: {
                type: 'polygon',
                lineStyle: {
                lineDash: null
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)'
            }
            });
            chart.legend('user', {
                marker: 'circle',
                offset: 30
            });
            chart.line().position('item*score').color('user')
            .size(2);
            chart.point().position('item*score').color('user')
            .shape('circle')
            .size(4)
            .style({
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1
            });
            chart.render();
            if(this.type != 0){
                this.$nextTick(()=>{
                    if(document.getElementById(dom).children.length>1){
                        document.getElementById(dom).removeChild(document.getElementById(dom).firstChild)
                    }
                })
            }
        },
        async getSelectClassSubjectsAnalysis(){//班级学科整体分析
            this.chartData =[];
            this.chartData2 =[];
            this.chartData3 =[];
            this.chartData4 =[];//良好
            this.chartData5 =[];//优秀
            selectClassSubjectsAnalysis({
                examId :this.examInfo.id,
                classId :this.selClassId
            }).then( res => {
                this.loadShow = false;
                this.contLoading = true;
                // console.log(res);
                if( res.code == "0000"){
                    if(res.data.examClassSubject.length > 0){
                        this.isShow = true
                        for(let item of res.data.examClassSubject){
                            let obj ={};
                            obj.item = item.subjectName;
                            obj['年级'] = item.gradeAvgScore;
                            obj[this.dataYName] = item.avgScore;
                            this.chartData.push(obj);
                        }
                        // console.log(this.chartData);
                        this.$nextTick( ()=> {
                            this.setChart('d1',this.chartData,this.dataYName,400);
                        })
                    }else{
                        this.$Message.warning('该班级暂无全体学生分析数据');
                        this.isShow = false;
                    }
                    // 优秀
                    if(res.data.levelOneGradeAvg.length > 0){
                        if(res.data.levelOneClassAvg.length > 0){
                            this.isShow2 = true
                            let  gradeOneList = [];
                            let  classOneList = [];
                            for(let itemG of res.data.levelOneGradeAvg){//年级
                                let obj ={};
                                obj['年级'] = itemG.score;
                                obj.items = itemG.subjectName;
                                gradeOneList.push(obj)
                            }
                            for(let items of res.data.levelOneClassAvg){//班级
                                let c_obj = {};
                                c_obj[this.dataYName] = items.score;
                                c_obj.items = items.subjectName;
                                classOneList.push(c_obj);
                            }
                            // console.log('===',gradeOneList);
                            // console.log('>>>',classOneList);
                            for(let i in gradeOneList){
                                let oneData = {};
                                for(let j in classOneList){
                                    if(gradeOneList[i].items === classOneList[j].items){
                                        oneData.item = gradeOneList[i].items;
                                        oneData['年级'] = gradeOneList[i]['年级'];
                                        oneData[this.dataYName] = classOneList[j][this.dataYName];
                                        this.chartData5.push(oneData);
                                    }
                                }

                            }
                            this.$nextTick( ()=> {
                                this.setChart('d2',this.chartData5,this.dataYName,350);
                            })
                        }else{
                            this.warning2 = true;
                            this.isShow2 = false
                        }
                    }else{
                        this.warning2 = true;
                        this.isShow2 = false
                    }
                    // 良好
                    if(res.data.levelTwoGradeAvg.length > 0){
                        if(res.data.levelTwoClassAvg.length > 0){
                            this.isShow3 = true
                            let  gradeTwoList = [];
                            let  classTwoList = [];
                            for(let itemG of res.data.levelTwoGradeAvg){//年级
                                let obj ={};
                                obj['年级'] = itemG.score;
                                obj.items = itemG.subjectName;
                                gradeTwoList.push(obj)
                            }
                            for(let items of res.data.levelTwoClassAvg){//班级
                                let c_obj = {};
                                c_obj[this.dataYName] = items.score;
                                c_obj.items = items.subjectName;
                                classTwoList.push(c_obj);
                            }
                            // console.log('===',gradeTwoList);
                            // console.log('>>>',classTwoList);
                            for(let i in gradeTwoList){
                                let TwoData = {};
                                for(let j in classTwoList){
                                    if(gradeTwoList[i].items === classTwoList[j].items){
                                        TwoData.item = gradeTwoList[i].items;
                                        TwoData['年级'] = gradeTwoList[i]['年级'];
                                        TwoData[this.dataYName] = classTwoList[j][this.dataYName];
                                        this.chartData4.push(TwoData);
                                    }
                                }

                            }
                            this.$nextTick( ()=> {
                                this.setChart('d3',this.chartData4,this.dataYName,350);
                            })
                        }else{
                            this.warning3 = true;
                            this.isShow3 = false
                        }
                    }else{
                        this.warning3 = true;
                        this.isShow3 = false
                    }
                    // 及格
                    if(res.data.levelThreeGradeAvg.length > 0){
                        if(res.data.levelThreeClassAvg.length > 0){
                            this.isShow4 = true
                            let  gradeThreeList = [];
                            let  classThreeList = [];
                            for(let itemG of res.data.levelThreeGradeAvg){//年级
                                let obj ={};
                                obj['年级'] = itemG.score;
                                obj.items = itemG.subjectName;
                                gradeThreeList.push(obj)
                            }
                            for(let items of res.data.levelThreeClassAvg){//班级
                                let c_obj = {};
                                c_obj[this.dataYName] = items.score;
                                c_obj.items = items.subjectName;
                                classThreeList.push(c_obj);
                            }
                            for(let i in gradeThreeList){
                                let ThreeData = {};
                                for(let j in classThreeList){
                                    if(gradeThreeList[i].items === classThreeList[j].items){
                                        ThreeData.item = gradeThreeList[i].items;
                                        ThreeData['年级'] = gradeThreeList[i]['年级'];
                                        ThreeData[this.dataYName] = classThreeList[j][this.dataYName];
                                        this.chartData3.push(ThreeData);
                                    }
                                }

                            }
                            this.$nextTick( ()=> {
                                this.setChart('d4',this.chartData3,this.dataYName,350);
                            })
                        }else{
                            this.warning4 = true;
                            this.isShow4 = false
                        }
                    }else{
                        this.warning4 = true;
                        this.isShow4 = false
                    }  
                    // 学困
                    if(res.data.levelSixGradeAvg.length > 0){
                        if(res.data.levelSixClassAvg.length > 0){
                            this.isShow5 = true
                            let  gradeSixList = [];
                            let  classSixList = [];
                            for(let itemG of res.data.levelSixGradeAvg){//年级
                                let obj ={};
                                obj['年级'] = itemG.score;
                                obj.items = itemG.subjectName;
                                gradeSixList.push(obj)
                            }
                            for(let items of res.data.levelSixClassAvg){//班级
                                let c_obj = {};
                                c_obj[this.dataYName] = items.score;
                                c_obj.items = items.subjectName;
                                classSixList.push(c_obj);
                            }
                            for(let i in gradeSixList){
                                let SixData = {};
                                for(let j in classSixList){
                                    if(gradeSixList[i].items === classSixList[j].items){
                                        SixData.item = gradeSixList[i].items;
                                        SixData['年级'] = gradeSixList[i]['年级'];
                                        SixData[this.dataYName] = classSixList[j][this.dataYName];
                                        this.chartData2.push(SixData);
                                    }
                                }

                            }
                            this.$nextTick( ()=> {
                                this.setChart('d5',this.chartData2,this.dataYName,350);
                            })
                        }else{
                            this.warning5 = true;
                            this.isShow5 = false
                        }
                    }else{
                        this.warning5 = true;
                        this.isShow5 = false
                    }    
                } 
            })
        },
        async getClassListReq(){//班级列表
            this.classList = [];
            listClass({
                gradeId:this.examInfo.gradeId,
                schoolId:this.examInfo.schoolId
            }).then( res => {
                this.classList = res.data;
                this.selClassId = res.data[0].id;//890
                this.dataYName = res.data[0].name
                this.getSelectClassSubjectsAnalysis();
            })
        }
    },
    mounted(){
        
    },
    created(){
        this.getClassListReq();
    },
    computed:{
        ...mapState({
            examInfo:state=>state.app.analyzeExam,
            term:state=>state.user.term,
            year:state=>state.user.year,
            // classList:state=>state.app.classList
        })
    },
}
</script>
<style scoped>
    .divBox{
        margin-top: 10px;
    }
    .tit{
        font-size: 14px;
        color: #409EFF; 
        font-weight: bold;
        letter-spacing: 2px;   
    }
    .tits{
        font-size: 14px;
        color: #409EFF;
        font-weight: bold;
        letter-spacing: 2px;
        text-align: center;
    }
    .p{
        text-align: center;
        margin-top: 20px;
        color: #ff9900;
    }
</style>