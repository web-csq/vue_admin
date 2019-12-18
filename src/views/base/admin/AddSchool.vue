<template>
    <div>
        管理员--添加学校以及学校管理员
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
                            <Select v-model="formValidate.province" placeholder="选择省" @on-change="getProvince">
                                <Option :value="item.id" v-for="item in formValidate.provinceList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">省</Col>
                    <Col span="4" class="colWidth">
                        <FormItem>
                            <Select v-model="formValidate.city" placeholder="选择市" @on-change='getCity'>
                                <Option :value="item.id" v-for="item in formValidate.cityList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="1" class="cWidth">市</Col>
                    <Col span="4" class="colWidth">
                        <FormItem >
                            <Select v-model="formValidate.county" placeholder="选择市" @on-change='getCounty'>
                                <Option :value="item.id" v-for="item in formValidate.countyList" :key="item.id">{{item.name}}</Option>
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
                    <Radio label="male">学校自购</Radio>
                    <Radio label="female">公司投入</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>   
    </div>
</template>
<script>
export default {
    name:'addSchool',
    data(){
        return{
            formValidate: {
                name: '', //学校名
                phones: '', // 联系方式
                userName:'',//联系人
                sections: '',//学段
                gender: '',
                province:'',
                city: '', // 市
                county: '', // 区（县）
                detalAdress:'',//详细地址
                provinceList: [
                    {id:1,name:'河南'},
                    {id:2,name:'北京'},
                    {id:3,name:'上海'},
                    {id:4,name:'湖北'}
                ],//省份
                cityList:[
                    {id:100,name:'郑州'},
                    {id:102,name:'焦作'},
                    {id:103,name:'洛阳'}
                ],
                countyList:[
                    {id:10001,name:'高新区'},
                    {id:10002,name:'经开区'}
                ],
                desc: '',//备注
                address:''//学校地址
            },
            ruleValidate: {
                name: [
                    { required: true, message: '学校名称不能为空', trigger: 'blur' }
                ],
                phones: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur' },
                    { type: 'number', message: 'Incorrect ephones format', trigger: 'blur' }
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
            console.log('提交');
            // this.$router.push('SchoolList');//如果添加成功，则进入到学校列表
        },
        handleReset (name) {//重置
            this.$refs[name].resetFields();
        },
        getProvince(value){//省份
            console.log('省：',value);
        },
        getCity(value){//市
            console.log('市：',value);
        },
        getCounty(value){//县/区
            console.log('区：',value);
        },
        addSchoolReq(){//添加学校接口
            
        }
    },
    mounted(){

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