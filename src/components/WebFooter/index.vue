<template>
  <div class="footer">
    <div class="line">
      <span>{{conf.year}}</span>
      <span>{{conf.name}}版权所有</span>
      <span>企业电话：{{conf.phone}}</span>
    </div>
    <div class="line">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010402002484"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
      >
        <img src="@/assets/imgs/footer-img.png" style="float:left;" />
        <span
          style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#515a6e;"
        >豫公网安备 {{conf.publicPut}}号</span>
      </a>
    </div>
  </div>
</template>

<script>
import conf from "./conf";
export default {
  data() {
    return {};
  },
  computed: {
    conf() {
      return conf;
    }
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
$font-s: 12px;
.footer {
  position: fixed;
  bottom: 2rem;
  left: 0;
  width: 100%;
  font-size: $font-s;
  .line {
    text-align: center;
    span {
      margin: 0 3px;
    }
  }
}
</style>