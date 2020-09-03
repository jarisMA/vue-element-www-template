<template>
  <!-- 身份选择 -->
  <div class="identity-selector_container">
    <div class="header">
      <img src="~@/assets/images/home-logo.png" alt="" class="header-logo" />
    </div>
    <p class="title">请问您的身份是</p>
    <div class="content">
      <el-radio-group v-model="userInfo.selector">
        <div class="content-item">
          <el-radio-button label="家居爱好者"></el-radio-button>
        </div>
        <div class="content-item">
          <el-radio-button label="设计师"></el-radio-button>
        </div>
        <div class="content-item">
          <el-radio-button label="装修机构"></el-radio-button>
        </div>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  }
};
</script>
<style lang="less" scoped>
.identity-selector_container {
  text-align: center;
  .header {
    text-align: left;
    .header-logo {
      width: 114px;
      height: 26px;
      margin: 30px 30px 0;
    }
  }
  .title {
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
    margin: 74px auto 62px;
  }
  .content {
    width: 326px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 74px;
    /deep/ .el-radio-group {
      width: 100%;
      .content-item {
        width: 100%;
        margin-bottom: 40px;
        .el-radio-button,
        .el-radio-button__orig-radio,
        .el-radio-button__inner {
          width: 100% !important;
          font-size: 16px;
          font-family: Noto Sans S Chinese;
          color: #999999;
        }
      }
      .is-active .el-radio-button__inner {
        background: #14af64;
        color: #fff;
      }
    }
  }
}
</style>
