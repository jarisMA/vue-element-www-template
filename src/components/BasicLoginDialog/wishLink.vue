<template>
  <div class="rwishLink_container">
    <div class="header">
      <img
        src="~@/assets/images/close_logo.svg"
        class="header-cancel"
        @click="show"
      />
    </div>
    <div class="content">
      <div class="desc-content">
        <p>一个帮助你梳理需求的小工具</p>
      </div>
      <div class="title-content">
        <p>将于9月25日上线</p>
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
.rwishLink_container {
  padding-bottom: 138px;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .content {
    margin: 92px auto 0;
    text-align: center;
    .desc-content {
      align-items: center;
      font-size: 20px;
      line-height: 20px;
      color: #777777;
      padding-bottom: 12px;
    }
    .title-content {
      display: inline-block;
      text-align: center;
      font-size: 28px;
      line-height: 48px;
      color: #14af64;
      padding: 16px auto 17px;
      width: 289.69px;
      border: 1px solid #707070;
      border-left: none;
      border-right: none;
      font-weight: bold;
    }
  }
}
</style>
