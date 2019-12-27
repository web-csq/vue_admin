<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="学校名称" prop="name" >
                <Input v-model="formValidate.name"  placeholder="请输入学校名称" />
            </FormItem>
            <FormItem label="学段" prop="sections">
                <Select v-model="formValidate.sections" placeholder="选择学段" disabled readonly>
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
                            <Select :label-in-value="true" v-model="formValidate.province" disabled readonly  >
                                <!-- <Option :value="item.id" v-for="item in formValidate.provinceList" :key="item.id">{{item.areaName}}</!--> -->
                                <Option :value="formValidate.province" selected>{{formValidate.provinceName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">省</Col>
                    <Col span="4" class="colWidth">
                        <FormItem>
                            <Select :label-in-value="true" v-model="formValidate.city" disabled readonly >
                                <!-- <Option :value="item.id" v-for="item in formValidate.cityList" :key="item.id">{{item.areaName}}</Option> -->
                                <Option :value="formValidate.city" selected>{{formValidate.cityName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">市</Col>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select :label-in-value="true" v-model="formValidate.county" disabled readonly  >
                                <!-- <Option :value="item.id" v-for="item in formValidate.countyList" :key="item.id">{{item.areaName}}</Option> -->
                                <Option :value="formValidate.county" selected>{{formValidate.countyName}}</Option>
                            </Select>
                        </FormItem>
                        
                    </Col>
                    <Col span="1" class="cWidth">区/县</Col><!---->
                </Row>
            </FormItem>
            <FormItem label="详细地址" prop="detalAdress">
                <Input v-model="formValidate.detalAdress" type="text"  placeholder="详细地址" />
            </FormItem>
            <FormItem label="订单类型" prop="gender" >
                <RadioGroup v-model="formValidate.gender" disabled>
                    <Radio label="false">学校自购</Radio>
                    <Radio label="true">公司投入</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">保存</Button>
                <Button @click="goBack" style="margin-left: 8px">返回上一页</Button>
            </FormItem>
        </Form>   
    </div>
</template>
<script>
import { getProvinceOrCityOrCountry, updateSchool } from '@/api/base'
export default {
    name:'addSchool',
    data(){
        return{
            schoolId:0,
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
                desc: '',//备注
                address:''//学校地址
            },
            ruleValidate: {
                name: [
                    { required: true, message: '学校名称不能为空', trigger: 'blur' }
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
            this.updataSchoolReq();//修改学校
        },
        handleReset (name) {//重置
            this.$refs[name].resetFields();
        },
        goBack(){
            this.$router.push('schoolList');
        },
        async updataSchoolReq(){//添加学校接口
            let datas = this.formValidate;
            updateSchool({
                address : datas.detalAdress,
                contactPerson : datas.userName,
                enabled : true,
                name : datas.name,
                orderType : datas.gender,
                phone : datas.phones,
                remark : datas.desc,
                section : datas.sections,
                id: this.schoolId
            }).then( res => {
                // console.log('修改学校',res);
                if(res.code == "0000"){
                    this.$Message.info({
                        content: res.message,
                        duration: 1
                    });
                    setTimeout( () => {
                        this.$router.push('SchoolList');//如果添加成功，则进入到学校列表
                    },1000)
                }
            })
        },
    },
    mounted(){
        console.log(this.$route.query.row)
        let parmesData = this.$route.query.row;
        this.schoolId = parmesData.id;
        this.formValidate = {
            name: parmesData.name,
            phones: parmesData.phone,
            userName: parmesData.contactPerson,
            sections: parmesData.section.toString(),//学段,
            gender: parmesData.orderType.toString(),
            province: parmesData.provinceId.toString(),//省份ID，
            provinceName: parmesData.provinceName,//省份名称
            city : parmesData.cityId.toString(),//市
            cityName: parmesData.cityName,
            county: parmesData.countyId.toString(),//县/区
            countyName: parmesData.countyName,
            detalAdress: parmesData.address,
            desc: parmesData.remark//备注
        }
        
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