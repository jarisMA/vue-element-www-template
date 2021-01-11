<template>
  <el-dialog
    width="700px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @before-close="beforeCloseClick"
  >
    <div class="dialog-body">
      <div class="dialog-left">
        <the-loading-image
          :width="300"
          :height="300"
          :url="plan.planPic || defaultCoverImg"
        />
      </div>
      <div class="dialog-right">
        <i class="el-icon-close" @click="cancelClick" />
        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          show-message
          @submit.native.prevent="confirmClick"
        >
          <h3 class="dialog-title">{{ title }}</h3>
          <p class="dialog-input">
            <label class="dialog-label">方案名称：</label>
            <el-form-item prop="name">
              <el-input
                placeholder="请输入方案名称"
                v-model="form.name"
              ></el-input>
            </el-form-item>
          </p>
          <p class="dialog-desc">
            <template v-if="showDesc">
              <label class="dialog-label">详细信息：</label>
              <span>{{ parseInt(plan.srcArea) }}㎡ | {{ plan.specName }}</span>
              <span
                ><i class="el-icon-location-outline"></i> {{ plan.city }}
                {{ plan.commName }}
              </span>
            </template>
          </p>
          <div class="dialog-right-footer">
            <el-button @click="cancelClick">取消</el-button>
            <el-button
              type="primary"
              @click="confirmClick"
              :loading="btnLoading"
            >
              {{ confirmText }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import defaultCoverImg from "images/planCover.png";

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
    },
    type: {
      type: String,
      default: "edit"
    },
    showDesc: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TheLoadingImage
  },
  watch: {
    plan(val) {
      this.form.name =
        this.type === "edit"
          ? val.name || ""
          : this.type === "copy"
          ? val.name
            ? val.name + "-副本"
            : ""
          : "";
    },
    visible(val) {
      if (!val && ["edit", "copy"].indexOf(this.type) < 0) {
        this.$refs.form.resetFields();
      }
    }
  },
  data() {
    return {
      defaultCoverImg,
      form: {
        name:
          this.type === "edit"
            ? this.plan.name || ""
            : this.type === "copy"
            ? this.plan.name
              ? this.plan.name + "-副本"
              : ""
            : ""
      },
      formRules: {
        name: [
          {
            required: true,
            message: "方案名称不能为空"
          }
        ]
      }
    };
  },
  methods: {
    confirmClick() {
      this.$refs.form.validate(res => {
        if (res) {
          this.$emit("confirm", this.form.name);
        }
      });
    },
    cancelClick() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    beforeCloseClick() {
      this.$refs.form.resetFields();
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

/deep/ .el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 0 !important;
  transform: translate(-50%, -50%);
  background: #f7f7f7ff;
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
    }
    .dialog-right {
      position: relative;
      flex: 1;
      width: 310px;
      line-height: 1;
      padding-left: 30px;
      border-left: 1px solid #e6e6e6ff;
      .el-icon-close {
        position: absolute;
        top: -20px;
        right: -10px;
        font-size: 20px;
        color: #333333ff;
        cursor: pointer;
      }
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
      .dialog-desc {
        margin-top: 20px;
        height: 60px;
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
