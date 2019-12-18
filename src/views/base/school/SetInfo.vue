<template>
    <div>
        <!-- 设置班级信息 -->
        学校---设置年级信息
        <!-- 年级列表 -->
        <Table border :columns="columnsHead" :data="listData">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" @click="witchs(index,row)">查看</Button>
                <Button type="primary" size="small" style="margin: 0 5px" @click="addClass(index,row)">新增班级</Button>
                <Button type="primary" size="small" @click="addAdmin(index)">新增年级管理员</Button>
            </template>
        </Table>

        <!--新增年级管理员-模态框-->
        <Modal
        v-model="addAdminModal"
        title="新增年级管理员"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form  ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formItem.name" placeholder="" />
                </FormItem>
                <FormItem label="用户名" prop="users">
                    <Input v-model="formItem.users" placeholder="" />
                </FormItem>
                <FormItem label="密码" prop="pwd">
                    <Input v-model="formItem.pwd" type="password" placeholder="" />
                </FormItem>
                <FormItem label="手机号">
                    <Input v-model="formItem.phone" type="number" placeholder="" />
                </FormItem>
                <FormItem label="身份证号">
                    <Input v-model="formItem.card"  placeholder="" />
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.sexRadio">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <!-- 添加班级数 管理员 -->
        <Modal
        v-model="addClassCountModal"
        title="新增年级管理员"
        @on-ok="addOk"
        @on-cancel="addCancel">
            新增班级数：<InputNumber  :min="1" :step="1" v-model="classCount" size="large" @on-change="changInp"></InputNumber>    
        </Modal>


    </div>
</template>
<script>
export default {
    name:"setInfo",
    data(){
        return{
            addAdminModal:false,//添加年级管理员
            addClassCountModal:false,//添加班级
            classCount:0,
            columnsHead:[
                {
                    title: '年级',
                    key: 'gradeName',
                    align:'center'
                },
                {
                    title: '班级数',
                    key: 'count',
                    align:'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    minWidth: 300,
                    align: 'center'
                }
            ],
            listData:[
                { id:1,gradeName:'高一',count:0},
                { id:2,gradeName:'高二',count:15},
                { id:3,gradeName:'高三',count:5}
            ],
            formItem:{
                name:'',//名字
                users:'',//用户名
                pwd:'',//密码
                card:'',//身份证号
                phone:'',//手机号
                sexRadio:'0',//性别
            },
            ruleValidate:{
                name:[
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                users:[
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        witchs(index,rows){//查看 班级详情
            console.log(index);
            console.log(rows);
            if(rows.count == '0'){
                this.$Notice.warning({
                    title: '提示',
                    desc: '亲，'+ rows.gradeName +'年级暂未设置班级数，不能查看该年级的详细信息',
                    duration: 1.5
                });
                return false;
            }
            this.$router.push('gradeInfo');
        },
        addClass(index,rows){//新增 班级
            console.log(index,rows);
            this.classCount = 0;
            this.addClassCountModal = !this.addClassCountModal;

        },
        addAdmin(index){//新增年级管理员
            console.log(index);
            this.clearModel('formValidate');
            this.addAdminModal = !this.addAdminModal;

        },
        clearModel(name){//重置模态框
            this.$refs[name].resetFields();
        },
        ok(){//模特框的  确定按钮
            console.log('所有数据填充完毕，调用添加年级管理员接口');
        },
        cancel(){// 模态框 取消按钮

        },
        changInp(){//得到input框的数据
            console.log(this.classCount);
        },
        addOk(){//添加班级数量,添加成功 调用  
            console.log('数量必须为正整数'+ this.classCount);
            
        },
        addCancel(){},

    },
    mounted(){
        
    }
}
</script>
<style scoped>
    
</style>