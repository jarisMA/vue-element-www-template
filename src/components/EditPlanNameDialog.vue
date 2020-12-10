<template>
  <el-dialog
    width="700px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @before-close="beforeCloseClick"
  >
    <div class="dialog-body">
      <div class="dialog-left">
        <img :src="plan.planPic" :alt="plan.commName" />
      </div>
      <div class="dialog-right">
        <h3 class="dialog-title">{{ title }}</h3>
        <p class="dialog-input">
          <label class="dialog-label">方案名称：</label>
          <el-input placeholder="请输入方案名称" v-model="planName"></el-input>
        </p>
        <p class="dialog-desc">
          <label class="dialog-label">详细信息：</label>
          <span>{{ plan.srcArea }}㎡ | {{ plan.specName }}</span>
          <span
            ><i class="el-icon-location-outline"></i> {{ plan.city }}
            {{ plan.commName }}
          </span>
        </p>
        <div class="dialog-right-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick" :loading="btnLoading">
            {{ confirmText }}
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "EditPlanNameDialog",
  props: {
    title: {
      type: String,
      default: "编辑方案"
    },
    visible: {
      type: Boolean,
      default: false
    },
    plan: {
      type: Object,
      required: true
    },
    confirmText: {
      type: String,
      default: "保存"
    },
    btnLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      planName: ""
    };
  },
  methods: {
    confirmClick() {
      this.$emit("confirm", this.planName);
    },
    cancelClick() {
      this.$emit("update:visible", false);
    },
    beforeCloseClick() {
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

/deep/ .el-dialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 40px 30px;
  }
  .dialog-body {
    display: flex;
    width: 100%;
    height: 320px;
    .dialog-left,
    .dialog-right {
      padding: 10px 0;
    }
    .dialog-left {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      width: 300px;
      height: 100%;
      img {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
      }
    }
    .dialog-right {
      flex: 1;
      width: 310px;
      line-height: 1;
      padding-left: 30px;
      border-left: 1px solid #e6e6e6ff;
      .dialog-title {
        font-size: 16px;
        font-weight: bold;
        color: @primaryColor;
      }
      .dialog-input,
      .dialog-desc {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
      }
      .dialog-label {
        margin-bottom: 10px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: #787878;
      }
      .dialog-input {
        .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: unset;
          border-color: #e6e6e6ff;
          &::placeholder {
            color: #e6e6e6;
          }
        }
      }
      .dialog-desc {
        .dialog-label {
          margin-bottom: 12px;
        }
        span {
          display: inline-block;
          line-height: 12px;
          font-size: 12px;
          font-weight: 400;
          color: #ababab;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
      .dialog-right-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 46px;
        .el-button {
          padding: 9px 22px;
          border-radius: unset;
          &:not(:last-child) {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
