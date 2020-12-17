<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="message-mask" @click="cancel"></div>
    <div class="message-modal">
      <h3 class="message-modal-header">
        <img class="close-icon" src="~images/close_logo.svg" @click="cancel" />
      </h3>
      <div class="message-modal-body">
        <img src="~images/common/deleteConfirm.svg" />
        <p>确认删除方案</p>
      </div>
      <div class="message-modal-footer">
        <button class="btn-default" @click="cancel" v-if="showCancelBtn">
          {{ cancelBtnText }}
        </button>
        <button
          class="btn-primary btn-confirm"
          @click="confirm"
          v-if="showConfirmBtn"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    content: {
      type: String,
      default: "这是弹框内容"
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      isShowMessageBox: false,
      resolve: "",
      reject: "",
      promise: "" // 保存promise对象
    };
  },
  methods: {
    // 弹出messageBox,并创建promise对象
    showMsgBox() {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    // 确定,将promise断定为resolve状态
    confirm() {
      this.isShowMessageBox = false;
      this.resolve("confirm");
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel() {
      this.isShowMessageBox = false;
      this.reject("cancel");
      this.remove();
    },
    remove() {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~styles/variable.less";
@width: 400px;
@height: 270px;
.message-box {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  .message-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000066;
  }
  .message-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    width: @width;
    height: @height;
    background: #ffffff;
    z-index: 1;
    .message-modal-header {
      position: relative;
      width: 100%;
      height: 18%;
      .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: auto;
        height: 50%;
        cursor: pointer;
      }
    }
    .message-modal-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-top: -14%;
      height: 55%;
      img {
        height: 80%;
      }
      p {
        line-height: 18px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
    }
    .message-modal-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 27%;
      background: #ededed;
      button {
        width: 30%;
        height: 50%;
        background: #ffffff;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        &.btn-default {
          border: 1px solid #b0b0b0;
          color: #787878;
        }
        &.btn-primary {
          border: unset;
          background: @primaryColor;
          color: #ffffff;
        }
        &:not(:last-child) {
          margin-right: 12%;
        }
      }
    }
  }
}
</style>
