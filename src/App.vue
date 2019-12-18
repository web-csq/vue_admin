<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(1123)
  }
};
</script>

<style>
@import "~@/styles/index.scss";
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
}
html,
body {
  height: 100%;
  overflow: hidden;
}
li {
  list-style: none;
}
#app {
  height: 100%;
  cursor: url("./assets/imgs/mouse.gif"), auto;
}
</style>
