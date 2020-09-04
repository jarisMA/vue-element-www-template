<template>
  <div>
    <el-dialog
      :visible.sync="dialogShow"
      width="416px"
      center
      :before-close="handleClose"
    >
      <StepWechat v-if="loginDialogVisible === 1" />
      <StepPhone v-if="loginDialogVisible === 2" />
      <StepObjective v-if="loginDialogVisible === 3" @submit="handleSumbit" />
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import StepWechat from "./StepWechat.vue";
import StepPhone from "./StepPhone.vue";
import StepObjective from "./StepObjective.vue";
import userService from "./../../globals/service/user.js";

export default {
  components: {
    StepWechat,
    StepPhone,
    StepObjective
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
        this.$store.commit("DEL_DIALOG_SHOW");
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.commit("DEL_DIALOG_SHOW");
    },
    handleSumbit(identity, objective, other = null) {
      const {
        phone,
        name,
        sex,
        avatar_url,
        unionid,
        code,
        codeKey
      } = this.$store.state.userInfo;
      const data = {
        identity: identity,
        remark: objective || other,
        unionid,
        nickname: name,
        avatar_url,
        gender: sex,
        phone_number: phone,
        verification_key: codeKey,
        verification_code: code
      };
      userService.create(data).then(() => {
        this.$store.commit("END_DIALOG_SHOW");
      });
    }
  }
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
