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
                  <img :src="item.icon" alt="">
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
    <div class="section">
      <div class="sction-b">
        <router-view />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex"
import userFlag from "@/components/User"
import { blankURL,routeToTitle } from "@/utils/blankRoute"
export default {
  data(){
    return{
      imgHolder:"https://via.placeholder.com/75x30?text=75 x 30",
      title:""
    }
  },
  methods:{
   
    
  },
  computed:{
    ...mapState({
      permissionList:state=>state.app.permissionList
    })
  },
  watch:{
    $route: {
        handler: function(route) {
          this.title=routeToTitle(this.$route.fullPath)
        },
        immediate: true
    }
  },
  created(){
    
  },
  components:{
    userFlag
  }
}
</script>

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
    padding: 15px 0;
    max-width:1680px;
    margin:0 auto; 
    background-color: #fff;
    box-sizing: border-box;
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
    height: 30px;
    margin: 0 10px 0 0;
  }
  h4{
    font-size: 18px;
    font-weight: 400;
  }
}
.nav-box:hover{
   background-color: #f0f0f0;
   color: #409EFF;
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