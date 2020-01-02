<template>
    <div class="login-vue">
        <!-- 注册 -->
        <div class="contnets container">
            <p class="title">找回密码</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="用户名" prop="username">
                    <Input style="width:150px;" v-model="formValidate.username " placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="令牌" prop="token">
                    <Input style="width:150px;margin-right:5px;" v-model="formValidate.token " placeholder="点击发送获取令牌码" />
                    <Button type="primary" size='small' @click="sendReq" :loading='loading'>获取令牌</Button><br>
                    <span style="color:red;">（从邮箱中获取令牌码）</span>
                </FormItem>
                
                <FormItem label="新密码" prop="password">
                    <Input style="width:150px;" v-model="formValidate.password"  placeholder="请输入新密码" type="password" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" :loading='submitLoading'>提交</Button>
                    <Button @click="goBack" style="margin-left: 8px">返回登录页</Button>
                </FormItem>
            </Form>
        </div>
        
        <particles></particles>
        <web-footer></web-footer>
    </div>
</template>
<script>
import { retrievePassword,sendRetrievePasswordEmail } from "@/api/user"
import WebFooter from "./WebFooter/index"
import Particles from '@/components/Particles/index'

export default {
    name:'resetPwd',
    data(){
        return{
            loading:false,
            submitLoading:false,
            formValidate: {
                username : '',
                password:'',
                token:''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                token:[{required: true, message: '令牌码不能为空', trigger: 'blur'}]
            }
        }
    },
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if(this.formValidate.password.length < 6){
                    this.$Message.warning('密码不能小于6位');
                    return
                }
                if (valid) {
                    this.submitLoading = true
                    console.log( this.formValidate)
                    this.setretrievePassword(this.formValidate);
                } else {
                    this.$Message.error('基本数据不能为空');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        sendReq(){
            
            if(this.formValidate.username == ''){
                this.$Message.warning('用户名不能为空');
                return false
            }
            this.loading = true;
            this.getEmail();
        },
        goBack(){//返回登录页
            this.$router.push('login');
        },
        async setretrievePassword(obj){//提交
            retrievePassword(obj).then( res => {
                this.submitLoading = false
                if(res.code == "0000"){
                    this.$Message.success(res.message+',1s后将跳转到登录页');
                    setTimeout( ()=> {
                        this.$router.push('login');
                    },1000)    
                }
            })
        },
        async getEmail(){//发送邮箱找回密码
            sendRetrievePasswordEmail({
                username :this.formValidate.username
            }).then( res => {
                this.loading = false
                if(res.code == "0000"){
                    this.$Message.success(res.message+'前往邮箱中获取令牌码')     
                }
            })
        }
    },
    created(){

    },
    components:{
        WebFooter,
        Particles
    }
}
</script>
<style scoped>
    .contnets{
        width: 500px;
        margin: 100px auto 0;
    }
    .title{
        font-size: 16px;
        margin-bottom: 20px;
    }
</style>
<style lang="scss">
    $main_blue:#409EFF;
    .top-c{
    border-bottom:1px solid #ccc;
    }
    .top{
    max-width: 1680px;
    padding: 0 20px;
    margin:0 auto;
    justify-content: space-between;
    height:60px;
    img{
        width: 75px;
        height: 30px;
        margin: 0 10px 0 0 ;
    }
    .top-l{
        color: $main_blue;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
        .line{
        height: 42px;
        font-size:26px;
        font-weight: 400;
        margin: 0 20px;
        color: #666;
        }
        span{
        color: #666;
        }
        .el-icon-menu{
        color: #666;
        font-size: 28px;
        margin: 0px 5px 0 0;
        }
    }
    .top-right{
        border: 1px solid #dadada;
        border-radius:18px;
        background-color: #f8f9f9;
        padding: 8px 20px;
    }
    }
    .hove:hover .el-icon-menu,.hove:hover span{
    color: #409EFF;
    }
    .section{
    min-height:100vh;
    padding: 15px;
    background-color: #F0F2F5;
    .sction-b{
        padding: 15px;
        max-width:1680px;
        margin:0 auto; 
        background-color: #fff;
    }
    }
    .nav-c{
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    
    }
    .nav-box{
    display: flex;
    align-items: center;
    width: 33.33%;
    padding: 10px;
    /*text-align: center;*/
    cursor: pointer;
    img{
        width: 60px;
        margin: 0 10px 0 0;
    }
    h4{
        font-size: 18px;
        font-weight: 400;
    }
    }

    .nav-box:hover{
    background-color: #f0f0f0;
    }
    /**
    重写fade
    */
    .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0px;
    }
    .login-vue {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .login-vue .container {
        background: rgba(255, 255, 255, .2);
        width: 400px!important;
        text-align: center;
        border-radius: 10px;
        padding: 30px;
        margin-top:0rem;
        position: relative;
        z-index: 2;
    }
    .ivu-form-item-content{
        text-align: left;
    }
    .ivu-form .ivu-form-item-label{
        color: #fff;
    }
</style>