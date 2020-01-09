<template>
  <div>
    <div class="resource-c">
      <div class="tree">
        <div class="rc-t">资源列表：</div>
        <el-tree
          :data="treeData"
          accordion
          @node-click="nodeClick"
          check-on-click-node
          :current-node-key="currentNode"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click.stop="() => append(data)">新增</el-button>
              <el-button type="text" size="mini" @click.stop="() => alter(node, data)">修改</el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="intr">
        <div class="rc-t">资源详情：</div>
        <div class="intr-c">
          <div class="key">ID：</div>
          <div class="value">{{intrObj.id}}</div>
        </div>
        <div class="intr-c">
          <div class="key">名称：</div>
          <div class="value">{{intrObj.name?intrObj.name:"暂无"}}</div>
        </div>
        <div class="intr-c">
          <div class="key">是否删除：</div>
          <div class="value">{{intrObj.deleted?"是":"否"}}</div>
        </div>
        <div class="intr-c">
          <div class="key">描述：</div>
          <div class="value" v-html="intrObj.description?intrObj.description:'暂无'"></div>
        </div>
        <div class="intr-c">
          <div class="key">访问路径：</div>
          <div class="value" v-html="intrObj.url?intrObj.url:'暂无'"></div>
        </div>
        <div class="intr-c">
          <div class="key">类型</div>
          <div class="value"> {{intrObj.type===0?"目录":(intrObj.type===1?"菜单":"按钮")}}</div>
        </div>
        <div class="intr-c" style="display:block">
          <div>下属权限：</div>
          <div style="padding: 15px 20px;" v-for="(item,index) in intrObj.child" :key="index">
            <div class="value">{{index+1}}， {{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加权限弹窗 -->
    <el-dialog title="新增权限" :visible.sync="addVisible" width="40%">
      <Form ref="formValidate" :model="role" :rules="ruleValidate" :label-width="120">
        <FormItem label="名称：" prop="name">
          <Input v-model="role.name" placeholder="请输入权限名称" />
        </FormItem>
        <FormItem label="值：" prop="value">
          <Input v-model="role.value" placeholder="请输入权限值" />
        </FormItem>
        <FormItem label="描述：" prop="description">
          <Input
            v-model="role.description"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入权限描述"
          />
        </FormItem>
        <FormItem label="类型：" prop="type">
          <Select v-model="role.type" style="width:200px">
            <Option value="0">目录</Option>
            <Option value="1">菜单</Option>
            <Option value="2">按钮</Option>
          </Select>
        </FormItem>
        <FormItem label="排序：" prop="ranking">
          <Input v-model="role.orderNumber" placeholder="请输入排列顺序" />
        </FormItem>
        <FormItem label="权限访问路径：" prop="url">
          <Input v-model="role.url" placeholder="请输入权限访问路径" />
        </FormItem>
        <FormItem label="图标：" prop="icon">
          <Input v-model="role.icon" placeholder="请输入图标名称" />
        </FormItem>
        <FormItem label="是否删除：" prop="deleted">
          <el-switch v-model="role.deleted"></el-switch>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="addVisible=false" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </el-dialog>

    <!-- 修改权限弹窗 -->
    <el-dialog title="修改权限" :visible.sync="alterVisible" width="40%">
      <Form ref="formValidate1" :model="alterInfo" :rules="alterValidate" :label-width="120">
        <FormItem label="名称：" prop="name">
          <Input v-model="alterInfo.name" placeholder="请输入权限名称" />
        </FormItem>
        <FormItem label="值：" prop="value">
          <Input v-model="alterInfo.value" placeholder="请输入权限值" />
        </FormItem>
        <FormItem label="描述：" prop="description">
          <Input
            v-model="alterInfo.description"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入权限描述"
          />
        </FormItem>
        <FormItem label="类型：" prop="type">
          <Select v-model="alterInfo.type" style="width:200px">
            <Option value="0">目录</Option>
            <Option value="1">菜单</Option>
            <Option value="2">按钮</Option>
          </Select>
        </FormItem>
        <FormItem label="排序：" prop="orderNumber">
          <Input v-model="alterInfo.orderNumber" placeholder="请输入排列顺序" />
        </FormItem>
        <FormItem label="权限访问路径：" prop="url">
          <Input v-model="alterInfo.url" placeholder="请输入权限访问路径" />
        </FormItem>
        <FormItem label="图标：" prop="icon">
          <Input v-model="alterInfo.icon" placeholder="请输入图标名称" />
        </FormItem>
        <FormItem label="是否删除：" prop="deleted">
          <el-switch v-model="alterInfo.deleted"></el-switch>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="alterSubmit('formValidate1')">提交</Button>
          <Button @click="alterVisible=false" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionInfoById, insertPermission,updatePermissionByIdSelective } from "@/api/permission";
let _this;
export default {
  name: "resouce",
  data() {
    return {
      currentNode: "",
      addVisible: false,
      alterVisible:false,
      list: [],
      addData: {},
      treeData: [],
      alterData:{},
      intrObj: {},
      role: {
        name: "",
        value: "",
        description: "",
        orderNumber: "",
        type: "",
        url: "",
        icon: "",
        deleted: true
      },
      alterInfo: {
        name: "",
        value: "",
        description: "",
        orderNumber: "",
        type: "",
        url: "",
        icon: "",
        deleted: true
      },
      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        value: [{ required: true, message: "值不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        orderNumber: [
          { required: true, message: "请输入合法数字", trigger: "blur" }
        ],
        icon: [{ required: true, message: "请输入图表名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择权限类型", trigger: "blur" }],
        url: [{ required: true, message: "请选择权限访问路径", trigger: "blur" }]
      },
      alterValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        value: [{ required: true, message: "值不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        orderNumber: [
          
        ],
        icon: [{ required: true, message: "请输入图表名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择权限类型", trigger: "blur" }],
        url: [{ required: true, message: "请选择权限访问路径", trigger: "blur" }]
      }
    };
  },
  methods: {
    append(data) {
      if(data.type!==0) return this.$message.warning("禁止添加")
      this.addData = data;
      this.addVisible = true;
      // this.dialogVisible=true
      // console.log(data)
      // return
      // const newChild = { id: data.id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    alter(node, data) {
      this.alterVisible=true
      this.alterInfo=data
      this.alterInfo.type+=""
      
    },
    alterSubmit(name){
       this.$refs[name].validate(valid => {
        if (valid) {
          updatePermissionByIdSelective({
            deleted:this.alterInfo.deleted?1:0,
            description:this.alterInfo.description,
            icon:this.alterInfo.icon,
            id:this.alterInfo.id,
            name:this.alterInfo.name,
            orderNumber:this.alterInfo.orderNumber,
            parentId:this.alterInfo.parentId,
            type:this.alterInfo.type,
            url:this.alterInfo.url,
            value:this.alterInfo.value,
          }).then(res=>{
            if(res.code==="0000"){
              _this.$message.success(res.message);
              setTimeout(() => {
                _this.$router.go(0);
              }, 500);
            }
          })
        }else{

        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          insertPermission({
            deleted: this.role.deleted ? 1 : 0,
            description: this.role.description,
            icon: this.role.icon,
            name: this.role.name,
            orderNumber: this.role.orderNumber,
            parentId: this.addData.id,
            type: this.role.type,
            url: this.role.url,
            value: this.role.value
          }).then(res => {
            if (res.code === "0000") {
              _this.$message.success(res.message);
              setTimeout(() => {
                _this.$router.go(0);
              }, 500);
            }
          });
        } else {
        }
      });
    },
    submit() {},
    nodeClick(data, node, value) {
      getPermissionInfoById({
        id: data.id
      }).then(res => {
        if (res.code === "0000") {
          _this.intrObj = res.data;
        }
      });
    },
    fetchData() {
      getPermissionInfoById({
        id: 30000
      }).then(res => {
        _this.list = [res.data];
        _this.changeValue(_this.list);
        _this.treeData = this.list;
        _this.intrObj = _this.list[0];
      });
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
  created() {
    _this = this;
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.resource-c {
  display: flex;
  max-width: 1080px;
  min-width: 750px;
}
.tree {
  font-size: 14px;
  padding-right: 8px;
  width: 400px;
}
.tree >>> .el-tree {
  width: 100%;
}
.tree >>> .custom-tree-node {
  width: 100%;
  display: flex;
}
.tree >>> .custom-tree-node > span:nth-child(2) {
  margin-left: auto;
}
.intr {
  margin: 0 0 0 20px;
}
.rc-t {
  font-weight: 600;
  padding: 10px;
}
.intr-c {
  padding: 10px;
  display: flex;
  font-size: 15px;
}
</style>