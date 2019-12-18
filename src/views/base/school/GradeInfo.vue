<template>
    <div>
        <Tabs :animated="false" @on-click="tabChange">
            <TabPane label="年级管理员">
                年级管理员
                <div>
                    <Table border
                    :columns="schoolTabHead" 
                    :data="schoolAdminList"
                    :loading='loading'
                    ></Table>
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
            </TabPane>
            <TabPane label="教师信息">
                教师信息
                <div>
                    <Table border
                    :columns="teaTabHead" 
                    :data="teaList"
                    ></Table>
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
            </TabPane>
            <TabPane label="学生信息">
                学生信息
                <div>
                    <Table border
                    :columns="stuHead" 
                    :data="stuList"
                    ></Table>
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
            </TabPane>
            <TabPane label="班级列表">
                班级列表
                <div>
                    <Table border
                    :columns="classListHead" 
                    :data="classList"
                    ></Table>
                    <Page  class="setPage"
                    :total="gradePage.total" 
                    :page-size="gradePage.pageSize"
                    :current="gradePage.pageNum"
                    :page-size-opts="[10, 20, 30, 40]"
                    :placement="'top'"
                    show-sizer
                    show-total
                    show-elevator
                    @on-change="gradNextPageNum"
                    @on-page-size-change="gradNextPageSize"

                    ></Page>    
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
        name: 'gradeInfo',
        data() {
            return {
                loading:true,
                page:{
                    total:100,
                    pageSize:10,
                    pageNum:1
                },//分页
                gradePage:{
                    total:100,
                    pageSize:10,
                    pageNum:1
                },//分页
                schoolTabHead:[
                    {
                        title: '编号',
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
                        title: '账号',
                        key: 'userName',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        minWidth: 100,
                        align: 'center',
                    }
                ],
                schoolAdminList:[
                    {
                        name: '学生1',
                        id: '01',
                        userName:'xs1',
                        phone:'15302101055'
                    }, {
                        name: '学生2',
                        id: '02',
                        userName:'xs2',
                        phone:'15302101055'
                    },{
                        name: '学生3',
                        id: '03',
                        userName:'xs3',
                        phone:'15302101055'
                    } 
                ],
                classListHead:[//年级管理员信息
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '班级',
                        key: 'name',
                        minWidth: 150,
                        align: 'center',
                    }
                ],
                classList:[
                    {
                        name: '高一1班',
                        id: '01',
                        userName:'xs1',
                        phone:'15302101055'
                    } 
                ],
                teaTabHead:[//教师
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '教师姓名',
                        key: 'name',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeId',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '学科',
                        key: 'subjId',
                        minWidth: 100,
                        align: 'center',
                    }
                ],
                teaList:[
                    {
                        name: '教师1',
                        id: '01',
                        userName:'xs1',
                        subjId:'语文',
                        gradeId:'高一1班'
                    }, {
                        name: '教师12',
                        id: '02',
                        userName:'xs2',
                        subjId:'数学',
                        gradeId:'高一2班'
                    },{
                        name: '教师13',
                        id: '03',
                        userName:'xs3',
                        subjId:'政治',
                        gradeId:'高二1班'
                    } 
                ],
                stuHead:[//学生
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '学生姓名',
                        key: 'name',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeId',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '班级',
                        key: 'className',
                        minWidth: 100,
                        align: 'center',
                    }
                ],
                stuList:[
                    {
                        name: '学生1',
                        id: '01',
                        userName:'xs1',
                        gradeId:'高一',
                        className:'高一1班'
                    }, {
                        name: '教师12',
                        id: '02',
                        userName:'xs2',
                        gradeId:'高二',
                        className:'高一2班'
                    },{
                        name: '教师13',
                        id: '03',
                        userName:'xs3',
                        gradeId:'高三',
                        className:'高二1班'
                    } 
                ],

            }
        },
        methods:{
            tabChange(idx){// 返回值表示 点前点击的下标
                console.log(idx);
                if( idx == 0){
                    console.log('当前为校级管理员');
                    this.getSchoolAdminReq();
                }else if( idx == 1){
                    console.log('当前为年级管理员');
                    this.getGradeAdminReq();
                }else if( idx == 2){
                    console.log('当前为教师信息');
                    this.getTeacherReq();
                }else if( idx == 3){
                    console.log('当前为学生信息');
                    this.getStuReq();
                }
            },
            getSchoolAdminReq(){//请求校级管理员 接口
                this.loading = !this.loading;
                console.log('校级管理员');
            },
            getGradeAdminReq(){//请求年级级管理员 接口
                console.log('年级级管理员');
            },
            getTeacherReq(){//教师信息 接口
                console.log('教师信息');
            },
            getStuReq(){//学生信息 接口
                console.log('学生信息');    
            },
            nextPageNum(pageNum){//学校管理员列表--当前页面
                console.log(pageNum);
                this.page.pageNum = pageNum;
            },
            nextPageSize(pageSize){//学校管理列表--当且一页展示多少条数据
                console.log(pageSize);
                this.page.pageNum = pageSize;
            },
            gradNextPageNum(pageNum){//年级--分页
                console.log(pageNum);
                this.gradePage.pageNum = pageNum;
            },
            gradNextPageSize(pageSize){//年级--分页--当且一页展示多少条数据
                console.log(pageSize);
                this.gradePage.pageNum = pageSize;
            },  
        },
        mounted(){
            this.getSchoolAdminReq();
        }
    }
</script>

<style scoped>
    .setPage{
        text-align: center;
        margin-top: 10px;
    }
</style>