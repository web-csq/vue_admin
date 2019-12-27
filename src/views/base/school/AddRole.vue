<template>
    <div>
        <!-- 管理员----添加教师或者学生 -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="角色" prop="roles">
                <RadioGroup v-model="formValidate.roles" @on-change="changeRoles">
                    <Radio label="3">教师</Radio>
                    <Radio label="4">学生</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="姓名" prop="trueName">
                <Input v-model="formValidate.trueName" placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="用户名" prop="userName">
                <Input v-model="formValidate.userName" placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="联系电话" prop="phones" v-if="teaShow">
                <Input v-model="formValidate.phones" placeholder="请输入联系电话" type="number" />
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入密码，若该项不写，默认密码为123456" />
            </FormItem>
            <FormItem label="学科" prop="subject" v-if="teaShow">
                <Select style="width:200px;" :label-in-value="true" v-model="formValidate.subject" placeholder="选择学科" @on-change="selsubject">
                    <Option :value="item.id" v-for="item in formValidate.subjectList" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <!-- 学生-所在年级 -->
            <FormItem label="所在班级" prop='stuGrade' v-if="stuShow">
                <Row>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.stuGrade" placeholder="选择年级" @on-change="stuGradeFn">
                                <Option :value="item.id" v-for="item in formValidate.stuGradeList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">（年级）</Col>
                    <Col span="4" class="colWidth" >
                        <FormItem>
                            <Select :label-in-value="true" v-model="formValidate.stuClass" placeholder="选择班级" @on-change='stuClassFn'>
                                <Option :value="item.id" v-for="item in formValidate.stuClassList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth" >（班级）</Col>
                </Row>
            </FormItem>
            
            <!-- 老师-所在年级 -->
            <FormItem label="执教年级" prop="teaSelGrade" v-if="teaShow">
                <Select style="width:200px;" :label-in-value="true" v-model="formValidate.teaSelGrade" placeholder="选择年级" @on-change='selTeaGrade'>
                    <Option :value="item.id" v-for="item in formValidate.teaGradeList" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="0">女</Radio>
                    <Radio label="1">男</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="身份证号" prop="card">
                <Input v-model="formValidate.card" placeholder="请输入身份证号" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>   
    </div>
</template>
<script>
import { getProvinceOrCityOrCountry, insertMunicipalAdministrator } from '@/api/base'
export default {
    name:'addRole',
    data(){
        return{
            teaShow:true,//老师
            stuShow:false,//学生
            roleId:3,//角色Id
            formValidate: {
                trueName: '', //学校名
                phones: '', // 联系方式
                userName:'',//联系人
                sex: '0',//性别
                roles: '3', //角色
                subject:'',//学科
                subjectList: [
                    {id:1,name:'语文'},
                    {id:2,name:'数学'},
                ],//学科列表
                stuGrade:'',//学生--年级
                stuClass:'',//学生--班级
                teaSelGrade:"",//教师--年级
                stuGradeList:[
                    {id:1,name:'高一'},
                    {id:2,name:'高二'},
                    {id:3,name:'高三'}
                ],//年级列表
                stuClassList:[
                    {id:1,name:'高一1班'},
                    {id:2,name:'高一2班'},
                    {id:3,name:'高一3班'}
                ],//学生列表
                teaGradeList:[
                    {id:1,name:'高一'},
                    {id:2,name:'高二'},
                    {id:3,name:'高三'}
                ],//教师-年级
                card: '',//身份证
                password:'',
            },
            ruleValidate: {
                trueName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                userName:[
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                phones: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur' }
                ],
                roles: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                subject:[
                    { required: true ,message: '', trigger: 'change' }
                ],
                stuGrade:[{required: true,message: '', trigger: 'change' }],
                teaSelGrade:[{required:true,message: '', trigger: 'change' }]
            }
        }
    },
    methods:{
        handleSubmit () {//提交
            if(this.formValidate.phones.length < 11){
                this.$message.error('电话号码格式不正确');
                return false;
            }
            if(this.formValidate.trueName == '' || this.formValidate.userName == '' || this.formValidate.provinceName == ''){
                this.$message.error('基本数据不能为空');
                return false;
            }
            let obj = {};
            let datas = this.formValidate;
            obj.truename = datas.trueName;
            obj.username = datas.userName;
            obj.phone = datas.phones;
            
            obj.enabled = true;
            obj.provinceId = datas.province;
            obj.provinceName = datas.provinceName;
            obj.sex = datas.sex;
            if(datas.password == ''){
                obj.password = 123456;
            }else{
                obj.password = datas.password;
            }
            if(datas.card != ''){
                obj.card = datas.card;
            }

            if(this.roleId == 3){//老师
                // this.addProAdminReq(obj);//添加省/市/县管理员
            }else if(this.roleId == 4){//市
                if(this.formValidate.cityName == ''){
                    this.$message.error('基本数据不能为空');
                    return false;
                }
                obj.cityId = datas.city;
                obj.cityName = datas.cityName;
                // this.addCityAdminReq(obj);
            }
            
            
        },
        handleReset (name) {//重置
            this.$refs[name].resetFields();
        },
        changeRoles(value){//当前选择角色
            console.log('======',value);
            this.roleId = value;
            if(value == 3){//老师
                this.teaShow = true;
                this.stuShow = false;
            }else if(value == 4){//学生
                this.stuShow = true;
                this.teaShow = false;
            }
        },
        selsubject(value){//选择学科
            console.log('学科',value)
        },
        stuGradeFn(){//学生--年级

        },
        stuClassFn(){//学生--班级

        },
        selTeaGrade(){//教师--年级

        },
        async addCityAdminReq(obj){//添加市 管理员
            insertMunicipalAdministrator(obj).then( res => {
                // console.log('添加市管理员',res);
                if(res.code == "0000"){
                    this.$Message.info({
                        content: res.message,
                        duration: 1
                    });
                }
                setTimeout( () => {
                    this.$router.push('adminPCList');//如果添加成功，则进入到管理员列表
                },1000)
            })
        },
        async addCountryAdminReq(obj){
            insertCountyAdministrator(obj).then( res => {
                // console.log('添加县管理员',res);
                if(res.code == "0000"){
                    this.$Message.info({
                        content: res.message,
                        duration: 1
                    });
                }
                setTimeout( () => {
                    this.$router.push('adminPCList');//如果添加成功，则进入到管理员列表
                },1000)
            })
        }
    },
    mounted(){

    },
    created(){
        
    }
}
</script>

<style scoped>
    .colWidth{
        min-width: 100px;
    }
    .cWidth{
        padding-left:5px;
        min-width:35px;
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