<template>
  <div class="notification-container" v-show="showNotification">
    <img
      class="notification-icon"
      v-if="type === 'success'"
      src="~images/common/success.svg"
    />
    <img
      class="notification-icon"
      v-if="type === 'danger'"
      src="~images/common/danger.svg"
    />
    <img
      class="notification-icon"
      v-if="type === 'warning'"
      src="~images/common/warning.svg"
    />
    <span :class="['notification-content', type]">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    type: {
      // 类型
      type: String,
      default: "success"
    },
    title: {
      // 标题
      type: String,
      default: ""
    },
    duration: {
      // 持续时间，0 为不消失
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      showNotification: false
    };
  },
  methods: {
    show() {
      this.showNotification = true;
      if (this.duration !== 0) {
        setTimeout(() => {
          this.showNotification = false;
        }, this.duration);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

.notification-container {
  position: fixed;
  top: 16px;
  left: 50%;
  padding: 16px 24px;
  z-index: 1001;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0px 2px 12px 0px #cccccc;
  .notification-icon {
    display: inline-block;
    margin-right: 16px;
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }
  .notification-content {
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
    &.success {
      color: @successColor;
    }
    &.danger {
      color: @dangerColor;
    }
    &.warning {
      color: @warningColor;
    }
  }
}
</style>
