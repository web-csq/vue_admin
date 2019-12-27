<template>
  <div class="user-c">
    <div class="user-img-c">
          <img :src="userImg">
      </div>
      <!-- 下拉菜单 -->
      <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
          <div class="pointer">
              <span>{{user.truename}}</span>
              <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
              <Icon v-show="arrowUp" type="md-arrow-dropup"/>
          </div>
          <DropdownMenu slot="list">
              <!-- name标识符 -->
              <!-- <DropdownItem name="1">添加用户</DropdownItem>
              <DropdownItem name="2">个人资料</DropdownItem> -->
              <DropdownItem name="2">修改密码</DropdownItem>
              <DropdownItem name="3">退出登陆</DropdownItem>
          </DropdownMenu>
      </Dropdown>

      <!-- 修改密码模态框 -->
        <Modal 
            v-model="updataModal"
            title="修改密码"
            @on-ok="updataOK"
            @on-cancel="cancel">
            <div >
                <Form  :model="stuItem"  :label-width="80">
                    <FormItem label="旧密码" >
                        <Input style="width:200px" v-model="stuItem.oldPwd" placeholder="" />
                    </FormItem>
                    <FormItem label="新密码" >
                        <Input style="width:200px" v-model="stuItem.newPwd" placeholder="" />
                    </FormItem>
                </Form>
            </div>
        </Modal>

  </div>

</template>

<script>
import { resetTokenAndClearUser } from '@/utils/router'
import { changePassword } from "@/api/user"
import { mapState } from "vuex"


export default {
  data(){
    return{
      userImg:"",
      userName:"",
      arrowUp: false, // 用户详情向上箭头
      arrowDown: true, // 用户详情向下箭头
      stuItem:{
        oldPwd:'',
        newPwd:'',
      },
      updataModal:false,//修改密码模态框
      userId:0,//用户ID
    }
  },
  computed:{
    ...mapState({
        user:state=>state.user.user,
    })
  },
  methods:{
    userOperate(name) {
        switch(name) {
            case '1':
                // 修改密码
                
                break
            case '2':
                // 基本资料
                this.showModel();
                break
            case '3':
                resetTokenAndClearUser()
                this.$router.replace({name: 'login'})
                break
        }
    },
     // 控制用户三角箭头显示状态
    showArrow(flag) {
        this.arrowUp = flag
        this.arrowDown = !flag
    },
    showModel(){
      this.stuItem.oldPwd = '';
      this.stuItem.newPwd = '';
      this.updataModal = !this.updataModal;
    },
    updataOK(){//修改密码
      if(this.stuItem.oldPwd == '' || this.stuItem.newPwd == ""){
        this.$Message.warning('旧密码与新密码不能为空');
        return false;
      }
      let baseData = {};
      baseData.oldPassword  = this.stuItem.oldPwd;
      baseData.newPassword  = this.stuItem.newPwd;
      baseData.userId = this.userId; 
      this.updataPwd(baseData);
    },
    async updataPwd(obj){
      changePassword(obj).then( res => {
        console.log(res);
        if(res.code == "0000"){
          //修改成功
          this.$Message.info({
            content: `密码修改 ${ res.message } 1s后,将返回登录页`,
            duration: 1.5
          })
          setTimeout( res => {
            resetTokenAndClearUser()
            this.$router.replace({name: 'login'})
          },1500)
        }else{
          this.$Message.error(res.message)
        }
      })
    },
    cancel(){},
  },
  created(){
    // 设置用户信息
    this.userName = sessionStorage.getItem('userName')
    this.userImg = sessionStorage.getItem('userImg')
    // console.log(this.user)
    this.userId = this.user.id
  }
}
</script>

<style lang="scss" scoped>
.user-c{
  display: flex;
  align-items: center;
}
.user-img-c {
    width: 34px;
    height: 34px;
    background: #ddd;
    border-radius: 50%;
    margin: 0 20px 0 20px;
    overflow: hidden;
    img {
      width: 100%;
  }
}
.pointer{
  cursor: pointer;
}
.pointer:hover{
  color: #409EFF;
}
</style>