<template>
  <div class="wx-login_container">
    <div class="header">
      <img
        src="~images/common/close_logo.svg"
        alt=""
        class="header-cancel"
        @click="handleClose"
      />
    </div>
    <img src="~images/common/logo.svg" alt="logo" class="logo" />
    <p class="title">请用微信扫码登录 / 注册</p>
    <div class="qrcode-container" id="qrcode"></div>
    <img
      v-if="false"
      src="~images/wx-QR_code.svg"
      alt="qr-code"
      class="image"
    />
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.showQrCode();
  },
  methods: {
    ...mapMutations(["updateLoginDialogVisible", "logout"]),
    showQrCode() {
      const appid = process.env.VUE_APP_WECHAT_APPID;
      this.$nextTick(function() {
        new window.WxLogin({
          id: "qrcode",
          appid: appid,
          height: "200px",
          scope: "snsapi_login",
          redirect_uri:
            `${process.env.VUE_APP_HOST}/api/web/oauth/social/wechat/callback?redirect_uri=` +
            window.location.href,
          state: "born2code",
          href:
            "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIyMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMjBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30g"
        });
      });
    },
    handleClose() {
      this.updateLoginDialogVisible(0);
    }
  }
};
</script>
<style type="text/css" lang="less">
.wx-login_container {
  text-align: center;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    width: 200px;
    margin: 29px auto;
  }
  .title {
    margin-bottom: 22px;
    font-size: 22px;
    color: #5f5f5f;
  }
  .image {
    width: 220px;
    height: 220px;
  }
  .desc {
    margin: 24px auto 0;
    padding-bottom: 81px;
    font-size: 20px;
    color: #5f5f5f;
  }
}
.qrcode-container {
  height: 340px;
}
</style>
