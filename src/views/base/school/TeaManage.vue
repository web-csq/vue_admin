<template>
    <div>
        年级级管理下的 --- 教师信息
        <div>

            <!-- 上传文件 -->
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
                <Button icon="ios-cloud-upload-outline" type="primary">批量导入教师</Button>
            </Upload>
            <!-- <Button
                class=" right-10"
                icon="ios-cloud-download"
                type="primary"
                @click="downloadFile('档案模板')"
            >下载模板</Button> -->
            <Button
                class=" right-10"
                icon="ios-cloud-download"
                type="primary"
            >下载模板</Button>
            <Button style="margin-left:10px;" @click="addStu">新增教师</Button>
        </div>

        <Table
        :columns="columns1"
        :data="schoolArr"
        >
            <!--操作-->
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small"  @click="updata(index,row)">修改信息</Button>
                <Button type="success" size="small" style="margin: 0 5px" @click="overSet(index)">重置密码</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
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

    </div>
</template>

<script>
export default {
    name:"teaManage",
    data(){
        return {
            addStuModal:false,
            updataModal:false,//修改学生模态框
            page:{
                pageNum:1,
                pageSize:10,
                total:100
            },//分页
            uploadData:{//上传文件所须参数
                merchantCode:'',
            },
            columns1: [
                {
                    title: '学号',
                    key: 'id',
                    align: 'center',
                    width: 90
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    minWidth:200
                },
                {
                    title: '班级',
                    key: 'className',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '账号',
                    key: 'userName',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '是否可以',
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
            schoolArr:[
                {
                    id:7,
                    name: '李斯',
                    className: '高一1班',
                    userName: 'zhangsan1',
                    gradeId: '1',
                    classId:'1',
                    status:1
                },
                {
                    id:8,
                    name: 'Jim Green',
                    className: '高一1班',
                    classId:'1',
                    userName: 'zhangsan2',
                    gradeId: '1',
                    status:0
                },
                {
                    id:9,
                    name: 'Joe Black',
                    className: '高一1班',
                    userName: 'zhangsan3',
                    gradeId: '3',
                    status:1,
                    classId:'2',
                },
                {   
                    id:10,
                    name: '张三仪',
                    className: '高一1班',
                    userName: 'zhangsan4',
                    gradeId: '2',
                    status:0,
                    classId:'1',
                }
            ],
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
        }
    },
    methods:{
        nextPageNum(i){//页码改变的回调，返回改变后的页码
            this.page.pageNum = i;
            console.log('当前页',this.page.pageNum);
        },
        nextPageSize(size){//切换每页条数时的回调，返回切换后的每页条数
            this.page.pageSize = size;
            console.log('每条数据',this.page.pageSize);
        },
        switch(idx){//开关
            console.log(11+idx);
        },
        remove(index){//删除
            console.log(index);
            let resMessage = '操作成功';
            this.$Message.success(resMessage);//删除成功
            // this.$Message.error('This is an error tip');//删除失败
        },
        overSet(index){//重置密码
            
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
    .ivu-switch-checked:after {
        left: 32px;
    }
</style>