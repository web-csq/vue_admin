<template>
    <div >
        校级报告--学科排名
        <div class="divBottom">
            <label >
                <span>年级：</span>
                <Select v-model="selGrade" style="width:100px" @on-change="selectedGrade">
                    <Option v-for="item in subjectGradeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </label> 
            <label class="s-label">
                <span>学科：</span>
                <Select v-model="selSubjected" style="width:100px" @on-change="selectedSubject">
                    <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </label>  
            <label class="s-label">
                <span>学生名次：</span>
                <Input v-model="scortVal" placeholder="Enter something..." style="width: 150px" />
            </label> 
            <Button class="s-label" type="primary" icon="ios-search" @click="search">搜索</Button>
        </div>        
        <div>
            <Table border :columns="columns6" :data="tabList"></Table>
            <Page  class="setPage"
            :total="page.total" 
            :page-size="page.pageSize"
            :current="page.pageNum"
            :page-size-opts="[10, 20, 30, 40]"
            :placement="'top'"
            show-sizer
            show-total
            show-elevator
            @on-change="nextPageNum"
            @on-page-size-change="nextPageSize"

            ></Page>
        </div>
        <!-- 上传文件 -->
        <Upload
            :format ="['xlsx','xls']"
            :data="uploadData"
            :before-upload="handleUpload"
            :on-format-error="handleFormatError"
            :on-error="handleError"
            :on-success="handleSuccess"

            action="/url">
            <Button icon="ios-cloud-upload-outline">导入成绩表</Button>
        </Upload>

    </div>
</template>

<script>
export default {
    name: 'schoolTallScore',
    data() {
        return {
            scortVal:'',
            selSubjected:'',
            selGrade:'',
            uploadData:{//上传文件所须参数
                merchantCode:'',
            },
            page:{
                pageNum:1,
                pageSize:10,
                total:100
            },
            subjectList:[
                {
                    value: '01',
                    label: '语文'
                },
                {
                    value: '02',
                    label: '数学'
                },
                {
                    value: '03',
                    label: '英语'
                },
                {
                    value: '04',
                    label: '化学'
                },
                {
                    value: '05',
                    label: '政治'
                },
            ],
            subjectGradeList:[
                {
                    id:1,
                    name:'七年级'
                },{
                    id:2,
                    name:'八年级'
                },{
                    id:3,
                    name:'九年级'
                }
            ],
            columns6: [
                {
                    title: '学号',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'name',
                    minWidth: 150,
                    align: 'center',
                },
                {
                    title: '年级排名',
                    key: 'toall',
                    minWidth: 100,
                    align: 'center',
                },
                {
                    title: '班级排名',
                    key: 'singSort',
                    minWidth: 100,
                    align: 'center',
                },
                {
                    title: '最高分',
                    key: 'maxScore',
                    minWidth: 150,
                    align: 'center',
                },
                {
                    title: '最低分',
                    key: 'minScore',
                    minWidth: 150,
                    align: 'center',
                },
                {
                    title: '平均分',
                    key: 'svgs',
                    minWidth: 100,
                    align: 'center',
                },{
                    title: '操作',
                    key: 'multi',
                    minWidth: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tabList: [
                {
                    maxScore: 149,
                    name: '学生1',
                    minScore:20,
                    svgs: 100,
                    multi:90,
                    id: '03',
                    toall:200,
                    singSort:1
                },
                {
                    maxScore: 130,
                    name: '学生2',
                    minScore:10,
                    svgs: 110,
                    multi:95,
                    id: '01',
                    toall:100,
                    singSort:7
                },
                {
                    maxScore: 120,
                    name: '学生3',
                    minScore:0,
                    svgs: 90,
                    multi:80,
                    id: '02',
                    toall:109,
                    singSort:4
                },
                {
                    maxScore: 119,
                    minScore:30,
                    svgs: 95,
                    multi:70,
                    name: '学生4',
                    id: '04',
                    toall:105,
                    singSort:5
                },
                {
                    maxScore: 129,
                    minScore:3,
                    svgs: 95,
                    multi:70,
                    name: '学生5',
                    id: '05',
                    toall:103,
                    singSort:6
                }
            ],
        }
    },
    methods:{
        remove(index){//删除
            this.tabList.splice(index,1);
        },
        selectedSubject(value){//当前选中的学科
        this.selSubjected = value;
            console.log(value);
        },
        selectedGrade(value){//获取年级列表，并得到对应的年级ID
            this.selGrade = value;
            console.log('年级ID',value);
        },
        search(){//搜索 对应的学校总分列表
            this.getSubjectData();//调用学科排名
        },
        getSubjectData(){//获取学科排名
            var obj = {};
            if(this.selSubjected != ""){
                obj.subject = this.selSubjected;
            }
            if(this.selGrade != ""){
                obj.gradeId = this.selGrade;
            }
            console.log('学科排名列表');
        },
        nextPageNum(i){//页码改变的回调，返回改变后的页码
            this.page.pageNum = i;
            // this.getSubjectData(i,this.page.pageSize);//刷新列表
            console.log('当前页',this.page.pageNum);
        },
        nextPageSize(size){//切换每页条数时的回调，返回切换后的每页条数
            this.page.pageSize = size;
            console.log('每条数据',this.page.pageSize);
            // this.getSubjectData(this.page.pageNum,size);//刷新列表
        },
        /**上传文件 */
        handleFormatError(file){//上传格式失败
            console.log(file);
            var fileSize = file.size / 1024;
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。',
                top: 50,
            })
            if(fileSize > 1000){
                this.$Notice.warning({
                    title: '文件太大',
                    desc: file.name + '文件太大，请上传小文件'
                })
            }
            
        },
       //上传前
        handleUpload (file) {
            console.log(file)
            // return false;
        },
      //上传成功
        handleSuccess(res,file){
            console.log(res);
            // if(res.status === 200){
            //     this.$Message.success("数据导入成功！")
            // }
            this.$Message.success("数据导入成功！")
        },
      //上传失败
        handleError(error,file){
            this.$Message.error("数据导入失败！")
        },

    },
    mounted(){
        this.getSubjectData();//调用学科排名
    }
}
</script>

<style scoped>
    .s-label{
        margin-left: 10px;
    }
    .setPage{
        text-align: center;
        margin-top: 10px;
    }
    .divBottom{
        margin-bottom: 10px;
    }
</style>
