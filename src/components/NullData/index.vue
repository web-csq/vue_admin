<template>
  <div>
      <div class="cont">
        {{messgae}}
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      messgae:"暂无数据"
    }
  }
}
</script>

<style scoped>
.cont{
  margin: 100px 0 0 0;
  text-align: center; 
}
</style>