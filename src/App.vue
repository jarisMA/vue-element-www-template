<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { isChrome } from "utils/browser-support";
import douxiGif from "images/common/douxi4.gif";
export default {
  name: "App",
  created() {
    if (!isChrome()) {
      this.$msgBox.showMsgBox({
        theme: "chrome_tips",
        img: douxiGif,
        content: "<p>您的浏览器不兼容，</p><p>请下载使用 Chrome 浏览器<p>",
        showCancelBtn: false,
        showConfirmBtn: false,
        showCloseBtn: false,
        maskCancel: false
      });
    }
  }
};
</script>
<style lang="less"></style>
