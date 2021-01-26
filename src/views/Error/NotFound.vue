<template>
  <div class="page-container">
    <div class="tips">
      <p class="larger">Oops!</p>
      <p class="smaller">页面似乎不见了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff !important;
  .tips {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
    margin-right: 100px;
    height: 257px;
    padding-left: 409px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 350px;
      height: 257px;
      background-image: url("~images/error/404.svg");
      background-size: cover;
      background-repeat: no-repeat;
      content: "";
    }
  }
  p {
    font-weight: bold;
    color: #2c3330;
    &.larger {
      line-height: 48px;
      font-size: 48px;
    }
    &.smaller {
      margin-top: 22px;
      line-height: 32px;
      font-size: 24px;
    }
  }
}
</style>
