<template>
  <div class="collegeLink_container">
    <div class="header">
      <img src="~images/close_logo.svg" class="header-cancel" @click="show" />
    </div>
    <div class="content">
      <img src="~images/dialog/college.svg" />
      <div>
        <p>新版即将上线</p>
      </div>
      <el-link
        class="link"
        href="https://school.daylab.cn/index"
        type="primary"
        target="_blank"
        :underline="false"
        >前往旧版</el-link
      >
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

.collegeLink_container {
  width: 672px;
  height: 500px;
  // background: url("~images/grid.png") repeat;
  background-color: #edededff;
  border: 12px solid @primaryColor;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 15px 15px 0 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .content {
    padding-top: 113px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      display: inline-block;
      margin-bottom: 20px;
      width: 300px;
      height: 70px;
    }
    p {
      width: 360px;
      margin-top: 16px;
      padding-top: 6px;
      font-size: 36px;
      font-weight: bold;
      color: @primaryColor;
      line-height: 50px;
      text-align: center;
      border-top: 2px solid @primaryColor;
    }
    .link {
      margin-top: 80px;
      font-size: 18px;
      font-weight: 400;
      line-height: 27px;
      border-bottom: 1px solid @primaryColor;
    }
  }
}
</style>
