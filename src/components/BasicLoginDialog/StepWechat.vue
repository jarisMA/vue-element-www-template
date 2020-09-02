<template>
  <div class="wx-login_container">
    <div class="header">
      <img src="~@/assets/images/tc-qx@2x.png" alt="" class="header-cancel" />
    </div>
    <img src="~@/assets/images/tc-wdl-logo@2x.png" alt="" class="logo" />
    <p class="title">请用微信扫码登陆 / 注册</p>
    <div id="qrcode"></div>
    <img
      v-if="false"
      src="~@/assets/images/tc-ewm@2x.png"
      alt=""
      class="image"
    />
    <p class="desc">扫码后关注暖刻公众号，完成登录</p>
  </div>
</template>

<script type="text/javascript">
export default {
  mounted() {
    this.showQrCode();
  },
  methods: {
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
            "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLnBhbmVsQ29udGVudCAud3JwX2NvZGUgewogICAgd2lkdGg6IDI0MHB4OwogICAgaGVpZ2h0OiAyNDBweDsKfQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19icm93c2VyIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnN0YXR1c19pY29uIHsKICAgIG1hcmdpbi10b3A6IDEwcHg7Cn0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICAvKmJvcmRlcjpub25lOyovCiAgICBwYWRkaW5nOiAzMHB4OwogICAgd2lkdGg6IDIyMHB4OwogICAgaGVpZ2h0OiAyMjBweDsKfQouaW1wb3dlckJveCAuanNfd3hfZGVmYXVsdF90aXB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94ICN3eF9hZnRlcl9zY2FuLCAjd3hfYWZ0ZXJfY2FuY2VsLCN3eF9kZWZhdWx0X3RpcHsKICAgIHBhZGRpbmc6IDUycHggMTRweDsKICAgIHRleHQtYWxpZ246IGxlZnQ7Cn0KLmltcG93ZXJCb3ggLnN0YXR1c190eHQgewogICAgbWFyZ2luLXRvcDoxMnB4Owp9"
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
</style>
