<template>
    <div style="position:relative;">
        <Button  style="position:absolute;top:0;right:0;z-index:100;" type="primary" size="small" @click="goBack">返回年级管理</Button>
        <Tabs :animated="false" @on-click="selRoles">
            <TabPane label="班级列表">
                <!-- 班级列表 -->
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
                        
                        :placement="'top'"
                        
                        show-total
                        show-elevator
                        @on-change="nextPageNum"
                        @on-page-size-change="nextPageSize"
                    ></Page>
                </div>
            </TabPane>
            <TabPane label="年级管理员">
                <div>
                    <Table border
                        :columns="gTabHead" 
                        :data="gradeAdminList"
                        >
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin: 0 5px" @click="overSet(row)">重置密码</Button>
                            </template>
                        </Table>
                    <Page  class="setPage"
                        :total="gPage.total" 
                        :page-size="gPage.pageSize"
                        :current="gPage.pageNum"
                        
                        :placement="'top'"
                        
                        show-total
                        show-elevator
                        @on-change="gNextPageNum"
                    ></Page>
                </div>
            </TabPane>
            <TabPane label="教师列表">
                <div>
                    <Table border
                        :columns="teaTabHead" 
                        :data="teaList"
                        >
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin: 0 5px" @click="overSet(row)">重置密码</Button>
                            </template>
                        </Table>
                    <Page  class="setPage"
                        :total="teaPage.total" 
                        :page-size="teaPage.pageSize"
                        :current="teaPage.pageNum"
                        
                        :placement="'top'"
                        
                        show-total
                        show-elevator
                        @on-change="teaNextPageNum"
                    ></Page>
                </div>
            </TabPane>
            <TabPane label="学生列表">
                <div>
                    <Table border
                        :columns="stuTabHead" 
                        :data="stuList"
                        >
                            <template slot-scope="{ row }" slot="action">
                                <Button type="info" size="small" style="margin: 0 5px" @click="overSet(row)">重置密码</Button>
                            </template>
                        </Table>
                    <Page  class="setPage"
                        :total="stuPage.total" 
                        :page-size="stuPage.pageSize"
                        :current="stuPage.pageNum"
                        
                        :placement="'top'"
                        
                        show-total
                        show-elevator
                        @on-change="stuNextPageNum"
                    ></Page>
                </div>
            </TabPane>
        </Tabs>

    </div>

</template>

