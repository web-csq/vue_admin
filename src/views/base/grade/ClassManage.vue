<template>
    <div>
        <!--<div>
            <Upload
                style="display:inline-block;margin-right:10px;"
                ref="upload"
                :format ="['xlsx','xls']"
                :data="uploadData"
                :before-upload="handleUpload"
                :on-format-error="handleFormatError"
                :on-error="handleError"
                :on-success="handleSuccess"
                
                action="/url">
                <Button icon="ios-cloud-upload-outline" type="primary">批量导入学生</Button>
            </Upload>
            <Button
                class=" right-10"
                icon="ios-cloud-download"
                type="primary"
                @click="downloadFile('档案模板')"
            >下载模板</Button>
            <Button
                class=" right-10"
                icon="ios-cloud-download"
                type="primary"
            >下载模板</Button>
            <Button style="margin-left:10px;" @click="addStu">新增学生</Button>
        </div> -->
        
        <Table
        :columns="columns1"
        :data="schoolArr"
        :loading="loading"
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

        ></Page>

        <!-- 新增学生模态框 -->
        <Modal
            v-model="addStuModal"
            title="新增学生"
            @on-ok="addOK"
            @on-cancel="cancel">
            <div>
                <Form  ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                    <FormItem label="学号" prop="num">
                        <Input v-model="formItem.num" placeholder="" />
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formItem.name" placeholder="" />
                    </FormItem>
                    <FormItem label="年级" prop="gradeId">
                        <Select v-model="formItem.gradeId" @on-change="selectGrade">
                            <Option :value="item.id" v-for="item in formItem.gradeList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="班级" prop="classId">
                        <Select v-model="formItem.classId" @on-change="selectClass">
                            <Option :value="item.id" v-for="item in formItem.classList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formItem.sexRadio">
                            <Radio label="0">男</Radio>
                            <Radio label="1">女</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <!-- 修改学生模态框 -->
        <Modal
            v-model="updataModal"
            title="修改学生信息"
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
                    <FormItem label="年级" prop="gradeId" >
                        <Select v-model="stuItem.gradeId" @on-change="selectGrade" readonly disabled>
                            <Option :value="item.id" v-for="item in stuItem.gradeList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="班级" prop="classId" >
                        <Select v-model="stuItem.classId" @on-change="selectClass" readonly disabled>
                            <Option :value="item.id" v-for="item in stuItem.classList" :key="item.id" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="stuItem.sexRadio">
                            <Radio label="0">男</Radio>
                            <Radio label="1">女</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
import { enableOrDisableUsers, listUserByRoleIdAndPage, resetPassword } from '@/api/base'
import { mapState } from 'vuex'
export default {
    name:"classManage",
    data(){
        return {
            addStuModal:false,
            updataModal:false,//修改学生模态框
            loading:true,
            page:{
                pageNum:1,
                pageSize:10,
                total:0
            },//分页
            schoolId:0,
            gradeId:0,
            columns1: [
                {
                    title: '学号',
                    key: 'number',
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
                    title: '班级',
                    key: 'className',
                    align: 'center',
                    minWidth: 120
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
                                        // console.log(value);
                                        // console.log(params);
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
            schoolArr:[],
            formItem:{
                name:'',
                sexRadio:'0',
                num:'',
                gradeId:'',
                classId:'',
                classList:[
                    {id:1,name:'高一1班'},
                    {id:2,name:'高一2班'},
                    {id:3,name:'高一3班'}
                ],
                gradeList:[
                    {id:1,name:'高一'},
                    {id:2,name:'高二'},
                    {id:3,name:'高三'}
                ]
            },
            stuItem:{
                name:'李四',
                sexRadio:'0',
                num:'20150101',
                gradeId:1,
                classId:2,
                classList:[
                    {id:1,name:'高一1班'},
                    {id:2,name:'高一2班'},
                    {id:3,name:'高一3班'}
                ],
                gradeList:[
                    {id:1,name:'高一'},
                    {id:2,name:'高二'},
                    {id:3,name:'高三'}
                ]
            },
            ruleValidate:{
                name:[{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                num:[{ required: true, message: '学号不能为空', trigger: 'blur' }],
                gradeId:[{required:true }],
                classId:[{required:true }]
            },
        }
    },
    methods:{
        nextPageNum(i){
            this.loading = true;
            this.page.pageNum = i;
            this.getStuList();
        },
        switch(idx,value){//开关
            this.setEnableOrDisableUsers(value,idx);
        },
        remove(index){//删除
            console.log(index);
        },
        overSet(row,idx){//重置密码
            this.setResetPassword(row.id)
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
            console.log(this.stuItem);
        },
        addStu(){//新增学生
            this.clearModel('formValidate');//重置模态框
            this.addStuModal = !this.addStuModal;
        },
        selectGrade(value){ //年级列表
            console.log('当前选择年级的ID',value);
        },
        selectClass(value){//班级列表
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
            console.log(file);
            // var fileSize = file.size / 1024;//文件大小
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
            })
            
        },
        handleUpload (file) {//上传前
            console.log(file)
            // return false;
        },
        handleSuccess(res,file){//上传成功，如果上传成功 clearFiles，清空文件
            console.log(res);
            // if(res.status === 200){
            //     this.$Message.success("数据导入成功！")
            // }
            this.$Message.success("数据导入成功！")
        },
        handleError(error,file){//上传失败
            this.$Message.error("数据导入失败！")
        },
        downloadFile(name) {
            let requestConfig = {
                headers: {
                "Content-Type": "application/json;application/octet-stream"
                }
            };
            AjaxHelper.post(this.downLoadUrl, requestConfig, {
                responseType: "blob"
            }).then(res => {
                // 处理返回的文件流
                const content = res.data;
                const blob = new Blob([content]);
                var date =
                new Date().getFullYear() +
                "" +
                (new Date().getMonth() + 1) +
                "" +
                new Date().getDate();
                const fileName = date + name + ".xlsx";
                if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
                } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
                }
            });
        },
        async setEnableOrDisableUsers(value,id){//禁用
            enableOrDisableUsers({
                isEnable:value,
                userIdList:id
            }).then( res => {
                if (res.code == "0000") {
                    this.$Message.success(res.message);
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
        async getStuList(){//学生列表
            listUserByRoleIdAndPage({
                roleId:4,
                pageSize:this.page.pageSize,
                pageNum:this.page.pageNum,
                schoolId:this.schoolId
            }).then( res => {
                this.loading = false;
                if (res.code == "0000") {
                    if (res.count > 0) {
                        this.schoolArr = res.data;
                    }
                    this.page.total = res.count;
                }
            })
        }
    },
    computed:{
        ...mapState({
            school:state=>state.user.school,
            userInfo:state=>state.user.user,
        })
    },
    mounted(){
        // console.log(this.school);
        this.schoolId = this.school.id;
        this.gradeId = this.userInfo.gradeId;
        this.getStuList();
    }
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
    .ivu-switch-checked:after{
        left: 33px !important;
    }
</style>