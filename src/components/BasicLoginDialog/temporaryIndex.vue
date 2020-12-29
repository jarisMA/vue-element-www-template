<template>
  <div class="dialog-wrapper">
    <el-dialog
      :visible="loginDialogVisibles()"
      :width="
        loginDialogVisible == 5 || loginDialogVisible == 6 ? '672px' : '416px'
      "
      center
      :before-close="handleClose"
      :close-on-click-modal="
        loginDialogVisible == 5 ||
          loginDialogVisible == 6 ||
          loginDialogVisible == 7
      "
      :close-on-press-escape="false"
    >
      <wishLink v-if="loginDialogVisible === 5"></wishLink>
      <collegeLink v-if="loginDialogVisible === 6"></collegeLink>
      <interiorWx v-if="loginDialogVisible == 7"></interiorWx>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import wishLink from "./wishLink.vue";
import collegeLink from "./collegeLink.vue";
import interiorWx from "./interiorWx.vue";
export default {
  components: {
    wishLink,
    collegeLink,
    interiorWx
  },
  prop: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    loginDialogVisible() {
      return this.$store.state.loginDialogVisible;
    }
  },
  methods: {
    loginDialogVisibles() {
      return [5, 6, 7].some(
        item => item == this.$store.state.loginDialogVisible
      );
    },
    handleClose() {
      this.$store.commit("END_DIALOG_SHOW");
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
