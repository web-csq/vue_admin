<template>
  <div>
    <div class="cent top">
        <div class="cent top-l">
          <img src="@/assets/imgs/logo.png" alt="">
          <h3>
            慧海科技
          </h3>
        </div>
        <user-flag></user-flag>
    </div>
    <div class="contain">
      <div class="contain-body">
        <slot></slot>
      </div>
    </div>
    <web-footer></web-footer>
  </div>
</template>

<script>
import webFooter from "@/components/WebFooter/index"
import userFlag from "@/components/User"
export default {
  components:{
    webFooter,
    userFlag
  }
}
</script>

<style lang="scss" scoped>
$main_blue:#409EFF;
.top{
  max-width: 1080px;
  margin: 0 auto;
  justify-content: space-between;
  height:60px;
  img{
    width: 80px;
    height: 30px;
    margin: 0 10px 0 0 ;
  }
  .top-l{
    color: $main_blue;
  }
  .top-right{
    border: 1px solid #dadada;
    border-radius:18px;
    background-color: #f8f9f9;
    padding: 8px 20px;
  }
}
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
  }
}
</style>