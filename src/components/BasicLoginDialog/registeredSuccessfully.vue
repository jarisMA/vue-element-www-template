<template>
  <div class="registeredSuccessfully_container">
    <div class="header">
      <img
        src="~@/assets/images/close_logo.svg"
        class="header-cancel"
        @click="show"
      />
    </div>
    <div class="content">
      <div class="desc-content" v-if="vipTime()">
        <p>1年</p>
        <img src="~@/assets/images/jewel_logo.svg" alt="" class="desc-logo" />
        <p>会员权益已发放到您的账户</p>
      </div>
      <div class="title-content">
        <p>欢迎来到斗西家计划</p>
        <p>开始您的装修养成之旅吧！</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    show() {
      this.$store.commit("END_DIALOG_SHOW");
    },
    vipTime() {
      const vip_expired = this.userInfo.vip_expired;
      const newDate = new Date().getTime();
      const beforeDate = new Date(vip_expired).getTime();
      if (vip_expired && beforeDate > newDate) return true;
      else return false;
    }
  }
};
</script>
<style lang="less" scoped>
.registeredSuccessfully_container {
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0 0;
    }
  }
  .content {
    margin-top: 60px;
    text-align: center;
    padding-bottom: 119px;
    .desc-content {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 23px;
      color: #14af64;
      position: relative;
      .desc-logo {
        width: 26px;
        height: 26px;
      }
      position: relative;
      padding-bottom: 20px;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        width: 330px;
        height: 1px;
        background-color: #14af64;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .title-content {
      display: inline-block;
      text-align: center;
      font-size: 22px;
      font-family: Noto Sans S Chinese;
      font-weight: 400;
      line-height: 37px;
      color: #777777;
      padding: 34px;
      padding-bottom: 0;
    }
  }
}
</style>
