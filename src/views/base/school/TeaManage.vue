<template>
    <div>
        <div class="boxBottom divBlock">
            <!-- 筛选 -->
            选择年级：<Select v-model="model3" style="width:100px" @on-change="selGradeID">
                <Option :value="0" >全部</Option>
                <Option v-for="item in getGradeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <div class="divBlock">
            <!-- 上传文件 -->
            <Upload
                style="display:inline-block;margin: 0 10px;"
                ref="upload"
                :format ="['xlsx','xls']"
                name="file"
                :before-upload="handleUpload"
                :on-format-error="handleFormatError"
                :on-error="handleError"
                :on-success="handleSuccess"
                :show-upload-list="false"
                :headers='{"x-requested-with":"XMLHttpRequest"}'
                :with-credentials='true'
                :action="baseURL+'/user/useExcelToImportTeachers'">
                <Button icon="ios-cloud-upload-outline" type="primary" :loading='updataLoading'>批量导入教师</Button>
            </Upload>
            <Button icon="ios-cloud-download"  type="primary">
                <a style="color:#fff;"  href="https://soiiu-exam.oss-cn-beijing.aliyuncs.com/download/%E9%AB%98%E4%B8%AD%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%EF%BC%88spss%EF%BC%89.xlsx">下载教师模板</a>    
            </Button>
            <!-- <Button style="margin-left:10px;" @click="addStu">新增教师</Button> -->
        </div>
        
        <Table
        :columns="columns1"
        :data="schoolArr"
        :loading='loading'
        >
            <!--操作-->
            <template slot-scope="{ row, index }" slot="action">
                <!-- <Button type="info" size="small"  @click="updata(index,row)">修改信息</Button> -->
                <Button type="info" size="small" style="margin: 0 5px" @click="overSet(row,index)">重置密码</Button>
                <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
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

        <!-- 新增教师模态框 -->
        <Modal
            v-model="addStuModal"
            title="新增教师"
            @on-ok="addOK"
            @on-cancel="cancel">
            <div>
                <Form  ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                    <FormItem label="账号" prop="num">
                        <Input v-model="formItem.num" placeholder="" />
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formItem.name" placeholder="" />
                    </FormItem>
                    <FormItem label="学科" prop="subjectId">
                        <Select v-model="formItem.subjectId" @on-change="selectSubject">
                            <Option :value="item.id" v-for="item in formItem.subjectList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="formItem.phone" placeholder="" />
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <!-- 修改教师模态框 -->
        <Modal
            v-model="updataModal"
            title="修改教师信息"
            @on-ok="updataOK"
            @on-cancel="cancel">
            <div>
                <Form  :model="stuItem"  :label-width="80">
                    <FormItem label="学号" prop="num">
                        <Input v-model="stuItem.num" placeholder="" />
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="stuItem.name" placeholder="" />
                    </FormItem>
                    <FormItem label="学科" prop="subjectId" >
                        <Select v-model="stuItem.subjectId" @on-change="selectSubject" readonly disabled>
                            <Option :value="item.id" v-for="item in stuItem.subjectList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        
        <!-- 导入数据提示框 -->
        <Modal
        v-model="uploadModle"
        title="导入教师表格信息"
        @on-ok="uploadOk"
        >
            <div>
                <Collapse v-model="value1">
                    <Panel name="1">
                        <!--  -->
                        导入成功信息 -- 共 {{ successCounts }}条
                        <List slot="content"   border size="small" v-if="successCounts > 0">
                            <ListItem  v-for="item in successList" :key="item.id">{{item.id}}:&nbsp;{{ item.value }}</ListItem>
                        </List>
                        <List slot="content"   :border='false' size="small" v-if="successCounts == 0">
                            <ListItem > 数据成功导入0条</ListItem>
                        </List>
                    </Panel>
                    <Panel name="2">
                        导入失败信息 -- 共 {{ errorCounts }} 条
                        <List slot="content"   border size="small" v-if="errorList.length > 0">
                            <ListItem v-for="item in errorList" :key="item.id">{{item.id}}:&nbsp;{{ item.value }}</ListItem>
                        </List>
                        <List slot="content"   :border="false" size="small" v-if="errorCounts == 0">
                            <ListItem  > 数据导入失败0条</ListItem>
                        </List>
                    </Panel>
                </Collapse>
            </div>
        </Modal>
    </div>
</template>

<script>
import { listUserByRoleIdAndPage, resetPassword, enableOrDisableUsers } from '@/api/base'
import { getGradeListBySessions } from '@/assets/js/common.js'
import { mapState } from "vuex";

