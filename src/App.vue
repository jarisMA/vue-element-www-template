<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import { isChrome } from "utils/browser-support";
import douxiGif from "images/douxi4.gif";
export default {
  name: "App",
  created() {
    // if (true) {
    this.$msgBox.showMsgBox({
      theme: "chrome_tips",
      img: douxiGif,
      content: "<p>系统升级中</p><p>......<p>",
      showCancelBtn: false,
      showConfirmBtn: false,
      showCloseBtn: false,
      maskCancel: false
    });
    // }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Source Han Sans CN", "Microsoft YaHei", "SimHei",
    "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}
body {
  min-width: 1200px;
}
</style>
