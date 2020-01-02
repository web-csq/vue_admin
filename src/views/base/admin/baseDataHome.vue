<template>
  <div>
    <div class="top-c">
        <div class="cent top">
          <div class="cent top-l">
            <img src="@/assets/imgs/logo.png" alt="" @click="$router.push('/moduleshow')">
            <h3 @click="$router.push('/moduleshow')">
              慧海科技
            </h3>
            <span class="line">|</span>
            <el-popover
              placement="bottom-start"
              transition="fade"
              :offset="-100"
              width="600"
              trigger="hover">
              <div class="nav-c">
                <div class="nav-box" v-for="(item,index) in permissionList" :key="index" @click="$router.push(item.url)">
                  <img :src="imgHolder" alt="">
                  <h4>{{item.name}}</h4>
                </div>
              </div>
              <div slot="reference" class="cent hove">
                <i class="el-icon-menu"></i>
                <span >{{title}}</span>
              </div>
            </el-popover>
            
            
          </div>
          <user-flag></user-flag>
        </div>
    </div>
    <div class="section-con">
      <div class="section-left">
          <Menu :theme="theme2"  accordion   :active-name='permissionList[0].child[0].url'>
            <template v-for="item in permissionList[0].child" >
              <MenuItem  :name="item.url" :key="'item.id' + item.url" :to="item.url">
                <span class="layout-text" :key="'item.id' + item.url">{{ item.name }}</span>
              </MenuItem>
            </template>
            <!-- <MenuItem  :name="value" :to="value">
              <span class="layout-text" >注册</span>
            </MenuItem> -->
          </Menu>
          
          <!-- <Menu :theme="theme2" :open-names="['1']" accordion @on-select="testToPage" >
              <Submenu name="1">
                  <template slot="title">
                      <Icon type="ios-paper" />
                      账号管理
                  </template>
                  <MenuItem name="1-1" >学校列表</MenuItem>
                  <MenuItem name="1-4">省级管理员</MenuItem>
                  <MenuItem name="1-5">市级管理员</MenuItem>
                  <MenuItem name="1-6">区/县级管理员</MenuItem>
                  
              </Submenu>
              <Submenu name="2">
                  <template slot="title">
                      <Icon type="ios-paper" />
                      学校账号管理
                  </template>
                  <MenuItem name="2-1" >年级管理</MenuItem>
                  <MenuItem name="2-2">学生列表</MenuItem>
                  <MenuItem name="2-3">教师列表</MenuItem>
              </Submenu>
              <MenuItem name="3-1" >班级设置</MenuItem>
          </Menu> -->

      </div>  
      <!-- 右侧内容 -->
      <div class="main-content">
          <transition name="fade-transform" mode="out-in">
              <router-view />
          </transition>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex"
import userFlag from "@/components/User"
import { blankURL,routeToTitle } from "@/utils/blankRoute"


export default {
  name:'baseData',
  data(){
    return{
      imgHolder:"https://via.placeholder.com/75x30?text=75 x 30",
      title:"",
      theme2: 'light',
      menuList:[],
      value:'/register'
    }
  },
  methods:{
    
  },
  computed:{
    ...mapState({
      permissionList:state=>state.app.permissionList,
      userInfo:state=>state.user.user
    })

  },
  watch:{

  },
  created(){
    // console.log(this.userInfo)
    this.imgHolder = this.userInfo.pic;
    this.$router.push(this.permissionList[0].child[0].url);
  },
  mounted(){
  },
  components:{
    userFlag,

  }
}
</script>
<style scoped>
  .section-con{
    position: relative;
    padding-top: 15px;
  }
  .section-left{
    width: 245px;
    background: #fff;
    height: calc( 100vh - 15px);
  }
  .main-content {
    position:absolute;
    overflow: auto;
    width: calc(100% - 245px);
    background: #fff;
    padding: 20px;
    height: 100%;
    left: 246px;
    top: 15px;
  }
  /* 菜单栏样式 */
  .ivu-menu-vertical.ivu-menu-light:after{
    height: calc( 100vh - 15px);
  }
</style>
<style lang="scss">
$main_blue:#409EFF;
.top-c{
  border-bottom:1px solid #ccc;
}
.top{
  max-width: 1680px;
  padding: 0 20px;
  margin:0 auto;
  justify-content: space-between;
  height:60px;
  img{
    width: 75px;
    height: 30px;
    margin: 0 10px 0 0 ;
  }
  .top-l{
    color: $main_blue;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    .line{
      height: 42px;
      font-size:26px;
      font-weight: 400;
      margin: 0 20px;
      color: #666;
    }
    span{
      color: #666;
    }
    .el-icon-menu{
      color: #666;
      font-size: 28px;
      margin: 0px 5px 0 0;
    }
  }
  .top-right{
    border: 1px solid #dadada;
    border-radius:18px;
    background-color: #f8f9f9;
    padding: 8px 20px;
  }
}
.hove:hover .el-icon-menu,.hove:hover span{
  color: #409EFF;
}
.section{
  min-height:100vh;
  padding: 15px;
  background-color: #F0F2F5;
  .sction-b{
    padding: 15px;
    max-width:1680px;
    margin:0 auto; 
    background-color: #fff;
  }
}
.nav-c{
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  
}
.nav-box{
  display: flex;
  align-items: center;
  width: 33.33%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  img{
    width: 60px;
    margin: 0 10px 0 0;
  }
  h4{
    font-size: 18px;
    font-weight: 400;
  }
}

.nav-box:hover{
  background-color: #f0f0f0;
}
/**
  重写fade
 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
}
</style>