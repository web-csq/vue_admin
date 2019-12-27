<template>
    <div>
        <!-- 市级管理员 -->
        <Button type="primary" size="small" @click="addAdmin" class="bootom">添加管理员</Button>
        <div>
            <Table border
            :columns="cityTabHead" 
            :data="cityAdminList"
            :loading='loading'
            >
                <!--操作-->
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small"  @click="lookAdmin(row,index)">查看</Button>
                    <Button type="success" size="small" style="margin: 0 5px" @click="updateAdmin(row)">修改</Button>
                    <Button type="primary" size="small" @click="delAdmin(row)">删除</Button>
                </template>
            </Table>
            <!--  :page-size-opts="[10, 20, 30, 40]" show-sizer-->
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

    </div>
</template>

<script>
    import { listUserByRoleIdAndPage, enableOrDisableUsers } from "@/api/base"
    export default {
        name: 'adminCityList',
        data() {
            return {
                // schoolId:0,
                loading:true,
                gradePage:{
                    total:0,
                    pageSize:10,
                    pageNum:1
                },//分页
                cityTabHead:[//市级管理员信息
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                        minWidth:80,
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
                        title: '省份',
                        key: 'provinceName',
                        minWidth: 100,
                        align: 'center',
                    }
                    ,
                    {
                        title: '市',
                        key: 'cityName',
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
                        title: '用户状态',
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
                    }
                    // {
                    //     title: '操作',
                    //     slot: 'action',
                    //     width: 250,
                    //     align: 'center',
                    // }
                ],
                cityAdminList:[],
            }
        },
        methods:{
            async getSchoolAdminReq(){//请求校级管理员 接口
                var obj = {};
                obj.roleId = 8;
                obj.pageNum = this.gradePage.pageNum;
                obj.pageSize = this.gradePage.pageSize;
                listUserByRoleIdAndPage(obj).then( res => {
                    // console.log('角色分页列表',res);
                    this.loading = false;
                    if(res.code == "0000"){
                        if(res.count != 0){
                            this.cityAdminList = res.data;
                        }
                        this.gradePage.total = res.count;
                    }
                })
            },
            gradNextPageNum(pageNum){//年级--分页
                // console.log(pageNum);
                this.loading = true;
                this.gradePage.pageNum = pageNum;
                this.getSchoolAdminReq();
            },
            gradNextPageSize(pageSize){//年级--分页--当且一页展示多少条数据
                // console.log(pageSize);
                this.loading = true;
                this.gradePage.pageSize = pageSize;
                this.getSchoolAdminReq();
            },  
            
            deleAdmin(ax,bx){//删除
            
            },
            lookAdmin(row){//查看

            },
            updataAdmin(row){//修改

            },
            switch(val,idx){//禁用/开启用户状态
                let obj = {};
                obj.isEnable = val;
                obj.userIdList = idx;
                this.setEnableOrDisableUsers(obj);
            },
            async setEnableOrDisableUsers(obj){
                enableOrDisableUsers(obj).then(res => {
                    // console.log('用户禁用',res);
                    if(res.code == "0000"){
                        this.$Message.info({
                            content: res.message,
                            duration: 1
                        });
                    }
                })
            },
            addAdmin(){//添加省级管理员
                this.$router.push({path:'addAdmin',query:{id:8}});
            },

        },
        mounted(){
            // console.log(this.$route.query.id)
            // this.schoolId = this.$route.query.id;
            this.getSchoolAdminReq();
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
    .bootom{
        margin-bottom: 10px;
    }
</style>