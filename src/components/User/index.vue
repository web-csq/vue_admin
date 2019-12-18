<template>
  <div class="user-c">
     <div class="user-img-c">
          <img :src="userImg">
      </div>
      <!-- 下拉菜单 -->
      <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
          <div class="pointer">
              <span>{{userName}}</span>
              <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
              <Icon v-show="arrowUp" type="md-arrow-dropup"/>
          </div>
          <DropdownMenu slot="list">
              <!-- name标识符 -->
              <DropdownItem name="1">添加用户</DropdownItem>
              <DropdownItem name="2">个人资料</DropdownItem>
              <DropdownItem divided  name="3">退出登陆</DropdownItem>
          </DropdownMenu>
      </Dropdown>
  </div>
</template>

<script>
import { resetTokenAndClearUser } from '@/utils/router'

export default {
  data(){
    return{
      userImg:"",
      userName:"",
      arrowUp: false, // 用户详情向上箭头
      arrowDown: true, // 用户详情向下箭头
    }
  },
  methods:{
    userOperate(name) {
        switch(name) {
            case '1':
                // 修改密码
                
                break
            case '2':
                // 基本资料
                
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
  },
  created(){
    // 设置用户信息
    this.userName = sessionStorage.getItem('userName')
    this.userImg = sessionStorage.getItem('userImg')
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