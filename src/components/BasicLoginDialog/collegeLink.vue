<template>
  <div class="collegeLink-container">
    <div class="header">
      <img src="~images/close_logo.svg" class="header-cancel" @click="show" />
    </div>
    <div class="content">
      <div class="desc-content">
        <p>“斗西学社”网页版</p>
      </div>
      <div class="title-content">
        <p>即将上线</p>
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
@import "~styles/variable.less";

.collegeLink-container {
  padding-bottom: 148px;
  font-size: 0;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0 0;
    }
  }
  .content {
    margin: 98px auto 0;
    text-align: center;
    .desc-content {
      align-items: center;
      font-size: 22px;
      line-height: 22px;
      font-weight: 500;
      color: #333333;
      padding-bottom: 19px;
    }
    .title-content {
      display: inline-block;
      text-align: center;
      font-size: 28px;
      color: @primaryColor;
      font-weight: bold;
      line-height: 28px;
    }
  }
}
</style>
