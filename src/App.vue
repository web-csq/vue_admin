<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    
  }
};
</script>

<style>
@import "~@/styles/index.scss";
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: hidden;
}
li,
ul,
p,
div,
body,
html,
table {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif !important;
}
li {
  list-style: none;
}
h3{
  font-size: 23px;
}
#app {
  height: 100%;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif !important;
  cursor: url("./assets/imgs/mouse.gif"), auto;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0; 
}
</style>
