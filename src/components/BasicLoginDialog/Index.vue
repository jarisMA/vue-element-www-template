<template>
  <div>
    <el-dialog
      :visible="loginDialogVisible != 0"
      :width="
        loginDialogVisible == 4 ||
        loginDialogVisible == 5 ||
        loginDialogVisible == 6 ||
        loginDialogVisible == 8
          ? '672px'
          : '416px'
      "
      center
      :before-close="handleClose"
      :close-on-click-modal="
        loginDialogVisible == 4 ||
          loginDialogVisible == 5 ||
          loginDialogVisible == 6 ||
          loginDialogVisible == 7 ||
          loginDialogVisible == 8
      "
      :close-on-press-escape="false"
    >
      <StepWechat v-if="loginDialogVisible === 1" />
      <StepPhone v-if="loginDialogVisible === 2" />
      <StepObjective v-if="loginDialogVisible === 3" @submit="handleSumbit" />
      <registeredSuccessfully
        v-if="loginDialogVisible === 4"
      ></registeredSuccessfully>
      <wishLink v-if="loginDialogVisible === 5"></wishLink>
      <collegeLink v-if="loginDialogVisible === 6"></collegeLink>
      <interiorWx v-if="loginDialogVisible == 7"></interiorWx>
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
import wishLink from "./wishLink.vue";
import collegeLink from "./collegeLink.vue";
import userService from "./../../globals/service/user.js";
import interiorWx from "./interiorWx.vue";
import registeredSuccessfullyTitle from "./registeredSuccessfullyTitle.vue";
export default {
  components: {
    StepWechat,
    StepPhone,
    StepObjective,
    registeredSuccessfully,
    wishLink,
    collegeLink,
    interiorWx,
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
    handleClose() {
      this.$store.commit("END_DIALOG_SHOW");
    },
    handleSumbit(identity, objective, other) {
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
