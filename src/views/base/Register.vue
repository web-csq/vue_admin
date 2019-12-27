<template>
    <div class="contnets">
        <!-- 注册 -->
        注册 
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="E-mail邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱" />
            </FormItem>
            <FormItem label="手机号" prop="tel">
                <Input v-model="formValidate.tel" placeholder="请输入手机号"  />
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="Enter something..." />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <web-footer></web-footer>
    </div>
</template>
<script>
import { contactUs } from "@/api/user"
import WebFooter from "@/components/WebFooter/index"

export default {
    name:'register',
    data(){
        return{
            formValidate: {
                name: '',
                mail: '',
                tel:'',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                ],
                desc: [
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
                    console.log(valid);
                    console.log(this.formValidate);
                    this.reginerInfo(this.formValidate);
                } else {
                    this.$Message.error('基本数据不能为空');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        async reginerInfo(obj){//注册
            contactUs(obj).then( res => {
                if(res.code == "0000"){
                    this.$Message.success(res.message)     
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
    },
    created(){

    },
    components:{
        WebFooter
    }
}
</script>
<style scoped>
    .contnets{
        width: 500px;
        margin: 50px auto;
    }
</style>