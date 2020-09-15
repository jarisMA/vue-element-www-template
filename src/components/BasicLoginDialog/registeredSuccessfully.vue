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
  background: url("./../../assets/images/bg_1.svg") no-repeat;
  font-size: 0;
  .header {
    text-align: right;
    width: 672px;
    height: 358px;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 21px 24px 0 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .content {
    text-align: center;
    .desc-content {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      color: #14af64;
      line-height: 26px;
      font-weight: bold;
      margin: 21px 0 0;
    }
    .title-content {
      display: inline-block;
      text-align: center;
      font-size: 18px;
      line-height: 28px;
      color: #777777;
      margin-top: 19px;
      padding-bottom: 23px;
    }
  }
}
</style>
