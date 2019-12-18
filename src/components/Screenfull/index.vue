<template>
  <div class="screenfull">
    <Icon :type="isFullscreen?'md-contract':'md-expand'" @click="click"></Icon>
    <Icon type="arrow-expand" @click="click"></Icon>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$Message.warning("暂不支持全屏！");
        return false;
      }
      console.log(screenfull);
      screenfull.toggle();
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", e => {
          console.log(e);
          this.isFullscreen = screenfull.isFullscreen;
        });
      }
    }
  }
};
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  font-size: 30px !important;
  width: 50px;
  height: 50px !important;
  vertical-align: 10px;
}
</style>
