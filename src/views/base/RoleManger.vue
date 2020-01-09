<template>
  <div>
    <div>
      角色列表：
      <div class="tab-container">
        <Table border :columns="columns" class="table" :data="tableData" :loading="loading">
          <template slot-scope="{ row }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="alter(row)">修改</Button>
              <Button type="error" size="small" @click="premiss(row)">授权</Button>
          </template>
        </Table>
      </div>
      <div style="margin:20px 0 0 0">
        <Button type="primary" size="small" style="margin-right: 5px" @click="add()">新增角色</Button>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible"
      width="40%">
      <Form ref="formValidate1" :model="alterInfo" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称：" prop="name">
            <Input v-model="alterInfo.name" placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="值：" prop="value">
            <Input v-model="alterInfo.value" placeholder="请输入角色值" />
        </FormItem>
        <FormItem label="描述：" prop="description">
            <Input v-model="alterInfo.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入角色描述" />
        </FormItem>
        <FormItem label="是否启用：" prop="isDelete">
           <el-switch v-model="alterInfo.isDeleted"></el-switch>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="alterSubmit('formValidate1')">提交</Button>
            <Button @click="dialogVisible=false" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </el-dialog>
    <!-- 添加角色弹窗 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addVisible"
      width="40%">
      <Form ref="formValidate" :model="role" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称：" prop="name">
            <Input v-model="role.name" placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="值：" prop="value">
            <Input v-model="role.value" placeholder="请输入角色值" />
        </FormItem>
        <FormItem label="描述：" prop="description">
            <Input v-model="role.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入角色描述" />
        </FormItem>
        <FormItem label="是否启用：" prop="isDelete">
           <el-switch v-model="role.isDeleted"></el-switch>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="addVisible=false" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </el-dialog>
    <!-- 授权弹窗 -->
    <el-dialog title="授权" :visible.sync="authorVisible">
      <div class="tree-c">
        <div class="tree">
        <div class="rc-t">{{roleInfo.name+"--->"}} 权限列表：</div>
        <el-tree
          :data="treeData"
          accordion
          ref="tree"
          show-checkbox
          :default-checked-keys="checkedList"
          default-expand-all
          check-on-click-node
          node-key="id"
          :expand-on-click-node="false"
        >
          </el-tree>
        </div>
      </div>
      <Button type="primary" size="small" @click="submitPremiss">授权</Button>
      
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionsForRoleId,authorization,listAllRoles,insertRole,updateRoleByIdSelective } from "@/api/permission"
let _this;
export default {
  name:"role",
  data(){
    return{
      loading:false,
      authorVisible:false,
      row:{},
      checkedList:[],
      role:{
        name:"",
        value:"",
        description:"",
        isDeleted:true,
      },
      alterInfo:{
        name:"",
        value:"",
        description:"",
        isDeleted:true,
      },
      ruleValidate: {
          name: [
              { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          value: [
              { required: true, message: '值不能为空', trigger: 'blur' }
          ],
          description: [
              { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
      },
      dialogVisible:false,
      addVisible:false,
      columns:[
        {
          title:"编号",
          key:"id",
          align:"center"
        },
        {
          title:"名称",
          key:"name",
          align:"center"
        },
        {
          title:"值",
          key:"value",
          align:"center"
        },
        {
          title:"描述",
          key:"description",
          align:"center"
        },
        {
          title:"是否可用",
          key:"isDeleted",
          align:"center",
          render:(h, params) => {
              return h('div', [
                  h('i-switch', { //数据库1是已处理，0是未处理
                      props: {
                          type: 'primary',
                          value: params.row.isDeleted === 1  //控制开关的打开或关闭状态，官网文档属性是value
                      },
                      scopedSlots:{
                          open:() => h('span','开启'),
                          close:() => h('span','禁用'),
                      },
                      style: {
                        marginRight: '5px',
                        width:'53px'
                      },
                      on: {
                          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                              // console.log(value);
                              // console.log(params);
                              this.switch(value,params.row.id) //params.index是拿到table的行序列，可以取到对应的表格值
                          }
                      }
                  }, )
              ]);
          }
        },
        {
          title:"操作",
          slot: 'action',
          key:"action",
          align:"center"
        }
      ],
      tableData:[],
      list:[],
      treeData:[],
      roleInfo:{}
    }
  },
  methods:{
    add(){
      this.addVisible=true
    },
    submitPremiss(){
      let arr= this.$refs.tree.getHalfCheckedNodes()
      let arr1=this.$refs.tree.getCheckedNodes()
      let list=""
      if(arr.length===0 && arr1.length===0){
        
      }else{
        for(let item of arr){
          list+=item.id+","
        }
        for(let item of arr1){
          list+=item.id+","
        }
        list=list.substr(0,list.length-1)
      }
      let obj={
        roleId:this.roleInfo.id,
      }
      if(list!==""){
        obj.permissionIdList=list
      }
      authorization(obj).then(res=>{
        if(res.code==="0000"){
          this.$message.success(res.message)
          _this.$router.go(0)
        }
      })
    },
    getCheckedNodes(node){
      console.log(node)
    },
    switch(value,id){
      updateRoleByIdSelective({
         id,
         isDeleted:value?1:0
      }).then(res=>{
        if(res.code==="0000") _this.$message.success(res.message)
      })
    },
    change(value){
      console.log(value)
    },
    alter(row){
      console.log(row)
      for(let item in row){
        this.alterInfo[item]=row[item]
      }
      this.alterInfo.isDeleted?this.alterInfo.isDeleted=true:this.alterInfo.isDeleted=false
      this.dialogVisible=true
    },
    premiss(row){
      this.roleInfo=row
      getPermissionsForRoleId({
        permissionId: 30000,
        roleId:row.id,
      }).then(res=>{
        _this.list = [res.data];
          _this.changeValue(_this.list);
          _this.treeData = _this.list;
          this.checkedList=[]
           _this.getChecked(_this.list)
          _this.authorVisible=true
         
      })
    },
    getChecked(list){
      if(list.length>0){
        for( let item of list ){
          if(item.have){
            if(item.child.length===0){
              this.checkedList.push(item.id)
            }
          }
          this.getChecked(item.child)
        }
      }
    },
    alterSubmit(name){
       this.$refs[name].validate((valid) => {
            if (valid) {
              updateRoleByIdSelective({
                id:this.alterInfo.id,
                description:this.alterInfo.description,
                isDeleted:this.alterInfo.isDeleted?1:0,
                name:this.alterInfo.name,
                value:this.alterInfo.value
              }).then(res=>{
                if(res.code==="0000"){
                  _this.$message.success(res.message)
                  _this.dialogVisible=false
                  setTimeout(()=>{
                    _this.$router.go(0)
                  },500)
                }else{
                  _this.$message.warning(res.message)
                }
              })
            }else{

            }
        })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            this.role.isDeleted? this.role.isDeleted=1:this.role.isDeleted=0
              insertRole({
                ...this.role
              }).then(res=>{
                if(res.code==="0000"){
                  this.$message.success(res.message)
                  return
                  setTimeout(()=>{
                    this.$router.go(0)
                  },500)
                }
              })

          } else {

          }
      })
    },
    changeValue(list) {
      if (list.length > 0) {
        for (let item of list) {
          item.label = item.name;
          item.children = item.child;
          this.changeValue(item.child);
        }
      }
    }
  },
  created(){
    _this=this
    listAllRoles().then(res=>{
      console.log(res)
      this.tableData=res.data
    })
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.table >>> .ivu-switch-checked:after{
  left: 34px;
}
.tree-c{
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
}
</style>