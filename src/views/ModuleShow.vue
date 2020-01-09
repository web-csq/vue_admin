<template>
  <div>
    <main-container>
      <div class="body-top">
          <i class="el-icon-s-grid"></i>
          <span>
            应用模块
          </span>
        </div>
        <div class="body-c">
          <div class="body-box" v-for="(item,index) in permissionList" :key="index" @click="$router.push(item.url)">
            <img :src="item.icon" >
            <h4>
              {{item.name}}
            </h4>
            <div v-html="item.description">
            </div>
          </div>
          
        </div>
    </main-container>
        
  </div>
</template>

<script>
import MainContainer from "@/components/MainContainer/index"
import { mapState } from "vuex"
export default {
  name:"moduleshow",
  data(){
    return{
      imgHolder:"https://via.placeholder.com/100x60?text=100 x 60"
    }
  },
  methods:{
    
  },
  computed:{
    ...mapState({
      permissionList:state=>state.app.permissionList
    })
  },
  components:{
    MainContainer,
  }
}
</script>

<style lang="scss" scoped>
$main_blue:#409EFF;
.contain{
  height: calc(100vh - 60px);
  background-color: #f0f2f5;
  padding-top: 10px;
  .contain-body{
    max-width: 1080px;
    background-color: #fff;
    height: 750px;
    margin: 0 auto;
    padding: 30px 50px;
    .body-top{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 0 0 10px 0;
      font-size: 20px;
      .el-icon-s-grid{
        font-size: 22px;
        margin-right: 10px;
      }
    }
    .body-c{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .body-box{
      margin: 20px 0px 0 0;
      padding: 20px 20px 20px 35px;
      border-radius:12px;
      transition: box-shadow,transform .05s;
      box-shadow: 0 0 2px 2px #f4f4f4;
      width: 31%;
      img{
        width: 64px;
        height: 64px;
      }
      h4{
        margin: 10px 0;
      }
    }
    .body-box:hover{
      box-shadow: 0 0 2px 2px #eee;
      transform: scale(1.01);
    }
  }
}
</style>