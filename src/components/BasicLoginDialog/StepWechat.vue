<template>
  <div class="wx-login_container">
    <div class="header">
      <img
        src="~@/assets/images/close_logo.svg"
        alt=""
        class="header-cancel"
        @click="show"
      />
    </div>
    <img src="~@/assets/images/logo_2.svg" alt="" class="logo" />
    <p class="title">请用微信扫码登录 / 注册</p>
    <div class="qrcode-container" id="qrcode"></div>
    <img
      v-if="false"
      src="~@/assets/images/wx-QR_code.svg"
      alt=""
      class="image"
    />
    <p v-if="false" class="desc">扫码后关注暖刻公众号，完成登录</p>
  </div>
</template>

<script type="text/javascript">
export default {
  mounted() {
    this.showQrCode();
  },
  methods: {
    show() {
      this.$store.commit("DEL_DIALOG_SHOW");
    },
    showQrCode() {
      this.$nextTick(function() {
        new window.WxLogin({
          id: "qrcode",
          appid: "wx8ad54c65480e5203",
          height: "200px",
          scope: "snsapi_login",
          //self_redirect:true,
          redirect_uri: "http://www.home-plan.cn/social/callback/wechat",
          state: "born2code",
          // href: "https://passport.jiker.vip/css/qrcode.css"
          href:
            "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIyMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMjBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30g"
        });
      });
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
    width: 100px;
    height: 82.65px;
    margin: 29px auto;
  }
  .title {
    margin-bottom: 22px;
    font-size: 22px;
    font-family: Noto Sans S Chinese;
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
    font-family: Noto Sans S Chinese;
    color: #5f5f5f;
  }
}
.qrcode-container {
  height: 340px;
}
</style>
