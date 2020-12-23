<template>
  <div class="collegeLink-container">
    <div class="header">
      <img src="~images/close_logo.svg" class="header-cancel" @click="show" />
    </div>
    <div class="content">
      <div class="desc-content">
        <p>“斗西学社”新版</p>
      </div>
      <div class="title-content">
        <p>即将上线</p>
      </div>
    </div>
    <div class="footer">
      <div class="old-link">
        <el-link
          href="https://school.daylab.cn/index"
          type="primary"
          target="_blank"
          :underline="false"
          >前往旧版</el-link
        >
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
  display: flex;
  flex-direction: column;
  height: 400px;
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
    flex: 1;
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
  .footer {
    height: 50px;
    .old-link {
      .el-link {
        float: right;
        margin-right: 30px;
        line-height: 20px;
        border-bottom: 1px solid #14af64;
      }
    }
  }
}
</style>
