<template>
  <div class="end">
    <template v-if="total > 0">
      <i class="end-icon"></i>
    </template>
    <template v-else>
      <div class="empty">
        <i class="logo-icon"></i>
        <span>这里还没有内容</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "QuestionEnd",
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="less" scoped>
.end {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  .end-icon {
    position: relative;
    display: inline-block;
    width: 13px;
    height: 20px;
    background-image: url("~images/question/douxi.svg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow: visible;
    opacity: 1;
    &::before,
    &::after {
      position: absolute;
      top: calc(50% - 0.5px);
      width: 60px;
      height: 1px;
      background: rgba(95, 95, 95, 0.1);
      content: "";
    }
    &::before {
      right: -70px;
    }
    &::after {
      left: -70px;
    }
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  line-height: 1;
  font-size: 14px;
  color: #8ea098;
  .logo-icon {
    display: inline-block;
    width: 33px;
    height: 52px;
    margin-bottom: 20px;
    background-image: url("~images/question/douxi.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
