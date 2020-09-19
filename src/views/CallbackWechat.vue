<template>
  <div></div>
</template>
<script type="text/javascript">
import authService from "./../globals/service/auth.js";
export default {
  created() {
    const { code, referer } = this.$route.query;
    if (code) {
      authService.wechatAuth(code).then(res => {
        if (referer) {
          window.location.href = referer;
        } else {
          this.setUserEvent(res);
        }
      });
    }
  },
  methods: {
    setUserEvent(res) {
      const hasActive = res.userInfo && res.userInfo.phone_number;
      const userCommit = hasActive ? "SET_WC_USER" : "SET_TEMPORARY_USER";
      const dialCommitVal = hasActive ? 0 : 2;
      this.$router.push({ path: "/" });
      this.$store.commit(userCommit, res.userInfo);
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", dialCommitVal);
    }
  }
};
</script>
