<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="学校名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入学校名称" />
            </FormItem>
            <FormItem label="学段" prop="sections">
                <Select v-model="formValidate.sections" placeholder="选择学段">
                    <Option value="1">初中</Option>
                    <Option value="2">高中</Option>
                    <Option value="3">小学</Option>
                </Select>
            </FormItem>
            <FormItem label="联系电话" prop="phones">
                <Input v-model="formValidate.phones" placeholder="请输入联系电话" type="number" />
            </FormItem>
            <FormItem label="联系老师" prop="userName">
                <Input v-model="formValidate.userName" placeholder="请输入联系人" />
            </FormItem>
            <FormItem label="学校地址" prop='address'>
                <Row>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.province" placeholder="选择省" @on-change="selProvince">
                                <Option :value="item.id" v-for="item in formValidate.provinceList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">省</Col>
                    <Col span="4" class="colWidth">
                        <FormItem>
                            <Select :label-in-value="true" v-model="formValidate.city" placeholder="选择市" @on-change='selCity'>
                                <Option :value="item.id" v-for="item in formValidate.cityList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">市</Col>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.county" placeholder="选择市" @on-change='selCountry'>
                                <Option :value="item.id" v-for="item in formValidate.countyList" :key="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                        
                    </Col>
                    <Col span="1" class="cWidth">区/县</Col><!---->
                </Row>
            </FormItem>
            <FormItem label="详细地址" prop="detalAdress">
                <Input v-model="formValidate.detalAdress" type="text"  placeholder="详细地址" />
            </FormItem>
            <FormItem label="订单类型" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="false">学校自购</Radio>
                    <Radio label="true">公司投入</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注信息..." />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>   
    </div>
</template>
<script>
import { getProvinceOrCityOrCountry, insertSchool } from '@/api/base'
export default {
    name:'addSchool',
    data(){
        return{
            formValidate: {
                name: '', //学校名
                phones: '', // 联系方式
                userName:'',//联系人
                sections: '0',//学段
                gender: 'false',
                province:'',
                provinceName:'',
                city: '', // 市
                cityName: '', // 市
                county: '', // 区（县）
                countyName: '', // 区（县）
                detalAdress:'',//详细地址
                provinceList: [],//省份
                cityList:[],//市
                countyList:[],//区/县
                desc: '',//备注
                address:''//学校地址
            },
            ruleValidate: {
                name: [
                    { required: true, message: '学校名称不能为空', trigger: 'blur' }
                ],
                userName:[
                    {required: true, message: '联系人不能为空', trigger: 'blur'}
                ],
                phones: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur' }
                ],
                sections: [
                    { required: true, message: '学段不能为空', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请选择订单类型', trigger: 'change' }
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
            if(this.formValidate.name == "" || this.formValidate.userName == "" || this.formValidate.provinceName == "" || this.formValidate.countyName == "" || this.formValidate.cityName == "" || this.formValidate.sections == '0'){
                this.$message.error('基本信息不能为空');
                return false;
            }
            this.addSchoolReq();//添加学校
        },
        handleReset (name) {//重置
            this.$refs[name].resetFields();
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
        async addSchoolReq(){//添加学校接口
            let datas = this.formValidate;
            insertSchool({
                address : datas.detalAdress,
                cityId : datas.city,
                cityName : datas.cityName,
                contactPerson : datas.userName,
                countyId : datas.county,
                countyName : datas.countyName,
                enabled : true,
                name : datas.name,
                orderType : datas.gender,
                phone : datas.phones,
                provinceId : datas.province,
                provinceName : datas.provinceName,
                remark : datas.desc,
                section : datas.sections
            }).then( res => {
                // console.log('添加学校',res);
                
                if(res.code == "0000"){
                    this.$Message.info({
                        content: res.message,
                        duration: 1
                    });
                    setTimeout( () => {
                        this.$router.push('schoolList');//如果添加成功，则进入到学校列表
                    },1000)
                }
                
            })
        },
    },
    mounted(){
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