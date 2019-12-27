<template>
    <div>
        <Tabs :animated="false" @on-click="tabChange">
            <TabPane label="校级管理员">
                <!-- 校级管理员 :page-size-opts="[10, 20, 30, 40]" show-sizer-->
                <div>
                    <Table border
                    :columns="schoolTabHead" 
                    :data="schoolAdminList"
                    >
                    <!-- 操作 -->
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="info" size="small"  @click="resetPwd(row,index)">重置密码</Button>
                        </template>
                    </Table>
                    <Page  class="setPage"
                    :total="page.total" 
                    :page-size="page.pageSize"
                    :current="page.pageNum"
                    
                    :placement="'top'"
                    
                    show-total
                    show-elevator
                    @on-change="nextPageNum"
                    @on-page-size-change="nextPageSize"

                    ></Page>
                </div>
            </TabPane>
            <TabPane label="年级管理员">
                <!-- 年级管理员 :page-size-opts="[10, 20, 30, 40]" show-sizer-->
                <div>
                    <Table border
                    :columns="geadeTabHead" 
                    :data="gradeAdminList"
                    ></Table>
                    <Page  class="setPage"
                    :total="gradePage.total" 
                    :page-size="gradePage.pageSize"
                    :current="gradePage.pageNum"
                    
                    :placement="'top'"
                    
                    show-total
                    show-elevator
                    @on-change="gradNextPageNum"
                    @on-page-size-change="gradNextPageSize"

                    ></Page>    
                </div>
            </TabPane>
            <TabPane label="教师信息">
                <!-- 教师信息 :page-size-opts="[10, 20, 30, 40]" show-sizer-->

                <div>
                    <Table border
                    :columns="teaTabHead" 
                    :data="teaList"
                    ></Table>
                    <Page  class="setPage"
                    :total="teaPage.total" 
                    :page-size="teaPage.pageSize"
                    :current="teaPage.pageNum"
                    
                    :placement="'top'"
                    
                    show-total
                    show-elevator
                    @on-change="teaNextPageNum"
                    @on-page-size-change="teaNextPageSize"

                    ></Page>    
                </div>
            </TabPane>
            <TabPane label="学生信息">
                <!-- 学生信息 :page-size-opts="[10, 20, 30, 40]" show-sizer-->
                <div>
                    <Table border
                    :columns="stuHead" 
                    :data="stuList"
                    ></Table>
                    <Page  class="setPage"
                    :total="stuPage.total" 
                    :page-size="stuPage.pageSize"
                    :current="stuPage.pageNum"
                    
                    :placement="'top'"
                    
                    show-total
                    show-elevator
                    @on-change="stuNextPageNum"
                    @on-page-size-change="stuNextPageSize"

                    ></Page>    
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import { listUserByRoleIdAndPage, enableOrDisableUsers, resetPassword } from "@/api/base"
    export default {
        name: 'schoolInfo',
        data() {
            return {
                loading:true,
                schoolId:0,
                page:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },//分页
                gradePage:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },//分页
                teaPage:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },
                stuPage:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },
                schoolTabHead:[
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '姓名',
                        key: 'truename',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '账号',
                        key: 'username',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '账号状态',
                        key: 'enabled',
                        align: 'center',
                        minWidth:  70,
                        render:(h, params) => {
                            return h('div', [
                                h('i-switch', { //数据库1是已处理，0是未处理
                                    props: {
                                        type: 'primary',
                                        value: params.row.enabled === true  //控制开关的打开或关闭状态，官网文档属性是value
                                    },
                                    scopedSlots:{
                                        open:() => h('span','开启'),
                                        close:() => h('span','禁用'),
                                    },
                                    style: {
                                        marginRight: '5px',
                                        width:'53px'
                                    },
                                    on: {
                                        'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                                            // console.log(value);
                                            // console.log(params);
                                            this.switch(value,params.row.id) //params.index是拿到table的行序列，可以取到对应的表格值
                                        }
                                    }
                                }, )
                            ]);
                        }
                    },
                    {
                        title:'操作',
                        slot:'action',
                        width: 100,
                        align:'center'
                    }
                ],
                schoolAdminList:[],
                geadeTabHead:[//年级管理员信息
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '姓名',
                        key: 'truename',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '账号',
                        key: 'username',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeName',
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
                gradeAdminList:[],
                teaTabHead:[//教师
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '教师姓名',
                        key: 'truename',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '账号',
                        key: 'username',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeName',
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '学科',
                        key: 'subjectName',
                        minWidth: 150,
                        align: 'center',
                    },
                ],
                teaList:[],
                stuHead:[//学生
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '学生姓名',
                        key: 'truename',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '账号',
                        key: 'username',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeName',
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
                stuList:[],
            }
        },
        methods:{
            tabChange(idx){// 返回值表示 点前点击的下标
                // console.log(idx);
                this.getSchoolAdminReq(idx);
            },
            async getSchoolAdminReq(roles){//请求校级管理员 接口
                this.loading = false;
                var obj = {};
                if(roles == 0){//切换为0 时，为校级管理员
                    obj.roleId = 10;
                    obj.pageNum = this.page.pageNum;
                    obj.pageSize = this.page.pageSize;
                }else if(roles == 1){// 年级管理员
                    obj.roleId = 11;
                    obj.pageNum = this.gradePage.pageNum;
                    obj.pageSize = this.gradePage.pageSize;
                }else if(roles == 2){//教师信息
                    obj.roleId = 3;
                    obj.pageNum = this.teaPage.pageNum;
                    obj.pageSize = this.teaPage.pageSize;
                }else if(roles == 3){//学生
                    obj.roleId = 4;
                    obj.pageNum = this.stuPage.pageNum;
                    obj.pageSize = this.stuPage.pageSize;
                }
                obj.schoolId = this.schoolId;
                listUserByRoleIdAndPage(obj).then( res => {
                    // console.log('角色分页列表',res);
                    if(res.code == "0000"){
                        if(res.count >= 0){
                            if(roles == 0){
                                if(res.count != 0){
                                    this.schoolAdminList = res.data;
                                }
                                this.page.total = res.count;
                                
                            }else if(roles == 1){//年级管理员
                                if(res.count != 0){
                                    this.gradeAdminList = res.data;
                                }
                                this.gradePage.total = res.count;
                            }else if(roles == 2){//教师
                                if(res.count != 0){
                                    this.teaList = res.data;
                                }
                                this.teaPage.total = res.count;
                                
                            }else if(roles == 3){//学生
                                if(res.count != 0){
                                    this.stuList = res.data;
                                }
                                this.stuPage.total = res.count;
                                
                            }
                        }
                    }
                })
            },
            nextPageNum(pageNum){//学校管理员列表--当前页面
                this.page.pageNum = pageNum;
                this.getSchoolAdminReq(0);
            },
            nextPageSize(pageSize){//学校管理列表--当且一页展示多少条数据
                this.page.pageSize = pageSize;
                this.getSchoolAdminReq(0);
            },
            gradNextPageNum(pageNum){//年级--分页
                this.gradePage.pageNum = pageNum;
                this.getSchoolAdminReq(1);
            },
            gradNextPageSize(pageSize){//年级--分页--当且一页展示多少条数据
                this.gradePage.pageSize = pageSize;
                this.getSchoolAdminReq(1);
            },  
            teaNextPageNum(pageNum){//教师--分页
                this.teaPage.pageNum = pageNum;
                this.getSchoolAdminReq(2);
            },
            teaNextPageSize(pageSize){//教师--分页--当且一页展示多少条数据
                this.teaPage.pageSize = pageSize;
                this.getSchoolAdminReq(2);
            }, 
            stuNextPageNum(pageNum){//教师--分页
                this.stuPage.pageNum = pageNum;
                this.getSchoolAdminReq(3);
            },
            stuNextPageSize(pageSize){//教师--分页--当且一页展示多少条数据
                this.stuPage.pageSize = pageSize;
                this.getSchoolAdminReq(3);
            }, 
            switch(val,idx){//禁用/开启用户状态
                let obj = {};
                obj.isEnable = val;
                obj.userIdList = idx;
                this.setEnableOrDisableUsers(obj);
            },
            resetPwd(row,idx){//重置密码
                this.setResetPassword(row.id);
            },
            async setEnableOrDisableUsers(obj){
                enableOrDisableUsers(obj).then(res => {
                    if(res.code == "0000"){
                        this.$Message.info({
                            content: res.message,
                            duration: 1
                        });
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            async setResetPassword(userIds){
                resetPassword({
                    userId:userIds
                }).then( res =>{
                    if (res.code == "0000") {
                        this.$Message.info(res.message)
                    }
                })
            }
        },
        mounted(){
            this.schoolId = this.$route.query.id;
            this.getSchoolAdminReq(0);
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .setPage{
        text-align: center;
        margin-top: 10px;
    }
    .ivu-switch-checked:after{
        left: 32px;
    }
</style>