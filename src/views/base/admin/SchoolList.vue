<template>
    <div>
        <div class="boxBottom">
            <Button type="primary" size="small" @click="addSchool">添加学校</Button>
        </div>
        <!--学校列表-->
        <Table
        :columns="columns1"
        :data="schoolArr"
        :loading='loading'
        >
            <!--操作-->
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small"  @click="lookSchool(index)">查看</Button>
                <Button type="success" size="small" style="margin: 0 5px" @click="updateSchool(index)">修改</Button>
                <Button type="primary" size="small" @click="schoolAdmin(index)">添加校级管理员</Button>
            </template>
        </Table>
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
        <!--模态框-->
        <Modal
        v-model="addAdminModal"
        title="添加校级管理员"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form  ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formItem.name" placeholder="" />
                </FormItem>
                <FormItem label="用户名" prop="users">
                    <Input v-model="formItem.users" placeholder="" />
                </FormItem>
                <FormItem label="密码" prop="pwd">
                    <Input v-model="formItem.pwd" type="password" placeholder="" />
                </FormItem>
                <FormItem label="手机号">
                    <Input v-model="formItem.phone" type="number" placeholder="" />
                </FormItem>
                <FormItem label="身份证号">
                    <Input v-model="formItem.card"  placeholder="" />
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.sexRadio">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'schoolList',
    data(){
        return{
            loading:true,
            addAdminModal:false,
            switch1: false,
            page:{
                pageNum:1,
                pageSize:10,
                total:100
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
                    key: 'phones',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '联系人',
                    key: 'userName',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '开启/禁用',
                    key: 'status',
                    align: 'center',
                    minWidth:  70,
                    render:(h, params) => {
                        return h('div', [
                            h('i-switch', { //数据库1是已处理，0是未处理
                                props: {
                                    type: 'primary',
                                    value: params.row.status === 1  //控制开关的打开或关闭状态，官网文档属性是value
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
                                        console.log(value);
                                        console.log(params);
                                        this.switch(params.index) //params.index是拿到table的行序列，可以取到对应的表格值
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
            schoolArr: [
                {
                    id:7,
                    name: '实验高中',
                    age: 18,
                    userName: '李老师',
                    phones: '153290000000'
                },
                {
                    id:8,
                    name: 'Jim Green',
                    age: 24,
                    userName: '李老师',
                    phones: '2016-10-01'
                },
                {
                    id:9,
                    name: 'Joe Black',
                    age: 30,
                    userName: '涨三周',
                    phones: '2016-10-02'
                },
                {   
                    id:10,
                    name: '五高',
                    age: 26,
                    userName: '李老师',
                    phones: '2016-10-04'
                }
            ],
            formItem:{
                name:'',//名字
                users:'',//用户名
                pwd:'',//密码
                card:'',//身份证号
                phone:'',//手机号
                sexRadio:'0',//性别
            },
            ruleValidate:{
                name:[
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                users:[
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        getSchoolListReq(){//请求学校列表接口
            setTimeout(() => {
                this.loading = !this.loading;//如若数据返回则 ，加载消失
            },1000)
        },
        lookSchool(index){//查看学校
            this.$router.push('schoolInfo');
            console.log('查看学校',index);
        },
        updateSchool(index){//修改学校
            this.$Message.info('修改学校页面与添加学校页面类似一致');
            console.log('修改学校',index);
        },
        schoolAdmin(index){//添加校级管理员
            this.clearModel('formValidate');
            console.log('添加校级管理员',index);
            this.addAdminModal = !this.addAdminModal;
            this.ok(index);
        },
        switch(idx){//开关
            console.log(11+idx);
        },
        nextPageNum(i){//页码改变的回调，返回改变后的页码
            this.page.pageNum = i;
            // this.getSchoolListReq(i,this.page.pageSize);//刷新列表
            console.log('当前页',this.page.pageNum);
        },
        nextPageSize(size){//切换每页条数时的回调，返回切换后的每页条数
            this.page.pageSize = size;
            console.log('每条数据',this.page.pageSize);
            // this.getSchoolListReq(this.page.pageNum,size);//刷新列表
        },
        addSchool(){
            this.$router.push('AddSchool');
        },
        ok(idx){//模态框 确定按钮

            console.log('传递的参数',this.formItem.sexRadio);
        },
        cancel(){

        },
        clearModel(name){//重置模态框
            this.$refs[name].resetFields();
        }
    },
    mounted(){
        this.getSchoolListReq();
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
</style>