<template>
  <div class="interiorWx-container">
    <div class="header-container">
      <p class="loho-title">PLAN</p>
      <img
        src="~@/assets/images/close_logo.svg"
        class="return-logo"
        @click="show"
      />
    </div>
    <div class="content">
      <p class="content-title">铁粉内测阶段</p>
      <img src="~@/assets/images/wx-logo_2.svg" class="content-wx_logo" />
      <div class="content-desc">
        <p>想优先体验可微信扫码</p>
        <p>添加工作人员邀请开通</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    show() {
      this.$store.commit("END_DIALOG_SHOW");
    }
  }
};
</script>
<style lang="less" scoped>
.interiorWx-container {
  text-align: center;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 55px;
    .loho-title {
      font-size: 16px;
      font-weight: bold;
      line-height: 16px;
      color: #14af64;
      margin-left: 30px;
    }
    .return-logo {
      width: 30px;
      height: 30px;
      margin-right: 25px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .content {
    margin: 56px auto 0;
    padding-bottom: 89px;
    .content-title {
      font-size: 34px;
      font-weight: bold;
      line-height: 34px;
      color: #14af64;
      margin-bottom: 15px;
    }
    .content-wx_logo {
      width: 238px;
      height: 238px;
      margin-bottom: 22px;
    }
    .content-desc {
      font-size: 22px;
      font-weight: bold;
      line-height: 30px;
      color: #333333;
    }
  }
}
</style>
