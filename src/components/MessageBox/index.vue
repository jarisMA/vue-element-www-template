<template>
  <div :class="['message-box', theme]" v-show="isShowMessageBox">
    <div class="message-mask" @click="maskCancel && cancel()"></div>
    <div
      class="message-modal"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <img
        v-if="showCloseBtn"
        class="close-icon"
        src="~images/common/close_logo.svg"
        @click="cancel"
      />
      <div :class="['message-modal-body', bodyClass]">
        <img :src="img" />
        <p v-html="content"></p>
      </div>
      <div class="message-modal-footer" v-if="showCancelBtn || showConfirmBtn">
        <button class="btn-default" @click="cancel" v-if="showCancelBtn">
          {{ cancelBtnText }}
        </button>
        <button
          class="btn-primary btn-confirm"
          @click="confirm"
          v-if="showConfirmBtn"
        >
          <icon-svg
            v-if="confirmBtnIcon"
            svg-class="confirm-icon"
            :svg-name="confirmBtnIcon"
          />{{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "images/common/deleteConfirm.svg";

export default {
  name: "MessageBox",
  props: {
    width: {
      type: Number,
      default: 672
    },
    height: {
      type: Number,
      default: 500
    },
    img: {
      type: String,
      default: defaultImg
    },
    content: {
      type: String,
      default: "这是弹框内容"
    },
    showCloseBtn: {
      type: Boolean,
      default: true
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
    confirmBtnIcon: {
      type: String,
      default: ""
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    bodyClass: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: ""
    },
    maskCancel: {
      type: Boolean,
      default: true
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
@width: 672px;
@height: 500px;
.message-box {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
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
    .close-icon {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    .message-modal-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 0 7%;
      height: 55%;
      img {
        height: 50%;
      }
      p {
        line-height: 50px;
        font-size: 30px;
        font-weight: 400;
        color: #14af64;
        text-align: center;
      }
    }
    .message-modal-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 140px;
      background: #ededed;
      button {
        width: 206px;
        height: 50px;
        background: #ffffff;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        .confirm-icon {
          font-size: 42px;
        }
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
.img_h_80pc {
  .message-modal-body {
    img {
      height: 70% !important;
    }
  }
}
.img_h_225 {
  .message-modal-body {
    img {
      height: 225px !important;
    }
  }
}
.img_w_170 {
  .message-modal-body {
    img {
      margin: 13px 18px;
      width: 170px !important;
      height: 170px !important;
    }
  }
}
.img_w_220 {
  .message-modal-body {
    img {
      margin-top: 30px;
      height: 220px !important;
    }
  }
}
.img_w_100 {
  .message-modal-body {
    img {
      margin: 63px 0 35px;
      height: 100px !important;
    }
  }
}
.img_w_140 {
  .message-modal-body {
    img {
      margin: 75px 0 23px;
      height: 140px !important;
    }
  }
}
.img_s_190_208 {
  .message-modal-body {
    img {
      margin: 30px 0 13px;
      width: 190px !important;
      height: 208px !important;
    }
  }
}
.img_s_174_176 {
  .message-modal-body {
    img {
      margin: 58px 0 37px;
      width: 174px !important;
      height: 176px !important;
    }
  }
}

.img_s_420_274 {
  .message-modal-body {
    img {
      margin: 0 0 16px;
      width: 420px !important;
      height: 274px !important;
    }
  }
}
.chrome_tips {
  .message-modal-body {
    img {
      margin: 59 0 0;
      width: 268px !important;
      height: 268px !important;
    }
    p {
      font-size: 36px !important;
      font-weight: 500 !important;
      line-height: 50px !important;
    }
  }
}
</style>
