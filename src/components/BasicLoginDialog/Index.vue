<template>
  <div>
    <el-dialog :visible.sync="loginDialogVisible" width="416px" center>
      <StepWechat v-if="loginDialogVisible === 1" />
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
import StepWechat from "./StepWechat.vue";
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
  methods: {}
};
</script>

<style type="text/css" lang="less" scoped>
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
