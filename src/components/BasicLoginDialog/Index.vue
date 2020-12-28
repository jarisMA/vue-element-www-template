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
import userService from "service/user";
import termService from "service/term";
import registeredSuccessfullyTitle from "./registeredSuccessfullyTitle.vue";
import douxiGif from "images/douxi3.gif";
import vipImg from "images/vip.png";

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
      const data = {
        identity: identity,
        remark: objective || other
      };
      userService.updateUserInfo(data).then(() => {
        termService.checkTerm().then(res => {
          if (res.status === 1) {
            this.$msgBox.showMsgBox({
              img: douxiGif,
              theme: "img_ml_65",
              content: `<p style='color:#14AF64FF;'>欢迎来到「斗西家计划」，</p><p style='color:#14AF64FF;'>一年期<span style='font-weight:bold;'>尊柜会员</span><img width='38' height='38' style='vertical-align:-8px;' src=${vipImg} />已发放到当前账户，</p><p style='color:#14AF64FF;'>期待看到你的新家，设计吧少年！</p>`,
              confirmBtnText: "确定",
              showCancelBtn: false,
              showCloseBtn: false
            });
            this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 0);
          } else {
            this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 8);
          }
        });
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
