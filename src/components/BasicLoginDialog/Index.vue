<template>
  <div>
    <el-dialog :visible.sync="dialogShow" width="416px" center>
      <StepWechat v-if="loginDialogVisible === 1" />
      <StepPhone v-if="loginDialogVisible === 2" />
      <StepMessage v-if="loginDialogVisible === 3" />
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
// import { mapState } from "vuex";
import StepWechat from "./StepWechat.vue";
import StepPhone from "./StepPhone.vue";
import StepMessage from "./StepMessage.vue";

export default {
  components: {
    StepWechat,
    StepPhone,
    StepMessage
  },
  prop: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    loginDialogVisible() {
      return this.$store.state.loginDialogVisible;
    },
    dialogShow: {
      get: function() {
        return this.$store.state.dialogShow;
      },
      set: function(value) {
        this.$store.commit("DIALOG_SHOW", value);
      }
    }
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
