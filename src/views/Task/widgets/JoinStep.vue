<template>
  <div class="widget-step">
    <div class="step-list">
      <div class="step-item" :class="{ active: step >= 1 }">
        <div class="step-num">1</div>
        <div class="step-text">提交申请资料</div>
      </div>
      <div class="step-separation" :class="{ active: step >= 2 }">
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
      </div>
      <div class="step-item" :class="{ active: step >= 2 }">
        <div class="step-num">2</div>
        <div class="step-text">加入设计团社群</div>
      </div>
      <div class="step-separation" :class="{ active: step >= 3 }">
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
        <span class="separation__icon"></span>
      </div>
      <div class="step-item" :class="{ active: step >= 3 }">
        <div class="step-num">3</div>
        <div class="step-text">开始工作</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style lang="less" scoped>
.step-list {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 41px;
  .step-item {
    position: relative;
    .step-num {
      position: relative;
      width: 46px;
      height: 42px;
      border-left: 2px solid #b4b4b4;
      border-right: 2px solid #b4b4b4;
      line-height: 42px;
      text-align: center;
      font-weight: 600;
      font-size: 24px;
      background-color: #e2e2e2;
      color: #ffffff;
      &:before {
        position: absolute;
        left: 0px;
        top: -2px;
        content: "";
        width: 42px;
        height: 2px;
        background-color: #b4b4b4;
      }
      &:after {
        position: absolute;
        left: 0px;
        bottom: -2px;
        content: "";
        width: 42px;
        height: 2px;
        background-color: #b4b4b4;
      }
    }
    .step-text {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      width: max-content;
      margin-top: 14px;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #7e7e7e;
    }
    &.active {
      .step-num {
        border-color: #000000;
        background-color: #15af64;
        &:before {
          background-color: #000000;
        }
        &:after {
          background-color: #000000;
        }
      }
      .step-text {
        color: #000000;
      }
    }
  }
  .step-separation {
    margin: 0 30px;
    width: 76px;
    display: flex;
    align-items: center;
    .separation__icon {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-left: 8px;
      background-color: #c4c4c4;
      &:first-child {
        margin-left: 0px;
      }
    }
    &.active {
      .separation__icon {
        background-color: #000000;
      }
    }
  }
}
</style>
