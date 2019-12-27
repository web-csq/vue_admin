<template>
    <div>
        <!-- 管理员添加省市管理员角色 -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="角色" prop="roles">
                <RadioGroup v-model="formValidate.roles" @on-change="changeRoles">
                    <Radio label="7">省级管理员</Radio>
                    <Radio label="8">市级管理员</Radio>
                    <Radio label="9">区（县）级管理员</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="姓名" prop="trueName">
                <Input v-model="formValidate.trueName" placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="用户名" prop="userName">
                <Input v-model="formValidate.userName" placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="联系电话" prop="phones">
                <Input v-model="formValidate.phones" placeholder="请输入联系电话" type="number" />
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入密码，若该项不写，默认密码为123456" />
            </FormItem>
            <FormItem label="所在地区" prop='address'>
                <Row>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.province" placeholder="选择省" @on-change="selProvince">
                                <Option :value="item.id" v-for="item in formValidate.provinceList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">省</Col>
                    <Col span="4" class="colWidth" v-if="cityShow">
                        <FormItem>
                            <Select :label-in-value="true" v-model="formValidate.city" placeholder="选择市" @on-change='selCity'>
                                <Option :value="item.id" v-for="item in formValidate.cityList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth" v-if="cityShow">市</Col>
                    <Col span="4" class="colWidth" v-if="countryShow">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.county" placeholder="选择市" @on-change='selCountry'>
                                <Option :value="item.id" v-for="item in formValidate.countyList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                        
                    </Col>
                    <Col span="1" class="cWidth" v-if="countryShow">区/县</Col><!---->
                </Row>
            </FormItem>
            <!-- <FormItem label="详细地址" prop="detalAdress">
                <Input v-model="formValidate.detalAdress" type="text"  placeholder="详细地址" />
            </FormItem> -->
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="0">女</Radio>
                    <Radio label="1">男</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <!-- <Input v-model="formValidate.email" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /> -->
                <Input v-model="formValidate.email" type="email" placeholder="请输入邮箱" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>   
    </div>
</template>
<script>
import { getProvinceOrCityOrCountry, insertProvincialAdministrator, insertMunicipalAdministrator, insertCountyAdministrator } from '@/api/base'
export default {
    name:'addAdmin',
    data(){
        return{
            cityShow:true,//市默认显示
            countryShow:true,//区/县默认显示
            roleId:9,//角色Id
            formValidate: {
                trueName: '', //学校名
                phones: '', // 联系方式
                userName:'',//联系人
                sex: '0',//性别
                roles: '9', //角色
                province:'',
                provinceName:'',
                city: '', // 市
                cityName: '', // 市
                county: '', // 区（县）
                countyName: '', // 区（县）
                provinceList: [],//省份
                cityList:[],//市
                countyList:[],//区/县
                email: '',//邮箱
                password:'',
                address:''//学校地址
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
                address:[
                    { required: true }
                ],
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
            if(datas.email != ''){
                obj.email = datas.email;
            }

            if(this.roleId == 7){//省
                this.addProAdminReq(obj);//添加省/市/县管理员
            }else if(this.roleId == 8){//市
                if(this.formValidate.cityName == ''){
                    this.$message.error('基本数据不能为空');
                    return false;
                }
                obj.cityId = datas.city;
                obj.cityName = datas.cityName;
                this.addCityAdminReq(obj);
            }else if(this.roleId == 9){//县/区
                if(this.formValidate.cityName == '' || this.formValidate.countyName == ''){
                    this.$message.error('基本数据不能为空');
                    return false;
                }
                obj.cityId = datas.city;
                obj.cityName = datas.cityName;
                obj.countryId = datas.county;
                obj.countryName = datas.countyName;
                this.addCountryAdminReq(obj);
            }
            
            
        },
        handleReset (name) {//重置
            this.$refs[name].resetFields();
        },
        changeRoles(value){//当前选择角色
            this.roleId = value;
            if(value == 7){//省
                this.cityShow = false;
                this.countryShow = false;
            }else if(value == 8){//市
                this.cityShow = true;
                this.countryShow = false;
            }else if(value == 9){//县/区
                this.cityShow = true;
                this.countryShow = true;
            }
        },
        async getProvince(){//省份parentId
            getProvinceOrCityOrCountry({
                parentId:0
            }).then( res => {
                let provinceData = JSON.parse(res.data).showapi_res_body;
                this.formValidate.provinceList = provinceData.data
            })
        },
        async getCity(value){//市
            getProvinceOrCityOrCountry({
                parentId:value
            }).then( res => {
                let cityData = JSON.parse(res.data).showapi_res_body;
                this.formValidate.cityList = cityData.data
            })
        },
        async getCounty(value){//县/区
            getProvinceOrCityOrCountry({
                parentId:value
            }).then( res => {
                let countyData = JSON.parse(res.data).showapi_res_body;
                this.formValidate.countyList = countyData.data
            })
        },
        selProvince(data){//根据省得到市
            this.formValidate.provinceName = data.label;
            this.formValidate.province = data.value;
            this.getCity(data.value);
        },
        selCity(data){//根据市 得到县/区
            this.formValidate.city = data.value;
            this.formValidate.cityName = data.label;
            this.getCounty(data.value);
        },
        selCountry(data){
            this.formValidate.county = data.value;
            this.formValidate.countyName = data.label;
        },
        async addProAdminReq(obj){//添加省 管理员
            insertProvincialAdministrator(obj).then( res => {
                // console.log('添加省管理员',res);
                if(res.code == "0000"){
                    this.$Message.info({
                        content: res.message,
                        duration: 1
                    });
                }
                setTimeout( () => {
                    this.$router.push('adminProList');//如果添加成功，则进入到管理员列表
                },1000)
            })
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
                    this.$router.push('adminCityList');//如果添加成功，则进入到管理员列表
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
                    this.$router.push('adminCountryList');//如果添加成功，则进入到管理员列表
                },1000)
            })
        }
    },
    mounted(){
        this.roleId = this.$route.query.id.toString();
        this.formValidate.roles = this.$route.query.id.toString();
        if (this.roleId == 7) {//省
            this.cityShow = false;
            this.countryShow = false;
        }else if (this.roleId == 8) {//市
            this.cityShow = true;
            this.countryShow = false;
        }
        console.log(this.roleId)
        this.getProvince();
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