export default {
    name:"teaManage",
    data(){
        return {
            value1:'1',
            loading:true,
            addStuModal:false,
            updataModal:false,//修改学生模态框
            uploadModle:false,//表格提示模态框
            page:{
                pageNum:1,
                pageSize:10,
                total:0
            },//分页
            columns1: [
                {
                    title: '编号',
                    key: 'id',
                    align: 'center',
                    width: 90
                },
                {
                    title: '姓名',
                    key: 'truename',
                    align: 'center',
                    minWidth:200
                },
                {
                    title: '账号',
                    key: 'username',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '年级',
                    key: 'gradeName',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '用户状态',
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
            schoolArr:[],
            formItem:{
                name:'',
                sexRadio:'0',
                num:'',
                gradeId:'',
                classId:'',
                subjectList:[
                    {id:1,name:'语文'},
                    {id:2,name:'数学'},
                    {id:3,name:'英语'}
                ]
            },
            stuItem:{
                name:'李四',
                num:'20150101',
                subjectId:1,
                phone:'',
            },
            ruleValidate:{
                name:[{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                num:[{ required: true, message: '学号不能为空', trigger: 'blur' }],
                phone:[{required:true , message: '手机号不能为空', trigger: 'blur' }],
                subjectId:[{required:true ,message: '学科为必选项',}]
            },
            schoolId:0,//学校ID
            baseURL:'',
            model3:'',//年级ID
            getGradeList:[],
            updataLoading:false,
            errorList:[],
            successList:[],
            successCounts:0,
            errorCounts:0,
        }
    },
    methods:{
        uploadOk(){//导入数据成功与失败
            this.uploadModle = false;
        },
        selGradeID(){
            this.loading = true;
            this.getListUserByRoleIdAndPage();
        },
        nextPageNum(i){//页码改变的回调，返回改变后的页码
            this.loading = true;
            this.page.pageNum = i;
            this.getListUserByRoleIdAndPage();
        },
        nextPageSize(size){
            this.loading = true;
            this.page.pageSize = size;
            this.getListUserByRoleIdAndPage();
        },
        switch(value,userId){//开关
            this.setEnableOrDisableUsers(value,userId);
        },
        remove(index){//删除
            console.log(index);
            let resMessage = '操作成功';
            this.$Message.success(resMessage);//删除成功
            // this.$Message.error('This is an error tip');//删除失败
        },
        overSet(row,index){//重置密码
            this.setResetPassword(row.id);
        },
        updata(index,row){//修改信息
            console.log(row);
            this.updataModal = !this.updataModal;
            this.stuItem = {
                name: row.name,
                sexRadio:'1',
                num:row.id,
                gradeId:row.gradeId,
                classId:row.classId,
                
            }
            // console.log(this.stuItem);
        },
        addStu(){//新增学生
            this.clearModel('formValidate');//重置模态框
            this.addStuModal = !this.addStuModal;
        },
        selectSubject(value){//学科列表
            console.log('当前选中班级的ID',value);
        },
        clearModel(name){

        },
        addOK(){//添加学生模态框
            console.log();
        },
        updataOK(){//修改学生信息

        },
        cancel(){

        },
        /**上传文件 */
        handleFormatError(file){//上传格式失败
            // console.log(file);
            // var fileSize = file.size / 1024;//文件大小
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
            })
            
        },
        handleUpload (file) {//上传前
            // console.log(file);
            this.updataLoading = true;
        },
        preview(){
            this.$refs.upload.fileList.splice(0);
        },
        handleSuccess(res,file){//上传成功，如果上传成功 clearFiles，清空文件
            this.updataLoading = false
            this.errorList = [];
            this.successList = [];
            if(res.code === "0000"){
                this.uploadModle = true;
                let successCount = 0;
                let errorCount = 0;
                if(JSON.stringify(res.data.successData) != "{}"){
                    for(let i in res.data.successData){
                        let succesObj = {};
                        successCount ++;
                        succesObj.id = i;
                        succesObj.value = res.data.successData[i];
                        this.successList.push(succesObj);
                    }
                }
                if(JSON.stringify(res.data.errorData) != "{}"){
                    for(let i in res.data.errorData){
                        let errObj = {};
                        errorCount ++
                        errObj.id = i;
                        errObj.value = res.data.errorData[i];
                        this.errorList.push(errObj);
                    }
                }
                
                this.successCounts = successCount;
                this.errorCounts = errorCount;
                
            }else{
                this.$Message.error("数据导入失败！")
            }
            this.$refs.upload.fileList.splice(0);
            // console.log(this.$refs.upload);
        },
        handleError(error,file){//上传失败
            this.$Message.error("数据导入失败！")
        },
        async getListUserByRoleIdAndPage(){//根据用户分析
            this.schoolArr = [];
            let roleObj = {};
            roleObj.roleId = 3;
            roleObj.schoolId = this.schoolId;
            roleObj.pageNum = this.page.pageNum;
            roleObj.pageSize = this.page.pageSize;
            if(this.model3 != ''){
                roleObj.gradeId = this.model3;
            }
            listUserByRoleIdAndPage(roleObj).then( res => {
                // console.log(res);
                this.loading = false;
                if(res.code == "0000"){
                    if(res.count > 0){
                        this.schoolArr = res.data;
                    }
                    this.page.total = res.count;
                }
            })
        },
        async setResetPassword(userIds){
            resetPassword({
                userId:userIds
            }).then( res => {
                console.log( res )
                if (res.code == "0000") {
                    this.$Message.success(res.message)
                }
            })
        },
        async setEnableOrDisableUsers(enableds,userId){
            enableOrDisableUsers({
                isEnable: enableds,
                userIdList: userId
            }).then( res => {
                if (res.code == "0000") {
                    this.$Message.success(res.message)
                }
            })
        }
    },
    mounted(){
        
    },
    created(){
        this.baseURL = process.env.VUE_APP_URL;
        this.schoolId = this.school.id;
        this.getListUserByRoleIdAndPage();
        this.getGradeList = getGradeListBySessions(Number(this.school.section));
        // console.log(this.getGradeList);
    },
    computed:{
        ...mapState({
            school:state=>state.user.school
        })
    },
}
</script>

<style scoped>
    .setPage{
        text-align: center;
        margin-top: 10px;
    }
    .boxBottom{
        margin-bottom: 10px;
    }
    .divBlock{
        display: inline-block;
    }
</style>
<style >
    .ivu-switch-checked:after {
        left: 32px;
    }
</style>