<template>
    <div>
        <div class="boxBottom">
            <Button type="primary" size="small" @click="addSchool">添加学校</Button>
            <!-- <div class="cascader stylus">
                区域选择:
                <Cascader class="cascader" 
                :data="cityList" 
                size='small' 
                v-model="cityValue" 
                trigger="hover" 
                @on-change="selectedCity"
                ></Cascader>
            </div> -->
        </div>
        <!--学校列表-->
        <Table
        :columns="columns1"
        :data="schoolArr"
        :loading='loading'
        >
            <!--操作-->
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small"  @click="lookSchool(row,index)">查看</Button>
                <Button type="success" size="small" style="margin: 0 5px" @click="updateSchool(row)">修改</Button>
                <Button type="primary" size="small" @click="schoolAdmin(row)">添加校级管理员</Button>
            </template>
        </Table>
        <!-- :page-size-opts="[10, 20, 30, 40]" show-sizer -->
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
        <!--模态框-->
        <Modal
        v-model="addAdminModal"
        title="添加校级管理员"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form  ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="truename">
                    <Input v-model="formItem.truename" placeholder="" />
                </FormItem>
                <FormItem label="用户名" prop="users">
                    <Input v-model="formItem.users" placeholder="" />
                </FormItem>
                <FormItem label="密码" prop="pwd">
                    <Input v-model="formItem.pwd" type="password" placeholder="" />
                </FormItem>
                <FormItem label="手机号">
                    <Input v-model="formItem.phone" type="tel" placeholder="" />
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="formItem.email"  type="email" placeholder="" />
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.sexRadio">
                        <Radio label="0">女</Radio>
                        <Radio label="1">男</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { listSchool, enableOrDisableSchools, insertSchoolAdministrator } from "@/api/base"
import { async } from 'q';
export default {
    name:'schoolList',
    data(){
        return{
            addAdminModal:false,
            switch1: false,
            loading:true,
            page:{
                pageNum:1,
                pageSize:10,
                total:0,
            },//分页
            columns1: [
                {
                    title: '编号',
                    key: 'id',
                    align: 'center',
                    width: 90
                },
                {
                    title: '学校名称',
                    key: 'name',
                    align: 'center',
                    minWidth:200
                },
                {
                    title: '电话',
                    key: 'phone',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '联系人',
                    key: 'contactPerson',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '开启/禁用',
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
                    title: '操作',
                    slot: 'action',
                    minWidth: 200,
                    align: 'center'
                }
                
            ],
            schoolArr: [],
            schoolId:0,
            formItem:{
                truename:'',//名字
                users:'',//用户名
                pwd:'',//密码
                email:'',//邮箱
                phone:'',//手机号
                sexRadio:'0',//性别
            },
            ruleValidate:{
                truename:[
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                users:[
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            cityId:'',
            cityList:[
                {
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                },
                {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }
            ],
            cityValue:[],
        }
    },
    methods:{
        async getSchoolListReq(pageNum,pageSize){//请求学校列表接口,/school/listSchool
            listSchool({
                pageNum:pageNum,
                pageSize: pageSize
            }).then( res => {
                // console.log('学校列表',res);
                this.loading = false;
                if(res.code == "0000"){
                    if(res.count > 0){
                        this.page.total = res.count
                        this.schoolArr = res.data
                    }
                }
            })

        },
        lookSchool(row,index){//查看学校
            if(row.enabled){
                this.$router.push({path:'schoolInfo',query:{id: row.id}})
            }else{
                this.$Message.warning('亲，该学校处于禁用状态');
            }
            
        },
        updateSchool(row){//修改学校
            // console.log('修改学校',row);
            this.$router.push({path:'updataSchool',query:{
                row: row
            }})
        },
        schoolAdmin(row){//添加校级管理员
            if(row.enabled){
                this.clearModel('formValidate');
                console.log('添加校级管理员',row.id);
                this.schoolId = row.id;
                this.addAdminModal = !this.addAdminModal;
            }else{
                this.$Message.warning('亲，该学校处于禁用状态');
            }
        },
        async switch(value,schoolIdList){//开关
            enableOrDisableSchools({
                isEnable: value,
                schoolIdList:schoolIdList
            }).then( res => {
                // console.log('开启或禁用学校',res)
                if(res.code == "0000"){
                    this.$message({
                        message: (value ?'开启':'禁用') + res.message,
                        type: 'success'
                    });
                    this.getSchoolListReq(this.page.pageNum,this.page.pageSize)
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        nextPageNum(i){//页码改变的回调，返回改变后的页码
            this.page.pageNum = i;
            this.loading = true;
            this.getSchoolListReq(i,this.page.pageSize);//刷新列表
            console.log('当前页',this.page.pageNum);
        },
        nextPageSize(size){//切换每页条数时的回调，返回切换后的每页条数
            this.page.pageSize = size;
            this.loading = true;
            console.log('每条数据',this.page.pageSize);
            this.getSchoolListReq(this.page.pageNum,size);//刷新列表
        },
        addSchool(){
            this.$router.push('AddSchool');
        },
        ok(idx){//模态框 确定按钮
            this.addSchoolAdminReq();
        },
        cancel(){

        },
        async addSchoolAdminReq(){
            var obj = {};
            obj.schoolId = this.schoolId;
            obj.enabled = true;
            obj.sex = this.formItem.sexRadio;
            obj.truename = this.formItem.truename;
            obj.username = this.formItem.users;
            if(this.formItem.pwd == ''){
                obj.password = 123456;
            }else{
                obj.password = this.formItem.pwd;
            }
            if(this.formItem.phone != ''){
                obj.phone = this.formItem.phone;
            }
            insertSchoolAdministrator(obj).then( res => {
                if (res.code == "0000") {
                    this.$Message.info('校级管理员添加成功');
                }
            })
        },
        clearModel(name){//重置模态框
            this.$refs[name].resetFields();
        },
        selectedCity(value,selectedData){//选择区域
            console.log(value,selectedData);
        },
    },
    mounted(){
        this.getSchoolListReq(this.page.pageNum,this.page.pageSize);
    },
    created(){
        
    }
}
</script>
<style scope>
    .setPage{
        text-align: center;
        margin-top: 10px;
    }
    .boxBottom{
        margin-bottom: 10px;
    }
    .ivu-switch-checked:after{
        left: 32px;
    }
    .cascader{
        display: inline-block;
    }
    .stylus{
        margin-left: 10px;
    }
</style>