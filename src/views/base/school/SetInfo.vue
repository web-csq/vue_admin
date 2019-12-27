<template>
    <div>
        <!-- 学校---设置年级信息 -->
        <div class="divBottom">
            <Select style="margin-right:10px;width:200px" v-model="model1"  @on-change="selGradeFun" :label-in-value="true">
                <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            数量： <InputNumber v-model="addCount" :min="1" :step="1"  />
            <Button style="margin-left:10px;" type="primary" @click="addGradeList">添加</Button>
        </div>
        <!-- 年级列表 -->
        <Table border :columns="columnsHead" :data="listData" v-if="isTabShow">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" @click="witchs(index,row)">查看</Button>
                <Button type="primary" size="small" style="margin: 0 5px" @click="addClass(index,row)">新增班级</Button>
                <Button type="primary" size="small" @click="addAdmin(index,row)">新增年级管理员</Button>
            </template>
        </Table>

        <!--新增年级管理员-模态框-->
        <Modal
        v-model="addAdminModal"
        title="新增年级管理员"
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
                    <Input v-model="formItem.phone" type="tel" placeholder="" />
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="formItem.email"  placeholder="" />
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.sexRadio">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <!-- 添加班级数 管理员 -->
        <Modal
        v-model="addClassCountModal"
        title="新增年级管理员"
        @on-ok="addOk"
        @on-cancel="addCancel">
            新增班级数：<InputNumber  :min="1" :step="1" v-model="classCount" size="large" ></InputNumber>    
        </Modal>


    </div>
</template>
<script>
import { batchInsert, listGrade, insertGradeAdministrator } from '@/api/base';
import { getGradeListBySessions } from '@/assets/js/common.js'
import { mapState } from "vuex";
export default {
    name:"setInfo",
    data(){
        return{
            addAdminModal:false,//添加年级管理员
            addClassCountModal:false,//添加班级
            classCount:0,//班级数量
            gradeId:0,//班级ID
            columnsHead:[
                {
                    title: '年级',
                    key: 'name',
                    align:'center'
                },
                {
                    title: '班级数',
                    key: 'classCount',
                    align:'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    minWidth: 300,
                    align: 'center'
                }
            ],
            listData:[],
            formItem:{
                name:'',//名字
                users:'',//用户名
                pwd:'',//密码
                email:'',//邮箱
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
            },
            sessions:'',
            term: 0,//学期
            schoolId:0,
            schoolname:'',//学校名称
            gradeList:[],//得到年级列表
            model1:'0',
            addCount:0,
            gradename:'',
            isTabShow:false,//tab表格
            gradeRow:{},//列表一行的内容
        }
    },
    methods:{
        witchs(index,rows){//查看 班级详情
            // console.log(rows);
            if(rows.count == 0){
                this.$Notice.warning({
                    title: '提示',
                    desc: '亲，'+ rows.gradeName +'年级暂未设置班级数，不能查看该年级的详细信息',
                    duration: 1.5
                });
                return false;
            }
            this.$router.push({path:'gradeInfo',query:{id: rows.id}});
        },
        addClass(index,rows){//新增 班级
            // console.log(index,rows);
            this.classCount = 0;
            this.gradeRow = rows;//
            this.addClassCountModal = !this.addClassCountModal;
        },
        addAdmin(index,row){//新增年级管理员
            if(row.count != 0){
                console.log(row);
                this.gradeRow = row;
                this.clearModel('formValidate');
                this.addAdminModal = !this.addAdminModal;

            }else{
                this.$Notice.warning({
                    title: '提示',
                    desc: '亲，'+ row.gradeName +'年级暂未设置班级数，不能添加年级管理员',
                    duration: 1.5
                });
            }
        },
        clearModel(name){//重置模态框
            this.$refs[name].resetFields();
        },
        ok(){//模特框的  确定按钮
            // console.log('所有数据填充完毕，调用添加年级管理员接口');

            let gradeAdminObj = {};
            if (this.formItem.name == '' || this.formItem.users == "" || this.formItem.pwd == "") {
                this.$Message('基本信息不能为空');
                return
            }
            if (this.formItem.phone != '') {
                gradeAdminObj.phone = this.formItem.phone;
            }
            gradeAdminObj.enabled = true;
            gradeAdminObj.gradeId = this.gradeRow.id;
            gradeAdminObj.gradeName = this.gradeRow.name;
            gradeAdminObj.schoolId = this.schoolId;
            gradeAdminObj.schoolName = this.schoolname;
            gradeAdminObj.truename = this.formItem.name;
            gradeAdminObj.username = this.formItem.users;
            gradeAdminObj.password = this.formItem.pwd;
            this.addGradeReq(gradeAdminObj);

        },
        cancel(){// 模态框 取消按钮

        },
        addOk(){//添加班级数量,添加成功 调用  
            let rowData = this.gradeRow;
            if(this.classCount == 0){
                this.$Message.warning('添加班级数量不能为0')
                return
            }
            let gradeObj = {};
            gradeObj.gradeId = rowData.id;
            gradeObj.number = this.classCount;
            gradeObj.gradeName  = rowData.name;
            gradeObj.schoolId = this.schoolId;
            gradeObj.schoolName  = this.schoolname;
            this.setBatchInsert(gradeObj);
        },
        addCancel(){},
        selGradeFun(data){//选择年级ID
            // console.log('=====',data);
            this.gradename = data.label;
        },
        addGradeList(){//添加班级
            if(this.model1 == '0'){
                this.$Message.warning('暂未选择年级')
                return
            }
            if(this.addCount == 0){
                this.$Message.warning('添加班级数量不能为0')
                return
            }
            let gradeObj = {};
            gradeObj.gradeId = this.model1;
            gradeObj.number = this.addCount;
            gradeObj.gradeName  = this.gradename;
            gradeObj.schoolId = this.schoolId;
            gradeObj.schoolName  = this.schoolname;
            this.setBatchInsert(gradeObj)
            this.model1 = '';
            this.addCount = 0;
        },
        async setBatchInsert(obj){
            batchInsert(obj).then( res => {
                if(res.code == "0000"){
                    this.$Message.info(res.message);
                    this.getListGrade();
                }else{
                    this.$Message.error(res.message);
                }   
            })
        },
        async getListGrade(){
            listGrade({
                schoolId:this.schoolId,
                term:this.term
            }).then( res => {
                if(res.code == "0000"){
                    if(res.data.length == 0){
                        this.isTabShow = false;
                        return
                    }
                    this.isTabShow = true;
                    this.listData = res.data;
                }
            })
        },
        async addGradeReq(obj){
            insertGradeAdministrator(obj).then( res => {
                // console.log('年级管理员',res);
                if (res.code == "0000") {
                    this.$Message.info(res.message);
                }
            })
        }
    },
    computed:{
        ...mapState({
            school:state=>state.user.school,
            getTerms:state=>state.user.term,
        })
    },
    mounted(){
        
    },
    created(){
        // console.log(this.school.section);
        let school = this.school;
        this.sessions = school.section;//学段,term
        this.schoolId = school.id;
        this.schoolname = school.name;
        this.gradeList = getGradeListBySessions(Number(school.section));
        this.term = this.getTerms;
        //年级列表
        this.getListGrade();
    }
}
</script>
<style scoped>
    .divBottom{
        margin-bottom: 10px;
    }
</style>