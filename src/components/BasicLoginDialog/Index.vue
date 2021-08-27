<template>
  <div class="dialog-wrapper">
    <el-dialog
      center
      :visible="loginDialogVisibles()"
      :width="'416px'"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <step-wechat v-if="loginDialogVisible === 1" />
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from "vuex";
import StepWechat from "./StepWechat";

export default {
  components: {
    StepWechat
  },
  prop: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["loginDialogVisible"])
  },
  methods: {
    ...mapMutations(["updateLoginDialogVisible"]),
    loginDialogVisibles() {
      return [1].some(item => item == this.loginDialogVisible);
    },
    handleClose() {
      this.updateLoginDialogVisible(0);
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.dialog-wrapper {
  /deep/ .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 0 !important;
    transform: translate(-50%, -50%);
  }
}
/deep/ .el-dialog .el-dialog__header {
  display: none;
}
/deep/ .el-dialog .el-dialog__body {
  padding: 0;
}
.login_container /deep/ .el-form-item__content {
  margin-left: 0 !important;
  display: flex;
  .el-input,
  .el-input__inner {
    background: #f4f4f4 !important;
    border: none;
  }
}
</style>
