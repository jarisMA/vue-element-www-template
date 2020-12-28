<template>
  <div class="rwishLink_container">
    <div class="header">
      <img src="~images/close_logo.svg" class="header-cancel" @click="show" />
    </div>
    <div class="content">
      <img src="~images/treasure_book.png" />
      <div>
        <p>新版斗西宝典即将上线，</p>
        <p>敬请期待。</p>
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

.rwishLink_container {
  width: 672px;
  height: 500px;
  background: url("~images/grid.png") repeat;
  background-color: #e6d6e5;
  border: 12px solid #af72a2;
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
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      display: inline-block;
      margin-bottom: 20px;
      width: 230px;
      height: 192px;
    }
    p {
      font-size: 36px;
      font-weight: bold;
      color: #af72a2;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
