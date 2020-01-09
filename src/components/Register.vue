<template>
    <div class="login-vue">
        <!-- 注册 -->
        <div class="contnets container">
            <p class="title">注册</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名" />
                </FormItem>
                <FormItem label="E-mail邮箱" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱" />
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入手机号"  />
                </FormItem>
                <FormItem label="备注" prop="content">
                    <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入备注..." />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回登录页</Button>
                </FormItem>
            </Form>
        </div>
        
        <particles></particles>
        <web-footer></web-footer>
    </div>
</template>
<script>
import { contactUs } from "@/api/user"
import WebFooter from "./WebFooter/index"
import Particles from '@/components/Particles/index'

export default {
    name:'register',
    data(){
        return{
            loading:false,
            formValidate: {
                name: '',
                mail: '',
                phone:'',
                content: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入申请理由', trigger: 'blur' },
                    { type: 'string', max: 200, message: '不能超过200字', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if(this.formValidate.tel.length != 11){
                    this.$Message.warning('手机号格式不正确');
                    return
                }
                if (valid) {
                    // console.log(this.formValidate);
                    this.loading = true
                    this.reginerInfo(this.formValidate);
                } else {
                    this.$Message.error('基本数据不能为空');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
            this.$router.push('login');
        },
        async reginerInfo(obj){//注册
            contactUs(obj).then( res => {
                this.loading = false;
                if(res.code == "0000"){
                    this.$Message.success(res.message)     
                }
            })
        },
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
    text-align: center;
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
        width: 450px;
        text-align: center;
        border-radius: 10px;
        padding: 30px;
        margin-top:0rem;
        position: relative;
        z-index: 2;
    }
    .ivu-form .ivu-form-item-label{
        color: #fff!important;
    }
</style>