<script>
    import { listClassByPage, listUserByRoleIdAndPage, enableOrDisableUsers , resetPassword } from '@/api/base'
    import { mapState } from "vuex";

    export default {
        name: 'gradeInfo',
        data() {
            return {
                loading:true,
                page:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },//分页
                gPage:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },
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
                        width:80,
                    },
                    {
                        title: '班级',
                        key: 'name',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '年级',
                        key: 'gradeName',
                        minWidth: 150,
                        align: 'center',
                    }
                ],
                schoolAdminList:[],
                gTabHead:[
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
                    }, 
                    {
                        title: '账号状态',
                        key: 'status',
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
                                            this.switch(params.row.id,value) //params.index是拿到table的行序列，可以取到对应的表格值
                                        }
                                    }
                                }, )
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        minWidth: 200,
                        align: 'center'
                    }
                ],//年级管理员
                gradeAdminList:[],//年级
                stuTabHead:[
                    {
                        title: '学号',
                        key: 'number',
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
                    },
                    {
                        title: '账号状态',
                        key: 'status',
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
                                            this.switch(params.row.id,value) //params.index是拿到table的行序列，可以取到对应的表格值
                                        }
                                    }
                                }, )
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        minWidth: 200,
                        align: 'center'
                    }
                ],
                stuList:[],
                teaTabHead:[
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
                    {
                        title: '账号状态',
                        key: 'status',
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
                                            this.switch(params.row.id,value) //params.index是拿到table的行序列，可以取到对应的表格值
                                        }
                                    }
                                }, )
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        minWidth: 200,
                        align: 'center'
                    }
                ],
                teaList:[],
                term:0,
                schoolId:0,
            }
        },
        methods:{
            selRoles(index){
                // console.log(index)
                if (index == 0) {
                    this.getListClassByPage();
                }else{
                    //调用角色
                    this.getListUserByRoleIdAndPage(index);
                }
            },
            switch(idx,value){//是否禁用
                this.setEnableOrDisableUsers(value,idx);
            },
            overSet(row){
                this.setResetPassword(row.id);
            },
            nextPageNum(pageNum){//当前页面
                this.loading = true;
                this.page.pageNum = pageNum;
                this.getListClassByPage()
            },
            nextPageSize(pageSize){//当且一页展示多少条数据
                this.loading = true;
                this.page.pageNum = pageSize;
                getListClassByPage();
            },
            gNextPageNum(pageNum){//当前页--年级管理员
                this.gPage.pageNum = pageNum;
                this.getListUserByRoleIdAndPage(1);
            },
            teaNextPageNum(pageNum){
                this.teaPage.pageNum = pageNum;
                this.getListUserByRoleIdAndPage(2);
            },
            stuNextPageNum(pageNum){
                this.stuPage.pageNum = pageNum;
                this.getListUserByRoleIdAndPage(3);
            },
            async getListClassByPage(){
                listClassByPage({
                    gradeId:this.gradeId,
                    schoolId:this.schoolId,
                    term:this.term,
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize,
                }).then( res => {
                    this.loading = false;
                    if(res.code == "0000"){
                        if(res.count > 0){
                            this.schoolAdminList = res.data
                        }
                        this.page.total = res.count
                    }
                })
            },
            async getListUserByRoleIdAndPage(idx){//年级管理员列表
                let obj = {};
                if (idx == 1) {//年级管理员
                    obj.roleId = 11; 
                    obj.pageNum= this.gPage.pageNum
                    obj.pageSize= this.gPage.pageSize
                }else if(idx == 2){//教师
                    obj.roleId = 3; 
                    obj.pageNum= this.teaPage.pageNum
                    obj.pageSize= this.teaPage.pageSize
                }else if(idx == 3){//学生
                    obj.roleId = 4; 
                    obj.pageNum= this.stuPage.pageNum
                    obj.pageSize= this.stuPage.pageSize
                }
                obj.gradeId = this.gradeId;
                obj.schoolId = this.schoolId;
                listUserByRoleIdAndPage(obj).then( res => {
                    if (res.code == "0000") {
                        if (res.count > 0) {
                            if (idx == 1) {
                                this.gradeAdminList = res.data;
                                this.gPage.total = res.count
                            }else if (idx == 2) {
                                this.teaList = res.data;
                                this.teaPage.total = res.count;
                            }else if (idx == 3) {
                                this.stuList = res.data;
                                this.stuPage.total = res.count;
                            }
                        }
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            async setEnableOrDisableUsers(value,id){//禁用
                enableOrDisableUsers({
                    isEnable:value,
                    userIdList:id
                }).then( res => {
                    if (res.code == "0000") {
                        this.$Message.success(res.message);
                    }else{
                        this.$Message.error(res.message)
                    }
                })
            },
            async setResetPassword(id){//重置密码
                resetPassword({
                    userId:id
                }).then( res => {
                    if (res.code == "0000") {
                        this.$Message.success(res.message);
                    }else{
                        this.$Message.error(res.message)
                    }
                })
            },
            goBack(){//返回年级管理
                this.$router.push('setInfo');
            },
        },
        computed:{
            ...mapState({
                school:state=>state.user.school,
                getTerms:state=>state.user.term,
            })
        },
        mounted(){
            // console.log(this.$route.query.id);
            this.gradeId = this.$route.query.id;
            this.schoolId = this.school.id;
            this.term = this.getTerms;
            this.getListClassByPage();
        },
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