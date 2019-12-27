<template>
    <div class="content">
        <!-- 个人设置 -->
        <span>基本信息</span>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="trueName">
                <Input v-model="formValidate.trueName" placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="用户名" prop="userName">
                <Input v-model="formValidate.userName" placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="联系电话" prop="phones">
                <Input v-model="formValidate.phones" placeholder="请输入联系电话" type="number" />
            </FormItem>
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="false">女</Radio>
                    <Radio label="true">男</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="身份证号" prop="idCard">
                <Input v-model="formValidate.idCard"  placeholder="请输入身份证号" />
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" type="email" placeholder="请输入邮箱" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit" :loading="btnLoading">保存</Button>
            </FormItem>
        </Form> 
        <!-- <span>修改头像</span>
        <div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                action="/api/user/changePic"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" >
                <img src="https://o5wwk8baw.qnssl.com/"  style="width: 100%">
            </Modal>
        </div> -->
        <span>修改密码</span> 
        <Form :model="formPwd" :rules="rulesPwd" :label-width="100">
            <FormItem label="旧密码" prop='oldPwd'>
                <Input v-model="formPwd.oldPwd" type="password" placeholder="请输入旧密码" />
            </FormItem>
            <FormItem label="新密码" prop="newPwd">
                <Input v-model="formPwd.newPwd" type="password" placeholder="请输入新密码" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitPwd" :loading="pwdLoading">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { changePic, changePassword, updateUserByIdSelected } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
export default {
    name:'personal',
    data(){
        return{
            defaultList:[
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                }
            ],
            userId:0,
            btnLoading:false,
            pwdLoading:false,
            formValidate:{
                trueName:'',
                userName:'',
                phones:'',
                sex:'false',
                idCard:'',
                email:'',

            },//基本信息
            formPwd:{
                oldPwd:'',
                newPwd:'',
            },
            rulesPwd:{
                oldPwd: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                ],
            },
            ruleValidate:{
                trueName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                phones:[{
                    required: true, message: '手机号不能为空', trigger: 'blur'
                }],
                
            },
        }
    },
    methods:{
        ...mapMutations("user",["CHANGEUSER"]),
        submitPwd(){//保存密码
            if(this.formPwd.newPwd == '' || this.formPwd.oldPwd == ''){
                this.$Message.warning('旧密码或新密码不能为空');
                return;
            }
            this.btnLoading = true;
            this.resetPwd(this.formPwd.newPwd,this.formPwd.oldPwd);
        },
        handleSubmit(){//提交修改
            let updataUser = {};
            updataUser.id = this.userInfo.id;
            if(this.formValidate.email != ''){
                updataUser.email = this.formValidate.email; 
            }
            console.log(this.formValidate.idCard);
            if(this.formValidate.idCard != ''){
                updataUser.identityCardNumber = this.formValidate.idCard;
                
            }
            this.btnLoading = true;
            updataUser.phone = this.formValidate.phones;
            updataUser.sex = this.formValidate.sex;
            updataUser.truename = this.formValidate.trueName;
            updataUser.username = this.formValidate.userName;
            this.setUpdateUserByIdSelected(updataUser);
        },
        handleSuccess(res,file){
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError(file){
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file){
            this.$Notice.warning({
                title: '图片大小',
                desc: '图片  ' + file.name + ' 太大,不能超过 2M.'
            });
        },
        handleBeforeUpload(){//上传1张
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        async resetPic(){//修改头像
            changePic({
                pic:'',
                userId:this.userId
            }).then( res => {
                if(res.code == "0000"){
                    this.$Message.success(res.message);
                }else{
                    this.$Message.error(res.message)
                }
            })
        },
        async resetPwd(newPwd,oldPwd){//修改密码
            changePassword({
                newPassword:newPwd,
                oldPassword:oldPwd,
                userId:this.userId
            }).then( res => {
                this.pwdLoading = false;
                if (res.code == "0000") {
                    this.$message.success('修改密码设置'+res.message);
                }else{
                    this.$Message.error(res.message)
                }
                
            })
        },
        async setUpdateUserByIdSelected(obj){
            updateUserByIdSelected(obj).then( res => {
                this.btnLoading = false;
                if(res.code == '0000'){
                    this.$Message.success('基本信息修改保存成功');
                    this.userInfo.username = this.formValidate.userName;    
                    this.userInfo.truename = this.formValidate.trueName;    
                    this.userInfo.phone = this.formValidate.phones;    
                    this.userInfo.email = this.formValidate.email;    
                    this.userInfo.identityCardNumber = this.formValidate.idCard;    
                    this.userInfo.sex = this.formValidate.sex;  
                    this.CHANGEUSER({
                        truename:this.userInfo.truename 
                    })
                }else{
                    this.$Message.error('基本信息修改保存失败');
                }
            })
        }
    },
    watch: {
        
    },
    computed:{
        ...mapState({
            userInfo:state=>state.user.user,
            schoolInfo:state=>state.user.school,
        })
    },
    mounted(){
        // console.log(this.userInfo);
        // this.uploadList = this.$refs.upload.fileList;
    },
    created(){
        let users = this.userInfo;
        this.userId = this.userInfo.id;
        this.formValidate = {
            trueName:users.truename,
            userName:users.username,
            phones:users.phone,
            email:users.email,
            idCard:users.identityCardNumber,
            sex:users.sex.toString(),
        }
    }
    
}
</script>
<style scoped>
    
    .content{
        width: 500px;
        margin-left: 50px;
    }
</style>
<style >
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>