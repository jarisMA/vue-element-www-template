<template>
  <div>
    <el-dialog
      :visible="loginDialogVisibles()"
      :width="
        loginDialogVisible == 4 || loginDialogVisible == 8 ? '672px' : '416px'
      "
      center
      :before-close="handleClose"
      :close-on-click-modal="loginDialogVisible == 4 || loginDialogVisible == 8"
      :close-on-press-escape="false"
    >
      <StepWechat v-if="loginDialogVisible === 1" />
      <StepPhone v-if="loginDialogVisible === 2" />
      <StepObjective v-if="loginDialogVisible === 3" @submit="handleSumbit" />
      <registeredSuccessfully
        v-if="loginDialogVisible === 4"
      ></registeredSuccessfully>
      <registeredSuccessfullyTitle
        v-if="loginDialogVisible == 8"
      ></registeredSuccessfullyTitle>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import StepWechat from "./StepWechat.vue";
import StepPhone from "./StepPhone.vue";
import StepObjective from "./StepObjective.vue";
import registeredSuccessfully from "./registeredSuccessfully.vue";
import userService from "./../../globals/service/user.js";
import registeredSuccessfullyTitle from "./registeredSuccessfullyTitle.vue";
export default {
  components: {
    StepWechat,
    StepPhone,
    StepObjective,
    registeredSuccessfully,
    registeredSuccessfullyTitle
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
      return [1, 2, 3, 4, 8].some(
        item => item == this.$store.state.loginDialogVisible
      );
    },
    handleClose() {
      this.$store.commit("END_DIALOG_SHOW");
    },
    handleSumbit(identity, objective, other) {
      const {
        name,
        sex,
        avatar_url,
        unionid
      } = this.$store.state.temporaryUserInfo;
      const { phone, code, codeKey } = this.$store.state.userInfo;
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
      userService.create(data).then(res => {
        this.$store.commit("SET_TOKEN", res.token);
        this.$store.commit("SET_WC_USER", res.userInfo);
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 8);
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
