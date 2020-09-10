<template>
  <div class="registeredSuccessfullyTitle-container">
    <div class="header">
      <img src="~@/assets/images/close_logo.svg" class="return-logo" />
    </div>
    <div class="content">
      <img src="~@/assets/images/succeed_logo.svg" class="content-logo" />
      <p class="content-title">注册成功</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.registeredSuccessfullyTitle-container {
  padding-top: 25px;
  padding-bottom: 129px;
  text-align: center;
  font-size: 0;
  .header {
    text-align: right;
    .return-logo {
      width: 30px;
      height: 30px;
      margin-right: 25px;
    }
  }
  .content {
    margin-top: 44px;
    .content-logo {
      width: 78px;
      height: 78px;
      margin-bottom: 21px;
    }
    .content-title {
      font-size: 43px;
      color: #14af64;
      line-height: 43px;
    }
  }
}
</style>
